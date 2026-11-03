import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ChevronLeft, ChevronRight, Quote } from "lucide-react";
import { useEffect, useState } from "react";
import SectionHeading from "../components/ui/SectionHeading";
import { easeOutExpo } from "../components/ui/Reveal";
import { testimonials } from "../data/content";

export default function Testimonials() {
  const reduce = useReducedMotion();
  const [i, setI] = useState(0);
  const [paused, setPaused] = useState(false);
  const t = testimonials[i];
  const go = (d: number) => setI((v) => (v + d + testimonials.length) % testimonials.length);

  useEffect(() => {
    if (reduce || paused) return;
    const id = window.setTimeout(() => setI((v) => (v + 1) % testimonials.length), 7000);
    return () => window.clearTimeout(id);
  }, [i, paused, reduce]);

  return (
    <section
      id="testimonials"
      className="relative border-t border-white/[0.06] py-24 sm:py-32"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div className="mx-auto max-w-[1320px] px-4 sm:px-6 lg:px-10">
        <SectionHeading index="06" eyebrow="Client Testimonials" title="What partnership with ZYNX feels like." />

        <div className="relative mt-14 grid gap-10 lg:grid-cols-[1fr_auto] lg:items-end">
          <div className="relative min-h-[300px] sm:min-h-[260px]" aria-live="polite">
            <Quote className="absolute -top-2 -left-1 h-16 w-16 text-brand/15" strokeWidth={1} />
            <AnimatePresence mode="wait" initial={false}>
              <motion.figure
                key={i}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.55, ease: easeOutExpo }}
                className="relative pt-10"
              >
                <blockquote className="max-w-4xl font-display text-[clamp(1.4rem,3vw,2.35rem)] leading-[1.25] font-medium tracking-[-0.025em] text-white">
                  “{t.quote}”
                </blockquote>
                <figcaption className="mt-8 flex items-center gap-4">
                  <span className="grid h-11 w-11 place-items-center rounded-full bg-linear-to-br from-brand-deep to-brand font-display text-[14px] font-semibold text-ink">
                    {t.role
                      .split(" ")
                      .map((w) => w[0])
                      .slice(0, 2)
                      .join("")}
                  </span>
                  <span>
                    <span className="block font-display text-[15px] font-medium text-white">{t.role}</span>
                    <span className="block text-[13.5px] text-muted">{t.org}</span>
                  </span>
                </figcaption>
              </motion.figure>
            </AnimatePresence>
          </div>

          <div className="flex items-center gap-4">
            <div className="flex gap-1.5">
              {testimonials.map((_, k) => (
                <button
                  key={k}
                  type="button"
                  onClick={() => setI(k)}
                  aria-label={`Show testimonial ${k + 1}`}
                  aria-current={k === i}
                  className={`h-1.5 rounded-full transition-all duration-500 ${k === i ? "w-8 bg-brand" : "w-3 bg-white/20 hover:bg-white/40"}`}
                />
              ))}
            </div>
            <button
              type="button"
              onClick={() => go(-1)}
              aria-label="Previous testimonial"
              className="grid h-11 w-11 place-items-center rounded-full border border-white/15 text-white transition hover:border-brand hover:bg-brand hover:text-ink"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button
              type="button"
              onClick={() => go(1)}
              aria-label="Next testimonial"
              className="grid h-11 w-11 place-items-center rounded-full border border-white/15 text-white transition hover:border-brand hover:bg-brand hover:text-ink"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
