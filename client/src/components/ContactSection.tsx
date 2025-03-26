import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import { contactSchema } from "@shared/schema";
import { useMutation } from "@tanstack/react-query";

export default function ContactSection() {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const form = useForm({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      name: "",
      email: "",
      message: ""
    }
  });
  
  const { mutate } = useMutation({
    mutationFn: (values: Record<string, any>) => {
      return apiRequest("POST", "/api/contact", values);
    },
    onSuccess: () => {
      toast({
        title: "Message sent!",
        description: "We'll get back to you as soon as possible.",
      });
      form.reset();
      setIsSubmitting(false);
    },
    onError: () => {
      toast({
        title: "Error",
        description: "There was a problem sending your message. Please try again.",
        variant: "destructive",
      });
      setIsSubmitting(false);
    }
  });

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const name = formData.get('name') as string;
    const email = formData.get('email') as string;
    const message = formData.get('message') as string;
    
    if (!name || !email || !message) {
      toast({
        title: "Error",
        description: "Please fill out all fields.",
        variant: "destructive",
      });
      return;
    }
    
    setIsSubmitting(true);
    mutate({ name, email, message });
  }

  return (
    <section id="contact" className="py-5 py-md-6 bg-white">
      <div className="container">
        <div className="row justify-content-center mb-5">
          <div className="col-lg-8 text-center">
            <h2 className="display-5 fw-bold font-montserrat mb-3">Kontakt</h2>
            <p className="lead text-muted">Haben Sie Fragen? Möchten Sie mit uns zusammenarbeiten? Kontaktieren Sie uns über das Formular unten.</p>
          </div>
        </div>
        
        <div className="row g-5 justify-content-center">
          <div className="col-md-6">
            <div className="card shadow-sm border-0 rounded-4">
              <div className="card-body p-4 p-md-5">
                <h3 className="h4 fw-bold font-montserrat mb-4">Kontaktieren Sie uns</h3>
                
                <form onSubmit={onSubmit} aria-label="Kontaktformular" noValidate>
                  <div className="mb-3">
                    <label htmlFor="name" className="form-label fw-semibold">Ihr Name <span className="text-danger" aria-hidden="true">*</span></label>
                    <input 
                      type="text" 
                      className="form-control form-control-lg" 
                      id="name" 
                      name="name" 
                      placeholder="Geben Sie Ihren Namen ein"
                      required 
                      aria-required="true"
                      autoComplete="name"
                    />
                    <div className="invalid-feedback">Bitte geben Sie Ihren Namen ein.</div>
                  </div>
                  
                  <div className="mb-3">
                    <label htmlFor="email" className="form-label fw-semibold">Ihre E-Mail <span className="text-danger" aria-hidden="true">*</span></label>
                    <input 
                      type="email" 
                      className="form-control form-control-lg" 
                      id="email" 
                      name="email" 
                      placeholder="Geben Sie Ihre E-Mail ein"
                      required 
                      aria-required="true"
                      autoComplete="email"
                      pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"
                    />
                    <div className="invalid-feedback">Bitte geben Sie eine gültige E-Mail-Adresse ein.</div>
                  </div>
                  
                  <div className="mb-4">
                    <label htmlFor="message" className="form-label fw-semibold">Ihre Nachricht <span className="text-danger" aria-hidden="true">*</span></label>
                    <textarea 
                      className="form-control form-control-lg" 
                      id="message" 
                      name="message" 
                      rows={5} 
                      placeholder="Geben Sie Ihre Nachricht ein"
                      required
                      aria-required="true"
                      minLength={10}
                    ></textarea>
                    <div className="invalid-feedback">Bitte geben Sie eine Nachricht mit mindestens 10 Zeichen ein.</div>
                  </div>
                  
                  <div className="mb-4 form-check">
                    <input
                      type="checkbox"
                      className="form-check-input"
                      id="privacyCheck"
                      required
                      aria-required="true"
                    />
                    <label className="form-check-label" htmlFor="privacyCheck">
                      Ich stimme der <a href="#" className="text-lux-blue">Datenschutzerklärung</a> zu <span className="text-danger" aria-hidden="true">*</span>
                    </label>
                    <div className="invalid-feedback">
                      Sie müssen der Datenschutzerklärung zustimmen, um fortzufahren.
                    </div>
                  </div>
                  
                  <div className="d-grid">
                    <button 
                      type="submit" 
                      className="btn btn-lg bg-lux-blue text-white fw-semibold" 
                      disabled={isSubmitting}
                      aria-busy={isSubmitting}
                    >
                      {isSubmitting ? (
                        <>
                          <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                          <span>Wird gesendet...</span>
                        </>
                      ) : <span>Nachricht senden</span>}
                    </button>
                  </div>
                  
                  <div className="mt-3 small text-muted">
                    <span className="text-danger">*</span> Pflichtfelder
                  </div>
                </form>
              </div>
            </div>
          </div>
          
          <div className="col-md-5">
            <h3 className="h4 fw-bold font-montserrat mb-4">Kontaktinformationen</h3>
            
            <div className="d-flex mb-4">
              <div className="flex-shrink-0 text-lux-blue me-3 mt-1">
                <i className="fas fa-envelope fs-5" aria-hidden="true"></i>
              </div>
              <div>
                <h4 className="h6 fw-semibold mb-1">E-Mail</h4>
                <p className="text-muted mb-0">
                  <a href="mailto:info@luxembourgpaschère.lu" className="text-decoration-none text-muted hover-text-lux-blue">
                    info@luxembourgpaschère.lu
                  </a>
                </p>
              </div>
            </div>
            
            <div className="d-flex mb-4">
              <div className="flex-shrink-0 text-lux-blue me-3 mt-1">
                <i className="fas fa-phone fs-5" aria-hidden="true"></i>
              </div>
              <div>
                <h4 className="h6 fw-semibold mb-1">Telefon</h4>
                <p className="text-muted mb-0">
                  <a href="tel:+352123456789" className="text-decoration-none text-muted hover-text-lux-blue">
                    +352 123 456 789
                  </a>
                </p>
              </div>
            </div>
            
            <div className="d-flex mb-4">
              <div className="flex-shrink-0 text-lux-blue me-3 mt-1">
                <i className="fas fa-map-marker-alt fs-5" aria-hidden="true"></i>
              </div>
              <div>
                <h4 className="h6 fw-semibold mb-1">Adresse</h4>
                <address className="text-muted mb-0" style={{fontStyle: 'normal'}}>
                  Luxembourg Pas Chère<br />
                  123 Rue du Commerce<br />
                  L-1040 Luxembourg
                </address>
              </div>
            </div>
            
            <hr className="my-4" />
            
            <div className="mb-4">
              <h4 className="h6 fw-semibold mb-3">Folgen Sie uns</h4>
              <div className="d-flex gap-3" role="list" aria-label="Social Media Links">
                <a href="#" className="social-icon" aria-label="Besuchen Sie uns auf Facebook">
                  <div className="rounded-circle bg-light p-3 text-center">
                    <i className="fab fa-facebook-f text-lux-blue" aria-hidden="true"></i>
                  </div>
                </a>
                <a href="#" className="social-icon" aria-label="Folgen Sie uns auf Twitter">
                  <div className="rounded-circle bg-light p-3 text-center">
                    <i className="fab fa-twitter text-lux-blue" aria-hidden="true"></i>
                  </div>
                </a>
                <a href="#" className="social-icon" aria-label="Folgen Sie uns auf Instagram">
                  <div className="rounded-circle bg-light p-3 text-center">
                    <i className="fab fa-instagram text-lux-blue" aria-hidden="true"></i>
                  </div>
                </a>
                <a href="#" className="social-icon" aria-label="Verbinden Sie sich mit uns auf LinkedIn">
                  <div className="rounded-circle bg-light p-3 text-center">
                    <i className="fab fa-linkedin-in text-lux-blue" aria-hidden="true"></i>
                  </div>
                </a>
              </div>
            </div>
            
            <div className="card shadow-sm border-0 rounded-4 p-4 mt-5">
              <h4 className="h6 fw-semibold mb-3">Geschäftszeiten</h4>
              <div className="d-flex justify-content-between mb-2">
                <span>Montag - Freitag:</span>
                <span>9:00 - 18:00 Uhr</span>
              </div>
              <div className="d-flex justify-content-between mb-2">
                <span>Samstag:</span>
                <span>10:00 - 15:00 Uhr</span>
              </div>
              <div className="d-flex justify-content-between">
                <span>Sonntag:</span>
                <span>Geschlossen</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
