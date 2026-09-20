"use client";

import Image from "next/image";
import type { CSSProperties } from "react";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import WorldAtlas from "./components/world-atlas";
import Universe from "./components/universe";
import ModelStage from "./components/model-stage";
import ScrollSequence from "./components/scroll-sequence";
import { MotionContext, useSystemReducedMotion } from "./components/motion";
gsap.registerPlugin(ScrollTrigger);
import { OrbitMark, PlanetIcon } from "./components/planet-icon";

const names = [
  "Earthys",
  "Cosmara",
  "Elyria",
  "Kairos",
  "Luminaria",
  "Nexarion",
  "Stellaluna",
  "Terraverde",
];

const musicPlatforms = [
  {
    name: "Spotify",
    href: "https://open.spotify.com/album/6K6HP0OCSjeal5wjzc7KhI?si=MUORhA2QSAmSW2pnOFj4AA",
    image: "/spotify.png",
    width: 3000,
    height: 3000,
  },
  {
    name: "Apple Music",
    href: "https://music.apple.com/ca/album/astro-mech-0110-html/1785430118",
    image: "/apple.jpg",
    width: 3840,
    height: 2160,
  },
  {
    name: "Tidal",
    href: "https://tidal.com/album/405345426",
    image: "/tidal.jpg",
    width: 720,
    height: 382,
  },
  {
    name: "YouTube",
    href: "https://www.youtube.com/playlist?list=OLAK5uy_lWRTbsNGuMuvtZj0q_BpAygU3mp1EqGDs",
    image: "/youtube.png",
    width: 10056,
    height: 10097,
  },
];

