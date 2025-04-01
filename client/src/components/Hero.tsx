import BookCover from "./BookCover";
import { ShoppingCart } from "lucide-react";

export default function Hero() {
  return (
    <section id="home" className="position-relative text-white overflow-hidden">
      {/* Hero Background Image - Modernisiertes Design entsprechend dem Whiteboard */}
      <div className="position-absolute top-0 start-0 w-100 h-100 overflow-hidden">
        <img 
          src="https://images.unsplash.com/photo-1580846961439-725c18a67d53?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1920&q=80" 
          alt="Luxembourg City View" 
          className="w-100 h-100 object-fit-cover"
        />
      </div>
      
      {/* Diagonaler Gradient-Overlay für bessere Textlesbarkeit und modernes Design */}
      <div className="position-absolute top-0 start-0 w-100 h-100" 
        style={{
          background: 'linear-gradient(135deg, rgba(227, 24, 55, 0.85) 0%, rgba(0, 164, 224, 0.75) 100%)',
          zIndex: 1
        }}>
      </div>
      
      {/* Diagonale Linien als Designelement, ähnlich der Whiteboard-Skizze */}
      <div className="position-absolute top-0 start-0 w-100 h-100" 
        style={{
          background: 'repeating-linear-gradient(45deg, rgba(255,255,255,0.05), rgba(255,255,255,0.05) 10px, transparent 10px, transparent 20px)',
          zIndex: 1
        }}>
      </div>
      
      {/* Hauptinhalt */}
      <div className="position-relative px-4 px-md-5" style={{ zIndex: 2 }}>
        <div className="container py-5 py-md-6 py-lg-7 min-vh-100 d-flex flex-column justify-content-center">
          <div className="row align-items-center text-center mb-5">
            <div className="col-12">
              {/* Zeigt das aktuelle Datum prominent an wie auf dem Whiteboard-Design (25/12) */}
              <div className="badge bg-white text-[#E31837] d-inline-block mb-3 fw-semibold rounded-pill px-3 py-2">
                {new Date().toLocaleDateString('fr-FR', { day: '2-digit', month: '2-digit', year: '2-digit' })}
              </div>
              
              <h1 className="display-4 fw-bold font-montserrat mb-4">
                <span className="text-white">Luxembourg</span> <span className="text-white">Pas Chère</span>
              </h1>
              
              <p className="lead mb-5 opacity-90 font-opensans mx-auto" style={{ maxWidth: "700px" }}>
                Les meilleurs conseils et offres pour une vie abordable au Luxembourg. Découvrez comment profiter de ce magnifique pays sans vider votre portefeuille.
              </p>
            </div>
          </div>

          {/* Zentrales Buchelement - Genau wie auf dem Whiteboard-Design */}
          <div className="row justify-content-center mb-5">
            <div className="col-md-6 col-lg-4 text-center">
              <div className="position-relative mx-auto" style={{ maxWidth: "350px", zIndex: 3 }}>
                <div className="bg-white p-3 rounded-4 shadow-lg mb-4">
                  <BookCover />
                </div>
                
                {/* Preis-Badge im modernen Design */}
                <div className="position-absolute top-0 end-0 translate-middle">
                  <div className="bg-white text-[#E31837] rounded-circle py-2 px-3 shadow-lg fw-bold" 
                      style={{ transform: "rotate(15deg)" }}>
                    €24.99
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Großer 'Commander' Button als zentrales Element */}
          <div className="row justify-content-center mb-5">
            <div className="col-10 col-md-6 col-lg-4 text-center">
              <button 
                className="btn btn-light btn-lg w-100 rounded-pill shadow-lg px-5 py-3 fw-bold cta-button-animation position-relative overflow-hidden" 
                data-bs-toggle="modal" 
                data-bs-target="#orderModal"
                style={{ 
                  background: "#ffffff",
                  border: "none",
                  color: "#E31837",
                  fontSize: "1.25rem",
                  transform: "scale(1.05)"
                }}
              >
                <span className="position-absolute top-0 start-0 w-100 h-100" 
                  style={{
                    background: "linear-gradient(45deg, rgba(227,24,55,0.1), rgba(227,24,55,0))",
                    transform: "translateX(-100%)",
                    animation: "shine 3s infinite"
                  }}></span>
                <ShoppingCart className="me-2" />
                COMMANDER
              </button>
              
              <style>{`
                @keyframes shine {
                  0% { transform: translateX(-100%); }
                  60% { transform: translateX(100%); }
                  100% { transform: translateX(100%); }
                }
                .cta-button-animation {
                  transition: all 0.3s ease;
                }
                .cta-button-animation:hover {
                  transform: scale(1.1) !important;
                  box-shadow: 0 10px 25px rgba(227, 24, 55, 0.4) !important;
                }
              `}</style>
            </div>
          </div>
          
          {/* Feature-Badges unten */}
          <div className="row justify-content-center text-center mt-4">
            <div className="col-md-10">
              <div className="d-flex flex-wrap justify-content-center gap-2 mb-4">
                <div className="badge bg-white bg-opacity-25 text-white px-3 py-2 rounded-pill">
                  <i className="fas fa-map-marker-alt me-2"></i>
                  <span className="fw-medium">Secrets locaux</span>
                </div>
                <div className="badge bg-white bg-opacity-25 text-white px-3 py-2 rounded-pill">
                  <i className="fas fa-heart me-2"></i>
                  <span className="fw-medium">Offres exclusives</span>
                </div>
                <div className="badge bg-white bg-opacity-25 text-white px-3 py-2 rounded-pill">
                  <i className="fas fa-wallet me-2"></i>
                  <span className="fw-medium">Budget intelligent</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Scroll-Indikator */}
      <div className="position-absolute bottom-0 start-50 translate-middle-x d-none d-md-block mb-4" style={{ zIndex: 2 }}>
        <a href="#book" className="text-white opacity-75 hover-opacity-100 transition">
          <i className="fas fa-chevron-down fa-2x bounce"></i>
        </a>
      </div>
    </section>
  );
}
