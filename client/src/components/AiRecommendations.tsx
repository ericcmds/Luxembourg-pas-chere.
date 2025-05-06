import React, { useState, useRef, useEffect } from 'react';

interface AiRecommendation {
  id: number;
  prompt: string;
  response: string;
  category: string;
  timestamp: string;
}

export default function AiRecommendations() {
  const [prompt, setPrompt] = useState('');
  const [category, setCategory] = useState('accommodation');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [recommendation, setRecommendation] = useState<string | null>(null);
  const [sessionId, setSessionId] = useState('');
  const [pastRecommendations, setPastRecommendations] = useState<AiRecommendation[]>([]);
  const [showHistory, setShowHistory] = useState(false);
  const [language, setLanguage] = useState('de');

  const responseRef = useRef<HTMLDivElement>(null);

  // Referenz zu den Spracheinstellungen im localStorage
  useEffect(() => {
    // Session-ID generieren, falls noch nicht vorhanden
    const storedSessionId = localStorage.getItem('aiSessionId');
    if (storedSessionId) {
      setSessionId(storedSessionId);
    } else {
      const newSessionId = Math.random().toString(36).substring(2, 15);
      localStorage.setItem('aiSessionId', newSessionId);
      setSessionId(newSessionId);
    }

    // Spracheinstellung laden
    const storedLang = localStorage.getItem('preferredLanguage') as 'de' | 'fr' | 'en' | null;
    if (storedLang) {
      setLanguage(storedLang);
    }

    // Beim Laden frühere Empfehlungen aus dem localStorage holen
    // In der realen Implementierung würden wir die API abfragen
    const mockPastRecommendations = [
      {
        id: 1,
        prompt: "Wo kann ich günstig in Luxemburg-Stadt übernachten?",
        response: "Hier sind einige Budget-Optionen für die Übernachtung in Luxemburg-Stadt:\n\n1. Youth Hostel Luxembourg City - Ab 25€ pro Nacht im Schlafsaal, zentrale Lage und sauber\n2. Hotel Empire - Einfaches 2-Sterne-Hotel mit Preisen ab 60€/Nacht im Stadtteil Gare\n3. Airbnb-Zimmer - Viele private Anbieter vermieten Zimmer ab 40€/Nacht\n4. Hotel Parc Belle-Vue - 3-Sterne-Hotel mit gelegentlichen Angeboten ab 70€\n5. Couchsurfing - Komplett kostenlose Option durch die aktive Community in Luxemburg",
        category: "accommodation",
        timestamp: "2025-05-01T14:30:00.000Z"
      },
      {
        id: 2,
        prompt: "Welche günstigen Restaurants gibt es im Stadtzentrum?",
        response: "Hier sind die besten preiswerten Restaurants im Zentrum von Luxemburg:\n\n1. Café Beim Renert - Traditionelle luxemburgische Küche zu vernünftigen Preisen, Tagesmenü ca. 12€\n2. Golden Bean - Asiatische Fusion-Küche, Mittagsmenü ab 9,90€ inkl. Suppe\n3. Snack Michel - Schnelle, einfache Gerichte und Sandwiches zwischen 5-8€\n4. La Veranda - Italienisches Restaurant mit Mittagsmenü für 15€ inkl. Getränk\n5. Chiche! - Orientalische Küche mit Falafel und Hummus-Tellern ab 8€",
        category: "dining",
        timestamp: "2025-05-02T09:15:00.000Z"
      }
    ];
    
    setPastRecommendations(mockPastRecommendations);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!prompt.trim()) {
      setError('Bitte geben Sie eine Frage ein');
      return;
    }
    
    setLoading(true);
    setError(null);
    
    try {
      // In einer realen Implementierung würden wir die API abfragen
      // const response = await fetch('/api/ai-recommendations', {
      //   method: 'POST',
      //   headers: {
      //     'Content-Type': 'application/json',
      //   },
      //   body: JSON.stringify({
      //     prompt,
      //     category,
      //     languageCode: language,
      //     sessionId
      //   }),
      // });
      
      // const data = await response.json();
      
      // if (data.success) {
      //   setRecommendation(data.data.recommendation);
      //   // Neue Empfehlung zur Historie hinzufügen
      //   setPastRecommendations(prev => [
      //     {
      //       id: data.data.id,
      //       prompt,
      //       response: data.data.recommendation,
      //       category,
      //       timestamp: new Date().toISOString()
      //     },
      //     ...prev
      //   ]);
      // } else {
      //   setError(data.message || 'Es ist ein Fehler aufgetreten');
      // }

      // Für die Demo simulieren wir eine Antwort
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Beispielantworten basierend auf der Kategorie
      let sampleResponse = '';
      
      if (category === 'accommodation') {
        sampleResponse = `Hier sind meine Empfehlungen für günstige Unterkünfte in Luxemburg, passend zu Ihrer Anfrage "${prompt}":\n\n1. Youth Hostel Luxembourg City - Moderne Einrichtung ab 25€/Nacht im Schlafsaal, Privatzimmer ab 60€\n2. Hotel Parc Beaux-Arts - Bei frühzeitiger Buchung Sonderangebote ab 85€/Nacht\n3. Airbnb in Bonnevoie - Dieses Viertel bietet günstigere Optionen ab 50€/Nacht bei gleicher Nähe zum Zentrum\n\nTipp: Buchen Sie mindestens 2 Monate im Voraus für die besten Preise!`;
      } else if (category === 'dining') {
        sampleResponse = `Basierend auf Ihrer Anfrage "${prompt}", hier meine Top-Empfehlungen für preiswertes Essen in Luxemburg:\n\n1. Mousel's Cantine - Traditionelle luxemburgische Küche zu vernünftigen Preisen, Tagesmenü ca. 14€\n2. Snack Mandarin - Asiatische Küche mit großen Portionen, Mittagsmenü ab 9,50€\n3. Boulangerie Paul - Günstige Sandwiches und Quiches zwischen 4-7€\n\nExtra-Tipp: Viele Restaurants bieten Mittagsmenüs ("Plat du Jour") deutlich günstiger als Abendessen an!`;
      } else if (category === 'transport') {
        sampleResponse = `Zu Ihrer Anfrage "${prompt}", hier die besten Transport-Optionen in Luxemburg:\n\n1. Öffentlicher Verkehr - Komplett kostenlos in ganz Luxemburg! Bus, Bahn und Tram\n2. Vel'oh Fahrradverleih - 2€ für eine Wochenkarte mit unbegrenzten 30-Minuten-Fahrten\n3. CFL Mobile App - Laden Sie diese für Echtzeit-Fahrpläne aller öffentlichen Verkehrsmittel\n\nHinweis: Nutzen Sie die kostenlose mobiliteit.lu App für die beste Routenplanung.`;
      } else {
        sampleResponse = `Hier sind einige Budget-Tipps zu Ihrer Anfrage "${prompt}":\n\n1. Luxembourg Card - 13€ für 1 Tag oder 28€ für 3 Tage mit freiem Eintritt zu über 60 Attraktionen\n2. Kostenlose Museen - Viele staatliche Museen sind am ersten Sonntag im Monat gratis\n3. Wendelinus Promenade - Wunderschöne kostenlose Wanderung mit Panoramablick auf die Stadt\n\nBesonderer Tipp: Das Tourismusbüro (LCTO) bietet kostenlose Stadtführungen am Samstag an!`;
      }
      
      setRecommendation(sampleResponse);
      
      // Neue Empfehlung zur Historie hinzufügen
      const newRecommendation = {
        id: Math.max(0, ...pastRecommendations.map(r => r.id)) + 1,
        prompt,
        response: sampleResponse,
        category,
        timestamp: new Date().toISOString()
      };
      
      setPastRecommendations(prev => [newRecommendation, ...prev]);
      
      // Scroll zum Ergebnis, nachdem es gerendert wurde
      setTimeout(() => {
        responseRef.current?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
      
    } catch (err) {
      console.error('Fehler bei der AI-Anfrage:', err);
      setError('Es ist ein Fehler bei der Kommunikation mit dem Server aufgetreten. Bitte versuchen Sie es später erneut.');
    } finally {
      setLoading(false);
    }
  };

  // Text-Labels basierend auf der Sprache
  const labels = {
    de: {
      title: 'Persönliche Spartipps von Claude AI',
      subtitle: 'Stellen Sie eine Frage und erhalten Sie maßgeschneiderte Budget-Tipps für Luxemburg',
      categoryLabel: 'Kategorie',
      categories: {
        accommodation: 'Unterkunft',
        dining: 'Gastronomie',
        transport: 'Transport',
        activities: 'Aktivitäten'
      },
      promptPlaceholder: 'z.B. Wo finde ich günstige Unterkünfte in der Stadt?',
      submitButton: 'Tipps erhalten',
      loadingText: 'Empfehlungen werden generiert...',
      errorTitle: 'Fehler',
      historyToggle: 'Frühere Empfehlungen anzeigen',
      historyTitle: 'Ihre früheren Anfragen',
      emptyHistory: 'Sie haben noch keine Empfehlungen erhalten',
      feedback: {
        title: 'War diese Empfehlung hilfreich?',
        yes: 'Ja',
        no: 'Nein'
      }
    },
    fr: {
      title: 'Conseils d\'économie personnalisés par Claude AI',
      subtitle: 'Posez une question et recevez des conseils budgétaires sur mesure pour le Luxembourg',
      categoryLabel: 'Catégorie',
      categories: {
        accommodation: 'Hébergement',
        dining: 'Restauration',
        transport: 'Transport',
        activities: 'Activités'
      },
      promptPlaceholder: 'ex. Où trouver des hébergements pas chers en ville?',
      submitButton: 'Obtenir des conseils',
      loadingText: 'Génération de recommandations...',
      errorTitle: 'Erreur',
      historyToggle: 'Afficher les recommandations précédentes',
      historyTitle: 'Vos demandes précédentes',
      emptyHistory: 'Vous n\'avez pas encore reçu de recommandations',
      feedback: {
        title: 'Cette recommandation était-elle utile?',
        yes: 'Oui',
        no: 'Non'
      }
    },
    en: {
      title: 'Personal Money-Saving Tips from Claude AI',
      subtitle: 'Ask a question and receive tailored budget tips for Luxembourg',
      categoryLabel: 'Category',
      categories: {
        accommodation: 'Accommodation',
        dining: 'Dining',
        transport: 'Transport',
        activities: 'Activities'
      },
      promptPlaceholder: 'e.g. Where can I find cheap accommodations in the city?',
      submitButton: 'Get Tips',
      loadingText: 'Generating recommendations...',
      errorTitle: 'Error',
      historyToggle: 'Show previous recommendations',
      historyTitle: 'Your previous requests',
      emptyHistory: 'You haven\'t received any recommendations yet',
      feedback: {
        title: 'Was this recommendation helpful?',
        yes: 'Yes',
        no: 'No'
      }
    }
  };

  const t = labels[language as keyof typeof labels] || labels.en;

  return (
    <section className="section" id="ai-recommendations">
      <div className="container">
        <div className="section-heading">
          <h2>{t.title}</h2>
          <p>{t.subtitle}</p>
        </div>

        <div style={{ 
          display: 'flex', 
          flexDirection: 'column',
          gap: '30px',
          maxWidth: '800px',
          margin: '0 auto'
        }}>
          <form onSubmit={handleSubmit} style={{ 
            backgroundColor: 'white',
            padding: '25px',
            borderRadius: '8px',
            boxShadow: '0 2px 10px rgba(0,0,0,0.1)'
          }}>
            <div style={{ marginBottom: '20px' }}>
              <label style={{ 
                display: 'block', 
                marginBottom: '8px',
                fontWeight: 'bold'
              }}>
                {t.categoryLabel}
              </label>
              <div style={{ 
                display: 'flex', 
                flexWrap: 'wrap',
                gap: '10px'
              }}>
                {Object.entries(t.categories).map(([value, label]) => (
                  <button
                    key={value}
                    type="button"
                    onClick={() => setCategory(value)}
                    style={{
                      padding: '8px 15px',
                      borderRadius: '20px',
                      border: 'none',
                      backgroundColor: category === value ? '#38b6ff' : '#f1f1f1',
                      color: category === value ? 'white' : '#333',
                      cursor: 'pointer',
                      fontWeight: category === value ? 'bold' : 'normal',
                      transition: 'all 0.2s ease'
                    }}
                  >
                    {label}
                  </button>
                ))}
              </div>
            </div>
            
            <div style={{ marginBottom: '20px' }}>
              <label style={{ 
                display: 'block', 
                marginBottom: '8px',
                fontWeight: 'bold'
              }}>
                Frage
              </label>
              <textarea
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder={t.promptPlaceholder}
                rows={3}
                style={{
                  width: '100%',
                  padding: '12px',
                  borderRadius: '4px',
                  border: '1px solid #ddd',
                  fontSize: '16px',
                  resize: 'vertical'
                }}
              />
            </div>
            
            <button
              type="submit"
              disabled={loading}
              style={{
                backgroundColor: '#e81414',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                padding: '12px 25px',
                fontSize: '16px',
                fontWeight: 'bold',
                cursor: loading ? 'not-allowed' : 'pointer',
                opacity: loading ? 0.7 : 1,
                transition: 'all 0.2s ease',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '10px'
              }}
            >
              {loading ? (
                <>
                  <div className="spinner" style={{ 
                    width: '18px', 
                    height: '18px',
                    borderWidth: '2px'
                  }}></div>
                  {t.loadingText}
                </>
              ) : (
                t.submitButton
              )}
            </button>
          </form>

          {error && (
            <div style={{
              backgroundColor: '#f8d7da',
              color: '#721c24',
              padding: '12px 15px',
              borderRadius: '4px',
              marginBottom: '20px'
            }}>
              <strong>{t.errorTitle}: </strong>{error}
            </div>
          )}

          {recommendation && (
            <div 
              ref={responseRef}
              style={{
                backgroundColor: 'white',
                padding: '25px',
                borderRadius: '8px',
                boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
                position: 'relative',
                overflow: 'hidden'
              }}
            >
              <div style={{ 
                position: 'absolute',
                top: '0',
                left: '0',
                width: '5px',
                height: '100%',
                backgroundColor: '#38b6ff'
              }}></div>
              
              <div style={{ paddingLeft: '15px' }}>
                <h3 style={{ 
                  color: '#38b6ff', 
                  marginBottom: '15px',
                  fontSize: '18px'
                }}>
                  {pastRecommendations[0]?.prompt}
                </h3>

                <div style={{ 
                  whiteSpace: 'pre-line',
                  lineHeight: '1.6',
                  marginBottom: '25px' 
                }}>
                  {recommendation}
                </div>

                <div style={{ 
                  display: 'flex', 
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  borderTop: '1px solid #eee',
                  paddingTop: '15px',
                  marginTop: '10px'
                }}>
                  <div>
                    <p style={{ 
                      color: '#666', 
                      fontSize: '14px',
                      fontStyle: 'italic'
                    }}>
                      Generiert mit Claude AI
                    </p>
                  </div>
                  
                  <div style={{ 
                    display: 'flex', 
                    alignItems: 'center',
                    gap: '10px'
                  }}>
                    <span style={{ fontSize: '14px' }}>{t.feedback.title}</span>
                    <button
                      type="button"
                      onClick={() => {
                        // In einer realen Implementierung würden wir API-Feedback senden
                        alert('Vielen Dank für Ihr Feedback!');
                      }}
                      style={{
                        backgroundColor: '#38b6ff',
                        color: 'white',
                        border: 'none',
                        borderRadius: '4px',
                        padding: '5px 10px',
                        fontSize: '14px',
                        cursor: 'pointer'
                      }}
                    >
                      {t.feedback.yes}
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        // In einer realen Implementierung würden wir API-Feedback senden
                        alert('Vielen Dank für Ihr Feedback!');
                      }}
                      style={{
                        backgroundColor: '#f1f1f1',
                        color: '#333',
                        border: 'none',
                        borderRadius: '4px',
                        padding: '5px 10px',
                        fontSize: '14px',
                        cursor: 'pointer'
                      }}
                    >
                      {t.feedback.no}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
          
          {pastRecommendations.length > 0 && (
            <div style={{ marginTop: '20px' }}>
              <button
                type="button"
                onClick={() => setShowHistory(!showHistory)}
                style={{
                  backgroundColor: 'transparent',
                  color: '#38b6ff',
                  border: 'none',
                  padding: '5px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '5px',
                  cursor: 'pointer',
                  fontSize: '14px'
                }}
              >
                <span style={{ 
                  display: 'inline-block',
                  transform: showHistory ? 'rotate(90deg)' : 'rotate(0deg)',
                  transition: 'transform 0.2s ease'
                }}>
                  ›
                </span>
                {t.historyToggle}
              </button>
              
              {showHistory && (
                <div style={{ 
                  backgroundColor: 'white',
                  padding: '20px',
                  borderRadius: '8px',
                  boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
                  marginTop: '10px'
                }}>
                  <h3 style={{ 
                    color: '#38b6ff', 
                    marginBottom: '15px',
                    fontSize: '18px'
                  }}>
                    {t.historyTitle}
                  </h3>
                  
                  {pastRecommendations.length === 0 ? (
                    <p>{t.emptyHistory}</p>
                  ) : (
                    <div style={{ 
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '15px'
                    }}>
                      {pastRecommendations.map((rec) => (
                        <div 
                          key={rec.id}
                          style={{
                            padding: '15px',
                            borderRadius: '4px',
                            backgroundColor: '#f5f5f5',
                            cursor: 'pointer'
                          }}
                          onClick={() => {
                            setCategory(rec.category as any);
                            setPrompt(rec.prompt);
                            setRecommendation(rec.response);
                            
                            // Scroll zum Ergebnis nach kurzer Verzögerung
                            setTimeout(() => {
                              responseRef.current?.scrollIntoView({ behavior: 'smooth' });
                            }, 100);
                          }}
                        >
                          <div style={{ 
                            display: 'flex',
                            justifyContent: 'space-between',
                            marginBottom: '5px'
                          }}>
                            <strong>{rec.prompt}</strong>
                            <span style={{ 
                              fontSize: '12px',
                              color: '#666'
                            }}>
                              {new Date(rec.timestamp).toLocaleDateString()}
                            </span>
                          </div>
                          <p style={{ 
                            color: '#666',
                            fontSize: '14px',
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                            display: '-webkit-box',
                            WebkitLineClamp: 2,
                            WebkitBoxOrient: 'vertical'
                          }}>
                            {rec.response}
                          </p>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}