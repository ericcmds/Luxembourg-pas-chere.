import { useState, useEffect } from "react";
import MobileMenu from './ui/MobileMenu';
import { useLanguage } from '@/contexts/LanguageContext';

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { language, setLanguage, t } = useLanguage();

  const handleSearch = (e: any) => {
    e.preventDefault();
    console.log("Searching for:", searchQuery);

    // Basic search functionality implementation
    if (searchQuery.trim()) {
      // Normally this would navigate to search results, for now just alert
      alert(`Searching for: ${searchQuery}`);
    }
  };

  const handleLanguageChange = (lang: string) => {
    setLanguage(lang);
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

          {/* Collapsible Navigation Content */}
          <div className={`collapse navbar-collapse ${mobileMenuOpen ? 'show' : ''}`} id="navbarContent"> {/* Add show class when open */}
            {/* Navigation Links */}
            <ul className="navbar-nav mx-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <a className="nav-link font-montserrat fw-medium" href="#home">
                  <i className="fas fa-home me-1" aria-hidden="true"></i> <span>Home</span>
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link font-montserrat fw-medium" href="#offers">
                  <i className="fas fa-tags me-1" aria-hidden="true"></i> <span>Angebote</span>
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link font-montserrat fw-medium" href="#blog">
                  <i className="fas fa-blog me-1" aria-hidden="true"></i> <span>Blog</span>
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link font-montserrat fw-medium" href="#about">
                  <i className="fas fa-info-circle me-1" aria-hidden="true"></i> <span>Über uns</span>
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link font-montserrat fw-medium" href="#contact">
                  <i className="fas fa-envelope me-1" aria-hidden="true"></i> <span>Kontakt</span>
                </a>
              </li>
            </ul>

            {/* Search and Language Selection */}
            <div className="d-flex align-items-center">
              {/* Search Form */}
              <form className="d-flex me-2" onSubmit={handleSearch} role="search">
                <div className="input-group">
                  <label htmlFor="desktopSearchInput" className="visually-hidden">Suche nach Angeboten, Orten, Aktivitäten</label>
                  <input 
                    id="desktopSearchInput"
                    type="search" 
                    className="form-control" 
                    placeholder={`${t('search')}...`} 
                    aria-label={t('search')}
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                  <button className="btn btn-primary" type="submit" style={{ backgroundColor: '#00A4E0', borderColor: '#00A4E0' }} aria-label={t('searchButton')}>
                    <i className="fas fa-search" aria-hidden="true"></i>
                  </button>
                </div>
              </form>

              {/* Language Dropdown */}
              <div className="dropdown">
                <button 
                  className="btn btn-sm btn-outline-secondary dropdown-toggle" 
                  type="button" 
                  id="languageDropdown" 
                  data-bs-toggle="dropdown" 
                  aria-expanded="false"
                  aria-label="Sprache ändern"
                >
                  {language === 'de' && <><i className="fas fa-globe me-1" aria-hidden="true"></i> <span>DE</span></>}
                  {language === 'fr' && <><i className="fas fa-globe me-1" aria-hidden="true"></i> <span>FR</span></>}
                  {language === 'en' && <><i className="fas fa-globe me-1" aria-hidden="true"></i> <span>EN</span></>}
                </button>
                <ul className="dropdown-menu dropdown-menu-end" aria-labelledby="languageDropdown">
                  <li>
                    <button 
                      className={`dropdown-item ${language === 'de' ? 'active' : ''}`} 
                      onClick={() => handleLanguageChange('de')}
                      aria-label="Sprache zu Deutsch wechseln"
                    >
                      <span className="fi fi-de me-2" aria-hidden="true"></span> Deutsch
                    </button>
                  </li>
                  <li>
                    <button 
                      className={`dropdown-item ${language === 'fr' ? 'active' : ''}`} 
                      onClick={() => handleLanguageChange('fr')}
                      aria-label="Changer la langue en français"
                    >
                      <span className="fi fi-fr me-2" aria-hidden="true"></span> Français
                    </button>
                  </li>
                  <li>
                    <button 
                      className={`dropdown-item ${language === 'en' ? 'active' : ''}`} 
                      onClick={() => handleLanguageChange('en')}
                      aria-label="Change language to English"
                    >
                      <span className="fi fi-gb me-2" aria-hidden="true"></span> English
                    </button>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Search and Language - Visible only on small screens */}
      <div className="container d-block d-lg-none mb-2">
        <div className="row g-2">
          <div className="col-9">
            <form onSubmit={handleSearch} role="search">
              <div className="input-group">
                <label htmlFor="mobileSearchInput" className="visually-hidden">{t('search')}</label>
                <input 
                  id="mobileSearchInput"
                  type="search" 
                  className="form-control form-control-sm" 
                  placeholder={`${t('search')}...`} 
                  aria-label={t('search')}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <button className="btn btn-sm btn-primary" type="submit" style={{ backgroundColor: '#00A4E0', borderColor: '#00A4E0' }} aria-label={t('searchButton')}>
                  <i className="fas fa-search" aria-hidden="true"></i>
                </button>
              </div>
            </form>
          </div>
          <div className="col-3">
            <div className="dropdown w-100">
              <button 
                className="btn btn-sm btn-outline-secondary dropdown-toggle w-100 d-flex align-items-center justify-content-center gap-2" 
                type="button" 
                id="mobileLanguageDropdown" 
                data-bs-toggle="dropdown" 
                aria-expanded="false"
                aria-label={`Change language, current language is ${language}`}
                role="combobox"
                aria-controls="languageDropdownList"
              >
                {language.toUpperCase()}
              </button>
              <ul className="dropdown-menu dropdown-menu-end" id="languageDropdownList" aria-labelledby="mobileLanguageDropdown">
                <li>
                  <button 
                    className={`dropdown-item ${language === 'de' ? 'active' : ''}`} 
                    onClick={() => handleLanguageChange('de')}
                    aria-label="Sprache zu Deutsch wechseln"
                  >
                    Deutsch
                  </button>
                </li>
                <li>
                  <button 
                    className={`dropdown-item ${language === 'fr' ? 'active' : ''}`} 
                    onClick={() => handleLanguageChange('fr')}
                    aria-label="Changer la langue en français"
                  >
                    Français
                  </button>
                </li>
                <li>
                  <button 
                    className={`dropdown-item ${language === 'en' ? 'active' : ''}`} 
                    onClick={() => handleLanguageChange('en')}
                    aria-label="Change language to English"
                  >
                    English
                  </button>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <MobileMenu isOpen={mobileMenuOpen} onClose={() => setMobileMenuOpen(false)} />
    </header>
  );
}