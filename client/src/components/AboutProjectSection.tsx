import { useState } from 'react';
import { BookOpen, Target, Lightbulb, FileText } from 'lucide-react';

export default function AboutProjectSection() {
  const [activeTab, setActiveTab] = useState('about');

  const handleTabClick = (tabId: string) => {
    setActiveTab(tabId);
  };

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

  return (
    <section id="about-project" className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-3 text-gray-800">
            Über das <span className="text-blue-600">Projekt</span>
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Erfahren Sie mehr über die Vision und Mission hinter Luxembourg Pas Chère
          </p>
        </div>

        {/* Tab Navigation */}
        <div className="flex flex-wrap justify-center gap-2 mb-8">
          {Object.entries(tabData).map(([key, value]) => (
            <button
              key={key}
              onClick={() => handleTabClick(key)}
              className={`px-4 py-2 rounded-full transition-all duration-300 ${
                activeTab === key 
                ? 'bg-blue-600 text-white shadow-lg transform scale-105' 
                : 'bg-white text-gray-600 hover:bg-gray-100'
              }`}
              aria-selected={activeTab === key}
              role="tab"
            >
              <span className="flex items-center gap-2">
                {value.icon}
                {value.title}
              </span>
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <div className="bg-white p-8 rounded-lg shadow-md max-w-4xl mx-auto">
          {Object.entries(tabData).map(([key, value]) => (
            <div
              key={key}
              className={`transition-opacity duration-300 ${
                activeTab === key ? 'block' : 'hidden'
              }`}
              role="tabpanel"
              aria-labelledby={`${key}-tab`}
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="text-blue-600">{value.icon}</div>
                <h3 className="text-2xl font-semibold text-gray-800">{value.title}</h3>
              </div>
              <p className="text-gray-600 leading-relaxed">{value.content}</p>
            </div>
          ))}
        </div>
          ))}
        </div>

        {/* Tab Content */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          {Object.entries(tabData).map(([key, value]) => (
            <div 
              key={key}
              className={`tab-content ${activeTab === key ? 'block' : 'hidden'}`}
              role="tabpanel"
            >
              <div className="flex items-center mb-4">
                <div className="bg-blue-100 p-3 rounded-full text-blue-600 mr-4">
                  {value.icon}
                </div>
                <h3 className="text-xl font-semibold">{value.title}</h3>
              </div>
              <p className="text-gray-700 leading-relaxed">
                {value.content}
              </p>
            </div>
          ))}
        </div>

        {/* Additional Information Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-12">
          {Object.entries(tabData).map(([key, value]) => (
            <div 
              key={key}
              className="bg-white p-5 rounded-lg shadow-sm cursor-pointer hover:shadow-md transition-shadow"
              onClick={() => handleTabClick(key)}
            >
              <div className={`inline-flex items-center justify-center w-12 h-12 rounded-full ${
                activeTab === key ? 'bg-blue-500 text-white' : 'bg-blue-100 text-blue-500'
              } mb-4 transition-all duration-300`}>
                {value.icon}
              </div>
              <h3 className="text-lg font-semibold mb-2">{value.title}</h3>
              <p className="text-gray-600 text-sm">
                {value.content.substring(0, 80)}...
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}