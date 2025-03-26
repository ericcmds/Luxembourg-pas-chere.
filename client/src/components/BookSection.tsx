import { useState } from "react";
import BookCover from "./BookCover";
import { Button } from "@/components/ui/button";
import { ShoppingCart, Truck, Check } from "lucide-react";

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
    <section id="book" className="py-5 py-lg-6 bg-light">
      <div className="container">
        <div className="row justify-content-center mb-4">
          <div className="col-lg-8 text-center">
            <h2 className="display-5 fw-bold font-montserrat mb-3">
              <span className="text-[#E31837]">Luxembourg Pas Chère</span>
            </h2>
            <p className="lead mb-4">
              Der einzige umfassende Ratgeber für kostengünstiges Leben in Luxemburg
            </p>
          </div>
        </div>
        
        {/* Featured Book - Two Column Layout */}
        <div className="card border-0 shadow-lg overflow-hidden rounded-lg mb-5">
          <div className="row g-0">
            {/* Left Column - Book Image */}
            <div className="col-md-5 bg-gradient-to-r from-[#f8f9fa] to-[#e9ecef] d-flex align-items-center justify-content-center p-4">
              <div className="book-display position-relative" style={{ maxWidth: "400px" }}>
                <BookCover />
                
                {/* Floating badge */}
                <div className="position-absolute top-0 end-0 translate-middle">
                  <div className="bg-[#E31837] text-white rounded-circle py-2 px-3 shadow-lg" 
                       style={{ transform: "rotate(15deg)" }}>
                    <span className="d-block text-center fw-bold fs-6">NEW</span>
                    <span className="d-block text-center small">Edition</span>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Right Column - Book Info */}
            <div className="col-md-7">
              <div className="card-body p-4 p-lg-5">
                <h3 className="h3 fw-bold font-montserrat mb-4">
                  Der ultimative Guide für günstiges Leben in Luxemburg
                </h3>
                
                <div className="mb-4">
                  <p className="text-muted mb-4">
                    Entdecken Sie über 500 Tipps, um in Luxemburg erheblich zu sparen. Diese unverzichtbare Ressource bietet umfassende Informationen zu günstigen Optionen in allen Lebensbereichen - von Einkaufen und Wohnen bis hin zu Freizeit und Bildung.
                  </p>
                  
                  <div className="d-flex flex-wrap gap-3 mb-4">
                    <div className="badge bg-light text-dark border px-3 py-2 d-flex align-items-center gap-2">
                      <Check size={16} className="text-[#E31837]" /> 
                      <span>500+ Spartipps</span>
                    </div>
                    <div className="badge bg-light text-dark border px-3 py-2 d-flex align-items-center gap-2">
                      <Check size={16} className="text-[#E31837]" /> 
                      <span>Aktualisierte Angebote</span>
                    </div>
                    <div className="badge bg-light text-dark border px-3 py-2 d-flex align-items-center gap-2">
                      <Check size={16} className="text-[#E31837]" /> 
                      <span>Expertenwissen</span>
                    </div>
                  </div>
                </div>
                
                {/* Price Display */}
                <div className="bg-light rounded-lg p-4 mb-4">
                  <div className="d-flex align-items-baseline gap-2">
                    <span className="text-[#E31837] fw-bold fs-1">€24.99</span>
                    <span className="text-decoration-line-through text-muted fs-4">€34.99</span>
                    <span className="badge bg-[#E31837] text-white px-2 py-1 fs-6">SAVE 28%</span>
                  </div>
                  
                  <div className="d-flex align-items-center mt-2">
                    <Truck className="text-[#00A4E0] me-2" size={18} />
                    <p className="mb-0 text-muted">
                      <span className="fw-medium">Kostenloser Versand in Luxemburg</span>
                    </p>
                  </div>
                </div>
                
                {/* Alert placeholder for order confirmation */}
                <div id="orderAlertPlaceholder" className="mb-3"></div>
                
                {/* Order Button - Red and prominent */}
                <Button
                  className="w-100 py-3 text-lg bg-[#E31837] hover:bg-[#c01530] text-white shadow-lg transition-transform hover:scale-105"
                  data-bs-toggle="modal" 
                  data-bs-target="#orderModal"
                >
                  <ShoppingCart className="me-2" size={20} />
                  Jetzt bestellen
                </Button>
                
                <div className="bg-[#f8f9fa] rounded-lg p-3 mt-4 border border-dashed">
                  <p className="mb-0 text-center text-muted small">
                    <span className="fw-medium">Im Preis enthalten:</span> 384 Seiten Vollfarbe, Hardcover-Format, 
                    Sparkalender für 12 Monate und exklusiver Online-Zugang zu aktualisierten Angeboten
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Book Details - Collapsible sections */}
        <div className="row justify-content-center">
          <div className="col-lg-10">
            <div className="accordion" id="bookDetailsAccordion">
              <div className="accordion-item border mb-3 rounded-lg shadow-sm">
                <h2 className="accordion-header">
                  <button 
                    className="accordion-button font-montserrat fw-semibold" 
                    type="button" 
                    data-bs-toggle="collapse" 
                    data-bs-target="#collapseOne" 
                    aria-expanded="true" 
                    aria-controls="collapseOne"
                  >
                    Über diesen Guide
                  </button>
                </h2>
                <div id="collapseOne" className="accordion-collapse collapse show" data-bs-parent="#bookDetailsAccordion">
                  <div className="accordion-body">
                    <p className="mb-4">
                      Unser Ratgeber ist einzigartig, da er als einziger alle Informationen zusammenfasst, die benötigt werden, um Geld zu sparen. Dies macht ihn nützlich und wertvoll für die Leser.
                    </p>
                    
                    <h4 className="h5 fw-bold font-montserrat mb-3">Der Ratgeber hat ein dreifaches Ziel:</h4>
                    
                    <div className="mb-4">
                      <div className="d-flex align-items-start gap-3 mb-3">
                        <div className="flex-shrink-0 mt-1">
                          <i className="fas fa-check-circle text-[#00A4E0] fa-lg"></i>
                        </div>
                        <div>
                          <p className="mb-0">Familien in prekären Situationen helfen, ihre Würde zu bewahren, indem sie aktiv nach Lösungen für ihre finanziellen Schwierigkeiten suchen und den Alltag meistern.</p>
                        </div>
                      </div>
                      
                      <div className="d-flex align-items-start gap-3 mb-3">
                        <div className="flex-shrink-0 mt-1">
                          <i className="fas fa-check-circle text-[#00A4E0] fa-lg"></i>
                        </div>
                        <div>
                          <p className="mb-0">Familien Zeit sparen, indem alle benötigten Informationen an einem Ort bereitgestellt werden.</p>
                        </div>
                      </div>
                      
                      <div className="d-flex align-items-start gap-3 mb-3">
                        <div className="flex-shrink-0 mt-1">
                          <i className="fas fa-check-circle text-[#00A4E0] fa-lg"></i>
                        </div>
                        <div>
                          <p className="mb-0">Verantwortungsvollen Konsum fördern, indem die Sozial- und Solidarwirtschaft unterstützt wird.</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Additional accordion items for other content */}
              <div className="accordion-item border mb-3 rounded-lg shadow-sm">
                <h2 className="accordion-header">
                  <button 
                    className="accordion-button collapsed font-montserrat fw-semibold" 
                    type="button" 
                    data-bs-toggle="collapse" 
                    data-bs-target="#collapseTwo" 
                    aria-expanded="false" 
                    aria-controls="collapseTwo"
                  >
                    Inhalt des Ratgebers
                  </button>
                </h2>
                <div id="collapseTwo" className="accordion-collapse collapse" data-bs-parent="#bookDetailsAccordion">
                  <div className="accordion-body">
                    <ul className="mb-0">
                      <li>Abschnitte zum täglichen Leben (wie in der ersten Ausgabe: Essen, Wohnen, Ausgehen, Besichtigen, Einkaufen usw.)</li>
                      <li>Neue Abschnitte zu Schulbildung, Ausbildung und Studium</li>
                      <li>Förderung der Sozial- und Solidarwirtschaft</li>
                    </ul>
                  </div>
                </div>
              </div>
              
              <div className="accordion-item border mb-3 rounded-lg shadow-sm">
                <h2 className="accordion-header">
                  <button 
                    className="accordion-button collapsed font-montserrat fw-semibold" 
                    type="button" 
                    data-bs-toggle="collapse" 
                    data-bs-target="#collapseThree" 
                    aria-expanded="false" 
                    aria-controls="collapseThree"
                  >
                    Zielgruppe
                  </button>
                </h2>
                <div id="collapseThree" className="accordion-collapse collapse" data-bs-parent="#bookDetailsAccordion">
                  <div className="accordion-body">
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
              </div>
              
              <div className="accordion-item border rounded-lg shadow-sm">
                <h2 className="accordion-header">
                  <button 
                    className="accordion-button collapsed font-montserrat fw-semibold" 
                    type="button" 
                    data-bs-toggle="collapse" 
                    data-bs-target="#collapseFour" 
                    aria-expanded="false" 
                    aria-controls="collapseFour"
                  >
                    Über die Autorin
                  </button>
                </h2>
                <div id="collapseFour" className="accordion-collapse collapse" data-bs-parent="#bookDetailsAccordion">
                  <div className="accordion-body">
                    <p className="mb-0">
                      Mein Name ist Pascale ZAOUROU. Ich bin eine alleinerziehende Mutter von drei Kindern, 49 Jahre alt, mit einem Abschluss in Erziehungswissenschaften und einem Diplom in Sozialwissenschaften und Mediation. Ich lebe seit über fünfzehn Jahren in Luxemburg. Dieses Projekt basiert auf meinen persönlichen Erfahrungen, gefolgt von Interviews mit Studenten und Alleinerziehenden, um deren beste Tipps zu erfahren, sowie Gesprächen mit Vereinsführern und Schlüsselakteuren der luxemburgischen Sozial- und Solidarwirtschaft.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Order Modal - Unchanged */}
      <div className="modal fade" id="orderModal" tabIndex={-1} aria-labelledby="orderModalLabel" aria-hidden="true">
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header text-white" style={{ backgroundColor: '#E31837' }}>
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
                
                <div className="d-flex justify-content-between align-items-center border-top pt-3 mt-4">
                  <div>
                    <div className="text-[#E31837] fw-bold">€24.99</div>
                    <div className="text-muted small">inkl. MwSt.</div>
                    <div className="text-success small fw-medium">
                      <Truck className="me-1" size={14} />
                      Kostenloser Versand
                    </div>
                  </div>
                  <button 
                    type="submit" 
                    className="btn btn-danger"
                    style={{ backgroundColor: '#E31837', borderColor: '#E31837' }}
                    disabled={isOrderProcessing}
                  >
                    {isOrderProcessing ? (
                      <>
                        <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                        Wird bearbeitet...
                      </>
                    ) : (
                      <>Jetzt kostenpflichtig bestellen</>
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}