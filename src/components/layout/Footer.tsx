import { ArrowUp, ArrowUpRight } from "lucide-react";
import { services } from "../../data/content";
import Logo from "../ui/Logo";
import { navLinks } from "./Navbar";

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="relative overflow-hidden border-t border-white/[0.06] pt-20">
      <div className="mx-auto max-w-[1320px] px-4 sm:px-6 lg:px-10">
        {/* CTA band */}
        <div className="flex flex-col justify-between gap-8 border-b border-white/[0.06] pb-16 md:flex-row md:items-end">
          <h2 className="max-w-2xl font-display text-[clamp(2rem,5vw,3.8rem)] leading-[1.02] font-semibold tracking-[-0.04em] text-white">
            Ready to secure, scale and <span className="text-gradient">succeed?</span>
          </h2>
          <a
            href="#contact"
            className="group inline-flex items-center gap-4 font-display text-[18px] font-medium text-white"
          >
            Start a conversation
            <span className="grid h-14 w-14 place-items-center rounded-full bg-brand text-ink transition-transform duration-500 group-hover:rotate-45">
              <ArrowUpRight className="h-6 w-6" />
            </span>
          </a>
        </div>

        <div className="grid gap-12 py-16 sm:grid-cols-2 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <Logo />
            <p className="mt-6 max-w-sm text-[15px] leading-relaxed text-muted">
              E-commerce, cyber security, IT consulting and logistics — engineered together by one
              accountable partner.
            </p>
          </div>

          <nav aria-label="Solutions" className="lg:col-span-2 lg:col-start-7">
            <p className="font-display text-[13px] tracking-[0.18em] text-white/40 uppercase">Solutions</p>
            <ul className="mt-5 grid gap-3">
              {services.map((s) => (
                <li key={s.id}>
                  <a href="#services" className="text-[15px] text-white/75 transition-colors hover:text-brand">
                    {s.title}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-label="Company" className="lg:col-span-2">
            <p className="font-display text-[13px] tracking-[0.18em] text-white/40 uppercase">Company</p>
            <ul className="mt-5 grid gap-3">
              {navLinks.slice(0, 5).map((l) => (
                <li key={l.href}>
                  <a href={l.href} className="text-[15px] text-white/75 transition-colors hover:text-brand">
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="lg:col-span-2">
            <p className="font-display text-[13px] tracking-[0.18em] text-white/40 uppercase">Contact</p>
            <ul className="mt-5 grid gap-3 text-[15px] text-white/75">
              <li>
                <a href="mailto:hello@zynx.com" className="transition-colors hover:text-brand">
                  hello@zynx.com
                </a>
              </li>
              <li>Dubai, UAE</li>
            </ul>
          </div>
        </div>

        <div className="flex flex-col-reverse items-start justify-between gap-4 border-t border-white/[0.06] py-8 text-[13px] text-muted sm:flex-row sm:items-center">
          <p>© {year} ZYNX. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <a href="#" className="hover:text-white">Privacy</a>
            <a href="#" className="hover:text-white">Terms</a>
            <a
              href="#top"
              className="inline-flex items-center gap-2 text-white transition-colors hover:text-brand"
            >
              Back to top <ArrowUp className="h-4 w-4" />
            </a>
          </div>
        </div>
      </div>

      {/* oversized wordmark */}
      <p
        aria-hidden="true"
        className="pointer-events-none -mb-[0.22em] text-center font-display text-[30vw] leading-none font-bold tracking-[-0.06em] text-transparent select-none [-webkit-text-stroke:1px_rgba(255,255,255,0.06)]"
      >
        ZYNX
      </p>
    </footer>
  );
}
