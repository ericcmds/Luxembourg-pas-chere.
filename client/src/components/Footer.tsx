import { Link } from "wouter";
import { Facebook, Twitter, Instagram, Linkedin } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-[#333333] text-white pt-12 pb-6">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          <div>
            <div className="flex items-center space-x-2 mb-6">
              <div className="w-10 h-10 bg-[#E60023] rounded-full flex items-center justify-center">
                <span className="text-white font-montserrat font-bold text-lg">LPC</span>
              </div>
              <div className="font-montserrat font-bold text-white">
                <span>Luxembourg</span>
                <span className="text-[#E60023]">Pas Chère</span>
              </div>
            </div>
            <p className="font-opensans mb-6">
              Your ultimate guide to experiencing Luxembourg on a budget. Discover affordable options for dining, entertainment, travel, and more.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-white hover:text-[#E60023] transition-colors duration-200">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="text-white hover:text-[#E60023] transition-colors duration-200">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="text-white hover:text-[#E60023] transition-colors duration-200">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" className="text-white hover:text-[#E60023] transition-colors duration-200">
                <Linkedin className="h-5 w-5" />
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="font-montserrat font-semibold text-lg mb-6">Quick Links</h3>
            <ul className="space-y-3 font-opensans">
              <li><a href="#home" className="hover:text-[#E60023] transition-colors duration-200">Home</a></li>
              <li><a href="#offers" className="hover:text-[#E60023] transition-colors duration-200">Offers</a></li>
              <li><a href="#blog" className="hover:text-[#E60023] transition-colors duration-200">Blog</a></li>
              <li><a href="#about" className="hover:text-[#E60023] transition-colors duration-200">About Us</a></li>
              <li><a href="#contact" className="hover:text-[#E60023] transition-colors duration-200">Contact</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-montserrat font-semibold text-lg mb-6">Categories</h3>
            <ul className="space-y-3 font-opensans">
              <li><a href="#" className="hover:text-[#E60023] transition-colors duration-200">Restaurants & Cafés</a></li>
              <li><a href="#" className="hover:text-[#E60023] transition-colors duration-200">Attractions & Activities</a></li>
              <li><a href="#" className="hover:text-[#E60023] transition-colors duration-200">Accommodation</a></li>
              <li><a href="#" className="hover:text-[#E60023] transition-colors duration-200">Transport</a></li>
              <li><a href="#" className="hover:text-[#E60023] transition-colors duration-200">Shopping</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-montserrat font-semibold text-lg mb-6">Stay Updated</h3>
            <p className="font-opensans mb-4">
              Subscribe to get the latest deals and budget tips straight to your inbox.
            </p>
            <form className="mb-4">
              <div className="flex">
                <input 
                  type="email" 
                  placeholder="Your email" 
                  className="px-4 py-2 rounded-l-lg w-full focus:outline-none text-[#333333]"
                />
                <button 
                  type="submit" 
                  className="bg-[#E60023] hover:bg-red-700 px-4 py-2 rounded-r-lg transition-colors duration-200"
                  aria-label="Subscribe"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M22 2L11 13"></path>
                    <path d="M22 2L15 22L11 13L2 9L22 2Z"></path>
                  </svg>
                </button>
              </div>
            </form>
            <p className="text-sm font-opensans text-gray-400">
              We respect your privacy. Unsubscribe at any time.
            </p>
          </div>
        </div>
        
        <div className="border-t border-gray-700 pt-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-sm font-opensans text-gray-400 mb-4 md:mb-0">
              &copy; {new Date().getFullYear()} Luxembourg Pas Chère. All rights reserved.
            </p>
            <div className="flex space-x-4 text-sm font-opensans text-gray-400">
              <a href="#" className="hover:text-white transition-colors duration-200">Privacy Policy</a>
              <a href="#" className="hover:text-white transition-colors duration-200">Terms of Service</a>
              <a href="#" className="hover:text-white transition-colors duration-200">Cookie Policy</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
