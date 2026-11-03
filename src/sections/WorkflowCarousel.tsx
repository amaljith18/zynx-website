import { AnimatePresence, motion, useReducedMotion, type PanInfo } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Check, ChevronLeft, ChevronRight, Clock } from "lucide-react";
import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
import SectionHeading from "../components/ui/SectionHeading";
import { easeOutExpo } from "../components/ui/Reveal";
import { stages } from "../data/content";

gsap.registerPlugin(ScrollTrigger);

const STEP_MS = 5500;

export default function WorkflowCarousel() {
  const reduce = useReducedMotion();
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const [inView, setInView] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const railRef = useRef<HTMLDivElement>(null);
  const fillRef = useRef<HTMLDivElement>(null);
  const tabsRef = useRef<HTMLDivElement>(null);

  const select = useCallback((i: number) => {
    setActive((i + stages.length) % stages.length);
  }, []);

  // Autoplay while visible and not hovered.
  useEffect(() => {
    if (reduce || paused || !inView) return;
    const t = window.setTimeout(() => select(active + 1), STEP_MS);
    return () => window.clearTimeout(t);
  }, [active, paused, inView, reduce, select]);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => setInView(e.isIntersecting), { threshold: 0.35 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  // GSAP: draw the timeline rail when the section scrolls into view.
  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.fromTo(
          ".wf-rail",
          { scaleX: 0 },
          {
            scaleX: 1,
            ease: "power3.out",
            duration: 1.4,
            scrollTrigger: { trigger: railRef.current, start: "top 85%" },
          }
        );
        gsap.from(".wf-node", {
          y: 24,
          opacity: 0,
          duration: 0.8,
          ease: "power3.out",
          stagger: 0.12,
          scrollTrigger: { trigger: railRef.current, start: "top 85%" },
        });
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  // GSAP: progress fill follows the active stage.
  useEffect(() => {
    if (!fillRef.current) return;
    gsap.to(fillRef.current, {
      scaleX: active / (stages.length - 1),
      duration: reduce ? 0 : 0.9,
      ease: "power3.inOut",
    });
    // keep the active tab visible on small screens
    const tab = tabsRef.current?.querySelectorAll<HTMLButtonElement>("[role=tab]")[active];
    const rail = tabsRef.current;
    if (tab && rail && rail.scrollWidth > rail.clientWidth) {
      rail.scrollTo({ left: tab.offsetLeft - 16, behavior: reduce ? "auto" : "smooth" });
    }
  }, [active, reduce]);

  const onDragEnd = (_: unknown, info: PanInfo) => {
    if (info.offset.x < -50) select(active + 1);
    else if (info.offset.x > 50) select(active - 1);
  };

  const stage = stages[active];

  return (
    <section
      id="workflow"
      ref={sectionRef}
      className="relative overflow-hidden border-t border-white/[0.06] py-24 sm:py-32"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div className="mx-auto max-w-[1320px] px-4 sm:px-6 lg:px-10">
        <div className="flex flex-col justify-between gap-8 lg:flex-row lg:items-end">
          <SectionHeading
            index="01"
            eyebrow="Our Workflow"
            title={
              <>
                How we turn ideas into <span className="text-gradient">real business results.</span>
              </>
            }
            description="A proven four-stage process that keeps strategy, security and delivery moving together — from the first conversation to measurable growth."
          />
          <div className="flex gap-3">
            <button
              type="button"
              aria-label="Previous stage"
              onClick={() => select(active - 1)}
              className="grid h-12 w-12 place-items-center rounded-full border border-white/15 text-white transition hover:border-brand hover:bg-brand hover:text-ink"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button
              type="button"
              aria-label="Next stage"
              onClick={() => select(active + 1)}
              className="grid h-12 w-12 place-items-center rounded-full border border-white/15 text-white transition hover:border-brand hover:bg-brand hover:text-ink"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* ── timeline ── */}
        <div ref={railRef} className="relative mt-16 sm:mt-20">
          {/* rail (desktop) */}
          <div className="absolute top-[34px] right-[12.5%] left-[12.5%] hidden h-px md:block">
            <div className="wf-rail h-full origin-left bg-white/12" />
            <div
              ref={fillRef}
              style={{ transform: "scaleX(0)" }}
              className="absolute inset-0 origin-left bg-linear-to-r from-brand-deep to-brand shadow-[0_0_14px_rgba(29,203,87,0.8)]"
            />
          </div>

          <div
            ref={tabsRef}
            role="tablist"
            aria-label="Workflow stages"
            className="no-scrollbar -mx-4 flex snap-x snap-mandatory gap-3 overflow-x-auto px-4 md:mx-0 md:grid md:grid-cols-4 md:gap-0 md:overflow-visible md:px-0"
          >
            {stages.map((s, i) => {
              const isActive = i === active;
              const done = i < active;
              return (
                <button
                  key={s.index}
                  type="button"
                  role="tab"
                  id={`wf-tab-${i}`}
                  aria-selected={isActive}
                  aria-controls="wf-panel"
                  onClick={() => select(i)}
                  className={`wf-node group relative flex w-[72%] shrink-0 snap-start flex-col items-start gap-4 rounded-2xl border p-5 text-left transition-colors sm:w-[46%] md:w-auto md:items-center md:border-0 md:bg-transparent md:p-0 md:text-center ${
                    isActive ? "border-brand/40 bg-brand/[0.06]" : "border-white/[0.08] bg-surface/60"
                  }`}
                >
                  <span
                    className={`relative grid h-[68px] w-[68px] place-items-center rounded-full border transition-all duration-500 ${
                      isActive
                        ? "border-brand bg-[#0B110D] text-brand shadow-[0_0_0_6px_rgba(29,203,87,0.08),0_0_40px_-4px_rgba(29,203,87,0.7)]"
                        : done
                          ? "border-brand/50 bg-[#0B110D] text-brand/80"
                          : "border-white/15 bg-ink text-muted group-hover:border-white/30 group-hover:text-white"
                    }`}
                  >
                    {isActive && !reduce && (
                      <span className="absolute inset-0 animate-ping-soft rounded-full border border-brand/50" />
                    )}
                    <s.Icon className="h-6 w-6" strokeWidth={1.8} />
                  </span>
                  <span>
                    <span
                      className={`block font-display text-[44px] leading-none font-semibold tracking-[-0.04em] transition-colors md:text-[52px] ${
                        isActive ? "text-white" : "text-white/15 group-hover:text-white/30"
                      }`}
                    >
                      {s.index}
                    </span>
                    <span
                      className={`mt-2 block font-display text-[17px] font-medium tracking-tight transition-colors ${
                        isActive ? "text-brand" : "text-white/80"
                      }`}
                    >
                      {s.title}
                    </span>
                    <span className="mt-1.5 block max-w-[240px] text-[13.5px] leading-snug text-muted md:mx-auto">
                      {s.summary}
                    </span>
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* ── detail panel ── */}
        <motion.div
          drag="x"
          dragConstraints={{ left: 0, right: 0 }}
          dragElastic={0.12}
          onDragEnd={onDragEnd}
          className="relative mt-12 overflow-hidden rounded-[28px] border border-white/[0.08] bg-surface/70 sm:mt-16"
        >
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(60%_80%_at_100%_0%,rgba(29,203,87,0.12),transparent_60%)]" />
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={stage.index}
              id="wf-panel"
              role="tabpanel"
              aria-labelledby={`wf-tab-${active}`}
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.5, ease: easeOutExpo }}
              className="relative grid gap-10 p-6 sm:p-10 lg:grid-cols-[auto_1fr_auto] lg:items-center lg:gap-16 lg:p-14"
            >
              <span className="font-display text-[88px] leading-[0.8] font-semibold tracking-[-0.06em] text-transparent [-webkit-text-stroke:1.5px_rgba(29,203,87,0.6)] sm:text-[128px]">
                {stage.index}
              </span>
              <div className="max-w-xl">
                <h3 className="font-display text-[28px] font-semibold tracking-[-0.03em] text-white sm:text-[34px]">
                  {stage.title}
                </h3>
                <p className="mt-4 text-[16px] leading-relaxed text-muted">{stage.description}</p>
                <p className="mt-6 inline-flex items-center gap-2 text-[13px] text-white/70">
                  <Clock className="h-4 w-4 text-brand" /> Typical duration · {stage.duration}
                </p>
              </div>
              <ul className="grid gap-3 lg:min-w-[260px]">
                {stage.deliverables.map((d) => (
                  <li
                    key={d}
                    className="flex items-center gap-3 rounded-xl border border-white/[0.07] bg-ink/50 px-4 py-3 text-[14.5px] text-white"
                  >
                    <span className="grid h-6 w-6 place-items-center rounded-full bg-brand/15 text-brand">
                      <Check className="h-3.5 w-3.5" strokeWidth={3} />
                    </span>
                    {d}
                  </li>
                ))}
              </ul>
            </motion.div>
          </AnimatePresence>

          {/* step progress */}
          <div className="relative flex gap-1.5 px-6 pb-6 sm:px-10 lg:px-14">
            {stages.map((s, i) => (
              <span
                key={s.index}
                className={`h-1 flex-1 rounded-full transition-colors duration-500 ${i <= active ? "bg-brand" : "bg-white/10"}`}
              />
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
