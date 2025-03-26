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
        <Hero />
        <BookSection />
        <CategorySection />
        <AboutProjectSection />
        <OffersSection />
        <BlogSection />
        <AboutSection />
        <NewsletterSection />
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
}
