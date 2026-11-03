import SolutionsVisual from "./SolutionsVisual";

/**
 * ───────────────────────────────────────────────────────────────
 *  SLOT: "Relay Delivery" hero animation (carousel slide 03)
 * ───────────────────────────────────────────────────────────────
 *  The uploaded `relay-delivery-hero-code.zip` was not a zip — it was the
 *  Google AI Studio "Cookie check" page saved by the browser, so it held
 *  no animation code.
 *
 *  When you have the real export:
 *    1. Put its component(s) in src/components/hero/relay/
 *    2. Put any media in public/relay/
 *    3. Render it below instead of <SolutionsVisual />.
 *
 *  `active` is true while slide 03 is on screen — use it to start / pause
 *  the animation so it doesn't burn CPU while hidden.
 *  Keep a 4:3 box (aspect-[4/3]) so it lines up with slide 01's video.
 */
export default function RelayDeliveryHero({ active }: { active: boolean }) {
  return <SolutionsVisual active={active} />;
}
