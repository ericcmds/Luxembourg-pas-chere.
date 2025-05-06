import React, { useState, useEffect, useRef } from 'react';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';

// Translations
const translations = {
  fr: {
    home: 'Accueil',
    about: 'À propos',
    book: 'Livre',
    targets: 'Groupes cibles',
    contact: 'Contact',
    orderBook: 'COMMANDER',
    learnMore: 'En savoir plus',
    discover: 'Découvrir',
    crowdfunding: 'Participer au crowdfunding',
    welcome: 'Bienvenue chez Luxembourg Pas Cher',
    welcomeText: 'Découvrez comment profiter de ce magnifique pays sans vider votre portefeuille. Notre guide vous offre les meilleurs conseils et offres pour une vie abordable au Luxembourg.',
    ourBook: 'Notre Livre',
    bookDesc: 'Le livre "Luxembourg Pas Cher" contient plus de 500 offres et conseils.',
    aboutUs: 'À propos de nous',
    aboutUsDesc: 'Nous sommes une équipe dévouée qui s\'est donnée pour mission de rendre la vie au Luxembourg abordable pour tous.',
    targetGroups: 'Groupes cibles',
    targetGroupsDesc: 'Notre guide s\'adresse à différents groupes cibles qui vivent ou travaillent au Luxembourg.',
    student: 'Étudiant·e',
    studentDesc: 'Qu\'ils soient luxembourgeois ou internationaux, les étudiants sont confrontés à des coûts de vie élevés, notamment en matière de logement.',
    entrepreneur: 'Auto-entrepreneur·e',
    entrepreneurDesc: 'Avec un budget limité, il/elle jongle entre activité indépendante et dépenses personnelles.',
    families: 'Familles',
    familiesDesc: 'Les familles monoparentales ou précaires cumulent charge mentale et instabilité financière.',
    copyright: '© 2025 Luxembourg Pas Cher. Tous droits réservés.',
    selectLanguage: 'Sélectionner la langue',
    purchaseTitle: 'Commander le livre',
    purchaseDesc: 'Remplissez le formulaire ci-dessous pour commander votre exemplaire du livre Luxembourg Pas Cher.',
    name: 'Nom complet',
    email: 'Adresse e-mail',
    shippingAddress: 'Adresse de livraison',
    quantity: 'Quantité',
    submit: 'Commander maintenant',
    close: 'Fermer',
    backToTop: 'Retour en haut',
    crowdfundingTitle: 'Aidez-nous - CROWDFUNDING',
    crowdfundingDesc: 'Participez à notre campagne de financement participatif et soutenez le développement de Luxembourg Pas Cher.',
    crowdfundingStatus: 'En cours',
    crowdfundingEdition: 'Notre nouvelle édition 2025',
    crowdfundingEditionDesc: 'Nous préparons une édition enrichie avec encore plus de conseils, d\'astuces et de bons plans pour vivre au Luxembourg sans se ruiner. Votre participation nous aidera à financer l\'impression et la distribution de ce nouveau guide.',
    crowdfundingGoal: 'Objectif: 10,000€',
    crowdfundingProgress: '60% atteint',
    crowdfundingCollected: '6,000€ collectés',
    crowdfundingContributors: '123 contributeurs',
    mediaTitle: 'On parle de nous',
    mediaDesc: 'Découvrez ce que les médias luxembourgeois et internationaux disent de notre guide.',
    discoverTitle: 'Découvrir',
    discoverDesc: 'Explorez Luxembourg à travers nos sélections thématiques et découvrez les meilleurs plans économiques.',
    allRightsReserved: 'Tous droits réservés',
    terms: 'Conditions d\'utilisation',
    privacy: 'Politique de confidentialité',
    cookies: 'Gestion des cookies',
    contactUs: 'Contactez-nous',
    addressLabel: 'Adresse',
    newsletter: 'Newsletter',
    subscribeToNewsletter: 'Abonnez-vous à notre newsletter pour recevoir nos derniers conseils et offres exclusives.',
    yourEmailAddress: 'Votre adresse e-mail',
    subscribe: 'S\'abonner',
    statsSold: 'Exemplaires vendus',
    statsTips: 'Astuces et bons plans',
    gastronomy: 'Gastronomie',
    gastronomyDesc: 'Découvrez nos sélections de restaurants offrant un excellent rapport qualité-prix dans tout le Luxembourg.',
    leisure: 'Loisirs & Culture',
    leisureDesc: 'Profitez des activités culturelles, sportives et de loisirs à prix réduits grâce à nos conseils et bons plans.',
    shopping: 'Shopping',
    shoppingDesc: 'Nos meilleures adresses pour faire du shopping malin et économique au Luxembourg, des vêtements à l\'électronique.'
  },
  de: {
    home: 'Startseite',
    about: 'Über uns',
    book: 'Buch',
    targets: 'Zielgruppen',
    contact: 'Kontakt',
    orderBook: 'BESTELLEN',
    learnMore: 'Mehr erfahren',
    discover: 'Entdecken',
    crowdfunding: 'Am Crowdfunding teilnehmen',
    welcome: 'Willkommen bei Luxembourg Pas Cher',
    welcomeText: 'Entdecken Sie, wie Sie dieses wunderschöne Land genießen können, ohne Ihr Portemonnaie zu leeren. Unser Guide bietet Ihnen die besten Tipps und Angebote für ein erschwingliches Leben in Luxemburg.',
    ourBook: 'Unser Buch',
    bookDesc: 'Das Buch "Luxembourg Pas Cher" enthält über 500 Angebote und Tipps.',
    aboutUs: 'Über uns',
    aboutUsDesc: 'Wir sind ein engagiertes Team, das es sich zur Aufgabe gemacht hat, das Leben in Luxemburg für alle erschwinglich zu machen.',
    targetGroups: 'Zielgruppen',
    targetGroupsDesc: 'Unser Guide richtet sich an verschiedene Zielgruppen, die in Luxemburg leben oder arbeiten.',
    student: 'Student·in',
    studentDesc: 'Ob Luxemburger oder international, Studierende sind mit hohen Lebenshaltungskosten konfrontiert, besonders bei der Unterkunft.',
    entrepreneur: 'Selbständige·r',
    entrepreneurDesc: 'Mit begrenztem Budget jongliert er/sie zwischen selbstständiger Tätigkeit und persönlichen Ausgaben.',
    families: 'Familien',
    familiesDesc: 'Alleinerziehende oder prekäre Familien vereinen mentale Belastung und finanzielle Instabilität.',
    copyright: '© 2025 Luxembourg Pas Cher. Alle Rechte vorbehalten.',
    selectLanguage: 'Sprache auswählen',
    purchaseTitle: 'Buch bestellen',
    purchaseDesc: 'Füllen Sie das folgende Formular aus, um Ihr Exemplar des Buches Luxembourg Pas Cher zu bestellen.',
    name: 'Vollständiger Name',
    email: 'E-Mail-Adresse',
    shippingAddress: 'Lieferadresse',
    quantity: 'Anzahl',
    submit: 'Jetzt bestellen',
    close: 'Schließen',
    backToTop: 'Nach oben',
    crowdfundingTitle: 'Helfen Sie uns - CROWDFUNDING',
    crowdfundingDesc: 'Nehmen Sie an unserer Crowdfunding-Kampagne teil und unterstützen Sie die Entwicklung von Luxembourg Pas Cher.',
    crowdfundingStatus: 'Im Gange',
    crowdfundingEdition: 'Unsere neue Ausgabe 2025',
    crowdfundingEditionDesc: 'Wir bereiten eine erweiterte Ausgabe mit noch mehr Tipps, Tricks und Angeboten für ein günstiges Leben in Luxemburg vor. Ihre Unterstützung hilft uns bei der Finanzierung von Druck und Vertrieb dieses neuen Führers.',
    crowdfundingGoal: 'Ziel: 10.000€',
    crowdfundingProgress: '60% erreicht',
    crowdfundingCollected: '6.000€ gesammelt',
    crowdfundingContributors: '123 Unterstützer',
    mediaTitle: 'Man spricht über uns',
    mediaDesc: 'Entdecken Sie, was luxemburgische und internationale Medien über unseren Reiseführer sagen.',
    discoverTitle: 'Entdecken',
    discoverDesc: 'Erkunden Sie Luxemburg durch unsere thematischen Auswahlen und entdecken Sie die besten wirtschaftlichen Angebote.',
    allRightsReserved: 'Alle Rechte vorbehalten',
    terms: 'Nutzungsbedingungen',
    privacy: 'Datenschutzrichtlinie',
    cookies: 'Cookie-Verwaltung',
    contactUs: 'Kontaktieren Sie uns',
    newsletter: 'Newsletter',
    subscribeToNewsletter: 'Abonnieren Sie unseren Newsletter, um unsere neuesten Tipps und exklusiven Angebote zu erhalten.',
    yourEmailAddress: 'Ihre E-Mail-Adresse',
    subscribe: 'Abonnieren',
    statsSold: 'Verkaufte Exemplare',
    statsTips: 'Tipps und Angebote',
    gastronomy: 'Gastronomie',
    gastronomyDesc: 'Entdecken Sie unsere Auswahl an Restaurants mit einem ausgezeichneten Preis-Leistungs-Verhältnis in ganz Luxemburg.',
    leisure: 'Freizeit & Kultur',
    leisureDesc: 'Genießen Sie kulturelle, sportliche und Freizeitaktivitäten zu reduzierten Preisen dank unserer Tipps und Angebote.',
    shopping: 'Einkaufen',
    shoppingDesc: 'Unsere besten Adressen für cleveres und wirtschaftliches Einkaufen in Luxemburg, von Kleidung bis Elektronik.'
  },
  en: {
    home: 'Home',
    about: 'About',
    book: 'Book',
    targets: 'Target Groups',
    contact: 'Contact',
    orderBook: 'ORDER NOW',
    learnMore: 'Learn more',
    discover: 'Discover',
    crowdfunding: 'Join the crowdfunding',
    welcome: 'Welcome to Luxembourg Pas Cher',
    welcomeText: 'Discover how to enjoy this beautiful country without emptying your wallet. Our guide offers you the best tips and deals for affordable living in Luxembourg.',
    ourBook: 'Our Book',
    bookDesc: 'The "Luxembourg Pas Cher" book contains over 500 offers and tips.',
    aboutUs: 'About Us',
    aboutUsDesc: 'We are a dedicated team that has made it its mission to make life in Luxembourg affordable for everyone.',
    targetGroups: 'Target Groups',
    targetGroupsDesc: 'Our guide is aimed at different target groups who live or work in Luxembourg.',
    student: 'Student',
    studentDesc: 'Whether Luxembourgish or international, students face high living costs, especially for housing.',
    entrepreneur: 'Self-employed',
    entrepreneurDesc: 'With a limited budget, they juggle between self-employment and personal expenses.',
    families: 'Families',
    familiesDesc: 'Single-parent or precarious families combine mental burden and financial instability.',
    copyright: '© 2025 Luxembourg Pas Cher. All rights reserved.',
    selectLanguage: 'Select language',
    purchaseTitle: 'Order the book',
    purchaseDesc: 'Fill out the form below to order your copy of the Luxembourg Pas Cher book.',
    name: 'Full name',
    email: 'Email address',
    shippingAddress: 'Shipping address',
    quantity: 'Quantity',
    submit: 'Order now',
    close: 'Close',
    backToTop: 'Back to top',
    crowdfundingTitle: 'Help us - CROWDFUNDING',
    crowdfundingDesc: 'Join our crowdfunding campaign and support the development of Luxembourg Pas Cher.',
    crowdfundingStatus: 'In progress',
    crowdfundingEdition: 'Our new 2025 edition',
    crowdfundingEditionDesc: 'We are preparing an enhanced edition with even more tips, tricks, and deals for affordable living in Luxembourg. Your contribution will help us finance the printing and distribution of this new guide.',
    crowdfundingGoal: 'Goal: €10,000',
    crowdfundingProgress: '60% reached',
    crowdfundingCollected: '€6,000 collected',
    crowdfundingContributors: '123 contributors',
    mediaTitle: 'In the media',
    mediaDesc: 'Discover what Luxembourg and international media are saying about our guide.',
    discoverTitle: 'Discover',
    discoverDesc: 'Explore Luxembourg through our thematic selections and discover the best economic plans.',
    allRightsReserved: 'All rights reserved',
    terms: 'Terms of Use',
    privacy: 'Privacy Policy',
    cookies: 'Cookies Management',
    contactUs: 'Contact Us',
    newsletter: 'Newsletter',
    subscribeToNewsletter: 'Subscribe to our newsletter to receive our latest tips and exclusive offers.',
    yourEmailAddress: 'Your email address',
    subscribe: 'Subscribe',
    statsSold: 'Copies sold',
    statsTips: 'Tips and deals',
    gastronomy: 'Gastronomy',
    gastronomyDesc: 'Discover our selections of restaurants offering excellent value for money throughout Luxembourg.',
    leisure: 'Leisure & Culture',
    leisureDesc: 'Enjoy cultural, sports and leisure activities at reduced prices thanks to our tips and deals.',
    shopping: 'Shopping',
    shoppingDesc: 'Our best addresses for smart and economical shopping in Luxembourg, from clothing to electronics.'
  }
};

