"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Looping hero animation.
 * Put the media files in /public/hero/ :
 *   hero.webm, hero.mp4, hero-mobile.mp4, hero-poster.webp
 *
 * Video background is #FEFEFE — use bg-[#FEFEFE] on the hero section
 * so the edges blend seamlessly.
 */
export default function HeroVideo({ className = "" }: { className?: string }) {
  const ref = useRef<HTMLVideoElement>(null);
  const [reduceMotion, setReduceMotion] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduceMotion(mq.matches);
    const onChange = (e: MediaQueryListEvent) => setReduceMotion(e.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  // Pause when scrolled out of view to save CPU/battery
  useEffect(() => {
    const v = ref.current;
    if (!v || reduceMotion) return;
    const io = new IntersectionObserver(
      ([entry]) => (entry.isIntersecting ? v.play().catch(() => {}) : v.pause()),
      { threshold: 0.1 }
    );
    io.observe(v);
    return () => io.disconnect();
  }, [reduceMotion]);

  if (reduceMotion) {
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src="/hero/hero-poster.webp"
        alt=""
        width={1600}
        height={1200}
        className={`h-auto w-full ${className}`}
      />
    );
  }

  return (
    <video
      ref={ref}
      className={`h-auto w-full ${className}`}
      width={1600}
      height={1200}
      poster="/hero/hero-poster.webp"
      autoPlay
      muted
      loop
      playsInline
      preload="metadata"
      aria-hidden="true"
    >
      <source src="/hero/hero-mobile.mp4" type="video/mp4" media="(max-width: 767px)" />
      <source src="/hero/hero.webm" type="video/webm" />
      <source src="/hero/hero.mp4" type="video/mp4" />
    </video>
  );
}

/* Usage:
<section className="bg-[#FEFEFE]">
  <div className="mx-auto grid max-w-7xl items-center gap-12 px-6 py-20 lg:grid-cols-2">
    <div>…headline / CTA…</div>
    <HeroVideo />
  </div>
</section>
*/
