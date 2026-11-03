type LogoProps = { className?: string; href?: string };

/** ZYNX wordmark — a monogram "Z" tile plus custom-tracked Space Grotesk letters. */
export default function Logo({ className = "", href = "#top" }: LogoProps) {
  return (
    <a
      href={href}
      aria-label="ZYNX — back to top"
      className={`group inline-flex items-center gap-2.5 ${className}`}
    >
      <span className="relative grid h-9 w-9 place-items-center overflow-hidden rounded-[10px] bg-linear-to-br from-brand-deep to-brand shadow-[0_0_24px_-6px_rgba(29,203,87,0.7)]">
        <svg viewBox="0 0 24 24" className="h-[18px] w-[18px]" aria-hidden="true">
          <path
            d="M5.5 5.5h13L5.5 18.5h13"
            fill="none"
            stroke="#080A09"
            strokeWidth="2.8"
            strokeLinejoin="miter"
          />
        </svg>
        <span className="absolute inset-0 -translate-x-full bg-linear-to-r from-transparent via-white/40 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
      </span>
      <span className="font-display text-[21px] leading-none font-bold tracking-[0.22em] text-white">
        ZYN
        <span className="relative text-brand">
          X
          <span className="absolute -right-1.5 -bottom-0.5 h-1.5 w-1.5 rounded-full bg-brand" />
        </span>
      </span>
    </a>
  );
}
