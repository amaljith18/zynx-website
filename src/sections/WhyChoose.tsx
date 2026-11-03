import { motion } from "framer-motion";
import SectionHeading from "../components/ui/SectionHeading";
import { fadeUp, stagger } from "../components/ui/Reveal";
import { reasons } from "../data/content";

export default function WhyChoose() {
  return (
    <section id="why" className="relative border-t border-white/[0.06] py-24 sm:py-32">
      <div className="mx-auto max-w-[1320px] px-4 sm:px-6 lg:px-10">
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <div className="lg:sticky lg:top-32">
              <SectionHeading
                index="04"
                eyebrow="Why Choose Us"
                title={
                  <>
                    The partner you <span className="text-gradient">don't outgrow.</span>
                  </>
                }
                description="We combine the breadth of a consultancy with the focus of a specialist team — and stay accountable for the result."
              />
            </div>
          </div>

          <motion.ul
            className="grid border-t border-l border-white/[0.08] sm:grid-cols-2 lg:col-span-8"
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "0px 0px -10% 0px" }}
            variants={stagger(0.07)}
          >
            {reasons.map(({ title, text, Icon }, i) => (
              <motion.li
                key={title}
                variants={fadeUp}
                className="group relative border-r border-b border-white/[0.08] p-7 transition-colors duration-500 hover:bg-white/[0.02] sm:p-9"
              >
                <span className="absolute top-0 left-0 h-px w-0 bg-brand transition-all duration-700 group-hover:w-full" />
                <div className="flex items-center justify-between">
                  <Icon className="h-6 w-6 text-brand" strokeWidth={1.7} />
                  <span className="font-display text-[12px] tracking-[0.18em] text-white/25">0{i + 1}</span>
                </div>
                <h3 className="mt-8 font-display text-[20px] font-medium tracking-tight text-white">{title}</h3>
                <p className="mt-2.5 text-[15px] leading-relaxed text-muted">{text}</p>
              </motion.li>
            ))}
          </motion.ul>
        </div>
      </div>
    </section>
  );
}
