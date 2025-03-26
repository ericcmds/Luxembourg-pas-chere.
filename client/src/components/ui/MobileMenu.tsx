
import React, { useEffect } from 'react';

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function MobileMenu({ isOpen, onClose }: MobileMenuProps) {
  // Close mobile menu when clicking on a link
  const handleLinkClick = () => {
    onClose();
  };

  useEffect(() => {
    // Handle ESC key press to close menu
    const handleEscKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && isOpen) {
        onClose();
      }
    };

    // Handle body scroll
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      document.addEventListener('keydown', handleEscKey);
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
      document.removeEventListener('keydown', handleEscKey);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="mobile-menu-overlay">
      <div className="mobile-menu-container">
        <div className="mobile-menu-header">
          <div className="position-relative">
            <span className="font-montserrat fw-bold fs-4 text-lux-red">Luxembourg</span>
            <span className="font-montserrat fw-bold fs-4 text-lux-blue ms-2">Pas Chère</span>
            <div className="position-absolute" style={{ top: '-5px', right: '-12px', background: '#E31837', color: 'white', padding: '0 4px', borderRadius: '50%', transform: 'rotate(12deg)', fontSize: '12px', fontWeight: 'bold' }} aria-hidden="true">€</div>
          </div>
          <button 
            className="mobile-menu-close-btn" 
            onClick={onClose}
            aria-label="Close menu"
          >
            <i className="fas fa-times"></i>
          </button>
        </div>
        <nav className="mobile-menu-nav">
          <a href="#home" className="mobile-menu-link" onClick={handleLinkClick}>Home</a>
          <a href="#book" className="mobile-menu-link" onClick={handleLinkClick}>Our Book</a>
          <a href="#offers" className="mobile-menu-link" onClick={handleLinkClick}>Offers</a>
          <a href="#about" className="mobile-menu-link" onClick={handleLinkClick}>About</a>
          <a href="#blog" className="mobile-menu-link" onClick={handleLinkClick}>Blog</a>
          <a href="#contact" className="mobile-menu-link" onClick={handleLinkClick}>Contact</a>
        </nav>
        <div className="mobile-menu-footer">
          <div className="mobile-social-links">
            <a href="#" className="mobile-social-link" aria-label="Facebook"><i className="fab fa-facebook-f"></i></a>
            <a href="#" className="mobile-social-link" aria-label="Instagram"><i className="fab fa-instagram"></i></a>
            <a href="#" className="mobile-social-link" aria-label="Twitter"><i className="fab fa-twitter"></i></a>
          </div>
        </div>
      </div>
    </div>
  );
}
