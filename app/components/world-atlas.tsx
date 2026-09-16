"use client";

import Image from "next/image";
import { useEffect, useRef, useState, type CSSProperties } from "react";
import gsap from "gsap";
import { worlds } from "@/lib/worlds";
import { PlanetIcon } from "./planet-icon";
import { useReducedMotion } from "./motion";

const tabs = ["Overview", "Planet data", "Landmarks"] as const;
export default function WorldAtlas({
  selected,
  onSelect,
}: {
  selected: number;
  onSelect: (index: number) => void;
}) {
  const [tab, setTab] = useState(0);
  const [journalOpen, setJournalOpen] = useState(false);
  const content = useRef<HTMLDivElement>(null);
  const journal = useRef<HTMLDialogElement>(null);
  const panel = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const world = worlds[selected];
  useEffect(() => { panel.current?.scrollTo({ top: 0, behavior: 'instant' }); }, [selected, tab]);
  useEffect(() => {
    if (reduced) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".world-title, .world-subtitle, .world-description",
        { y: 12, opacity: 0.3 },
        { y: 0, opacity: 1, stagger: 0.04, duration: 0.4, ease: "power2.out", overwrite: 'auto' },
      );
    }, content);
    return () => ctx.revert();
  }, [selected, reduced]);
  useEffect(() => {
    if (journalOpen) journal.current?.showModal();
    else journal.current?.close();
  }, [journalOpen]);
  function choose(index: number) {
    onSelect((index + worlds.length) % worlds.length);
    setTab(0);
  }
  return (
    <section
      className="world-atlas"
      id="worlds"
      aria-labelledby="atlas-title"
      style={{ "--world-color": world.color } as CSSProperties}
    >
      <div className="section-heading">
        <p className="eyebrow">02 / THE WORLD ATLAS</p>
        <span>CHOOSE YOUR NEXT HORIZON</span>
      </div>
      <div className="world-selector" role="group" aria-label="Select a world">
        {worlds.map((item, index) => (
          <button
            key={item.slug}
            aria-pressed={selected === index}
            onClick={() => choose(index)}
          >
            <span className="world-index">0{index + 1}</span>
            <PlanetIcon index={index} />
            <span>{item.name}</span>
            <i />
          </button>
        ))}
      </div>
      <div className="world-viewport" ref={content}>
        <Image
          key={world.background}
          src={`/optimized/backgrounds/${world.background}.webp`}
          alt={`The landscapes of ${world.name}`}
          fill
          sizes="100vw"
          className="world-backdrop"
          onLoad={(event) => event.currentTarget.dataset.loaded = 'true'}
        />
        <div className="world-gradient" />
        <div className="world-coordinate" aria-hidden="true">
          <span>FIELD TRANSMISSION / 0{selected + 1}</span>
          <i />
          COSMAE · {world.name.toUpperCase()}
        </div>
        <div className="world-main">
          <p className="eyebrow world-eyebrow">
            PLANET 0{selected + 1} <span /> COSMAE SYSTEM
          </p>
          <h2 id="atlas-title" className="world-title">
            {world.name}
          </h2>
          <h3 className="world-subtitle">{world.title}</h3>
          <p className="world-description">{world.description}</p>
          <div
            className="world-tabs"
            role="tablist"
            aria-label={`${world.name} information`}
          >
            {tabs.map((name, index) => (
              <button
                key={name}
                id={`world-tab-${index}`}
                role="tab"
                aria-selected={tab === index}
                aria-controls="world-panel"
                tabIndex={tab === index ? 0 : -1}
                onClick={() => setTab(index)}
                onKeyDown={(event) => {
                  let next = index;
                  if (event.key === "ArrowRight") next = (index + 1) % 3;
                  else if (event.key === "ArrowLeft") next = (index + 2) % 3;
                  else if (event.key === "Home") next = 0;
                  else if (event.key === "End") next = 2;
                  else return;
                  event.preventDefault();
                  setTab(next);
                  document.getElementById(`world-tab-${next}`)?.focus();
                }}
              >
                {name}
              </button>
            ))}
          </div>
          <div
            id="world-panel"
            ref={panel}
            role="tabpanel"
            aria-labelledby={`world-tab-${tab}`}
            tabIndex={0}
            className="world-panel"
          >
            {tab === 0 && (
              <div className="overview-panel">
                <p className="eyebrow">{world.inhabitants}</p>
                <p>{world.culture}</p>
                <blockquote>
                  “{world.quote}”<cite>— {world.quoteSource}</cite>
                </blockquote>
              </div>
            )}
            {tab === 1 && (
              <div className="data-panel">
                <dl>
                  {Object.entries({
                    Class: world.class,
                    Diameter: world.diameter,
                    Gravity: world.gravity,
                    "Day length": world.day,
                    "Year length": world.year,
                    "Avg. temperature": world.temperature,
                    Moons: world.moons,
                    "Discovered by AstroMech": world.discovered,
                  }).map(([label, value]) => (
                    <div key={label}>
                      <dt>{label}</dt>
                      <dd>{value}</dd>
                    </div>
                  ))}
                </dl>
                <div className="terrain-data">
                  <span className="eyebrow">TERRAIN COMPOSITION</span>
                  {world.terrain.map(([name, percent]) => (
                    <div key={name}>
                      <span>{name}</span>
                      <i>
                        <b style={{ width: `${percent}%` }} />
                      </i>
                      <span>{percent}%</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
            {tab === 2 && (
              <ol className="landmark-list">
                {world.landmarks.map(([name, description], index) => (
                  <li key={name}>
                    <span>0{index + 1}</span>
                    <div>
                      <h4>{name}</h4>
                      <p>{description}</p>
                    </div>
                  </li>
                ))}
              </ol>
            )}
          </div>
          <button
            className="text-button journal-button"
            onClick={() => setJournalOpen(true)}
          >
            OPEN ORIGINAL FIELD JOURNAL <span>↗</span>
          </button>
        </div>
        <div className="world-signal">
          <PlanetIcon index={selected} />
          <span>WORLD 0{selected + 1} / 08</span>
          <div className="barcode" />
          <p>
            {world.class}
            <br />
            {world.gravity} · {world.temperature}
          </p>
        </div>
        <div className="world-bottom">
          <div>
            <span className="eyebrow">SIGNATURE PHENOMENON</span>
            <h4>{world.phenomenon}</h4>
            <p>{world.phenomenonDescription}</p>
          </div>
          <div>
            <span className="eyebrow">FIELD NOTES</span>
            <p>{world.notes}</p>
          </div>
          <div>
            <span className="eyebrow">BEFORE YOU GO</span>
            <p>{world.travel}</p>
          </div>
        </div>
      </div>
      <div className="atlas-footer">
        <span>
          0{selected + 1} <i>/ 08 WORLDS</i>
        </span>
        <p>DIFFERENT WORLDS. SHARED ORIGINS.</p>
        <div>
          <button
            className="round-button"
            aria-label="Previous world"
            onClick={() => choose(selected - 1)}
          >
            ←
          </button>
          <button className="text-button" onClick={() => choose(selected + 1)}>
            NEXT WORLD <span>→</span>
          </button>
        </div>
      </div>
      <dialog
        ref={journal}
        className="journal-modal"
        aria-labelledby="journal-title"
        onClose={() => setJournalOpen(false)}
        onClick={(event) => {
          if (event.target === journal.current) setJournalOpen(false);
        }}
      >
        <div className="modal-toolbar">
          <h3 id="journal-title">{world.name} / Original field journal</h3>
          <button
            onClick={() => setJournalOpen(false)}
            aria-label="Close field journal"
          >
            CLOSE ×
          </button>
        </div>
        {journalOpen && (
          <Image
            src={`/narrative/${world.journal}.png`}
            alt={`Original illustrated ${world.name} field journal, containing the lore and planetary facts summarized in the atlas`}
            width={1254}
            height={1254}
            sizes="(max-width: 700px) 94vw, 1000px"
          />
        )}
        <a
          className="button outline"
          href={`/narrative/${world.journal}.png`}
          target="_blank"
          rel="noreferrer"
        >
          VIEW FULL RESOLUTION ↗
        </a>
      </dialog>
    </section>
  );
}
