import { useState, useEffect, useRef } from 'react';
import { Instagram, ChevronDown, Menu, X, ArrowUp, ShoppingCart, Facebook, Linkedin } from 'lucide-react';
import './styles.css';
import FAQSection from './components/FAQSection';
import CheckoutModal from './components/CheckoutModal';

// Definiere Übersetzungsobjekte
const translations = {
  fr: {
    home: 'Accueil',
    about: 'À propos',
    book: 'Livre',
    contact: 'Contact',
    faq: 'FAQ',
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
    faqTitle: 'Questions Fréquentes',
    faqSubtitle: 'Trouvez des réponses aux questions les plus fréquemment posées sur Luxembourg Pas Cher.',
    faqDescription: 'Nos réponses aux questions que vous vous posez sur la vie économique au Luxembourg.',
    faqQuestion1: 'Comment le livre "Luxembourg Pas Cher" peut-il m\'aider à économiser?',
    faqAnswer1: 'Notre livre compile les meilleurs conseils, offres et astuces pour vivre à Luxembourg sans vous ruiner, des restaurants abordables aux activités gratuites, en passant par les transports économiques.',
    faqQuestion2: 'Les bons plans sont-ils régulièrement mis à jour?',
    faqAnswer2: 'Oui! Notre site web complète le livre avec des mises à jour régulières. Inscrivez-vous à notre newsletter pour recevoir les derniers bons plans.',
    faqQuestion3: 'Puis-je contribuer en partageant mes propres astuces pour économiser?',
    faqAnswer3: 'Absolument! Nous encourageons notre communauté à partager. Contactez-nous par email ou via nos réseaux sociaux pour nous faire part de vos découvertes.',
    faqQuestion4: 'Le livre est-il disponible en plusieurs langues?',
    faqAnswer4: 'Oui, le livre "Luxembourg Pas Cher" est disponible en français, allemand et anglais pour servir la communauté diverse du Luxembourg.',
    faqQuestion5: 'Y a-t-il des réductions pour les commandes en groupe?',
    faqAnswer5: 'Oui, nous proposons des tarifs spéciaux pour les commandes de 10 exemplaires ou plus. Contactez-nous directement pour plus d\'informations.',
    contactUs: 'Contactez-nous',
    address: 'Adresse',
    phone: 'Téléphone',
    email: 'Email',
    subscribe: 'S\'abonner à la newsletter',
    terms: 'Conditions d\'utilisation',
    privacy: 'Politique de confidentialité',
    cookies: 'Politique des cookies',
    imprint: 'Mentions légales',
    faqSectionTitle: 'Foire Aux Questions'
  },
  de: {
    home: 'Startseite',
    about: 'Über uns',
    book: 'Buch',
    contact: 'Kontakt',
    faq: 'FAQ',
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
    faqTitle: 'Häufig gestellte Fragen',
    faqSubtitle: 'Finden Sie Antworten auf die am häufigsten gestellten Fragen zu Luxembourg Pas Cher.',
    faqDescription: 'Unsere Antworten auf Ihre Fragen zum wirtschaftlichen Leben in Luxemburg.',
    faqQuestion1: 'Wie kann mir das Buch "Luxembourg Pas Cher" beim Sparen helfen?',
    faqAnswer1: 'Unser Buch fasst die besten Tipps, Angebote und Ratschläge für ein Leben in Luxemburg zusammen, ohne sich zu ruinieren – von erschwinglichen Restaurants bis hin zu kostenlosen Aktivitäten und günstigen Transportmöglichkeiten.',
    faqQuestion2: 'Werden die Angebote regelmäßig aktualisiert?',
    faqAnswer2: 'Ja! Unsere Website ergänzt das Buch mit regelmäßigen Updates. Melden Sie sich für unseren Newsletter an, um die neuesten Angebote zu erhalten.',
    faqQuestion3: 'Kann ich eigene Spartipps teilen?',
    faqAnswer3: 'Auf jeden Fall! Wir ermutigen unsere Community zum Teilen. Kontaktieren Sie uns per E-Mail oder über soziale Medien, um uns Ihre Entdeckungen mitzuteilen.',
    faqQuestion4: 'Ist das Buch in mehreren Sprachen erhältlich?',
    faqAnswer4: 'Ja, das Buch "Luxembourg Pas Cher" ist auf Französisch, Deutsch und Englisch erhältlich, um der vielfältigen Gemeinschaft Luxemburgs zu dienen.',
    faqQuestion5: 'Gibt es Rabatte für Gruppenbestellungen?',
    faqAnswer5: 'Ja, wir bieten Sonderpreise für Bestellungen von 10 oder mehr Exemplaren an. Kontaktieren Sie uns direkt für weitere Informationen.',
    contactUs: 'Kontaktieren Sie uns',
    address: 'Adresse',
    phone: 'Telefon',
    email: 'E-Mail',
    subscribe: 'Newsletter abonnieren',
    terms: 'Nutzungsbedingungen',
    privacy: 'Datenschutzrichtlinie',
    cookies: 'Cookie-Richtlinie',
    imprint: 'Impressum',
    faqSectionTitle: 'Häufig gestellte Fragen'
  },
  en: {
    home: 'Home',
    about: 'About',
    book: 'Book',
    contact: 'Contact',
    faq: 'FAQ',
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
    faqTitle: 'Frequently Asked Questions',
    faqSubtitle: 'Find answers to the most frequently asked questions about Luxembourg Pas Cher.',
    faqDescription: 'Our answers to your questions about economic life in Luxembourg.',
    faqQuestion1: 'How can the "Luxembourg Pas Cher" book help me save money?',
    faqAnswer1: 'Our book compiles the best tips, offers, and advice for living in Luxembourg without breaking the bank, from affordable restaurants to free activities and economical transportation options.',
    faqQuestion2: 'Are the deals regularly updated?',
    faqAnswer2: 'Yes! Our website complements the book with regular updates. Sign up for our newsletter to receive the latest deals.',
    faqQuestion3: 'Can I contribute by sharing my own money-saving tips?',
    faqAnswer3: 'Absolutely! We encourage our community to share. Contact us via email or through our social media to let us know about your discoveries.',
    faqQuestion4: 'Is the book available in multiple languages?',
    faqAnswer4: 'Yes, the "Luxembourg Pas Cher" book is available in French, German, and English to serve Luxembourg\'s diverse community.',
    faqQuestion5: 'Are there discounts for bulk orders?',
    faqAnswer5: 'Yes, we offer special rates for orders of 10 copies or more. Contact us directly for more information.',
    contactUs: 'Contact Us',
    address: 'Address',
    phone: 'Phone',
    email: 'Email',
    subscribe: 'Subscribe to newsletter',
    terms: 'Terms of Use',
    privacy: 'Privacy Policy',
    cookies: 'Cookie Policy',
    imprint: 'Imprint',
    faqSectionTitle: 'Frequently Asked Questions'
  }
};

