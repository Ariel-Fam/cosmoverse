import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/** Keep consecutive chapters on one scroll clock and refresh their pins in story order. */
export function createChapterScroll({ element, chapter, model = false, compact = false, update }: {
  element: HTMLElement;
  chapter: number;
  model?: boolean;
  compact?: boolean;
  update: (progress: number) => void;
}) {
  const media = gsap.matchMedia();
  media.add({
    all: "all",
    tall: model ? "(min-height: 600px)" : "(min-height: 680px)",
  }, (context) => {
    // A stage taller than the screen must remain in normal flow so all of it is reachable.
    const pinned = Boolean(context.conditions?.tall)
      && element.offsetHeight <= window.innerHeight + 1;
    const clock = { progress: 0 };
    const render = (value: number) => {
      // Brief opening/closing holds let each scene settle before the next chapter enters.
      const progress = gsap.utils.clamp(0, 1, (value - 0.08) / 0.84);
      update(progress);
    };
    const animation = model ? gsap.to(clock, {
      progress: 1, ease: "none", paused: true,
      onUpdate: () => render(clock.progress),
    }) : undefined;
    ScrollTrigger.create({
      trigger: !pinned && model ? element.querySelector('.model-display') : element,
      start: pinned ? "top top" : "top 80%",
      end: pinned ? () => `+=${window.innerHeight * (compact ? 1.25 : model ? 3.2 : 1.6)}` : "bottom 20%",
      animation,
      scrub: model ? 0.65 : undefined,
      pin: pinned,
      pinSpacing: true,
      refreshPriority: 100 - chapter,
      onUpdate: model ? undefined : (self) => render(self.progress),
      onRefresh: (self) => { if (animation) animation.progress(self.progress); else render(self.progress); },
    });
  });
  return () => media.revert();
}
