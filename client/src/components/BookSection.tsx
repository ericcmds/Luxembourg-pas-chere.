import { useState } from "react";
import BookCover from "./BookCover";
import { Button } from "@/components/ui/button";
import { ShoppingCart, Truck, Check, BookOpen, Target, Lightbulb, ListChecks } from "lucide-react";

export default function BookSection() {
  const [isOrderProcessing, setIsOrderProcessing] = useState(false);
  const [activeTab, setActiveTab] = useState("description");
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
    <section id="book" className="py-5 py-lg-8 bg-light">
      <div className="container">
        <div className="row justify-content-center mb-5">
          <div className="col-lg-10 text-center">
            <h2 className="display-4 fw-bold font-montserrat mb-3 section-title"> 
              <span className="text-[#E31837] highlight-text">Luxembourg Pas Chère</span>
            </h2>
            <p className="lead mb-4 fs-4">
              Der einzige umfassende Ratgeber für kostengünstiges Leben in Luxemburg
            </p>
          </div>
        </div>

        {/* Prominently featured book with centered cover */}
        <div className="d-flex justify-content-center mb-5">
          <div className="book-display-container position-relative" style={{ maxWidth: "500px" }}>
            <div className="text-center mb-5">
              <div className="book-display position-relative mx-auto" style={{ maxWidth: "350px" }}>
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
            
            <div className="price-tag-container text-center mb-4">
              <div className="position-relative bg-white rounded-lg p-4 shadow-lg mx-auto" style={{ maxWidth: "300px", border: "2px dashed #E31837" }}>
                <div className="position-absolute" style={{ top: "-15px", right: "-15px" }}>
                  <div className="bg-[#E31837] text-white px-3 py-2 rounded-circle shadow-lg" style={{ transform: "rotate(15deg)" }}>
                    <span className="fw-bold">SAVE<br/>28%</span>
                  </div>
                </div>
                
                <div className="mb-2">
                  <span className="d-block fs-6 text-decoration-line-through text-muted mb-1">Regulär: €34.99</span>
                  <span className="d-block fs-1 fw-bold text-[#E31837]">€24.99</span>
                  <div className="mt-2 d-inline-block bg-success text-white px-3 py-1 rounded-pill">
                    <span className="fw-bold">LIMITIERTES ANGEBOT</span>
                  </div>
                </div>
                
                <div className="mt-3 d-flex justify-content-center gap-2">
                  <div className="bg-light rounded p-2 text-center">
                    <Truck className="mb-1 text-[#E31837]" size={20} />
                    <p className="mb-0 small">Kostenloser<br/>Versand</p>
                  </div>
                  <div className="bg-light rounded p-2 text-center">
                    <Check className="mb-1 text-[#E31837]" size={20} />
                    <p className="mb-0 small">500+ Tipps<br/>inklusive</p>
                  </div>
                  <div className="bg-light rounded p-2 text-center">
                    <BookOpen className="mb-1 text-[#E31837]" size={20} />
                    <p className="mb-0 small">2023<br/>Edition</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="d-grid gap-2 col-lg-6 mx-auto">
              <div className="position-relative">
                <div className="position-absolute" style={{ top: "-45px", left: "50%", transform: "translateX(-50%)" }}>
                  <div className="bg-white rounded-circle shadow-lg py-2 px-3 mb-2 mx-auto" style={{ width: "fit-content" }}>
                    <div className="text-center text-[#E31837]">
                      <i className="fas fa-arrow-down fa-2x"></i>
                    </div>
                  </div>
                </div>
                
                <button 
                  className="btn btn-danger btn-lg rounded-pill shadow-lg px-5 py-3 fw-bold cta-button-animation position-relative overflow-hidden" 
                  data-bs-toggle="modal" 
                  data-bs-target="#orderModal"
                  style={{ 
                    background: "linear-gradient(45deg, #E31837, #c01530)",
                    border: "none",
                    transform: "scale(1.05)"
                  }}
                >
                  <span className="position-absolute top-0 start-0 w-100 h-100" 
                    style={{
                      background: "linear-gradient(45deg, rgba(255,255,255,0.2), rgba(255,255,255,0))",
                      transform: "translateX(-100%)",
                      animation: "shine 3s infinite"
                    }}></span>
                  <ShoppingCart className="me-2" />
                  JETZT BESTELLEN
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
          </div>
        </div>

        {/* Detailed book description */}
        <div className="row mt-5">
          <div className="col-lg-10 mx-auto">
            <div className="card border-0 shadow-sm">
              <div className="card-body p-4 p-lg-5">
                <h3 className="card-title text-[#E31837] mb-4">Buchbeschreibung:</h3>
                
                <p className="fs-5 fw-medium text-dark mb-4">
                  Unser Ratgeber ist einzigartig, da er als einziger alle Informationen zum Geldsparen zusammenstellt. Das macht ihn nützlich und wertvoll für Leser.
                </p>
                
                <h4 className="mb-3">Der Ratgeber hat ein dreifaches Ziel:</h4>
                <div className="row mb-4">
                  <div className="col-md-4 mb-4">
                    <div className="card h-100 border-0 shadow-sm">
                      <div className="card-body">
                        <h5 className="card-title mb-3">Hilfe für Familien</h5>
                        <p className="card-text">
                          Hilfe für Familien in prekären Situationen, ihre Würde zu wahren, indem sie aktiv nach Lösungen für ihre finanziellen Schwierigkeiten suchen und den Alltag bewältigen.
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-4 mb-4">
                    <div className="card h-100 border-0 shadow-sm">
                      <div className="card-body">
                        <h5 className="card-title mb-3">Zeitersparnis</h5>
                        <p className="card-text">
                          Familien Zeit sparen, indem alle benötigten Informationen an einem Ort bereitgestellt werden.
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-4 mb-4">
                    <div className="card h-100 border-0 shadow-sm">
                      <div className="card-body">
                        <h5 className="card-title mb-3">Verantwortungsvoller Konsum</h5>
                        <p className="card-text">
                          Förderung des verantwortungsvollen Konsums durch Unterstützung der Sozial- und Solidarwirtschaft.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                
                <p className="mb-5">
                  Der Ratgeber bietet zugängliche Informationen zu Ressourcen, die bei sparsamen Konsum und Budgetmanagement helfen. Er bietet eine einzigartige Plattform, die das Großherzogtum (Tourismus, Soziales, Kultur usw.) aus der Perspektive der wirtschaftlichen Zugänglichkeit für alle präsentiert.
                </p>
                                
                <h3 className="card-title text-[#E31837] mb-4">Über die Projektleiterin:</h3>
                <p className="mb-4">
                  Mein Name ist Pascale ZAOUROU. Ich bin alleinerziehende Mutter von drei Kindern, 49 Jahre alt, mit einem Abschluss in Erziehungswissenschaften und einem Diplom in Sozialwissenschaften und Mediation. Ich lebe seit über fünfzehn Jahren in Luxemburg. Dieses Projekt basiert auf meinen persönlichen Erfahrungen, gefolgt von Interviews mit Studenten und Alleinerziehenden, um ihre besten Tipps zu erfahren, sowie auf Gesprächen mit Vereinsführern und Schlüsselpersonen der luxemburgischen Sozial- und Solidarwirtschaft.
                </p>
                
                <h3 className="card-title text-[#E31837] mb-4">Kontext:</h3>
                <p className="mb-4">
                  Heute kommen 45% der Arbeitnehmer in Luxemburg aus den Grenzregionen, und 75% der aktiven Bevölkerung ist nicht einheimisch. Wir thematisieren auch das Problem der arbeitenden Armen. Verschiedene Gesundheits-, Klima- und Sicherheitskrisen haben die Haushaltsbudgets geschwächt. Das Phänomen der arbeitenden Armen hat sich in Luxemburg verschärft. Während das Land darauf abzielt, Talente anzuziehen, behindert die hohen Lebenshaltungskosten seine Attraktivität.
                </p>
                
                <p className="mb-5">
                  Eine gründliche Marktstudie zeigt aktuelle Informationslücken zu erschwinglichen Tipps und Verbraucherbedürfnissen sowie den Zugang zu sozialen Maßnahmen. Durchschnittlich haben zwischen 50% und 80% der potenziellen Begünstigten keinen Zugang zu sozialen Maßnahmen, weil sie nicht informiert sind.
                </p>

                <h3 className="card-title text-[#E31837] mb-4">Innovation:</h3>
                <p className="mb-4">Die Innovation des Projekts liegt in mehreren Aspekten:</p>
                
                <div className="row mb-4">
                  <div className="col-md-6 mb-4">
                    <div className="card h-100 border-0 shadow-sm">
                      <div className="card-body">
                        <h5 className="card-title mb-3">Themenvielfalt</h5>
                        <p className="card-text">
                          Die Vielfalt der behandelten Themen. Unser Projekt ist das einzige, das alle Bereiche des täglichen Lebens umfasst: Finanzen, Kultur, Möbel, Unternehmertum, Lebensmittel, was zur Senkung der Haushaltsausgaben beiträgt und eine wirtschaftliche Alternative bietet.
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-6 mb-4">
                    <div className="card h-100 border-0 shadow-sm">
                      <div className="card-body">
                        <h5 className="card-title mb-3">Antwort auf hohe Lebenshaltungskosten</h5>
                        <p className="card-text">
                          Eine konkrete Antwort auf die hohen Lebenshaltungskosten in Luxemburg, die für viele Haushalte eine tägliche Herausforderung darstellen. Unser Buch bietet praktische Lösungen für dieses drängende Problem.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <h3 className="card-title text-[#E31837] mb-4">Inhalt des Ratgebers:</h3>
                <ul className="list-group list-group-flush mb-5">
                  <li className="list-group-item border-0 ps-0">
                    <Check className="me-2 text-success" size={20} />
                    Abschnitte zum täglichen Leben (wie in der ersten Ausgabe: Essen, Wohnen, Ausgehen, Besuchen, Einkaufen usw.)
                  </li>
                  <li className="list-group-item border-0 ps-0">
                    <Check className="me-2 text-success" size={20} />
                    Neue Abschnitte zu Schulbildung, Ausbildung und Studium
                  </li>
                  <li className="list-group-item border-0 ps-0">
                    <Check className="me-2 text-success" size={20} />
                    Förderung der Sozial- und Solidarwirtschaft
                  </li>
                </ul>
                
                <div className="d-grid gap-2 col-lg-6 mx-auto mt-5">
                  <button 
                    className="btn btn-danger btn-lg rounded-pill shadow-lg px-5 py-3 fw-bold cta-button-animation" 
                    data-bs-toggle="modal" 
                    data-bs-target="#orderModal"
                  >
                    <ShoppingCart className="me-2" />
                    JETZT BESTELLEN
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs for book details */}
        <div className="row mb-5">
          <div className="col-12">
            <ul className="nav nav-tabs nav-justified mb-4" id="bookDetailsTabs" role="tablist">
              <li className="nav-item" role="presentation">
                <button 
                  className={`nav-link ${activeTab === "description" ? "active" : ""}`}
                  onClick={() => setActiveTab("description")} 
                  id="description-tab" 
                  type="button" 
                  role="tab"
                  aria-controls="description" 
                  aria-selected={activeTab === "description"}
                >
                  <BookOpen className="me-2" size={18} />
                  Beschreibung
                </button>
              </li>
              <li className="nav-item" role="presentation">
                <button 
                  className={`nav-link ${activeTab === "target" ? "active" : ""}`}
                  onClick={() => setActiveTab("target")} 
                  id="target-tab" 
                  type="button" 
                  role="tab"
                  aria-controls="target" 
                  aria-selected={activeTab === "target"}
                >
                  <Target className="me-2" size={18} />
                  Zielgruppe
                </button>
              </li>
              <li className="nav-item" role="presentation">
                <button 
                  className={`nav-link ${activeTab === "innovation" ? "active" : ""}`}
                  onClick={() => setActiveTab("innovation")} 
                  id="innovation-tab" 
                  type="button" 
                  role="tab"
                  aria-controls="innovation" 
                  aria-selected={activeTab === "innovation"}
                >
                  <Lightbulb className="me-2" size={18} />
                  Innovation
                </button>
              </li>
              <li className="nav-item" role="presentation">
                <button 
                  className={`nav-link ${activeTab === "content" ? "active" : ""}`}
                  onClick={() => setActiveTab("content")} 
                  id="content-tab" 
                  type="button" 
                  role="tab"
                  aria-controls="content" 
                  aria-selected={activeTab === "content"}
                >
                  <ListChecks className="me-2" size={18} />
                  Inhalt
                </button>
              </li>
            </ul>

            <div className="tab-content p-4 bg-white rounded-bottom shadow-sm" id="bookDetailsTabContent">
              <div className={`tab-pane fade ${activeTab === "description" ? "show active" : ""}`} id="description" role="tabpanel" aria-labelledby="description-tab">
                <h4 className="mb-4 text-[#E31837]">Der Ratgeber hat ein dreifaches Ziel:</h4>
                <div className="row">
                  <div className="col-md-4 mb-4">
                    <div className="card h-100 border-0 shadow-sm">
                      <div className="card-body">
                        <h5 className="card-title mb-3">Hilfe für Familien</h5>
                        <p className="card-text">
                          Hilfe für Familien in prekären Situationen, ihre Würde zu wahren, indem sie aktiv nach Lösungen für ihre finanziellen Schwierigkeiten suchen und den Alltag bewältigen.
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-4 mb-4">
                    <div className="card h-100 border-0 shadow-sm">
                      <div className="card-body">
                        <h5 className="card-title mb-3">Zeitersparnis</h5>
                        <p className="card-text">
                          Familien Zeit sparen, indem alle benötigten Informationen an einem Ort bereitgestellt werden.
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-4 mb-4">
                    <div className="card h-100 border-0 shadow-sm">
                      <div className="card-body">
                        <h5 className="card-title mb-3">Verantwortungsvoller Konsum</h5>
                        <p className="card-text">
                          Förderung des verantwortungsvollen Konsums durch Unterstützung der Sozial- und Solidarwirtschaft.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                <p className="mt-4">
                  Der Ratgeber bietet zugängliche Informationen zu Ressourcen, die bei sparsamen Konsum und Budgetmanagement helfen. Er bietet eine einzigartige Plattform, die das Großherzogtum (Tourismus, Soziales, Kultur usw.) aus der Perspektive der wirtschaftlichen Zugänglichkeit für alle präsentiert.
                </p>
              </div>

              <div className={`tab-pane fade ${activeTab === "target" ? "show active" : ""}`} id="target" role="tabpanel" aria-labelledby="target-tab">
                <h4 className="mb-4 text-[#E31837]">Zielgruppe</h4>
                <div className="row">
                  <div className="col-md-6">
                    <ul className="list-group list-group-flush mb-4">
                      <li className="list-group-item border-0 ps-0">
                        <Check className="me-2 text-success" size={20} />
                        Ortsansässige, die auf ihr Budget achten
                      </li>
                      <li className="list-group-item border-0 ps-0">
                        <Check className="me-2 text-success" size={20} />
                        Studenten, junge Berufstätige
                      </li>
                      <li className="list-group-item border-0 ps-0">
                        <Check className="me-2 text-success" size={20} />
                        Budgetbewusste Reisende
                      </li>
                      <li className="list-group-item border-0 ps-0">
                        <Check className="me-2 text-success" size={20} />
                        Gemeinden
                      </li>
                      <li className="list-group-item border-0 ps-0">
                        <Check className="me-2 text-success" size={20} />
                        Sozialdienste
                      </li>
                      <li className="list-group-item border-0 ps-0">
                        <Check className="me-2 text-success" size={20} />
                        Personalabteilungen
                      </li>
                    </ul>
                  </div>
                  <div className="col-md-6">
                    <ul className="list-group list-group-flush mb-4">
                      <li className="list-group-item border-0 ps-0">
                        <Check className="me-2 text-success" size={20} />
                        Nicht-ansässige Expatriates
                      </li>
                      <li className="list-group-item border-0 ps-0">
                        <Check className="me-2 text-success" size={20} />
                        In der ersten Ausgabe vorgestellte Unternehmen
                      </li>
                      <li className="list-group-item border-0 ps-0">
                        <Check className="me-2 text-success" size={20} />
                        Unternehmen im Bank- oder Konsumgüterbereich mit CSR-Fokus
                      </li>
                      <li className="list-group-item border-0 ps-0">
                        <Check className="me-2 text-success" size={20} />
                        Ministerien
                      </li>
                      <li className="list-group-item border-0 ps-0">
                        <Check className="me-2 text-success" size={20} />
                        Zeitarbeitsfirmen
                      </li>
                      <li className="list-group-item border-0 ps-0">
                        <Check className="me-2 text-success" size={20} />
                        Kindertagesstätten und Immobilienmakler
                      </li>
                    </ul>
                  </div>
                </div>
                <div className="p-4 bg-light rounded mt-2">
                  <h5 className="mb-3">Kontext</h5>
                  <p>
                    Heute kommen 45% der Arbeitnehmer in Luxemburg aus den Grenzregionen, und 75% der aktiven Bevölkerung ist nicht einheimisch. Wir thematisieren auch das Problem der arbeitenden Armen. Verschiedene Gesundheits-, Klima- und Sicherheitskrisen haben die Haushaltsbudgets geschwächt. Das Phänomen der arbeitenden Armen hat sich in Luxemburg verschärft. Während das Land darauf abzielt, Talente anzuziehen, behindert die hohen Lebenshaltungskosten seine Attraktivität. Eine gründliche Marktstudie zeigt aktuelle Informationslücken zu erschwinglichen Tipps und Verbraucherbedürfnissen sowie den Zugang zu sozialen Maßnahmen. Durchschnittlich haben zwischen 50% und 80% der potenziellen Begünstigten keinen Zugang zu sozialen Maßnahmen, weil sie nicht informiert sind.
                  </p>
                </div>
              </div>

              <div className={`tab-pane fade ${activeTab === "innovation" ? "show active" : ""}`} id="innovation" role="tabpanel" aria-labelledby="innovation-tab">
                <h4 className="mb-4 text-[#E31837]">Innovation</h4>
                <p className="mb-4">Die Innovation des Projekts liegt in mehreren Aspekten:</p>
                <div className="card mb-4 border-0 shadow-sm">
                  <div className="card-body">
                    <h5 className="card-title">Themenvielfalt</h5>
                    <p className="card-text">
                      Die Vielfalt der behandelten Themen. Unser Projekt ist das einzige, das alle Bereiche des täglichen Lebens umfasst: Finanzen, Kultur, Möbel, Unternehmertum, Lebensmittel, was zur Senkung der Haushaltsausgaben beiträgt und eine wirtschaftliche Alternative bietet.
                    </p>
                  </div>
                </div>
                <div className="card mb-4 border-0 shadow-sm">
                  <div className="card-body">
                    <h5 className="card-title">Antwort auf hohe Lebenshaltungskosten</h5>
                    <p className="card-text">
                      Eine konkrete Antwort auf die hohen Lebenshaltungskosten in Luxemburg, die für viele Haushalte eine tägliche Herausforderung darstellen.
                    </p>
                  </div>
                </div>
                <div className="card mb-4 border-0 shadow-sm">
                  <div className="card-body">
                    <h5 className="card-title">Einzigartige Ressource</h5>
                    <p className="card-text">
                      Ein in Luxemburg einzigartiges Referenzwerk für alle, die nach praktischen Lösungen für ein kostengünstigeres Leben suchen.
                    </p>
                  </div>
                </div>
                <div className="alert alert-primary d-flex align-items-center mt-4" role="alert">
                  <Lightbulb className="me-3 flex-shrink-0" size={24} />
                  <div>
                    <p className="mb-0">
                      <strong>Über die Projektleiterin:</strong> Mein Name ist Pascale ZAOUROU. Ich bin eine alleinerziehende Mutter von drei Kindern, 49 Jahre alt, mit einem Abschluss in Erziehungswissenschaften und einem Diplom in Sozialwissenschaften und Mediation. Ich lebe seit über fünfzehn Jahren in Luxemburg. Dieses Projekt basiert auf meinen persönlichen Erfahrungen, gefolgt von Interviews mit Studenten, Alleinerziehenden, um ihre besten Tipps zu erfahren, und Gesprächen mit Vereinsvertretern und Schlüsselfiguren der Sozial- und Solidarwirtschaft Luxemburgs.
                    </p>
                  </div>
                </div>
              </div>

              <div className={`tab-pane fade ${activeTab === "content" ? "show active" : ""}`} id="content" role="tabpanel" aria-labelledby="content-tab">
                <h4 className="mb-4 text-[#E31837]">Inhalt des Ratgebers</h4>
                <div className="row mb-4">
                  <div className="col-md-4 mb-4">
                    <div className="card h-100 border-0 shadow-sm">
                      <div className="card-body text-center">
                        <div className="rounded-circle bg-light p-3 d-inline-flex align-items-center justify-content-center mb-3" style={{ width: "70px", height: "70px" }}>
                          <i className="fas fa-utensils fa-2x text-[#E31837]"></i>
                        </div>
                        <h5 className="card-title">Alltagsbereiche</h5>
                        <p className="card-text">
                          Bereiche des täglichen Lebens (wie in der ersten Ausgabe: Essen, Wohnen, Ausgehen, Besichtigen, Einkaufen usw.)
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-4 mb-4">
                    <div className="card h-100 border-0 shadow-sm">
                      <div className="card-body text-center">
                        <div className="rounded-circle bg-light p-3 d-inline-flex align-items-center justify-content-center mb-3" style={{ width: "70px", height: "70px" }}>
                          <i className="fas fa-graduation-cap fa-2x text-[#E31837]"></i>
                        </div>
                        <h5 className="card-title">Neue Abschnitte</h5>
                        <p className="card-text">
                          Neue Abschnitte zu Schulbildung, Ausbildung und Studium mit wertvollen Tipps für Familien und Studenten
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-4 mb-4">
                    <div className="card h-100 border-0 shadow-sm">
                      <div className="card-body text-center">
                        <div className="rounded-circle bg-light p-3 d-inline-flex align-items-center justify-content-center mb-3" style={{ width: "70px", height: "70px" }}>
                          <i className="fas fa-handshake fa-2x text-[#E31837]"></i>
                        </div>
                        <h5 className="card-title">Soziale Wirtschaft</h5>
                        <p className="card-text">
                          Förderung der Sozial- und Solidarwirtschaft mit konkreten Beispielen und lokalen Initiativen
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <h5 className="mb-3">Was Sie in diesem Buch finden:</h5>
                <div className="row">
                  <div className="col-md-6">
                    <ul className="list-group list-group-flush mb-4">
                      <li className="list-group-item border-0 ps-0">
                        <i className="fas fa-check-circle text-success me-2"></i>
                        <span>Über 200 Spartipps für alle Lebensbereiche</span>
                      </li>
                      <li className="list-group-item border-0 ps-0">
                        <i className="fas fa-check-circle text-success me-2"></i>
                        <span>Geheime Rabatte und lokale Angebote</span>
                      </li>
                      <li className="list-group-item border-0 ps-0">
                        <i className="fas fa-check-circle text-success me-2"></i>
                        <span>Günstiger Wohnraum und Transportmöglichkeiten</span>
                      </li>
                    </ul>
                  </div>
                  <div className="col-md-6">
                    <ul className="list-group list-group-flush mb-4">
                      <li className="list-group-item border-0 ps-0">
                        <i className="fas fa-check-circle text-success me-2"></i>
                        <span>Kostenlose Freizeitaktivitäten für die ganze Familie</span>
                      </li>
                      <li className="list-group-item border-0 ps-0">
                        <i className="fas fa-check-circle text-success me-2"></i>
                        <span>Hilfreiche Ressourcen für Neuankömmlinge in Luxemburg</span>
                      </li>
                      <li className="list-group-item border-0 ps-0">
                        <i className="fas fa-check-circle text-success me-2"></i>
                        <span>Saisonale Angebote und Veranstaltungen</span>
                      </li>
                    </ul>
                  </div>
                </div>

                <div className="text-center mt-4">
                  <button 
                    className="btn btn-danger btn-lg rounded-pill shadow-lg px-5 py-3 fw-bold cta-button-animation" 
                    data-bs-toggle="modal" 
                    data-bs-target="#orderModal"
                  >
                    <ShoppingCart className="me-2" />
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