
import React, { createContext, useState, useContext, useEffect, ReactNode } from 'react';
import { translations } from '../i18n/translations';

// Standardsprache ist Französisch
const defaultLanguage = 'fr';

// Definiere den Typ für den Kontext
interface LanguageContextProps {
  language: string;
  setLanguage: (lang: string) => void;
  t: (key: string) => string;
}

// Erstelle den Kontext mit Default-Werten
const LanguageContext = createContext<LanguageContextProps>({
  language: defaultLanguage,
  setLanguage: () => {},
  t: (key: string) => key
});

// Provider Komponente als Funktionskomponente mit Hooks
export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState(defaultLanguage);
  
  // Beim ersten Laden die Sprache aus localStorage holen
  useEffect(() => {
    try {
      const savedLanguage = localStorage.getItem('language');
      if (savedLanguage && (savedLanguage === 'fr' || savedLanguage === 'de' || savedLanguage === 'en')) {
        setLanguageState(savedLanguage);
        document.documentElement.lang = savedLanguage;
      }
    } catch (e) {
      console.error('LocalStorage access error:', e);
    }
  }, []);
  
  // Wenn die Sprache geändert wird
  useEffect(() => {
    try {
      localStorage.setItem('language', language);
      document.documentElement.lang = language;
    } catch (e) {
      console.error('LocalStorage save error:', e);
    }
  }, [language]);
  
  // Methode zum Ändern der Sprache
  const setLanguage = (lang: string) => {
    if (lang === 'fr' || lang === 'de' || lang === 'en') {
      setLanguageState(lang);
    }
  };
  
  // Übersetzungsfunktion
  const translate = (key: string): string => {
    try {
      // Sichere Zugriffe mit Typ-Assertion
      const transObj = translations as Record<string, Record<string, string>>;
      
      // Prüfe aktuelle Sprache
      if (transObj[language] && transObj[language][key]) {
        return transObj[language][key];
      }
      
      // Fallback zu Französisch
      if (language !== 'fr' && transObj.fr && transObj.fr[key]) {
        return transObj.fr[key];
      }
      
      // Als letztes Mittel den Key zurückgeben
      return key;
    } catch (e) {
      return key;
    }
  };
  
  return (
    <LanguageContext.Provider value={{
      language,
      setLanguage,
      t: translate
    }}>
      {children}
    </LanguageContext.Provider>
  );
}

// Hook für einfachen Zugriff auf den Kontext
export const useLanguage = () => useContext(LanguageContext);
