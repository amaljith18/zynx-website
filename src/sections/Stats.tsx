import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useLayoutEffect, useRef } from "react";
import { stats } from "../data/content";

gsap.registerPlugin(ScrollTrigger);

const fmt = (n: number, target: number) => (Number.isInteger(target) ? Math.round(n).toString() : n.toFixed(1));

export default function Stats() {
  const ref = useRef<HTMLElement>(null);

  // GSAP: count up once when the band scrolls into view.
  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.utils.toArray<HTMLElement>(".stat-num").forEach((el) => {
          const target = Number(el.dataset.target);
          const counter = { v: 0 };
          el.textContent = fmt(0, target);
          gsap.to(counter, {
            v: target,
            duration: 1.8,
            ease: "power2.out",
            scrollTrigger: { trigger: el, start: "top 90%", once: true },
            onUpdate: () => {
              el.textContent = fmt(counter.v, target);
            },
          });
        });
      });
    }, ref);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={ref} aria-label="ZYNX in numbers" className="relative border-y border-white/[0.06] bg-surface-2">
      <div className="mx-auto grid max-w-[1320px] grid-cols-2 lg:grid-cols-4">
        {stats.map((s, i) => (
          <div
            key={s.label}
            className={`px-4 py-12 sm:px-10 sm:py-16 ${i % 2 === 1 ? "border-l border-white/[0.06]" : ""} ${
              i > 1 ? "border-t border-white/[0.06] lg:border-t-0" : ""
            } ${i === 2 ? "lg:border-l" : ""}`}
          >
            <p className="font-display text-[clamp(2.4rem,5vw,4.2rem)] leading-none font-semibold tracking-[-0.045em] text-white">
              <span className="stat-num tabular-nums" data-target={s.value}>
                {s.value}
              </span>
              <span className="text-brand">{s.suffix}</span>
            </p>
            <p className="mt-3 text-[14px] text-muted sm:text-[15px]">{s.label}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
