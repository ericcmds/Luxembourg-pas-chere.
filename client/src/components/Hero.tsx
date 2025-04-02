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
      
      {/* Hauptinhalt - präzise ausgerichtet */}
      <div className="position-relative h-100" style={{ zIndex: 2 }}>
        <div className="container py-5 min-vh-100 d-flex flex-column justify-content-center align-items-center">
          {/* Haupttitel - exakt zentriert und vollständig sichtbar */}
          <div className="text-center mb-5 mt-4 px-3">
            <h1 className="fw-bold font-montserrat" style={{ fontSize: "2rem", lineHeight: "1.3" }}>
              Le Guide Incontournable pour Économiser au Luxembourg
            </h1>
            
            <p className="lead mt-4 mx-auto" style={{ maxWidth: "700px", opacity: 0.9, fontSize: "1.1rem" }}>
              Découvrez comment profiter de ce magnifique pays sans vider votre portefeuille.
            </p>
          </div>

          {/* Buchcover - exakt zentriert und formatiert wie im Screenshot */}
          <div className="text-center mb-5">
            <div 
              className="position-relative mx-auto shadow-lg" 
              style={{ 
                maxWidth: "270px", 
                background: "white", 
                borderRadius: "8px",
                padding: "8px",
                boxShadow: "0 15px 30px rgba(0,0,0,0.15)"
              }}
            >
              <BookCover />
            </div>
          </div>
          
          {/* COMMANDER Button - präzise positioniert wie im Screenshot */}
          <div className="text-center">
            <button 
              className="btn btn-info fw-bold shadow-lg position-relative overflow-hidden" 
              style={{ 
                fontSize: "1rem",
                background: "#00A4E0",
                border: "none",
                borderRadius: "4px",
                padding: "12px 30px",
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
