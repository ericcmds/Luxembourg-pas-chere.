import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  // Add scroll event listener to detect when to add shadow
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className={`sticky top-0 bg-white z-50 transition-shadow ${isScrolled ? 'shadow-md' : ''}`}>
      <div className="container mx-auto px-6 py-4">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <a href="#" className="flex items-center">
            <span className="text-lux-red font-montserrat font-bold text-2xl">Luxembourg</span>
            <span className="text-lux-blue font-montserrat font-bold text-2xl ml-2">Pas Chère</span>
          </a>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
            <a href="#home" className="font-montserrat text-lux-dark hover:text-lux-red transition-colors">Home</a>
            <a href="#offers" className="font-montserrat text-lux-dark hover:text-lux-red transition-colors">Offers</a>
            <a href="#blog" className="font-montserrat text-lux-dark hover:text-lux-red transition-colors">Blog</a>
            <a href="#about" className="font-montserrat text-lux-dark hover:text-lux-red transition-colors">About</a>
            <a href="#contact" className="font-montserrat text-lux-dark hover:text-lux-red transition-colors">Contact</a>
          </nav>
          
          {/* Mobile Menu Button */}
          <button 
            aria-label="Toggle menu"
            className="md:hidden focus:outline-none" 
            onClick={toggleMenu}
          >
            {isMenuOpen ? (
              <X className="h-6 w-6 text-lux-dark" />
            ) : (
              <Menu className="h-6 w-6 text-lux-dark" />
            )}
          </button>
        </div>
        
        {/* Mobile Navigation */}
        <div className={`md:hidden transition-all duration-300 ease-in-out ${isMenuOpen ? 'max-h-64 opacity-100' : 'max-h-0 opacity-0 overflow-hidden'}`}>
          <div className="flex flex-col space-y-4 mt-4 pb-4">
            <a href="#home" onClick={closeMenu} className="font-montserrat text-lux-dark hover:text-lux-red transition-colors">Home</a>
            <a href="#offers" onClick={closeMenu} className="font-montserrat text-lux-dark hover:text-lux-red transition-colors">Offers</a>
            <a href="#blog" onClick={closeMenu} className="font-montserrat text-lux-dark hover:text-lux-red transition-colors">Blog</a>
            <a href="#about" onClick={closeMenu} className="font-montserrat text-lux-dark hover:text-lux-red transition-colors">About</a>
            <a href="#contact" onClick={closeMenu} className="font-montserrat text-lux-dark hover:text-lux-red transition-colors">Contact</a>
          </div>
        </div>
      </div>
    </header>
  );
}
