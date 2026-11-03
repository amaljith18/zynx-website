import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { CircleCheck } from "lucide-react";
import { useLayoutEffect, useRef } from "react";
import SectionHeading from "../components/ui/SectionHeading";
import Reveal from "../components/ui/Reveal";
import { techLayers } from "../data/content";

gsap.registerPlugin(ScrollTrigger);

const points = [
  "Cloud-native, API-first architecture",
  "Security controls mapped to recognised frameworks",
  "Real-time data across commerce and operations",
  "Automated testing, monitoring and recovery",
];

export default function TechAdvantage() {
  const stackRef = useRef<HTMLDivElement>(null);

  // GSAP: layers assemble from a fanned-out stack as you scroll.
  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.from(".tech-layer", {
          y: (i: number) => 40 + i * 18,
          opacity: 0,
          duration: 1,
          ease: "power3.out",
          stagger: 0.1,
          scrollTrigger: { trigger: stackRef.current, start: "top 80%" },
        });
        gsap.to(".tech-scan", {
          yPercent: 900,
          duration: 4.5,
          ease: "none",
          repeat: -1,
        });
      });
    }, stackRef);
    return () => ctx.revert();
  }, []);

  return (
    <section id="technology" className="relative overflow-hidden border-t border-white/[0.06] py-24 sm:py-32">
      <div className="mx-auto grid max-w-[1320px] items-center gap-16 px-4 sm:px-6 lg:grid-cols-2 lg:px-10">
        <div>
          <SectionHeading
            index="05"
            eyebrow="Our Technology Advantage"
            title={
              <>
                A modern stack, <span className="text-gradient">secured end to end.</span>
              </>
            }
            description="We build on proven, open and cloud-native technology — connected through clean APIs and wrapped in a security fabric that sees every layer."
          />
          <div className="mt-10 grid gap-4" role="list">
            {points.map((p, i) => (
              <Reveal key={p} delay={0.06 * i}>
                <p role="listitem" className="flex items-start gap-3 text-[16px] text-white/85">
                  <CircleCheck className="mt-0.5 h-5 w-5 shrink-0 text-brand" strokeWidth={1.8} />
                  {p}
                </p>
              </Reveal>
            ))}
          </div>
        </div>

        <div ref={stackRef} className="relative">
          <div
            aria-hidden="true"
            className="absolute -inset-10 bg-[radial-gradient(50%_50%_at_50%_50%,rgba(29,203,87,0.16),transparent_70%)] blur-2xl"
          />
          <div className="relative overflow-hidden rounded-[28px] border border-white/[0.08] bg-surface-2 p-4 sm:p-6">
            <div className="tech-scan pointer-events-none absolute inset-x-0 -top-10 h-10 bg-linear-to-b from-transparent via-brand/15 to-transparent" />
            <div className="mb-4 flex items-center justify-between px-1 font-display text-[12px] tracking-[0.16em] text-muted uppercase">
              <span>zynx / platform</span>
              <span className="flex items-center gap-2 text-brand">
                <span className="h-1.5 w-1.5 rounded-full bg-brand shadow-[0_0_10px_#1DCB57]" />
                all systems normal
              </span>
            </div>
            <ul className="grid gap-2.5">
              {techLayers.map(({ name, detail, Icon }, i) => (
                <li
                  key={name}
                  className={`tech-layer flex items-center gap-4 rounded-2xl border px-4 py-4 sm:px-5 ${
                    i === 3 ? "border-brand/35 bg-brand/[0.06]" : "border-white/[0.07] bg-ink/60"
                  }`}
                >
                  <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-white/[0.04] text-brand">
                    <Icon className="h-5 w-5" strokeWidth={1.8} />
                  </span>
                  <div className="min-w-0 flex-1">
                    <p className="font-display text-[15.5px] font-medium text-white">{name}</p>
                    <p className="truncate text-[13px] text-muted">{detail}</p>
                  </div>
                  <span className="hidden font-mono text-[11px] text-white/35 sm:block">L{techLayers.length - i}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
