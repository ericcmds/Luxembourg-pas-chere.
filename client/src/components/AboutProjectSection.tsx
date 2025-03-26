import { useState } from 'react';

export default function AboutProjectSection() {
  const [activeTab, setActiveTab] = useState('about');
  
  const handleTabClick = (tabId: string) => {
    setActiveTab(tabId);
  };

  return (
    <section id="about-project" className="py-5 py-md-6 bg-light">
      <div className="container">
        <div className="row justify-content-center mb-5">
          <div className="col-lg-8 text-center">
            <h2 className="display-5 fw-bold font-montserrat mb-3">
              Über das <span className="text-lux-blue">Projekt</span>
            </h2>
            <p className="lead text-muted">
              Erfahren Sie mehr über die Vision und Mission hinter Luxembourg Pas Chère
            </p>
          </div>
        </div>
        
        {/* Tabs Navigation */}
        <div className="row mb-5">
          <div className="col">
            <ul className="nav nav-pills nav-fill justify-content-center flex-column flex-md-row" id="projectTabs" role="tablist">
              <li className="nav-item mb-2 mb-md-0" role="presentation">
                <button 
                  className={`nav-link py-3 px-4 ${activeTab === 'about' ? 'active bg-lux-blue' : ''}`} 
                  onClick={() => handleTabClick('about')}
                  id="about-tab" 
                  type="button" 
                  role="tab"
                  aria-selected={activeTab === 'about'}
                >
                  <i className="fas fa-info-circle me-2"></i>
                  <span className="d-none d-sm-inline">About</span>
                </button>
              </li>
              <li className="nav-item mb-2 mb-md-0" role="presentation">
                <button 
                  className={`nav-link py-3 px-4 ${activeTab === 'audience' ? 'active bg-lux-blue' : ''}`} 
                  onClick={() => handleTabClick('audience')}
                  id="audience-tab" 
                  type="button" 
                  role="tab"
                  aria-selected={activeTab === 'audience'}
                >
                  <i className="fas fa-users me-2"></i>
                  <span className="d-none d-sm-inline">Target Audience</span>
                </button>
              </li>
              <li className="nav-item mb-2 mb-md-0" role="presentation">
                <button 
                  className={`nav-link py-3 px-4 ${activeTab === 'innovation' ? 'active bg-lux-blue' : ''}`} 
                  onClick={() => handleTabClick('innovation')}
                  id="innovation-tab" 
                  type="button" 
                  role="tab"
                  aria-selected={activeTab === 'innovation'}
                >
                  <i className="fas fa-lightbulb me-2"></i>
                  <span className="d-none d-sm-inline">Innovation</span>
                </button>
              </li>
              <li className="nav-item mb-2 mb-md-0" role="presentation">
                <button 
                  className={`nav-link py-3 px-4 ${activeTab === 'content' ? 'active bg-lux-blue' : ''}`} 
                  onClick={() => handleTabClick('content')}
                  id="content-tab" 
                  type="button" 
                  role="tab"
                  aria-selected={activeTab === 'content'}
                >
                  <i className="fas fa-book-open me-2"></i>
                  <span className="d-none d-sm-inline">Content</span>
                </button>
              </li>
            </ul>
          </div>
        </div>
        
        {/* Tab Content */}
        <div className="tab-content" id="projectTabsContent">
          {/* About Tab */}
          <div 
            className={`tab-pane fade ${activeTab === 'about' ? 'show active' : ''}`} 
            id="about" 
            role="tabpanel"
          >
            <div className="row g-4">
              {/* Left Column - About Project Leader */}
              <div className="col-lg-6">
                <div className="card border-0 shadow-sm h-100">
                  <div className="card-body p-4 p-lg-5">
                    <div className="d-flex align-items-center mb-4">
                      <div className="flex-shrink-0">
                        <div className="rounded-circle bg-lux-red bg-opacity-10 p-3">
                          <i className="fas fa-user-tie fa-2x text-lux-red"></i>
                        </div>
                      </div>
                      <div className="flex-grow-1 ms-3">
                        <h3 className="h4 fw-bold mb-0">Über die Projektleiterin</h3>
                      </div>
                    </div>
                    
                    <p className="text-muted mb-3">
                      Pascale ZAOUROU ist die Visionärin und treibende Kraft hinter Luxembourg Pas Chère. Als Expertin für soziale Inklusion und nachhaltige Wirtschaft hat sie dieses Projekt ins Leben gerufen, um allen in Luxemburg lebenden Menschen einen Zugang zu erschwinglichem Leben zu ermöglichen.
                    </p>
                    <p className="text-muted mb-3">
                      Mit mehr als 15 Jahren Erfahrung im sozialen Sektor Luxemburgs verfügt Pascale über ein umfassendes Netzwerk und tiefes Verständnis der lokalen Herausforderungen.
                    </p>
                    <p className="text-muted mb-0">
                      Ihr Engagement für soziale Gerechtigkeit und ihre praktische Herangehensweise machen sie zur idealen Führungspersönlichkeit für diese wichtige Initiative.
                    </p>
                  </div>
                </div>
              </div>
              
              {/* Right Column - Context */}
              <div className="col-lg-6">
                <div className="card border-0 shadow-sm h-100">
                  <div className="card-body p-4 p-lg-5">
                    <div className="d-flex align-items-center mb-4">
                      <div className="flex-shrink-0">
                        <div className="rounded-circle bg-lux-blue bg-opacity-10 p-3">
                          <i className="fas fa-map-marked-alt fa-2x text-lux-blue"></i>
                        </div>
                      </div>
                      <div className="flex-grow-1 ms-3">
                        <h3 className="h4 fw-bold mb-0">Kontext</h3>
                      </div>
                    </div>
                    
                    <p className="text-muted mb-3">
                      Luxemburg ist bekannt für seinen hohen Lebensstandard, aber auch für die hohen Lebenshaltungskosten. Viele Haushalte, insbesondere Familien mit niedrigem und mittlerem Einkommen, stehen vor erheblichen finanziellen Herausforderungen.
                    </p>
                    <p className="text-muted mb-3">
                      Die steigende Inflation, hohe Wohnkosten und allgemeine Lebenshaltungskosten haben die Notwendigkeit für zugängliche Ressourcen zum Geldsparen erhöht.
                    </p>
                    <p className="text-muted mb-0">
                      Luxembourg Pas Chère wurde als Antwort auf diese Herausforderungen entwickelt, um praktische Lösungen und Ressourcen anzubieten, die Menschen helfen, ihre Lebensqualität zu erhalten und gleichzeitig Kosten zu senken.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Target Audience Tab */}
          <div 
            className={`tab-pane fade ${activeTab === 'audience' ? 'show active' : ''}`} 
            id="audience" 
            role="tabpanel"
          >
            <div className="row g-4">
              {/* Left Column */}
              <div className="col-lg-6">
                <div className="card border-0 shadow-sm h-100">
                  <div className="card-body p-4 p-lg-5">
                    <div className="d-flex align-items-center mb-4">
                      <div className="flex-shrink-0">
                        <div className="rounded-circle bg-lux-red bg-opacity-10 p-3">
                          <i className="fas fa-home fa-2x text-lux-red"></i>
                        </div>
                      </div>
                      <div className="flex-grow-1 ms-3">
                        <h3 className="h4 fw-bold mb-0">Familien in Luxemburg</h3>
                      </div>
                    </div>
                    
                    <p className="text-muted mb-3">
                      Unser Projekt richtet sich in erster Linie an Familien aller Einkommensstufen in Luxemburg, die von steigenden Lebenshaltungskosten betroffen sind und nach Möglichkeiten suchen, ihr Budget zu optimieren.
                    </p>
                    <p className="text-muted mb-3">
                      Besonderes Augenmerk liegt auf Familien mit niedrigem bis mittlerem Einkommen, die oft am stärksten von finanziellen Belastungen betroffen sind.
                    </p>
                    <p className="text-muted mb-0">
                      Alleinerziehende, große Familien und solche mit speziellen Bedürfnissen finden hier besonders wertvolle Ressourcen, die auf ihre spezifischen Herausforderungen zugeschnitten sind.
                    </p>
                  </div>
                </div>
              </div>
              
              {/* Right Column */}
              <div className="col-lg-6">
                <div className="card border-0 shadow-sm h-100">
                  <div className="card-body p-4 p-lg-5">
                    <div className="d-flex align-items-center mb-4">
                      <div className="flex-shrink-0">
                        <div className="rounded-circle bg-lux-blue bg-opacity-10 p-3">
                          <i className="fas fa-globe fa-2x text-lux-blue"></i>
                        </div>
                      </div>
                      <div className="flex-grow-1 ms-3">
                        <h3 className="h4 fw-bold mb-0">Internationale Gemeinschaft</h3>
                      </div>
                    </div>
                    
                    <p className="text-muted mb-3">
                      Luxemburg ist bekannt für seine kulturelle Vielfalt, mit einem hohen Anteil an internationalen Einwohnern. Unser Projekt berücksichtigt die Bedürfnisse dieser vielfältigen Gemeinschaft.
                    </p>
                    <p className="text-muted mb-3">
                      Neuankömmlinge in Luxemburg, die oft mit der Anpassung an die lokalen Kosten kämpfen, finden hier wertvolle Orientierungshilfen für ihr neues Leben.
                    </p>
                    <p className="text-muted mb-0">
                      Die mehrsprachigen Ressourcen stellen sicher, dass Sprachbarrieren kein Hindernis für den Zugang zu wichtigen Sparinformationen darstellen.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Innovation Tab */}
          <div 
            className={`tab-pane fade ${activeTab === 'innovation' ? 'show active' : ''}`} 
            id="innovation" 
            role="tabpanel"
          >
            <div className="row g-4">
              {/* Left Column */}
              <div className="col-lg-6">
                <div className="card border-0 shadow-sm h-100">
                  <div className="card-body p-4 p-lg-5">
                    <div className="d-flex align-items-center mb-4">
                      <div className="flex-shrink-0">
                        <div className="rounded-circle bg-lux-red bg-opacity-10 p-3">
                          <i className="fas fa-chart-line fa-2x text-lux-red"></i>
                        </div>
                      </div>
                      <div className="flex-grow-1 ms-3">
                        <h3 className="h4 fw-bold mb-0">Datenbasierter Ansatz</h3>
                      </div>
                    </div>
                    
                    <p className="text-muted mb-3">
                      Was Luxembourg Pas Chère auszeichnet, ist der umfassende, datenbasierte Ansatz zur Identifizierung von Sparmöglichkeiten. Unser Team führt regelmäßig Marktanalysen durch, um die besten Angebote zu finden.
                    </p>
                    <p className="text-muted mb-3">
                      Preisvergleiche werden systematisch durchgeführt und dokumentiert, um sicherzustellen, dass unsere Empfehlungen aktuell und zuverlässig sind.
                    </p>
                    <p className="text-muted mb-0">
                      Dieser wissenschaftliche Ansatz gewährleistet, dass unsere Benutzer tatsächlich von nachweisbaren Einsparungen profitieren können.
                    </p>
                  </div>
                </div>
              </div>
              
              {/* Right Column */}
              <div className="col-lg-6">
                <div className="card border-0 shadow-sm h-100">
                  <div className="card-body p-4 p-lg-5">
                    <div className="d-flex align-items-center mb-4">
                      <div className="flex-shrink-0">
                        <div className="rounded-circle bg-lux-blue bg-opacity-10 p-3">
                          <i className="fas fa-handshake fa-2x text-lux-blue"></i>
                        </div>
                      </div>
                      <div className="flex-grow-1 ms-3">
                        <h3 className="h4 fw-bold mb-0">Gemeinschaftsbasierte Lösung</h3>
                      </div>
                    </div>
                    
                    <p className="text-muted mb-3">
                      Unser Projekt setzt auf die Kraft der Gemeinschaft. Wir sammeln Feedback und Tipps von Nutzern, um kontinuierlich neue Sparmöglichkeiten zu identifizieren und zu teilen.
                    </p>
                    <p className="text-muted mb-3">
                      Lokale Unternehmen werden einbezogen, um spezielle Angebote für unsere Community zu schaffen, wodurch ein Win-Win-Szenario entsteht.
                    </p>
                    <p className="text-muted mb-0">
                      Dieser kollaborative Ansatz stärkt nicht nur die lokale Wirtschaft, sondern schafft auch ein Netzwerk der gegenseitigen Unterstützung innerhalb der luxemburgischen Gesellschaft.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Content Tab */}
          <div 
            className={`tab-pane fade ${activeTab === 'content' ? 'show active' : ''}`} 
            id="content" 
            role="tabpanel"
          >
            <div className="row g-4">
              {/* Left Column */}
              <div className="col-lg-6">
                <div className="card border-0 shadow-sm h-100">
                  <div className="card-body p-4 p-lg-5">
                    <div className="d-flex align-items-center mb-4">
                      <div className="flex-shrink-0">
                        <div className="rounded-circle bg-lux-red bg-opacity-10 p-3">
                          <i className="fas fa-book fa-2x text-lux-red"></i>
                        </div>
                      </div>
                      <div className="flex-grow-1 ms-3">
                        <h3 className="h4 fw-bold mb-0">Buchtipps & Ressourcen</h3>
                      </div>
                    </div>
                    
                    <p className="text-muted mb-3">
                      Das Herzstück unseres Projekts ist das umfassende Handbuch "Luxembourg Pas Chère", das über 500 spezifische Tipps zum Geldsparen in Luxemburg enthält. Diese Ressource deckt alle Aspekte des täglichen Lebens ab.
                    </p>
                    <p className="text-muted mb-3">
                      Kategorien umfassen Einkaufen, Freizeit, Bildung, Transport, Gesundheit, Wohnen und vieles mehr - alles speziell auf den luxemburgischen Kontext zugeschnitten.
                    </p>
                    <p className="text-muted mb-0">
                      Jeder Tipp wurde sorgfältig recherchiert und von unserem Team getestet, um seine Wirksamkeit und Aktualität zu gewährleisten.
                    </p>
                  </div>
                </div>
              </div>
              
              {/* Right Column */}
              <div className="col-lg-6">
                <div className="card border-0 shadow-sm h-100">
                  <div className="card-body p-4 p-lg-5">
                    <div className="d-flex align-items-center mb-4">
                      <div className="flex-shrink-0">
                        <div className="rounded-circle bg-lux-blue bg-opacity-10 p-3">
                          <i className="fas fa-laptop fa-2x text-lux-blue"></i>
                        </div>
                      </div>
                      <div className="flex-grow-1 ms-3">
                        <h3 className="h4 fw-bold mb-0">Digitale Werkzeuge</h3>
                      </div>
                    </div>
                    
                    <p className="text-muted mb-3">
                      Neben dem gedruckten Handbuch bietet unser Projekt eine Reihe digitaler Werkzeuge zur Unterstützung von Budgetplanung und Kostenoptimierung.
                    </p>
                    <p className="text-muted mb-3">
                      Unsere Website dient als zentrale Plattform für aktuelle Angebote, saisonale Spartipps und Community-Austausch zu neuen Sparmöglichkeiten.
                    </p>
                    <p className="text-muted mb-0">
                      Interaktive Elemente wie Preisvergleichstools, Budgetrechner und personalisierte Sparempfehlungen ergänzen die statischen Informationen und bieten maßgeschneiderte Unterstützung.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}