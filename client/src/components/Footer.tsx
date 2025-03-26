import { useState } from 'react';

export default function Footer() {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [subscribed, setSubscribed] = useState(false);

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email.trim()) return;
    
    setIsSubmitting(true);
    
    // Simulate API call for newsletter subscription
    setTimeout(() => {
      setIsSubmitting(false);
      setSubscribed(true);
      setEmail('');
      
      // Reset the success message after 5 seconds
      setTimeout(() => {
        setSubscribed(false);
      }, 5000);
    }, 1000);
  };

  return (
    <footer className="bg-lux-dark text-white py-5 py-lg-6">
      <div className="container">
        {/* Newsletter Subscription */}
        <div className="row justify-content-center mb-5">
          <div className="col-lg-8">
            <div className="card bg-lux-dark-light border-0 p-4 shadow">
              <div className="card-body text-center">
                <h3 className="font-montserrat fw-bold fs-4 mb-3">Bleiben Sie auf dem Laufenden</h3>
                <p className="text-light-gray mb-4">
                  Abonnieren Sie unseren Newsletter und erhalten Sie die neuesten Angebote, Tipps und Aktionen direkt in Ihren Posteingang.
                </p>
                
                {subscribed ? (
                  <div className="alert alert-success">
                    <i className="fas fa-check-circle me-2"></i> Vielen Dank! Sie haben sich erfolgreich für unseren Newsletter angemeldet.
                  </div>
                ) : (
                  <form onSubmit={handleNewsletterSubmit} className="row g-2 justify-content-center">
                    <div className="col-12 col-md-8">
                      <div className="input-group">
                        <input 
                          type="email" 
                          className="form-control" 
                          placeholder="Ihre E-Mail-Adresse" 
                          aria-label="Email address"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          required
                        />
                        <button 
                          className="btn btn-lux-red" 
                          type="submit"
                          disabled={isSubmitting}
                        >
                          {isSubmitting ? (
                            <>
                              <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                              Wird verarbeitet...
                            </>
                          ) : (
                            <>
                              <i className="fas fa-paper-plane me-2"></i> Abonnieren
                            </>
                          )}
                        </button>
                      </div>
                      <div className="form-text text-light-gray small mt-2">
                        Wir respektieren Ihre Privatsphäre. Sie können den Newsletter jederzeit abbestellen.
                      </div>
                    </div>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
        
        <div className="row g-4 g-xl-5">
          {/* Logo and Description */}
          <div className="col-12 col-md-6 col-lg-3">
            <div className="mb-4">
              <a href="#" className="d-inline-block text-decoration-none mb-3">
                <span className="text-lux-red font-montserrat fw-bold fs-3">Luxembourg</span>
                <span className="text-lux-blue font-montserrat fw-bold fs-3 ms-1">Pas Chère</span>
              </a>
              <p className="text-light-gray mb-3">
                Ihr Ratgeber für ein günstiges Leben in Luxemburg ohne finanziellen Druck.
              </p>
              <div className="d-flex gap-2">
                <a href="#" className="btn btn-sm btn-outline-light rounded-circle p-2" aria-label="Facebook">
                  <i className="fab fa-facebook-f"></i>
                </a>
                <a href="#" className="btn btn-sm btn-outline-light rounded-circle p-2" aria-label="Twitter">
                  <i className="fab fa-twitter"></i>
                </a>
                <a href="#" className="btn btn-sm btn-outline-light rounded-circle p-2" aria-label="Instagram">
                  <i className="fab fa-instagram"></i>
                </a>
                <a href="#" className="btn btn-sm btn-outline-light rounded-circle p-2" aria-label="LinkedIn">
                  <i className="fab fa-linkedin-in"></i>
                </a>
              </div>
            </div>
          </div>
          
          {/* Main Navigation */}
          <div className="col-12 col-md-6 col-lg-3">
            <div className="mb-4">
              <h3 className="font-montserrat fw-semibold fs-5 mb-3">Hauptnavigation</h3>
              <ul className="list-unstyled mb-0">
                <li className="mb-2"><a href="#home" className="text-light-gray footer-link">Startseite</a></li>
                <li className="mb-2"><a href="#offers" className="text-light-gray footer-link">Angebote</a></li>
                <li className="mb-2"><a href="#blog" className="text-light-gray footer-link">Blog</a></li>
                <li className="mb-2"><a href="#about" className="text-light-gray footer-link">Über uns</a></li>
                <li className="mb-2"><a href="#contact" className="text-light-gray footer-link">Kontakt</a></li>
              </ul>
            </div>
          </div>
          
          {/* Categories */}
          <div className="col-12 col-md-6 col-lg-3">
            <div className="mb-4">
              <h3 className="font-montserrat fw-semibold fs-5 mb-3">Kategorien</h3>
              <ul className="list-unstyled mb-0">
                <li className="mb-2"><a href="#" className="text-light-gray footer-link">Restaurants</a></li>
                <li className="mb-2"><a href="#" className="text-light-gray footer-link">Shopping</a></li>
                <li className="mb-2"><a href="#" className="text-light-gray footer-link">Aktivitäten</a></li>
                <li className="mb-2"><a href="#" className="text-light-gray footer-link">Unterkünfte</a></li>
                <li className="mb-2"><a href="#" className="text-light-gray footer-link">Transport</a></li>
              </ul>
            </div>
          </div>
          
          {/* Legal */}
          <div className="col-12 col-md-6 col-lg-3">
            <div className="mb-4">
              <h3 className="font-montserrat fw-semibold fs-5 mb-3">Rechtliches</h3>
              <ul className="list-unstyled mb-0">
                <li className="mb-2"><a href="#" className="text-light-gray footer-link">Nutzungsbedingungen</a></li>
                <li className="mb-2"><a href="#" className="text-light-gray footer-link">Datenschutzerklärung</a></li>
                <li className="mb-2"><a href="#" className="text-light-gray footer-link">Cookie-Richtlinie</a></li>
                <li className="mb-2"><a href="#" className="text-light-gray footer-link">Haftungsausschluss</a></li>
              </ul>
            </div>
          </div>
        </div>
        
        {/* Copyright */}
        <div className="border-top border-secondary mt-4 pt-4 text-center">
          <p className="text-light-gray mb-0">
            © 2025 Luxembourg Pas Chère. Alle Rechte vorbehalten.
          </p>
        </div>
      </div>
    </footer>
  );
}
