import { MotionConfig } from "motion/react";
import Navbar from "./sections/Navbar";
import Hero from "./sections/Hero";
import Rails from "./sections/Rails";
import Story from "./sections/Story";
import CardSection from "./sections/CardSection";
import Features from "./sections/Features";
import Security from "./sections/Security";
import Stats from "./sections/Stats";
import Reviews from "./sections/Reviews";
import Download from "./sections/Download";
import Footer from "./sections/Footer";

export default function App() {
  return (
    // Respect the OS "reduce motion" setting for every animation
    <MotionConfig reducedMotion="user">
      <Navbar />
      <main>
        <Hero />
        <Rails />
        <Story />
        <CardSection />
        <Features />
        <Security />
        <Stats />
        <Reviews />
        <Download />
      </main>
      <Footer />
    </MotionConfig>
  );
}
