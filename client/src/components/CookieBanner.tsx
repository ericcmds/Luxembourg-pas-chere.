import { useState, useEffect } from 'react';

export default function CookieBanner() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Check if user has already accepted cookies
    const cookiesAccepted = localStorage.getItem('cookiesAccepted');
    if (!cookiesAccepted) {
      // Show banner after a short delay
      const timer = setTimeout(() => {
        setIsVisible(true);
      }, 1000);
      
      return () => clearTimeout(timer);
    }
  }, []);

  const acceptCookies = () => {
    localStorage.setItem('cookiesAccepted', 'true');
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div className="cookie-banner">
      <div className="container">
        <div className="d-flex flex-column flex-md-row justify-content-between align-items-center py-3">
          <div className="mb-3 mb-md-0 pe-md-4">
            <p className="mb-0">
              We use cookies to enhance your experience. By continuing to visit this site you agree to our use of cookies.
              <a href="#" className="ms-1 text-lux-blue">Learn more</a>
            </p>
          </div>
          <div className="d-flex">
            <button 
              onClick={acceptCookies} 
              className="btn btn-lux-blue btn-sm"
            >
              Accept
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}