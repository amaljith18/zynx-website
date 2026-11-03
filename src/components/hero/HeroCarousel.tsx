import { motion, useReducedMotion, type PanInfo, type Variants } from "framer-motion";
import gsap from "gsap";
import { ArrowRight, ChevronLeft, ChevronRight, Play } from "lucide-react";
import { useCallback, useEffect, useLayoutEffect, useRef, useState, type ReactNode } from "react";
import Button from "../ui/Button";
import { easeOutExpo } from "../ui/Reveal";
import HeroVideoFrame from "./HeroVideoFrame";
import RelayDeliveryHero from "./RelayDeliveryHero";
import VideoModal from "./VideoModal";
import WorkflowVisual from "./WorkflowVisual";

/* ───────────── config ───────────── */
const DEFAULT_SLIDE_MS = 6000; // fallback autoplay interval
const RESUME_AFTER_MS = 12000; // autoplay resumes this long after a manual interaction
const SWIPE_PX = 60;

type SlideAction = "explore" | "watch" | "discover";

type Slide = {
  id: string;
  label: string;
  /** how long this slide stays on screen during autoplay (ms) */
  duration: number;
  eyebrow: string;
  title: ReactNode[];
  description: string;
  actions: SlideAction[];
  extra?: ReactNode;
  visual: (active: boolean) => ReactNode;
};

const slides: Slide[] = [
  {
    id: "technology",
    label: "Our Technology",
    duration: 3000,
    eyebrow: "01 — Our Technology",
    title: ["Secure.", "Scale.", <span className="text-gradient">Succeed.</span>],
    description:
      "Your trusted partner in E-commerce, Cyber Security, IT Consulting and Logistics — driving innovation, security and growth.",
    actions: ["explore", "watch"],
    visual: () => <HeroVideoFrame />,
  },
  {
    id: "workflow",
    label: "Our Workflow",
    duration: 6000,
    eyebrow: "02 — Our Workflow",
    title: ["From Strategy", <>to <span className="text-gradient">Success.</span></>],
    description:
      "Turning complex business challenges into intelligent, secure and scalable solutions.",
    actions: ["explore"],
    extra: (
      <ol className="grid max-w-md grid-cols-2 gap-x-6 gap-y-2.5 text-[14px] text-muted">
        {["Discover & Consult", "Strategize & Design", "Build & Implement", "Optimize & Grow"].map(
          (s, i) => (
            <li key={s} className="flex items-center gap-2.5">
              <span className="font-display text-[12px] font-semibold text-brand">0{i + 1}</span>
              {s}
            </li>
          )
        )}
      </ol>
    ),
    visual: (active) => <WorkflowVisual active={active} />,
  },
  {
    id: "solutions",
    label: "Our Solutions",
    duration: 3000,
    eyebrow: "03 — Our Solutions",
    title: ["Technology That", "Moves Business", <span className="text-gradient">Forward.</span>],
    description: "One partner. Multiple capabilities. Endless possibilities.",
    actions: ["discover"],
    extra: (
      <ul className="flex max-w-lg flex-wrap gap-2">
        {["E-commerce Solutions", "Cyber Security", "IT Consulting", "Logistics Solutions"].map((s) => (
          <li
            key={s}
            className="rounded-full border border-white/12 bg-white/[0.03] px-3.5 py-1.5 text-[13px] text-white/85"
          >
            {s}
          </li>
        ))}
      </ul>
    ),
    // ⬇ the Relay Delivery animation slot
    visual: (active) => <RelayDeliveryHero active={active} />,
  },
];

/* ───────────── motion ───────────── */
const textGroup: Variants = {
  hide: { transition: { staggerChildren: 0.03, staggerDirection: -1 } },
  show: { transition: { staggerChildren: 0.085, delayChildren: 0.18 } },
};
const textItem: Variants = {
  hide: { opacity: 0, y: 26, filter: "blur(8px)", transition: { duration: 0.35, ease: "easeIn" } },
  show: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 0.8, ease: easeOutExpo } },
};

