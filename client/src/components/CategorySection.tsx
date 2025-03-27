import { Utensils, ShoppingBag, Ticket, Bed, ChevronRight } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

interface Category {
  id: string;
  icon: React.ReactNode;
  title: string;
  description: string;
  href: string;
  color: string;
  bgColor: string;
}

export default function CategorySection() {
  const { t } = useLanguage();
  
  const categories: Category[] = [
    {
      id: 'restaurants',
      icon: <Utensils strokeWidth={1.5} size={32} />,
      title: "Restaurants",
      description: "Entdecken Sie kostengünstige Restaurants",
      href: "#restaurants",
      color: "#20c997", // Türkis
      bgColor: "#e6f9f5", // Leichtes Türkis für Hintergrund
    },
    {
      id: 'shopping',
      icon: <ShoppingBag strokeWidth={1.5} size={32} />,
      title: "Shopping",
      description: "Finden Sie die besten Einkaufsangebote",
      href: "#shopping",
      color: "#e83e8c", // Rosa
      bgColor: "#fceef3", // Leichtes Rosa für Hintergrund
    },
    {
      id: 'activities',
      icon: <Ticket strokeWidth={1.5} size={32} />,
      title: "Aktivitäten",
      description: "Freizeitaktivitäten zu günstigen Preisen",
      href: "#activities",
      color: "#00A4E0", // Hellblau
      bgColor: "#e6f6fc", // Leichtes Blau für Hintergrund
    },
    {
      id: 'accommodation',
      icon: <Bed strokeWidth={1.5} size={32} />,
      title: "Unterkunft",
      description: "Preiswerte Übernachtungsmöglichkeiten",
      href: "#accommodation",
      color: "#E31837", // Rot
      bgColor: "#fceaed", // Leichtes Rot für Hintergrund
    },
  ];

  return (
    <section id="category" className="py-16 bg-gray-50" aria-labelledby="category-heading">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center mb-12">
          <div className="inline-flex items-center justify-center px-4 py-1.5 mb-4 rounded-full bg-blue-100 text-blue-600 font-medium text-sm">
            <span className="mr-2">●</span> Entdecken Sie Luxemburg
          </div>
          <h2 
            id="category-heading" 
            className="text-3xl md:text-4xl font-montserrat font-bold mb-4 text-lux-dark"
          >
            Wonach suchen Sie?
          </h2>
          <p className="text-gray-600 md:text-lg">
            Erkunden Sie ganz Luxemburg mit unseren budgetfreundlichen Empfehlungen
          </p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {categories.map((category) => (
            <a 
              key={category.id}
              href={category.href}
              className="group block"
              aria-label={`Entdecken Sie ${category.title}`}
            >
              <div 
                className="bg-white rounded-2xl overflow-hidden shadow-md transition-all duration-300 
                  hover:shadow-xl hover:-translate-y-2 h-full relative category-card"
              >
                {/* Category Header with gradient background */}
                <div 
                  className="p-6 pb-2 relative"
                  style={{ backgroundColor: category.bgColor }}
                >
                  <div 
                    className="w-16 h-16 flex items-center justify-center rounded-xl mb-4"
                    style={{ backgroundColor: 'white', color: category.color }}
                  >
                    {category.icon}
                  </div>
                  
                  <h3 className="text-xl font-montserrat font-semibold text-gray-800 mb-1">
                    {category.title}
                  </h3>
                </div>
                
                {/* Category content */}
                <div className="p-6 pt-2">
                  <p className="text-gray-600 text-sm mb-4">
                    {category.description}
                  </p>
                  
                  <div className="flex items-center text-sm font-medium mt-auto">
                    <span 
                      className="text-lux-red group-hover:text-lux-blue transition-colors duration-300"
                      style={{ color: category.color }}
                    >
                      Mehr entdecken
                    </span>
                    <ChevronRight 
                      className="ml-1 w-4 h-4 transition-transform duration-300 
                        group-hover:translate-x-1"
                      style={{ color: category.color }}
                    />
                  </div>
                </div>

                {/* Bottom accent bar */}
                <div 
                  className="absolute bottom-0 left-0 w-full h-1.5 transform scale-x-0 origin-left
                    group-hover:scale-x-100 transition-transform duration-300"
                  style={{ backgroundColor: category.color }}
                ></div>
              </div>
            </a>
          ))}
        </div>

        {/* Additional Categories Button */}
        <div className="text-center mt-12">
          <a 
            href="#all-categories" 
            className="inline-flex items-center justify-center px-6 py-3 border-2 
              border-[#00A4E0] text-[#00A4E0] font-montserrat font-medium rounded-full
              hover:bg-[#00A4E0] hover:text-white transition-colors duration-300
              focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#00A4E0]"
            aria-label="Alle Kategorie anzeigen"
          >
            Alle Kategorien anzeigen
          </a>
        </div>
      </div>
    </section>
  );
}
