import { useState, useEffect, FormEvent } from "react";
import { Menu, X, Search, MapPin } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  const handleSearch = (e: FormEvent) => {
    e.preventDefault();
    console.log("Searching for:", searchQuery);
    // Implement search functionality here
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
    <header className={`sticky top-0 bg-white z-50 transition-all duration-300 ${isScrolled ? 'shadow-md py-2' : 'py-4'}`}>
      <div className="container mx-auto px-4 lg:px-6">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          {/* Logo */}
          <a href="#home" className="flex items-center">
            <div className="relative">
              <span className="text-lux-red font-montserrat font-bold text-2xl md:text-3xl">Luxembourg</span>
              <span className="text-lux-blue font-montserrat font-bold text-2xl md:text-3xl ml-2">Pas Chère</span>
              <div className="absolute -top-1 -right-3 bg-lux-red text-white text-xs px-1 rounded-full transform rotate-12 font-montserrat font-bold">€</div>
            </div>
          </a>
          
          {/* Search Bar - Desktop */}
          <div className="hidden md:flex w-full max-w-md">
            <form onSubmit={handleSearch} className="flex w-full relative">
              <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                <Search size={18} />
              </div>
              <Input 
                type="text" 
                placeholder="Search for deals, places, activities..." 
                className="pl-10 pr-4 py-2 w-full rounded-l-md border-r-0"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <Button 
                type="submit"
                className="rounded-l-none bg-lux-blue hover:bg-lux-blue/90"
              >
                Search
              </Button>
            </form>
          </div>
          
          {/* Desktop Navigation */}
          <nav className="hidden lg:flex space-x-6">
            <a href="#home" className="font-montserrat text-lux-dark hover:text-lux-red transition-colors font-medium">Home</a>
            <a href="#offers" className="font-montserrat text-lux-dark hover:text-lux-red transition-colors font-medium">Offers</a>
            <a href="#blog" className="font-montserrat text-lux-dark hover:text-lux-red transition-colors font-medium">Blog</a>
            <a href="#about" className="font-montserrat text-lux-dark hover:text-lux-red transition-colors font-medium">About Us</a>
            <a href="#contact" className="font-montserrat text-lux-dark hover:text-lux-red transition-colors font-medium">Contact</a>
          </nav>
          
          {/* Mobile Menu Button */}
          <div className="flex lg:hidden items-center gap-2 ml-auto">
            <button 
              aria-label="Toggle menu"
              className="focus:outline-none p-1" 
              onClick={toggleMenu}
            >
              {isMenuOpen ? (
                <X className="h-6 w-6 text-lux-dark" />
              ) : (
                <Menu className="h-6 w-6 text-lux-dark" />
              )}
            </button>
          </div>
        </div>
        
        {/* Search Bar - Mobile */}
        <div className="mt-3 md:hidden">
          <form onSubmit={handleSearch} className="flex w-full relative">
            <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
              <Search size={16} />
            </div>
            <Input 
              type="text" 
              placeholder="Search..." 
              className="pl-9 pr-4 py-1 w-full rounded-l-md border-r-0 text-sm"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <Button 
              type="submit"
              size="sm"
              className="rounded-l-none bg-lux-blue hover:bg-lux-blue/90 px-3"
            >
              <Search size={16} />
            </Button>
          </form>
        </div>
        
        {/* Mobile Navigation */}
        <div className={`lg:hidden transition-all duration-300 ease-in-out ${isMenuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0 overflow-hidden'}`}>
          <div className="flex flex-col space-y-4 mt-4 pb-4">
            <a href="#home" onClick={closeMenu} className="font-montserrat text-lux-dark hover:text-lux-red transition-colors font-medium flex items-center">
              Home
            </a>
            <a href="#offers" onClick={closeMenu} className="font-montserrat text-lux-dark hover:text-lux-red transition-colors font-medium flex items-center">
              Offers
            </a>
            <a href="#blog" onClick={closeMenu} className="font-montserrat text-lux-dark hover:text-lux-red transition-colors font-medium flex items-center">
              Blog
            </a>
            <a href="#about" onClick={closeMenu} className="font-montserrat text-lux-dark hover:text-lux-red transition-colors font-medium flex items-center">
              About Us
            </a>
            <a href="#contact" onClick={closeMenu} className="font-montserrat text-lux-dark hover:text-lux-red transition-colors font-medium flex items-center">
              Contact
            </a>
            
            <div className="pt-2 border-t border-gray-100">
              <div className="flex items-center gap-2 text-lux-blue">
                <MapPin size={16} className="text-lux-red" />
                <span className="text-sm font-montserrat">Luxembourg City</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
