import { useState, useEffect, useRef, useCallback, KeyboardEvent } from 'react';
import { BookOpen, Target, Lightbulb, FileText } from 'lucide-react';

export default function AboutProjectSection() {
  const [activeTab, setActiveTab] = useState('about');
  const tabRefs = useRef<Record<string, HTMLButtonElement | null>>({});
  const tabListRef = useRef<HTMLDivElement>(null);

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

  // Handle tab click
  const handleTabClick = useCallback((tabId: string) => {
    setActiveTab(tabId);
    tabRefs.current[tabId]?.focus();
  }, []);

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

  return (
    <section id="about-project" className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-3 text-gray-800">
            Über das <span className="text-[#E31837]">Projekt</span>
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Erfahren Sie mehr über die Vision und Mission hinter Luxembourg Pas Chère
          </p>
        </div>

        {/* Accessible Tab Navigation */}
        <div 
          className="flex flex-wrap justify-center mb-8 border-b"
          role="tablist"
          ref={tabListRef}
          onKeyDown={handleKeyDown}
          aria-label="Projektinformationen"
        >
          {Object.entries(tabData).map(([key, value]) => (
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
                md:px-8 md:text-base text-sm
              `}
              role="tab"
              aria-selected={activeTab === key}
              aria-controls={`${key}-panel`}
              tabIndex={activeTab === key ? 0 : -1}
            >
              <span className="flex items-center justify-center gap-2">
                <span className={activeTab === key ? 'text-[#E31837]' : 'text-gray-500'}>
                  {value.icon}
                </span>
                {value.title}
              </span>
              {/* Active tab indicator */}
              {activeTab === key && (
                <span 
                  className="absolute bottom-0 left-0 w-full h-1 bg-[#E31837]"
                  aria-hidden="true"
                />
              )}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <div className="bg-white p-8 rounded-lg shadow-md max-w-4xl mx-auto transition-all duration-300">
          {Object.entries(tabData).map(([key, value]) => (
            <div
              key={key}
              id={`${key}-panel`}
              className={`transition-all duration-500 transform 
                ${activeTab === key 
                  ? 'opacity-100 translate-x-0' 
                  : 'opacity-0 absolute -left-full h-0 overflow-hidden'
                }`
              }
              role="tabpanel"
              aria-labelledby={`${key}-tab`}
              hidden={activeTab !== key}
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="text-[#E31837] p-2 bg-pink-50 rounded-full">
                  {value.icon}
                </div>
                <h3 className="text-2xl font-semibold text-gray-800">{value.title}</h3>
              </div>
              <p className="text-gray-600 leading-relaxed text-lg">
                {value.content}
              </p>
            </div>
          ))}
        </div>

        {/* Mobile Tab Selection (Card View) */}
        <div className="mt-12 md:hidden">
          <h3 className="text-xl font-semibold mb-6 text-center text-gray-700">Schnellzugriff</h3>
          <div className="grid grid-cols-2 gap-4">
            {Object.entries(tabData).map(([key, value]) => (
              <div 
                key={key}
                className={`p-4 rounded-lg cursor-pointer transition-all duration-300
                  ${activeTab === key 
                    ? 'bg-[#E31837] text-white shadow-lg' 
                    : 'bg-white text-gray-600 shadow border border-gray-100'
                  }
                `}
                onClick={() => handleTabClick(key)}
              >
                <div className="flex flex-col items-center text-center">
                  <div className={`mb-2 ${activeTab === key ? 'text-white' : 'text-[#E31837]'}`}>
                    {value.icon}
                  </div>
                  <span className="font-medium">{value.title}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Desktop Information Cards */}
        <div className="hidden md:grid grid-cols-2 lg:grid-cols-4 gap-6 mt-12">
          {Object.entries(tabData).map(([key, value]) => (
            <div 
              key={key}
              className={`bg-white p-5 rounded-lg shadow-sm cursor-pointer hover:shadow-md transition-all duration-300
                ${activeTab === key ? 'border-l-4 border-[#E31837]' : ''}
              `}
              onClick={() => handleTabClick(key)}
            >
              <div className={`inline-flex items-center justify-center w-12 h-12 rounded-full mb-4
                ${activeTab === key 
                  ? 'bg-[#E31837] text-white' 
                  : 'bg-pink-50 text-[#E31837]'
                }
              `}>
                {value.icon}
              </div>
              <h3 className="text-lg font-semibold mb-2">{value.title}</h3>
              <p className="text-gray-600 text-sm">
                {value.content.substring(0, 80)}...
              </p>
              {activeTab === key && (
                <div className="mt-3 text-[#E31837] text-sm font-medium">
                  Aktiv
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Custom JavaScript for Tab Behavior */}
      <script dangerouslySetInnerHTML={{
        __html: `
          document.addEventListener('DOMContentLoaded', () => {
            const tabButtons = document.querySelectorAll('[role="tab"]');
            const tabPanels = document.querySelectorAll('[role="tabpanel"]');
            
            // Add click handler to each tab
            tabButtons.forEach(button => {
              button.addEventListener('click', () => {
                const tabId = button.getAttribute('aria-controls');
                
                // Hide all panels and deselect all tabs
                tabPanels.forEach(panel => {
                  panel.setAttribute('hidden', 'true');
                });
                tabButtons.forEach(btn => {
                  btn.setAttribute('aria-selected', 'false');
                  btn.setAttribute('tabindex', '-1');
                });
                
                // Show selected panel and select clicked tab
                document.getElementById(tabId)?.removeAttribute('hidden');
                button.setAttribute('aria-selected', 'true');
                button.setAttribute('tabindex', '0');
              });
            });
          });
        `
      }} />
    </section>
  );
}