const OptimizedImage = ({ src, alt, style }: { src: string, alt: string, style?: React.CSSProperties }) => (
  <LazyLoadImage
    alt={alt}
    src={src}
    effect="blur"
    style={{ ...style, maxWidth: '100%', height: 'auto' }}
    wrapperClassName="optimized-image-wrapper"
  />
)

// Hook für Responsivität
function useMediaQuery(query: string) {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    const media = window.matchMedia(query);
    if (media.matches !== matches) {
      setMatches(media.matches);
    }
    
    const listener = () => {
      setMatches(media.matches);
    };
    
    media.addEventListener('change', listener);
    return () => media.removeEventListener('change', listener);
  }, [matches, query]);

  return matches;
}

export default function SimpleApp() {
  // Media queries
  const isMobile = useMediaQuery('(max-width: 768px)');
  
  // State variables
  const [language, setLanguage] = useState<'fr' | 'de' | 'en'>('de');
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [showPurchaseModal, setShowPurchaseModal] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);

  // Form state
  const [purchaseForm, setPurchaseForm] = useState({
    name: '',
    email: '',
    shippingAddress: '',
    quantity: 1
  });

  // Refs for sections
  const homeRef = useRef<HTMLDivElement>(null);
  const aboutRef = useRef<HTMLDivElement>(null);
  const bookRef = useRef<HTMLDivElement>(null);
  const targetsRef = useRef<HTMLDivElement>(null);
  
  // Get translations
  const t = translations[language];

  // Handle language change
  const handleLanguageChange = (lang: 'fr' | 'de' | 'en') => {
    setLanguage(lang);
    localStorage.setItem('preferredLanguage', lang);
    setShowMobileMenu(false);
  };

  // Handle order button click
  const handleOrderClick = () => {
    setShowPurchaseModal(true);
  };

  // Handle purchase form submit
  const handlePurchaseSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Purchase form submitted:', purchaseForm);
    // Here you would typically send the data to your backend
    alert(`Thank you for your order, ${purchaseForm.name}! We'll process it right away.`);
    setShowPurchaseModal(false);
  };

  // Handle form input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setPurchaseForm(prev => ({
      ...prev,
      [name]: name === 'quantity' ? Math.max(1, parseInt(value) || 1) : value
    }));
  };

  // Toggle mobile menu
  const toggleMobileMenu = () => {
    setShowMobileMenu(!showMobileMenu);
    // Prevent scrolling when mobile menu is open
    document.body.style.overflow = !showMobileMenu ? 'hidden' : 'auto';
  };

  // Scroll to section
  const scrollToSection = (sectionId: string) => {
    const sectionRefs: Record<string, React.RefObject<HTMLDivElement>> = {
      home: homeRef,
      about: aboutRef,
      book: bookRef,
      targets: targetsRef
    };
    
    const ref = sectionRefs[sectionId];
    if (ref && ref.current) {
      const yOffset = -70; // Header height offset
      const y = ref.current.getBoundingClientRect().top + window.pageYOffset + yOffset;
      
      window.scrollTo({
        top: y,
        behavior: 'smooth'
      });
    }
    
    // Update URL hash for direct linking
    window.history.pushState(null, '', `#${sectionId}`);
    setActiveSection(sectionId);
    setShowMobileMenu(false);
  };

  // Scroll to top
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  // Load saved language preference
  useEffect(() => {
    const savedLanguage = localStorage.getItem('preferredLanguage');
    if (savedLanguage && ['fr', 'de', 'en'].includes(savedLanguage)) {
      setLanguage(savedLanguage as 'fr' | 'de' | 'en');
    }
  }, []);

  // Setup scroll and URL hash handling
  useEffect(() => {
    const handleScroll = () => {
      // Sticky header
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
      
      // Show/hide scroll to top button
      if (window.scrollY > 300) {
        setShowScrollTop(true);
      } else {
        setShowScrollTop(false);
      }
      
      // Detect current section for active navigation
      const sectionRefs = [
        { id: 'home', ref: homeRef },
        { id: 'about', ref: aboutRef },
        { id: 'book', ref: bookRef },
        { id: 'targets', ref: targetsRef }
      ];
      
      // Find the section that is currently most visible
      for (const { id, ref } of sectionRefs) {
        if (ref.current) {
          const rect = ref.current.getBoundingClientRect();
          const windowHeight = window.innerHeight;
          
          // Check if section is visible in viewport
          if (
            rect.top < windowHeight / 2 && 
            rect.bottom > windowHeight / 2
          ) {
            setActiveSection(id);
            if (window.location.hash !== `#${id}`) {
              window.history.replaceState(null, '', `#${id}`);
            }
            break;
          }
        }
      }
    };
    
    // Check URL hash on load
    const handleHashChange = () => {
      const hash = window.location.hash.substring(1);
      if (hash && ['home', 'about', 'book', 'targets'].includes(hash)) {
        scrollToSection(hash);
      }
    };
    
    // Handle initial URL hash
    if (window.location.hash) {
      handleHashChange();
    }
    
    // Add event listeners
    window.addEventListener('scroll', handleScroll);
    window.addEventListener('hashchange', handleHashChange);
    
    // Cleanup
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('hashchange', handleHashChange);
    };
  }, []);

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Handle Escape key for modals
      if (e.key === 'Escape') {
        if (showPurchaseModal) setShowPurchaseModal(false);
        if (showMobileMenu) setShowMobileMenu(false);
      }
      
      // Add Tab key handling for accessibility
      if (e.key === 'Tab') {
        document.body.classList.add('user-is-tabbing');
      }
    };
    
    window.addEventListener('keydown', handleKeyDown);
    
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [showPurchaseModal, showMobileMenu]);

  // Add focus-visible polyfill
  useEffect(() => {
    const handleMouseDown = () => {
      document.body.classList.remove('user-is-tabbing');
    };
    
    window.addEventListener('mousedown', handleMouseDown);
    
    return () => {
      window.removeEventListener('mousedown', handleMouseDown);
    };
  }, []);

  return (
    <>
      {/* Global styles */}
      <style>
        {`
          * {
            box-sizing: border-box;
            margin: 0;
            padding: 0;
          }
          
          body {
            font-family: 'Arial', sans-serif;
            line-height: 1.6;
            color: #333;
            overflow-x: hidden;
          }
          
          a {
            color: inherit;
            text-decoration: none;
            transition: color 0.3s ease;
          }
          
          button {
            cursor: pointer;
            transition: all 0.3s ease;
          }
          
          .nav-link {
            position: relative;
          }
          
          .nav-link.active::after {
            content: '';
            position: absolute;
            bottom: -5px;
            left: 0;
            width: 100%;
            height: 2px;
            background-color: #fff;
            transform: scaleX(1);
          }
          
          .nav-link::after {
            content: '';
            position: absolute;
            bottom: -5px;
            left: 0;
            width: 100%;
            height: 2px;
            background-color: #fff;
            transform: scaleX(0);
            transition: transform 0.3s ease;
          }
          
          .nav-link:hover::after {
            transform: scaleX(1);
          }
          
          .user-is-tabbing *:focus {
            outline: 2px solid #38b6ff;
            outline-offset: 2px;
          }
          
          /* Animation keyframes */
          @keyframes fadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
          }
          
          @keyframes slideInRight {
            from { transform: translateX(100%); }
            to { transform: translateX(0); }
          }
          
          @keyframes slideInUp {
            from { transform: translateY(20px); opacity: 0; }
            to { transform: translateY(0); opacity: 1; }
          }
          
          /* Lazy load image styles */
          .optimized-image-wrapper {
            width: 100%;
            overflow: hidden;
            border-radius: 8px;
          }
          
          /* Mobile styles */
          @media (max-width: 768px) {
            .desktop-nav {
              display: none;
            }
            
            .mobile-menu-button {
              display: flex;
            }
          }
          
          @media (min-width: 769px) {
            .desktop-nav {
              display: flex;
            }
            
            .mobile-menu-button {
              display: none;
            }
          }
        `}
      </style>

      {/* Fixed header */}
      <header style={{ 
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        backgroundColor: scrolled ? '#38b6ff' : 'transparent',
        boxShadow: scrolled ? '0 2px 10px rgba(0,0,0,0.1)' : 'none',
        padding: scrolled ? '10px 0' : '20px 0',
        zIndex: 1000,
        transition: 'all 0.3s ease',
      }}>
        <div style={{
          maxWidth: '1200px',
          margin: '0 auto',
          padding: '0 20px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}>
          {/* Logo */}
          <a 
            href="#home" 
            onClick={(e) => { e.preventDefault(); scrollToSection('home'); }}
            style={{
              fontSize: '1.5rem',
              fontWeight: 'bold',
              color: 'white',
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
            }}
          >
            {/* You would typically have a logo image here */}
            <div style={{ padding: '5px 10px', backgroundColor: 'rgba(255,255,255,0.2)', borderRadius: '4px' }}>
              LPC
            </div>
            <span style={{ display: scrolled ? 'none' : 'block' }}>Luxembourg Pas Cher</span>
          </a>

          {/* Desktop Navigation */}
          <nav className="desktop-nav" style={{
            display: 'flex',
            gap: '20px',
          }}>
            <a 
              href="#home" 
              onClick={(e) => { e.preventDefault(); scrollToSection('home'); }}
              className={`nav-link ${activeSection === 'home' ? 'active' : ''}`}
              style={{ color: 'white', padding: '5px 0' }}
            >
              {t.home}
            </a>
            <a 
              href="#about" 
              onClick={(e) => { e.preventDefault(); scrollToSection('about'); }}
              className={`nav-link ${activeSection === 'about' ? 'active' : ''}`}
              style={{ color: 'white', padding: '5px 0' }}
            >
              {t.about}
            </a>
            <a 
              href="#book" 
              onClick={(e) => { e.preventDefault(); scrollToSection('book'); }}
              className={`nav-link ${activeSection === 'book' ? 'active' : ''}`}
              style={{ color: 'white', padding: '5px 0' }}
            >
              {t.book}
            </a>
            <a 
              href="#targets" 
              onClick={(e) => { e.preventDefault(); scrollToSection('targets'); }}
              className={`nav-link ${activeSection === 'targets' ? 'active' : ''}`}
              style={{ color: 'white', padding: '5px 0' }}
            >
              {t.targets}
            </a>

            {/* Language Selector */}
            <div style={{ position: 'relative', marginLeft: '10px' }}>
              <button 
                style={{
                  backgroundColor: 'transparent',
                  border: '1px solid white',
                  borderRadius: '4px',
                  color: 'white',
                  padding: '5px 10px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '5px',
                }}
                aria-label={t.selectLanguage}
              >
                {language.toUpperCase()}
                <span style={{ fontSize: '0.8em', marginTop: '2px' }}>▼</span>
              </button>
              <div style={{
                position: 'absolute',
                top: '100%',
                right: 0,
                backgroundColor: 'white',
                boxShadow: '0 5px 15px rgba(0,0,0,0.1)',
                borderRadius: '4px',
                marginTop: '5px',
                display: 'flex',
                flexDirection: 'column',
                overflow: 'hidden',
                width: '120px',
                zIndex: 1001,
              }}>
                <button
                  onClick={() => handleLanguageChange('fr')}
                  style={{
                    backgroundColor: language === 'fr' ? '#f0f0f0' : 'transparent',
                    border: 'none',
                    padding: '10px 15px',
                    textAlign: 'left',
                    borderBottom: '1px solid #eee',
                  }}
                >
                  Français
                </button>
                <button
                  onClick={() => handleLanguageChange('de')}
                  style={{
                    backgroundColor: language === 'de' ? '#f0f0f0' : 'transparent',
                    border: 'none',
                    padding: '10px 15px',
                    textAlign: 'left',
                    borderBottom: '1px solid #eee',
                  }}
                >
                  Deutsch
                </button>
                <button
                  onClick={() => handleLanguageChange('en')}
                  style={{
                    backgroundColor: language === 'en' ? '#f0f0f0' : 'transparent',
                    border: 'none',
                    padding: '10px 15px',
                    textAlign: 'left',
                  }}
                >
                  English
                </button>
              </div>
            </div>
          </nav>

          {/* Mobile Menu Button */}
          <button
            className="mobile-menu-button"
            onClick={toggleMobileMenu}
            style={{
              backgroundColor: 'transparent',
              border: 'none',
              color: 'white',
              fontSize: '1.5rem',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: '44px',
              height: '44px',
              borderRadius: '4px',
            }}
            aria-label={showMobileMenu ? t.close : 'Menu'}
          >
            {showMobileMenu ? '✕' : '☰'}
          </button>
        </div>
      </header>

      {/* Mobile Navigation Menu */}
      {showMobileMenu && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(0,0,0,0.5)',
          zIndex: 999,
          animation: 'fadeIn 0.3s ease',
        }}>
          <div style={{
            position: 'fixed',
            top: 0,
            right: 0,
            width: '80%',
            maxWidth: '300px',
            height: '100%',
            backgroundColor: '#38b6ff',
            padding: '20px',
            display: 'flex',
            flexDirection: 'column',
            animation: 'slideInRight 0.3s ease',
          }}>
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: '20px'
            }}>
              <div style={{ color: 'white', fontWeight: 'bold' }}>Luxembourg Pas Cher</div>
              <button
                onClick={toggleMobileMenu}
                style={{
                  backgroundColor: 'transparent',
                  border: 'none',
                  color: 'white',
                  fontSize: '1.5rem',
                  padding: '5px',
                }}
                aria-label={t.close}
              >
                ✕
              </button>
            </div>
            
            <nav style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '15px'
            }}>
              <a 
                href="#home" 
                onClick={(e) => { e.preventDefault(); scrollToSection('home'); }}
                style={{ 
                  color: 'white',
                  padding: '10px',
                  borderRadius: '4px',
                  backgroundColor: activeSection === 'home' ? 'rgba(255,255,255,0.2)' : 'transparent',
                  transition: 'background-color 0.3s ease'
                }}
              >
                {t.home}
              </a>
              <a 
                href="#about" 
                onClick={(e) => { e.preventDefault(); scrollToSection('about'); }}
                style={{ 
                  color: 'white',
                  padding: '10px',
                  borderRadius: '4px',
                  backgroundColor: activeSection === 'about' ? 'rgba(255,255,255,0.2)' : 'transparent',
                  transition: 'background-color 0.3s ease'
                }}
              >
                {t.about}
              </a>
              <a 
                href="#book" 
                onClick={(e) => { e.preventDefault(); scrollToSection('book'); }}
                style={{ 
                  color: 'white',
                  padding: '10px',
                  borderRadius: '4px',
                  backgroundColor: activeSection === 'book' ? 'rgba(255,255,255,0.2)' : 'transparent',
                  transition: 'background-color 0.3s ease'
                }}
              >
                {t.book}
              </a>
              <a 
                href="#targets" 
                onClick={(e) => { e.preventDefault(); scrollToSection('targets'); }}
                style={{ 
                  color: 'white',
                  padding: '10px',
                  borderRadius: '4px',
                  backgroundColor: activeSection === 'targets' ? 'rgba(255,255,255,0.2)' : 'transparent',
                  transition: 'background-color 0.3s ease'
                }}
              >
                {t.targets}
              </a>
            </nav>
            
            <div style={{ marginTop: '30px' }}>
              <div style={{ color: 'white', marginBottom: '10px' }}>{t.selectLanguage}</div>
              <div style={{
                display: 'flex',
                gap: '10px'
              }}>
                <button
                  onClick={() => handleLanguageChange('fr')}
                  style={{
                    backgroundColor: language === 'fr' ? 'white' : 'rgba(255,255,255,0.2)',
                    color: language === 'fr' ? '#38b6ff' : 'white',
                    border: 'none',
                    padding: '10px',
                    borderRadius: '4px',
                    fontWeight: language === 'fr' ? 'bold' : 'normal',
                    flex: 1
                  }}
                >
                  FR
                </button>
                <button
                  onClick={() => handleLanguageChange('de')}
                  style={{
                    backgroundColor: language === 'de' ? 'white' : 'rgba(255,255,255,0.2)',
                    color: language === 'de' ? '#38b6ff' : 'white',
                    border: 'none',
                    padding: '10px',
                    borderRadius: '4px',
                    fontWeight: language === 'de' ? 'bold' : 'normal',
                    flex: 1
                  }}
                >
                  DE
                </button>
                <button
                  onClick={() => handleLanguageChange('en')}
                  style={{
                    backgroundColor: language === 'en' ? 'white' : 'rgba(255,255,255,0.2)',
                    color: language === 'en' ? '#38b6ff' : 'white',
                    border: 'none',
                    padding: '10px',
                    borderRadius: '4px',
                    fontWeight: language === 'en' ? 'bold' : 'normal',
                    flex: 1
                  }}
                >
                  EN
                </button>
              </div>
            </div>
            
            <div style={{
              marginTop: 'auto',
              display: 'flex',
              justifyContent: 'center',
              gap: '15px',
              padding: '20px 0'
            }}>
              <a 
                href="https://www.facebook.com/luxembourgpaschere/" 
                target="_blank" 
                rel="noopener noreferrer"
                style={{
                  color: 'white',
                  backgroundColor: 'rgba(255,255,255,0.2)',
                  width: '44px',
                  height: '44px',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  transition: 'transform 0.3s ease, background-color 0.3s ease'
                }}
                aria-label="Facebook"
              >
                f
              </a>
              <a 
                href="https://www.instagram.com/luxembourgpaschere/" 
                target="_blank" 
                rel="noopener noreferrer"
                style={{
                  color: 'white',
                  backgroundColor: 'rgba(255,255,255,0.2)',
                  width: '44px',
                  height: '44px',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  transition: 'transform 0.3s ease, background-color 0.3s ease'
                }}
                aria-label="Instagram"
              >
                IG
              </a>
              <a 
                href="https://www.linkedin.com/company/luxembourgpaschere/" 
                target="_blank" 
                rel="noopener noreferrer"
                style={{
                  color: 'white',
                  backgroundColor: 'rgba(255,255,255,0.2)',
                  width: '44px',
                  height: '44px',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  transition: 'transform 0.3s ease, background-color 0.3s ease'
                }}
                aria-label="LinkedIn"
              >
                in
              </a>
            </div>
          </div>
        </div>
      )}

      {/* Purchase Modal */}
      {showPurchaseModal && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(0,0,0,0.5)',
          zIndex: 1001,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '20px',
          animation: 'fadeIn 0.3s ease',
        }}>
          <div style={{
            backgroundColor: 'white',
            borderRadius: '8px',
            padding: '30px',
            maxWidth: '500px',
            width: '100%',
            position: 'relative',
            animation: 'slideInUp 0.3s ease',
          }}>
            <button
              onClick={() => setShowPurchaseModal(false)}
              style={{
                position: 'absolute',
                top: '15px',
                right: '15px',
                backgroundColor: 'transparent',
                border: 'none',
                fontSize: '1.5rem',
                lineHeight: 1,
                padding: '5px',
                cursor: 'pointer',
              }}
              aria-label={t.close}
            >
              ✕
            </button>
            
            <h2 style={{ marginBottom: '20px', color: '#38b6ff' }}>{t.purchaseTitle}</h2>
            <p style={{ marginBottom: '20px' }}>{t.purchaseDesc}</p>
            
            <form onSubmit={handlePurchaseSubmit}>
              <div style={{ marginBottom: '15px' }}>
                <label
                  htmlFor="name"
                  style={{
                    display: 'block',
                    marginBottom: '5px',
                    fontWeight: 'bold',
                  }}
                >
                  {t.name}
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={purchaseForm.name}
                  onChange={handleInputChange}
                  required
                  style={{
                    width: '100%',
                    padding: '10px',
                    borderRadius: '4px',
                    border: '1px solid #ddd',
                  }}
                />
              </div>
              
              <div style={{ marginBottom: '15px' }}>
                <label
                  htmlFor="email"
                  style={{
                    display: 'block',
                    marginBottom: '5px',
                    fontWeight: 'bold',
                  }}
                >
                  {t.email}
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={purchaseForm.email}
                  onChange={handleInputChange}
                  required
                  style={{
                    width: '100%',
                    padding: '10px',
                    borderRadius: '4px',
                    border: '1px solid #ddd',
                  }}
                />
              </div>
              
              <div style={{ marginBottom: '15px' }}>
                <label
                  htmlFor="shippingAddress"
                  style={{
                    display: 'block',
                    marginBottom: '5px',
                    fontWeight: 'bold',
                  }}
                >
                  {t.shippingAddress}
                </label>
                <input
                  type="text"
                  id="shippingAddress"
                  name="shippingAddress"
                  value={purchaseForm.shippingAddress}
                  onChange={handleInputChange}
                  required
                  style={{
                    width: '100%',
                    padding: '10px',
                    borderRadius: '4px',
                    border: '1px solid #ddd',
                  }}
                />
              </div>
              
              <div style={{ marginBottom: '15px' }}>
                <label
                  htmlFor="quantity"
                  style={{
                    display: 'block',
                    marginBottom: '5px',
                    fontWeight: 'bold',
                  }}
                >
                  {t.quantity}
                </label>
                <input
                  type="number"
                  id="quantity"
                  name="quantity"
                  value={purchaseForm.quantity}
                  onChange={handleInputChange}
                  min="1"
                  required
                  style={{
                    width: '100%',
                    padding: '10px',
                    borderRadius: '4px',
                    border: '1px solid #ddd',
                  }}
                />
              </div>
              
              <button
                type="submit"
                style={{
                  backgroundColor: '#e81414',
                  color: 'white',
                  border: 'none',
                  padding: '12px 20px',
                  borderRadius: '4px',
                  fontWeight: 'bold',
                  cursor: 'pointer',
                  width: '100%',
                  marginTop: '10px',
                  transition: 'background-color 0.3s ease, transform 0.3s ease',
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.backgroundColor = '#c51212';
                  e.currentTarget.style.transform = 'translateY(-2px)';
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.backgroundColor = '#e81414';
                  e.currentTarget.style.transform = 'translateY(0)';
                }}
              >
                {t.submit}
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Main content */}
      <div style={{ 
        paddingTop: '70px', // For the fixed header
        fontFamily: 'Arial, sans-serif', 
        maxWidth: '1200px', 
        margin: '0 auto',
        padding: '70px 20px 20px',
      }}>
        {/* Hero Section */}
        <div 
          ref={homeRef}
          id="home" 
          style={{ 
            minHeight: '90vh',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            padding: '40px 0',
          }}
        >
          <div style={{
            backgroundColor: 'rgba(56, 182, 255, 0.05)',
            borderRadius: '16px',
            padding: '40px',
            marginBottom: '40px',
            display: 'flex',
            flexDirection: isMobile ? 'column' : 'row',
            alignItems: 'center',
            gap: '40px',
          }}>
            <div style={{ flex: '1 1 60%' }}>
              <h1 style={{ 
                fontSize: 'clamp(2rem, 5vw, 3rem)',
                marginBottom: '20px',
                color: '#38b6ff',
                lineHeight: 1.2,
              }}>
                Luxembourg Pas Cher
              </h1>
              <p style={{ 
                fontSize: 'clamp(1rem, 3vw, 1.25rem)',
                marginBottom: '30px',
                color: '#555',
                lineHeight: 1.6,
              }}>
                {t.welcomeText}
              </p>
              <div style={{ 
                display: 'flex',
                gap: '15px',
                flexWrap: 'wrap',
              }}>
                <button
                  onClick={() => scrollToSection('book')}
                  style={{
                    backgroundColor: '#38b6ff',
                    color: 'white',
                    border: 'none',
                    padding: '12px 24px',
                    borderRadius: '30px',
                    fontWeight: 'bold',
                    fontSize: '1rem',
                    cursor: 'pointer',
                    boxShadow: '0 4px 6px rgba(56, 182, 255, 0.2)',
                    transition: 'all 0.3s ease',
                    minWidth: '150px',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}
                  onMouseOver={(e) => {
                    e.currentTarget.style.backgroundColor = '#2298da';
                    e.currentTarget.style.transform = 'translateY(-2px)';
                  }}
                  onMouseOut={(e) => {
                    e.currentTarget.style.backgroundColor = '#38b6ff';
                    e.currentTarget.style.transform = 'translateY(0)';
                  }}
                >
                  {t.discover}
                </button>
                <button
                  onClick={handleOrderClick}
                  style={{
                    backgroundColor: '#e81414',
                    color: 'white',
                    border: 'none',
                    padding: '12px 24px',
                    borderRadius: '30px',
                    fontWeight: 'bold',
                    fontSize: '1rem',
                    cursor: 'pointer',
                    boxShadow: '0 4px 6px rgba(232, 20, 20, 0.2)',
                    transition: 'all 0.3s ease',
                    minWidth: '150px',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}
                  onMouseOver={(e) => {
                    e.currentTarget.style.backgroundColor = '#c51212';
                    e.currentTarget.style.transform = 'translateY(-2px)';
                  }}
                  onMouseOut={(e) => {
                    e.currentTarget.style.backgroundColor = '#e81414';
                    e.currentTarget.style.transform = 'translateY(0)';
                  }}
                >
                  {t.orderBook}
                </button>
              </div>
            </div>
            <div style={{ flex: '1 1 40%' }}>
              {/* This would normally be an image of the book */}
              <div style={{
                backgroundColor: 'white',
                borderRadius: '8px',
                boxShadow: '0 10px 30px rgba(0, 0, 0, 0.1)',
                padding: '20px',
                height: '300px', 
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                position: 'relative',
                perspective: '1000px',
                transform: 'rotate(3deg)',
              }}>
                <div style={{
                  backgroundColor: '#38b6ff',
                  color: 'white',
                  padding: '40px',
                  borderRadius: '8px',
                  textAlign: 'center',
                  transform: 'rotateY(10deg)',
                  boxShadow: '5px 5px 15px rgba(0, 0, 0, 0.1)',
                  width: '80%',
                  height: '80%',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                }}>
                  <h3 style={{ marginBottom: '10px' }}>LUXEMBOURG PAS CHER</h3>
                  <p>Edition 2023</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* About Section */}
        <section 
          ref={aboutRef}
          id="about" 
          style={{ 
            padding: '60px 0',
          }}
        >
          <h2 style={{ 
            fontSize: '2rem',
            marginBottom: '30px',
            color: '#38b6ff',
            textAlign: 'center',
          }}>
            {t.aboutUs}
          </h2>
          
          <div style={{
            backgroundColor: 'white',
            borderRadius: '12px',
            boxShadow: '0 5px 15px rgba(0, 0, 0, 0.05)',
            overflow: 'hidden',
            display: 'flex',
            flexDirection: isMobile ? 'column' : 'row',
          }}>
            <div style={{
              flex: '1 1 50%',
              padding: '40px',
            }}>
              <h3 style={{ 
                fontSize: '1.5rem',
                marginBottom: '20px',
                color: '#333',
              }}>
                {t.aboutUs}
              </h3>
              <p style={{ 
                lineHeight: 1.7,
                color: '#555',
                marginBottom: '20px',
              }}>
                {t.aboutUsDesc}
              </p>
              <button
                onClick={() => scrollToSection('book')}
                style={{
                  backgroundColor: '#38b6ff',
                  color: 'white',
                  border: 'none',
                  padding: '10px 20px',
                  borderRadius: '4px',
                  fontWeight: 'bold',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.backgroundColor = '#2298da';
                  e.currentTarget.style.transform = 'translateY(-2px)';
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.backgroundColor = '#38b6ff';
                  e.currentTarget.style.transform = 'translateY(0)';
                }}
              >
                {t.learnMore}
              </button>
            </div>
            
            <div style={{
              flex: '1 1 50%',
              backgroundColor: '#f5f5f5',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '40px',
              minHeight: '300px',
            }}>
              {/* This would normally contain an image */}
              <div style={{
                backgroundColor: 'rgba(56, 182, 255, 0.1)',
                borderRadius: '8px',
                padding: '30px',
                textAlign: 'center',
                width: '100%',
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
              }}>
                <div style={{
                  fontSize: '3rem',
                  fontWeight: 'bold',
                  color: '#38b6ff',
                  marginBottom: '10px',
                }}>
                  1500+
                </div>
                <p style={{ color: '#666' }}>{t.statsSold}</p>
              </div>
            </div>
          </div>
        </section>
        
        {/* Book Section */}
        <section 
          ref={bookRef}
          id="book" 
          style={{ 
            padding: '60px 0',
          }}
        >
          <h2 style={{ 
            fontSize: '2rem',
            marginBottom: '30px',
            color: '#38b6ff',
            textAlign: 'center',
          }}>
            {t.ourBook}
          </h2>
          
          <div style={{
            backgroundColor: 'white',
            borderRadius: '12px',
            boxShadow: '0 5px 15px rgba(0, 0, 0, 0.05)',
            padding: '40px',
            display: 'flex',
            flexDirection: isMobile ? 'column' : 'row',
            gap: '40px',
            alignItems: 'center',
          }}>
            <div style={{
              flex: '1 1 40%',
              display: 'flex',
              justifyContent: 'center',
            }}>
              {/* Book Cover - This would normally be an image */}
              <div style={{
                backgroundColor: '#e81414',
                borderRadius: '8px',
                width: '220px',
                height: '320px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'white',
                fontWeight: 'bold',
                boxShadow: '0 10px 30px rgba(0, 0, 0, 0.15)',
                overflow: 'hidden',
                position: 'relative',
              }}>
                <div style={{
                  transform: 'rotate(-90deg)',
                  position: 'absolute',
                  right: '-40px',
                  top: '50%',
                  backgroundColor: 'white',
                  color: '#e81414',
                  padding: '5px 40px',
                  fontSize: '0.9rem',
                }}>
                  EDITION 2023
                </div>
                <div style={{ textAlign: 'center', padding: '20px' }}>
                  <div style={{ marginBottom: '10px' }}>LUXEMBOURG</div>
                  <div style={{ fontSize: '1.5rem', marginBottom: '10px' }}>PAS CHER</div>
                  <div style={{ fontSize: '0.9rem' }}>500+ TIPS & DEALS</div>
                </div>
              </div>
            </div>
            
            <div style={{
              flex: '1 1 60%',
            }}>
              <h3 style={{ 
                fontSize: '1.5rem',
                marginBottom: '20px',
                color: '#333',
              }}>
                {t.ourBook}
              </h3>
              <p style={{ 
                lineHeight: 1.7,
                color: '#555',
                marginBottom: '20px',
              }}>
                {t.bookDesc}
              </p>
              <div style={{
                display: 'flex',
                gap: '15px',
                marginTop: '30px',
              }}>
                <button
                  onClick={handleOrderClick}
                  style={{
                    backgroundColor: '#e81414',
                    color: 'white',
                    border: 'none',
                    padding: '12px 24px',
                    borderRadius: '4px',
                    fontWeight: 'bold',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease',
                    minWidth: '150px',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}
                  onMouseOver={(e) => {
                    e.currentTarget.style.backgroundColor = '#c51212';
                    e.currentTarget.style.transform = 'translateY(-2px)';
                  }}
                  onMouseOut={(e) => {
                    e.currentTarget.style.backgroundColor = '#e81414';
                    e.currentTarget.style.transform = 'translateY(0)';
                  }}
                >
                  {t.orderBook}
                </button>
                <button
                  onClick={() => {
                    window.open('https://www.example.com/crowdfunding', '_blank');
                  }}
                  style={{
                    backgroundColor: 'transparent',
                    color: '#38b6ff',
                    border: '1px solid #38b6ff',
                    padding: '12px 24px',
                    borderRadius: '4px',
                    fontWeight: 'bold',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease',
                  }}
                  onMouseOver={(e) => {
                    e.currentTarget.style.backgroundColor = 'rgba(56, 182, 255, 0.1)';
                    e.currentTarget.style.transform = 'translateY(-2px)';
                  }}
                  onMouseOut={(e) => {
                    e.currentTarget.style.backgroundColor = 'transparent';
                    e.currentTarget.style.transform = 'translateY(0)';
                  }}
                >
                  {t.crowdfunding}
                </button>
              </div>
            </div>
          </div>
        </section>
        
        {/* Target Groups Section */}
        <section 
          ref={targetsRef}
          id="targets" 
          style={{ 
            padding: '60px 0',
          }}
        >
          <h2 style={{ 
            fontSize: '2rem',
            marginBottom: '10px',
            color: '#38b6ff',
            textAlign: 'center',
          }}>
            {t.targetGroups}
          </h2>
          
          <p style={{ 
            textAlign: 'center',
            marginBottom: '30px',
            maxWidth: '700px',
            margin: '0 auto 30px',
            color: '#666',
            lineHeight: 1.6,
          }}>
            {t.targetGroupsDesc}
          </p>
          
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', 
            gap: '20px',
            marginTop: '30px',
          }}>
            {/* Student */}
            <div style={{
              backgroundColor: 'white',
              borderRadius: '12px',
              overflow: 'hidden',
              boxShadow: '0 5px 15px rgba(0, 0, 0, 0.05)',
              transition: 'transform 0.3s ease, box-shadow 0.3s ease',
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.transform = 'translateY(-5px)';
              e.currentTarget.style.boxShadow = '0 15px 30px rgba(0, 0, 0, 0.1)';
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = '0 5px 15px rgba(0, 0, 0, 0.05)';
            }}>
              <div style={{
                height: '8px',
                backgroundColor: '#38b6ff',
              }}></div>
              <div style={{ padding: '25px' }}>
                <h3 style={{ 
                  fontSize: '1.3rem',
                  marginBottom: '15px',
                  color: '#38b6ff',
                }}>
                  {t.student}
                </h3>
                <p style={{ 
                  lineHeight: 1.7,
                  color: '#555',
                }}>
                  {t.studentDesc}
                </p>
              </div>
            </div>
            
            {/* Entrepreneur */}
            <div style={{
              backgroundColor: 'white',
              borderRadius: '12px',
              overflow: 'hidden',
              boxShadow: '0 5px 15px rgba(0, 0, 0, 0.05)',
              transition: 'transform 0.3s ease, box-shadow 0.3s ease',
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.transform = 'translateY(-5px)';
              e.currentTarget.style.boxShadow = '0 15px 30px rgba(0, 0, 0, 0.1)';
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = '0 5px 15px rgba(0, 0, 0, 0.05)';
            }}>
              <div style={{
                height: '8px',
                backgroundColor: '#e81414',
              }}></div>
              <div style={{ padding: '25px' }}>
                <h3 style={{ 
                  fontSize: '1.3rem',
                  marginBottom: '15px',
                  color: '#e81414',
                }}>
                  {t.entrepreneur}
                </h3>
                <p style={{ 
                  lineHeight: 1.7,
                  color: '#555',
                }}>
                  {t.entrepreneurDesc}
                </p>
              </div>
            </div>
            
            {/* Families */}
            <div style={{
              backgroundColor: 'white',
              borderRadius: '12px',
              overflow: 'hidden',
              boxShadow: '0 5px 15px rgba(0, 0, 0, 0.05)',
              transition: 'transform 0.3s ease, box-shadow 0.3s ease',
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.transform = 'translateY(-5px)';
              e.currentTarget.style.boxShadow = '0 15px 30px rgba(0, 0, 0, 0.1)';
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = '0 5px 15px rgba(0, 0, 0, 0.05)';
            }}>
              <div style={{
                height: '8px',
                backgroundColor: '#38b6ff',
              }}></div>
              <div style={{ padding: '25px' }}>
                <h3 style={{ 
                  fontSize: '1.3rem',
                  marginBottom: '15px',
                  color: '#38b6ff',
                }}>
                  {t.families}
                </h3>
                <p style={{ 
                  lineHeight: 1.7,
                  color: '#555',
                }}>
                  {t.familiesDesc}
                </p>
              </div>
            </div>
          </div>
        </section>
        
        {/* Footer */}
        <footer style={{ 
          backgroundColor: '#1f2937', 
          color: 'white', 
          padding: '40px 20px', 
          borderRadius: '12px', 
          marginTop: '60px',
        }}>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
            gap: '30px',
            marginBottom: '30px',
          }}>
            <div>
              <h3 style={{ 
                fontSize: '1.3rem',
                marginBottom: '20px',
                color: 'white',
              }}>
                Luxembourg Pas Cher
              </h3>
              <p style={{ color: '#aaa', lineHeight: 1.6 }}>
                {t.welcomeText}
              </p>
            </div>
            
            <div>
              <h3 style={{ 
                fontSize: '1.3rem',
                marginBottom: '20px',
                color: 'white',
              }}>
                {t.contactUs}
              </h3>
              <div style={{ color: '#aaa', marginBottom: '10px' }}>
                <div style={{ fontWeight: 'bold', marginBottom: '5px' }}>{t.address}</div>
                <div>1 Rue de Luxembourg, L-1234 Luxembourg</div>
              </div>
              <div style={{ color: '#aaa', marginBottom: '10px' }}>
                <div style={{ fontWeight: 'bold', marginBottom: '5px' }}>{t.email}</div>
                <div>info@luxembourgpaschere.lu</div>
              </div>
            </div>
            
            <div>
              <h3 style={{ 
                fontSize: '1.3rem',
                marginBottom: '20px',
                color: 'white',
              }}>
                {t.newsletter}
              </h3>
              <p style={{ color: '#aaa', marginBottom: '15px', lineHeight: 1.6 }}>
                {t.subscribeToNewsletter}
              </p>
              <form onSubmit={(e) => e.preventDefault()} style={{ display: 'flex' }}>
                <input
                  type="email"
                  placeholder={t.yourEmailAddress}
                  style={{
                    flex: 1,
                    padding: '10px',
                    borderRadius: '4px 0 0 4px',
                    border: 'none',
                  }}
                />
                <button
                  type="submit"
                  style={{
                    backgroundColor: '#e81414',
                    color: 'white',
                    border: 'none',
                    padding: '10px 15px',
                    borderRadius: '0 4px 4px 0',
                    cursor: 'pointer',
                  }}
                >
                  {t.subscribe}
                </button>
              </form>
            </div>
          </div>
          
          <div style={{
            borderTop: '1px solid rgba(255, 255, 255, 0.1)',
            paddingTop: '20px',
            display: 'flex',
            flexDirection: isMobile ? 'column' : 'row',
            justifyContent: 'space-between',
            alignItems: isMobile ? 'center' : 'flex-start',
            gap: '20px',
          }}>
            <div style={{ color: '#aaa' }}>
              {t.copyright} {new Date().getFullYear()} - {t.allRightsReserved}
            </div>
            
            <div style={{
              display: 'flex',
              gap: '20px',
              color: '#aaa',
            }}>
              <a 
                href="#"
                style={{
                  color: '#aaa',
                  transition: 'color 0.3s ease',
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.color = 'white';
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.color = '#aaa';
                }}
              >
                {t.terms}
              </a>
              <a 
                href="#"
                style={{
                  color: '#aaa',
                  transition: 'color 0.3s ease',
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.color = 'white';
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.color = '#aaa';
                }}
              >
                {t.privacy}
              </a>
              <a 
                href="#"
                style={{
                  color: '#aaa',
                  transition: 'color 0.3s ease',
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.color = 'white';
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.color = '#aaa';
                }}
              >
                {t.cookies}
              </a>
            </div>
            
            <div style={{
              display: 'flex',
              gap: '15px',
            }}>
              <a 
                href="https://www.facebook.com/luxembourgpaschere/" 
                target="_blank" 
                rel="noopener noreferrer"
                style={{
                  backgroundColor: 'rgba(255, 255, 255, 0.1)',
                  color: 'white',
                  width: '40px',
                  height: '40px',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  transition: 'all 0.3s ease',
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.backgroundColor = '#1877f2';
                  e.currentTarget.style.transform = 'translateY(-3px)';
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.1)';
                  e.currentTarget.style.transform = 'translateY(0)';
                }}
                aria-label="Facebook"
              >
                f
              </a>
              <a 
                href="https://www.instagram.com/luxembourgpaschere/" 
                target="_blank" 
                rel="noopener noreferrer"
                style={{
                  backgroundColor: 'rgba(255, 255, 255, 0.1)',
                  color: 'white',
                  width: '40px',
                  height: '40px',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  transition: 'all 0.3s ease',
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.backgroundColor = '#e1306c';
                  e.currentTarget.style.transform = 'translateY(-3px)';
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.1)';
                  e.currentTarget.style.transform = 'translateY(0)';
                }}
                aria-label="Instagram"
              >
                IG
              </a>
              <a 
                href="https://www.linkedin.com/company/luxembourgpaschere/" 
                target="_blank" 
                rel="noopener noreferrer"
                style={{
                  backgroundColor: 'rgba(255, 255, 255, 0.1)',
                  color: 'white',
                  width: '40px',
                  height: '40px',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  transition: 'all 0.3s ease',
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.backgroundColor = '#0077b5';
                  e.currentTarget.style.transform = 'translateY(-3px)';
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.1)';
                  e.currentTarget.style.transform = 'translateY(0)';
                }}
                aria-label="LinkedIn"
              >
                in
              </a>
            </div>
          </div>
        </footer>
      </div>
      
      {/* Back to top button */}
      {showScrollTop && (
        <button
          onClick={scrollToTop}
          style={{
            position: 'fixed',
            bottom: '30px',
            right: '30px',
            backgroundColor: '#38b6ff',
            color: 'white',
            width: '50px',
            height: '50px',
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            border: 'none',
            boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
            cursor: 'pointer',
            transition: 'all 0.3s ease',
            zIndex: 99,
            opacity: 0.9,
          }}
          onMouseOver={(e) => {
            e.currentTarget.style.backgroundColor = '#2298da';
            e.currentTarget.style.transform = 'translateY(-3px)';
            e.currentTarget.style.opacity = '1';
          }}
          onMouseOut={(e) => {
            e.currentTarget.style.backgroundColor = '#38b6ff';
            e.currentTarget.style.transform = 'translateY(0)';
            e.currentTarget.style.opacity = '0.9';
          }}
          aria-label={t.backToTop}
        >
          ↑
        </button>
      )}
    </>
  );
}