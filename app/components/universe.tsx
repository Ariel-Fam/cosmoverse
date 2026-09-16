"use client";
import Image from "next/image";
import { worlds } from "@/lib/worlds";
import { PlanetIcon } from "./planet-icon";
const coordinates = [
  [14, 39],
  [78, 62],
  [22, 72],
  [40, 87],
  [66, 83],
  [89, 39],
  [34, 15],
  [67, 15],
];
export default function Universe({
  onSelect,
  onFilm,
}: {
  onSelect: (index: number) => void;
  onFilm: () => void;
}) {
  return (
    <section
      className="universe-section"
      id="universe"
      aria-labelledby="universe-title"
    >
      <Image
        src="/optimized/backgrounds/InsideCosmoVerseBackgroud.webp"
        alt=""
        fill
        sizes="100vw"
        className="universe-background"
      />
      <div className="section-heading">
        <p className="eyebrow">01 / THE UNIVERSE</p>
        <span>OUR STORY BEGINS WITH A SINGLE STAR</span>
      </div>
      <h2 id="universe-title" className="section-title reveal">
        INSIDE THE <em>COSMOVERSE.</em>
      </h2>
      <div className="universe-grid">
        <div className="universe-copy reveal">
          <p className="lead">
            A universe of worlds.
            <br />A tapestry of realities.
            <br />
            <em>Infinite stories.</em>
          </p>
          <p>
            Within this boundless universe lies Cosmae, a single planet system
            among many. Eight primary worlds, each shaped by unique forces and
            stories, connected by the threads of a shared origin.
          </p>
          <div className="mythos">
            <h3>THE MYTHOS</h3>
            <p>
              Forged by elemental forces and limitless potential. Civilizations
              rise, evolve, and transform. Through it all, the threads of
              connection endure.
            </p>
          </div>
          <button className="button outline" onClick={onFilm}>
            <span className="play-triangle" /> WATCH THE COSMAE FLYBY{" "}
            <span>↗</span>
          </button>
        </div>
        <div className="system-map reveal">
          <div className="map-caption">
            <span>THE COSMAE PLANET SYSTEM</span>
            <small>STELLAR CARTOGRAPHY / 0110</small>
          </div>
          <div className="map-space">
            <svg
              className="orbital-lines"
              viewBox="0 0 800 500"
              fill="none"
              aria-hidden="true"
            >
              {[1, 2, 3, 4, 5, 6, 7].map((n) => (
                <ellipse
                  key={n}
                  cx="400"
                  cy="250"
                  rx={44 + n * 44}
                  ry={23 + n * 22}
                  stroke={n % 2 ? "#c69343" : "#2a908e"}
                  strokeOpacity={0.25}
                  strokeDasharray={n % 2 ? "2 8" : undefined}
                />
              ))}
              <path
                d="M30 250H770M400 20V480"
                stroke="#6dbdb7"
                strokeOpacity=".15"
                strokeDasharray="3 9"
              />
            </svg>
            <div className="cosmae-star">
              <span />
              <i />
              <b>COSMAE</b>
            </div>
            {worlds.map((world, index) => (
              <button
                key={world.slug}
                className="map-planet"
                style={{
                  left: `${coordinates[index][0]}%`,
                  top: `${coordinates[index][1]}%`,
                }}
                onClick={() => onSelect(index)}
                aria-label={`Explore ${world.name}`}
              >
                <PlanetIcon index={index} />
                <span>{world.name}</span>
              </button>
            ))}
            <span className="map-corner corner-one">+</span>
            <span className="map-corner corner-two">+</span>
          </div>
          <div className="map-footer">
            <i />8 PRIMARY WORLDS <span>/</span> ONE SHARED ORIGIN <i />
          </div>
        </div>
      </div>
      <div className="manifesto reveal">
        <span className="quote-mark">“</span>
        <p>
          We do not merely map worlds.
          <br />
          <em>We listen to them.</em>
        </p>
        <span className="eyebrow">
          ASTROMECH
          <br />
          EXPLORATION LOG 0001
        </span>
      </div>
    </section>
  );
}
