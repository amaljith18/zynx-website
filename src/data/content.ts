import {
  TrendingUp,
  Boxes,
  Cloud,
  Code,
  Compass,
  Cpu,
  Globe,
  Handshake,
  Layers,
  LifeBuoy,
  Lock,
  Network,
  Rocket,
  Search,
  ShieldCheck,
  ShoppingBag,
  Truck,
  type LucideIcon,
} from "lucide-react";

/* ───────────── Services ───────────── */
export type Service = {
  id: string;
  index: string;
  title: string;
  description: string;
  tags: string[];
  Icon: LucideIcon;
};

export const services: Service[] = [
  {
    id: "ecommerce",
    index: "01",
    title: "E-commerce",
    description:
      "Modern e-commerce platforms, online stores, digital commerce and business automation built to convert and scale.",
    tags: ["Storefronts", "Marketplaces", "Payments", "Automation"],
    Icon: ShoppingBag,
  },
  {
    id: "security",
    index: "02",
    title: "Cyber Security",
    description:
      "Security infrastructure, risk management, protection and cybersecurity consulting that keeps your business resilient.",
    tags: ["Zero-trust", "Risk audits", "SOC & monitoring", "Compliance"],
    Icon: ShieldCheck,
  },
  {
    id: "consulting",
    index: "03",
    title: "IT Consulting",
    description:
      "Technology strategy, digital transformation, infrastructure and IT solutions aligned to measurable business outcomes.",
    tags: ["Strategy", "Cloud", "Infrastructure", "Transformation"],
    Icon: Network,
  },
  {
    id: "logistics",
    index: "04",
    title: "Logistics",
    description:
      "Smart logistics, transportation, supply chain and delivery solutions with real-time visibility end to end.",
    tags: ["Fleet", "Supply chain", "Last-mile", "Tracking"],
    Icon: Truck,
  },
];

/* ───────────── Workflow ───────────── */
export type Stage = {
  index: string;
  title: string;
  summary: string;
  description: string;
  deliverables: string[];
  duration: string;
  Icon: LucideIcon;
};

export const stages: Stage[] = [
  {
    index: "01",
    title: "Discover & Consult",
    summary: "Understand the business before touching the technology.",
    description:
      "We map your goals, operations, systems and risks through workshops and audits — so every recommendation is grounded in how your business actually works.",
    deliverables: ["Stakeholder workshops", "Systems & security audit", "Opportunity map"],
    duration: "1–2 weeks",
    Icon: Search,
  },
  {
    index: "02",
    title: "Plan & Strategize",
    summary: "A clear roadmap with priorities, budget and risk.",
    description:
      "We turn findings into an actionable plan: target architecture, phased roadmap, success metrics and a security model designed in from day one.",
    deliverables: ["Solution architecture", "Phased roadmap", "KPIs & budget"],
    duration: "1–3 weeks",
    Icon: Compass,
  },
  {
    index: "03",
    title: "Build & Deploy",
    summary: "Engineered, secured and shipped in short cycles.",
    description:
      "Cross-functional teams build in iterative sprints, with automated testing, security reviews and zero-downtime releases into your environment.",
    deliverables: ["Iterative sprints", "Security hardening", "Launch & handover"],
    duration: "4–16 weeks",
    Icon: Code,
  },
  {
    index: "04",
    title: "Optimize & Grow",
    summary: "Measure, improve and scale what works.",
    description:
      "After launch we monitor, report and continuously optimise — tuning performance, strengthening defences and expanding what drives growth.",
    deliverables: ["24/7 monitoring", "Performance reports", "Continuous improvement"],
    duration: "Ongoing",
    Icon: Rocket,
  },
];

/* ───────────── Why choose us ───────────── */
export const reasons: { title: string; text: string; Icon: LucideIcon }[] = [
  { title: "One accountable partner", text: "Commerce, security, IT and logistics under one roof — one team, one point of accountability.", Icon: Handshake },
  { title: "Security by design", text: "Every solution is threat-modelled and hardened from the first line of architecture.", Icon: Lock },
  { title: "Built to scale", text: "Cloud-native foundations that grow with your traffic, catalogue and operations.", Icon: Layers },
  { title: "Outcome-driven", text: "We agree measurable KPIs up front and report against them, transparently.", Icon: TrendingUp },
  { title: "International mindset", text: "Delivery practices and standards that work across markets, time zones and regulations.", Icon: Globe },
  { title: "Long-term support", text: "Proactive monitoring and a dedicated team long after launch day.", Icon: LifeBuoy },
];

/* ───────────── Technology advantage ───────────── */
export const techLayers: { name: string; detail: string; Icon: LucideIcon }[] = [
  { name: "Experience layer", detail: "Headless storefronts · portals · apps", Icon: ShoppingBag },
  { name: "Integration layer", detail: "APIs · ERP / CRM · event streaming", Icon: Boxes },
  { name: "Cloud & data", detail: "Multi-cloud · analytics · automation", Icon: Cloud },
  { name: "Security fabric", detail: "Zero-trust · SIEM · identity", Icon: ShieldCheck },
  { name: "Operations", detail: "Fleet · warehouse · tracking", Icon: Cpu },
];

/* ───────────── Stats ─────────────
 * PLACEHOLDER figures — replace with your real, verifiable numbers before launch. */
export const stats: { value: number; suffix: string; label: string }[] = [
  { value: 4, suffix: "", label: "Integrated practice areas" },
  { value: 24, suffix: "/7", label: "Monitoring & support" },
  { value: 99.9, suffix: "%", label: "Target platform uptime" },
  { value: 100, suffix: "%", label: "Security-first delivery" },
];

/* ───────────── Testimonials ─────────────
 * PLACEHOLDER quotes — swap for real client testimonials (with permission) before launch. */
export const testimonials: { quote: string; role: string; org: string }[] = [
  {
    quote:
      "ZYNX re-platformed our online store and hardened our infrastructure in the same programme. One team, one plan — and a launch with zero downtime.",
    role: "Head of Digital",
    org: "Retail group · placeholder",
  },
  {
    quote:
      "Their security assessment was the clearest we have received. Prioritised, practical, and they stayed to fix what they found.",
    role: "Chief Technology Officer",
    org: "Financial services · placeholder",
  },
  {
    quote:
      "Real-time visibility across our fleet changed how we plan every day. Deliveries are faster and our customers notice.",
    role: "Operations Director",
    org: "Distribution company · placeholder",
  },
];