export default function Home() {
  const [selectedWorld, setSelectedWorld] = useState(0);
  const [motionOff, setMotionOff] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [filmOpen, setFilmOpen] = useState(false);
  const root = useRef<HTMLElement>(null);
  const menu = useRef<HTMLDialogElement>(null);
  const film = useRef<HTMLDialogElement>(null);
  const progress = useRef<HTMLDivElement>(null);
  const systemReduced = useSystemReducedMotion();
  const reduced = motionOff || systemReduced;
  useEffect(() => {
    if (menuOpen) menu.current?.showModal();
    else menu.current?.close();
  }, [menuOpen]);
  useEffect(() => {
    if (filmOpen) film.current?.showModal();
    else film.current?.close();
  }, [filmOpen]);
  useEffect(() => {
    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        start: 80,
        end: "max",
        toggleClass: { targets: ".site-header", className: "scrolled" },
      });
      ScrollTrigger.create({
        start: 0,
        end: "max",
        onUpdate: (self) => {
          if (progress.current)
            progress.current.style.transform = `scaleX(${self.progress})`;
        },
      });
      if (!reduced) {
        if (
          window.scrollY <
          (root.current?.querySelector(".hero")?.clientHeight ?? 0)
        ) {
          const entrance = gsap.timeline({ defaults: { ease: "power2.out" } });
          entrance.from(".hero-wordmark", {
            y: 45,
            opacity: 0,
            duration: 0.9,
            ease: "power3.out",
          });
          entrance.from(
            ".hero-portrait",
            {
              scale: 1.07,
              opacity: 0,
              duration: 1.1,
              ease: "power2.out",
            },
            0.1,
          );
          entrance.from(
            ".hero-copy > *, .mini-system",
            {
              y: 20,
              opacity: 0,
              duration: 0.6,
              stagger: 0.08,
              ease: "power2.out",
            },
            0.25,
          );
        }
        gsap.to(".hero-portrait img", {
          yPercent: 8,
          ease: "none",
          scrollTrigger: {
            trigger: ".hero",
            start: "top top",
            end: "bottom top",
            scrub: true,
          },
        });
        gsap.to(".hero-background", {
          yPercent: 15,
          ease: "none",
          scrollTrigger: {
            trigger: ".hero",
            start: "top top",
            end: "bottom top",
            scrub: true,
          },
        });
        gsap.utils.toArray<HTMLElement>(".reveal").forEach((element) => {
          if (element.getBoundingClientRect().bottom <= 0) return;
          gsap.from(element, {
            y: 20,
            opacity: 0,
            duration: 0.65,
            ease: "power2.out",
            scrollTrigger: {
              trigger: element,
              start: "top 92%",
              end: "bottom top",
              once: true,
              fastScrollEnd: true,
            },
          });
        });
        gsap.to(".planet-orbit", {
          rotation: 360,
          transformOrigin: "50% 50%",
          duration: 45,
          repeat: -1,
          ease: "none",
        });
        // Offset each icon's phase for a continuous wave; labels and hover transforms stay independent.
        gsap.utils
          .toArray<HTMLElement>(".mini-system .hero-planet-float")
          .forEach((planet, index) => {
            gsap
              .fromTo(
                planet,
                { y: -3 },
                {
                  y: 3,
                  duration: 2.4,
                  repeat: -1,
                  yoyo: true,
                  ease: "sine.inOut",
                  scrollTrigger: {
                    trigger: ".hero",
                    start: "top bottom",
                    end: "bottom top",
                    toggleActions: "play pause resume pause",
                  },
                },
              )
              .totalTime(index * 0.35);
          });
        gsap.to(".cosmae-star > span", {
          scale: 1.09,
          opacity: 0.8,
          duration: 3,
          yoyo: true,
          repeat: -1,
          ease: "sine.inOut",
          scrollTrigger: {
            trigger: "#universe",
            start: "top bottom",
            end: "bottom top",
            toggleActions: "play pause resume pause",
          },
        });
      }
    }, root);
    // Children own their pins. Refresh in document order once their setup is complete.
    let frame = 0;
    let alive = true;
    const refresh = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        if (!alive) return;
        ScrollTrigger.sort();
        ScrollTrigger.refresh();
      });
    };
    // Atlas selections and wrapping text can shift every later chapter without a window resize.
    const sizes = new WeakMap<Element, string>();
    const layout = new ResizeObserver((entries) => {
      let changed = false;
      for (const entry of entries) {
        const size = `${entry.contentRect.width}:${entry.contentRect.height}`;
        if (sizes.has(entry.target) && sizes.get(entry.target) !== size)
          changed = true;
        sizes.set(entry.target, size);
      }
      if (changed) refresh();
    });
    root.current
      ?.querySelectorAll(
        ".hero, .album-section, .universe-section, .world-atlas, .site-footer",
      )
      .forEach((element) => layout.observe(element));
    refresh();
    document.fonts.ready.then(() => {
      if (alive) refresh();
    });
    return () => {
      alive = false;
      cancelAnimationFrame(frame);
      layout.disconnect();
      ctx.revert();
    };
  }, [reduced]);
  function chooseWorld(index: number) {
    setSelectedWorld(index);
    document
      .getElementById("worlds")
      ?.scrollIntoView({ behavior: reduced ? "instant" : "smooth" });
  }
  return (
    <MotionContext value={reduced}>
      <main id="top" ref={root} className={reduced ? "reduced-motion" : ""}>
        <a className="skip-link" href="#worlds">
          Skip to the world atlas
        </a>
        <div className="reading-progress" ref={progress} aria-hidden="true" />
        <header className="site-header">
          <a className="brand" href="#top">
            <OrbitMark /> COSMOVERSE <span>/ 0110</span>
          </a>
          <nav aria-label="Main navigation">
            <a href="#album">Music</a>
            <a href="#universe">Universe</a>
            <a href="#worlds">Worlds</a>
            <a href="#astromech">Astro Mech</a>
            <a href="#ark11">
              Ark 11 <span>↗</span>
            </a>
          </nav>
          <button
            className="motion-toggle"
            aria-pressed={!reduced}
            onClick={() => setMotionOff(!motionOff)}
            title={
              systemReduced
                ? "Following your device’s reduced-motion preference"
                : "Toggle motion"
            }
          >
            <span className={reduced ? "" : "motion-bars"}>
              <i />
              <i />
              <i />
              <i />
            </span>
            MOTION {reduced ? "OFF" : "ON"}
          </button>
          <button
            className="menu-toggle"
            aria-label="Open expedition navigation"
            onClick={() => setMenuOpen(true)}
          >
            <span />
            <span />
          </button>
        </header>
        <section className="hero" aria-labelledby="hero-title">
          <Image
            src="/optimized/backgrounds/CosmoVerseBackgroud.webp"
            alt=""
            fill
            priority
            sizes="100vw"
            className="hero-background"
          />
          <div className="hero-topline">
            <span>AN EXPEDITION BEYOND THE FAMILIAR</span>
            <span>
              EST. 0110 <i className="tiny-cross">+</i> COSMAE SYSTEM
            </span>
          </div>
          <h1 id="hero-title" className="hero-wordmark" aria-label="Cosmoverse">
            {Array.from("COSMOVERSE").map((letter, index) => (
              <span key={index} aria-hidden="true">
                {letter}
              </span>
            ))}
          </h1>
          <div className="hero-portrait">
            <Image
              src="/optimized/isolatedAstroMech/heroImageAstroMech.webp"
              alt="AstroMech in red and teal exploration armor, with a golden reflective visor"
              fill
              priority
              sizes="(max-width: 700px) 100vw, 65vw"
            />
          </div>
          <div className="hero-copy">
            <p className="eyebrow">
              <span className="short-line" /> EXPLORER. INTERPRETER.
              STORYTELLER.
            </p>
            <h2>
              REALITY IS WRITTEN.
              <br />
              <em>WE MAKE IT REAL.</em>
            </h2>
            <p className="hero-description">
              A universe of worlds. A tapestry of realities.
              <br />
              Infinite stories. Your expedition starts here.
            </p>
            <div className="hero-actions">
              <a className="button primary" href="#worlds">
                EXPLORE THE WORLDS <span>↗</span>
              </a>
              <a className="text-button" href="#astromech">
                MEET ASTRO MECH <span>↗</span>
              </a>
            </div>
          </div>
          <div className="visor-callout">
            <span>01 / GOLD VISOR</span>
            <p>OBSERVE · INTERPRET · DISCOVER</p>
            <i />
          </div>
          <div className="hero-side">
            コスモバース <span>ONE UNIVERSE. INFINITE REALITIES.</span>
          </div>
          <div className="mini-system">
            <p className="eyebrow">
              THE COSMAE SYSTEM <span>— 08 KNOWN WORLDS</span>
            </p>
            <div>
              {names.map((name, i) => (
                <a
                  key={name}
                  href="#worlds"
                  onClick={(event) => {
                    event.preventDefault();
                    chooseWorld(i);
                  }}
                  title={`Explore ${name}`}
                >
                  <span className="hero-planet-float">
                    <PlanetIcon index={i} />
                  </span>
                  <span>{name}</span>
                </a>
              ))}
            </div>
          </div>
          <div className="hero-stats">
            <div>
              <strong>08</strong>
              <span>
                PRIMARY WORLDS
                <small>Unique realms. Infinite perspectives.</small>
              </span>
            </div>
            <div>
              <strong>01</strong>
              <span>
                COSMAE SYSTEM
                <small>A shared origin. An endless frontier.</small>
              </span>
            </div>
            <div>
              <strong className="infinity">∞</strong>
              <span>
                POSSIBILITIES<small>The next story awaits.</small>
              </span>
            </div>
            <a href="#universe" className="scroll-cue">
              SCROLL TO DISCOVER <span>↓</span>
            </a>
          </div>
        </section>

        <section
          id="album"
          className="album-section"
          aria-labelledby="album-title"
        >
          <div className="album-heading reveal">
            <p className="eyebrow">ORIGINAL COSMOVERSE SOUNDTRACK / 0110</p>
            <span>07 TRACKS · ARLIE P</span>
          </div>


          <div className="album-layout">
            <div className="album-media reveal">
              <div className="album-art">
                <Image
                  src="/AlbumCover.jpg"
                  alt="Astro Mech 0110 album cover featuring Astro Mech in profile"
                  width={800}
                  height={800}
                  sizes="(max-width: 700px) 88vw, 42vw"
                />
                <span className="album-catalog">
                  COSMAE AUDIO ARCHIVE / AM-0110
                </span>
              </div>
              <nav
                className="album-service-links"
                aria-label="Listen to Astro Mech 0110 on streaming platforms"
              >
                {musicPlatforms.map((platform, index) => (
                  <a
                    key={platform.name}
                    href={platform.href}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={`Listen on ${platform.name}`}
                    style={{ "--wave-index": index } as CSSProperties}
                  >
                    <Image
                      src={platform.image}
                      alt=""
                      width={platform.width}
                      height={platform.height}
                      sizes="(max-width: 700px) 20vw, 9vw"
                    />
                    <span>{platform.name}</span>
                  </a>
                ))}
              </nav>
            </div>
            <div className="album-copy reveal">
              <p className="eyebrow">
                <span className="short-line" /> TRANSMISSION IN SEVEN MOVEMENTS
              </p>
              <h2 id="album-title">
                ASTRO_MECH_<em>0110.HTML</em>
              </h2>
              <p className="album-lead">
                The sound of one explorer crossing the CosmoVerse.
              </p>
              <p className="album-description">
                A seven-song journey tracing Astro Mech&apos;s traversal through
                distant worlds, strange signals, and the spaces between them.
                Press play and enter the expedition.
              </p>
              <dl className="album-metadata">
                <div>
                  <dt>ARTIST</dt>
                  <dd>ARLIE P</dd>
                </div>
                <div>
                  <dt>FORMAT</dt>
                  <dd>07-TRACK ALBUM</dd>
                </div>
                <div>
                  <dt>ARCHIVE</dt>
                  <dd>ISSUE 0110</dd>
                </div>
              </dl>
              <div
                className="album-links"
                aria-label="Listen to Astro Mech 0110"
              >
                <a
                  className="button primary"
                  href="https://open.spotify.com/album/6K6HP0OCSjeal5wjzc7KhI?si=MUORhA2QSAmSW2pnOFj4AA"
                  target="_blank"
                  rel="noreferrer"
                >
                  LISTEN ON SPOTIFY <span>↗</span>
                </a>
                <a
                  className="album-platform"
                  href="https://music.apple.com/ca/album/astro-mech-0110-html/1785430118"
                  target="_blank"
                  rel="noreferrer"
                >
                  APPLE MUSIC <span>↗</span>
                </a>
                <a
                  className="album-platform"
                  href="https://tidal.com/album/405345426"
                  target="_blank"
                  rel="noreferrer"
                >
                  TIDAL <span>↗</span>
                </a>
                <a
                  className="album-platform"
                  href="https://www.youtube.com/playlist?list=OLAK5uy_lWRTbsNGuMuvtZj0q_BpAygU3mp1EqGDs"
                  target="_blank"
                  rel="noreferrer"
                >
                  YOUTUBE <span>↗</span>
                </a>
              </div>
            </div>
          </div>
        </section>


        <Universe onSelect={chooseWorld} onFilm={() => setFilmOpen(true)} />
        <WorldAtlas selected={selectedWorld} onSelect={setSelectedWorld} />
        <ModelStage kind="astro" />
        <ScrollSequence
          name="flyby"
          id="flight"
          number="04"
          title="LEAVE THE"
          accent="FAMILIAR BEHIND."
          description="Over blue lagoons and impossible horizons. The Ark 11 carries curiosity into the unknown."
          next="#ark11"
          nextLabel="ARK 11"
        />
        <ModelStage kind="ark" />
        <ScrollSequence
          name="disassembly"
          id="anatomy"
          number="06"
          title="EVERY PART."
          accent="A PURPOSE."
          description="Explore beneath the armor. A precise constellation of systems, built to take the mission further."
          next="#amethyst"
          nextLabel="THE CORE"
        />
        <ModelStage kind="crystal" />
        <ScrollSequence
          name="discovery"
          id="discovery"
          number="08"
          title="WONDER IS"
          accent="ONLY THE BEGINNING."
          description="A new material. An unanswered question. Discovery starts with the willingness to look a little closer."
          next="#departure"
          nextLabel="DEPARTURE"
          compact
        />
        <ScrollSequence
          name="cockpit"
          id="departure"
          number="09"
          title="THE NEXT STORY"
          accent="AWAITS."
          description="One explorer. Eight worlds. An endless frontier. Take your place in the Cosmoverse."
          next="#transmission"
          nextLabel="THE NEXT CHAPTER"
          compact
        />
        <footer id="transmission" className="site-footer">
          <div className="footer-top reveal">
            <OrbitMark />
            <p className="eyebrow">TRANSMISSION COMPLETE / ISSUE 0110</p>
            <h2>
              REALITY IS WRITTEN.
              <br />
              <em>WE MAKE IT REAL.</em>
            </h2>
            <div>
              <a className="button primary" href="#worlds">
                CHOOSE YOUR NEXT WORLD <span>↗</span>
              </a>
              <a className="text-button" href="#top">
                REPLAY THE EXPEDITION ↑
              </a>
            </div>
          </div>
          <div className="footer-bottom">
            <a href="#top" className="brand">
              COSMOVERSE <span>/ 0110</span>
            </a>
            <p>A UNIVERSE OF WORLDS. A TAPESTRY OF REALITIES.</p>
            <span>EXPLORE / LEARN / IMAGINE</span>
          </div>
        </footer>
        <dialog
          ref={menu}
          className="navigation-modal"
          onClose={() => setMenuOpen(false)}
          aria-labelledby="menu-title"
        >
          <div className="modal-toolbar">
            <span id="menu-title">EXPEDITION DIRECTORY / 0110</span>
            <button
              onClick={() => setMenuOpen(false)}
              aria-label="Close navigation"
            >
              CLOSE ×
            </button>
          </div>
          <nav aria-label="Expedition chapters">
            {[
              ["00", "Astro Mech 0110 album", "#album"],
              ["01", "The universe", "#universe"],
              ["02", "The worlds", "#worlds"],
              ["03", "Astro Mech", "#astromech"],
              ["05", "The Ark 11", "#ark11"],
              ["07", "Amethyst core", "#amethyst"],
            ].map(([number, title, href]) => (
              <a key={href} href={href} onClick={() => setMenuOpen(false)}>
                <span>{number}</span>
                {title}
                <i>↗</i>
              </a>
            ))}
          </nav>
          <p>ONE UNIVERSE. INFINITE REALITIES.</p>
        </dialog>
        <dialog
          ref={film}
          className="film-modal"
          onClose={() => setFilmOpen(false)}
          aria-labelledby="film-title"
          onClick={(event) => {
            if (event.target === film.current) setFilmOpen(false);
          }}
        >
          <div className="modal-toolbar">
            <h3 id="film-title">COSMAE / THE FLYBY</h3>
            <button onClick={() => setFilmOpen(false)} aria-label="Close film">
              CLOSE ×
            </button>
          </div>
          {filmOpen && (
            <video
              controls
              autoPlay
              playsInline
              preload="metadata"
              poster="/optimized/sequences/flyby/0.webp"
              aria-label="Cosmae cinematic flyby"
            >
              <source src="/cosmaeFlyby.mp4" type="video/mp4" />
              Your browser does not support video.{" "}
              <a href="/cosmaeFlyby.mp4">Open the flyby film</a>.
            </video>
          )}
        </dialog>
      </main>
    </MotionContext>
  );
}
