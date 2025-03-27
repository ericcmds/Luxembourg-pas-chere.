import { Button } from "@/components/ui/button";
import {
  Percent,
  BookOpen,
  MapPin,
  Tag,
  PiggyBank,
  Euro,
  Sparkles,
  Coffee
} from "lucide-react";

import { useEffect, useState, useRef, createContext, useContext, KeyboardEvent } from 'react';

// Translation context
const TranslationContext = createContext<{ t: (key: string) => string }>({ t: (key) => key });

// Translation hook (placeholder implementation)
const useTranslation = () => {
  const { t } = useContext(TranslationContext);
  return { t };
};

// Placeholder translations (replace with actual translations)
const translations = {
  en: {
    heroTitle: "Welcome to",
    heroTitleHighlight: "Luxembourg Pas Chère",
    heroSubtitle: "Your ultimate guide to enjoying Luxembourg's beauty, culture, and cuisine on a budget.",
    getStarted: "Discover Now",
    learnMore: "Learn More",
    averageSavings: "Average savings",
    moneySavingTips: "Money-saving tips",
    hiddenSpots: "Hidden spots",
    annualSavings: "Annual savings",
    localSecrets: "Local secrets",
    exclusiveDeals: "Exclusive deals",
    budgetFriendly: "Budget friendly",
    specialOffers: "Special offers"
  },
  fr: {
    heroTitle: "Bienvenue à",
    heroTitleHighlight: "Luxembourg Pas Chère",
    heroSubtitle: "Votre guide ultime pour profiter de la beauté, de la culture et de la gastronomie du Luxembourg à petit prix.",
    getStarted: "Découvrir maintenant",
    learnMore: "En savoir plus",
    averageSavings: "Économies moyennes",
    moneySavingTips: "Conseils d'économie",
    hiddenSpots: "Lieux secrets",
    annualSavings: "Économies annuelles",
    localSecrets: "Secrets locaux",
    exclusiveDeals: "Offres exclusives",
    budgetFriendly: "Économique",
    specialOffers: "Offres spéciales"
  },
  de: {
    heroTitle: "Willkommen bei",
    heroTitleHighlight: "Luxembourg Pas Chère",
    heroSubtitle: "Ihr umfassender Leitfaden für erschwingliche Erlebnisse im Herzen Europas.",
    getStarted: "Jetzt entdecken",
    learnMore: "Mehr erfahren",
    averageSavings: "Durchschnittliche Einsparungen",
    moneySavingTips: "Spartipps",
    hiddenSpots: "Versteckte Orte",
    annualSavings: "Jährliche Einsparungen",
    localSecrets: "Lokale Geheimtipps",
    exclusiveDeals: "Exklusive Angebote",
    budgetFriendly: "Budgetfreundlich",
    specialOffers: "Spezielle Angebote"
  }
};

// Stats data 
const statsData = [
  {
    id: 'savings',
    value: '40%',
    label: 'averageSavings',
    icon: <Percent />,
    color: 'from-[#E31837]/80 to-[#E31837]/60'
  },
  {
    id: 'tips',
    value: '500+',
    label: 'moneySavingTips',
    icon: <BookOpen />,
    color: 'from-[#00A4E0]/80 to-[#00A4E0]/60'
  },
  {
    id: 'spots',
    value: '100+',
    label: 'hiddenSpots',
    icon: <MapPin />,
    color: 'from-[#E31837]/80 to-[#00A4E0]/60'
  },
  {
    id: 'annual',
    value: '€1000+',
    label: 'annualSavings',
    icon: <PiggyBank />,
    color: 'from-[#00A4E0]/80 to-[#E31837]/60'
  }
];

// Feature data
const featureData = [
  {
    id: 'local',
    label: 'localSecrets',
    icon: <MapPin />
  },
  {
    id: 'deals',
    label: 'exclusiveDeals',
    icon: <Tag />
  },
  {
    id: 'budget',
    label: 'budgetFriendly',
    icon: <Euro />
  },
  {
    id: 'offers',
    label: 'specialOffers',
    icon: <Sparkles />
  }
];

