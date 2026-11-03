import { ShieldCheck, Zap } from "lucide-react";
import HeroVideo from "./HeroVideo";

/**
 * Presents the supplied HeroVideo on the dark site.
 * The video is rendered on #FEFEFE, so it sits inside a light "device" panel
 * whose background matches the video edges exactly — no visible seams.
 */
export default function HeroVideoFrame() {
  return (
    <div className="relative">
      {/* green halo */}
      <div
        aria-hidden="true"
        className="absolute -inset-8 rounded-[48px] bg-[radial-gradient(60%_60%_at_60%_55%,rgba(29,203,87,0.28),transparent_70%)] blur-2xl"
      />
      <div className="relative overflow-hidden rounded-[22px] bg-[#FEFEFE] p-0 shadow-[0_40px_120px_-40px_rgba(0,0,0,0.9)] ring-1 ring-white/10 sm:rounded-[28px]">
        <HeroVideo className="block aspect-[4/3] object-cover" />
      </div>

      {/* floating status chips */}
      <div className="glass absolute top-4 -left-3 hidden items-center gap-2.5 rounded-full py-2 pr-4 pl-2.5 text-[13px] text-white shadow-xl sm:flex lg:-left-8">
        <span className="relative grid h-6 w-6 place-items-center rounded-full bg-brand/15">
          <span className="absolute inset-0 animate-ping-soft rounded-full bg-brand/40" />
          <Zap className="relative h-3.5 w-3.5 text-brand" strokeWidth={2.4} />
        </span>
        Systems connected
      </div>
      <div className="glass absolute -right-3 bottom-6 hidden items-center gap-3 rounded-2xl px-4 py-3 shadow-xl sm:flex lg:-right-6">
        <ShieldCheck className="h-5 w-5 text-brand" strokeWidth={2} />
        <div className="leading-tight">
          <p className="font-display text-[13px] font-semibold text-white">Zero-trust secured</p>
          <p className="text-[12px] text-muted">End-to-end encrypted</p>
        </div>
      </div>
    </div>
  );
}
