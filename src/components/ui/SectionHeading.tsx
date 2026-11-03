import type { ReactNode } from "react";
import Reveal from "./Reveal";

type Props = {
  index: string;
  eyebrow: string;
  title: ReactNode;
  description?: ReactNode;
  align?: "left" | "center";
  className?: string;
};

export default function SectionHeading({
  index,
  eyebrow,
  title,
  description,
  align = "left",
  className = "",
}: Props) {
  const centered = align === "center";
  return (
    <div className={`${centered ? "mx-auto max-w-3xl text-center" : "max-w-3xl"} ${className}`}>
      <Reveal>
        <p
          className={`mb-5 flex items-center gap-3 font-display text-[13px] font-medium tracking-[0.2em] text-muted uppercase ${
            centered ? "justify-center" : ""
          }`}
        >
          <span className="text-brand">{index}</span>
          <span className="h-px w-8 bg-white/20" />
          {eyebrow}
        </p>
      </Reveal>
      <Reveal delay={0.08}>
        <h2 className="font-display text-[clamp(2rem,4.6vw,3.6rem)] leading-[1.02] font-semibold tracking-[-0.035em] text-balance text-white">
          {title}
        </h2>
      </Reveal>
      {description && (
        <Reveal delay={0.16}>
          <p className="mt-6 text-[17px] leading-relaxed text-pretty text-muted">{description}</p>
        </Reveal>
      )}
    </div>
  );
}
