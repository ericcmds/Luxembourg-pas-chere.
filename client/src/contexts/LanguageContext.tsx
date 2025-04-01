
import React from 'react';
import { translations } from '../i18n/translations';

// Einfacher Kontext für Übersetzungen ohne React Hooks
const defaultLanguage = 'fr';

// Definiere den Typ für den Kontext
interface LanguageContextProps {
  language: string;
  setLanguage: (lang: string) => void;
  t: (key: string) => string;
}

// Erstelle den Kontext mit Default-Werten
const LanguageContext = React.createContext<LanguageContextProps>({
  language: defaultLanguage,
  setLanguage: () => {},
  t: (key: string) => key
});

// Provider Komponente
export class LanguageProvider extends React.Component<{children: React.ReactNode}, {language: string}> {
  constructor(props: {children: React.ReactNode}) {
    super(props);
    
    // Standardsprache ist Französisch
    this.state = {
      language: defaultLanguage
    };
    
    this.setLanguage = this.setLanguage.bind(this);
    this.translate = this.translate.bind(this);
  }
  
  // Beim ersten Laden die Sprache aus localStorage holen
  componentDidMount() {
    try {
      const savedLanguage = localStorage.getItem('language');
      if (savedLanguage && (savedLanguage === 'fr' || savedLanguage === 'de' || savedLanguage === 'en')) {
        this.setState({ language: savedLanguage });
        document.documentElement.lang = savedLanguage;
      }
    } catch (e) {
      console.error('LocalStorage access error:', e);
    }
  }
  
  // Wenn die Sprache geändert wird
  componentDidUpdate(prevProps: any, prevState: {language: string}) {
    if (prevState.language !== this.state.language) {
      try {
        localStorage.setItem('language', this.state.language);
        document.documentElement.lang = this.state.language;
      } catch (e) {
        console.error('LocalStorage save error:', e);
      }
    }
  }
  
  // Methode zum Ändern der Sprache
  setLanguage(lang: string) {
    if (lang === 'fr' || lang === 'de' || lang === 'en') {
      this.setState({ language: lang });
    }
  }
  
  // Übersetzungsfunktion
  translate(key: string): string {
    try {
      // Sichere Zugriffe mit Typ-Assertion
      const transObj = translations as Record<string, Record<string, string>>;
      const currentLang = this.state.language;
      
      // Prüfe aktuelle Sprache
      if (transObj[currentLang] && transObj[currentLang][key]) {
        return transObj[currentLang][key];
      }
      
      // Fallback zu Französisch
      if (currentLang !== 'fr' && transObj.fr && transObj.fr[key]) {
        return transObj.fr[key];
      }
      
      // Als letztes Mittel den Key zurückgeben
      return key;
    } catch (e) {
      return key;
    }
  }
  
  render() {
    return (
      <LanguageContext.Provider value={{
        language: this.state.language,
        setLanguage: this.setLanguage,
        t: this.translate
      }}>
        {this.props.children}
      </LanguageContext.Provider>
    );
  }
}

// Hook für einfachen Zugriff auf den Kontext
export const useLanguage = () => React.useContext(LanguageContext);
