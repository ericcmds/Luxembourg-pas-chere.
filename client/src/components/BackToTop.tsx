import { useState, useEffect } from 'react';

export default function BackToTop() {
  const [isVisible, setIsVisible] = useState(false);

  // Show button when page is scrolled down
  useEffect(() => {
    const toggleVisibility = () => {
      if (window.pageYOffset > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', toggleVisibility);

    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  // Scroll to top function
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  // Handle keyboard accessibility
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      scrollToTop();
    }
  };

  return (
    <>
      {isVisible && (
        <button 
          onClick={scrollToTop} 
          onKeyDown={handleKeyDown}
          className="back-to-top btn bg-lux-blue text-white rounded-circle shadow"
          aria-label="Zum Seitenanfang"
          title="Zum Seitenanfang"
          tabIndex={0}
        >
          <i className="fas fa-arrow-up" aria-hidden="true"></i>
          <span className="visually-hidden">Zum Seitenanfang</span>
        </button>
      )}
    </>
  );
}