// Minimalste Version ohne komplexe Features
import React, { useState, useEffect } from 'react';
import { translations } from './i18n/translations';

export default function MinimalAppSimplified() {
  // Minimale Zustände
  const [language, setLanguage] = useState<'fr' | 'de' | 'en'>('de');
  const [isMobile, setIsMobile] = useState(false);
  
  // Media query für responsives Design
  useEffect(() => {
    const checkForMobile = () => {
      setIsMobile(window.matchMedia('(max-width: 768px)').matches);
    };
    
    // Initial check
    checkForMobile();
    
    // Event listener für Fenstergrößenänderungen
    window.addEventListener('resize', checkForMobile);
    
    // Cleanup
    return () => window.removeEventListener('resize', checkForMobile);
  }, []);
  
  // Sprachverwaltung
  useEffect(() => {
    const savedLanguage = localStorage.getItem('preferredLanguage');
    if (savedLanguage && ['fr', 'de', 'en'].includes(savedLanguage)) {
      setLanguage(savedLanguage as 'fr' | 'de' | 'en');
    }
  }, []);
  
  // Übersetzungen
  const t = translations[language];
  
  // Sprachänderung
  const handleLanguageChange = (lang: 'fr' | 'de' | 'en') => {
    setLanguage(lang);
    localStorage.setItem('preferredLanguage', lang);
  };
  
  // Schließen des Menüs bei Klick außerhalb
  function handleClickOutside(event: MouseEvent) {
    // Implementierung bei Bedarf
  }
  
  return (
    <div>
      <header style={{
        backgroundColor: '#38b6ff',
        padding: '15px 20px',
        color: 'white',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
      }}>
        <div style={{ fontWeight: 'bold', fontSize: '1.5rem' }}>
          Luxembourg Pas Cher
        </div>
        
        <div style={{ display: 'flex', gap: '10px' }}>
          <button 
            onClick={() => handleLanguageChange('de')}
            style={{
              backgroundColor: language === 'de' ? 'white' : 'transparent',
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
              backgroundColor: language === 'fr' ? 'white' : 'transparent',
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
              backgroundColor: language === 'en' ? 'white' : 'transparent',
              color: language === 'en' ? '#38b6ff' : 'white',
              border: 'none',
              padding: '5px 10px',
              borderRadius: '4px',
            }}
          >
            EN
          </button>
        </div>
      </header>
      
      <main style={{ maxWidth: '1200px', margin: '0 auto', padding: '20px' }}>
        <h1 style={{ color: '#38b6ff', marginBottom: '20px', textAlign: 'center' }}>
          Luxembourg Pas Cher
        </h1>
        
        <p style={{ textAlign: 'center', marginBottom: '30px' }}>
          {t.welcomeText || 'Découvrez comment profiter du Luxembourg sans vous ruiner'}
        </p>
        
        <div style={{ 
          display: 'flex', 
          flexDirection: isMobile ? 'column' : 'row',
          gap: '20px',
          marginBottom: '30px',
          backgroundColor: 'white',
          padding: '20px',
          borderRadius: '8px',
          boxShadow: '0 2px 10px rgba(0,0,0,0.1)'
        }}>
          <div style={{ flex: '1' }}>
            <h2 style={{ color: '#38b6ff', marginBottom: '15px' }}>
              {t.aboutUs || 'À propos de nous'}
            </h2>
            <p>
              {t.aboutUsDesc || 'Luxembourg Pas Cher est né d\'une idée simple : partager les meilleurs conseils pour profiter pleinement de la vie au Luxembourg sans se ruiner.'}
            </p>
          </div>
          
          <div style={{ flex: '1' }}>
            <h2 style={{ color: '#38b6ff', marginBottom: '15px' }}>
              {t.ourBook || 'Notre livre'}
            </h2>
            <p style={{ marginBottom: '15px' }}>
              {t.bookDesc || 'Découvrez notre guide complet qui vous permettra d\'économiser sur tous les aspects de la vie au Luxembourg.'}
            </p>
            <button style={{
              backgroundColor: '#e81414',
              color: 'white',
              border: 'none',
              padding: '10px 20px',
              borderRadius: '4px',
            }}>
              {t.orderBook || 'Commander le livre'}
            </button>
          </div>
        </div>
      </main>
      
      <footer style={{ backgroundColor: '#1f2937', color: 'white', padding: '20px', textAlign: 'center' }}>
        © {new Date().getFullYear()} - Luxembourg Pas Cher
      </footer>
    </div>
  );
}