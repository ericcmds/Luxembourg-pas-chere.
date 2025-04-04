import { useState, useEffect, useRef } from 'react';
import { Instagram, ChevronDown, Menu, X, ArrowUp, ShoppingCart } from 'lucide-react';
import './styles.css';

// Definiere Übersetzungsobjekte
const translations = {
  fr: {
    home: 'Accueil',
    about: 'À propos',
    book: 'Livre',
    contact: 'Contact',
    order: 'COMMANDER',
    heroTitle: 'Luxembourg Pas Cher',
    heroDescription: 'Les meilleurs conseils et offres exclusives pour vivre au Luxembourg. Découvrez comment profiter pleinement de ce magnifique pays sans vider votre portefeuille.',
    featureTag1: 'Secrets locaux',
    featureTag2: 'Offres exclusives',
    featureTag3: 'Budget intelligent',
    aboutTitle: 'À propos',
    aboutSubtitle: 'Découvrez l\'histoire derrière Luxembourg Pas Cher et notre mission pour rendre la vie au Luxembourg plus abordable pour tous.',
    missionTitle: 'Notre Mission',
    crowdfundingTitle: 'Aidez-nous - CROWDFUNDING',
    crowdfundingDescription: 'Participez à notre campagne de financement participatif et soutenez le développement de Luxembourg Pas Cher.',
    crowdfundingButton: 'Participer au crowdfunding',
    missionText1: 'Luxembourg Pas Cher est né d\'une idée simple : partager les meilleures astuces pour profiter pleinement de la vie au Luxembourg sans se ruiner.',
    missionText2: 'Notre équipe de passionnés explore chaque recoin du pays pour dénicher les bons plans, les offres exclusives et les conseils pratiques qui vous permettront d\'économiser au quotidien.',
    statsSold: 'Exemplaires vendus',
    statsTips: 'Astuces et bons plans',
    pressTitle: 'On parle de nous',
    discoverTitle: 'Découvrir',
  },
  de: {
    home: 'Startseite',
    about: 'Über uns',
    book: 'Buch',
    contact: 'Kontakt',
    order: 'BESTELLEN',
    heroTitle: 'Günstiges Luxemburg',
    heroDescription: 'Die besten Tipps und Angebote für ein erschwingliches Leben in Luxemburg. Entdecken Sie, wie Sie dieses wunderschöne Land genießen können, ohne Ihr Portemonnaie zu leeren.',
    featureTag1: 'Lokale Geheimnisse',
    featureTag2: 'Exklusive Angebote',
    featureTag3: 'Intelligentes Budget',
    aboutTitle: 'Über uns',
    aboutSubtitle: 'Entdecken Sie die Geschichte hinter Luxemburg Pas Cher und unsere Mission, das Leben in Luxemburg für alle erschwinglicher zu machen.',
    missionTitle: 'Unsere Mission',
    missionText1: 'Luxemburg Pas Cher entstand aus einer einfachen Idee: Die besten Tipps zu teilen, um das Leben in Luxemburg voll zu genießen, ohne sich zu ruinieren.',
    missionText2: 'Unser Team von Enthusiasten erkundet jeden Winkel des Landes, um die besten Angebote, exklusive Deals und praktische Tipps zu finden, die Ihnen helfen, im Alltag zu sparen.',
    statsSold: 'Verkaufte Exemplare',
    statsTips: 'Tipps und Angebote',
    crowdfundingTitle: 'Helfen Sie uns - CROWDFUNDING',
    crowdfundingDescription: 'Nehmen Sie an unserer Crowdfunding-Kampagne teil und unterstützen Sie die Entwicklung von Luxembourg Pas Cher.',
    crowdfundingButton: 'Am Crowdfunding teilnehmen',
    pressTitle: 'Pressestimmen',
    discoverTitle: 'Entdecken',
  },
  en: {
    home: 'Home',
    about: 'About',
    book: 'Book',
    contact: 'Contact',
    order: 'ORDER NOW',
    heroTitle: 'Affordable Luxembourg',
    heroDescription: 'The best tips and offers for affordable living in Luxembourg. Discover how to enjoy this beautiful country without emptying your wallet.',
    featureTag1: 'Local secrets',
    featureTag2: 'Exclusive offers',
    featureTag3: 'Smart budgeting',
    aboutTitle: 'About Us',
    aboutSubtitle: 'Discover the story behind Luxembourg Pas Cher and our mission to make life in Luxembourg more affordable for everyone.',
    missionTitle: 'Our Mission',
    missionText1: 'Luxembourg Pas Cher was born from a simple idea: to share the best tips for fully enjoying life in Luxembourg without breaking the bank.',
    missionText2: 'Our team of enthusiasts explores every corner of the country to uncover the best deals, exclusive offers, and practical advice that will help you save in everyday life.',
    statsSold: 'Copies sold',
    statsTips: 'Tips and deals',
    crowdfundingTitle: 'Help Us - CROWDFUNDING',
    crowdfundingDescription: 'Participate in our crowdfunding campaign and support the development of Luxembourg Pas Cher.',
    crowdfundingButton: 'Join the crowdfunding',
    pressTitle: 'Press Coverage',
    discoverTitle: 'Discover',
  }
};

