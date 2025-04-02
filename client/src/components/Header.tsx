import { useState, useEffect } from "react";
import MobileMenu from './ui/MobileMenu';
import { useLanguage } from '@/contexts/LanguageContext';
import { Instagram } from "lucide-react";

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { language, setLanguage } = useLanguage();

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
    <header 
      className={`sticky-top ${isScrolled ? 'shadow' : ''}`} 
      style={{ 
        transition: 'all 0.3s ease', 
        background: 'white', 
        zIndex: 1030 
      }}
    >
      <div className="container">
        <nav className="navbar navbar-expand-lg navbar-light py-3" aria-label="Site Navigation">
          <div className="d-flex justify-content-between align-items-center w-100">
            {/* Logo - exakt wie im Screenshot */}
            <a 
              className="navbar-brand d-flex align-items-center" 
              href="#home" 
              aria-label="Luxembourg Pas Chère Homepage"
            >
              <div className="d-flex align-items-center">
                <span className="font-montserrat fw-bold fs-4 text-lux-red me-2">Luxembourg</span>
                <span className="font-montserrat fw-bold fs-4 text-lux-dark">Pas Chère</span>
              </div>
            </a>

            {/* Autor Info - wie im Screenshot */}
            <div className="d-none d-md-flex align-items-center me-auto ms-4">
              <div className="text-muted small">
                <div className="fw-medium">PASCAL ZADRUK</div>
                <div className="opacity-75">02/03/22</div>
              </div>
            </div>

            {/* Hamburger Button for Mobile */}
            <button 
              className="navbar-toggler border-0" 
              type="button" 
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)} 
              aria-controls="navbarContent" 
              aria-expanded={mobileMenuOpen}
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>

            {/* Navigation Links - exakt wie im Screenshot */}
            <div className="collapse navbar-collapse flex-grow-0" id="navbarContent">
              <ul className="navbar-nav align-items-center">
                <li className="nav-item">
                  <a 
                    className="nav-link font-montserrat fw-medium px-3" 
                    href="#home"
                  >
                    Accueil
                  </a>
                </li>
                <li className="nav-item">
                  <a 
                    className="nav-link font-montserrat fw-medium px-3" 
                    href="#about"
                  >
                    À propos
                  </a>
                </li>
                <li className="nav-item">
                  <a 
                    className="nav-link font-montserrat fw-medium px-3" 
                    href="#book"
                  >
                    Livre
                  </a>
                </li>
                <li className="nav-item">
                  <a 
                    className="nav-link font-montserrat fw-medium px-3" 
                    href="#contact"
                  >
                    Contact
                  </a>
                </li>
                
                {/* Instagram Icon */}
                <li className="nav-item d-none d-lg-block">
                  <a 
                    className="nav-link px-3" 
                    href="https://www.instagram.com/luxembourgpaschere/" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    aria-label="Instagram"
                  >
                    <div 
                      className="rounded-circle d-flex align-items-center justify-content-center"
                      style={{ 
                        width: "36px", 
                        height: "36px", 
                        background: "#E1306C",
                      }}
                    >
                      <Instagram size={18} color="white" />
                    </div>
                  </a>
                </li>
                
                {/* Sprachauswahl - exakt wie im Screenshot */}
                <li className="nav-item dropdown">
                  <a 
                    className="nav-link dropdown-toggle font-montserrat fw-medium px-3 d-flex align-items-center" 
                    href="#" 
                    id="languageDropdown" 
                    role="button" 
                    data-bs-toggle="dropdown" 
                    aria-expanded="false"
                  >
                    <span className="me-1">FR</span>
                  </a>
                  <ul 
                    className="dropdown-menu dropdown-menu-end" 
                    aria-labelledby="languageDropdown"
                  >
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
      </div>

      <MobileMenu isOpen={mobileMenuOpen} onClose={() => setMobileMenuOpen(false)} />
    </header>
  );
}