import { motion, useReducedMotion } from "framer-motion";
import { easeOutExpo } from "../ui/Reveal";

const nodes = [
  { n: "01", title: "Discover & Consult", sub: "Audit · goals · risk", x: 92, y: 372, lx: 92, ly: 438 },
  { n: "02", title: "Strategize & Design", sub: "Roadmap · architecture", x: 248, y: 176, lx: 248, ly: 112 },
  { n: "03", title: "Build & Implement", sub: "Engineer · secure · ship", x: 404, y: 330, lx: 404, ly: 396 },
  { n: "04", title: "Optimize & Grow", sub: "Measure · scale · evolve", x: 552, y: 128, lx: 552, ly: 64 },
];

const PATH =
  "M92 372 C 170 372, 170 176, 248 176 S 326 330, 404 330 S 474 128, 552 128";

/** Slide 02 visual — animated four-stage workflow graph. */
export default function WorkflowVisual({ active }: { active: boolean }) {
  const reduce = useReducedMotion();

  return (
    <div className="relative">
      <div
        aria-hidden="true"
        className="absolute -inset-8 rounded-[48px] bg-[radial-gradient(55%_55%_at_50%_50%,rgba(29,203,87,0.18),transparent_70%)] blur-2xl"
      />
      <div className="relative aspect-[4/3] overflow-hidden rounded-[22px] border border-white/10 bg-surface-2 sm:rounded-[28px]">
        <div className="bg-grid absolute inset-0 opacity-60 mask-fade-b" />
        <div className="absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-brand/50 to-transparent" />

        <svg
          viewBox="0 0 640 480"
          className="relative h-full w-full"
          role="img"
          aria-label="Workflow: Discover and Consult, Strategize and Design, Build and Implement, Optimize and Grow"
        >
          <defs>
            <linearGradient id="wf-line" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#0E652B" />
              <stop offset="100%" stopColor="#1DCB57" />
            </linearGradient>
            <filter id="wf-glow" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur stdDeviation="6" result="b" />
              <feMerge>
                <feMergeNode in="b" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          {/* rail */}
          <path d={PATH} fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="2" />
          <path
            d={PATH}
            fill="none"
            stroke="rgba(29,203,87,0.35)"
            strokeWidth="1.5"
            strokeDasharray="4 8"
            className="animate-dash"
          />
          {/* drawn progress */}
          <motion.path
            d={PATH}
            fill="none"
            stroke="url(#wf-line)"
            strokeWidth="3"
            strokeLinecap="round"
            filter="url(#wf-glow)"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: active ? 1 : 0 }}
            transition={{ duration: reduce ? 0 : 2.2, ease: easeOutExpo, delay: active ? 0.3 : 0 }}
          />

          {/* travelling pulse */}
          {!reduce && active && (
            <circle r="5" fill="#1DCB57" filter="url(#wf-glow)">
              <animateMotion dur="4.5s" repeatCount="indefinite" path={PATH} begin="1.8s" />
            </circle>
          )}

          {nodes.map((node, i) => (
            <motion.g
              key={node.n}
              initial={{ opacity: 0 }}
              animate={{ opacity: active ? 1 : 0 }}
              transition={{ duration: 0.7, ease: easeOutExpo, delay: active ? 0.35 + i * 0.32 : 0 }}
            >
              <circle cx={node.x} cy={node.y} r="34" fill="rgba(29,203,87,0.06)" stroke="rgba(29,203,87,0.25)" />
              <circle cx={node.x} cy={node.y} r="23" fill="#0B110D" stroke="#1DCB57" strokeWidth="1.6" filter="url(#wf-glow)" />
              <text
                x={node.x}
                y={node.y + 5}
                textAnchor="middle"
                className="fill-white font-display"
                fontSize="15"
                fontWeight="600"
              >
                {node.n}
              </text>
              <text
                x={node.lx}
                y={node.ly}
                textAnchor="middle"
                className="fill-white font-display"
                fontSize="18"
                fontWeight="600"
                letterSpacing="-0.2"
              >
                {node.title}
              </text>
              <text
                x={node.lx}
                y={node.ly + 20}
                textAnchor="middle"
                className="fill-muted font-sans"
                fontSize="13"
              >
                {node.sub}
              </text>
            </motion.g>
          ))}
        </svg>

        <div className="absolute top-4 left-4 flex items-center gap-2 rounded-full border border-white/10 bg-ink/70 px-3 py-1.5 text-[12px] text-muted backdrop-blur sm:top-5 sm:left-5">
          <span className="h-1.5 w-1.5 rounded-full bg-brand shadow-[0_0_10px_#1DCB57]" />
          Delivery pipeline · live
        </div>
      </div>
    </div>
  );
}