export default function HeroSection() {
  const [scrollY, setScrollY] = useState(0);
  const [activeKey, setActiveKey] = useState<string | null>(null);
  const heroRef = useRef<HTMLElement>(null);
  const buttonRef = useRef<HTMLAnchorElement>(null);
  const { t } = useTranslation();
  const language = 'de'; // Using German as default for now

  // Track scroll position for parallax effect
  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Calculate parallax transformations
  const calculateParallax = (factor: number) => {
    return scrollY * factor;
  };

  // Handle key nav for features
  const handleKeyDown = (e: KeyboardEvent<HTMLDivElement>, id: string) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      setActiveKey(id === activeKey ? null : id);
    }
  };

  return (
    <section
      id="home"
      ref={heroRef}
      className="relative min-h-[90vh] bg-gradient-to-br from-gray-900 to-gray-800 text-white overflow-hidden"
      aria-labelledby="hero-heading"
    >
      {/* Background Image with Overlay */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ 
          backgroundImage: `url('https://images.unsplash.com/photo-1587974928442-77dc3e0dba72?q=80&w=1470&auto=format&fit=crop')`,
          transform: `translateY(${calculateParallax(0.05)}px)`
        }}
        aria-hidden="true"
      ></div>
      <div 
        className="absolute inset-0 bg-gradient-to-r from-[#E31837]/90 to-[#00A4E0]/80 mix-blend-multiply"
        aria-hidden="true"
      ></div>
      <div 
        className="absolute inset-0 bg-black opacity-40"
        aria-hidden="true"
      ></div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-24 md:py-32 relative z-10">
        <div
          className="max-w-4xl mx-auto"
          style={{ transform: `translateY(${calculateParallax(-0.1)}px)` }}
        >
          {/* Two-tone Title */}
          <div className="mb-6 relative">
            <span className="block text-white/90 text-2xl md:text-3xl font-medium mb-2 font-montserrat">
              {t(translations[language].heroTitle)}
            </span>
            <h1 id="hero-heading" className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-montserrat font-extrabold leading-tight">
              <span className="text-[#E31837] inline-block mr-2">Luxembourg</span>
              <span className="text-[#00A4E0] inline-block">Pas Chère</span>
            </h1>
            <div className="absolute -right-6 -top-6 text-5xl text-[#E31837] font-bold opacity-80">
              €
            </div>
          </div>

          {/* Enhanced Subtitle */}
          <p className="text-xl md:text-2xl mb-8 font-opensans font-medium text-white/90 max-w-3xl leading-relaxed">
            {t(translations[language].heroSubtitle)}
          </p>

          {/* Statistics Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
            {statsData.map((stat) => (
              <div 
                key={stat.id}
                className={`bg-gradient-to-br ${stat.color} backdrop-blur-sm rounded-lg p-4 
                  border border-white/20 shadow-xl transition-all duration-300
                  hover:shadow-2xl hover:scale-105 hover:border-white/40`}
              >
                <div className="flex items-center">
                  <div className="bg-white/30 p-3 rounded-full mr-4">
                    <span className="text-white w-6 h-6 block">
                      {stat.icon}
                    </span>
                  </div>
                  <div>
                    <p className="text-3xl font-bold text-white">{stat.value}</p>
                    <p className="text-sm text-white/90 font-medium">{t(translations[language][stat.label as keyof typeof translations.de])}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Interactive Feature Badges */}
          <div className="flex flex-wrap gap-3 md:gap-4 mb-10 justify-center md:justify-start">
            {featureData.map((feature) => (
              <div 
                key={feature.id}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => handleKeyDown(e, feature.id)}
                onClick={() => setActiveKey(feature.id === activeKey ? null : feature.id)}
                className={`
                  ${activeKey === feature.id 
                    ? 'bg-white text-[#E31837] shadow-lg ring-2 ring-[#E31837]/40' 
                    : 'bg-white/15 text-white hover:bg-white/25'
                  }
                  backdrop-blur-sm rounded-full px-4 py-2 flex items-center 
                  transition-all duration-300 transform hover:scale-105
                  cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#00A4E0]/60
                `}
                aria-pressed={activeKey === feature.id}
              >
                <span className={`w-5 h-5 mr-2 ${activeKey === feature.id ? 'text-[#E31837]' : 'text-white'}`}>
                  {feature.icon}
                </span>
                <span className="text-lg font-medium">
                  {t(translations[language][feature.label as keyof typeof translations.de])}
                </span>
              </div>
            ))}
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
            <Button
              asChild
              size="lg"
              className="bg-[#E31837] text-white hover:bg-[#c01530] font-montserrat font-semibold 
                px-8 py-6 rounded-full shadow-lg transform transition-all duration-300 
                hover:scale-105 hover:shadow-xl focus:ring-2 focus:ring-[#E31837]/50
                focus:outline-none text-lg"
            >
              <a 
                href="#offers" 
                aria-label="Discover money-saving offers now"
                ref={buttonRef}
              >
                {t(translations[language].getStarted)}
              </a>
            </Button>
            <Button
              asChild
              variant="outline"
              size="lg"
              className="bg-transparent border-2 border-white text-white 
                hover:bg-white hover:text-[#00A4E0] font-montserrat font-semibold 
                px-8 py-6 rounded-full transition-all duration-300
                hover:shadow-lg focus:ring-2 focus:ring-white/50
                focus:outline-none text-lg"
            >
              <a href="#contact">
                {t(translations[language].learnMore)}
              </a>
            </Button>
          </div>
        </div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute bottom-4 right-4 opacity-30 animate-pulse">
        <Coffee className="w-8 h-8 text-white" aria-hidden="true" />
      </div>
      <div className="absolute top-1/4 left-10 opacity-20 hidden md:block">
        <div className="w-24 h-24 rounded-full border-4 border-white/30" aria-hidden="true"></div>
      </div>
      <div className="absolute bottom-1/3 right-12 opacity-20 hidden md:block">
        <div className="w-16 h-16 rounded-full border-4 border-[#00A4E0]/50" aria-hidden="true"></div>
      </div>
    </section>
  );
}

function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguage] = useState('de'); // Default language
  const contextValue = { 
    t: (key: string) => {
      try {
        return (translations[language as keyof typeof translations] as Record<string, string>)[key] || key;
      } catch (error) {
        return key;
      }
    } 
  };
  return (
    <TranslationContext.Provider value={contextValue}>
      {children}
    </TranslationContext.Provider>
  );
}

export {LanguageProvider, useTranslation};