import { useState, useEffect, useRef } from 'react';

export default function CookieBanner() {
  const [isVisible, setIsVisible] = useState(false);
  const acceptButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    // Check if user has already accepted cookies
    const cookiesAccepted = localStorage.getItem('cookiesAccepted');
    if (!cookiesAccepted) {
      // Show banner after a short delay
      const timer = setTimeout(() => {
        setIsVisible(true);
        // Focus on accept button for accessibility
        if (acceptButtonRef.current) {
          setTimeout(() => {
            acceptButtonRef.current?.focus();
          }, 100);
        }
      }, 1000);
      
      return () => clearTimeout(timer);
    }
  }, []);

  const acceptCookies = () => {
    localStorage.setItem('cookiesAccepted', 'true');
    setIsVisible(false);
  };

  const declineCookies = () => {
    // We could set a different flag for declined cookies
    localStorage.setItem('cookiesDeclined', 'true');
    localStorage.setItem('cookiesAccepted', 'false');
    setIsVisible(false);
  };

  // Handle keyboard events for accessibility
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') {
      e.preventDefault();
      declineCookies();
    }
  };

  if (!isVisible) return null;

  return (
    <div 
      className="cookie-banner" 
      role="dialog" 
      aria-labelledby="cookie-title" 
      aria-describedby="cookie-description"
      onKeyDown={handleKeyDown}
    >
      <div className="container">
        <div className="d-flex flex-column flex-md-row justify-content-between align-items-center py-3">
          <div className="mb-3 mb-md-0 pe-md-4">
            <h2 id="cookie-title" className="h6 mb-2 font-montserrat">Cookie-Einstellungen</h2>
            <p id="cookie-description" className="mb-0">
              Wir verwenden Cookies, um Ihre Erfahrung zu verbessern. Durch die weitere Nutzung dieser Website stimmen Sie der Verwendung von Cookies zu.
              <a href="#" className="ms-1 hover-text-lux-blue" aria-label="Mehr über unsere Cookie-Richtlinie erfahren">Mehr erfahren</a>
            </p>
          </div>
          <div className="d-flex gap-2">
            <button 
              onClick={declineCookies} 
              className="btn btn-outline-secondary btn-sm"
              aria-label="Cookies ablehnen"
            >
              Ablehnen
            </button>
            <button 
              ref={acceptButtonRef}
              onClick={acceptCookies} 
              className="btn bg-lux-blue text-white btn-sm"
              aria-label="Cookies akzeptieren"
            >
              Akzeptieren
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}