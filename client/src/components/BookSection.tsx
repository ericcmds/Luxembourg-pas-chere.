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
            <h2 className="display-6 fw-bold font-montserrat mb-3 section-title"> {/* Added section-title class */}
              <span className="text-[#E31837] highlight-text">Luxembourg Pas Chère</span>
            </h2> {/* Added highlight-text class */}
            <p className="lead mb-4">
              Der einzige umfassende Ratgeber für kostengünstiges Leben in Luxemburg
            </p>
          </div>
        </div>

        <div className="card border-0 shadow-lg overflow-hidden rounded-lg mb-5">
          <div className="row g-0">
            <div className="col-md-5 bg-gradient-to-r from-[#f8f9fa] to-[#e9ecef] d-flex align-items-center justify-content-center p-4">
              <div className="book-display position-relative" style={{ maxWidth: "400px" }}>
                <BookCover />

                <div className="position-absolute top-0 end-0 translate-middle">
                  <div className="bg-[#E31837] text-white rounded-circle py-2 px-3 shadow-lg" 
                       style={{ transform: "rotate(15deg)" }}>
                    <span className="d-block text-center fw-bold fs-6">NEW</span>
                    <span className="d-block text-center small">Edition</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-md-7 p-4">
              <div className="h-100 d-flex flex-column justify-content-between">
                <div>
                  <h3 className="font-montserrat mb-3 section-subtitle"> {/* Added section-subtitle class */}Your Complete Guide to Luxembourg on a Budget</h3>
                  <p className="text-muted">Discover insider tips and practical advice for enjoying Luxembourg without breaking the bank.</p>
                  <p className="mb-4">
                    Der umfassende Guide "Luxembourg Pas Chère" zeigt Ihnen, wie Sie in Luxemburg günstig leben können, ohne auf Qualität zu verzichten.
                  </p>

                  <div className="mb-4">
                    <h5 className="fw-bold mb-3">Was Sie erwartet:</h5>
                    <ul className="list-unstyled">
                      <li className="mb-2 d-flex align-items-center">
                        <i className="fas fa-check-circle text-success me-2"></i>
                        <span>Über 200 Spartipps für alle Lebensbereiche</span>
                      </li>
                      <li className="mb-2 d-flex align-items-center">
                        <i className="fas fa-check-circle text-success me-2"></i>
                        <span>Geheime Rabatte und lokale Angebote</span>
                      </li>
                      <li className="mb-2 d-flex align-items-center">
                        <i className="fas fa-check-circle text-success me-2"></i>
                        <span>Günstiger Wohnraum und Transportmöglichkeiten</span>
                      </li>
                      <li className="mb-2 d-flex align-items-center">
                        <i className="fas fa-check-circle text-success me-2"></i>
                        <span>Kostenlose Freizeitaktivitäten für die ganze Familie</span>
                      </li>
                    </ul>
                  </div>

                  <div className="price-tag-container mb-4">
                    <div className="d-flex align-items-center gap-3">
                      <div>
                        <span className="d-block fs-6 text-decoration-line-through text-muted">Regulär: €34.99</span>
                        <span className="d-block fs-2 fw-bold text-danger">Jetzt nur: €24.99</span>
                      </div>
                      <div className="bg-success text-white px-3 py-1 rounded-pill">
                        <span className="fw-bold">29% RABATT</span>
                      </div>
                    </div>
                    <p className="text-muted mt-2 small"><i className="fas fa-truck me-1"></i> Kostenloser Versand in Luxemburg</p>
                  </div>

                  <button 
                    className="btn btn-danger btn-lg rounded-pill shadow-lg px-5 py-3 fw-bold cta-button-animation" 
                    data-bs-toggle="modal" 
                    data-bs-target="#orderModal"
                  >
                    <i className="fas fa-shopping-cart me-2"></i>
                    JETZT BESTELLEN
                  </button>
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
      </div>
    </section>
  );
}