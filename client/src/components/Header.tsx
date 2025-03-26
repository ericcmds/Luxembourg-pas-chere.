import { useState, useEffect, FormEvent } from "react";

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [language, setLanguage] = useState("de"); // Default language: German

  const handleSearch = (e: FormEvent) => {
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
    // In a real application, this would update i18n settings or reload content
    console.log("Language changed to:", lang);
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
      <nav className="navbar navbar-expand-lg navbar-light py-2">
        <div className="container">
          {/* Logo */}
          <a className="navbar-brand d-flex align-items-center" href="#home">
            <div className="position-relative">
              <span className="font-montserrat fw-bold fs-4 text-lux-red">Luxembourg</span>
              <span className="font-montserrat fw-bold fs-4 text-lux-blue ms-2">Pas Chère</span>
              <div className="position-absolute" style={{ top: '-5px', right: '-12px', background: '#E31837', color: 'white', padding: '0 4px', borderRadius: '50%', transform: 'rotate(12deg)', fontSize: '12px', fontWeight: 'bold' }}>€</div>
            </div>
          </a>

          {/* Hamburger Button for Mobile */}
          <button 
            className="navbar-toggler" 
            type="button" 
            data-bs-toggle="collapse" 
            data-bs-target="#navbarContent" 
            aria-controls="navbarContent" 
            aria-expanded="false" 
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          {/* Collapsible Navigation Content */}
          <div className="collapse navbar-collapse" id="navbarContent">
            {/* Navigation Links */}
            <ul className="navbar-nav mx-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <a className="nav-link font-montserrat fw-medium" href="#home">
                  <i className="fas fa-home me-1"></i> Home
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link font-montserrat fw-medium" href="#offers">
                  <i className="fas fa-tags me-1"></i> Offers
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link font-montserrat fw-medium" href="#blog">
                  <i className="fas fa-blog me-1"></i> Blog
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link font-montserrat fw-medium" href="#about">
                  <i className="fas fa-info-circle me-1"></i> About Us
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link font-montserrat fw-medium" href="#contact">
                  <i className="fas fa-envelope me-1"></i> Contact
                </a>
              </li>
            </ul>

            {/* Search and Language Selection */}
            <div className="d-flex align-items-center">
              {/* Search Form */}
              <form className="d-flex me-2" onSubmit={handleSearch}>
                <div className="input-group">
                  <input 
                    type="search" 
                    className="form-control" 
                    placeholder="Search for deals, places, activities..." 
                    aria-label="Search"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                  <button className="btn btn-primary" type="submit" style={{ backgroundColor: '#00A4E0', borderColor: '#00A4E0' }}>
                    <i className="fas fa-search"></i>
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
                >
                  {language === 'de' && <><i className="fas fa-globe me-1"></i> DE</>}
                  {language === 'fr' && <><i className="fas fa-globe me-1"></i> FR</>}
                  {language === 'en' && <><i className="fas fa-globe me-1"></i> EN</>}
                </button>
                <ul className="dropdown-menu dropdown-menu-end" aria-labelledby="languageDropdown">
                  <li>
                    <button 
                      className={`dropdown-item ${language === 'de' ? 'active' : ''}`} 
                      onClick={() => handleLanguageChange('de')}
                    >
                      <span className="fi fi-de me-2"></span> Deutsch
                    </button>
                  </li>
                  <li>
                    <button 
                      className={`dropdown-item ${language === 'fr' ? 'active' : ''}`} 
                      onClick={() => handleLanguageChange('fr')}
                    >
                      <span className="fi fi-fr me-2"></span> Français
                    </button>
                  </li>
                  <li>
                    <button 
                      className={`dropdown-item ${language === 'en' ? 'active' : ''}`} 
                      onClick={() => handleLanguageChange('en')}
                    >
                      <span className="fi fi-gb me-2"></span> English
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
            <form onSubmit={handleSearch}>
              <div className="input-group">
                <input 
                  type="search" 
                  className="form-control form-control-sm" 
                  placeholder="Search for deals, places, activities..." 
                  aria-label="Search"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <button className="btn btn-sm btn-primary" type="submit" style={{ backgroundColor: '#00A4E0', borderColor: '#00A4E0' }}>
                  <i className="fas fa-search"></i>
                </button>
              </div>
            </form>
          </div>
          <div className="col-3">
            <div className="dropdown w-100">
              <button 
                className="btn btn-sm btn-outline-secondary dropdown-toggle w-100" 
                type="button" 
                id="mobileLanguageDropdown" 
                data-bs-toggle="dropdown" 
                aria-expanded="false"
              >
                {language.toUpperCase()}
              </button>
              <ul className="dropdown-menu dropdown-menu-end" aria-labelledby="mobileLanguageDropdown">
                <li>
                  <button 
                    className={`dropdown-item ${language === 'de' ? 'active' : ''}`} 
                    onClick={() => handleLanguageChange('de')}
                  >
                    Deutsch
                  </button>
                </li>
                <li>
                  <button 
                    className={`dropdown-item ${language === 'fr' ? 'active' : ''}`} 
                    onClick={() => handleLanguageChange('fr')}
                  >
                    Français
                  </button>
                </li>
                <li>
                  <button 
                    className={`dropdown-item ${language === 'en' ? 'active' : ''}`} 
                    onClick={() => handleLanguageChange('en')}
                  >
                    English
                  </button>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
