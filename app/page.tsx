import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import PropertiesSection from "@/components/PropertiesSection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="relative min-h-screen bg-background text-foreground">
      <Navbar />

      <div id="hero" data-section="hero">
        <HeroSection />
      </div>

      <div id="about" data-section="about">
        <AboutSection />
      </div>

      <div id="properties" data-section="properties">
        <PropertiesSection />
      </div>

      <div id="contact" data-section="contact">
        <ContactSection />
      </div>

      <Footer />
    </main>
  );
}
