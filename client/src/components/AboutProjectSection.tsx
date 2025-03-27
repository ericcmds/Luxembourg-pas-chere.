import React, { useState, useEffect, useRef, useCallback, KeyboardEvent } from 'react';
import { BookOpen, Target, Lightbulb, FileText, ChevronRight, Info } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

export default function AboutProjectSection() {
  const [activeTab, setActiveTab] = useState('about');
  const [tabChangedMessage, setTabChangedMessage] = useState('');
  const tabRefs = useRef<Record<string, HTMLButtonElement | null>>({});
  const tabListRef = useRef<HTMLDivElement>(null);
  const { t } = useLanguage();

  const tabData = {
    about: {
      title: "About",
      icon: <BookOpen className="h-5 w-5" />,
      content: "Luxembourg Pas Chère ist ein gemeinnütziges Projekt mit dem Ziel, erschwingliche Möglichkeiten in Luxemburg für alle zugänglich zu machen. Unser Ratgeber und diese Website sind darauf ausgerichtet, Menschen mit begrenztem Budget dabei zu helfen, qualitativ hochwertige Erfahrungen in Luxemburg zu genießen, ohne finanziell belastet zu werden."
    },
    target: {
      title: "Target Audience",
      icon: <Target className="h-5 w-5" />,
      content: "Unser Ratgeber richtet sich an verschiedene Zielgruppen: Familien mit begrenztem Budget, Neuankömmlinge in Luxemburg, Studenten, Senioren und alle, die nach kostengünstigen Alternativen suchen. Wir möchten jedem die Möglichkeit geben, das Leben in Luxemburg in vollen Zügen zu genießen, unabhängig von finanziellen Einschränkungen."
    },
    innovation: {
      title: "Innovation",
      icon: <Lightbulb className="h-5 w-5" />,
      content: "Was unseren Ratgeber einzigartig macht, ist die Kombination aus lokaler Expertise, gründlicher Recherche und echten Erfahrungen. Wir testen und bewerten persönlich jede Empfehlung, um sicherzustellen, dass wir authentische und wertvolle Informationen bereitstellen. Unser innovativer Ansatz umfasst auch digitale Ressourcen und regelmäßige Aktualisierungen."
    },
    content: {
      title: "Content",
      icon: <FileText className="h-5 w-5" />,
      content: "Der Ratgeber deckt verschiedene Bereiche des täglichen Lebens ab, einschließlich Essen, Wohnen, Ausgehen, Besichtigen und Einkaufen. Jeder Abschnitt enthält praktische Tipps, Empfehlungen und Ressourcen, die Ihnen helfen, Geld zu sparen, ohne auf Qualität zu verzichten. Darüber hinaus bieten wir saisonale Updates und Sonderangebote."
    }
  };

  // Array of tab IDs for keyboard navigation
  const tabIds = Object.keys(tabData);

  // Announce tab change to screen readers
  useEffect(() => {
    if (tabChangedMessage) {
      const timer = setTimeout(() => {
        setTabChangedMessage('');
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [tabChangedMessage]);

  // Handle tab click
  const handleTabClick = useCallback((tabId: string) => {
    if (activeTab !== tabId) {
      setActiveTab(tabId);
      tabRefs.current[tabId]?.focus();
      setTabChangedMessage(`Tab ${tabData[tabId as keyof typeof tabData].title} ausgewählt.`);
    }
  }, [activeTab, tabData]);

  // Handle keyboard navigation
  const handleKeyDown = useCallback((e: KeyboardEvent<HTMLDivElement>) => {
    const currentIndex = tabIds.indexOf(activeTab);
    let newIndex: number;

    switch (e.key) {
      case 'ArrowRight':
      case 'ArrowDown':
        e.preventDefault();
        newIndex = (currentIndex + 1) % tabIds.length;
        handleTabClick(tabIds[newIndex]);
        break;
      case 'ArrowLeft':
      case 'ArrowUp':
        e.preventDefault();
        newIndex = (currentIndex - 1 + tabIds.length) % tabIds.length;
        handleTabClick(tabIds[newIndex]);
        break;
      case 'Home':
        e.preventDefault();
        handleTabClick(tabIds[0]);
        break;
      case 'End':
        e.preventDefault();
        handleTabClick(tabIds[tabIds.length - 1]);
        break;
      default:
        break;
    }
  }, [activeTab, tabIds, handleTabClick]);

  // Register tab refs for focus management
  const registerTabRef = useCallback((tabId: string, ref: HTMLButtonElement | null) => {
    tabRefs.current[tabId] = ref;
  }, []);
  
  // Update active tab indicator position when tabs change or window resizes
  useEffect(() => {
    const updateIndicator = () => {
      // Let the DOM update before measuring positions
      requestAnimationFrame(() => {
        const activeTabElement = tabRefs.current[activeTab];
        if (activeTabElement && tabListRef.current) {
          // Recalculate because positions may change on resize
          const tabListRect = tabListRef.current.getBoundingClientRect();
          const activeTabRect = activeTabElement.getBoundingClientRect();
          
          // Set the CSS custom properties for the indicator
          tabListRef.current.style.setProperty(
            '--indicator-left', 
            `${activeTabRect.left - tabListRect.left}px`
          );
          tabListRef.current.style.setProperty(
            '--indicator-width', 
            `${activeTabRect.width}px`
          );
        }
      });
    };
    
    // Initial calculation
    updateIndicator();
    
    // Update on window resize
    window.addEventListener('resize', updateIndicator);
    return () => {
      window.removeEventListener('resize', updateIndicator);
    };
  }, [activeTab]);

  return (
    <section id="about-project" className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          {/* Badge */}
          <div className="inline-block px-4 py-1.5 rounded-full bg-pink-100 text-pink-800 font-medium text-sm mb-4">
            <span className="inline-flex items-center">
              <Info className="w-4 h-4 mr-1" />
              Projektdetails
            </span>
          </div>
          
          <h2 className="text-3xl md:text-4xl font-bold mb-3 text-gray-800">
            Über das <span className="text-[#E31837]">Projekt</span>
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Erfahren Sie mehr über die Vision und Mission hinter Luxembourg Pas Chère
          </p>
        </div>

        {/* Screen reader announcement for tab changes */}
        <div 
          role="status" 
          aria-live="polite" 
          className="sr-only"
        >
          {tabChangedMessage}
        </div>

        {/* Tab navigation instructions for screen reader users */}
        <div className="sr-only">
          Verwenden Sie die Pfeiltasten nach links und rechts, um zwischen den Tabs zu navigieren.
          Drücken Sie die Eingabetaste, um einen Tab auszuwählen.
        </div>

        {/* Accessible Tab Navigation */}
        <div 
          className="flex flex-wrap justify-center mb-8 border-b relative"
          role="tablist"
          ref={tabListRef}
          onKeyDown={handleKeyDown}
          aria-label="Projektinformationen"
          style={{
            '--indicator-left': tabRefs.current[activeTab]?.offsetLeft ? `${tabRefs.current[activeTab].offsetLeft}px` : '0',
            '--indicator-width': tabRefs.current[activeTab]?.offsetWidth ? `${tabRefs.current[activeTab].offsetWidth}px` : '0',
          } as React.CSSProperties}
        >
          {/* Slider indicator for active tab */}
          <div 
            className="absolute bottom-0 h-1 bg-[#E31837] transition-all duration-300"
            style={{
              left: 'var(--indicator-left)',
              width: 'var(--indicator-width)'
            }}
            aria-hidden="true"
          />

          {Object.entries(tabData).map(([key, value], index) => (
            <button
              key={key}
              id={`${key}-tab`}
              ref={(ref) => registerTabRef(key, ref)}
              onClick={() => handleTabClick(key)}
              className={`px-6 py-4 text-center transition-all duration-300 relative
                ${activeTab === key 
                  ? 'text-[#E31837] font-semibold' 
                  : 'text-gray-600 hover:text-gray-800'
                }
                focus:outline-none focus:ring-2 focus:ring-[#E31837] focus:ring-offset-2 rounded-t-lg
                md:px-8 md:text-base text-sm tab-button
              `}
              role="tab"
              aria-selected={activeTab === key}
              aria-controls={`${key}-panel`}
              tabIndex={activeTab === key ? 0 : -1}
              aria-posinset={index + 1}
              aria-setsize={Object.keys(tabData).length}
            >
              <span className="flex items-center justify-center gap-2">
                <span className={`transition-colors duration-300 ${activeTab === key ? 'text-[#E31837]' : 'text-gray-500'}`}>
                  {value.icon}
                </span>
                {value.title}
              </span>
            </button>
          ))}
        </div>

        {/* Tab Content with Enhanced Animation */}
        <div className="bg-white p-8 rounded-lg shadow-md max-w-4xl mx-auto transition-all duration-300 relative overflow-hidden">
          {Object.entries(tabData).map(([key, value]) => (
            <div
              key={key}
              id={`${key}-panel`}
              className={`transition-all duration-500 transform origin-top
                ${activeTab === key 
                  ? 'opacity-100 translate-x-0 scale-100' 
                  : 'opacity-0 absolute -left-full h-0 overflow-hidden scale-95'
                }`
              }
              role="tabpanel"
              aria-labelledby={`${key}-tab`}
              hidden={activeTab !== key}
              tabIndex={0}
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="text-[#E31837] p-3 bg-pink-50 rounded-full shadow-sm">
                  {value.icon}
                </div>
                <h3 className="text-2xl font-semibold text-gray-800">{value.title}</h3>
              </div>
              <p className="text-gray-600 leading-relaxed text-lg">
                {value.content}
              </p>
              {/* Read more link */}
              <div className="mt-6">
                <a 
                  href={`#detail-${key}`} 
                  className="inline-flex items-center text-[#E31837] hover:text-[#00A4E0] transition-colors duration-300 font-medium"
                >
                  Mehr erfahren
                  <ChevronRight className="ml-1 w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
                </a>
              </div>
            </div>
          ))}
        </div>

        {/* Mobile Tab Selection (Card View) */}
        <div className="mt-12 md:hidden">
          <h3 className="text-xl font-semibold mb-6 text-center text-gray-700">Schnellzugriff</h3>
          <div className="grid grid-cols-2 gap-4">
            {Object.entries(tabData).map(([key, value]) => (
              <button 
                key={key}
                className={`p-4 rounded-lg cursor-pointer transition-all duration-300
                  ${activeTab === key 
                    ? 'bg-[#E31837] text-white shadow-lg' 
                    : 'bg-white text-gray-600 shadow border border-gray-100 hover:border-[#E31837]'
                  }
                `}
                onClick={() => handleTabClick(key)}
                aria-label={`Wähle Tab ${value.title}`}
              >
                <div className="flex flex-col items-center text-center">
                  <div className={`mb-2 ${activeTab === key ? 'text-white' : 'text-[#E31837]'}`}>
                    {value.icon}
                  </div>
                  <span className="font-medium">{value.title}</span>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Desktop Information Cards with Interaction Indicators */}
        <div className="hidden md:grid grid-cols-2 lg:grid-cols-4 gap-6 mt-12">
          {Object.entries(tabData).map(([key, value]) => (
            <div 
              key={key}
              className={`bg-white p-5 rounded-lg shadow-sm cursor-pointer hover:shadow-md transition-all duration-300 relative group
                ${activeTab === key ? 'border-l-4 border-[#E31837]' : ''}
              `}
              onClick={() => handleTabClick(key)}
              tabIndex={0}
              role="button"
              aria-pressed={activeTab === key}
              aria-label={`Wähle Tab ${value.title}`}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  handleTabClick(key);
                }
              }}
            >
              <div className={`inline-flex items-center justify-center w-12 h-12 rounded-full mb-4 transition-all duration-300
                ${activeTab === key 
                  ? 'bg-[#E31837] text-white' 
                  : 'bg-pink-50 text-[#E31837] group-hover:bg-pink-100'
                }
              `}>
                {value.icon}
              </div>
              <h3 className="text-lg font-semibold mb-2">{value.title}</h3>
              <p className="text-gray-600 text-sm">
                {value.content.substring(0, 80)}...
              </p>
              {activeTab === key ? (
                <div className="mt-3 text-[#E31837] text-sm font-medium flex items-center">
                  <span className="mr-1">●</span> Aktiv
                </div>
              ) : (
                <div className="mt-3 text-transparent text-sm group-hover:text-[#00A4E0] transition-colors duration-300 flex items-center">
                  <span className="mr-1 opacity-0 group-hover:opacity-100">→</span> 
                  <span className="opacity-0 group-hover:opacity-100">Klicken zum Anzeigen</span>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}