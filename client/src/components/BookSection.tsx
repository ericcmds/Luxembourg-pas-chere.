import { useState } from "react";
import BookCover from "./BookCover";

export default function BookSection() {
  const [isOrderProcessing, setIsOrderProcessing] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    address: '',
    city: '',
    postalCode: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [id]: value
    }));
  };

  const handleOrder = (e: React.FormEvent) => {
    e.preventDefault();
    setIsOrderProcessing(true);
    
    // Simulate order processing
    setTimeout(() => {
      setIsOrderProcessing(false);
      
      // Reset form
      setFormData({
        firstName: '',
        lastName: '',
        email: '',
        address: '',
        city: '',
        postalCode: ''
      });
      
      // Show success alert via Bootstrap
      const alertPlaceholder = document.getElementById('orderAlertPlaceholder');
      if (alertPlaceholder) {
        const wrapper = document.createElement('div');
        wrapper.innerHTML = `
          <div class="alert alert-success alert-dismissible fade show" role="alert">
            <i class="fas fa-check-circle me-2"></i> Order placed successfully! You will receive an email confirmation shortly.
            <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
          </div>
        `;
        alertPlaceholder.append(wrapper);
        
        // Auto-dismiss after 5 seconds
        setTimeout(() => {
          const alert = document.querySelector('.alert');
          if (alert) {
            alert.remove();
          }
        }, 5000);
      }
      
      // Close modal using Bootstrap's JS API
      const modalElement = document.getElementById('orderModal');
      if (modalElement && typeof window !== 'undefined') {
        // @ts-ignore - Bootstrap is loaded from CDN
        const bootstrapModal = window.bootstrap?.Modal.getInstance(modalElement);
        if (bootstrapModal) {
          bootstrapModal.hide();
        }
      }
    }, 1500);
  };

  return (
    <section id="book" className="py-5 bg-light">
      <div className="container">
        <div className="row justify-content-center mb-4">
          <div className="col-lg-8 text-center">
            <h2 className="display-5 fw-bold font-montserrat mb-3">
              <span className="text-lux-red">Luxembourg Pas Chère</span>
            </h2>
            <p className="lead mb-0">
              Der einzige umfassende Ratgeber für kostengünstiges Leben in Luxemburg
            </p>
          </div>
        </div>
        
        {/* Book Showcase - Central placement of book cover */}
        <div className="row justify-content-center mb-5">
          <div className="col-10 col-sm-8 col-md-6 col-lg-5 col-xl-4 text-center mb-4">
            <div className="mx-auto" style={{ maxWidth: "350px" }}>
              <BookCover />
            </div>
          </div>
        </div>
        
        {/* Book Description */}
        <div className="row justify-content-center mb-5">
          <div className="col-lg-10">
            <div className="card border-0 shadow-sm">
              <div className="card-body p-4 p-lg-5">
                <h3 className="h4 fw-bold font-montserrat mb-4 text-center">
                  Buchbeschreibung
                </h3>
                
                <p className="mb-4">
                  Unser Ratgeber ist einzigartig, da er als einziger alle Informationen zusammenfasst, die benötigt werden, um Geld zu sparen. Dies macht ihn nützlich und wertvoll für die Leser.
                </p>
                
                <h4 className="h5 fw-bold font-montserrat mb-3">Der Ratgeber hat ein dreifaches Ziel:</h4>
                
                <div className="mb-4">
                  <div className="d-flex align-items-start gap-3 mb-3">
                    <div className="flex-shrink-0 mt-1">
                      <i className="fas fa-check-circle text-lux-blue fa-lg"></i>
                    </div>
                    <div>
                      <p className="mb-0">Familien in prekären Situationen helfen, ihre Würde zu bewahren, indem sie aktiv nach Lösungen für ihre finanziellen Schwierigkeiten suchen und den Alltag meistern.</p>
                    </div>
                  </div>
                  
                  <div className="d-flex align-items-start gap-3 mb-3">
                    <div className="flex-shrink-0 mt-1">
                      <i className="fas fa-check-circle text-lux-blue fa-lg"></i>
                    </div>
                    <div>
                      <p className="mb-0">Familien Zeit sparen, indem alle benötigten Informationen an einem Ort bereitgestellt werden.</p>
                    </div>
                  </div>
                  
                  <div className="d-flex align-items-start gap-3 mb-3">
                    <div className="flex-shrink-0 mt-1">
                      <i className="fas fa-check-circle text-lux-blue fa-lg"></i>
                    </div>
                    <div>
                      <p className="mb-0">Verantwortungsvollen Konsum fördern, indem die Sozial- und Solidarwirtschaft unterstützt wird.</p>
                    </div>
                  </div>
                </div>
                
                <p className="mb-4">
                  Der Ratgeber bietet zugängliche Informationen zu Ressourcen, die bei einem sparsamen Konsum und der Budgetverwaltung helfen. Er stellt eine einzigartige Plattform dar, die das Großherzogtum (Tourismus, Soziales, Kultur usw.) aus der Perspektive der wirtschaftlichen Zugänglichkeit für alle präsentiert.
                </p>
                
                {/* About Project Leader */}
                <div className="card bg-light border-0 mb-4">
                  <div className="card-body p-4">
                    <h4 className="h5 fw-bold font-montserrat mb-3">Über die Projektleiterin:</h4>
                    <p className="mb-0">
                      Mein Name ist Pascale ZAOUROU. Ich bin eine alleinerziehende Mutter von drei Kindern, 49 Jahre alt, mit einem Abschluss in Erziehungswissenschaften und einem Diplom in Sozialwissenschaften und Mediation. Ich lebe seit über fünfzehn Jahren in Luxemburg. Dieses Projekt basiert auf meinen persönlichen Erfahrungen, gefolgt von Interviews mit Studenten und Alleinerziehenden, um deren beste Tipps zu erfahren, sowie Gesprächen mit Vereinsführern und Schlüsselakteuren der luxemburgischen Sozial- und Solidarwirtschaft.
                    </p>
                  </div>
                </div>
                
                {/* Context */}
                <div className="card bg-light border-0 mb-4">
                  <div className="card-body p-4">
                    <h4 className="h5 fw-bold font-montserrat mb-3">Kontext:</h4>
                    <p className="mb-0">
                      Heute kommen 45% der Arbeitnehmer in Luxemburg von jenseits der Grenzen, und 75% der aktiven Bevölkerung sind nicht einheimisch. Wir adressieren auch das Problem der Working Poor. Verschiedene Gesundheits-, Klima- und Sicherheitskrisen haben die Haushaltsbudgets geschwächt. Das Phänomen der Working Poor hat sich in Luxemburg verstärkt. Während das Land darauf abzielt, Talente anzuziehen, behindert die hohe Lebenshaltungskosten seine Attraktivität. Eine gründliche Marktstudie zeigt aktuelle Lücken in den Informationen zu erschwinglichen Tipps und Verbraucherbedürfnissen sowie beim Zugang zu sozialen Maßnahmen. Im Durchschnitt haben zwischen 50% und 80% der potenziellen Begünstigten keinen Zugang zu sozialen Maßnahmen, weil sie nicht informiert sind.
                    </p>
                  </div>
                </div>
                
                {/* Target Audience */}
                <div className="card bg-light border-0 mb-4">
                  <div className="card-body p-4">
                    <h4 className="h5 fw-bold font-montserrat mb-3">Zielgruppe:</h4>
                    <div className="row">
                      <div className="col-md-6">
                        <ul className="mb-md-0">
                          <li>Einheimische, die ihr Budget verwalten möchten</li>
                          <li>Studenten, junge Berufstätige</li>
                          <li>Reisende mit kleinem Budget</li>
                          <li>Gemeinden</li>
                          <li>Sozialdienste</li>
                          <li>Personalabteilungen</li>
                          <li>Nicht ansässige Expatriates</li>
                        </ul>
                      </div>
                      <div className="col-md-6">
                        <ul className="mb-0">
                          <li>Unternehmen, die in der ersten Ausgabe vorgestellt wurden</li>
                          <li>Unternehmen, die sich für CSR im Bank- oder Konsumgütersektor interessieren</li>
                          <li>Ministerien</li>
                          <li>Zeitarbeitsfirmen</li>
                          <li>Kindertagesstätten</li>
                          <li>Immobilienagenturen</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Innovation */}
                <div className="card bg-light border-0 mb-4">
                  <div className="card-body p-4">
                    <h4 className="h5 fw-bold font-montserrat mb-3">Innovation:</h4>
                    <p className="mb-3">Die Innovation des Projekts liegt in mehreren Aspekten:</p>
                    <ul className="mb-0">
                      <li>Die Vielfalt der behandelten Themen. Unser Projekt ist das einzige, das alle Bereiche des täglichen Lebens behandelt: Finanzen, Kultur, Möbel, Unternehmertum, Ernährung, und trägt so zur Senkung der Haushaltsausgaben bei und bietet eine wirtschaftliche Alternative.</li>
                      <li>Eine Antwort auf die hohen Lebenshaltungskosten in Luxemburg</li>
                      <li>Einzigartig</li>
                    </ul>
                  </div>
                </div>
                
                {/* Content */}
                <div className="card bg-light border-0 mb-4">
                  <div className="card-body p-4">
                    <h4 className="h5 fw-bold font-montserrat mb-3">Inhalt des Ratgebers:</h4>
                    <ul className="mb-0">
                      <li>Abschnitte zum täglichen Leben (wie in der ersten Ausgabe: Essen, Wohnen, Ausgehen, Besichtigen, Einkaufen usw.)</li>
                      <li>Neue Abschnitte zu Schulbildung, Ausbildung und Studium</li>
                      <li>Förderung der Sozial- und Solidarwirtschaft</li>
                    </ul>
                  </div>
                </div>
                
                {/* Price and Order Button */}
                <div className="text-center mb-4">
                  <div className="d-flex justify-content-center align-items-center gap-3 mb-4">
                    <div className="text-lux-red fw-bold fs-1">€24.99</div>
                    <div className="text-decoration-line-through text-muted fs-4">€34.99</div>
                    <div className="badge bg-lux-red px-2 py-1 fs-6 fw-bold">SAVE 28%</div>
                  </div>
                  
                  {/* Alert placeholder for order confirmation */}
                  <div id="orderAlertPlaceholder" className="mb-3"></div>
                  
                  {/* Order Button - Visually distinct and noticeable */}
                  <div className="d-grid gap-2 col-md-6 mx-auto">
                    <button 
                      className="btn btn-lg btn-danger py-3 shadow-sm" 
                      style={{ backgroundColor: '#E31837', borderColor: '#E31837' }}
                      data-bs-toggle="modal" 
                      data-bs-target="#orderModal"
                    >
                      <i className="fas fa-shopping-cart me-2"></i> Jetzt bestellen
                    </button>
                    <p className="text-muted small mt-2">
                      <i className="fas fa-truck me-1"></i> Kostenloser Versand in Luxemburg. Internationaler Versand möglich.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Order Modal */}
      <div className="modal fade" id="orderModal" tabIndex={-1} aria-labelledby="orderModalLabel" aria-hidden="true">
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header bg-lux-blue text-white">
              <h5 className="modal-title" id="orderModalLabel">Bestellung abschließen</h5>
              <button type="button" className="btn-close btn-close-white" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              <form onSubmit={handleOrder} id="orderForm">
                <div className="row g-3 mb-3">
                  <div className="col-md-6">
                    <label htmlFor="firstName" className="form-label">Vorname</label>
                    <input 
                      type="text" 
                      className="form-control" 
                      id="firstName" 
                      value={formData.firstName}
                      onChange={handleChange}
                      required 
                    />
                  </div>
                  <div className="col-md-6">
                    <label htmlFor="lastName" className="form-label">Nachname</label>
                    <input 
                      type="text" 
                      className="form-control" 
                      id="lastName" 
                      value={formData.lastName}
                      onChange={handleChange}
                      required 
                    />
                  </div>
                </div>
                
                <div className="mb-3">
                  <label htmlFor="email" className="form-label">E-Mail</label>
                  <input 
                    type="email" 
                    className="form-control" 
                    id="email" 
                    value={formData.email}
                    onChange={handleChange}
                    required 
                  />
                </div>
                
                <div className="mb-3">
                  <label htmlFor="address" className="form-label">Lieferadresse</label>
                  <input 
                    type="text" 
                    className="form-control" 
                    id="address" 
                    value={formData.address}
                    onChange={handleChange}
                    required 
                  />
                </div>
                
                <div className="row g-3 mb-3">
                  <div className="col-md-6">
                    <label htmlFor="city" className="form-label">Stadt</label>
                    <input 
                      type="text" 
                      className="form-control" 
                      id="city" 
                      value={formData.city}
                      onChange={handleChange}
                      required 
                    />
                  </div>
                  <div className="col-md-6">
                    <label htmlFor="postalCode" className="form-label">Postleitzahl</label>
                    <input 
                      type="text" 
                      className="form-control" 
                      id="postalCode" 
                      value={formData.postalCode}
                      onChange={handleChange}
                      required 
                    />
                  </div>
                </div>
                
                <div className="d-flex justify-content-between align-items-center border-top pt-3 mt-3">
                  <span className="fw-bold">Gesamtbetrag:</span>
                  <span className="text-lux-red fw-bold fs-4">€24.99</span>
                </div>
              </form>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-outline-secondary" data-bs-dismiss="modal">Abbrechen</button>
              <button 
                type="submit" 
                form="orderForm" 
                className="btn btn-danger"
                style={{ backgroundColor: '#E31837', borderColor: '#E31837' }}
                disabled={isOrderProcessing}
              >
                {isOrderProcessing ? (
                  <>
                    <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                    Verarbeitung...
                  </>
                ) : (
                  'Kauf abschließen'
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}