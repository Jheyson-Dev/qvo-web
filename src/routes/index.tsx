/* eslint-disable react-refresh/only-export-components */
import { createFileRoute } from "@tanstack/react-router";
import { Navbar } from "../features/landing/components/Navbar";
import { HeroSection } from "../features/landing/components/HeroSection";
import { FeaturedCarousel } from "../features/landing/components/FeaturedCarousel";
import { useLandingStore } from "../features/landing/stores/useLandingStore";
import { motion, AnimatePresence } from "motion/react";
import { Marquee3DSection } from "../features/landing/components/Marquee3DSection";
import { BentoSection } from "../features/landing/components/BentoSection";
import { Footer } from "../features/landing/components/Footer";
export const Route = createFileRoute("/")({
  component: LandingPage,
});

function LandingPage() {
  const activeAnime = useLandingStore((state) => state.activeAnime);

  return (
    <div className="w-full bg-background text-foreground font-sans selection:bg-primary selection:text-primary-foreground">
      {/* --- HERO SECTION --- */}
      <section className="relative min-h-dvh w-full overflow-hidden flex flex-col">
        {/* Background Image */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeAnime.bg}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8 }}
            className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-transform duration-[20s] hover:scale-105"
            style={{ backgroundImage: `url("${activeAnime.bg}")` }}
          />
        </AnimatePresence>

        {/* Cinematic Gradient Overlay (Radial Curvo Perfecto) */}
        <div className="absolute inset-0 bg-hero-radial" />

        {/* Degradado lateral extra sutil solo para que el texto principal siempre sea legible */}
        <div className="absolute inset-0 bg-linear-to-r from-background/30 via-background/5 to-transparent dark:from-black/60 dark:via-black/10" />

        {/* Degradado inferior para asegurar que la imagen se funda 100% perfecto con la siguiente sección */}
        <div className="absolute inset-x-0 bottom-0 h-40 bg-linear-to-t from-background to-transparent pointer-events-none" />

        {/* Navigation */}
        <Navbar />

        {/* Main Content Layout */}
        <main className="relative z-10 flex-1 flex flex-col lg:flex-row items-center justify-between w-full h-full px-8 md:px-16 pt-32 pb-24">
          {/* Left Side: Hero Text */}
          <div className="w-full lg:w-1/2 flex items-center h-full">
            <HeroSection />
          </div>

          {/* Right Side: Featured Carousel */}
          <div className="w-full lg:w-1/2 flex items-end lg:items-end justify-end h-full mt-16 lg:mt-24">
            <FeaturedCarousel />
          </div>
        </main>
      </section>

      {/* --- EXTRA CONTENT SECTION (BENTO GRID) --- */}
      <BentoSection />

      {/* --- REVIEWS 3D SECTION --- */}
      <Marquee3DSection />

      {/* --- FOOTER --- */}
      <Footer />
    </div>
  );
}
