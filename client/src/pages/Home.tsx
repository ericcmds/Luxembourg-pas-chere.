import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import OffersSection from "@/components/OffersSection";
import CTABanner from "@/components/CTABanner";
import BlogSection from "@/components/BlogSection";
import AboutSection from "@/components/AboutSection";
import TestimonialsSection from "@/components/TestimonialsSection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main>
        <HeroSection />
        <OffersSection />
        <CTABanner />
        <BlogSection />
        <AboutSection />
        <TestimonialsSection />
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
}
