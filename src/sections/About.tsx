import { ArrowRight } from "lucide-react";
import Button from "../components/ui/Button";
import Reveal from "../components/ui/Reveal";

const pillars = [
  { k: "Commerce", v: "Digital storefronts and automation that grow revenue." },
  { k: "Security", v: "Protection engineered into every layer, not bolted on." },
  { k: "Consulting", v: "Technology strategy tied to business outcomes." },
  { k: "Logistics", v: "Visibility and control from warehouse to doorstep." },
];

export default function About() {
  return (
    <section id="about" className="relative py-24 sm:py-32">
      <div className="mx-auto grid max-w-[1320px] gap-14 px-4 sm:px-6 lg:grid-cols-12 lg:gap-10 lg:px-10">
        <div className="lg:col-span-5">
          <Reveal>
            <p className="mb-5 flex items-center gap-3 font-display text-[13px] font-medium tracking-[0.2em] text-muted uppercase">
              <span className="text-brand">02</span>
              <span className="h-px w-8 bg-white/20" />
              About ZYNX
            </p>
          </Reveal>
          <Reveal delay={0.08}>
            <h2 className="font-display text-[clamp(2rem,4.6vw,3.6rem)] leading-[1.02] font-semibold tracking-[-0.035em] text-white">
              Four disciplines.
              <br />
              <span className="text-white/40">One</span> <span className="text-gradient">connected</span>{" "}
              <span className="text-white/40">partner.</span>
            </h2>
          </Reveal>
        </div>

        <div className="lg:col-span-6 lg:col-start-7">
          <Reveal delay={0.1}>
            <p className="text-[19px] leading-relaxed text-pretty text-white/90 sm:text-[21px]">
              ZYNX brings e-commerce, cyber security, IT consulting and logistics together, so the
              systems that sell, protect, run and deliver your business are designed as one.
            </p>
          </Reveal>
          <Reveal delay={0.16}>
            <p className="mt-6 text-[16px] leading-relaxed text-muted">
              Most companies juggle separate vendors for each of these — and pay for the gaps between
              them. We close those gaps with a single team that understands how your storefront, your
              infrastructure, your security posture and your supply chain affect one another.
            </p>
          </Reveal>

          <dl className="mt-12 grid gap-px overflow-hidden rounded-2xl border border-white/[0.07] bg-white/[0.07] sm:grid-cols-2">
            {pillars.map((p, i) => (
              <Reveal key={p.k} delay={0.08 * i} className="bg-ink p-6">
                <dt className="flex items-center gap-2 font-display text-[16px] font-medium text-white">
                  <span className="h-1.5 w-1.5 rounded-full bg-brand" />
                  {p.k}
                </dt>
                <dd className="mt-2 text-[14.5px] leading-relaxed text-muted">{p.v}</dd>
              </Reveal>
            ))}
          </dl>

          <Reveal delay={0.2} className="mt-10">
            <Button href="#contact" variant="ghost" icon={<ArrowRight className="h-4 w-4" />}>
              Talk to our team
            </Button>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
