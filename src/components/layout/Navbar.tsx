import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight, Menu, X } from "lucide-react";
import { useEffect, useState } from "react";
import Button from "../ui/Button";
import Logo from "../ui/Logo";
import { easeOutExpo } from "../ui/Reveal";

export const navLinks = [
  { label: "About", href: "#about" },
  { label: "Services", href: "#services" },
  { label: "Workflow", href: "#workflow" },
  { label: "Why ZYNX", href: "#why" },
  { label: "Technology", href: "#technology" },
  { label: "Contact", href: "#contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <header className="fixed inset-x-0 top-0 z-50 px-3 sm:px-6">
      <motion.div
        initial={{ y: -24, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: easeOutExpo }}
        className={`mx-auto mt-3 flex h-16 max-w-[1320px] items-center justify-between rounded-full px-4 transition-all duration-500 sm:mt-4 sm:px-6 lg:px-8 ${
          scrolled || open
            ? "border border-white/[0.08] bg-ink/75 shadow-[0_10px_40px_-20px_rgba(0,0,0,0.9)] backdrop-blur-xl"
            : "border border-transparent"
        }`}
      >
        <Logo />

        <nav aria-label="Primary" className="hidden lg:block">
          <ul className="flex items-center gap-1">
            {navLinks.map((l) => (
              <li key={l.href}>
                <a
                  href={l.href}
                  className="relative rounded-full px-4 py-2 text-[14px] text-white/75 transition-colors hover:text-white"
                >
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-2">
          <span className="hidden sm:block">
            <Button href="#contact" className="h-10! px-5! text-[14px]!" icon={<ArrowUpRight className="h-4 w-4" />}>
              Start a project
            </Button>
          </span>
          <button
            type="button"
            className="grid h-10 w-10 place-items-center rounded-full border border-white/15 text-white lg:hidden"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            aria-controls="mobile-menu"
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </motion.div>

      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            className="fixed inset-x-3 top-[84px] bottom-3 overflow-y-auto rounded-3xl border border-white/[0.08] bg-ink/95 p-6 backdrop-blur-xl sm:inset-x-6 lg:hidden"
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.35, ease: easeOutExpo }}
          >
            <nav aria-label="Mobile">
              <ul className="flex flex-col">
                {navLinks.map((l, i) => (
                  <motion.li
                    key={l.href}
                    initial={{ opacity: 0, x: -12 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.05 + i * 0.04, duration: 0.4, ease: easeOutExpo }}
                  >
                    <a
                      href={l.href}
                      onClick={() => setOpen(false)}
                      className="flex items-center justify-between border-b border-white/[0.07] py-4 font-display text-[26px] font-medium tracking-tight text-white"
                    >
                      {l.label}
                      <span className="font-display text-[13px] text-brand">0{i + 1}</span>
                    </a>
                  </motion.li>
                ))}
              </ul>
            </nav>
            <Button href="#contact" onClick={() => setOpen(false)} className="mt-8 w-full" icon={<ArrowUpRight className="h-4 w-4" />}>
              Start a project
            </Button>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
