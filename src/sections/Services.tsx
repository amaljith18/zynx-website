import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import type { MouseEvent } from "react";
import SectionHeading from "../components/ui/SectionHeading";
import { fadeUp, stagger } from "../components/ui/Reveal";
import { services, type Service } from "../data/content";

function ServiceCard({ s }: { s: Service }) {
  // Spotlight that follows the cursor (CSS vars → no React re-render).
  const onMove = (e: MouseEvent<HTMLElement>) => {
    const r = e.currentTarget.getBoundingClientRect();
    e.currentTarget.style.setProperty("--mx", `${e.clientX - r.left}px`);
    e.currentTarget.style.setProperty("--my", `${e.clientY - r.top}px`);
  };

  return (
    <motion.article
      variants={fadeUp}
      onMouseMove={onMove}
      whileHover={{ y: -6 }}
      transition={{ type: "spring", stiffness: 300, damping: 26 }}
      className="group relative flex min-h-[420px] flex-col overflow-hidden rounded-[24px] border border-white/[0.08] p-7 transition-colors duration-500 glass hover:border-brand/40 sm:p-8"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={{
          background:
            "radial-gradient(420px circle at var(--mx, 50%) var(--my, 0%), rgba(29,203,87,0.14), transparent 45%)",
        }}
      />
      <div className="relative flex items-start justify-between">
        <span className="grid h-14 w-14 place-items-center rounded-2xl border border-brand/25 bg-linear-to-br from-brand-deep/40 to-brand/10 text-brand shadow-[0_0_30px_-8px_rgba(29,203,87,0.6)] transition-transform duration-500 group-hover:scale-105">
          <s.Icon className="h-6 w-6" strokeWidth={1.8} />
        </span>
        <span className="font-display text-[13px] font-medium tracking-[0.18em] text-white/30">{s.index}</span>
      </div>

      <h3 className="relative mt-10 font-display text-[26px] font-semibold tracking-[-0.03em] text-white">
        {s.title}
      </h3>
      <p className="relative mt-3 text-[15px] leading-relaxed text-muted">{s.description}</p>

      <ul className="relative mt-6 flex flex-wrap gap-1.5">
        {s.tags.map((t) => (
          <li key={t} className="rounded-full border border-white/[0.08] px-2.5 py-1 text-[12px] text-white/65">
            {t}
          </li>
        ))}
      </ul>

      <a
        href="#contact"
        className="relative mt-auto inline-flex items-center gap-2 pt-8 font-display text-[15px] font-medium text-white transition-colors group-hover:text-brand"
        aria-label={`Explore more about ${s.title}`}
      >
        Explore More
        <span className="grid h-8 w-8 place-items-center rounded-full border border-white/15 transition-all duration-300 group-hover:rotate-45 group-hover:border-brand group-hover:bg-brand group-hover:text-ink">
          <ArrowUpRight className="h-4 w-4" />
        </span>
      </a>
    </motion.article>
  );
}

export default function Services() {
  return (
    <section id="services" className="relative border-t border-white/[0.06] py-24 sm:py-32">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-[480px] bg-[radial-gradient(50%_60%_at_50%_0%,rgba(14,101,43,0.25),transparent_70%)]"
      />
      <div className="relative mx-auto max-w-[1320px] px-4 sm:px-6 lg:px-10">
        <SectionHeading
          index="03"
          eyebrow="Services & Solutions"
          align="center"
          title={
            <>
              Everything your business runs on, <span className="text-gradient">engineered as one.</span>
            </>
          }
          description="Four practices that work on their own — and work best together."
        />

        <motion.div
          className="mt-16 grid gap-5 sm:grid-cols-2 xl:grid-cols-4"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "0px 0px -10% 0px" }}
          variants={stagger(0.1)}
        >
          {services.map((s) => (
            <ServiceCard key={s.id} s={s} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
