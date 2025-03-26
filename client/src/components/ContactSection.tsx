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
            <h2 className="display-5 fw-bold font-montserrat mb-3">Contact Us</h2>
            <p className="lead text-muted">Have questions? Want to work with us? Reach out using the form below.</p>
          </div>
        </div>
        
        <div className="row g-5 justify-content-center">
          <div className="col-md-6">
            <div className="card shadow-sm border-0 rounded-4">
              <div className="card-body p-4 p-md-5">
                <h3 className="h4 fw-bold font-montserrat mb-4">Get In Touch</h3>
                
                <form onSubmit={onSubmit}>
                  <div className="mb-3">
                    <label htmlFor="name" className="form-label fw-semibold">Your Name</label>
                    <input 
                      type="text" 
                      className="form-control form-control-lg" 
                      id="name" 
                      name="name" 
                      placeholder="Enter your name"
                      required 
                    />
                  </div>
                  
                  <div className="mb-3">
                    <label htmlFor="email" className="form-label fw-semibold">Your Email</label>
                    <input 
                      type="email" 
                      className="form-control form-control-lg" 
                      id="email" 
                      name="email" 
                      placeholder="Enter your email"
                      required 
                    />
                  </div>
                  
                  <div className="mb-4">
                    <label htmlFor="message" className="form-label fw-semibold">Your Message</label>
                    <textarea 
                      className="form-control form-control-lg" 
                      id="message" 
                      name="message" 
                      rows={5} 
                      placeholder="Enter your message"
                      required
                    ></textarea>
                  </div>
                  
                  <button 
                    type="submit" 
                    className="btn btn-lg bg-lux-blue text-white fw-semibold" 
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <>
                        <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                        Sending...
                      </>
                    ) : "Send Message"}
                  </button>
                </form>
              </div>
            </div>
          </div>
          
          <div className="col-md-5">
            <h3 className="h4 fw-bold font-montserrat mb-4">Contact Information</h3>
            
            <div className="d-flex mb-4">
              <div className="flex-shrink-0 text-lux-blue me-3 mt-1">
                <i className="fas fa-envelope fs-5"></i>
              </div>
              <div>
                <h4 className="h6 fw-semibold mb-1">Email</h4>
                <p className="text-muted mb-0">info@luxembourgpaschère.lu</p>
              </div>
            </div>
            
            <div className="d-flex mb-4">
              <div className="flex-shrink-0 text-lux-blue me-3 mt-1">
                <i className="fas fa-phone fs-5"></i>
              </div>
              <div>
                <h4 className="h6 fw-semibold mb-1">Phone</h4>
                <p className="text-muted mb-0">+352 123 456 789</p>
              </div>
            </div>
            
            <hr className="my-4" />
            
            <div className="mb-4">
              <h4 className="h6 fw-semibold mb-3">Follow Us</h4>
              <div className="d-flex gap-3">
                <a href="#" className="social-icon" aria-label="Facebook">
                  <div className="rounded-circle bg-light p-3 text-center">
                    <i className="fab fa-facebook-f text-lux-blue"></i>
                  </div>
                </a>
                <a href="#" className="social-icon" aria-label="Twitter">
                  <div className="rounded-circle bg-light p-3 text-center">
                    <i className="fab fa-twitter text-lux-blue"></i>
                  </div>
                </a>
                <a href="#" className="social-icon" aria-label="Instagram">
                  <div className="rounded-circle bg-light p-3 text-center">
                    <i className="fab fa-instagram text-lux-blue"></i>
                  </div>
                </a>
                <a href="#" className="social-icon" aria-label="LinkedIn">
                  <div className="rounded-circle bg-light p-3 text-center">
                    <i className="fab fa-linkedin-in text-lux-blue"></i>
                  </div>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
