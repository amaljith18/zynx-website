import type { ComponentPropsWithoutRef, ReactNode } from "react";

type Variant = "primary" | "ghost" | "link";

const base =
  "group relative inline-flex items-center justify-center gap-2 rounded-full font-display text-[15px] font-medium tracking-tight transition-all duration-300 ease-out-expo focus-visible:outline-2 disabled:pointer-events-none disabled:opacity-50";

const variants: Record<Variant, string> = {
  primary:
    "h-12 px-6 text-ink bg-linear-to-r from-brand to-[#3ee07a] shadow-[0_8px_30px_-10px_rgba(29,203,87,0.75)] hover:shadow-[0_10px_40px_-8px_rgba(29,203,87,0.9)] hover:-translate-y-0.5",
  ghost:
    "h-12 px-6 text-white border border-white/15 bg-white/[0.03] hover:border-brand/60 hover:bg-brand/[0.06]",
  link: "h-auto px-0 text-brand hover:text-white",
};

type CommonProps = { variant?: Variant; icon?: ReactNode; iconLeft?: ReactNode; className?: string };

type AnchorProps = CommonProps & ComponentPropsWithoutRef<"a"> & { href: string };
type NativeButtonProps = CommonProps & ComponentPropsWithoutRef<"button"> & { href?: undefined };

export type ButtonProps = AnchorProps | NativeButtonProps;

export default function Button(props: ButtonProps) {
  const { variant = "primary", icon, iconLeft, className = "", children, ...rest } = props;
  const cls = `${base} ${variants[variant]} ${className}`;
  const inner = (
    <>
      {iconLeft}
      <span>{children}</span>
      {icon && (
        <span className="transition-transform duration-300 ease-out-expo group-hover:translate-x-1">
          {icon}
        </span>
      )}
    </>
  );

  if (typeof rest.href === "string") {
    return (
      <a className={cls} {...(rest as ComponentPropsWithoutRef<"a">)}>
        {inner}
      </a>
    );
  }
  return (
    <button type="button" className={cls} {...(rest as ComponentPropsWithoutRef<"button">)}>
      {inner}
    </button>
  );
}
