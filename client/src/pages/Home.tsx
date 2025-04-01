import { useEffect } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import BackToTop from "@/components/BackToTop";
import Hero from "@/components/Hero";
import CategorySection from "@/components/CategorySection";
import BookSection from "@/components/BookSection";
import OffersSection from "@/components/OffersSection";
import BlogSection from "@/components/BlogSection";
import AboutSection from "@/components/AboutSection";
import AboutProjectSection from "@/components/AboutProjectSection";
import NewsletterSection from "@/components/NewsletterSection";
import ContactSection from "@/components/ContactSection";
import TestimonialsSection from "@/components/TestimonialsSection";

export default function Home() {
  useEffect(() => {
    // Scroll to the top when the component mounts
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <BackToTop />
      <main>
        {/* 1. Hero-Bereich mit prominentem Buch im Zentrum, entsprechend dem Whiteboard-Design */}
        <Hero />
        
        {/* 2. "À propos du livre..." - Über das Buch */}
        <BookSection />
        
        {/* 3. "Découvrir le contenu" - Inhalt entdecken */}
        <AboutProjectSection />
        
        {/* 4. Kategorien - Die Themenbereiche des Buches */}
        <CategorySection />
        
        {/* 5. Angebote und Rabatte - Von Whiteboard abgeleitet */}
        <OffersSection />
        
        {/* 6. Blog/Aktuelles - Entspricht "Actualités" auf dem Whiteboard */}
        <BlogSection />
        
        {/* 7. Über den Autor/die Autorin - Ergänzender Bereich */}
        <AboutSection />
        
        {/* 8. Newsletter - Ermöglicht das Abonnieren von Updates */}
        <NewsletterSection />
        
        {/* 9. "On parle de nous..." - Man spricht über uns (Testimonials/Presse) */}
        <TestimonialsSection />
        
        {/* 10. Kontaktbereich zum Abschluss */}
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
}
