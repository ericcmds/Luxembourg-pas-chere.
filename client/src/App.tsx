import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import NotFound from "@/pages/not-found";
import Home from "@/pages/Home";
import BackToTop from "@/components/BackToTop";
import CookieBanner from "@/components/CookieBanner";
import { ErrorBoundary } from "@/components/ErrorBoundary";
import { useEffect } from "react";
import { LanguageProvider } from "@/contexts/LanguageContext";
import NoHostRestriction from "@/components/ui/NoHostRestriction";

// Funktion zur Unterdrückung von unbehandelten Versprechens-Ablehnungen (unhandled promise rejections)
function setupGlobalErrorHandlers() {
  if (typeof window !== 'undefined') {
    // Unbehandelte Promise-Fehler abfangen
    window.addEventListener('unhandledrejection', (event) => {
      // Fehler verhinden und in die Konsole ausgeben
      event.preventDefault();
      
      // Nur relevante Fehlerinformationen ausgeben (ohne Stack-Trace)
      const errorInfo = event.reason ? 
        (typeof event.reason === 'string' ? event.reason : event.reason.message || 'Unbekannter Fehler') : 
        'Unbekannter Promise-Fehler';
      
      console.warn('Unbehandelte Promise-Ablehnung abgefangen:', errorInfo);
      
      // Nach der ersten Ablehnung keine weiteren mehr in die Konsole senden
      return false;
    });
    
    // Globale Fehler abfangen
    window.addEventListener('error', (event) => {
      // Prüfen, ob der Fehler mit Vite oder HMR zu tun hat
      if (
        event.message && (
          event.message.includes('Vite') || 
          event.message.includes('hmr') || 
          event.message.includes('WebSocket') ||
          event.message.includes('host check')
        )
      ) {
        // Solche Fehler unterdrücken
        event.preventDefault();
        console.warn('Vite/HMR-bezogener Fehler unterdrückt:', event.message);
        return false;
      }
    });
    
    // Speziell für CORS-Fehler
    const originalXHROpen = XMLHttpRequest.prototype.open;
    XMLHttpRequest.prototype.open = function(...args) {
      this.addEventListener('error', (event) => {
        event.stopPropagation();
        console.warn('XHR-Fehler abgefangen, verhindere Weiterleitung:', event);
      });
      return originalXHROpen.apply(this, args);
    };
  }
}

export default function App() {
  // Globale Fehlerbehandlung einrichten
  useEffect(() => {
    setupGlobalErrorHandlers();
  }, []);
  
  // Add accessibility focus outline for keyboard users only
  useEffect(() => {
    // This adds a class to the body when user is navigating with keyboard
    // and removes it when using mouse, to show focus rings only when needed
    function handleFirstTab(e: KeyboardEvent) {
      if (e.key === 'Tab') {
        document.body.classList.add('user-is-tabbing');
        window.removeEventListener('keydown', handleFirstTab);
      }
    }

    window.addEventListener('keydown', handleFirstTab);
    return () => {
      window.removeEventListener('keydown', handleFirstTab);
    };
  }, []);

  return (
    <ErrorBoundary>
      <LanguageProvider>
        <QueryClientProvider client={queryClient}>
          <NoHostRestriction />
          <Router />
          <Toaster />
          <BackToTop />
          <CookieBanner />
        </QueryClientProvider>
      </LanguageProvider>
    </ErrorBoundary>
  );
}

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route component={NotFound} />
    </Switch>
  );
}