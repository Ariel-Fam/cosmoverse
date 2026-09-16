"use client";

import Image from 'next/image';
import dynamic from 'next/dynamic';
import { useCallback, useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { OrbitMark } from './planet-icon';
import { useReducedMotion } from './motion';
import type { ModelKind } from './model-viewer';
import { createChapterScroll } from '@/lib/chapter-scroll';

const ModelViewer = dynamic(() => import('./model-viewer'), { ssr: false });
gsap.registerPlugin(ScrollTrigger);
const content = {
  astro: { id:'astromech', chapter:'03', label:'THE EXPLORER', heading:'ASTRO', accent:'MECH.', subtitle:'Explorer. Interpreter. Storyteller.', body:'Forged to explore the universe and interpret its wonders. AstroMech bridges science and story, data and meaning, fact and imagination.', details:[['01','OBSERVE','A gold visor turned toward the unknown. Every world holds a story worth discovering.'],['02','INTERPRET','From crystalline forests to chronal currents. Listen, learn, and find the threads that connect us.'],['03','TELL THE STORY','Each transmission brings a distant world closer. For explorers, dreamers, builders, and thinkers.']], stats:[['MISSION','Exploration'],['RECORD','Issue 0110'],['DESTINATION','The unknown']], fallback:'/optimized/isolatedAstroMech/AstroMechBackView.webp', next:'#flight', nextLabel:'TAKE FLIGHT' },
  ark: { id:'ark11', chapter:'05', label:'THE VESSEL', heading:'THE', accent:'ARK 11.', subtitle:'Built for the unknown. Engineered for anything.', body:'AstroMech’s multi-role explorer and interceptor. Amethyst-infused technology powers a spacecraft made for exploration, reconnaissance, harvesting, and escort.', details:[['01','EXPLORER / INTERCEPTOR','Long-range scans, autonomous data logs, and terrain analysis. One pilot. Countless frontiers.'],['02','VECTOR THRUSTERS','Six-axis maneuverability and precision vector control. A 6.2 m profile and 28.4 t frame, built for the tightest spaces.'],['03','AMETHYST CORE DRIVE','A compact reactor infused with Amethyst provides stable, efficient, high-yield energy.']], stats:[['LENGTH','18.7 m'],['WINGSPAN','16.4 m'],['MAX VELOCITY','Mach 7.4']], fallback:'/optimized/sequences/disassembly/0.webp', next:'#anatomy', nextLabel:'SEE INSIDE THE ARK' },
  crystal: { id:'amethyst', chapter:'07', label:'THE HEART OF THE MISSION', heading:'BEYOND', accent:'THE ORDINARY.', subtitle:'Amethyst. The power within.', body:'At the heart of Ark 11 is an Amethyst-infused reactor. A remarkable material transformed into the energy that carries every expedition further.', details:[['01','EXOTIC MATERIAL','Observation begins at the source. Study the facets and formations of an Amethyst cluster.'],['02','CORE TECHNOLOGY','Amethyst-infused systems deliver high-output, stable, and efficient propulsion.'],['03','AN ENDLESS FRONTIER','From material to mission. Curiosity becomes discovery, and discovery becomes possibility.']], stats:[['MATERIAL','Amethyst'],['APPLICATION','Core drive'],['VESSEL','Ark 11']], fallback:'/optimized/sequences/discovery/0.webp', next:'#discovery', nextLabel:'CONTINUE THE DISCOVERY' },
} as const;
export default function ModelStage({ kind }: { kind: ModelKind }) {
  const data = content[kind];
  const root = useRef<HTMLElement>(null);
  const progress = useRef(0);
  const progressBar = useRef<HTMLSpanElement>(null);
  const invalidate = useRef<() => void>(() => {});
  const [near, setNear] = useState(false);
  const [ready, setReady] = useState(false);
  const [failed, setFailed] = useState(false);
  const [step, setStep] = useState(0);
  const reduced = useReducedMotion();
  const registerInvalidate = useCallback((fn: () => void) => { invalidate.current = fn; }, []);
  const onReady = useCallback(() => setReady(true), []);
  const onError = useCallback(() => setFailed(true), []);
  useEffect(() => {
    if(!root.current) return;
    const observer = new IntersectionObserver(([entry]) => {setNear(entry.isIntersecting); if(!entry.isIntersecting) setReady(false);}, { rootMargin:'900px' });
    observer.observe(root.current);
    return () => observer.disconnect();
  }, []);
  useEffect(() => {
    if(!root.current || reduced) return;
    return createChapterScroll({ element: root.current, chapter: Number(data.chapter), model: true, update: (value) => {
        progress.current = value;
        if (progressBar.current) progressBar.current.style.transform = `scaleX(${value})`;
        root.current?.style.setProperty("--model-progress", String(value));
        invalidate.current();
        setStep(Math.min(2,Math.floor(value*3)));
    }});
  }, [reduced, data.chapter]);
  function selectStep(index: number) {
    if(reduced) { progress.current=index/2; invalidate.current(); setStep(index); return; }
    const trigger=ScrollTrigger.getAll().find(item => item.trigger === root.current || item.trigger === root.current?.querySelector('.model-display'));
    if(trigger) window.scrollTo({top:trigger.start+(trigger.end-trigger.start)*(.08+.84*[0,.5,1][index]),behavior:'smooth'});
    else {progress.current=index/2;invalidate.current();setStep(index);}
  }
  return <section id={data.id} ref={root} className={`model-stage model-${kind}`} data-model-state={failed ? "fallback" : ready ? "ready" : "loading"} aria-labelledby={`${data.id}-title`}>
    <div className="model-grid-bg" aria-hidden="true"/><div className="model-watermark" aria-hidden="true">{kind === "astro" ? "0110" : kind === "ark" ? "ARK / 11" : "AMETHYST"}</div>
    <div className="section-heading"><p className="eyebrow">{data.chapter} / {data.label}</p><a href={data.next}>CONTINUE EXPLORING ↘</a></div>
    <div className="model-layout"><div className="model-copy"><h2 id={`${data.id}-title`}>{data.heading}<br/><em>{data.accent}</em></h2><h3>{data.subtitle}</h3><p>{data.body}</p><a href={data.next} className="button outline">{data.nextLabel} <span>↗</span></a>{kind === "ark" && <a href="/narrative/TheArk%2011.png" target="_blank" rel="noreferrer" className="vessel-journal">ORIGINAL VESSEL DOSSIER ↗</a>}</div>
    <div className="model-display"><div className="model-orbit" aria-hidden="true"/><div className="model-orbit orbit-second" aria-hidden="true"/>
      {(!ready || failed) && <Image src={data.fallback} alt={kind==='astro'?'AstroMech exploration suit':kind==='ark'?'Ark 11 spacecraft':'AstroMech discovering exotic material'} fill sizes="(max-width: 800px) 90vw, 55vw" className="model-poster"/>}
      {near && !failed && <ModelViewer kind={kind} progress={progress} registerInvalidate={registerInvalidate} onReady={onReady} onError={onError}/>}
      <div className="model-view-label"><i/>{failed ? 'ILLUSTRATED VIEW' : ready ? reduced ? '3D EXPLORATION · SELECT A VIEW' : 'SCROLL TO ROTATE · APPROACH · DISCOVER' : 'PREPARING THE 3D VIEW'}</div>
      <div className="model-corner top-left"/><div className="model-corner bottom-right"/>
    </div>
    <div className="model-details"><OrbitMark className="detail-mark"/><p className="eyebrow">MISSION SYSTEMS / 0{step+1}</p><div className="model-step" key={step}><span>{data.details[step][0]}</span><h3>{data.details[step][1]}</h3><p>{data.details[step][2]}</p></div><div className="model-step-buttons" role="group" aria-label="Model viewing stage">{data.details.map((item,index)=><button key={item[0]} aria-label={item[1]} aria-pressed={step===index} onClick={()=>selectStep(index)}>{item[0]}</button>)}</div></div></div>
    <div className="model-scroll-track" aria-hidden="true"><span ref={progressBar}/></div>
    <div className="model-specs">{data.stats.map(([label,value])=><div key={label}><span>{label}</span><strong>{value}</strong></div>)}<p>OBSERVE.<br/>INTERPRET.<br/><em>DISCOVER.</em></p><div className="barcode"/></div>
  </section>;
}
