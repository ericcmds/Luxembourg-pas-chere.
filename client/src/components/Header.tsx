import { useState, useEffect, FormEvent } from "react";

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

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

            {/* Search Form */}
            <form className="d-flex" onSubmit={handleSearch}>
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
          </div>
        </div>
      </nav>

      {/* Mobile Search - Visible only on small screens */}
      <div className="container d-block d-lg-none mb-2">
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
    </header>
  );
}