export default function MinimalAppSimplified() {
  const [language, setLanguage] = useState('fr');
  const [showLanguageDropdown, setShowLanguageDropdown] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  
  // Ref for outside click detection
  const langDropdownRef = useRef<HTMLDivElement>(null);
  
  // Get translations based on selected language
  const t = translations[language as keyof typeof translations];
  
  // Handler for language change
  const handleLanguageChange = (lang: string) => {
    setLanguage(lang);
    setShowLanguageDropdown(false);
    localStorage.setItem('preferredLanguage', lang);
  };
  
  // Toggle language dropdown
  const toggleLanguageDropdown = () => {
    setShowLanguageDropdown(!showLanguageDropdown);
  };
  
  // Toggle mobile menu
  const toggleMobileMenu = () => {
    setShowMobileMenu(!showMobileMenu);
    // Prevent scrolling when mobile menu is open
    if (!showMobileMenu) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'visible';
    }
  };
  
  // Handler for order button
  const handleOrderClick = () => {
    alert(`Merci de votre intérêt pour le livre "Luxembourg Pas Cher"! Le processus de commande sera bientôt disponible.`);
  };
  
  // Scroll to top function
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };
  
  // Effect for scroll detection and section highlighting
  useEffect(() => {
    const handleScroll = () => {
      // Detect scroll position for header styling
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
      
      // Detect scroll position for scroll-to-top button
      if (window.scrollY > 500) {
        setShowScrollTop(true);
      } else {
        setShowScrollTop(false);
      }
      
      // Detect current section for navigation highlighting
      const sections = ['home', 'about', 'book', 'contact'];
      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= 150 && rect.bottom >= 150) {
            setActiveSection(section);
            break;
          }
        }
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
  
  // Effect for outside click (to close language dropdown)
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (langDropdownRef.current && !langDropdownRef.current.contains(event.target as Node)) {
        setShowLanguageDropdown(false);
      }
    }
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.addEventListener('mousedown', handleClickOutside);
    };
  }, []);
  
  // Effect to load saved language preference
  useEffect(() => {
    const savedLanguage = localStorage.getItem('preferredLanguage');
    if (savedLanguage && ['fr', 'de', 'en'].includes(savedLanguage)) {
      setLanguage(savedLanguage);
    }
  }, []);
  
  return (
    <div>
      {/* Header */}
      <header className={`header ${scrolled ? 'scrolled' : ''}`}>
        <div className="container">
          {/* Logo */}
          <a href="#home" className="site-logo">
            <div className="logo-text">
              <span className="logo-primary">Luxembourg</span>
              <span className="logo-secondary">Pas Cher</span>
              <div className="logo-badge">€</div>
            </div>
            

          </a>
          
          {/* Mobile Menu Button */}
          <button 
            onClick={toggleMobileMenu}
            className="mobile-nav-button"
            aria-label="Toggle mobile menu"
          >
            {showMobileMenu ? <X size={24} /> : <Menu size={24} />}
          </button>
          
          {/* Desktop Navigation */}
          <nav className="desktop-nav">
            <ul>
              <li>
                <a 
                  href="#home" 
                  className={`nav-link ${activeSection === 'home' ? 'active' : ''}`}
                >
                  {t.home}
                </a>
              </li>
              <li>
                <a 
                  href="#about" 
                  className={`nav-link ${activeSection === 'about' ? 'active' : ''}`}
                >
                  {t.about}
                </a>
              </li>
              <li>
                <a 
                  href="#book" 
                  className={`nav-link ${activeSection === 'book' ? 'active' : ''}`}
                >
                  {t.book}
                </a>
              </li>
              <li>
                <a 
                  href="#contact" 
                  className={`nav-link ${activeSection === 'contact' ? 'active' : ''}`}
                >
                  {t.contact}
                </a>
              </li>
              <li>
                <a href="https://www.instagram.com/luxembourgpaschere/" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="instagram-button">
                  <Instagram size={18} />
                </a>
              </li>
              <li>
                <div ref={langDropdownRef} style={{ position: 'relative' }}>
                  <button 
                    onClick={toggleLanguageDropdown}
                    className="lang-button"
                  >
                    <span className={language === 'fr' || language === 'de' || language === 'en' ? 'lang-button-active' : ''}>{language.toUpperCase()}</span>
                    <ChevronDown className={`chevron-icon ${showLanguageDropdown ? 'open' : ''}`} size={16} />
                  </button>
                  
                  <div className={`lang-dropdown ${showLanguageDropdown ? 'open' : ''}`}>
                    <button 
                      onClick={() => handleLanguageChange('fr')} 
                      className={`lang-dropdown-item ${language === 'fr' ? 'active' : ''}`}
                    >
                      Français
                    </button>
                    <button 
                      onClick={() => handleLanguageChange('de')} 
                      className={`lang-dropdown-item ${language === 'de' ? 'active' : ''}`}
                    >
                      Deutsch
                    </button>
                    <button 
                      onClick={() => handleLanguageChange('en')} 
                      className={`lang-dropdown-item ${language === 'en' ? 'active' : ''}`}
                    >
                      English
                    </button>
                  </div>
                </div>
              </li>
            </ul>
          </nav>
        </div>
        
        {/* Mobile Navigation Overlay */}
        <div className={`mobile-nav-overlay ${showMobileMenu ? 'open' : ''}`}>
          <ul>
            <li>
              <a 
                href="#home" 
                className={`nav-link ${activeSection === 'home' ? 'active' : ''}`}
                onClick={toggleMobileMenu}
              >
                {t.home}
              </a>
            </li>
            <li>
              <a 
                href="#about" 
                className={`nav-link ${activeSection === 'about' ? 'active' : ''}`}
                onClick={toggleMobileMenu}
              >
                {t.about}
              </a>
            </li>
            <li>
              <a 
                href="#book" 
                className={`nav-link ${activeSection === 'book' ? 'active' : ''}`}
                onClick={toggleMobileMenu}
              >
                {t.book}
              </a>
            </li>
            <li>
              <a 
                href="#contact" 
                className={`nav-link ${activeSection === 'contact' ? 'active' : ''}`}
                onClick={toggleMobileMenu}
              >
                {t.contact}
              </a>
            </li>
          </ul>
          
          <div className="site-info">

            
            <div className="mobile-lang-options">
              <button 
                onClick={() => {
                  handleLanguageChange('fr');
                  toggleMobileMenu();
                }}
                className={`mobile-lang-btn ${language === 'fr' ? 'active' : ''}`}
              >
                FR
              </button>
              <button 
                onClick={() => {
                  handleLanguageChange('de');
                  toggleMobileMenu();
                }}
                className={`mobile-lang-btn ${language === 'de' ? 'active' : ''}`}
              >
                DE
              </button>
              <button 
                onClick={() => {
                  handleLanguageChange('en');
                  toggleMobileMenu();
                }}
                className={`mobile-lang-btn ${language === 'en' ? 'active' : ''}`}
              >
                EN
              </button>
            </div>
            
            <div className="mobile-social">
              <a 
                href="https://www.instagram.com/luxembourgpaschere/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="instagram-button"
              >
                <Instagram size={18} />
              </a>
            </div>
          </div>
        </div>
      </header>
      
      {/* Hero Section */}
      <section id="home" className="hero">
        {/* Background Image */}
        <div className="hero-bg">
          <img 
            src="https://images.unsplash.com/photo-1580846961439-725c18a67d53?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1920&q=80" 
            alt="Luxembourg City View" 
            className="hero-bg-img"
          />
        </div>
        
        {/* Gradient Overlay */}
        <div className="hero-overlay" />
        
        {/* Content */}
        <div className="hero-content">
          <div className="hero-header">
            <div className="date-badge">
              {new Date().toLocaleDateString('fr-FR', { day: '2-digit', month: '2-digit', year: '2-digit' })}
            </div>
            
            <h1 className="hero-title">
              {t.heroTitle}
            </h1>
            
            <p className="hero-subtitle" style={{ 
              fontSize: 'clamp(0.9rem, 1.5vw, 1.1rem)',
              lineHeight: '1.5',
              maxWidth: '100%',
              padding: '0 1rem',
              overflow: 'hidden',
              textOverflow: 'ellipsis'
            }}>
              {t.heroDescription}
            </p>
          </div>
          
          {/* Book Display */}
          <div className="book-display">
            <div className="book-container">
              {/* Book Cover */}
              <img 
                src="/assets/cover.png" 
                alt="Luxembourg Pas Cher - Guide Pratique" 
                className="book-cover"
                onError={(e) => {
                  console.error('Image error:', e);
                  const target = e.target as HTMLImageElement;
                  target.onerror = null; 
                  target.style.background = 'linear-gradient(45deg, #E31837, #00A4E0)';
                  target.style.aspectRatio = '0.7/1';
                  target.style.display = 'flex';
                  target.style.alignItems = 'center';
                  target.style.justifyContent = 'center';
                  target.alt = 'LUXEMBOURG PAS CHER';
                }}
              />
              

            </div>
          </div>
          
          {/* Commander Button */}
          <div className="btn-wrapper">
            <button className="btn-primary">
              {t.order}
            </button>
          </div>
          
          {/* Feature Tags */}
          <div className="feature-tags">
            <span className="tag">
              {t.featureTag1}
            </span>
            <span className="tag">
              {t.featureTag2}
            </span>
            <span className="tag">
              {t.featureTag3}
            </span>
          </div>
        </div>
      </section>
      
      {/* About Section */}
      <section id="about" style={{ 
        padding: '5rem 0',
        backgroundColor: '#f8f9fa'
      }}>
        <div style={{ 
          maxWidth: '1200px',
          margin: '0 auto',
          padding: '0 2rem'
        }}>
          <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
            <h2 style={{ 
              fontSize: '2.5rem',
              color: '#333',
              marginBottom: '1rem'
            }}>
              {t.aboutTitle}
            </h2>
            <p style={{ 
              fontSize: '1.1rem',
              color: '#666',
              maxWidth: '800px',
              margin: '0 auto'
            }}>
              {t.aboutSubtitle}
            </p>
          </div>
          
          <div style={{ 
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '3rem',
            alignItems: 'center'
          }}>
            <div>
              <img
                src="https://images.unsplash.com/photo-1587974928442-77dc3e0dba72?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80"
                alt="Luxembourg city view"
                style={{
                  width: '100%',
                  borderRadius: '8px',
                  boxShadow: '0 10px 30px rgba(0,0,0,0.1)'
                }}
              />
            </div>
            <div>
              <h3 style={{ 
                fontSize: '1.8rem',
                marginBottom: '1.5rem',
                color: '#333'
              }}>
                {t.missionTitle}
              </h3>
              <p style={{ 
                fontSize: '1.05rem',
                lineHeight: '1.7',
                color: '#555',
                marginBottom: '1.5rem'
              }}>
                {t.missionText1}
              </p>
              <p style={{ 
                fontSize: '1.05rem',
                lineHeight: '1.7',
                color: '#555',
                marginBottom: '1.5rem'
              }}>
                {t.missionText2}
              </p>
              <div style={{ 
                display: 'flex',
                gap: '1rem',
                marginTop: '2rem'
              }}>
                <div style={{ 
                  flexBasis: '50%',
                  padding: '1.5rem',
                  backgroundColor: 'white',
                  borderRadius: '8px',
                  boxShadow: '0 5px 15px rgba(0,0,0,0.05)',
                  textAlign: 'center'
                }}>
                  <div style={{ 
                    fontSize: '2.5rem', 
                    fontWeight: 'bold',
                    color: '#E31837',
                    marginBottom: '0.5rem'
                  }}>
                    1500+
                  </div>
                  <div style={{ color: '#666' }}>
                    {t.statsSold}
                  </div>
                </div>
                <div style={{ 
                  flexBasis: '50%',
                  padding: '1.5rem',
                  backgroundColor: 'white',
                  borderRadius: '8px',
                  boxShadow: '0 5px 15px rgba(0,0,0,0.05)',
                  textAlign: 'center'
                }}>
                  <div style={{ 
                    fontSize: '2.5rem', 
                    fontWeight: 'bold',
                    color: '#00A4E0',
                    marginBottom: '0.5rem'
                  }}>
                    200+
                  </div>
                  <div style={{ color: '#666' }}>
                    {t.statsTips}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Crowdfunding Section */}
      <section style={{ 
        padding: '5rem 0',
        backgroundColor: '#fff'
      }}>
        <div style={{ 
          maxWidth: '1200px',
          margin: '0 auto',
          padding: '0 2rem'
        }}>
          <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
            <h2 style={{ 
              fontSize: '2.5rem',
              color: '#333',
              marginBottom: '1rem',
              textTransform: 'uppercase'
            }}>
              {language === 'fr' ? 'Aidez-nous - CROWDFUNDING' : 
               language === 'de' ? 'Helfen Sie uns - CROWDFUNDING' : 
               'Help Us - CROWDFUNDING'}
            </h2>
            <p style={{ 
              fontSize: '1.1rem',
              color: '#666',
              maxWidth: '800px',
              margin: '0 auto'
            }}>
              {language === 'fr' ? 'Participez à notre campagne de financement participatif et soutenez le développement de Luxembourg Pas Cher.' : 
               language === 'de' ? 'Nehmen Sie an unserer Crowdfunding-Kampagne teil und unterstützen Sie die Entwicklung von Luxembourg Pas Cher.' : 
               'Participate in our crowdfunding campaign and support the development of Luxembourg Pas Cher.'}
            </p>
          </div>
          
          <div style={{ 
            backgroundColor: '#f8f9fa',
            borderRadius: '12px',
            padding: '3rem 2rem',
            textAlign: 'center',
            boxShadow: '0 5px 25px rgba(0,0,0,0.05)',
            position: 'relative',
            overflow: 'hidden'
          }}>
            <div style={{
              position: 'absolute',
              top: 0,
              right: 0,
              background: '#E31837',
              color: 'white',
              padding: '0.5rem 2rem',
              transform: 'rotate(45deg) translate(1.5rem, -1.5rem)',
              fontWeight: 'bold',
              fontSize: '0.9rem',
              zIndex: 2
            }}>
              {language === 'fr' ? 'En cours' : 
               language === 'de' ? 'Aktuell' : 
               'In progress'}
            </div>
            
            <h3 style={{ 
              fontSize: '1.8rem',
              marginBottom: '1.5rem',
              color: '#333'
            }}>
              {language === 'fr' ? 'Notre nouvelle édition 2025' : 
               language === 'de' ? 'Unsere neue Ausgabe 2025' : 
               'Our new 2025 edition'}
            </h3>
            
            <p style={{ 
              fontSize: '1.05rem',
              lineHeight: '1.7',
              color: '#555',
              marginBottom: '2rem',
              maxWidth: '800px',
              margin: '0 auto 2rem'
            }}>
              {language === 'fr' ? 'Nous préparons une édition enrichie avec encore plus de conseils, d\'astuces et de bons plans pour vivre au Luxembourg sans se ruiner. Votre participation nous aidera à financer l\'impression et la distribution de ce nouveau guide.' : 
               language === 'de' ? 'Wir bereiten eine erweiterte Ausgabe mit noch mehr Tipps, Tricks und günstigen Angeboten für ein Leben in Luxemburg ohne sich zu ruinieren vor. Ihre Unterstützung hilft uns, den Druck und die Verteilung dieses neuen Führers zu finanzieren.' : 
               'We are preparing an enhanced edition with even more advice, tips, and deals for living in Luxembourg without breaking the bank. Your participation will help us finance the printing and distribution of this new guide.'}
            </p>
            
            <div style={{
              background: 'white',
              padding: '1.5rem',
              borderRadius: '8px',
              boxShadow: '0 3px 15px rgba(0,0,0,0.05)',
              marginBottom: '2rem'
            }}>
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: '1rem'
              }}>
                <span style={{ fontWeight: 'bold', fontSize: '1.1rem' }}>
                  {language === 'fr' ? 'Objectif: 10,000€' : 
                   language === 'de' ? 'Ziel: 10.000€' : 
                   'Goal: €10,000'}
                </span>
                <span style={{ color: '#E31837', fontWeight: 'bold' }}>
                  {language === 'fr' ? '60% atteint' : 
                   language === 'de' ? '60% erreicht' : 
                   '60% reached'}
                </span>
              </div>
              
              <div style={{
                width: '100%',
                height: '12px',
                backgroundColor: '#eee',
                borderRadius: '6px',
                overflow: 'hidden'
              }}>
                <div style={{
                  width: '60%',
                  height: '100%',
                  backgroundColor: '#E31837',
                  borderRadius: '6px'
                }}></div>
              </div>
              
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                marginTop: '0.5rem',
                fontSize: '0.9rem',
                color: '#666'
              }}>
                <span>
                  {language === 'fr' ? '6,000€ collectés' : 
                   language === 'de' ? '6.000€ gesammelt' : 
                   '€6,000 collected'}
                </span>
                <span>
                  {language === 'fr' ? '123 contributeurs' : 
                   language === 'de' ? '123 Unterstützer' : 
                   '123 contributors'}
                </span>
              </div>
            </div>
            
            <button style={{
              backgroundColor: '#E31837',
              color: 'white',
              border: 'none',
              padding: '1rem 3rem',
              borderRadius: '50px',
              fontSize: '1.1rem',
              fontWeight: 'bold',
              cursor: 'pointer',
              boxShadow: '0 5px 15px rgba(227, 24, 55, 0.3)',
              transition: 'all 0.3s ease'
            }}>
              {language === 'fr' ? 'Participer au crowdfunding' : 
               language === 'de' ? 'Am Crowdfunding teilnehmen' : 
               'Join the crowdfunding'}
            </button>
          </div>
          
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: '1.5rem',
            marginTop: '3rem'
          }}>
            <div style={{
              padding: '1.5rem',
              backgroundColor: 'white',
              borderRadius: '8px',
              boxShadow: '0 5px 15px rgba(0,0,0,0.05)',
              border: '1px solid #eee'
            }}>
              <h4 style={{
                fontSize: '1.2rem',
                marginBottom: '1rem',
                color: '#333',
                display: 'flex',
                alignItems: 'center'
              }}>
                <span style={{
                  display: 'inline-block',
                  width: '24px',
                  height: '24px',
                  backgroundColor: '#E31837',
                  color: 'white',
                  borderRadius: '50%',
                  textAlign: 'center',
                  marginRight: '0.5rem',
                  fontSize: '0.9rem',
                  lineHeight: '24px'
                }}>1</span>
                {language === 'fr' ? 'Contribution de base' : 
                 language === 'de' ? 'Basisbeitrag' : 
                 'Basic Contribution'}
              </h4>
              <p style={{
                fontSize: '0.95rem',
                color: '#666',
                marginBottom: '1rem'
              }}>
                {language === 'fr' ? 'Précommandez le guide 2025 et recevez-le dès sa sortie avec une dédicace personnalisée.' : 
                 language === 'de' ? 'Bestellen Sie den 2025-Führer vor und erhalten Sie ihn direkt nach Erscheinen mit einer persönlichen Widmung.' : 
                 'Pre-order the 2025 guide and receive it at launch with a personalized dedication.'}
              </p>
              <div style={{
                fontSize: '1.5rem',
                fontWeight: 'bold',
                color: '#E31837',
                marginBottom: '1rem'
              }}>
                25€
              </div>
              <button style={{
                width: '100%',
                padding: '0.75rem',
                backgroundColor: '#f0f0f0',
                border: 'none',
                borderRadius: '4px',
                fontWeight: 'bold',
                cursor: 'pointer'
              }}>
                {language === "fr" ? "Sélectionner" : 
                 language === "de" ? "Auswählen" : 
                 "Select"}
              </button>
            </div>
            
            <div style={{
              padding: '1.5rem',
              backgroundColor: 'white',
              borderRadius: '8px',
              boxShadow: '0 5px 15px rgba(0,0,0,0.05)',
              border: '1px solid #E31837',
              position: 'relative'
            }}>
              <div style={{
                position: 'absolute',
                top: '-12px',
                left: '50%',
                transform: 'translateX(-50%)',
                backgroundColor: '#E31837',
                color: 'white',
                padding: '0.25rem 1rem',
                borderRadius: '20px',
                fontSize: '0.8rem',
                fontWeight: 'bold'
              }}>
                {language === 'fr' ? 'Populaire' : 
                 language === 'de' ? 'Beliebt' : 
                 'Popular'}
              </div>
              
              <h4 style={{
                fontSize: '1.2rem',
                marginTop: '0.5rem',
                marginBottom: '1rem',
                color: '#333',
                display: 'flex',
                alignItems: 'center'
              }}>
                <span style={{
                  display: 'inline-block',
                  width: '24px',
                  height: '24px',
                  backgroundColor: '#E31837',
                  color: 'white',
                  borderRadius: '50%',
                  textAlign: 'center',
                  marginRight: '0.5rem',
                  fontSize: '0.9rem',
                  lineHeight: '24px'
                }}>2</span>
                {language === 'fr' ? 'Pack Supporter' : 
                 language === 'de' ? 'Unterstützer-Paket' : 
                 'Supporter Pack'}
              </h4>
              <p style={{
                fontSize: '0.95rem',
                color: '#666',
                marginBottom: '1rem'
              }}>
                {language === 'fr' ? 'Le guide + un tote bag exclusif + accès à notre communauté privée avec des conseils mensuels.' : 
                 language === 'de' ? 'Der Führer + eine exklusive Tragetasche + Zugang zu unserer privaten Community mit monatlichen Tipps.' : 
                 'The guide + an exclusive tote bag + access to our private community with monthly tips.'}
              </p>
              <div style={{
                fontSize: '1.5rem',
                fontWeight: 'bold',
                color: '#E31837',
                marginBottom: '1rem'
              }}>
                45€
              </div>
              <button style={{
                width: '100%',
                padding: '0.75rem',
                backgroundColor: '#E31837',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                fontWeight: 'bold',
                cursor: 'pointer'
              }}>
                Sélectionner
              </button>
            </div>
            
            <div style={{
              padding: '1.5rem',
              backgroundColor: 'white',
              borderRadius: '8px',
              boxShadow: '0 5px 15px rgba(0,0,0,0.05)',
              border: '1px solid #eee'
            }}>
              <h4 style={{
                fontSize: '1.2rem',
                marginBottom: '1rem',
                color: '#333',
                display: 'flex',
                alignItems: 'center'
              }}>
                <span style={{
                  display: 'inline-block',
                  width: '24px',
                  height: '24px',
                  backgroundColor: '#E31837',
                  color: 'white',
                  borderRadius: '50%',
                  textAlign: 'center',
                  marginRight: '0.5rem',
                  fontSize: '0.9rem',
                  lineHeight: '24px'
                }}>3</span>
                {language === 'fr' ? 'Mécène Premium' : 
                 language === 'de' ? 'Premium-Unterstützer' : 
                 'Premium Patron'}
              </h4>
              <p style={{
                fontSize: '0.95rem',
                color: '#666',
                marginBottom: '1rem'
              }}>
                {language === 'fr' ? 'Pack Supporter + votre nom dans les remerciements + une visite guidée personnalisée de Luxembourg.' : 
                 language === 'de' ? 'Unterstützer-Paket + Ihr Name in der Danksagung + eine personalisierte Führung durch Luxemburg.' : 
                 'Supporter Pack + your name in the acknowledgements + a personalized guided tour of Luxembourg.'}
              </p>
              <div style={{
                fontSize: '1.5rem',
                fontWeight: 'bold',
                color: '#E31837',
                marginBottom: '1rem'
              }}>
                100€
              </div>
              <button style={{
                width: '100%',
                padding: '0.75rem',
                backgroundColor: '#f0f0f0',
                border: 'none',
                borderRadius: '4px',
                fontWeight: 'bold',
                cursor: 'pointer'
              }}>
                Sélectionner
              </button>
            </div>
          </div>
        </div>
      </section>
      
      {/* Media Coverage Section */}
      <section style={{ 
        padding: '5rem 0',
        backgroundColor: '#f8f9fa'
      }}>
        <div style={{ 
          maxWidth: '1200px',
          margin: '0 auto',
          padding: '0 2rem'
        }}>
          <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
            <h2 style={{ 
              fontSize: '2.5rem',
              color: '#333',
              marginBottom: '1rem'
            }}>
              {language === 'fr' ? 'On parle de nous' : 
               language === 'de' ? 'Man spricht über uns' : 
               'Media coverage'}
            </h2>
            <p style={{ 
              fontSize: '1.1rem',
              color: '#666',
              maxWidth: '800px',
              margin: '0 auto'
            }}>
              {language === 'fr' ? 'Découvrez ce que les médias luxembourgeois et internationaux disent de notre guide.' : 
               language === 'de' ? 'Entdecken Sie, was luxemburgische und internationale Medien über unseren Führer sagen.' : 
               'Discover what Luxembourg and international media say about our guide.'}
            </p>
          </div>
          
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(4, 1fr)',
            gap: '2rem',
            alignItems: 'center',
            marginBottom: '3rem'
          }}>
            <div style={{
              padding: '1.5rem',
              background: 'white',
              borderRadius: '8px',
              boxShadow: '0 5px 15px rgba(0,0,0,0.05)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              height: '100px'
            }}>
              <div style={{
                fontSize: '1.5rem',
                fontWeight: 'bold',
                background: 'linear-gradient(135deg, #E31837, #00A4E0)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                letterSpacing: '1px'
              }}>
                L'ESSENTIEL
              </div>
            </div>
            
            <div style={{
              padding: '1.5rem',
              background: 'white',
              borderRadius: '8px',
              boxShadow: '0 5px 15px rgba(0,0,0,0.05)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              height: '100px'
            }}>
              <div style={{
                fontSize: '1.2rem',
                fontWeight: '800',
                letterSpacing: '2px',
                color: '#333'
              }}>
                RTL LUXEMBOURG
              </div>
            </div>
            
            <div style={{
              padding: '1.5rem',
              background: 'white',
              borderRadius: '8px',
              boxShadow: '0 5px 15px rgba(0,0,0,0.05)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              height: '100px'
            }}>
              <div style={{
                fontSize: '1.4rem',
                fontWeight: 'bold',
                fontStyle: 'italic',
                color: '#00A4E0'
              }}>
                Le Quotidien
              </div>
            </div>
            
            <div style={{
              padding: '1.5rem',
              background: 'white',
              borderRadius: '8px',
              boxShadow: '0 5px 15px rgba(0,0,0,0.05)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              height: '100px'
            }}>
              <div style={{
                fontSize: '1.2rem',
                fontWeight: 'bold',
                color: '#E31837'
              }}>
                DELANO
              </div>
            </div>
          </div>
          
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: '2rem'
          }}>
            <div style={{
              padding: '2rem',
              background: 'white',
              borderRadius: '8px',
              boxShadow: '0 5px 15px rgba(0,0,0,0.05)'
            }}>
              <p style={{
                fontSize: '1.05rem',
                lineHeight: '1.7',
                color: '#555',
                marginBottom: '1.5rem',
                fontStyle: 'italic'
              }}>
                "Un guide indispensable pour tous ceux qui souhaitent profiter de la vie au Luxembourg sans se ruiner. Plein d'astuces intelligentes et d'offres exclusives."
              </p>
              <div style={{
                display: 'flex',
                alignItems: 'center'
              }}>
                <div style={{
                  width: '40px',
                  height: '40px',
                  borderRadius: '50%',
                  backgroundColor: '#E31837',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'white',
                  fontSize: '1.2rem',
                  fontWeight: 'bold',
                  marginRight: '1rem'
                }}>L</div>
                <div>
                  <div style={{
                    fontWeight: 'bold',
                    fontSize: '0.95rem'
                  }}>L'Essentiel</div>
                  <div style={{
                    fontSize: '0.85rem',
                    color: '#666'
                  }}>Novembre 2023</div>
                </div>
              </div>
            </div>
            
            <div style={{
              padding: '2rem',
              background: 'white',
              borderRadius: '8px',
              boxShadow: '0 5px 15px rgba(0,0,0,0.05)'
            }}>
              <p style={{
                fontSize: '1.05rem',
                lineHeight: '1.7',
                color: '#555',
                marginBottom: '1.5rem',
                fontStyle: 'italic'
              }}>
                "Un concept brillant qui répond parfaitement aux besoins des résidents et des frontaliers. Les recommandations sont pratiques et réellement économiques."
              </p>
              <div style={{
                display: 'flex',
                alignItems: 'center'
              }}>
                <div style={{
                  width: '40px',
                  height: '40px',
                  borderRadius: '50%',
                  backgroundColor: '#00A4E0',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'white',
                  fontSize: '1.2rem',
                  fontWeight: 'bold',
                  marginRight: '1rem'
                }}>R</div>
                <div>
                  <div style={{
                    fontWeight: 'bold',
                    fontSize: '0.95rem'
                  }}>RTL Luxembourg</div>
                  <div style={{
                    fontSize: '0.85rem',
                    color: '#666'
                  }}>Janvier 2024</div>
                </div>
              </div>
            </div>
            
            <div style={{
              padding: '2rem',
              background: 'white',
              borderRadius: '8px',
              boxShadow: '0 5px 15px rgba(0,0,0,0.05)'
            }}>
              <p style={{
                fontSize: '1.05rem',
                lineHeight: '1.7',
                color: '#555',
                marginBottom: '1.5rem',
                fontStyle: 'italic'
              }}>
                "Luxembourg Pas Cher démystifie l'idée que vivre au Luxembourg est nécessairement coûteux. Un guide bien documenté et pratique pour tous les budgets."
              </p>
              <div style={{
                display: 'flex',
                alignItems: 'center'
              }}>
                <div style={{
                  width: '40px',
                  height: '40px',
                  borderRadius: '50%',
                  backgroundColor: '#333',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'white',
                  fontSize: '1.2rem',
                  fontWeight: 'bold',
                  marginRight: '1rem'
                }}>D</div>
                <div>
                  <div style={{
                    fontWeight: 'bold',
                    fontSize: '0.95rem'
                  }}>Delano</div>
                  <div style={{
                    fontSize: '0.85rem',
                    color: '#666'
                  }}>Mars 2024</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Discover Section */}
      <section style={{ 
        padding: '5rem 0',
        backgroundColor: '#fff',
        position: 'relative',
        overflow: 'hidden'
      }}>
        <div style={{
          position: 'absolute',
          top: '0',
          right: '0',
          width: '50%',
          height: '100%',
          background: 'linear-gradient(135deg, rgba(227, 24, 55, 0.05) 0%, rgba(0, 164, 224, 0.05) 100%)',
          clipPath: 'polygon(20% 0, 100% 0, 100% 100%, 0% 100%)',
          zIndex: 0
        }}></div>
        
        <div style={{ 
          maxWidth: '1200px',
          margin: '0 auto',
          padding: '0 2rem',
          position: 'relative',
          zIndex: 1
        }}>
          <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
            <h2 style={{ 
              fontSize: '2.5rem',
              color: '#333',
              marginBottom: '1rem'
            }}>
              {language === 'fr' ? 'Découvrir' : 
               language === 'de' ? 'Entdecken' : 
               'Discover'}
            </h2>
            <p style={{ 
              fontSize: '1.1rem',
              color: '#666',
              maxWidth: '800px',
              margin: '0 auto'
            }}>
              {language === 'fr' ? 'Explorez Luxembourg à travers nos sélections thématiques et découvrez les meilleurs plans économiques.' : 
               language === 'de' ? 'Entdecken Sie Luxemburg durch unsere thematischen Auswahlen und finden Sie die besten wirtschaftlichen Angebote.' : 
               'Explore Luxembourg through our thematic selections and discover the best budget-friendly opportunities.'}
            </p>
          </div>
          
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: '2rem'
          }}>
            <div style={{
              borderRadius: '8px',
              overflow: 'hidden',
              boxShadow: '0 5px 15px rgba(0,0,0,0.1)',
              transition: 'transform 0.3s ease',
              backgroundColor: 'white'
            }}>
              <div style={{
                height: '200px',
                position: 'relative',
                overflow: 'hidden'
              }}>
                <img
                  src="https://images.unsplash.com/photo-1534771323180-231841f16d15?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80"
                  alt="Restaurants à Luxembourg"
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover'
                  }}
                />
                <div style={{
                  position: 'absolute',
                  bottom: '0',
                  left: '0',
                  width: '100%',
                  background: 'linear-gradient(to top, rgba(0,0,0,0.7), transparent)',
                  padding: '1rem',
                  color: 'white'
                }}>
                  <h3 style={{
                    fontSize: '1.3rem',
                    fontWeight: 'bold',
                    margin: 0
                  }}>Gastronomie</h3>
                </div>
              </div>
              <div style={{
                padding: '1.5rem'
              }}>
                <p style={{
                  fontSize: '1rem',
                  lineHeight: '1.6',
                  color: '#555',
                  marginBottom: '1.5rem'
                }}>
                  Découvrez nos sélections de restaurants offrant un excellent rapport qualité-prix dans tout le Luxembourg.
                </p>
                <button style={{
                  display: 'flex',
                  alignItems: 'center',
                  backgroundColor: 'transparent',
                  color: '#E31837',
                  border: 'none',
                  padding: 0,
                  fontSize: '0.95rem',
                  fontWeight: 'bold',
                  cursor: 'pointer'
                }}>
                  Découvrir
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ marginLeft: '0.5rem' }}>
                    <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="#E31837" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </button>
              </div>
            </div>
            
            <div style={{
              borderRadius: '8px',
              overflow: 'hidden',
              boxShadow: '0 5px 15px rgba(0,0,0,0.1)',
              transition: 'transform 0.3s ease',
              backgroundColor: 'white'
            }}>
              <div style={{
                height: '200px',
                position: 'relative',
                overflow: 'hidden'
              }}>
                <img
                  src="https://images.unsplash.com/photo-1559523275-95bce95ad6cc?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80"
                  alt="Loisirs à Luxembourg"
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover'
                  }}
                />
                <div style={{
                  position: 'absolute',
                  bottom: '0',
                  left: '0',
                  width: '100%',
                  background: 'linear-gradient(to top, rgba(0,0,0,0.7), transparent)',
                  padding: '1rem',
                  color: 'white'
                }}>
                  <h3 style={{
                    fontSize: '1.3rem',
                    fontWeight: 'bold',
                    margin: 0
                  }}>Loisirs & Culture</h3>
                </div>
              </div>
              <div style={{
                padding: '1.5rem'
              }}>
                <p style={{
                  fontSize: '1rem',
                  lineHeight: '1.6',
                  color: '#555',
                  marginBottom: '1.5rem'
                }}>
                  Profitez des activités culturelles, sportives et de loisirs à prix réduits grâce à nos conseils et bons plans.
                </p>
                <button style={{
                  display: 'flex',
                  alignItems: 'center',
                  backgroundColor: 'transparent',
                  color: '#E31837',
                  border: 'none',
                  padding: 0,
                  fontSize: '0.95rem',
                  fontWeight: 'bold',
                  cursor: 'pointer'
                }}>
                  Découvrir
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ marginLeft: '0.5rem' }}>
                    <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="#E31837" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </button>
              </div>
            </div>
            
            <div style={{
              borderRadius: '8px',
              overflow: 'hidden',
              boxShadow: '0 5px 15px rgba(0,0,0,0.1)',
              transition: 'transform 0.3s ease',
              backgroundColor: 'white'
            }}>
              <div style={{
                height: '200px',
                position: 'relative',
                overflow: 'hidden'
              }}>
                <img
                  src="https://images.unsplash.com/photo-1588097237057-9f2780d5709e?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80"
                  alt="Shopping à Luxembourg"
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover'
                  }}
                />
                <div style={{
                  position: 'absolute',
                  bottom: '0',
                  left: '0',
                  width: '100%',
                  background: 'linear-gradient(to top, rgba(0,0,0,0.7), transparent)',
                  padding: '1rem',
                  color: 'white'
                }}>
                  <h3 style={{
                    fontSize: '1.3rem',
                    fontWeight: 'bold',
                    margin: 0
                  }}>Shopping</h3>
                </div>
              </div>
              <div style={{
                padding: '1.5rem'
              }}>
                <p style={{
                  fontSize: '1rem',
                  lineHeight: '1.6',
                  color: '#555',
                  marginBottom: '1.5rem'
                }}>
                  Nos meilleures adresses pour faire du shopping malin et économique au Luxembourg, des vêtements à l'électronique.
                </p>
                <button style={{
                  display: 'flex',
                  alignItems: 'center',
                  backgroundColor: 'transparent',
                  color: '#E31837',
                  border: 'none',
                  padding: 0,
                  fontSize: '0.95rem',
                  fontWeight: 'bold',
                  cursor: 'pointer'
                }}>
                  Découvrir
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ marginLeft: '0.5rem' }}>
                    <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="#E31837" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>


    </div>
  );
}