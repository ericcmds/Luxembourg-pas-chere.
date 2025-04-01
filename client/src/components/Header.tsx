import { useState, useEffect } from "react";
import MobileMenu from './ui/MobileMenu';
import { useLanguage } from '@/contexts/LanguageContext';
import { Instagram } from "lucide-react";

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { language, setLanguage, t } = useLanguage();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Searching for:", searchQuery);

    // Basic search functionality implementation
    if (searchQuery.trim()) {
      // Normally this would navigate to search results, for now just alert
      alert(`Searching for: ${searchQuery}`);
    }
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
    <header className={`sticky-top ${isScrolled ? 'shadow' : ''}`} style={{ transition: 'all 0.3s ease', background: 'white', zIndex: 1030 }}>
      <nav className="navbar navbar-expand-lg navbar-light py-2" aria-label="Site Navigation">
        <div className="container">
          {/* Logo */}
          <a className="navbar-brand d-flex align-items-center" href="#home" aria-label="Luxembourg Pas Chère Homepage">
            <div className="position-relative">
              <span className="font-montserrat fw-bold fs-4 text-lux-red">Luxembourg</span>
              <span className="font-montserrat fw-bold fs-4 text-lux-blue ms-2">Pas Chère</span>
              <div className="position-absolute" style={{ top: '-5px', right: '-12px', background: '#E31837', color: 'white', padding: '0 4px', borderRadius: '50%', transform: 'rotate(12deg)', fontSize: '12px', fontWeight: 'bold' }} aria-hidden="true">€</div>
            </div>
          </a>

          {/* Hamburger Button for Mobile */}
          <button 
            className="navbar-toggler" 
            type="button" 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)} // Toggle mobile menu
            aria-controls="navbarContent" 
            aria-expanded={mobileMenuOpen} // Update aria-expanded
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          {/* Collapsible Navigation Content - Rechts ausgerichtet wie im Whiteboard-Design */}
          <div className={`collapse navbar-collapse ${mobileMenuOpen ? 'show' : ''}`} id="navbarContent"> {/* Add show class when open */}
            {/* Navigation Links - Rechtsausgerichtet */}
            <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <a className="nav-link font-montserrat fw-medium px-3" href="#home">
                  Accueil
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link font-montserrat fw-medium px-3" href="#about">
                  À propos
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link font-montserrat fw-medium px-3" href="#book">
                  Livre
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link font-montserrat fw-medium px-3" href="#contact">
                  Contact
                </a>
              </li>
              {/* Instagram Icon gemäß dem Whiteboard-Design */}
              <li className="nav-item d-none d-lg-block">
                <a className="nav-link px-3" href="https://www.instagram.com/luxembourgpaschere/" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
                  <div className="social-icon instagram-gradient rounded-circle d-flex align-items-center justify-content-center" style={{ width: "32px", height: "32px", background: "radial-gradient(circle at 30% 107%, #fdf497 0%, #fdf497 5%, #fd5949 45%, #d6249f 60%, #285AEB 90%)" }}>
                    <Instagram size={16} color="white" />
                  </div>
                </a>
              </li>
              {/* Sprachauswahl */}
              <li className="nav-item dropdown">
                <a 
                  className="nav-link dropdown-toggle font-montserrat fw-medium px-3" 
                  href="#" 
                  id="languageDropdown" 
                  role="button" 
                  data-bs-toggle="dropdown" 
                  aria-expanded="false"
                >
                  {language.toUpperCase()}
                </a>
                <ul className="dropdown-menu dropdown-menu-end" aria-labelledby="languageDropdown">
                  <li>
                    <button 
                      className={`dropdown-item ${language === 'fr' ? 'active' : ''}`} 
                      onClick={() => setLanguage('fr')}
                    >
                      Français
                    </button>
                  </li>
                  <li>
                    <button 
                      className={`dropdown-item ${language === 'de' ? 'active' : ''}`} 
                      onClick={() => setLanguage('de')}
                    >
                      Deutsch
                    </button>
                  </li>
                  <li>
                    <button 
                      className={`dropdown-item ${language === 'en' ? 'active' : ''}`} 
                      onClick={() => setLanguage('en')}
                    >
                      English
                    </button>
                  </li>
                </ul>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      <MobileMenu isOpen={mobileMenuOpen} onClose={() => setMobileMenuOpen(false)} />
    </header>
  );
}