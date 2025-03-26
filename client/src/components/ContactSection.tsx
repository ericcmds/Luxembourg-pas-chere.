import { useState, useEffect } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import { contactSchema } from "@shared/schema";
import { useMutation } from "@tanstack/react-query";
import { z } from "zod";
import { useTranslation } from '@/hooks/useTranslation'; // Added import for translation hook


// Extend the contactSchema with more validation requirements
const extendedContactSchema = contactSchema.extend({
  name: z.string().min(2, "Name muss mindestens 2 Zeichen lang sein"),
  email: z.string().email("Bitte geben Sie eine gültige E-Mail-Adresse ein"),
  message: z.string().min(10, "Nachricht muss mindestens 10 Zeichen lang sein"),
  privacyCheck: z.boolean().refine(val => val === true, {
    message: "Sie müssen der Datenschutzerklärung zustimmen",
  }),
});

// Type for our form values
type ContactFormValues = z.infer<typeof extendedContactSchema>;

export default function ContactSection() {
  const { t } = useTranslation(); // Added translation hook usage
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);

  // Initialize the form with react-hook-form
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitSuccessful }
  } = useForm<ContactFormValues>({
    resolver: zodResolver(extendedContactSchema),
    defaultValues: {
      name: "",
      email: "",
      message: "",
      privacyCheck: false
    }
  });

  // Reset the form when submission is successful
  useEffect(() => {
    if (isSubmitSuccessful) {
      reset();
      setFormSubmitted(true);
      // Hide success message after 5 seconds
      const timer = setTimeout(() => {
        setFormSubmitted(false);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [isSubmitSuccessful, reset]);

  // Setup the mutation for form submission
  const { mutate } = useMutation({
    mutationFn: (values: ContactFormValues) => {
      // Strip out the privacyCheck as it's not needed in the API call
      const { privacyCheck, ...contactData } = values;
      return apiRequest("POST", "/api/contact", contactData);
    },
    onSuccess: () => {
      toast({
        title: t("messageSent"), //Using translation for success message
        description: t("weWillContactYou"), //Using translation for success message
      });
      setIsSubmitting(false);
    },
    onError: () => {
      toast({
        title: t("error"), //Using translation for error message
        description: t("errorSendingMessage"), //Using translation for error message
        variant: "destructive",
      });
      setIsSubmitting(false);
      setFormSubmitted(false);
    }
  });

  // Form submission handler
  const onSubmit = (data: ContactFormValues) => {
    setIsSubmitting(true);
    mutate(data);
  };

  return (
    <section id="contact" className="py-5 py-md-6 bg-white">
      <div className="container">
        <div className="row justify-content-center mb-5">
          <div className="col-lg-8 text-center">
            <h2 className="display-5 fw-bold font-montserrat mb-3">{t("contact")}</h2> {/*Using translation for title*/}
            <p className="lead text-muted">{t("contactQuestion")}</p> {/*Using translation for description*/}
          </div>
        </div>

        <div className="row g-5 justify-content-center">
          <div className="col-md-6">
            <div className="card shadow-sm border-0 rounded-4">
              <div className="card-body p-4 p-md-5">
                <h3 className="h4 fw-bold font-montserrat mb-4">{t("contactUs")}</h3> {/*Using translation for title*/}

                {/* Success message that appears after form submission */}
                {formSubmitted && (
                  <div className="alert alert-success mb-4" role="alert">
                    <div className="d-flex">
                      <div className="flex-shrink-0">
                        <i className="fas fa-check-circle fa-lg me-2"></i>
                      </div>
                      <div>
                        <h4 className="alert-heading h5 mb-1">{t("messageSentSuccessfully")}</h4> {/*Using translation for title*/}
                        <p className="mb-0">{t("thankYouForYourInquiry")}</p> {/*Using translation for description*/}
                      </div>
                    </div>
                  </div>
                )}

                <form onSubmit={handleSubmit(onSubmit)} aria-label="Kontaktformular" noValidate>
                  <div className="mb-3">
                    <label htmlFor="name" className="form-label fw-semibold">{t("yourName")} <span className="text-danger" aria-hidden="true">*</span></label> {/*Using translation for label*/}
                    <input 
                      type="text" 
                      className={`form-control form-control-lg ${errors.name ? 'is-invalid' : ''}`}
                      id="name" 
                      placeholder={t("enterYourName")} {/*Using translation for placeholder*/}
                      aria-required="true"
                      autoComplete="name"
                      {...register("name")}
                    />
                    {errors.name && (
                      <div className="invalid-feedback" role="alert">
                        {errors.name.message}
                      </div>
                    )}
                  </div>

                  <div className="mb-3">
                    <label htmlFor="email" className="form-label fw-semibold">{t("yourEmail")} <span className="text-danger" aria-hidden="true">*</span></label> {/*Using translation for label*/}
                    <input 
                      type="email" 
                      className={`form-control form-control-lg ${errors.email ? 'is-invalid' : ''}`}
                      id="email" 
                      placeholder={t("enterYourEmail")} {/*Using translation for placeholder*/}
                      aria-required="true"
                      autoComplete="email"
                      {...register("email")}
                    />
                    {errors.email && (
                      <div className="invalid-feedback" role="alert">
                        <i className="fas fa-exclamation-circle me-1"></i>
                        {errors.email.message}
                      </div>
                    )}
                    <div className="form-text mt-1 small">{t("weWillNeverShareYourEmail")}</div> {/*Using translation for description*/}
                  </div>

                  <div className="mb-3">
                    <label htmlFor="message" className="form-label fw-semibold">{t("yourMessage")} <span className="text-danger" aria-hidden="true">*</span></label> {/*Using translation for label*/}
                    <textarea 
                      className={`form-control form-control-lg ${errors.message ? 'is-invalid' : ''}`}
                      id="message" 
                      rows={5}
                      placeholder={t("howCanWeHelpYou")} {/*Using translation for placeholder*/}
                      aria-required="true"
                      {...register("message")}
                    ></textarea>
                    {errors.message && (
                      <div className="invalid-feedback" role="alert">
                        <i className="fas fa-exclamation-circle me-1"></i>
                        {errors.message.message}
                      </div>
                    )}
                    <div className="form-text mt-1 small text-end">
                      <span id="message-counter" className={errors.message ? 'text-danger' : ''}>
                        {t("minimum10CharactersRequired")} {/*Using translation for description*/}
                      </span>
                    </div>
                  </div>

                  <div className="mb-4">
                    <div className="form-check">
                      <input 
                        className={`form-check-input ${errors.privacyCheck ? 'is-invalid' : ''}`}
                        type="checkbox" 
                        id="privacyCheck"
                        {...register("privacyCheck")}
                      />
                      <label className="form-check-label" htmlFor="privacyCheck">
                        {t("iAgreeToThe")} <a href="#privacy" className="text-decoration-underline" target="_blank" rel="noopener noreferrer">{t("privacyPolicy")}</a> {t("required")} <span className="text-danger" aria-hidden="true">*</span>
                      </label>
                      {errors.privacyCheck && (
                        <div className="invalid-feedback d-block mt-1" role="alert">
                          <i className="fas fa-exclamation-circle me-1"></i>
                          {errors.privacyCheck.message}
                        </div>
                      )}
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
                          <span>{t("sending")}</span> {/*Using translation for button text*/}
                        </>
                      ) : <span>{t("sendMessage")}</span>} {/*Using translation for button text*/}
                    </button>
                  </div>

                  <div className="mt-3 small text-muted">
                    <span className="text-danger">*</span> {t("requiredFields")} {/*Using translation for description*/}
                  </div>
                </form>
              </div>
            </div>
          </div>

          {/*Rest of the component remains unchanged*/}
          <div className="col-md-5">
            <h3 className="h4 fw-bold font-montserrat mb-4">{t("contactInformation")}</h3> {/*Using translation for title*/}

            <div className="d-flex mb-4">
              <div className="flex-shrink-0 text-lux-blue me-3 mt-1">
                <i className="fas fa-envelope fs-5" aria-hidden="true"></i>
              </div>
              <div>
                <h4 className="h6 fw-semibold mb-1">{t("email")}</h4> {/*Using translation for title*/}
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
                <h4 className="h6 fw-semibold mb-1">{t("phone")}</h4> {/*Using translation for title*/}
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
                <h4 className="h6 fw-semibold mb-1">{t("address")}</h4> {/*Using translation for title*/}
                <address className="text-muted mb-0" style={{fontStyle: 'normal'}}>
                  Luxembourg Pas Chère<br />
                  123 Rue du Commerce<br />
                  L-1040 Luxembourg
                </address>
              </div>
            </div>

            <hr className="my-4" />

            <div className="mb-4">
              <h4 className="h6 fw-semibold mb-3">{t("followUs")}</h4> {/*Using translation for title*/}
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
              <h4 className="h6 fw-semibold mb-3">{t("businessHours")}</h4> {/*Using translation for title*/}
              <div className="d-flex justify-content-between mb-2">
                <span>{t("mondayToFriday")}</span> {/*Using translation for description*/}
                <span>9:00 - 18:00 Uhr</span>
              </div>
              <div className="d-flex justify-content-between mb-2">
                <span>{t("saturday")}</span> {/*Using translation for description*/}
                <span>10:00 - 15:00 Uhr</span>
              </div>
              <div className="d-flex justify-content-between">
                <span>{t("sunday")}</span> {/*Using translation for description*/}
                <span>{t("closed")}</span> {/*Using translation for description*/}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}