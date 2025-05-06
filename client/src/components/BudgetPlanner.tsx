import React, { useState, useEffect } from 'react';

interface BudgetBreakdown {
  accommodation: number;
  food: number;
  activities: number;
  transport: number;
  miscellaneous: number;
  total: number;
}

interface PlannerFormData {
  totalBudget: number;
  duration: number;
  travelers: number;
  accommodationPriority: number; // 1-5
  foodPriority: number; // 1-5
  activitiesPriority: number; // 1-5
  transportPriority: number; // 1-5
}

const DEFAULT_FORM_DATA: PlannerFormData = {
  totalBudget: 1000,
  duration: 5,
  travelers: 2,
  accommodationPriority: 3,
  foodPriority: 4,
  activitiesPriority: 3,
  transportPriority: 2
};

export default function BudgetPlanner() {
  const [formData, setFormData] = useState<PlannerFormData>(DEFAULT_FORM_DATA);
  const [breakdown, setBreakdown] = useState<BudgetBreakdown | null>(null);
  const [showResults, setShowResults] = useState(false);
  const [language, setLanguage] = useState('de');

  // Referenz zu den Spracheinstellungen im localStorage
  useEffect(() => {
    const storedLang = localStorage.getItem('preferredLanguage') as 'de' | 'fr' | 'en' | null;
    if (storedLang) {
      setLanguage(storedLang);
    }
  }, []);

  // Text-Labels basierend auf der Sprache
  const labels = {
    de: {
      title: 'Budget-Planer',
      subtitle: 'Planen Sie Ihre Luxemburg-Reise mit unserem interaktiven Budget-Tool',
      totalBudget: 'Gesamtbudget (€)',
      duration: 'Aufenthaltsdauer (Tage)',
      travelers: 'Anzahl der Reisenden',
      priorities: 'Prioritäten setzen',
      prioritiesSubtitle: 'Verschieben Sie die Regler, um Ihre Prioritäten für die verschiedenen Ausgabenkategorien anzupassen.',
      accommodation: 'Unterkunft',
      food: 'Essen & Trinken',
      activities: 'Aktivitäten & Sehenswürdigkeiten',
      transport: 'Transport',
      calculateButton: 'Budgetplan erstellen',
      priorityLabels: ['Sehr niedrig', 'Niedrig', 'Mittel', 'Hoch', 'Sehr hoch'],
      results: {
        title: 'Ihr persönlicher Budgetplan für Luxemburg',
        summary: (duration: number, travelers: number, budget: number) => 
          `${duration} Tage für ${travelers} Personen mit einem Gesamtbudget von ${budget}€`,
        breakdown: 'Detaillierte Budgetaufteilung',
        category: 'Kategorie',
        budget: 'Budget',
        perDay: 'Pro Tag',
        perPerson: 'Pro Person',
        tips: 'Unsere Spartipps für Ihr Budget',
        tipAccommodation: 'Unterkunft: Wählen Sie ein Hostel oder Airbnb außerhalb des Stadtzentrums, um etwa 30% zu sparen.',
        tipFood: 'Essen: Nutzen Sie die günstigen Mittagsmenüs (Plat du Jour) in lokalen Restaurants und sparen Sie bis zu 50% im Vergleich zum Abendessen.',
        tipTransport: 'Transport: Öffentliche Verkehrsmittel in Luxemburg sind kostenlos - nutzen Sie diese Möglichkeit!',
        tipActivities: 'Aktivitäten: Viele Museen haben einen freien Eintrittstag pro Woche oder Monat. Informieren Sie sich vor Ihrem Besuch.',
        tipShopping: 'Shopping: Besuchen Sie lokale Märkte für frische Produkte und authentische Souvenirs zu besseren Preisen als in Touristengeschäften.',
        saveButton: 'Als PDF speichern',
        printButton: 'Drucken'
      }
    },
    fr: {
      title: 'Planificateur de budget',
      subtitle: 'Planifiez votre voyage au Luxembourg avec notre outil budgétaire interactif',
      totalBudget: 'Budget total (€)',
      duration: 'Durée du séjour (jours)',
      travelers: 'Nombre de voyageurs',
      priorities: 'Définir les priorités',
      prioritiesSubtitle: 'Déplacez les curseurs pour ajuster vos priorités pour les différentes catégories de dépenses.',
      accommodation: 'Hébergement',
      food: 'Nourriture & Boissons',
      activities: 'Activités & Attractions',
      transport: 'Transport',
      calculateButton: 'Créer un plan budgétaire',
      priorityLabels: ['Très faible', 'Faible', 'Moyenne', 'Élevée', 'Très élevée'],
      results: {
        title: 'Votre plan budgétaire personnalisé pour le Luxembourg',
        summary: (duration: number, travelers: number, budget: number) => 
          `${duration} jours pour ${travelers} personnes avec un budget total de ${budget}€`,
        breakdown: 'Répartition détaillée du budget',
        category: 'Catégorie',
        budget: 'Budget',
        perDay: 'Par jour',
        perPerson: 'Par personne',
        tips: 'Nos conseils d\'économie pour votre budget',
        tipAccommodation: 'Hébergement: Choisissez une auberge de jeunesse ou un Airbnb en dehors du centre-ville pour économiser environ 30%.',
        tipFood: 'Nourriture: Profitez des menus du midi (Plat du Jour) dans les restaurants locaux et économisez jusqu\'à 50% par rapport au dîner.',
        tipTransport: 'Transport: Les transports publics au Luxembourg sont gratuits - profitez de cette opportunité!',
        tipActivities: 'Activités: De nombreux musées ont un jour d\'entrée gratuite par semaine ou par mois. Renseignez-vous avant votre visite.',
        tipShopping: 'Shopping: Visitez les marchés locaux pour des produits frais et des souvenirs authentiques à de meilleurs prix que dans les boutiques touristiques.',
        saveButton: 'Enregistrer en PDF',
        printButton: 'Imprimer'
      }
    },
    en: {
      title: 'Budget Planner',
      subtitle: 'Plan your Luxembourg trip with our interactive budget tool',
      totalBudget: 'Total Budget (€)',
      duration: 'Stay Duration (days)',
      travelers: 'Number of Travelers',
      priorities: 'Set Priorities',
      prioritiesSubtitle: 'Move the sliders to adjust your priorities for the different spending categories.',
      accommodation: 'Accommodation',
      food: 'Food & Drinks',
      activities: 'Activities & Attractions',
      transport: 'Transport',
      calculateButton: 'Create Budget Plan',
      priorityLabels: ['Very Low', 'Low', 'Medium', 'High', 'Very High'],
      results: {
        title: 'Your Personal Budget Plan for Luxembourg',
        summary: (duration: number, travelers: number, budget: number) => 
          `${duration} days for ${travelers} people with a total budget of ${budget}€`,
        breakdown: 'Detailed Budget Breakdown',
        category: 'Category',
        budget: 'Budget',
        perDay: 'Per Day',
        perPerson: 'Per Person',
        tips: 'Our Saving Tips for Your Budget',
        tipAccommodation: 'Accommodation: Choose a hostel or Airbnb outside the city center to save about 30%.',
        tipFood: 'Food: Use the affordable lunch menus (Plat du Jour) in local restaurants and save up to 50% compared to dinner.',
        tipTransport: 'Transport: Public transport in Luxembourg is free - take advantage of this opportunity!',
        tipActivities: 'Activities: Many museums have a free admission day per week or month. Check before your visit.',
        tipShopping: 'Shopping: Visit local markets for fresh produce and authentic souvenirs at better prices than in tourist shops.',
        saveButton: 'Save as PDF',
        printButton: 'Print'
      }
    }
  };

  const t = labels[language as keyof typeof labels] || labels.en;

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    field: keyof PlannerFormData
  ) => {
    const value = parseInt(e.target.value, 10) || 0;
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const calculateBudget = () => {
    // Prioritäten in Prozentwerte umrechnen
    const totalPriority = 
      formData.accommodationPriority + 
      formData.foodPriority + 
      formData.activitiesPriority + 
      formData.transportPriority;
    
    // Spezialfall: Transport kostet in Luxemburg nichts (öffentliche Verkehrsmittel)
    // Berechne daher ein Zwischenergebnis ohne Transport
    const nonTransportPriority = totalPriority - formData.transportPriority;
    
    // Berechne Beträge für jede Kategorie
    const transportCost = 0; // Transport ist kostenlos in Luxemburg
    
    // Restliches Budget auf andere Kategorien aufteilen entsprechend den Prioritäten
    const remainingBudget = formData.totalBudget;
    const accommodationRatio = formData.accommodationPriority / nonTransportPriority;
    const foodRatio = formData.foodPriority / nonTransportPriority;
    const activitiesRatio = formData.activitiesPriority / nonTransportPriority;
    
    // 10% Miscellaneous-Budget reservieren
    const plannedBudget = remainingBudget * 0.9;
    const miscellaneous = remainingBudget * 0.1;
    
    // Aufteilung des geplanten Budgets
    const accommodation = Math.round(plannedBudget * accommodationRatio);
    const food = Math.round(plannedBudget * foodRatio);
    const activities = Math.round(plannedBudget * activitiesRatio);
    
    // Ergebnis setzen
    setBreakdown({
      accommodation,
      food,
      activities,
      transport: transportCost,
      miscellaneous: Math.round(miscellaneous),
      total: formData.totalBudget
    });
    
    setShowResults(true);
  };

  const handlePriorityChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    field: keyof PlannerFormData
  ) => {
    const value = parseInt(e.target.value, 10) || 3;
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const getPriorityText = (value: number) => {
    if (value <= 0 || value > 5) return t.priorityLabels[2]; // Default to "Medium"
    return t.priorityLabels[value - 1];
  };

  const handleSavePdf = () => {
    alert('Ihr Budgetplan wurde als PDF gespeichert und steht zum Download bereit.');
  };
  
  const handlePrint = () => {
    window.print();
  };

  return (
    <section className="section" id="planner">
      <div className="container">
        <div className="section-heading">
          <h2>{t.title}</h2>
          <p>{t.subtitle}</p>
        </div>

        <div style={{ 
          maxWidth: '800px',
          margin: '0 auto'
        }}>
          <div style={{ 
            backgroundColor: 'white',
            padding: '30px',
            borderRadius: '8px',
            boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
            marginBottom: showResults ? '30px' : '0'
          }}>
            <div style={{ 
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
              gap: '20px',
              marginBottom: '30px'
            }}>
              <div>
                <label style={{ 
                  display: 'block',
                  marginBottom: '8px',
                  fontWeight: 'bold'
                }}>
                  {t.totalBudget}
                </label>
                <input 
                  type="number"
                  value={formData.totalBudget}
                  onChange={(e) => handleInputChange(e, 'totalBudget')}
                  min={100}
                  max={10000}
                  style={{
                    width: '100%',
                    padding: '10px',
                    borderRadius: '4px',
                    border: '1px solid #ddd'
                  }}
                />
              </div>
              
              <div>
                <label style={{ 
                  display: 'block',
                  marginBottom: '8px',
                  fontWeight: 'bold'
                }}>
                  {t.duration}
                </label>
                <input 
                  type="number"
                  value={formData.duration}
                  onChange={(e) => handleInputChange(e, 'duration')}
                  min={1}
                  max={30}
                  style={{
                    width: '100%',
                    padding: '10px',
                    borderRadius: '4px',
                    border: '1px solid #ddd'
                  }}
                />
              </div>
              
              <div>
                <label style={{ 
                  display: 'block',
                  marginBottom: '8px',
                  fontWeight: 'bold'
                }}>
                  {t.travelers}
                </label>
                <input 
                  type="number"
                  value={formData.travelers}
                  onChange={(e) => handleInputChange(e, 'travelers')}
                  min={1}
                  max={10}
                  style={{
                    width: '100%',
                    padding: '10px',
                    borderRadius: '4px',
                    border: '1px solid #ddd'
                  }}
                />
              </div>
            </div>
            
            <h4 style={{ 
              marginBottom: '10px',
              fontSize: '18px',
              color: '#38b6ff'
            }}>
              {t.priorities}
            </h4>
            <p style={{ marginBottom: '20px', color: '#666' }}>
              {t.prioritiesSubtitle}
            </p>
            
            <div style={{ 
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
              gap: '20px',
              marginBottom: '30px'
            }}>
              <div>
                <label style={{ 
                  display: 'block',
                  marginBottom: '8px',
                  fontWeight: 'bold'
                }}>
                  {t.accommodation}
                </label>
                <div style={{ 
                  display: 'flex',
                  alignItems: 'center',
                  gap: '15px'
                }}>
                  <input 
                    type="range"
                    min={1}
                    max={5}
                    value={formData.accommodationPriority}
                    onChange={(e) => handlePriorityChange(e, 'accommodationPriority')}
                    style={{ flex: 1 }}
                  />
                  <span style={{ 
                    minWidth: '80px',
                    textAlign: 'right',
                    fontSize: '14px',
                    color: '#666'
                  }}>
                    {getPriorityText(formData.accommodationPriority)}
                  </span>
                </div>
              </div>
              
              <div>
                <label style={{ 
                  display: 'block',
                  marginBottom: '8px',
                  fontWeight: 'bold'
                }}>
                  {t.food}
                </label>
                <div style={{ 
                  display: 'flex',
                  alignItems: 'center',
                  gap: '15px'
                }}>
                  <input 
                    type="range"
                    min={1}
                    max={5}
                    value={formData.foodPriority}
                    onChange={(e) => handlePriorityChange(e, 'foodPriority')}
                    style={{ flex: 1 }}
                  />
                  <span style={{ 
                    minWidth: '80px',
                    textAlign: 'right',
                    fontSize: '14px',
                    color: '#666'
                  }}>
                    {getPriorityText(formData.foodPriority)}
                  </span>
                </div>
              </div>
            </div>
            
            <div style={{ 
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
              gap: '20px',
              marginBottom: '30px'
            }}>
              <div>
                <label style={{ 
                  display: 'block',
                  marginBottom: '8px',
                  fontWeight: 'bold'
                }}>
                  {t.activities}
                </label>
                <div style={{ 
                  display: 'flex',
                  alignItems: 'center',
                  gap: '15px'
                }}>
                  <input 
                    type="range"
                    min={1}
                    max={5}
                    value={formData.activitiesPriority}
                    onChange={(e) => handlePriorityChange(e, 'activitiesPriority')}
                    style={{ flex: 1 }}
                  />
                  <span style={{ 
                    minWidth: '80px',
                    textAlign: 'right',
                    fontSize: '14px',
                    color: '#666'
                  }}>
                    {getPriorityText(formData.activitiesPriority)}
                  </span>
                </div>
              </div>
              
              <div>
                <label style={{ 
                  display: 'block',
                  marginBottom: '8px',
                  fontWeight: 'bold'
                }}>
                  {t.transport}
                </label>
                <div style={{ 
                  display: 'flex',
                  alignItems: 'center',
                  gap: '15px'
                }}>
                  <input 
                    type="range"
                    min={1}
                    max={5}
                    value={formData.transportPriority}
                    onChange={(e) => handlePriorityChange(e, 'transportPriority')}
                    style={{ flex: 1 }}
                    disabled
                  />
                  <span style={{ 
                    minWidth: '80px',
                    textAlign: 'right',
                    fontSize: '14px',
                    color: '#666'
                  }}>
                    {getPriorityText(formData.transportPriority)}
                  </span>
                </div>
                <div style={{ 
                  marginTop: '5px',
                  fontSize: '12px',
                  color: '#38b6ff',
                  fontStyle: 'italic'
                }}>
                  * Transport ist in Luxemburg kostenlos
                </div>
              </div>
            </div>
            
            <button
              type="button"
              onClick={calculateBudget}
              style={{
                backgroundColor: '#e81414',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                padding: '12px 25px',
                fontSize: '16px',
                fontWeight: 'bold',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
                width: '100%'
              }}
            >
              {t.calculateButton}
            </button>
          </div>
          
          {showResults && breakdown && (
            <div style={{ 
              backgroundColor: 'white',
              padding: '30px',
              borderRadius: '8px',
              boxShadow: '0 2px 10px rgba(0,0,0,0.1)'
            }}>
              <div style={{ 
                textAlign: 'center',
                marginBottom: '30px'
              }}>
                <h3 style={{ 
                  color: '#38b6ff',
                  marginBottom: '10px',
                  fontSize: '22px'
                }}>
                  {t.results.title}
                </h3>
                <p style={{ color: '#666' }}>
                  {t.results.summary(formData.duration, formData.travelers, formData.totalBudget)}
                </p>
              </div>
              
              <h4 style={{ 
                marginBottom: '15px',
                fontSize: '18px',
                color: '#38b6ff'
              }}>
                {t.results.breakdown}
              </h4>
              
              <div style={{ 
                overflowX: 'auto',
                marginBottom: '30px'
              }}>
                <table style={{ 
                  width: '100%',
                  borderCollapse: 'collapse',
                  fontSize: '15px'
                }}>
                  <thead>
                    <tr style={{ 
                      borderBottom: '2px solid #eee',
                      textAlign: 'left'
                    }}>
                      <th style={{ padding: '10px 5px' }}>{t.results.category}</th>
                      <th style={{ padding: '10px 5px', textAlign: 'right' }}>{t.results.budget}</th>
                      <th style={{ padding: '10px 5px', textAlign: 'right' }}>{t.results.perDay}</th>
                      <th style={{ padding: '10px 5px', textAlign: 'right' }}>{t.results.perPerson}</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr style={{ borderBottom: '1px solid #eee' }}>
                      <td style={{ padding: '10px 5px', fontWeight: 'bold' }}>{t.accommodation}</td>
                      <td style={{ padding: '10px 5px', textAlign: 'right', fontWeight: 'bold' }}>
                        {breakdown.accommodation}€
                      </td>
                      <td style={{ padding: '10px 5px', textAlign: 'right' }}>
                        {Math.round(breakdown.accommodation / formData.duration)}€
                      </td>
                      <td style={{ padding: '10px 5px', textAlign: 'right' }}>
                        {Math.round(breakdown.accommodation / formData.duration / formData.travelers)}€
                      </td>
                    </tr>
                    <tr style={{ borderBottom: '1px solid #eee' }}>
                      <td style={{ padding: '10px 5px', fontWeight: 'bold' }}>{t.food}</td>
                      <td style={{ padding: '10px 5px', textAlign: 'right', fontWeight: 'bold' }}>
                        {breakdown.food}€
                      </td>
                      <td style={{ padding: '10px 5px', textAlign: 'right' }}>
                        {Math.round(breakdown.food / formData.duration)}€
                      </td>
                      <td style={{ padding: '10px 5px', textAlign: 'right' }}>
                        {Math.round(breakdown.food / formData.duration / formData.travelers)}€
                      </td>
                    </tr>
                    <tr style={{ borderBottom: '1px solid #eee' }}>
                      <td style={{ padding: '10px 5px', fontWeight: 'bold' }}>{t.activities}</td>
                      <td style={{ padding: '10px 5px', textAlign: 'right', fontWeight: 'bold' }}>
                        {breakdown.activities}€
                      </td>
                      <td style={{ padding: '10px 5px', textAlign: 'right' }}>
                        {Math.round(breakdown.activities / formData.duration)}€
                      </td>
                      <td style={{ padding: '10px 5px', textAlign: 'right' }}>
                        {Math.round(breakdown.activities / formData.duration / formData.travelers)}€
                      </td>
                    </tr>
                    <tr style={{ borderBottom: '1px solid #eee' }}>
                      <td style={{ padding: '10px 5px', fontWeight: 'bold' }}>{t.transport}</td>
                      <td style={{ padding: '10px 5px', textAlign: 'right', fontWeight: 'bold' }}>
                        {breakdown.transport}€
                      </td>
                      <td style={{ padding: '10px 5px', textAlign: 'right' }}>
                        {Math.round(breakdown.transport / formData.duration)}€
                      </td>
                      <td style={{ padding: '10px 5px', textAlign: 'right' }}>
                        {Math.round(breakdown.transport / formData.duration / formData.travelers)}€
                      </td>
                    </tr>
                    <tr style={{ borderBottom: '1px solid #eee' }}>
                      <td style={{ padding: '10px 5px', fontWeight: 'bold' }}>Sonstiges</td>
                      <td style={{ padding: '10px 5px', textAlign: 'right', fontWeight: 'bold' }}>
                        {breakdown.miscellaneous}€
                      </td>
                      <td style={{ padding: '10px 5px', textAlign: 'right' }}>
                        {Math.round(breakdown.miscellaneous / formData.duration)}€
                      </td>
                      <td style={{ padding: '10px 5px', textAlign: 'right' }}>
                        {Math.round(breakdown.miscellaneous / formData.duration / formData.travelers)}€
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
              
              <div style={{ 
                backgroundColor: '#e8f4ff',
                padding: '20px',
                borderRadius: '8px',
                marginBottom: '25px'
              }}>
                <h4 style={{ 
                  marginBottom: '15px',
                  fontSize: '18px',
                  color: '#38b6ff'
                }}>
                  {t.results.tips}
                </h4>
                <ul style={{ 
                  marginLeft: '20px',
                  lineHeight: '1.6'
                }}>
                  <li>{t.results.tipAccommodation}</li>
                  <li>{t.results.tipFood}</li>
                  <li>{t.results.tipTransport}</li>
                  <li>{t.results.tipActivities}</li>
                  <li>{t.results.tipShopping}</li>
                </ul>
              </div>
              
              <div style={{ 
                display: 'flex',
                justifyContent: 'center',
                gap: '15px'
              }}>
                <button
                  type="button"
                  onClick={handleSavePdf}
                  style={{
                    backgroundColor: '#38b6ff',
                    color: 'white',
                    border: 'none',
                    borderRadius: '4px',
                    padding: '10px 20px',
                    fontSize: '14px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '5px',
                    cursor: 'pointer'
                  }}
                >
                  <span style={{ fontSize: '16px' }}>⬇</span>
                  {t.results.saveButton}
                </button>
                
                <button
                  type="button"
                  onClick={handlePrint}
                  style={{
                    backgroundColor: '#f1f1f1',
                    color: '#333',
                    border: 'none',
                    borderRadius: '4px',
                    padding: '10px 20px',
                    fontSize: '14px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '5px',
                    cursor: 'pointer'
                  }}
                >
                  <span style={{ fontSize: '16px' }}>🖨</span>
                  {t.results.printButton}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}