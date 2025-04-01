
import React, { useEffect, useRef, KeyboardEvent as ReactKeyboardEvent } from 'react';
import { X, Home, BookOpen, Tag, Info, MessageCircle, Mail, Facebook, Instagram, Twitter } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

interface NavItem {
  id: string;
  label: string;
  href: string;
  icon: React.ReactNode;
}

export default function MobileMenu({ isOpen, onClose }: MobileMenuProps) {
  const menuRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const firstItemRef = useRef<HTMLAnchorElement>(null);
  const lastItemRef = useRef<HTMLAnchorElement>(null);
  const { t } = useLanguage();

  // Navigation items data
  const navItems: NavItem[] = [
    { id: 'home', label: 'Home', href: '#home', icon: <Home size={20} /> },
    { id: 'book', label: 'Unser Buch', href: '#book', icon: <BookOpen size={20} /> },
    { id: 'offers', label: 'Angebote', href: '#offers', icon: <Tag size={20} /> },
    { id: 'about', label: 'Über uns', href: '#about', icon: <Info size={20} /> },
    { id: 'blog', label: 'Blog', href: '#blog', icon: <MessageCircle size={20} /> },
    { id: 'contact', label: 'Kontakt', href: '#contact', icon: <Mail size={20} /> },
    { id: 'design-assistant', label: 'Design Assistant', href: '/design-assistant', icon: <span className="lucide-icon"><i className="fas fa-magic"></i></span> },
  ];

  // Social media links
  const socialLinks = [
    { id: 'facebook', label: 'Facebook', icon: <Facebook size={20} strokeWidth={1.5} />, href: '#' },
    { id: 'instagram', label: 'Instagram', icon: <Instagram size={20} strokeWidth={1.5} />, href: '#' },
    { id: 'twitter', label: 'Twitter', icon: <Twitter size={20} strokeWidth={1.5} />, href: '#' },
  ];

  // Close mobile menu when clicking on a link
  const handleLinkClick = () => {
    onClose();
  };

  // Handle trap focus within the menu
  const handleKeyDown = (e: ReactKeyboardEvent<HTMLDivElement>) => {
    if (e.key === 'Escape') {
      onClose();
    }
    
    // Trap focus in modal
    if (e.key === 'Tab') {
      if (e.shiftKey) {
        // If shift + tab and on first element, move to last element
        if (document.activeElement === closeButtonRef.current) {
          e.preventDefault();
          lastItemRef.current?.focus();
        }
      } else {
        // If tab and on last element, move to first element
        if (document.activeElement === lastItemRef.current) {
          e.preventDefault();
          closeButtonRef.current?.focus();
        }
      }
    }
  };

  // Set focus to close button when menu opens
  useEffect(() => {
    if (isOpen) {
      // Small delay to ensure elements are rendered
      const timer = setTimeout(() => {
        closeButtonRef.current?.focus();
      }, 100);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  // Handle body scroll lock
  useEffect(() => {
    // Handle ESC key press to close menu
    const handleEscKey = (event: Event) => {
      if ((event as KeyboardEvent).key === 'Escape' && isOpen) {
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

  // Handle click outside to close
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-start justify-end"
      role="dialog"
      aria-modal="true"
      aria-label="Mobile navigation menu"
      onKeyDown={handleKeyDown}
    >
      <div 
        ref={menuRef}
        className="h-full w-[85%] max-w-[350px] bg-white shadow-xl flex flex-col animate-slide-in-right"
      >
        {/* Header with logo and close button */}
        <div className="p-4 flex justify-between items-center border-b border-gray-200">
          <div className="relative">
            <span className="text-[#E31837] font-montserrat font-bold text-xl">Luxembourg</span>
            <span className="text-[#00A4E0] font-montserrat font-bold text-xl ml-1">Pas Chère</span>
            <div className="absolute -top-2 -right-3 bg-[#E31837] text-white px-1 rounded-full transform rotate-12 text-xs font-bold" aria-hidden="true">€</div>
          </div>
          <button 
            ref={closeButtonRef}
            className="p-2 rounded-full hover:bg-gray-100 transition-colors focus:ring-2 focus:ring-[#E31837] focus:outline-none"
            onClick={onClose}
            aria-label="Close menu"
          >
            <X className="h-6 w-6 text-gray-700" />
          </button>
        </div>

        {/* Navigation items */}
        <nav className="flex-1 overflow-y-auto p-4 space-y-1">
          {navItems.map((item, index) => (
            <a
              key={item.id}
              href={item.href}
              ref={index === 0 ? firstItemRef : (index === navItems.length - 1 ? lastItemRef : null)}
              className="flex items-center p-3 rounded-lg hover:bg-gray-100 transition-colors text-gray-800 hover:text-[#E31837] focus:outline-none focus:ring-2 focus:ring-[#00A4E0]"
              onClick={handleLinkClick}
              role="menuitem"
            >
              <span className="mr-3 text-[#00A4E0]">{item.icon}</span>
              <span className="font-montserrat font-medium">{item.label}</span>
            </a>
          ))}
        </nav>

        {/* Language Selector */}
        <div className="p-4 border-t border-gray-200">
          <div className="flex justify-center space-x-2 py-2">
            <button 
              className="px-3 py-1 rounded border border-gray-300 hover:border-[#E31837] focus:outline-none focus:ring-2 focus:ring-[#E31837] focus:border-transparent"
              aria-label="Switch language to German"
            >
              DE
            </button>
            <button 
              className="px-3 py-1 rounded border border-gray-300 hover:border-[#E31837] focus:outline-none focus:ring-2 focus:ring-[#E31837] focus:border-transparent"
              aria-label="Switch language to French"
            >
              FR
            </button>
            <button 
              className="px-3 py-1 rounded border border-gray-300 hover:border-[#E31837] focus:outline-none focus:ring-2 focus:ring-[#E31837] focus:border-transparent"
              aria-label="Switch language to English"
            >
              EN
            </button>
          </div>
        </div>

        {/* Social links footer */}
        <div className="p-4 border-t border-gray-200">
          <div className="flex justify-center space-x-4">
            {socialLinks.map((link) => (
              <a
                key={link.id}
                href={link.href}
                className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-100 text-gray-600 hover:bg-[#E31837] hover:text-white transition-colors focus:outline-none focus:ring-2 focus:ring-[#E31837]"
                aria-label={link.label}
              >
                {link.icon}
              </a>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
