import { useState } from 'react';
import { Instagram } from 'lucide-react';
import ClaudeDesignAssistant from './components/ClaudeDesignAssistant';

export default function MinimalAppSimplified() {
  const [language, setLanguage] = useState('fr');
  const [showDesignAssistant, setShowDesignAssistant] = useState(false);
  
  const handleLanguageChange = (lang: string) => {
    setLanguage(lang);
  };

  const toggleDesignAssistant = () => {
    setShowDesignAssistant(!showDesignAssistant);
  };
  
  return (
    <div style={{ fontFamily: '"Poppins", system-ui, -apple-system, BlinkMacSystemFont, sans-serif', margin: 0, padding: 0 }}>
      {/* Header */}
      <header style={{ 
        backgroundColor: 'white', 
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)', 
        padding: '1rem',
        position: 'sticky',
        top: 0,
        zIndex: 100
      }}>
        <div style={{ 
          maxWidth: '1200px', 
          margin: '0 auto', 
          display: 'flex', 
          justifyContent: 'space-between',
          alignItems: 'center'
        }}>
          {/* Logo */}
          <div style={{ position: 'relative' }}>
            <span style={{ fontWeight: 'bold', color: '#E31837', fontSize: '1.5rem' }}>Luxembourg</span>
            <span style={{ fontWeight: 'bold', color: '#00A4E0', fontSize: '1.5rem', marginLeft: '8px' }}>Pas Chère</span>
            <div style={{ 
              position: 'absolute', 
              top: '-5px', 
              right: '-12px', 
              background: '#E31837', 
              color: 'white', 
              padding: '0 4px', 
              borderRadius: '50%', 
              transform: 'rotate(12deg)', 
              fontSize: '12px', 
              fontWeight: 'bold'
            }}>€</div>
          </div>
          
          {/* Navigation */}
          <nav>
            <ul style={{ display: 'flex', listStyle: 'none', gap: '1.5rem', margin: 0, padding: 0 }}>
              <li><a href="#home" style={{ textDecoration: 'none', color: '#333' }}>Accueil</a></li>
              <li><a href="#about" style={{ textDecoration: 'none', color: '#333' }}>À propos</a></li>
              <li><a href="#book" style={{ textDecoration: 'none', color: '#333' }}>Livre</a></li>
              <li><a href="#contact" style={{ textDecoration: 'none', color: '#333' }}>Contact</a></li>
              <li>
                <a href="https://www.instagram.com/luxembourgpaschere/" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
                  <div style={{ 
                    width: "32px", 
                    height: "32px", 
                    background: "radial-gradient(circle at 30% 107%, #fdf497 0%, #fdf497 5%, #fd5949 45%, #d6249f 60%, #285AEB 90%)",
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}>
                    <Instagram size={16} color="white" />
                  </div>
                </a>
              </li>
              <li>
                <div style={{ position: 'relative' }}>
                  <button style={{ 
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer',
                    padding: '0.5rem',
                    fontWeight: 'bold'
                  }}>
                    {language.toUpperCase()}
                  </button>
                  <div style={{ 
                    position: 'absolute', 
                    backgroundColor: 'white',
                    boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
                    borderRadius: '4px',
                    padding: '0.5rem',
                    display: 'none' // Hide dropdown by default
                  }}>
                    <button onClick={() => handleLanguageChange('fr')} style={{ display: 'block', width: '100%', textAlign: 'left', padding: '0.5rem', border: 'none', background: 'none', cursor: 'pointer' }}>
                      Français
                    </button>
                    <button onClick={() => handleLanguageChange('de')} style={{ display: 'block', width: '100%', textAlign: 'left', padding: '0.5rem', border: 'none', background: 'none', cursor: 'pointer' }}>
                      Deutsch
                    </button>
                    <button onClick={() => handleLanguageChange('en')} style={{ display: 'block', width: '100%', textAlign: 'left', padding: '0.5rem', border: 'none', background: 'none', cursor: 'pointer' }}>
                      English
                    </button>
                  </div>
                </div>
              </li>
            </ul>
          </nav>
        </div>
      </header>
      
      {/* Hero Section */}
      <section id="home" style={{ 
        position: 'relative', 
        color: 'white',
        height: '100vh',
        overflow: 'hidden'
      }}>
        {/* Background Image */}
        <div style={{ 
          position: 'absolute', 
          top: 0, 
          left: 0, 
          width: '100%', 
          height: '100%',
          zIndex: -2
        }}>
          <img 
            src="https://images.unsplash.com/photo-1580846961439-725c18a67d53?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1920&q=80" 
            alt="Luxembourg City View" 
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          />
        </div>
        
        {/* Gradient Overlay */}
        <div style={{ 
          position: 'absolute', 
          top: 0, 
          left: 0, 
          width: '100%', 
          height: '100%',
          background: 'linear-gradient(135deg, rgba(227, 24, 55, 0.85) 0%, rgba(0, 164, 224, 0.75) 100%)',
          zIndex: -1
        }} />
        
        {/* Content */}
        <div style={{ 
          maxWidth: '1200px',
          margin: '0 auto',
          padding: '2rem',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          textAlign: 'center'
        }}>
          <div style={{ marginBottom: '2rem' }}>
            <div style={{ 
              display: 'inline-block',
              background: 'white',
              color: '#E31837',
              padding: '0.5rem 1rem',
              borderRadius: '50px',
              fontSize: '0.9rem',
              fontWeight: 'bold',
              marginBottom: '1rem'
            }}>
              {new Date().toLocaleDateString('fr-FR', { day: '2-digit', month: '2-digit', year: '2-digit' })}
            </div>
            
            <h1 style={{ fontSize: '3rem', fontWeight: 'bold', marginBottom: '1rem' }}>
              Luxembourg Pas Chère
            </h1>
            
            <p style={{ fontSize: '1.2rem', maxWidth: '700px', margin: '0 auto' }}>
              Les meilleurs conseils et offres pour une vie abordable au Luxembourg. 
              Découvrez comment profiter de ce magnifique pays sans vider votre portefeuille.
            </p>
          </div>
          
          {/* Book Display */}
          <div style={{ marginBottom: '2rem' }}>
            <div style={{ 
              background: 'white', 
              padding: '1rem', 
              borderRadius: '8px', 
              boxShadow: '0 10px 30px rgba(0,0,0,0.2)',
              width: '300px',
              margin: '0 auto',
              position: 'relative'
            }}>
              {/* Book Cover */}
              <img 
                src="/assets/cover.png" 
                alt="Luxembourg Pas Cher - Guide Pratique" 
                style={{ 
                  width: '100%', 
                  maxWidth: '100%',
                  borderRadius: '4px',
                  boxShadow: '0 5px 15px rgba(0,0,0,0.1)',
                  objectFit: 'contain'
                }} 
                onError={(e) => {
                  console.error('Image error:', e);
                  const target = e.target as HTMLImageElement;
                  target.onerror = null; 
                  target.style.background = 'linear-gradient(45deg, #E31837, #00A4E0)';
                  target.style.aspectRatio = '0.7/1';
                  target.style.display = 'flex';
                  target.style.alignItems = 'center';
                  target.style.justifyContent = 'center';
                  target.alt = 'LUXEMBOURG PAS CHÈRE';
                }}
              />
              
              {/* Price Badge */}
              <div style={{ 
                position: 'absolute',
                top: 0,
                right: 0,
                transform: 'translate(30%, -30%) rotate(15deg)',
                background: 'white',
                color: '#E31837',
                padding: '0.5rem 1rem',
                borderRadius: '50%',
                fontWeight: 'bold',
                boxShadow: '0 4px 10px rgba(0,0,0,0.1)'
              }}>
                €24.99
              </div>
            </div>
          </div>
          
          {/* Commander Button */}
          <div style={{ marginBottom: '2rem' }}>
            <button style={{ 
              background: 'white',
              color: '#E31837',
              border: 'none',
              padding: '1rem 3rem',
              borderRadius: '50px',
              fontSize: '1.25rem',
              fontWeight: 'bold',
              boxShadow: '0 10px 20px rgba(0,0,0,0.2)',
              cursor: 'pointer',
              transition: 'all 0.3s ease',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto'
            }}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ marginRight: '0.5rem' }}>
                <path d="M8 22C8.55228 22 9 21.5523 9 21C9 20.4477 8.55228 20 8 20C7.44772 20 7 20.4477 7 21C7 21.5523 7.44772 22 8 22Z" fill="#E31837"/>
                <path d="M19 22C19.5523 22 20 21.5523 20 21C20 20.4477 19.5523 20 19 20C18.4477 20 18 20.4477 18 21C18 21.5523 18.4477 22 19 22Z" fill="#E31837"/>
                <path d="M1 1H5L7.68 14.39C7.77144 14.8504 8.02191 15.264 8.38755 15.5583C8.75318 15.8526 9.2107 16.009 9.68 16H18.4C18.8693 16.009 19.3268 15.8526 19.6925 15.5583C20.0581 15.264 20.3086 14.8504 20.4 14.39L22 6H6" stroke="#E31837" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              COMMANDER
            </button>
          </div>
          
          {/* Feature Tags */}
          <div style={{ display: 'flex', justifyContent: 'center', gap: '0.5rem', flexWrap: 'wrap' }}>
            <span style={{ 
              background: 'rgba(255,255,255,0.25)', 
              padding: '0.5rem 1rem', 
              borderRadius: '50px',
              fontSize: '0.9rem' 
            }}>
              Secrets locaux
            </span>
            <span style={{ 
              background: 'rgba(255,255,255,0.25)', 
              padding: '0.5rem 1rem', 
              borderRadius: '50px',
              fontSize: '0.9rem' 
            }}>
              Offres exclusives
            </span>
            <span style={{ 
              background: 'rgba(255,255,255,0.25)', 
              padding: '0.5rem 1rem', 
              borderRadius: '50px',
              fontSize: '0.9rem' 
            }}>
              Budget intelligent
            </span>
          </div>
        </div>
      </section>
      
      {/* About Section */}
      <section id="about" style={{ 
        padding: '5rem 0',
        backgroundColor: '#f8f9fa'
      }}>
        <div style={{ 
          maxWidth: '1200px',
          margin: '0 auto',
          padding: '0 2rem'
        }}>
          <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
            <h2 style={{ 
              fontSize: '2.5rem',
              color: '#333',
              marginBottom: '1rem'
            }}>
              À propos
            </h2>
            <p style={{ 
              fontSize: '1.1rem',
              color: '#666',
              maxWidth: '800px',
              margin: '0 auto'
            }}>
              Découvrez l'histoire derrière Luxembourg Pas Chère et notre mission pour rendre la vie au Luxembourg plus abordable pour tous.
            </p>
          </div>
          
          <div style={{ 
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '3rem',
            alignItems: 'center'
          }}>
            <div>
              <img
                src="https://images.unsplash.com/photo-1587974928442-77dc3e0dba72?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80"
                alt="Luxembourg city view"
                style={{
                  width: '100%',
                  borderRadius: '8px',
                  boxShadow: '0 10px 30px rgba(0,0,0,0.1)'
                }}
              />
            </div>
            <div>
              <h3 style={{ 
                fontSize: '1.8rem',
                marginBottom: '1.5rem',
                color: '#333'
              }}>
                Notre Mission
              </h3>
              <p style={{ 
                fontSize: '1.05rem',
                lineHeight: '1.7',
                color: '#555',
                marginBottom: '1.5rem'
              }}>
                Luxembourg Pas Chère est né d'une idée simple : partager les meilleures astuces pour profiter pleinement de la vie au Luxembourg sans se ruiner.
              </p>
              <p style={{ 
                fontSize: '1.05rem',
                lineHeight: '1.7',
                color: '#555',
                marginBottom: '1.5rem'
              }}>
                Notre équipe de passionnés explore chaque recoin du pays pour dénicher les bons plans, les offres exclusives et les conseils pratiques qui vous permettront d'économiser au quotidien.
              </p>
              <div style={{ 
                display: 'flex',
                gap: '1rem',
                marginTop: '2rem'
              }}>
                <div style={{ 
                  flexBasis: '50%',
                  padding: '1.5rem',
                  backgroundColor: 'white',
                  borderRadius: '8px',
                  boxShadow: '0 5px 15px rgba(0,0,0,0.05)',
                  textAlign: 'center'
                }}>
                  <div style={{ 
                    fontSize: '2.5rem', 
                    fontWeight: 'bold',
                    color: '#E31837',
                    marginBottom: '0.5rem'
                  }}>
                    1500+
                  </div>
                  <div style={{ color: '#666' }}>
                    Exemplaires vendus
                  </div>
                </div>
                <div style={{ 
                  flexBasis: '50%',
                  padding: '1.5rem',
                  backgroundColor: 'white',
                  borderRadius: '8px',
                  boxShadow: '0 5px 15px rgba(0,0,0,0.05)',
                  textAlign: 'center'
                }}>
                  <div style={{ 
                    fontSize: '2.5rem', 
                    fontWeight: 'bold',
                    color: '#00A4E0',
                    marginBottom: '0.5rem'
                  }}>
                    200+
                  </div>
                  <div style={{ color: '#666' }}>
                    Astuces et bons plans
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Design Tools Section */}
      <section style={{ 
        padding: '4rem 2rem',
        background: '#f8f9fa'
      }}>
        <div style={{ 
          maxWidth: '1200px',
          margin: '0 auto',
        }}>
          <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
            <h2 style={{ 
              fontSize: '2rem',
              color: '#333',
              marginBottom: '1rem'
            }}>
              Design-Optimierung mit Claude
            </h2>
            <p style={{ 
              color: '#666',
              maxWidth: '700px',
              margin: '0 auto'
            }}>
              Nutzen Sie die Kraft der Claude 3.7 KI, um Designvorschläge für unsere Website zu generieren. Helfen Sie uns bei der visuellen Neugestaltung unserer Plattform.
            </p>
            <button 
              onClick={toggleDesignAssistant}
              style={{ 
                background: '#E31837',
                color: 'white',
                border: 'none',
                padding: '0.75rem 1.5rem',
                borderRadius: '4px',
                fontWeight: 'bold',
                cursor: 'pointer',
                marginTop: '1.5rem',
                transition: 'background-color 0.3s ease'
              }}
            >
              {showDesignAssistant ? 'Design-Assistent ausblenden' : 'Design-Assistent anzeigen'}
            </button>
          </div>
          
          {showDesignAssistant && (
            <div style={{ marginTop: '2rem' }}>
              <ClaudeDesignAssistant 
                initialDescription="Erstellen Sie ein modernes Design-System für die 'Luxembourg Pas Chère' Website, die Benutzern hilft, bezahlbare Angebote in Luxemburg zu finden. Die Website soll luxemburgische Farben (rot und blau) verwenden, professionell aussehen und ein Buchcover hervorheben."
              />
            </div>
          )}
        </div>
      </section>
    </div>
  );
}