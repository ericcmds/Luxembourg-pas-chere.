import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Twitter, Instagram, Linkedin, Mail, Phone, MapPin } from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-dark-blue text-white pt-12 pb-6">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand */}
          <div>
            <Link to="/" className="flex items-center mb-4 hover:opacity-80 transition-opacity">
              <img src="/logo.svg" alt="Luxembourg" className="h-8" />
              <span className="text-lux-blue font-bold text-xl ml-1">Pas Chère</span>
            </Link>
            <p className="text-light-gray mb-4">
              Ihr Ratgeber für ein günstiges Leben in Luxemburg ohne finanziellen Druck.
            </p>
            <div className="flex space-x-3 mb-6">
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" 
                className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-lux-blue transition-colors">
                <Facebook size={18} />
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" 
                className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-lux-blue transition-colors">
                <Twitter size={18} />
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" 
                className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-lux-blue transition-colors">
                <Instagram size={18} />
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" 
                className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-lux-blue transition-colors">
                <Linkedin size={18} />
              </a>
            </div>
          </div>

          {/* Main Navigation */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Hauptnavigation</h3>
            <ul className="space-y-2">
              <li><a href="#home" className="text-light-gray hover:text-white transition-colors">Startseite</a></li>
              <li><a href="#offers" className="text-light-gray hover:text-white transition-colors">Angebote</a></li>
              <li><a href="#blog" className="text-light-gray hover:text-white transition-colors">Blog</a></li>
              <li><a href="#about" className="text-light-gray hover:text-white transition-colors">Über uns</a></li>
              <li><a href="#contact" className="text-light-gray hover:text-white transition-colors">Kontakt</a></li>
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Kategorien</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-light-gray hover:text-white transition-colors">Restaurants</a></li>
              <li><a href="#" className="text-light-gray hover:text-white transition-colors">Shopping</a></li>
              <li><a href="#" className="text-light-gray hover:text-white transition-colors">Aktivitäten</a></li>
              <li><a href="#" className="text-light-gray hover:text-white transition-colors">Unterkünfte</a></li>
              <li><a href="#" className="text-light-gray hover:text-white transition-colors">Transport</a></li>
              <li><a href="#" className="text-light-gray hover:text-white transition-colors">Kultur & Freizeit</a></li>
            </ul>
          </div>

          {/* Legal & Contact */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Kontakt & Rechtliches</h3>
            <ul className="space-y-3">
              <li className="flex items-start">
                <MapPin size={16} className="mr-2 mt-1 text-lux-blue" />
                <span className="text-light-gray">Luxemburg City, 2121<br />Avenue de la Liberté</span>
              </li>
              <li className="flex items-center">
                <Phone size={16} className="mr-2 text-lux-blue" />
                <a href="tel:+352123456789" className="text-light-gray hover:text-white transition-colors">+352 12 345 6789</a>
              </li>
              <li className="flex items-center">
                <Mail size={16} className="mr-2 text-lux-blue" />
                <a href="mailto:info@lux-pas-chere.com" className="text-light-gray hover:text-white transition-colors">info@lux-pas-chere.com</a>
              </li>
            </ul>
            <div className="mt-6 space-y-2">
              <a href="#" className="block text-light-gray hover:text-white transition-colors">Datenschutz</a>
              <a href="#" className="block text-light-gray hover:text-white transition-colors">Impressum</a>
              <a href="#" className="block text-light-gray hover:text-white transition-colors">AGB</a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-6 border-t border-gray-700">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-light-gray text-sm mb-4 md:mb-0">
              © {currentYear} Luxembourg Pas Chère. Alle Rechte vorbehalten.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-light-gray hover:text-white text-sm transition-colors">Häufige Fragen</a>
              <a href="#" className="text-light-gray hover:text-white text-sm transition-colors">Support</a>
              <a href="#" className="text-light-gray hover:text-white text-sm transition-colors">Medien</a>
            </div>
          </div>
        </div>
      </div>

      {/* Back to top button */}
      <a href="#top" className="back-to-top fixed bottom-8 right-8 bg-lux-blue hover:bg-blue-700 transition-colors text-white w-12 h-12 rounded-full flex items-center justify-center shadow-lg">
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
        </svg>
      </a>
    </footer>
  );
}