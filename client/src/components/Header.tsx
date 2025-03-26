import { useState, useEffect } from "react";
import { Link } from "wouter";
import MobileMenu from "./ui/MobileMenu";
import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <header className={`sticky top-0 bg-white z-50 transition-shadow duration-300 ${isScrolled ? 'shadow-md' : ''}`}>
      <div className="container mx-auto px-6">
        <div className="flex justify-between items-center py-4">
          {/* Logo */}
          <Link href="#home" className="flex items-center space-x-2">
            <div className="w-10 h-10 bg-[#E60023] rounded-full flex items-center justify-center">
              <span className="text-white font-montserrat font-bold text-lg">LPC</span>
            </div>
            <div className="font-montserrat font-bold text-[#333333]">
              <span>Luxembourg</span>
              <span className="text-[#E60023]">Pas Chère</span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
            <a href="#home" className="font-montserrat text-[#333333] hover:text-[#E60023] transition-colors duration-200">Home</a>
            <a href="#offers" className="font-montserrat text-[#333333] hover:text-[#E60023] transition-colors duration-200">Offers</a>
            <a href="#blog" className="font-montserrat text-[#333333] hover:text-[#E60023] transition-colors duration-200">Blog</a>
            <a href="#about" className="font-montserrat text-[#333333] hover:text-[#E60023] transition-colors duration-200">About</a>
            <a href="#contact" className="font-montserrat text-[#333333] hover:text-[#E60023] transition-colors duration-200">Contact</a>
          </nav>

          {/* Mobile Menu Button */}
          <Button 
            variant="ghost" 
            className="md:hidden text-[#333333] p-2" 
            onClick={toggleMobileMenu}
            aria-label="Menu"
          >
            <Menu className="h-6 w-6" />
          </Button>
        </div>

        {/* Mobile Navigation */}
        <MobileMenu isOpen={isMobileMenuOpen} onClose={() => setIsMobileMenuOpen(false)} />
      </div>
    </header>
  );
}
