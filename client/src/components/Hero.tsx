import BookCover from "./BookCover";
import { ShoppingCart } from "lucide-react";

export default function Hero() {
  return (
    <section id="home" className="position-relative text-white overflow-hidden">
      {/* Hintergrund-Gradient exakt wie im Screenshot */}
      <div 
        className="position-absolute top-0 start-0 w-100 h-100" 
        style={{
          background: 'linear-gradient(135deg, rgba(227, 24, 55, 0.95) 0%, rgba(0, 164, 224, 0.95) 100%)',
          zIndex: 0
        }}
      />
      
      {/* Hauptinhalt mit verbesserten responsiven Eigenschaften */}
      <div className="position-relative h-100 w-100" style={{ zIndex: 2 }}>
        <div className="container pt-4 pb-5 min-vh-100 d-flex flex-column justify-content-center">
          {/* Haupttitel - garantiert für alle Geräte vollständig sichtbar */}
          <div className="text-center mb-5 pt-5 mt-4">
            <div className="row justify-content-center">
              <div className="col-12">
                <p className="mb-0 w-100 px-4" style={{ 
                  fontSize: "calc(0.9rem + 0.5vw)",
                  lineHeight: "1.4",
                  maxWidth: "600px",
                  margin: "0 auto"
                }}>
                  Les meilleurs conseils et offres pour une vie abordable au Luxembourg.
                </p>
                <p className="mt-2 w-100 px-4" style={{ 
                  fontSize: "calc(0.9rem + 0.5vw)", 
                  lineHeight: "1.4",
                  maxWidth: "600px",
                  margin: "0 auto"
                }}>
                  Découvrez comment profiter de ce magnifique pays sans vider votre portefeuille.
                </p>
              </div>
            </div>
          </div>

          {/* Buchcover - zentriert mit optimierter responsiver Darstellung */}
          <div className="text-center mb-5">
            <div 
              className="position-relative mx-auto shadow-lg" 
              style={{ 
                maxWidth: "270px", 
                width: "90%",
                background: "white", 
                borderRadius: "8px",
                padding: "8px",
                boxShadow: "0 15px 30px rgba(0,0,0,0.15)"
              }}
            >
              <BookCover />
            </div>
          </div>
          
          {/* COMMANDER Button - optimiert für alle Geräte */}
          <div className="text-center mt-3">
            <button 
              className="btn fw-bold shadow-lg position-relative overflow-hidden" 
              style={{ 
                fontSize: "clamp(0.9rem, 1.5vw, 1.1rem)",
                background: "#00A4E0",
                color: "white",
                border: "none",
                borderRadius: "4px",
                padding: "clamp(10px, 2vw, 12px) clamp(20px, 4vw, 30px)",
                letterSpacing: "1px",
                boxShadow: "0 5px 15px rgba(0, 164, 224, 0.4)"
              }}
            >
              <ShoppingCart className="me-2" size={18} />
              COMMANDER
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
