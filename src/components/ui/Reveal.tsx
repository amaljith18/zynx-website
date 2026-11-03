import { motion, type Variants } from "framer-motion";
import type { ReactNode } from "react";

export const easeOutExpo = [0.22, 1, 0.36, 1] as const;

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 28 },
  show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: easeOutExpo } },
};

export const stagger = (staggerChildren = 0.08, delayChildren = 0): Variants => ({
  hidden: {},
  show: { transition: { staggerChildren, delayChildren } },
});

type RevealProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
};

/** Fades + lifts its children in once, when scrolled into view. */
export default function Reveal({ children, className, delay = 0 }: RevealProps) {
  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "0px 0px -12% 0px" }}
      variants={{
        hidden: fadeUp.hidden,
        show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: easeOutExpo, delay } },
      }}
    >
      {children}
    </motion.div>
  );
}