export default function MinimalAppSimplified() {
  const [language, setLanguage] = useState('fr');
  const [showLanguageDropdown, setShowLanguageDropdown] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [showCheckoutModal, setShowCheckoutModal] = useState(false);
  
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
    setShowCheckoutModal(true);
    // When the checkout modal is shown, prevent scrolling
    document.body.style.overflow = 'hidden';
  };
  
  // Handler to close checkout modal
  const handleCloseCheckoutModal = () => {
    setShowCheckoutModal(false);
    // Restore scrolling when the checkout modal is closed
    document.body.style.overflow = 'visible';
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
      const sections = ['home', 'about', 'book', 'contact', 'faq'];
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
            <img 
              src="/images/logo.jpg" 
              alt="Voix Solidaires Logo" 
              style={{
                height: '50px',
                maxWidth: '100%'
              }}
            />
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
                <a href="https://www.instagram.com/luxembourgpaschere/" target="_blank" rel="noopener noreferrer" className="social-button">
                  <Instagram size={18} aria-label="Instagram" />
                </a>
              </li>
              <li>
                <a href="https://www.facebook.com/luxembourgpaschere/" target="_blank" rel="noopener noreferrer" className="social-button">
                  <Facebook size={18} aria-label="Facebook" />
                </a>
              </li>
              <li>
                <a href="https://www.linkedin.com/company/luxembourgpaschere/" target="_blank" rel="noopener noreferrer" className="social-button">
                  <Linkedin size={18} aria-label="LinkedIn" />
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
            <div style={{ 
              display: 'flex', 
              justifyContent: 'center', 
              marginBottom: '1.5rem' 
            }}>
              <img 
                src="/images/logo.jpg" 
                alt="Voix Solidaires Logo" 
                style={{
                  height: '60px',
                  maxWidth: '100%'
                }}
              />
            </div>
            
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
                className="social-button"
              >
                <Instagram size={18} aria-label="Instagram" />
              </a>
              <a 
                href="https://www.facebook.com/luxembourgpaschere/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="social-button"
              >
                <Facebook size={18} aria-label="Facebook" />
              </a>
              <a 
                href="https://www.linkedin.com/company/luxembourgpaschere/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="social-button"
              >
                <Linkedin size={18} aria-label="LinkedIn" />
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
            <div 
              className="date-badge"
              style={{
                backgroundColor: '#38b6ff',
                color: 'white',
                padding: '6px 12px',
                borderRadius: '4px',
                fontWeight: 'bold',
                fontSize: '0.9rem',
                boxShadow: '0 2px 4px rgba(0, 0, 0, 0.2)',
                display: 'inline-block',
                marginBottom: '1rem'
              }}
            >
              {new Date().toLocaleDateString('fr-FR', { day: '2-digit', month: '2-digit', year: '2-digit' })}
            </div>
            
            <div style={{ 
              display: 'flex', 
              justifyContent: 'center', 
              marginBottom: '1.5rem',
              marginTop: '1rem'
            }}>
              <img 
                src="/images/logo.jpg" 
                alt="Voix Solidaires Logo" 
                style={{
                  height: '80px',
                  maxWidth: '90%',
                  filter: 'drop-shadow(0px 2px 5px rgba(0,0,0,0.2))'
                }}
              />
            </div>
            
            <p className="hero-subtitle" style={{ 
              fontSize: 'clamp(1rem, calc(0.95rem + 1vw), 1.3rem)',
              fontWeight: '500',
              lineHeight: '1.6',
              letterSpacing: '0.015em',
              maxWidth: '100%',
              width: 'min(42rem, 95%)',
              margin: '0 auto',
              padding: '0.75rem max(1rem, 3%)',
              color: '#333333',
              textAlign: 'center',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              display: '-webkit-box',
              WebkitLineClamp: '4',
              WebkitBoxOrient: 'vertical',
              textShadow: '0px 1px 2px rgba(255, 255, 255, 0.9)',
              wordWrap: 'break-word',
              hyphens: 'auto'
            }}>
              {t.heroDescription}
            </p>
          </div>
          
          {/* Book Display */}
          <div className="book-display">
            <div className="book-container">
              {/* Book Cover */}
              <div 
                style={{
                  position: 'relative',
                  transition: 'all 0.3s ease',
                  overflow: 'hidden',
                  borderRadius: '8px',
                  boxShadow: '0 10px 25px rgba(0, 0, 0, 0.15)',
                }}
                onMouseOver={(e) => {
                  const target = e.currentTarget;
                  target.style.transform = 'scale(1.03)';
                  target.style.boxShadow = '0 15px 35px rgba(0, 0, 0, 0.2)';
                }}
                onMouseOut={(e) => {
                  const target = e.currentTarget;
                  target.style.transform = 'scale(1)';
                  target.style.boxShadow = '0 10px 25px rgba(0, 0, 0, 0.15)';
                }}
              >
                <img 
                  src="/assets/cover.png" 
                  alt="Luxembourg Pas Cher - Guide Pratique" 
                  className="book-cover"
                  style={{
                    display: 'block',
                    width: '100%',
                    height: 'auto',
                    transition: 'all 0.3s ease',
                  }}
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
          </div>
          
          {/* Commander Button */}
          <div className="btn-wrapper">
            <button 
              className="btn-primary"
              onClick={handleOrderClick}
              style={{
                backgroundColor: '#E31837',
                color: 'white',
                border: 'none',
                borderRadius: '50px',
                padding: '0.8rem 2rem',
                fontSize: '1rem',
                fontWeight: 'bold',
                cursor: 'pointer',
                boxShadow: '0 4px 10px rgba(227, 24, 55, 0.3)',
                transition: 'all 0.3s ease',
                position: 'relative',
                overflow: 'hidden'
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.backgroundColor = '#c51027';
                e.currentTarget.style.transform = 'translateY(-2px)';
                e.currentTarget.style.boxShadow = '0 6px 15px rgba(227, 24, 55, 0.4)';
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.backgroundColor = '#E31837';
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 4px 10px rgba(227, 24, 55, 0.3)';
              }}
            >
              {t.order}
            </button>
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
            
            <button 
              onClick={() => {
                alert(language === 'fr' ? 
                  'Merci de votre soutien! Vous serez redirigé vers notre page de crowdfunding.' :
                  language === 'de' ? 
                  'Vielen Dank für Ihre Unterstützung! Sie werden zu unserer Crowdfunding-Seite weitergeleitet.' :
                  'Thank you for your support! You will be redirected to our crowdfunding page.');
              }}
              style={{
                backgroundColor: '#E31837',
                color: 'white',
                border: 'none',
                padding: '1rem 3rem',
                borderRadius: '50px',
                fontSize: '1.1rem',
                fontWeight: 'bold',
                cursor: 'pointer',
                boxShadow: '0 5px 15px rgba(227, 24, 55, 0.3)',
                transition: 'all 0.3s ease',
                position: 'relative',
                overflow: 'hidden'
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.backgroundColor = '#c51027';
                e.currentTarget.style.transform = 'translateY(-2px)';
                e.currentTarget.style.boxShadow = '0 6px 15px rgba(227, 24, 55, 0.4)';
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.backgroundColor = '#E31837';
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 5px 15px rgba(227, 24, 55, 0.3)';
              }}
            >
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
                {language === 'fr' ? 'Précommandez le guide 2025 et recevez-le dès sa sortie.' : 
                 language === 'de' ? 'Bestellen Sie den 2025-Führer vor und erhalten Sie ihn direkt nach Erscheinen.' : 
                 'Pre-order the 2025 guide and receive it at launch.'}
              </p>
              <div style={{
                fontSize: '1.5rem',
                fontWeight: 'bold',
                color: '#E31837',
                marginBottom: '1rem'
              }}>
                25€
              </div>
              <button 
                onClick={() => {
                  alert(language === 'fr' ? 
                    'Merci pour votre intérêt pour notre contribution de base! Votre commande sera traitée bientôt.' :
                    language === 'de' ? 
                    'Vielen Dank für Ihr Interesse an unserem Basisbeitrag! Ihre Bestellung wird in Kürze bearbeitet.' :
                    'Thank you for your interest in our basic contribution! Your order will be processed soon.');
                }}
                style={{
                  width: '100%',
                  padding: '0.75rem',
                  backgroundColor: '#f0f0f0',
                  border: 'none',
                  borderRadius: '4px',
                  fontWeight: 'bold',
                  cursor: 'pointer'
                }}
              >
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
              <button 
                onClick={() => {
                  alert(language === 'fr' ? 
                    'Merci d\'avoir choisi le Pack Supporter! Votre commande sera traitée prochainement.' :
                    language === 'de' ? 
                    'Vielen Dank, dass Sie sich für das Unterstützer-Paket entschieden haben! Ihre Bestellung wird in Kürze bearbeitet.' :
                    'Thank you for choosing the Supporter Pack! Your order will be processed soon.');
                }}
                style={{
                  width: '100%',
                  padding: '0.75rem',
                  backgroundColor: '#E31837',
                  color: 'white',
                  border: 'none',
                  borderRadius: '4px',
                  fontWeight: 'bold',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  boxShadow: '0 2px 6px rgba(227, 24, 55, 0.3)'
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.backgroundColor = '#c51027';
                  e.currentTarget.style.boxShadow = '0 4px 8px rgba(227, 24, 55, 0.4)';
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.backgroundColor = '#E31837';
                  e.currentTarget.style.boxShadow = '0 2px 6px rgba(227, 24, 55, 0.3)';
                }}
              >
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
              <button 
                onClick={() => {
                  alert(language === 'fr' ? 
                    'Merci pour votre intérêt pour notre offre premium! Votre commande sera traitée bientôt.' :
                    language === 'de' ? 
                    'Vielen Dank für Ihr Interesse an unserem Premium-Angebot! Ihre Bestellung wird in Kürze bearbeitet.' :
                    'Thank you for your interest in our premium offer! Your order will be processed soon.');
                }}
                style={{
                  width: '100%',
                  padding: '0.75rem',
                  backgroundColor: '#f0f0f0',
                  border: 'none',
                  borderRadius: '4px',
                  fontWeight: 'bold',
                  cursor: 'pointer'
                }}
              >
                {language === "fr" ? "Sélectionner" : 
                 language === "de" ? "Auswählen" : 
                 "Select"}
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
                  {language === 'fr' ? 'Découvrez nos sélections de restaurants offrant un excellent rapport qualité-prix dans tout le Luxembourg.' :
                   language === 'de' ? 'Entdecken Sie unsere Auswahl an Restaurants mit ausgezeichnetem Preis-Leistungs-Verhältnis in ganz Luxemburg.' :
                   'Discover our selection of restaurants offering excellent value for money throughout Luxembourg.'}
                </p>
                <button 
                  onClick={() => {
                    alert(language === 'fr' ? 
                      'Vous allez être redirigé vers notre page de gastronomie.' :
                      language === 'de' ? 
                      'Sie werden zu unserer Gastronomieseite weitergeleitet.' :
                      'You will be redirected to our gastronomy page.');
                  }}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    backgroundColor: 'transparent',
                    color: '#E31837',
                    border: 'none',
                    borderRadius: '4px',
                    padding: '0.5rem 0.75rem',
                    marginLeft: '-0.75rem',
                    fontSize: '0.95rem',
                    fontWeight: 'bold',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease'
                  }}
                  onMouseOver={(e) => {
                    e.currentTarget.style.backgroundColor = 'rgba(227, 24, 55, 0.1)';
                    e.currentTarget.style.transform = 'translateX(5px)';
                  }}
                  onMouseOut={(e) => {
                    e.currentTarget.style.backgroundColor = 'transparent';
                    e.currentTarget.style.transform = 'translateX(0)';
                  }}
                >
                  {language === 'fr' ? 'Découvrir' : 
                   language === 'de' ? 'Entdecken' : 
                   'Discover'}
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
                  {language === 'fr' ? 'Profitez des activités culturelles, sportives et de loisirs à prix réduits grâce à nos conseils et bons plans.' :
                   language === 'de' ? 'Genießen Sie kulturelle, sportliche und Freizeitaktivitäten zu reduzierten Preisen dank unserer Tipps und Angebote.' :
                   'Enjoy cultural, sports and leisure activities at reduced prices thanks to our tips and special offers.'}
                </p>
                <button 
                  onClick={() => {
                    alert(language === 'fr' ? 
                      'Vous allez être redirigé vers notre page de loisirs et culture.' :
                      language === 'de' ? 
                      'Sie werden zu unserer Freizeit- und Kulturseite weitergeleitet.' :
                      'You will be redirected to our leisure and culture page.');
                  }}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    backgroundColor: 'transparent',
                    color: '#E31837',
                    border: 'none',
                    borderRadius: '4px',
                    padding: '0.5rem 0.75rem',
                    marginLeft: '-0.75rem',
                    fontSize: '0.95rem',
                    fontWeight: 'bold',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease'
                  }}
                  onMouseOver={(e) => {
                    e.currentTarget.style.backgroundColor = 'rgba(227, 24, 55, 0.1)';
                    e.currentTarget.style.transform = 'translateX(5px)';
                  }}
                  onMouseOut={(e) => {
                    e.currentTarget.style.backgroundColor = 'transparent';
                    e.currentTarget.style.transform = 'translateX(0)';
                  }}
                >
                  {language === 'fr' ? 'Découvrir' : 
                   language === 'de' ? 'Entdecken' : 
                   'Discover'}
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
                  {language === 'fr' ? 'Nos meilleures adresses pour faire du shopping malin et économique au Luxembourg, des vêtements à l\'électronique.' :
                   language === 'de' ? 'Unsere besten Adressen für intelligentes und wirtschaftliches Einkaufen in Luxemburg, von Kleidung bis Elektronik.' :
                   'Our best addresses for smart and economical shopping in Luxembourg, from clothing to electronics.'}
                </p>
                <button 
                  onClick={() => {
                    alert(language === 'fr' ? 
                      'Vous allez être redirigé vers notre page de shopping.' :
                      language === 'de' ? 
                      'Sie werden zu unserer Shopping-Seite weitergeleitet.' :
                      'You will be redirected to our shopping page.');
                  }}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    backgroundColor: 'transparent',
                    color: '#E31837',
                    border: 'none',
                    borderRadius: '4px',
                    padding: '0.5rem 0.75rem',
                    marginLeft: '-0.75rem',
                    fontSize: '0.95rem',
                    fontWeight: 'bold',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease'
                  }}
                  onMouseOver={(e) => {
                    e.currentTarget.style.backgroundColor = 'rgba(227, 24, 55, 0.1)';
                    e.currentTarget.style.transform = 'translateX(5px)';
                  }}
                  onMouseOut={(e) => {
                    e.currentTarget.style.backgroundColor = 'transparent';
                    e.currentTarget.style.transform = 'translateX(0)';
                  }}
                >
                  {language === 'fr' ? 'Découvrir' : 
                   language === 'de' ? 'Entdecken' : 
                   'Discover'}
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ marginLeft: '0.5rem' }}>
                    <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="#E31837" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <FAQSection language={language as 'fr' | 'de' | 'en'} t={t} />

      {/* Footer */}
      <footer style={{
        backgroundColor: '#1f2937',
        color: '#fff',
        padding: '5rem 0 2rem',
        borderTop: '5px solid #38b6ff',
        boxShadow: 'inset 0 10px 15px -10px rgba(0,0,0,0.3)'
      }}>
        <div style={{ 
          maxWidth: '1200px',
          margin: '0 auto',
          padding: '0 2rem'
        }}>
          {/* Main Footer */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '3rem',
            marginBottom: '3.5rem'
          }}>
            {/* Logo & About */}
            <div>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                marginBottom: '1.5rem'
              }}>
                <img 
                  src="/images/logo.jpg" 
                  alt="Voix Solidaires Logo" 
                  style={{
                    height: '60px',
                    maxWidth: '100%'
                  }}
                />
              </div>
              <p style={{
                fontSize: '0.95rem',
                lineHeight: '1.6',
                color: '#aaa',
                marginBottom: '1.5rem'
              }}>
                {language === 'fr' ? 'Guide complet pour découvrir et profiter du Luxembourg sans se ruiner. Conseils, bons plans et astuces pour tous.' :
                 language === 'de' ? 'Umfassender Leitfaden zum Entdecken und Genießen von Luxemburg, ohne sich zu ruinieren. Ratschläge, Angebote und Tipps für jeden.' :
                 'Comprehensive guide to discover and enjoy Luxembourg without breaking the bank. Advice, deals, and tips for everyone.'}
              </p>
              <div style={{
                display: 'flex',
                gap: '1rem',
                marginBottom: '1.5rem'
              }}>
                {/* Facebook */}
                <a 
                  href="#" 
                  aria-label="Facebook"
                  onClick={(e) => {
                    e.preventDefault();
                    alert(language === 'fr' ? 'Redirection vers Facebook' :
                          language === 'de' ? 'Weiterleitung zu Facebook' :
                          'Redirecting to Facebook');
                  }}
                  style={{
                    width: '40px',
                    height: '40px',
                    borderRadius: '8px',
                    backgroundColor: '#38b6ff',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'white',
                    transition: 'all 0.3s ease',
                    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
                  }}
                  onMouseOver={(e) => {
                    e.currentTarget.style.backgroundColor = '#0077e6';
                    e.currentTarget.style.transform = 'translateY(-3px)';
                    e.currentTarget.style.boxShadow = '0 6px 10px rgba(0, 0, 0, 0.2)';
                  }}
                  onMouseOut={(e) => {
                    e.currentTarget.style.backgroundColor = '#38b6ff';
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.1)';
                  }}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" viewBox="0 0 16 16">
                    <path d="M16 8.049c0-4.446-3.582-8.05-8-8.05C3.58 0-.002 3.603-.002 8.05c0 4.017 2.926 7.347 6.75 7.951v-5.625h-2.03V8.05H6.75V6.275c0-2.017 1.195-3.131 3.022-3.131.876 0 1.791.157 1.791.157v1.98h-1.009c-.993 0-1.303.621-1.303 1.258v1.51h2.218l-.354 2.326H9.25V16c3.824-.604 6.75-3.934 6.75-7.951z"/>
                  </svg>
                </a>
                {/* X (Twitter) */}
                <a 
                  href="#" 
                  aria-label="Twitter"
                  onClick={(e) => {
                    e.preventDefault();
                    alert(language === 'fr' ? 'Redirection vers X (Twitter)' :
                          language === 'de' ? 'Weiterleitung zu X (Twitter)' :
                          'Redirecting to X (Twitter)');
                  }}
                  style={{
                    width: '40px',
                    height: '40px',
                    borderRadius: '8px',
                    backgroundColor: '#38b6ff',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'white',
                    transition: 'all 0.3s ease',
                    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
                  }}
                  onMouseOver={(e) => {
                    e.currentTarget.style.backgroundColor = '#0077e6';
                    e.currentTarget.style.transform = 'translateY(-3px)';
                    e.currentTarget.style.boxShadow = '0 6px 10px rgba(0, 0, 0, 0.2)';
                  }}
                  onMouseOut={(e) => {
                    e.currentTarget.style.backgroundColor = '#38b6ff';
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.1)';
                  }}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" viewBox="0 0 16 16">
                    <path d="M12.6.75h2.454l-5.36 6.142L16 15.25h-4.937l-3.867-5.07-4.425 5.07H.316l5.733-6.57L0 .75h5.063l3.495 4.633L12.601.75Zm-.86 13.028h1.36L4.323 2.145H2.865z"/>
                  </svg>
                </a>
                {/* Instagram */}
                <a 
                  href="#" 
                  aria-label="Instagram"
                  onClick={(e) => {
                    e.preventDefault();
                    alert(language === 'fr' ? 'Redirection vers Instagram' :
                          language === 'de' ? 'Weiterleitung zu Instagram' :
                          'Redirecting to Instagram');
                  }}
                  style={{
                    width: '40px',
                    height: '40px',
                    borderRadius: '8px',
                    backgroundColor: '#38b6ff',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'white',
                    transition: 'all 0.3s ease',
                    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
                  }}
                  onMouseOver={(e) => {
                    e.currentTarget.style.backgroundColor = '#0077e6';
                    e.currentTarget.style.transform = 'translateY(-3px)';
                    e.currentTarget.style.boxShadow = '0 6px 10px rgba(0, 0, 0, 0.2)';
                  }}
                  onMouseOut={(e) => {
                    e.currentTarget.style.backgroundColor = '#38b6ff';
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.1)';
                  }}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" viewBox="0 0 16 16">
                    <path d="M8 0C5.829 0 5.556.01 4.703.048 3.85.088 3.269.222 2.76.42a3.917 3.917 0 0 0-1.417.923A3.927 3.927 0 0 0 .42 2.76C.222 3.268.087 3.85.048 4.7.01 5.555 0 5.827 0 8.001c0 2.172.01 2.444.048 3.297.04.852.174 1.433.372 1.942.205.526.478.972.923 1.417.444.445.89.719 1.416.923.51.198 1.09.333 1.942.372C5.555 15.99 5.827 16 8 16s2.444-.01 3.298-.048c.851-.04 1.434-.174 1.943-.372a3.916 3.916 0 0 0 1.416-.923c.445-.445.718-.891.923-1.417.197-.509.332-1.09.372-1.942C15.99 10.445 16 10.173 16 8s-.01-2.445-.048-3.299c-.04-.851-.175-1.433-.372-1.941a3.926 3.926 0 0 0-.923-1.417A3.911 3.911 0 0 0 13.24.42c-.51-.198-1.092-.333-1.943-.372C10.443.01 10.172 0 7.998 0h.003zm-.717 1.442h.718c2.136 0 2.389.007 3.232.046.78.035 1.204.166 1.486.275.373.145.64.319.92.599.28.28.453.546.598.92.11.281.24.705.275 1.485.039.843.047 1.096.047 3.231s-.008 2.389-.047 3.232c-.035.78-.166 1.203-.275 1.485a2.47 2.47 0 0 1-.599.919c-.28.28-.546.453-.92.598-.28.11-.704.24-1.485.276-.843.038-1.096.047-3.232.047s-2.39-.009-3.233-.047c-.78-.036-1.203-.166-1.485-.276a2.478 2.478 0 0 1-.92-.598 2.48 2.48 0 0 1-.6-.92c-.109-.281-.24-.705-.275-1.485-.038-.843-.046-1.096-.046-3.233 0-2.136.008-2.388.046-3.231.036-.78.166-1.204.276-1.486.145-.373.319-.64.599-.92.28-.28.546-.453.92-.598.282-.11.705-.24 1.485-.276.738-.034 1.024-.044 2.515-.045v.002zm4.988 1.328a.96.96 0 1 0 0 1.92.96.96 0 0 0 0-1.92zm-4.27 1.122a4.109 4.109 0 1 0 0 8.217 4.109 4.109 0 0 0 0-8.217zm0 1.441a2.667 2.667 0 1 1 0 5.334 2.667 2.667 0 0 1 0-5.334z"/>
                  </svg>
                </a>
                {/* LinkedIn */}
                <a 
                  href="#" 
                  aria-label="LinkedIn"
                  onClick={(e) => {
                    e.preventDefault();
                    alert(language === 'fr' ? 'Redirection vers LinkedIn' :
                          language === 'de' ? 'Weiterleitung zu LinkedIn' :
                          'Redirecting to LinkedIn');
                  }}
                  style={{
                    width: '40px',
                    height: '40px',
                    borderRadius: '8px',
                    backgroundColor: '#38b6ff',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'white',
                    transition: 'all 0.3s ease',
                    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
                  }}
                  onMouseOver={(e) => {
                    e.currentTarget.style.backgroundColor = '#0077e6';
                    e.currentTarget.style.transform = 'translateY(-3px)';
                    e.currentTarget.style.boxShadow = '0 6px 10px rgba(0, 0, 0, 0.2)';
                  }}
                  onMouseOut={(e) => {
                    e.currentTarget.style.backgroundColor = '#38b6ff';
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.1)';
                  }}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" viewBox="0 0 16 16">
                    <path d="M0 1.146C0 .513.526 0 1.175 0h13.65C15.474 0 16 .513 16 1.146v13.708c0 .633-.526 1.146-1.175 1.146H1.175C.526 16 0 15.487 0 14.854V1.146zm4.943 12.248V6.169H2.542v7.225h2.401zm-1.2-8.212c.837 0 1.358-.554 1.358-1.248-.015-.709-.52-1.248-1.342-1.248-.822 0-1.359.54-1.359 1.248 0 .694.521 1.248 1.327 1.248h.016zm4.908 8.212V9.359c0-.216.016-.432.08-.586.173-.431.568-.878 1.232-.878.869 0 1.216.662 1.216 1.634v3.865h2.401V9.25c0-2.22-1.184-3.252-2.764-3.252-1.274 0-1.845.7-2.165 1.193v.025h-.016a5.54 5.54 0 0 1 .016-.025V6.169h-2.4c.03.678 0 7.225 0 7.225h2.4z"/>
                  </svg>
                </a>
              </div>
            </div>
            
            {/* Useful Links */}
            <div>
              <h4 style={{
                fontSize: '1.2rem',
                fontWeight: 'bold',
                marginBottom: '1.5rem',
                color: '#fff',
                position: 'relative',
                paddingBottom: '0.5rem'
              }}>
                {language === 'fr' ? 'Liens utiles' : 
                 language === 'de' ? 'Nützliche Links' : 
                 'Useful Links'}
                <span style={{
                  position: 'absolute',
                  bottom: 0,
                  left: 0,
                  width: '50px',
                  height: '2px',
                  backgroundColor: '#38b6ff'
                }}></span>
              </h4>
              <ul style={{
                listStyle: 'none',
                padding: 0,
                margin: 0
              }}>
                <li style={{ marginBottom: '0.8rem' }}>
                  <a 
                    href="#" 
                    onClick={(e) => {
                      e.preventDefault();
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    style={{
                      color: '#aaa',
                      textDecoration: 'none',
                      fontSize: '0.95rem',
                      display: 'flex',
                      alignItems: 'center',
                      transition: 'all 0.3s ease'
                    }}
                    onMouseOver={(e) => {
                      e.currentTarget.style.color = '#38b6ff';
                      e.currentTarget.style.paddingLeft = '5px';
                    }}
                    onMouseOut={(e) => {
                      e.currentTarget.style.color = '#aaa';
                      e.currentTarget.style.paddingLeft = '0px';
                    }}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" fill="currentColor" viewBox="0 0 16 16" style={{ marginRight: '0.5rem' }}>
                      <path fillRule="evenodd" d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708z"/>
                    </svg>
                    {language === 'fr' ? 'Accueil' : 
                     language === 'de' ? 'Startseite' : 
                     'Home'}
                  </a>
                </li>
                <li style={{ marginBottom: '0.8rem' }}>
                  <a 
                    href="#about" 
                    onClick={(e) => {
                      e.preventDefault();
                      const aboutSection = document.getElementById('about');
                      if (aboutSection) {
                        aboutSection.scrollIntoView({ behavior: 'smooth' });
                      }
                    }}
                    style={{
                      color: '#aaa',
                      textDecoration: 'none',
                      fontSize: '0.95rem',
                      display: 'flex',
                      alignItems: 'center',
                      transition: 'all 0.3s ease'
                    }}
                    onMouseOver={(e) => {
                      e.currentTarget.style.color = '#38b6ff';
                      e.currentTarget.style.paddingLeft = '5px';
                    }}
                    onMouseOut={(e) => {
                      e.currentTarget.style.color = '#aaa';
                      e.currentTarget.style.paddingLeft = '0px';
                    }}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" fill="currentColor" viewBox="0 0 16 16" style={{ marginRight: '0.5rem' }}>
                      <path fillRule="evenodd" d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708z"/>
                    </svg>
                    {language === 'fr' ? 'À propos' : 
                     language === 'de' ? 'Über uns' : 
                     'About Us'}
                  </a>
                </li>
                <li style={{ marginBottom: '0.8rem' }}>
                  <a 
                    href="#" 
                    onClick={(e) => {
                      e.preventDefault();
                      alert(language === 'fr' ? 'Redirection vers la page FAQ' :
                            language === 'de' ? 'Weiterleitung zur FAQ-Seite' :
                            'Redirecting to FAQ page');
                    }}
                    style={{
                      color: '#aaa',
                      textDecoration: 'none',
                      fontSize: '0.95rem',
                      display: 'flex',
                      alignItems: 'center',
                      transition: 'all 0.3s ease'
                    }}
                    onMouseOver={(e) => {
                      e.currentTarget.style.color = '#38b6ff';
                      e.currentTarget.style.paddingLeft = '5px';
                    }}
                    onMouseOut={(e) => {
                      e.currentTarget.style.color = '#aaa';
                      e.currentTarget.style.paddingLeft = '0px';
                    }}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" fill="currentColor" viewBox="0 0 16 16" style={{ marginRight: '0.5rem' }}>
                      <path fillRule="evenodd" d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708z"/>
                    </svg>
                    {t.faq}
                  </a>
                </li>
                <li style={{ marginBottom: '0.8rem' }}>
                  <a 
                    href="#" 
                    onClick={(e) => {
                      e.preventDefault();
                      alert(language === 'fr' ? 'Redirection vers la page Blog' :
                            language === 'de' ? 'Weiterleitung zur Blog-Seite' :
                            'Redirecting to Blog page');
                    }}
                    style={{
                      color: '#aaa',
                      textDecoration: 'none',
                      fontSize: '0.95rem',
                      display: 'flex',
                      alignItems: 'center',
                      transition: 'all 0.3s ease'
                    }}
                    onMouseOver={(e) => {
                      e.currentTarget.style.color = '#38b6ff';
                      e.currentTarget.style.paddingLeft = '5px';
                    }}
                    onMouseOut={(e) => {
                      e.currentTarget.style.color = '#aaa';
                      e.currentTarget.style.paddingLeft = '0px';
                    }}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" fill="currentColor" viewBox="0 0 16 16" style={{ marginRight: '0.5rem' }}>
                      <path fillRule="evenodd" d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708z"/>
                    </svg>
                    Blog
                  </a>
                </li>
                <li>
                  <a 
                    href="#" 
                    onClick={(e) => {
                      e.preventDefault();
                      alert(language === 'fr' ? 'Redirection vers la page Offres' :
                            language === 'de' ? 'Weiterleitung zur Angebote-Seite' :
                            'Redirecting to Offers page');
                    }}
                    style={{
                      color: '#aaa',
                      textDecoration: 'none',
                      fontSize: '0.95rem',
                      display: 'flex',
                      alignItems: 'center',
                      transition: 'all 0.3s ease'
                    }}
                    onMouseOver={(e) => {
                      e.currentTarget.style.color = '#38b6ff';
                      e.currentTarget.style.paddingLeft = '5px';
                    }}
                    onMouseOut={(e) => {
                      e.currentTarget.style.color = '#aaa';
                      e.currentTarget.style.paddingLeft = '0px';
                    }}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" fill="currentColor" viewBox="0 0 16 16" style={{ marginRight: '0.5rem' }}>
                      <path fillRule="evenodd" d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708z"/>
                    </svg>
                    {language === 'fr' ? 'Offres' : 
                     language === 'de' ? 'Angebote' : 
                     'Offers'}
                  </a>
                </li>
              </ul>
            </div>
            
            {/* Contact */}
            <div>
              <h4 style={{
                fontSize: '1.2rem',
                fontWeight: 'bold',
                marginBottom: '1.5rem',
                color: '#fff',
                position: 'relative',
                paddingBottom: '0.5rem'
              }}>
                {t.contactUs}
                <span style={{
                  position: 'absolute',
                  bottom: 0,
                  left: 0,
                  width: '50px',
                  height: '2px',
                  backgroundColor: '#38b6ff'
                }}></span>
              </h4>
              <ul style={{
                listStyle: 'none',
                padding: 0,
                margin: 0
              }}>
                <li style={{ marginBottom: '0.8rem' }}>
                  <div style={{
                    display: 'flex',
                    alignItems: 'flex-start',
                    color: '#aaa',
                    fontSize: '0.95rem'
                  }}>
                    <div style={{
                      marginRight: '1rem',
                      marginTop: '0.3rem'
                    }}>
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="#38b6ff" viewBox="0 0 16 16">
                        <path d="M8 16s6-5.686 6-10A6 6 0 0 0 2 6c0 4.314 6 10 6 10zm0-7a3 3 0 1 1 0-6 3 3 0 0 1 0 6z"/>
                      </svg>
                    </div>
                    <div>
                      <strong style={{ display: 'block', color: '#fff', marginBottom: '0.3rem' }}>{t.address}:</strong>
                      15, Rue de Luxembourg<br />L-1234 Luxembourg
                    </div>
                  </div>
                </li>
                <li style={{ marginBottom: '0.8rem' }}>
                  <div style={{
                    display: 'flex',
                    alignItems: 'flex-start',
                    color: '#aaa',
                    fontSize: '0.95rem'
                  }}>
                    <div style={{
                      marginRight: '1rem',
                      marginTop: '0.3rem'
                    }}>
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="#38b6ff" viewBox="0 0 16 16">
                        <path fillRule="evenodd" d="M1.885.511a1.745 1.745 0 0 1 2.61.163L6.29 2.98c.329.423.445.974.315 1.494l-.547 2.19a.678.678 0 0 0 .178.643l2.457 2.457a.678.678 0 0 0 .644.178l2.189-.547a1.745 1.745 0 0 1 1.494.315l2.306 1.794c.829.645.905 1.87.163 2.611l-1.034 1.034c-.74.74-1.846 1.065-2.877.702a18.634 18.634 0 0 1-7.01-4.42 18.634 18.634 0 0 1-4.42-7.009c-.362-1.03-.037-2.137.703-2.877L1.885.511z"/>
                      </svg>
                    </div>
                    <div>
                      <strong style={{ display: 'block', color: '#fff', marginBottom: '0.3rem' }}>{t.phone}:</strong>
                      +352 12 34 56 78
                    </div>
                  </div>
                </li>
                <li>
                  <div style={{
                    display: 'flex',
                    alignItems: 'flex-start',
                    color: '#aaa',
                    fontSize: '0.95rem'
                  }}>
                    <div style={{
                      marginRight: '1rem',
                      marginTop: '0.3rem'
                    }}>
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="#38b6ff" viewBox="0 0 16 16">
                        <path d="M.05 3.555A2 2 0 0 1 2 2h12a2 2 0 0 1 1.95 1.555L8 8.414.05 3.555ZM0 4.697v7.104l5.803-3.558L0 4.697ZM6.761 8.83l-6.57 4.027A2 2 0 0 0 2 14h12a2 2 0 0 0 1.808-1.144l-6.57-4.027L8 9.586l-1.239-.757Zm3.436-.586L16 11.801V4.697l-5.803 3.546Z"/>
                      </svg>
                    </div>
                    <div>
                      <strong style={{ display: 'block', color: '#fff', marginBottom: '0.3rem' }}>{t.email}:</strong>
                      info@luxembourgpascher.lu
                    </div>
                  </div>
                </li>
              </ul>
            </div>
            
            {/* Newsletter */}
            <div>
              <h4 style={{
                fontSize: '1.25rem',
                fontWeight: 'bold',
                marginBottom: '1.5rem',
                color: '#fff',
                position: 'relative',
                paddingBottom: '0.75rem'
              }}>
                {language === 'fr' ? 'Newsletter' : 
                 language === 'de' ? 'Newsletter' : 
                 'Newsletter'}
                <span style={{
                  position: 'absolute',
                  bottom: 0,
                  left: 0,
                  width: '60px',
                  height: '3px',
                  backgroundColor: '#38b6ff',
                  borderRadius: '1.5px'
                }}></span>
              </h4>
              <p style={{
                fontSize: '0.95rem',
                lineHeight: '1.6',
                color: '#bbb',
                marginBottom: '1.5rem'
              }}>
                {language === 'fr' ? 'Recevez nos conseils, actualités et bons plans au Luxembourg directement dans votre boîte mail.' :
                 language === 'de' ? 'Erhalten Sie unsere Tipps, Neuigkeiten und Angebote in Luxemburg direkt in Ihrem Posteingang.' :
                 'Get our tips, news and deals in Luxembourg directly in your inbox.'}
              </p>
              <form style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '1rem'
              }}>
                <div style={{
                  position: 'relative'
                }}>
                  <input 
                    type="email" 
                    placeholder={language === 'fr' ? 'Votre adresse email' : 
                                 language === 'de' ? 'Ihre E-Mail-Adresse' : 
                                 'Your email address'}
                    style={{
                      padding: '1rem 1.2rem',
                      borderRadius: '6px',
                      border: '1px solid rgba(255,255,255,0.1)',
                      fontSize: '0.95rem',
                      backgroundColor: 'rgba(255,255,255,0.05)',
                      color: '#fff',
                      outline: 'none',
                      width: '100%',
                      transition: 'all 0.3s ease'
                    }}
                    onFocus={(e) => {
                      e.currentTarget.style.borderColor = '#38b6ff';
                      e.currentTarget.style.boxShadow = '0 0 0 3px rgba(56, 182, 255, 0.2)';
                    }}
                    onBlur={(e) => {
                      e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)';
                      e.currentTarget.style.boxShadow = 'none';
                    }}
                  />
                </div>
                <button 
                  onClick={(e) => {
                    e.preventDefault();
                    alert(language === 'fr' ? 
                      'Merci de vous être inscrit à notre newsletter ! Vous recevrez bientôt nos dernières offres et conseils.' :
                      language === 'de' ? 
                      'Vielen Dank für Ihre Anmeldung zu unserem Newsletter! Sie erhalten in Kürze unsere neuesten Angebote und Tipps.' :
                      'Thank you for subscribing to our newsletter! You will soon receive our latest offers and tips.');
                  }}
                  style={{
                    backgroundColor: '#e81414',
                    color: 'white',
                    padding: '1rem 1.2rem',
                    borderRadius: '6px',
                    border: 'none',
                    fontSize: '0.95rem',
                    fontWeight: 'bold',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease',
                    boxShadow: '0 4px 10px rgba(232, 20, 20, 0.2)'
                  }}
                  onMouseOver={(e) => {
                    e.currentTarget.style.backgroundColor = '#c51027';
                    e.currentTarget.style.transform = 'translateY(-2px)';
                    e.currentTarget.style.boxShadow = '0 6px 15px rgba(232, 20, 20, 0.3)';
                  }}
                  onMouseOut={(e) => {
                    e.currentTarget.style.backgroundColor = '#e81414';
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = '0 4px 10px rgba(232, 20, 20, 0.2)';
                  }}
                >
                  {t.subscribe}
                </button>
              </form>
            </div>
          </div>
          
          {/* Copyright and Legal */}
          <div style={{
            borderTop: '1px solid rgba(255,255,255,0.1)',
            paddingTop: '2rem',
            marginTop: '1.5rem',
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'space-between',
            fontSize: '0.9rem',
            color: '#888'
          }}>
            <div style={{ 
              marginBottom: '1rem',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem' 
            }}>
              <span>© {new Date().getFullYear()}</span>
              <span>
                {language === 'fr' ? 'Voix Solidaires. Tous droits réservés.' : 
                 language === 'de' ? 'Voix Solidaires. Alle Rechte vorbehalten.' : 
                 'Voix Solidaires. All rights reserved.'}
              </span>
            </div>
            <div style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: '1.5rem',
              marginBottom: '1rem'
            }}>
              <a 
                href="#" 
                onClick={(e) => {
                  e.preventDefault();
                  alert(language === 'fr' ? 'Redirection vers les conditions générales' :
                        language === 'de' ? 'Weiterleitung zu den AGB' :
                        'Redirecting to Terms & Conditions');
                }}
                style={{
                  color: '#888',
                  textDecoration: 'none',
                  transition: 'color 0.3s ease'
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.color = '#38b6ff';
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.color = '#888';
                }}
              >
                {t.terms}
              </a>
              <a 
                href="#" 
                onClick={(e) => {
                  e.preventDefault();
                  alert(language === 'fr' ? 'Redirection vers la politique de confidentialité' :
                        language === 'de' ? 'Weiterleitung zur Datenschutzrichtlinie' :
                        'Redirecting to Privacy Policy');
                }}
                style={{
                  color: '#888',
                  textDecoration: 'none',
                  transition: 'color 0.3s ease'
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.color = '#38b6ff';
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.color = '#888';
                }}
              >
                {t.privacy}
              </a>
              <a 
                href="#" 
                onClick={(e) => {
                  e.preventDefault();
                  alert(language === 'fr' ? 'Redirection vers la politique des cookies' :
                        language === 'de' ? 'Weiterleitung zur Cookie-Richtlinie' :
                        'Redirecting to Cookie Policy');
                }}
                style={{
                  color: '#888',
                  textDecoration: 'none',
                  transition: 'color 0.3s ease'
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.color = '#38b6ff';
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.color = '#888';
                }}
              >
                {t.cookies}
              </a>
              <a 
                href="#" 
                onClick={(e) => {
                  e.preventDefault();
                  alert(language === 'fr' ? 'Redirection vers les mentions légales' :
                        language === 'de' ? 'Weiterleitung zum Impressum' :
                        'Redirecting to Imprint');
                }}
                style={{
                  color: '#888',
                  textDecoration: 'none',
                  transition: 'color 0.3s ease'
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.color = '#38b6ff';
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.color = '#888';
                }}
              >
                {language === 'fr' ? t.imprint : 
                 language === 'de' ? t.imprint : 
                 t.imprint}
              </a>
            </div>
          </div>
        </div>
        
        {/* Back to Top Button */}
        {showScrollTop && (
          <button 
            onClick={() => {
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            style={{
              position: 'fixed',
              right: '25px',
              bottom: '25px',
              width: '55px',
              height: '55px',
              borderRadius: '12px',
              backgroundColor: '#38b6ff',
              color: 'white',
              border: 'none',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              boxShadow: '0 4px 15px rgba(0, 0, 0, 0.3)',
              transition: 'all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
              zIndex: 99,
              opacity: 0.9
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.backgroundColor = '#1a9cf0';
              e.currentTarget.style.transform = 'translateY(-5px) scale(1.05)';
              e.currentTarget.style.boxShadow = '0 8px 20px rgba(0, 0, 0, 0.4)';
              e.currentTarget.style.opacity = '1';
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.backgroundColor = '#38b6ff';
              e.currentTarget.style.transform = 'translateY(0) scale(1)';
              e.currentTarget.style.boxShadow = '0 4px 15px rgba(0, 0, 0, 0.3)';
              e.currentTarget.style.opacity = '0.9';
            }}
            aria-label={language === 'fr' ? 'Retour en haut' : language === 'de' ? 'Zurück nach oben' : 'Back to top'}
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 16 16">
              <path fillRule="evenodd" d="M8 15a.5.5 0 0 0 .5-.5V2.707l3.146 3.147a.5.5 0 0 0 .708-.708l-4-4a.5.5 0 0 0-.708 0l-4 4a.5.5 0 1 0 .708.708L7.5 2.707V14.5a.5.5 0 0 0 .5.5z"/>
            </svg>
          </button>
        )}
      </footer>

      
      {/* Checkout Modal */}
      <CheckoutModal 
        isOpen={showCheckoutModal} 
        onClose={handleCloseCheckoutModal} 
        language={language as 'fr' | 'de' | 'en'} 
      />
    </div>
  );
}