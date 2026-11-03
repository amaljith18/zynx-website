import { motion } from "framer-motion";
import { Network, ShieldCheck, ShoppingBag, Truck } from "lucide-react";
import { easeOutExpo } from "../ui/Reveal";

const satellites = [
  { label: "E-commerce", Icon: ShoppingBag, pos: "left-[6%] top-[12%]", line: "M 320 240 L 120 92" },
  { label: "Cyber Security", Icon: ShieldCheck, pos: "right-[6%] top-[12%]", line: "M 320 240 L 520 92" },
  { label: "IT Consulting", Icon: Network, pos: "left-[6%] bottom-[12%]", line: "M 320 240 L 120 388" },
  { label: "Logistics", Icon: Truck, pos: "right-[6%] bottom-[12%]", line: "M 320 240 L 520 388" },
];

/** Hub-and-spoke visual: one partner, four capabilities. */
export default function SolutionsVisual({ active }: { active: boolean }) {
  return (
    <div className="relative">
      <div
        aria-hidden="true"
        className="absolute -inset-8 rounded-[48px] bg-[radial-gradient(55%_55%_at_50%_50%,rgba(29,203,87,0.2),transparent_70%)] blur-2xl"
      />
      <div className="relative aspect-[4/3] overflow-hidden rounded-[22px] border border-white/10 bg-surface-2 sm:rounded-[28px]">
        <div className="bg-dots absolute inset-0" />

        {/* orbit rings */}
        <div aria-hidden="true" className="absolute inset-0 grid place-items-center">
          <div className="aspect-square w-[62%] animate-spin-slow rounded-full border border-dashed border-white/10" />
        </div>
        <div aria-hidden="true" className="absolute inset-0 grid place-items-center">
          <div className="aspect-square w-[40%] animate-spin-slower rounded-full border border-brand/20">
            <span className="absolute top-1/2 -left-1 h-2 w-2 rounded-full bg-brand shadow-[0_0_12px_#1DCB57]" />
          </div>
        </div>

        {/* spokes */}
        <svg viewBox="0 0 640 480" className="absolute inset-0 h-full w-full" aria-hidden="true">
          {satellites.map((s, i) => (
            <g key={s.label}>
              <path d={s.line} stroke="rgba(255,255,255,0.08)" strokeWidth="1.5" />
              <motion.path
                d={s.line}
                stroke="#1DCB57"
                strokeWidth="1.5"
                strokeDasharray="3 7"
                className="animate-dash"
                initial={{ opacity: 0 }}
                animate={{ opacity: active ? 1 : 0 }}
                transition={{ duration: 1, ease: easeOutExpo, delay: active ? 0.4 + i * 0.12 : 0 }}
              />
            </g>
          ))}
        </svg>

        {/* hub */}
        <motion.div
          className="absolute inset-0 grid place-items-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: active ? 1 : 0 }}
          transition={{ duration: 0.8, ease: easeOutExpo, delay: active ? 0.2 : 0 }}
        >
          <div className="relative grid aspect-square w-[24%] place-items-center rounded-[28%] bg-linear-to-br from-brand-deep to-brand shadow-[0_0_80px_-10px_rgba(29,203,87,0.8)]">
            <span className="font-display text-[clamp(14px,2.4vw,22px)] font-bold tracking-[0.2em] text-ink">ZYNX</span>
          </div>
        </motion.div>

        {/* satellites */}
        {satellites.map(({ label, Icon, pos }, i) => (
          <motion.div
            key={label}
            className={`glass absolute ${pos} flex items-center gap-2 rounded-xl px-2.5 py-2 sm:gap-3 sm:rounded-2xl sm:px-3.5 sm:py-3`}
            initial={{ opacity: 0, y: 12 }}
            animate={active ? { opacity: 1, y: 0 } : { opacity: 0, y: 12 }}
            transition={{ duration: 0.7, ease: easeOutExpo, delay: active ? 0.55 + i * 0.12 : 0 }}
          >
            <span className="grid h-7 w-7 place-items-center rounded-lg bg-brand/12 text-brand sm:h-9 sm:w-9 sm:rounded-xl">
              <Icon className="h-4 w-4 sm:h-[18px] sm:w-[18px]" strokeWidth={2} />
            </span>
            <span className="font-display text-[11px] font-medium text-white sm:text-[14px]">{label}</span>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
