import React, { useState, useEffect, useRef } from 'react';
import { translations } from './i18n/translations';

// Optimized image component
const OptimizedImage = ({ src, alt, className, style }: { src: string, alt: string, className?: string, style?: React.CSSProperties }) => (
  <img
    src={src}
    alt={alt}
    loading="lazy"
    className={className}
    style={style}
  />
);

export default function MinimalApp() {
  // State variables
  const [language, setLanguage] = useState<'fr' | 'de' | 'en'>('de');
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);
  
  // Media queries
  const [isMobile, setIsMobile] = useState(false);
  
  // Check for mobile on mount and when window resizes
  useEffect(() => {
    const checkForMobile = () => {
      setIsMobile(window.matchMedia('(max-width: 768px)').matches);
    };
    
    // Initial check
    checkForMobile();
    
    // Add event listener
    window.addEventListener('resize', checkForMobile);
    
    // Cleanup
    return () => {
      window.removeEventListener('resize', checkForMobile);
    };
  }, []);

  // Get translations
  const t = translations[language];
  
  // Handle language change
  const handleLanguageChange = (lang: 'fr' | 'de' | 'en') => {
    setLanguage(lang);
    localStorage.setItem('preferredLanguage', lang);
    setShowMobileMenu(false);
  };

  // Toggle mobile menu
  const toggleMobileMenu = () => {
    setShowMobileMenu(!showMobileMenu);
    // Prevent scrolling when mobile menu is open
    document.body.style.overflow = !showMobileMenu ? 'hidden' : 'auto';
  };

  // Scroll to top
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  // Setup scroll handling
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
    };
    
    // Add event listener
    window.addEventListener('scroll', handleScroll);
    
    // Cleanup
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // Load saved language preference
  useEffect(() => {
    const savedLanguage = localStorage.getItem('preferredLanguage');
    if (savedLanguage && ['fr', 'de', 'en'].includes(savedLanguage)) {
      setLanguage(savedLanguage as 'fr' | 'de' | 'en');
    }
  }, []);

  // Handle keyboard navigation
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (showMobileMenu) {
        const target = event.target as Node;
        if (!target.closest('.mobile-menu') && !target.closest('.mobile-menu-button')) {
          setShowMobileMenu(false);
        }
      }
    };
    
    document.addEventListener('mousedown', handleClickOutside);
    
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showMobileMenu]);

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
            background-color: #f5f5f5;
          }
          
          a {
            color: inherit;
            text-decoration: none;
          }
          
          button {
            cursor: pointer;
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
            style={{
              fontSize: '1.5rem',
              fontWeight: 'bold',
              color: 'white',
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
            }}
          >
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
              style={{ color: 'white', padding: '5px 0' }}
            >
              {t.home}
            </a>
            <a 
              href="#about"
              style={{ color: 'white', padding: '5px 0' }}
            >
              {t.about}
            </a>
            <a 
              href="#book"
              style={{ color: 'white', padding: '5px 0' }}
            >
              {t.book}
            </a>
            <a 
              href="#contact"
              style={{ color: 'white', padding: '5px 0' }}
            >
              {t.contact}
            </a>
            
            {/* Language selector */}
            <div style={{ 
              display: 'flex', 
              gap: '10px',
              marginLeft: '10px',
            }}>
              <button
                onClick={() => handleLanguageChange('de')}
                style={{
                  backgroundColor: language === 'de' ? 'white' : 'transparent',
                  color: language === 'de' ? '#38b6ff' : 'white',
                  border: 'none',
                  width: '30px',
                  height: '30px',
                  borderRadius: '50%',
                  fontSize: '0.8rem',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                DE
              </button>
              <button
                onClick={() => handleLanguageChange('fr')}
                style={{
                  backgroundColor: language === 'fr' ? 'white' : 'transparent',
                  color: language === 'fr' ? '#38b6ff' : 'white',
                  border: 'none',
                  width: '30px',
                  height: '30px',
                  borderRadius: '50%',
                  fontSize: '0.8rem',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                FR
              </button>
              <button
                onClick={() => handleLanguageChange('en')}
                style={{
                  backgroundColor: language === 'en' ? 'white' : 'transparent',
                  color: language === 'en' ? '#38b6ff' : 'white',
                  border: 'none',
                  width: '30px',
                  height: '30px',
                  borderRadius: '50%',
                  fontSize: '0.8rem',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                EN
              </button>
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
              padding: '5px',
            }}
          >
            ☰
          </button>
        </div>
      </header>
      
      {/* Mobile Menu */}
      {showMobileMenu && (
        <div 
          className="mobile-menu"
          style={{
            position: 'fixed',
            top: 0,
            right: 0,
            bottom: 0,
            width: '250px',
            backgroundColor: '#38b6ff',
            zIndex: 1001,
            padding: '20px',
            boxShadow: '-5px 0 15px rgba(0, 0, 0, 0.1)',
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
            <div style={{ fontSize: '1.2rem', fontWeight: 'bold', color: 'white' }}>Menu</div>
            <button
              onClick={toggleMobileMenu}
              style={{
                backgroundColor: 'transparent',
                border: 'none',
                color: 'white',
                fontSize: '1.5rem',
              }}
            >
              ×
            </button>
          </div>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
            <a
              href="#home"
              style={{ color: 'white', padding: '5px 0' }}
            >
              {t.home}
            </a>
            <a
              href="#about"
              style={{ color: 'white', padding: '5px 0' }}
            >
              {t.about}
            </a>
            <a
              href="#book"
              style={{ color: 'white', padding: '5px 0' }}
            >
              {t.book}
            </a>
            <a
              href="#contact"
              style={{ color: 'white', padding: '5px 0' }}
            >
              {t.contact}
            </a>
          </div>
          
          <div style={{ marginTop: '30px' }}>
            <div style={{ color: 'white', marginBottom: '10px' }}>Language</div>
            <div style={{ display: 'flex', gap: '10px' }}>
              <button
                onClick={() => handleLanguageChange('de')}
                style={{
                  backgroundColor: language === 'de' ? 'white' : 'rgba(255, 255, 255, 0.2)',
                  color: language === 'de' ? '#38b6ff' : 'white',
                  border: 'none',
                  padding: '5px 10px',
                  borderRadius: '4px',
                }}
              >
                DE
              </button>
              <button
                onClick={() => handleLanguageChange('fr')}
                style={{
                  backgroundColor: language === 'fr' ? 'white' : 'rgba(255, 255, 255, 0.2)',
                  color: language === 'fr' ? '#38b6ff' : 'white',
                  border: 'none',
                  padding: '5px 10px',
                  borderRadius: '4px',
                }}
              >
                FR
              </button>
              <button
                onClick={() => handleLanguageChange('en')}
                style={{
                  backgroundColor: language === 'en' ? 'white' : 'rgba(255, 255, 255, 0.2)',
                  color: language === 'en' ? '#38b6ff' : 'white',
                  border: 'none',
                  padding: '5px 10px',
                  borderRadius: '4px',
                }}
              >
                EN
              </button>
            </div>
          </div>
        </div>
      )}
      
      {/* Main content */}
      <main style={{ 
        maxWidth: '1200px',
        margin: '0 auto',
        padding: '100px 20px 40px',
      }}>
        <div 
          id="home" 
          style={{ 
            textAlign: 'center',
            marginBottom: '40px',
          }}
        >
          <h1 style={{ 
            fontSize: 'clamp(2rem, 5vw, 3rem)',
            marginBottom: '20px',
            color: '#38b6ff',
          }}>
            Luxembourg Pas Cher
          </h1>
          <p style={{ 
            fontSize: 'clamp(1rem, 3vw, 1.25rem)',
            marginBottom: '30px',
            color: '#555',
          }}>
            {t.welcomeText || 'Découvrez comment profiter du Luxembourg sans vous ruiner'}
          </p>
          <div style={{ 
            display: 'flex',
            justifyContent: 'center',
            gap: '20px',
            flexWrap: 'wrap',
          }}>
            <button
              style={{
                backgroundColor: '#38b6ff',
                color: 'white',
                border: 'none',
                padding: '12px 24px',
                borderRadius: '30px',
                fontWeight: 'bold',
                boxShadow: '0 4px 6px rgba(56, 182, 255, 0.2)',
              }}
            >
              {t.discover || 'Découvrir'}
            </button>
            <button
              style={{
                backgroundColor: '#e81414',
                color: 'white',
                border: 'none',
                padding: '12px 24px',
                borderRadius: '30px',
                fontWeight: 'bold',
                boxShadow: '0 4px 6px rgba(232, 20, 20, 0.2)',
              }}
            >
              {t.orderBook || 'Commander le livre'}
            </button>
          </div>
        </div>
        
        <div 
          id="about" 
          style={{ 
            backgroundColor: 'white',
            borderRadius: '12px',
            boxShadow: '0 5px 15px rgba(0, 0, 0, 0.05)',
            padding: '40px',
            marginBottom: '40px',
          }}
        >
          <h2 style={{ 
            fontSize: '2rem',
            marginBottom: '20px',
            color: '#38b6ff',
          }}>
            {t.aboutUs || 'À propos de nous'}
          </h2>
          <p style={{ 
            lineHeight: 1.7,
            color: '#555',
            marginBottom: '20px',
          }}>
            {t.aboutUsDesc || 'Luxembourg Pas Cher est né d\'une idée simple : partager les meilleurs conseils pour profiter pleinement de la vie au Luxembourg sans se ruiner.'}
          </p>
        </div>
        
        <div
          id="book"
          style={{
            backgroundColor: 'white',
            borderRadius: '12px',
            boxShadow: '0 5px 15px rgba(0, 0, 0, 0.05)',
            padding: '40px',
            marginBottom: '40px',
            display: 'flex',
            flexDirection: isMobile ? 'column' : 'row',
            gap: '40px',
            alignItems: 'center',
          }}
        >
          <div style={{ flex: isMobile ? 'auto' : '1' }}>
            <div style={{
              backgroundColor: '#e81414',
              borderRadius: '8px',
              width: '220px',
              height: '320px',
              margin: isMobile ? '0 auto' : '0',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'white',
              fontWeight: 'bold',
              boxShadow: '0 10px 30px rgba(0, 0, 0, 0.15)',
              position: 'relative',
            }}>
              <div style={{ textAlign: 'center', padding: '20px' }}>
                <div style={{ marginBottom: '10px' }}>LUXEMBOURG</div>
                <div style={{ fontSize: '1.5rem', marginBottom: '10px' }}>PAS CHER</div>
                <div style={{ fontSize: '0.9rem' }}>500+ TIPS & DEALS</div>
              </div>
            </div>
          </div>
          
          <div style={{ flex: isMobile ? 'auto' : '2' }}>
            <h2 style={{ 
              fontSize: '2rem',
              marginBottom: '20px',
              color: '#38b6ff',
            }}>
              {t.ourBook || 'Notre livre'}
            </h2>
            <p style={{ 
              lineHeight: 1.7,
              color: '#555',
              marginBottom: '20px',
            }}>
              {t.bookDesc || 'Découvrez notre guide complet qui vous permettra d\'économiser sur tous les aspects de la vie au Luxembourg.'}
            </p>
            <button
              style={{
                backgroundColor: '#e81414',
                color: 'white',
                border: 'none',
                padding: '12px 24px',
                borderRadius: '4px',
                fontWeight: 'bold',
              }}
            >
              {t.orderBook || 'Commander le livre'}
            </button>
          </div>
        </div>
        
        <div
          id="contact"
          style={{
            backgroundColor: 'white',
            borderRadius: '12px',
            boxShadow: '0 5px 15px rgba(0, 0, 0, 0.05)',
            padding: '40px',
            marginBottom: '40px',
          }}
        >
          <h2 style={{ 
            fontSize: '2rem',
            marginBottom: '20px',
            color: '#38b6ff',
          }}>
            {t.contactUs || 'Contactez-nous'}
          </h2>
          <p style={{ 
            lineHeight: 1.7,
            color: '#555',
            marginBottom: '20px',
          }}>
            {t.contactDesc || 'Vous avez des questions ou des suggestions ? N\'hésitez pas à nous contacter.'}
          </p>
          <div style={{ 
            display: 'flex',
            flexDirection: isMobile ? 'column' : 'row',
            gap: '20px',
          }}>
            <div style={{ flex: '1' }}>
              <div style={{ marginBottom: '15px' }}>
                <div style={{ fontWeight: 'bold', marginBottom: '5px' }}>{t.address || 'Adresse'}</div>
                <div>1 Rue de Luxembourg, L-1234 Luxembourg</div>
              </div>
              <div style={{ marginBottom: '15px' }}>
                <div style={{ fontWeight: 'bold', marginBottom: '5px' }}>{t.email || 'E-mail'}</div>
                <div>info@luxembourgpaschere.lu</div>
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <footer style={{ 
        backgroundColor: '#1f2937', 
        color: 'white', 
        padding: '40px 20px',
      }}>
        <div style={{ 
          maxWidth: '1200px',
          margin: '0 auto',
          display: 'flex',
          flexDirection: isMobile ? 'column' : 'row',
          justifyContent: 'space-between',
          gap: '30px',
        }}>
          <div>
            <h3 style={{ 
              fontSize: '1.3rem',
              marginBottom: '20px',
            }}>
              Luxembourg Pas Cher
            </h3>
            <p style={{ color: '#aaa' }}>
              {t.welcomeText || 'Découvrez comment profiter du Luxembourg sans vous ruiner'}
            </p>
          </div>
          
          <div>
            <h3 style={{ 
              fontSize: '1.3rem',
              marginBottom: '20px',
            }}>
              {t.contactUs || 'Contactez-nous'}
            </h3>
            <div style={{ color: '#aaa', marginBottom: '10px' }}>
              <div style={{ fontWeight: 'bold', marginBottom: '5px' }}>{t.address || 'Adresse'}</div>
              <div>1 Rue de Luxembourg, L-1234 Luxembourg</div>
            </div>
            <div style={{ color: '#aaa', marginBottom: '10px' }}>
              <div style={{ fontWeight: 'bold', marginBottom: '5px' }}>{t.email || 'E-mail'}</div>
              <div>info@luxembourgpaschere.lu</div>
            </div>
          </div>
        </div>
        
        <div style={{ 
          maxWidth: '1200px',
          margin: '30px auto 0',
          borderTop: '1px solid rgba(255, 255, 255, 0.1)',
          paddingTop: '20px',
          display: 'flex',
          flexDirection: isMobile ? 'column' : 'row',
          justifyContent: 'space-between',
          alignItems: isMobile ? 'center' : 'flex-start',
          gap: '20px',
        }}>
          <div style={{ color: '#aaa' }}>
            © {new Date().getFullYear()} - Luxembourg Pas Cher
          </div>
          
          <div style={{ 
            display: 'flex',
            gap: '20px',
            color: '#aaa',
          }}>
            <a 
              href="#"
              style={{ color: '#aaa' }}
            >
              {t.terms || 'Conditions'}
            </a>
            <a 
              href="#"
              style={{ color: '#aaa' }}
            >
              {t.privacy || 'Confidentialité'}
            </a>
          </div>
        </div>
      </footer>
      
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
            zIndex: 99,
          }}
        >
          ↑
        </button>
      )}
    </>
  );
}