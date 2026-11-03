import { MotionConfig } from "framer-motion";
import HeroCarousel from "./components/hero/HeroCarousel";
import Footer from "./components/layout/Footer";
import Navbar from "./components/layout/Navbar";
import About from "./sections/About";
import Contact from "./sections/Contact";
import Services from "./sections/Services";
import Stats from "./sections/Stats";
import TechAdvantage from "./sections/TechAdvantage";
import Testimonials from "./sections/Testimonials";
import WhyChoose from "./sections/WhyChoose";
import WorkflowCarousel from "./sections/WorkflowCarousel";

export default function App() {
  return (
    // reducedMotion="user" → Motion honours the OS "reduce motion" setting everywhere.
    <MotionConfig reducedMotion="user">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:rounded-full focus:bg-brand focus:px-4 focus:py-2 focus:text-ink"
      >
        Skip to content
      </a>
      <Navbar />
      <main id="main">
        <HeroCarousel />
        <WorkflowCarousel />
        <About />
        <Services />
        <WhyChoose />
        <TechAdvantage />
        <Stats />
        <Testimonials />
        <Contact />
      </main>
      <Footer />
    </MotionConfig>
  );
}
