"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import { createChapterScroll } from "@/lib/chapter-scroll";
import sequences from "@/lib/sequences.json";
import { useReducedMotion } from "./motion";

type SequenceName = keyof typeof sequences;
export default function ScrollSequence({ name, id, number, title, accent, description, next, nextLabel, compact = false }: { name: SequenceName; id: string; number: string; title: string; accent: string; description: string; next: string; nextLabel: string; compact?: boolean }) {
  const root = useRef<HTMLElement>(null);
  const canvas = useRef<HTMLCanvasElement>(null);
  const progressBar = useRef<HTMLSpanElement>(null);
  const frameLabel = useRef<HTMLSpanElement>(null);
  const reduced = useReducedMotion();
  const sequence = sequences[name];
  useEffect(() => {
    const element = root.current;
    const surface = canvas.current;
    const context = surface?.getContext('2d', { alpha: false });
    if (!element || !surface || !context || reduced) return;
    let alive = true;
    let near = false;
    let frame = 0;
    let active = 0;
    let raf = 0;
    const cache = new Map<number, HTMLImageElement>();
    const pending = new Map<number, HTMLImageElement>();
    const failed = new Set<number>();
    function draw() {
      raf = 0;
      if (!alive || !surface || !context) return;
      const loaded = cache.has(frame) ? [frame, cache.get(frame)!] as const : [...cache.entries()].sort((a,b) => Math.abs(a[0]-frame)-Math.abs(b[0]-frame))[0];
      if (!loaded) return;
      const [displayedFrame, image] = loaded;
      const scale = Math.max(surface.width/image.naturalWidth, surface.height/image.naturalHeight);
      const width = image.naturalWidth*scale, height = image.naturalHeight*scale;
      context.drawImage(image, (surface.width-width)/2, (surface.height-height)/2, width, height);
      surface.style.opacity = '1';
      if(frameLabel.current) frameLabel.current.textContent = `${String(displayedFrame+1).padStart(3,'0')} / ${String(sequence.count).padStart(3,'0')}`;
    }
    function queueDraw() { if (!raf) raf = requestAnimationFrame(draw); }
    function pump() {
      if (!alive || !near) return;
      // Free request slots immediately after a fast scroll or chapter jump.
      for (const [index, image] of pending) {
        if (Math.abs(index-frame)<=14) continue;
        image.onload=null; image.onerror=null; image.src='';
        pending.delete(index); active--;
      }
      const wanted: number[] = [frame];
      for (let offset=1; offset<=10; offset++) {
        if (frame+offset < sequence.count) wanted.push(frame+offset);
        if (frame-offset >= 0) wanted.push(frame-offset);
      }
      for (const index of cache.keys()) if (Math.abs(index-frame)>14) cache.delete(index);
      for (const index of wanted) {
        if (active>=4) break;
        if (cache.has(index) || pending.has(index) || failed.has(index)) continue;
        const image = new window.Image();
        pending.set(index,image); active++;
        image.onload = () => {
          pending.delete(index); active--;
          if (!alive || !near) return;
          if(Math.abs(index-frame)<=14) cache.set(index,image);
          queueDraw(); pump();
        };
        image.onerror = () => { pending.delete(index); active--; failed.add(index); if(alive) pump(); };
        image.src = `${sequence.path}/${index}.webp`;
      }
    }
    const resize = new ResizeObserver(() => {
      const rect = element.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
      const width = Math.round(rect.width*dpr), height = Math.round(rect.height*dpr);
      if (surface.width !== width) surface.width = width;
      if (surface.height !== height) surface.height = height;
      queueDraw();
    });
    resize.observe(element);
    const observer = new IntersectionObserver(([entry]) => {
      near = entry.isIntersecting;
      if(near) pump();
      else cache.clear();
    }, { rootMargin: '700px' });
    observer.observe(element);
    const stopScroll = createChapterScroll({ element, chapter: Number(number), compact, update: (progress) => {
        frame = Math.round(progress*(sequence.count-1));
        if(progressBar.current) progressBar.current.style.transform = `scaleX(${progress})`;
        queueDraw(); pump();
    }});
    const track = progressBar.current;
    const label = frameLabel.current;
    return () => { alive=false; stopScroll(); observer.disconnect(); resize.disconnect(); cancelAnimationFrame(raf); pending.forEach(image => {image.onload=null;image.onerror=null;image.src='';}); pending.clear(); cache.clear(); surface.style.opacity='0'; if(track) track.style.transform='scaleX(0)'; if(label) label.textContent=`001 / ${String(sequence.count).padStart(3,'0')}`; };
  }, [sequence, reduced, compact, number]);
  return <section className={`scroll-sequence ${name} ${compact ? 'compact-sequence' : ''}`} id={id} ref={root} aria-labelledby={`${id}-title`}>
    <Image src={`${sequence.path}/0.webp`} alt={name === 'flyby' ? 'Ark 11 flying over the blue lagoons of Cosmae' : name === 'disassembly' ? 'The Ark 11 and its internal engineering systems' : name === 'discovery' ? 'AstroMech examining an exotic material in the field' : 'AstroMech inside the golden-canopied Ark 11 cockpit'} fill sizes="100vw" className="sequence-poster" />
    <canvas ref={canvas} className="sequence-canvas" aria-hidden="true" />
    <div className="sequence-shade" />
    <div className="sequence-top"><p className="eyebrow">{number} / {name === 'flyby' ? 'IN FLIGHT' : name === 'disassembly' ? 'BENEATH THE SURFACE' : name === 'discovery' ? 'FIELD DISCOVERY' : 'THE NEXT CHAPTER'}</p><a href={next}>SKIP TO {nextLabel} ↘</a></div>
    <div className="sequence-copy"><p className="eyebrow">ASTROMECH EXPEDITION / 0110</p><h2 id={`${id}-title`}>{title}<br/><em>{accent}</em></h2><p>{description}</p></div>
    <div className="sequence-reticle" aria-hidden="true"><i/><i/><i/><i/></div>
    <div className="sequence-bottom"><span>{reduced ? 'EXPEDITION STILL' : 'SCROLL TO ADVANCE THE SCENE'} <i>↓</i></span><div className="sequence-track"><span ref={progressBar}/></div><span ref={frameLabel}>001 / {String(sequence.count).padStart(3,'0')}</span></div>
  </section>;
}
