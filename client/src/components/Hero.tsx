import BookCover from "./BookCover";
import { ShoppingCart } from "lucide-react";

export default function Hero() {
  return (
    <section id="home" className="position-relative text-white overflow-hidden">
      {/* Hintergrund-Gradient */}
      <div 
        className="position-absolute top-0 start-0 w-100 h-100" 
        style={{
          background: 'linear-gradient(135deg, rgba(227, 24, 55, 0.95) 0%, rgba(0, 164, 224, 0.95) 100%)',
          zIndex: 0
        }}
      />
      
      {/* Neu strukturierter Inhaltsbereich */}
      <div className="position-relative" style={{ zIndex: 2 }}>
        {/* Hauptcontainer mit fester Höhe und strukturiertem Layout */}
        <div className="container py-5" style={{ minHeight: "95vh" }}>
          {/* Dreispaltiges Layout für bessere Textplatzierung */}
          <div className="row" style={{ minHeight: "95vh" }}>
            <div className="col-12 d-flex flex-column justify-content-center align-items-center">
              
              {/* Textbereich mit klarer Sichtbarkeit */}
              <div className="text-center mb-4 mt-5">
                <div style={{ maxWidth: "90%", margin: "0 auto" }}>
                  <p style={{ 
                    fontSize: "1rem", 
                    lineHeight: "1.5",
                    marginBottom: "0.5rem",
                    textAlign: "center",
                    width: "100%",
                    display: "block"
                  }}>
                    Les meilleurs conseils et offres pour une vie abordable au Luxembourg.
                  </p>
                  <p style={{ 
                    fontSize: "1rem", 
                    lineHeight: "1.5",
                    textAlign: "center",
                    width: "100%",
                    display: "block"
                  }}>
                    Découvrez comment profiter de ce magnifique pays sans vider votre portefeuille.
                  </p>
                </div>
              </div>

              {/* Buchcover in fester Größe und Position */}
              <div className="text-center mb-4">
                <div 
                  className="mx-auto" 
                  style={{ 
                    width: "250px", 
                    background: "white", 
                    borderRadius: "8px",
                    padding: "8px",
                    boxShadow: "0 15px 30px rgba(0,0,0,0.15)"
                  }}
                >
                  <BookCover />
                </div>
              </div>
              
              {/* COMMANDER Button mit fester Größe und Position */}
              <div className="text-center mb-5">
                <button 
                  className="btn fw-bold" 
                  style={{ 
                    fontSize: "1rem",
                    background: "#00A4E0",
                    color: "white",
                    border: "none",
                    borderRadius: "4px",
                    padding: "12px 30px",
                    letterSpacing: "1px",
                    boxShadow: "0 5px 15px rgba(0,0,0,0.2)"
                  }}
                >
                  <ShoppingCart className="me-2" size={18} />
                  COMMANDER
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
