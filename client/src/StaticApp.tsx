// Statische Version ohne responsive Änderungen oder Hooks
import React, { useState } from 'react';
import { translations } from './i18n/translations';

export default function StaticApp() {
  // Der minimalste Zustand
  const [language, setLanguage] = useState<'fr' | 'de' | 'en'>('de');
  
  // Übersetzungen mit Fallbacks
  const t = translations[language] || {};
  const text = {
    home: t.home || 'Home',
    about: t.about || 'About',
    contact: t.contact || 'Contact',
    welcomeText: 'Luxembourg Pas Cher - Entdecken Sie Luxemburg ohne Ihr Budget zu sprengen!'
  };
  
  // Sprachänderung
  const handleLanguageChange = (lang: 'fr' | 'de' | 'en') => {
    setLanguage(lang);
    try {
      localStorage.setItem('preferredLanguage', lang);
    } catch (e) {
      console.log('Could not save language preference');
    }
  };
  
  return (
    <div style={{
      fontFamily: 'Arial, sans-serif',
      maxWidth: '800px',
      margin: '0 auto',
      padding: '20px'
    }}>
      <header style={{
        backgroundColor: '#38b6ff',
        padding: '15px',
        color: 'white',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '20px'
      }}>
        <div style={{ fontWeight: 'bold', fontSize: '18px' }}>
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
              cursor: 'pointer'
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
              cursor: 'pointer'
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
              cursor: 'pointer'
            }}
          >
            EN
          </button>
        </div>
      </header>
      
      <main>
        <h1 style={{ color: '#38b6ff', marginBottom: '20px', textAlign: 'center' }}>
          Luxembourg Pas Cher
        </h1>
        
        <p style={{ textAlign: 'center', marginBottom: '30px', lineHeight: '1.5' }}>
          {text.welcomeText}
        </p>
        
        <div style={{ 
          backgroundColor: 'white',
          padding: '20px',
          marginBottom: '20px',
          border: '1px solid #eee',
          borderRadius: '5px'
        }}>
          <h2 style={{ marginBottom: '10px', color: '#38b6ff' }}>
            {text.about}
          </h2>
          <p style={{ lineHeight: '1.5' }}>
            Luxembourg Pas Cher ist eine Initiative, die Ihnen hilft, Luxemburg günstiger zu erleben. 
            Wir teilen Tipps und Angebote, um das Leben in Luxemburg erschwinglich zu machen.
          </p>
        </div>
        
        <div style={{ 
          backgroundColor: 'white',
          padding: '20px',
          marginBottom: '20px',
          border: '1px solid #eee',
          borderRadius: '5px'
        }}>
          <h2 style={{ marginBottom: '10px', color: '#e81414' }}>
            Unser Buch
          </h2>
          <p style={{ lineHeight: '1.5', marginBottom: '15px' }}>
            Entdecken Sie unser Buch, das über 500 Tipps und Deals enthält, 
            um in Luxemburg Geld zu sparen und trotzdem voll zu genießen.
          </p>
          <button style={{
            backgroundColor: '#e81414',
            color: 'white',
            border: 'none',
            padding: '10px 20px',
            cursor: 'pointer',
            fontWeight: 'bold'
          }}>
            Buch bestellen
          </button>
        </div>
      </main>
      
      <footer style={{ 
        textAlign: 'center',
        paddingTop: '20px',
        marginTop: '40px',
        borderTop: '1px solid #eee',
        color: '#666'
      }}>
        © {new Date().getFullYear()} - Luxembourg Pas Cher
      </footer>
    </div>
  );
}