/* ───────────── component ───────────── */
export default function HeroCarousel() {
  const reduce = useReducedMotion();
  const [index, setIndex] = useState(0);
  const [dir, setDir] = useState<1 | -1>(1);
  const [hovering, setHovering] = useState(false);
  const [focusWithin, setFocusWithin] = useState(false);
  const [userHold, setUserHold] = useState(false);
  const [videoOpen, setVideoOpen] = useState(false);
  const holdTimer = useRef<number | undefined>(undefined);
  const rootRef = useRef<HTMLElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(true);

  const autoplay = !reduce && !hovering && !focusWithin && !userHold && !videoOpen && inView;

  const go = useCallback((delta: 1 | -1) => {
    setDir(delta);
    setIndex((i) => (i + delta + slides.length) % slides.length);
  }, []);

  /** Any manual interaction pauses autoplay, then resumes after a quiet period. */
  const holdAutoplay = useCallback(() => {
    setUserHold(true);
    window.clearTimeout(holdTimer.current);
    holdTimer.current = window.setTimeout(() => setUserHold(false), RESUME_AFTER_MS);
  }, []);
  useEffect(() => () => window.clearTimeout(holdTimer.current), []);

  const closeVideo = useCallback(() => setVideoOpen(false), []);

  const manualGo = (delta: 1 | -1) => {
    holdAutoplay();
    go(delta);
  };
  const goTo = (i: number) => {
    if (i === index) return;
    holdAutoplay();
    setDir(i > index ? 1 : -1);
    setIndex(i);
  };

  const onDragEnd = (_: unknown, info: PanInfo) => {
    if (info.offset.x < -SWIPE_PX || info.velocity.x < -500) manualGo(1);
    else if (info.offset.x > SWIPE_PX || info.velocity.x > 500) manualGo(-1);
  };

  // Stop autoplay while the hero is scrolled away.
  useEffect(() => {
    const el = rootRef.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => setInView(e.isIntersecting), { threshold: 0.25 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  // GSAP: slow ambient drift of the background glows.
  useLayoutEffect(() => {
    if (!bgRef.current) return;
    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.to(".hero-orb-a", { xPercent: 18, yPercent: -12, duration: 14, ease: "sine.inOut", repeat: -1, yoyo: true });
        gsap.to(".hero-orb-b", { xPercent: -22, yPercent: 16, duration: 18, ease: "sine.inOut", repeat: -1, yoyo: true });
      });
    }, bgRef);
    return () => ctx.revert();
  }, []);

  const renderAction = (a: SlideAction) => {
    switch (a) {
      case "explore":
        return (
          <Button key={a} href="#services" icon={<ArrowRight className="h-4 w-4" />}>
            Explore Solutions
          </Button>
        );
      case "watch":
        return (
          <Button
            key={a}
            variant="ghost"
            onClick={() => setVideoOpen(true)}
            iconLeft={
              <span className="grid h-6 w-6 place-items-center rounded-full bg-brand text-ink">
                <Play className="h-3 w-3 translate-x-[1px] fill-current" />
              </span>
            }
            className="pl-3"
          >
            Watch Video
          </Button>
        );
      case "discover":
        return (
          <Button key={a} href="#services" icon={<ArrowRight className="h-4 w-4" />}>
            Discover What We Do
          </Button>
        );
    }
  };

  return (
    <section
      id="top"
      ref={rootRef}
      aria-roledescription="carousel"
      aria-label="ZYNX highlights"
      className="relative isolate overflow-hidden pt-24 sm:pt-28 lg:flex lg:h-[100svh] lg:max-h-[1000px] lg:min-h-[640px] lg:flex-col lg:justify-center lg:pt-20"
      onMouseEnter={() => setHovering(true)}
      onMouseLeave={() => setHovering(false)}
      onFocus={() => setFocusWithin(true)}
      onBlur={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget as Node | null)) setFocusWithin(false);
      }}
      onKeyDown={(e) => {
        if (e.key === "ArrowRight") manualGo(1);
        if (e.key === "ArrowLeft") manualGo(-1);
      }}
    >
      {/* ambient background */}
      <div ref={bgRef} aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
        <div className="bg-grid absolute inset-0 opacity-50 [mask-image:radial-gradient(70%_60%_at_60%_40%,#000,transparent)]" />
        <div className="hero-orb-a absolute top-[8%] right-[8%] h-[38rem] w-[38rem] rounded-full bg-[radial-gradient(circle,rgba(29,203,87,0.16),transparent_62%)]" />
        <div className="hero-orb-b absolute bottom-[-10%] left-[-10%] h-[34rem] w-[34rem] rounded-full bg-[radial-gradient(circle,rgba(14,101,43,0.28),transparent_65%)]" />
        <div className="absolute inset-x-0 bottom-0 h-40 bg-linear-to-b from-transparent to-ink" />
      </div>

      <div className="mx-auto w-full max-w-[1320px] px-4 sm:px-6 lg:px-10">
        <motion.div
          drag="x"
          dragConstraints={{ left: 0, right: 0 }}
          dragElastic={0.14}
          dragMomentum={false}
          onDragEnd={onDragEnd}
          className="grid cursor-grab items-center gap-10 active:cursor-grabbing lg:grid-cols-[minmax(0,1.15fr)_minmax(0,1fr)] lg:gap-12 xl:gap-16"
        >
          {/* ── text (all slides stacked in one grid cell → no layout jump) ── */}
          <div className="grid">
            {slides.map((s, i) => {
              const active = i === index;
              return (
                <motion.div
                  key={s.id}
                  id={`hero-slide-${s.id}`}
                  role="group"
                  aria-roledescription="slide"
                  aria-label={`${i + 1} of ${slides.length}: ${s.label}`}
                  aria-hidden={!active}
                  inert={!active}
                  className={`[grid-area:1/1] flex flex-col justify-center ${active ? "" : "pointer-events-none"}`}
                  variants={textGroup}
                  initial={i === 0 ? "hide" : false}
                  animate={active ? "show" : "hide"}
                >
                  <motion.p
                    variants={textItem}
                    className="mb-5 inline-flex w-fit items-center gap-2.5 rounded-full border border-brand/25 bg-brand/[0.07] py-1.5 pr-4 pl-2 font-display text-[12.5px] font-medium tracking-[0.14em] text-brand uppercase"
                  >
                    <span className="h-1.5 w-1.5 rounded-full bg-brand shadow-[0_0_10px_#1DCB57]" />
                    {s.eyebrow}
                  </motion.p>

                  <h1 className="font-display text-[clamp(2.4rem,min(5.2vw,8svh),4.5rem)] leading-[0.95] font-semibold tracking-[-0.045em] text-white">
                    {s.title.map((line, li) => (
                      <motion.span key={li} variants={textItem} className="block">
                        {line}
                      </motion.span>
                    ))}
                  </h1>

                  <motion.p
                    variants={textItem}
                    className="mt-5 max-w-xl text-[16px] leading-relaxed text-pretty text-muted sm:text-[18px]"
                  >
                    {s.description}
                  </motion.p>

                  {s.extra && (
                    <motion.div variants={textItem} className="mt-5">
                      {s.extra}
                    </motion.div>
                  )}

                  <motion.div variants={textItem} className="mt-7 flex flex-wrap items-center gap-3">
                    {s.actions.map(renderAction)}
                  </motion.div>
                </motion.div>
              );
            })}
          </div>

          {/* ── visual (stacked as well; HeroVideo stays mounted, never reloads) ── */}
          <div className="grid">
            {slides.map((s, i) => {
              const active = i === index;
              return (
                <motion.div
                  key={s.id}
                  aria-hidden={!active}
                  className={`[grid-area:1/1] w-full lg:ml-auto lg:max-w-[min(100%,calc((100svh-300px)*4/3))] ${active ? "z-10" : "pointer-events-none z-0"}`}
                  initial={false}
                  animate={
                    active
                      ? { opacity: 1, x: 0, scale: 1, filter: "blur(0px)" }
                      : {
                          opacity: 0,
                          x: reduce ? 0 : 60 * -dir,
                          // only slide 01 (hero video) zooms; slides 02–03 just slide + fade
                          scale: i === 0 ? 0.96 : 1,
                          filter: "blur(6px)",
                        }
                  }
                  transition={{ duration: 0.9, ease: easeOutExpo }}
                >
                  {s.visual(active)}
                </motion.div>
              );
            })}
          </div>
        </motion.div>

        {/* ── controls ── */}
        <div className="mt-10 flex items-center justify-between gap-6 border-t border-white/[0.07] pt-4 pb-8 lg:mt-8 lg:pb-6">
          <div className="flex flex-1 items-center gap-2 sm:gap-4" role="tablist" aria-label="Choose slide">
            {slides.map((s, i) => {
              const active = i === index;
              return (
                <button
                  key={s.id}
                  type="button"
                  role="tab"
                  aria-selected={active}
                  aria-controls={`hero-slide-${s.id}`}
                  onClick={() => goTo(i)}
                  className="group flex max-w-[220px] flex-1 flex-col gap-3 py-2 text-left"
                >
                  <span className="relative h-[3px] w-full overflow-hidden rounded-full bg-white/10">
                    {active && (
                      <span
                        key={`${index}-${reduce ? "r" : "a"}`}
                        className={`absolute inset-0 origin-left rounded-full bg-linear-to-r from-brand-deep to-brand ${
                          reduce ? "" : "animate-hero-progress"
                        }`}
                        style={{
                          animationDuration: `${slides[index].duration || DEFAULT_SLIDE_MS}ms`,
                          animationPlayState: autoplay ? "running" : "paused",
                        }}
                        onAnimationEnd={() => {
                          if (!reduce) go(1);
                        }}
                      />
                    )}
                  </span>
                  <span
                    className={`hidden font-display text-[13px] tracking-wide transition-colors sm:block ${
                      active ? "text-white" : "text-muted group-hover:text-white"
                    }`}
                  >
                    <span className={active ? "text-brand" : ""}>0{i + 1}</span>
                    <span className="mx-2 text-white/20">/</span>
                    {s.label}
                  </span>
                </button>
              );
            })}
          </div>

          <div className="flex items-center gap-3">
            <span className="hidden font-display text-[13px] text-muted tabular-nums md:block">
              <span className="text-white">0{index + 1}</span> / 0{slides.length}
            </span>
            <button
              type="button"
              onClick={() => manualGo(-1)}
              aria-label="Previous slide"
              className="grid h-11 w-11 place-items-center rounded-full border border-white/15 text-white transition hover:border-brand hover:bg-brand hover:text-ink"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button
              type="button"
              onClick={() => manualGo(1)}
              aria-label="Next slide"
              className="grid h-11 w-11 place-items-center rounded-full border border-white/15 text-white transition hover:border-brand hover:bg-brand hover:text-ink"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>

      <p className="sr-only" aria-live="polite">
        Slide {index + 1} of {slides.length}: {slides[index].label}
      </p>

      <VideoModal open={videoOpen} onClose={closeVideo} />
    </section>
  );
}
