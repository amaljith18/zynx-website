# ZYNX — website

React 19 · TypeScript · Tailwind CSS v4 · Framer Motion · GSAP · Lucide

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # type-check + production build
```

## Hero carousel (`src/components/hero/`)

| Slide | Visual | File |
|---|---|---|
| 01 Our Technology | Your supplied hero animation (unchanged `HeroVideo.tsx`) | `HeroVideoFrame.tsx` → `HeroVideo.tsx` |
| 02 Our Workflow | Animated 4-stage workflow graph | `WorkflowVisual.tsx` |
| 03 Our Solutions | **Relay Delivery animation slot** | `RelayDeliveryHero.tsx` |

- Autoplay every 6.5 s (`SLIDE_MS`). It pauses on hover, keyboard focus, when the video modal is open and when the hero is scrolled away. After a manual arrow, dot or swipe it waits 12 s (`RESUME_AFTER_MS`) and then carries on.
- Swipe on touch or drag on desktop. Left and right arrow keys also work.
- All three visuals stay mounted, so the hero video never reloads between slides.
- The OS "reduce motion" setting turns autoplay off, and the supplied component then shows the poster image instead of the video.

Media is in `public/hero/` (hero.mp4, hero.webm, hero-mobile.mp4, hero-poster.webp, hero-animated.webp).
The supplied `HeroVideo.tsx` is unchanged. It still does autoplay, mute, loop, the mobile source, the poster, reduced-motion handling and the IntersectionObserver pause.

### Adding the Relay Delivery animation
`relay-delivery-hero-code.zip` was a Google AI Studio "cookie check" HTML page, not the app export. Once you have the real export:
1. Put its components in `src/components/hero/relay/` and its media in `public/relay/`.
2. In `RelayDeliveryHero.tsx`, render the animation in place of `<SolutionsVisual />`. Use the `active` prop to start and stop it.
3. Keep it in a 4:3 box so it lines up with slide 01.

## Before launch
These are placeholders to replace:
- Stats and testimonials in `src/data/content.ts`
- Contact details in `Contact.tsx` and `Footer.tsx`
- The contact form submit handler (`onSubmit` in `Contact.tsx`)
