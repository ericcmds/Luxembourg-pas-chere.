import React, { useState, useEffect } from 'react';
import { X, ShoppingCart, CreditCard, CheckCircle, ChevronLeft, ChevronRight, Truck, Shield, AlertCircle } from 'lucide-react';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  language: 'fr' | 'de' | 'en';
  selectedPackage?: {
    name: string;
    price: number;
    description: string;
  } | null;
}

type CheckoutStep = 'cart' | 'info' | 'payment' | 'confirmation';

const CheckoutModal: React.FC<CheckoutModalProps> = ({ isOpen, onClose, language, selectedPackage }) => {
  const [step, setStep] = useState<CheckoutStep>('cart');
  const [promoCode, setPromoCode] = useState<string>('');
  const [promoApplied, setPromoApplied] = useState<boolean>(false);
  const [promoDiscount, setPromoDiscount] = useState<number>(0);
  const [email, setEmail] = useState<string>('');
  const [emailError, setEmailError] = useState<string>('');
  const [name, setName] = useState<string>('');
  const [acceptTerms, setAcceptTerms] = useState<boolean>(false);
  const [termsError, setTermsError] = useState<string>('');
  const [acceptNewsletter, setAcceptNewsletter] = useState<boolean>(false);
  const [selectedPayment, setSelectedPayment] = useState<string>('card');
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [sessionTimeoutWarning, setSessionTimeoutWarning] = useState<boolean>(false);
  
  // Handle escape key to close modal
  useEffect(() => {
    const handleEscKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };
    
    window.addEventListener('keydown', handleEscKey);
    
    // Set a timeout for session warning
    const sessionTimeout = setTimeout(() => {
      setSessionTimeoutWarning(true);
    }, 300000); // 5 minutes
    
    return () => {
      window.removeEventListener('keydown', handleEscKey);
      clearTimeout(sessionTimeout);
    };
  }, [onClose]);
  
  // Reset state when modal opens
  useEffect(() => {
    if (isOpen) {
      setStep('cart');
      setPromoCode('');
      setPromoApplied(false);
      setPromoDiscount(0);
      setEmail('');
      setEmailError('');
      setName('');
      setAcceptTerms(false);
      setTermsError('');
      setAcceptNewsletter(false);
      setSelectedPayment('card');
      setIsProcessing(false);
      setSessionTimeoutWarning(false);
    }
  }, [isOpen]);
  
  // Validate email in real-time
  useEffect(() => {
    if (email) {
      if (!email.includes('@') || !email.includes('.')) {
        setEmailError(
          language === 'fr' ? 'Adresse e-mail invalide' :
          language === 'de' ? 'Ungültige E-Mail-Adresse' :
          'Invalid email address'
        );
      } else {
        setEmailError('');
      }
    } else {
      setEmailError('');
    }
  }, [email, language]);
  
  if (!isOpen) return null;

  // Translations
  const t = {
    // Cart step
    cartTitle: language === 'fr' ? 'Votre panier' : language === 'de' ? 'Ihr Warenkorb' : 'Your Cart',
    product: language === 'fr' ? 'Produit' : language === 'de' ? 'Produkt' : 'Product',
    price: language === 'fr' ? 'Prix' : language === 'de' ? 'Preis' : 'Price',
    guide: language === 'fr' ? 'Luxembourg Pas Cher - Guide Pratique' : language === 'de' ? 'Luxembourg Pas Cher - Praktischer Führer' : 'Luxembourg Pas Cher - Practical Guide',
    digital: language === 'fr' ? 'Edition numérique' : language === 'de' ? 'Digitale Ausgabe' : 'Digital Edition',
    promo: language === 'fr' ? 'Code promo' : language === 'de' ? 'Gutscheincode' : 'Promo code',
    apply: language === 'fr' ? 'Appliquer' : language === 'de' ? 'Anwenden' : 'Apply',
    subtotal: language === 'fr' ? 'Sous-total' : language === 'de' ? 'Zwischensumme' : 'Subtotal',
    vat: language === 'fr' ? 'TVA (17%)' : language === 'de' ? 'MwSt. (17%)' : 'VAT (17%)',
    total: language === 'fr' ? 'Total' : language === 'de' ? 'Gesamtsumme' : 'Total',
    proceedToCheckout: language === 'fr' ? 'Passer à la caisse' : language === 'de' ? 'Zur Kasse gehen' : 'Proceed to Checkout',
    
    // Info step
    infoTitle: language === 'fr' ? 'Vos informations' : language === 'de' ? 'Ihre Informationen' : 'Your Information',
    emailLabel: language === 'fr' ? 'Email' : language === 'de' ? 'E-Mail' : 'Email',
    emailPlaceholder: language === 'fr' ? 'votre@email.com' : language === 'de' ? 'ihre@email.com' : 'your@email.com',
    nameLabel: language === 'fr' ? 'Nom (optionnel)' : language === 'de' ? 'Name (optional)' : 'Name (optional)',
    namePlaceholder: language === 'fr' ? 'Votre nom' : language === 'de' ? 'Ihr Name' : 'Your name',
    deliveryInfo: language === 'fr' ? 'Le guide numérique sera envoyé à votre email immédiatement après l\'achat.' : 
                  language === 'de' ? 'Der digitale Führer wird sofort nach dem Kauf an Ihre E-Mail gesendet.' : 
                  'The digital guide will be sent to your email immediately after purchase.',
    termsCheckbox: language === 'fr' ? 'J\'accepte les conditions générales et la politique de confidentialité' : 
                  language === 'de' ? 'Ich akzeptiere die Allgemeinen Geschäftsbedingungen und Datenschutzrichtlinien' : 
                  'I accept the terms and conditions and privacy policy',
    newsletterCheckbox: language === 'fr' ? 'Je souhaite recevoir des mises à jour et des offres spéciales (optionnel)' : 
                        language === 'de' ? 'Ich möchte Updates und Sonderangebote erhalten (optional)' : 
                        'I want to receive updates and special offers (optional)',
    continueToPayment: language === 'fr' ? 'Continuer vers le paiement' : language === 'de' ? 'Weiter zur Zahlung' : 'Continue to Payment',
    
    // Payment step
    paymentTitle: language === 'fr' ? 'Paiement' : language === 'de' ? 'Zahlung' : 'Payment',
    paymentMethod: language === 'fr' ? 'Méthode de paiement' : language === 'de' ? 'Zahlungsmethode' : 'Payment Method',
    creditCard: language === 'fr' ? 'Carte de crédit' : language === 'de' ? 'Kreditkarte' : 'Credit Card',
    paypal: 'PayPal',
    applePay: 'Apple Pay',
    googlePay: 'Google Pay',
    securePayment: language === 'fr' ? 'Paiement sécurisé' : language === 'de' ? 'Sichere Zahlung' : 'Secure Payment',
    secureInfo: language === 'fr' ? 'Toutes les transactions sont sécurisées et cryptées.' : 
                language === 'de' ? 'Alle Transaktionen sind sicher und verschlüsselt.' : 
                'All transactions are secure and encrypted.',
    purchaseButton: language === 'fr' ? 'Acheter maintenant' : language === 'de' ? 'Jetzt kaufen' : 'Purchase Now',
    
    // Confirmation step
    thankYou: language === 'fr' ? 'Merci pour votre achat!' : language === 'de' ? 'Vielen Dank für Ihren Einkauf!' : 'Thank you for your purchase!',
    orderConfirmed: language === 'fr' ? 'Votre commande est confirmée' : language === 'de' ? 'Ihre Bestellung ist bestätigt' : 'Your order is confirmed',
    emailSent: language === 'fr' ? 'Un email avec votre guide a été envoyé à' : 
              language === 'de' ? 'Eine E-Mail mit Ihrem Führer wurde gesendet an' : 
              'An email with your guide has been sent to',
    downloadGuide: language === 'fr' ? 'Télécharger le guide' : language === 'de' ? 'Führer herunterladen' : 'Download Guide',
    orderSummary: language === 'fr' ? 'Résumé de la commande' : language === 'de' ? 'Bestellübersicht' : 'Order Summary',
    orderNumber: language === 'fr' ? 'Numéro de commande' : language === 'de' ? 'Bestellnummer' : 'Order Number',
    orderDate: language === 'fr' ? 'Date de commande' : language === 'de' ? 'Bestelldatum' : 'Order Date',
    
    // Navigation
    back: language === 'fr' ? 'Retour' : language === 'de' ? 'Zurück' : 'Back',
    close: language === 'fr' ? 'Fermer' : language === 'de' ? 'Schließen' : 'Close',
    next: language === 'fr' ? 'Suivant' : language === 'de' ? 'Weiter' : 'Next',
  };

  // Product details - use the selected package price or default
  const productPrice = selectedPackage ? selectedPackage.price : 19.99;
  const productName = selectedPackage 
    ? selectedPackage.name 
    : (language === 'fr' ? 'Luxembourg Pas Cher - Guide Pratique' 
      : language === 'de' ? 'Luxembourg Pas Cher - Praktischer Führer' 
      : 'Luxembourg Pas Cher - Practical Guide');
  const productDesc = selectedPackage ? selectedPackage.description : t.digital;
  
  const vatRate = 0.17;
  const vatAmount = productPrice * vatRate;
  const totalPrice = productPrice + vatAmount;
  
  // Calculate final price with any discounts
  const finalTotalPrice = totalPrice - promoDiscount;

  // Simulate promo code validation and apply discount
  const handlePromoCodeSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Prevent empty code submission
    if (!promoCode.trim()) return;
    
    // Simple validation: code must be at least 4 characters
    if (promoCode.trim().length < 4) {
      alert(
        language === 'fr' ? 'Code promo invalide. Veuillez réessayer.' : 
        language === 'de' ? 'Ungültiger Gutscheincode. Bitte versuchen Sie es erneut.' : 
        'Invalid promo code. Please try again.'
      );
      return;
    }
    
    // Simulate successful promo code application
    const discount = 2.50; // Example discount
    setPromoDiscount(discount);
    setPromoApplied(true);
    
    // Success message
    alert(
      language === 'fr' ? `Code promo "${promoCode}" appliqué! -${discount.toFixed(2)}€` : 
      language === 'de' ? `Gutscheincode "${promoCode}" angewendet! -${discount.toFixed(2)}€` : 
      `Promo code "${promoCode}" applied! -${discount.toFixed(2)}€`
    );
  };

  // Navigation between checkout steps with validation
  const handleNextStep = () => {
    if (step === 'cart') {
      setStep('info');
    }
    else if (step === 'info') {
      // Reset previous errors
      setEmailError('');
      setTermsError('');
      
      // Validate email
      if (!email) {
        setEmailError(
          language === 'fr' ? 'L\'email est requis' : 
          language === 'de' ? 'E-Mail ist erforderlich' : 
          'Email is required'
        );
        return;
      }
      
      if (!email.includes('@') || !email.includes('.')) {
        setEmailError(
          language === 'fr' ? 'Adresse e-mail invalide' : 
          language === 'de' ? 'Ungültige E-Mail-Adresse' : 
          'Invalid email address'
        );
        return;
      }
      
      // Validate terms acceptance
      if (!acceptTerms) {
        setTermsError(
          language === 'fr' ? 'Vous devez accepter les conditions générales' : 
          language === 'de' ? 'Sie müssen die Allgemeinen Geschäftsbedingungen akzeptieren' : 
          'You must accept the terms and conditions'
        );
        return;
      }
      
      // If validation passes, proceed to payment
      setStep('payment');
    }
    else if (step === 'payment') {
      // Redirect to confirmation step after successful payment processing
      completeOrder();
    }
  };

  // Handle going back to previous steps
  const handlePreviousStep = () => {
    if (step === 'info') {
      setStep('cart');
    }
    else if (step === 'payment') {
      setStep('info');
    }
  };

  // Simulate payment processing with loading state
  const completeOrder = () => {
    // Show processing state
    setIsProcessing(true);
    
    // Simulate network request with a timeout
    setTimeout(() => {
      setIsProcessing(false);
      setStep('confirmation');
    }, 1500);
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString(
      language === 'fr' ? 'fr-FR' : 
      language === 'de' ? 'de-DE' : 
      'en-US', 
      { year: 'numeric', month: 'long', day: 'numeric' }
    );
  };

  const renderStepIndicator = () => {
    const steps = [
      { key: 'cart', icon: <ShoppingCart size={18} /> },
      { key: 'info', icon: <Truck size={18} /> },
      { key: 'payment', icon: <CreditCard size={18} /> },
      { key: 'confirmation', icon: <CheckCircle size={18} /> },
    ];

    return (
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        marginBottom: '2rem'
      }}>
        {steps.map((s, index) => {
          const isActive = s.key === step;
          const isPast = steps.findIndex(x => x.key === step) > index;
          
          return (
            <div key={s.key} style={{
              display: 'flex',
              alignItems: 'center',
              marginRight: index < steps.length - 1 ? '10px' : 0
            }}>
              <div style={{
                width: '36px',
                height: '36px',
                borderRadius: '50%',
                backgroundColor: isActive ? '#38b6ff' : isPast ? '#4CAF50' : '#e0e0e0',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: (isActive || isPast) ? 'white' : '#757575',
                transition: 'all 0.3s ease',
              }}>
                {s.icon}
              </div>
              
              {index < steps.length - 1 && (
                <div style={{
                  height: '2px',
                  width: '40px',
                  backgroundColor: isPast ? '#4CAF50' : '#e0e0e0',
                  margin: '0 5px'
                }}></div>
              )}
            </div>
          );
        })}
      </div>
    );
  };

  const renderCartStep = () => {
    return (
      <div>
        <h2 style={{ fontSize: '1.5rem', marginBottom: '1.5rem', color: '#333' }}>{t.cartTitle}</h2>
        
        <div style={{
          border: '1px solid #eee',
          borderRadius: '8px',
          padding: '1rem',
          marginBottom: '1.5rem'
        }}>
          <div style={{ 
            display: 'flex', 
            borderBottom: '1px solid #eee',
            padding: '0.5rem 0',
            color: '#666',
            fontSize: '0.9rem'
          }}>
            <div style={{ flex: '2' }}>{t.product}</div>
            <div style={{ flex: '1', textAlign: 'right' }}>{t.price}</div>
          </div>
          
          <div style={{ 
            display: 'flex', 
            padding: '1rem 0',
            alignItems: 'center',
          }}>
            <div style={{ 
              flex: '2',
              display: 'flex',
              alignItems: 'center'
            }}>
              <div style={{
                width: '60px',
                height: '80px',
                backgroundColor: '#f0f0f0',
                borderRadius: '4px',
                marginRight: '1rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                overflow: 'hidden'
              }}>
                <img 
                  src="/assets/cover.png" 
                  alt="Guide cover" 
                  style={{ 
                    maxWidth: '100%',
                    maxHeight: '100%',
                    objectFit: 'cover'
                  }}
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.onerror = null;
                    target.style.display = 'none';
                    target.parentElement!.style.background = 'linear-gradient(45deg, #E31837, #00A4E0)';
                  }}
                />
              </div>
              <div>
                <div style={{ fontWeight: 'bold', marginBottom: '0.3rem' }}>{t.guide}</div>
                <div style={{ fontSize: '0.9rem', color: '#666' }}>{t.digital}</div>
              </div>
            </div>
            <div style={{ 
              flex: '1', 
              textAlign: 'right',
              fontWeight: 'bold'
            }}>
              {productPrice.toFixed(2)}€
            </div>
          </div>
        </div>
        
        <div style={{
          marginBottom: '1.5rem'
        }}>
          <form onSubmit={handlePromoCodeSubmit} style={{
            display: 'flex',
            gap: '0.5rem'
          }}>
            <input 
              type="text"
              placeholder={t.promo}
              value={promoCode}
              onChange={(e) => setPromoCode(e.target.value)}
              style={{
                flex: '1',
                padding: '0.75rem',
                border: '1px solid #ddd',
                borderRadius: '4px',
                fontSize: '0.9rem'
              }}
            />
            <button 
              type="submit"
              style={{
                backgroundColor: '#38b6ff',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                padding: '0.75rem 1rem',
                fontWeight: 'bold',
                cursor: 'pointer'
              }}
            >
              {t.apply}
            </button>
          </form>
        </div>
        
        <div style={{
          borderTop: '1px solid #eee',
          paddingTop: '1rem',
          marginBottom: '2rem'
        }}>
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            marginBottom: '0.5rem'
          }}>
            <div>{t.subtotal}</div>
            <div>{productPrice.toFixed(2)}€</div>
          </div>
          
          {promoApplied && (
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              marginBottom: '0.5rem',
              color: '#4caf50',
              fontSize: '0.9rem'
            }}>
              <div>
                {language === 'fr' ? 'Réduction' :
                 language === 'de' ? 'Rabatt' :
                 'Discount'} ({promoCode})
              </div>
              <div>-{promoDiscount.toFixed(2)}€</div>
            </div>
          )}
          
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            marginBottom: '0.5rem',
            fontSize: '0.9rem',
            color: '#666'
          }}>
            <div>{t.vat}</div>
            <div>{vatAmount.toFixed(2)}€</div>
          </div>
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            fontWeight: 'bold',
            fontSize: '1.1rem',
            marginTop: '1rem',
            paddingTop: '1rem',
            borderTop: '1px solid #eee'
          }}>
            <div>{t.total}</div>
            <div>{finalTotalPrice.toFixed(2)}€</div>
          </div>
        </div>
        
        <button 
          onClick={handleNextStep}
          style={{
            backgroundColor: '#E31837',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            padding: '1rem',
            width: '100%',
            fontWeight: 'bold',
            fontSize: '1rem',
            cursor: 'pointer',
            transition: 'background-color 0.3s ease',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 4px 10px rgba(227, 24, 55, 0.2)'
          }}
          onMouseOver={(e) => {
            e.currentTarget.style.backgroundColor = '#c51027';
            e.currentTarget.style.boxShadow = '0 6px 12px rgba(227, 24, 55, 0.3)';
          }}
          onMouseOut={(e) => {
            e.currentTarget.style.backgroundColor = '#E31837';
            e.currentTarget.style.boxShadow = '0 4px 10px rgba(227, 24, 55, 0.2)';
          }}
        >
          {t.proceedToCheckout}
          <ChevronRight size={18} style={{ marginLeft: '0.5rem' }} />
        </button>
      </div>
    );
  };

  const renderInfoStep = () => {
    return (
      <div>
        <h2 style={{ fontSize: '1.5rem', marginBottom: '1.5rem', color: '#333' }}>{t.infoTitle}</h2>
        
        <div style={{ marginBottom: '1.5rem' }}>
          <label style={{
            display: 'block',
            marginBottom: '0.5rem',
            fontSize: '0.9rem',
            fontWeight: '500'
          }}>
            {t.emailLabel} *
          </label>
          <input 
            type="email"
            placeholder={t.emailPlaceholder}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={{
              width: '100%',
              padding: '0.75rem',
              border: emailError ? '1px solid #e53935' : '1px solid #ddd',
              borderRadius: '4px',
              fontSize: '0.9rem',
              backgroundColor: emailError ? 'rgba(229, 57, 53, 0.05)' : 'white'
            }}
            required
            aria-invalid={!!emailError}
            aria-describedby="email-error"
          />
          {emailError && (
            <div id="email-error" style={{
              color: '#e53935',
              fontSize: '0.8rem',
              marginTop: '0.5rem',
              display: 'flex',
              alignItems: 'center'
            }}>
              <AlertCircle size={14} style={{ marginRight: '0.5rem' }} />
              {emailError}
            </div>
          )}
        </div>
        
        <div style={{ marginBottom: '1.5rem' }}>
          <label style={{
            display: 'block',
            marginBottom: '0.5rem',
            fontSize: '0.9rem',
            fontWeight: '500'
          }}>
            {t.nameLabel}
          </label>
          <input 
            type="text"
            placeholder={t.namePlaceholder}
            value={name}
            onChange={(e) => setName(e.target.value)}
            style={{
              width: '100%',
              padding: '0.75rem',
              border: '1px solid #ddd',
              borderRadius: '4px',
              fontSize: '0.9rem'
            }}
          />
        </div>
        
        <div style={{
          backgroundColor: '#f8f9fa',
          borderRadius: '8px',
          padding: '1rem',
          marginBottom: '1.5rem',
          display: 'flex',
          alignItems: 'center'
        }}>
          <Truck size={20} style={{ color: '#38b6ff', marginRight: '1rem' }} />
          <div style={{ fontSize: '0.9rem', color: '#666' }}>
            {t.deliveryInfo}
          </div>
        </div>
        
        <div style={{ marginBottom: '1rem' }}>
          <label style={{
            display: 'flex',
            alignItems: 'flex-start',
            cursor: 'pointer',
            padding: termsError ? '0.5rem' : '0',
            backgroundColor: termsError ? 'rgba(229, 57, 53, 0.05)' : 'transparent',
            borderRadius: '4px',
            border: termsError ? '1px solid #e53935' : 'none',
          }}>
            <input 
              type="checkbox"
              checked={acceptTerms}
              onChange={(e) => {
                setAcceptTerms(e.target.checked);
                if (e.target.checked) setTermsError('');
              }}
              style={{ marginRight: '0.5rem', marginTop: '0.3rem' }}
              aria-invalid={!!termsError}
              aria-describedby="terms-error"
            />
            <span style={{ fontSize: '0.9rem' }}>{t.termsCheckbox}</span>
          </label>
          
          {termsError && (
            <div id="terms-error" style={{
              color: '#e53935',
              fontSize: '0.8rem',
              marginTop: '0.5rem',
              marginBottom: '0.5rem',
              display: 'flex',
              alignItems: 'center',
              marginLeft: '1.5rem'
            }}>
              <AlertCircle size={14} style={{ marginRight: '0.5rem' }} />
              {termsError}
            </div>
          )}
        </div>
        
        <div style={{ marginBottom: '2rem' }}>
          <label style={{
            display: 'flex',
            alignItems: 'flex-start',
            cursor: 'pointer'
          }}>
            <input 
              type="checkbox"
              checked={acceptNewsletter}
              onChange={(e) => setAcceptNewsletter(e.target.checked)}
              style={{ marginRight: '0.5rem', marginTop: '0.3rem' }}
            />
            <span style={{ fontSize: '0.9rem' }}>{t.newsletterCheckbox}</span>
          </label>
        </div>
        
        {/* Session timeout warning */}
        {sessionTimeoutWarning && (
          <div style={{
            backgroundColor: 'rgba(255, 152, 0, 0.1)',
            border: '1px solid #ff9800',
            borderRadius: '4px',
            padding: '0.75rem',
            marginBottom: '1.5rem',
            display: 'flex',
            alignItems: 'center',
            gap: '0.75rem'
          }}>
            <AlertCircle size={20} color="#ff9800" />
            <p style={{ margin: 0, fontSize: '0.9rem' }}>
              {language === 'fr' 
                ? 'Votre session expirera bientôt. Veuillez compléter votre achat.' 
                : language === 'de'
                ? 'Ihre Sitzung läuft bald ab. Bitte schließen Sie Ihren Kauf ab.'
                : 'Your session will expire soon. Please complete your purchase.'}
            </p>
          </div>
        )}
        
        <div style={{
          display: 'flex',
          gap: '1rem',
          marginTop: '1rem'
        }}>
          <button 
            onClick={handlePreviousStep}
            style={{
              backgroundColor: '#f0f0f0',
              color: '#666',
              border: 'none',
              borderRadius: '4px',
              padding: '1rem',
              fontWeight: 'bold',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flex: '1'
            }}
          >
            <ChevronLeft size={18} style={{ marginRight: '0.5rem' }} />
            {t.back}
          </button>
          
          <button 
            onClick={handleNextStep}
            style={{
              backgroundColor: '#E31837',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              padding: '1rem',
              fontWeight: 'bold',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flex: '2',
              transition: 'all 0.3s ease',
              boxShadow: '0 4px 10px rgba(227, 24, 55, 0.2)'
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.backgroundColor = '#c51027';
              e.currentTarget.style.boxShadow = '0 6px 12px rgba(227, 24, 55, 0.3)';
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.backgroundColor = '#E31837';
              e.currentTarget.style.boxShadow = '0 4px 10px rgba(227, 24, 55, 0.2)';
            }}
          >
            {t.continueToPayment}
            <ChevronRight size={18} style={{ marginLeft: '0.5rem' }} />
          </button>
        </div>
      </div>
    );
  };

  const renderPaymentStep = () => {
    return (
      <div>
        <h2 style={{ fontSize: '1.5rem', marginBottom: '1.5rem', color: '#333' }}>{t.paymentTitle}</h2>
        
        <div style={{ marginBottom: '1.5rem' }}>
          <div style={{ 
            fontWeight: '500', 
            marginBottom: '1rem'
          }}>
            {t.paymentMethod}
          </div>
          
          <div style={{ marginBottom: '1rem' }}>
            <label style={{
              display: 'flex',
              alignItems: 'center',
              padding: '1rem',
              border: selectedPayment === 'card' ? '2px solid #38b6ff' : '1px solid #ddd',
              borderRadius: '8px',
              cursor: 'pointer',
              transition: 'all 0.2s ease'
            }}>
              <input 
                type="radio"
                name="payment"
                value="card"
                checked={selectedPayment === 'card'}
                onChange={() => setSelectedPayment('card')}
                style={{ marginRight: '1rem' }}
              />
              <CreditCard size={20} style={{ marginRight: '0.5rem', color: '#666' }} />
              <span>{t.creditCard}</span>
              <div style={{ marginLeft: 'auto', display: 'flex', gap: '0.5rem' }}>
                <img src="https://cdn.jsdelivr.net/gh/lipis/flag-icons/flags/4x3/us.svg" alt="Visa" style={{ width: '32px', height: '20px' }} />
                <img src="https://cdn.jsdelivr.net/gh/lipis/flag-icons/flags/4x3/eu.svg" alt="Mastercard" style={{ width: '32px', height: '20px' }} />
              </div>
            </label>
          </div>
          
          <div style={{ marginBottom: '1rem' }}>
            <label style={{
              display: 'flex',
              alignItems: 'center',
              padding: '1rem',
              border: selectedPayment === 'paypal' ? '2px solid #38b6ff' : '1px solid #ddd',
              borderRadius: '8px',
              cursor: 'pointer',
              transition: 'all 0.2s ease'
            }}>
              <input 
                type="radio"
                name="payment"
                value="paypal"
                checked={selectedPayment === 'paypal'}
                onChange={() => setSelectedPayment('paypal')}
                style={{ marginRight: '1rem' }}
              />
              <span>{t.paypal}</span>
              <div style={{ marginLeft: 'auto' }}>
                <svg width="80" height="20" viewBox="0 0 100 26" xmlns="http://www.w3.org/2000/svg">
                  <path d="M 12.237 2.8 L 4.437 2.8 C 3.937 2.8 3.437 3.2 3.337 3.7 L 0.237 20.7 C 0.137 21.1 0.437 21.5 0.837 21.5 L 4.537 21.5 C 5.037 21.5 5.537 21.1 5.637 20.6 L 6.437 16 C 6.537 15.5 6.937 15.1 7.537 15.1 L 10.037 15.1 C 15.137 15.1 18.137 12.5 18.937 7.7 C 19.237 5.7 18.937 4.1 17.937 3 C 16.837 1.8 14.837 2.8 12.237 2.8 Z M 13.137 7.9 C 12.737 10.7 10.537 10.7 8.537 10.7 L 7.337 10.7 L 8.137 6.2 C 8.137 5.9 8.437 5.7 8.737 5.7 L 9.237 5.7 C 10.637 5.7 11.937 5.7 12.637 6.5 C 13.037 6.9 13.237 7.3 13.137 7.9 Z" fill="#003087" />
                  <path d="M 35.437 7.8 L 31.737 7.8 C 31.437 7.8 31.137 8 31.137 8.3 L 30.937 9.5 L 30.637 9.1 C 29.837 7.9 28.037 7.5 26.237 7.5 C 22.137 7.5 18.637 10.7 17.937 15.1 C 17.537 17.3 18.037 19.5 19.337 21 C 20.437 22.4 22.137 23 24.037 23 C 27.337 23 29.237 20.9 29.237 20.9 L 29.037 22.1 C 28.937 22.5 29.237 22.9 29.637 22.9 L 33.037 22.9 C 33.537 22.9 34.037 22.5 34.137 22 L 36.137 8.5 C 36.237 8.1 35.837 7.8 35.437 7.8 Z M 30.337 15.2 C 29.937 17.3 28.337 18.7 26.137 18.7 C 25.037 18.7 24.237 18.4 23.637 17.7 C 23.037 17.1 22.837 16.2 23.037 15.2 C 23.337 13.1 25.137 11.7 27.237 11.7 C 28.337 11.7 29.137 12.1 29.737 12.7 C 30.237 13.4 30.537 14.2 30.337 15.2 Z" fill="#003087" />
                  <path d="M 55.337 7.8 L 51.637 7.8 C 51.237 7.8 50.937 8 50.737 8.3 L 45.537 16.3 L 43.337 8.6 C 43.237 8.1 42.737 7.8 42.337 7.8 L 38.637 7.8 C 38.237 7.8 37.837 8.2 38.037 8.7 L 42.137 21.6 L 38.237 27.1 C 37.937 27.5 38.237 28 38.737 28 L 42.437 28 C 42.837 28 43.137 27.8 43.337 27.5 L 55.937 8.7 C 56.237 8.2 55.837 7.8 55.337 7.8 Z" fill="#003087" />
                  <path d="M 67.737 2.8 L 59.937 2.8 C 59.437 2.8 58.937 3.2 58.837 3.7 L 55.737 20.7 C 55.637 21.1 55.937 21.5 56.337 21.5 L 60.337 21.5 C 60.737 21.5 61.037 21.2 61.037 20.9 L 61.937 15.9 C 62.037 15.4 62.437 15 63.037 15 L 65.537 15 C 70.637 15 73.637 12.4 74.437 7.6 C 74.737 5.6 74.437 4 73.437 2.9 C 72.237 1.8 70.337 2.8 67.737 2.8 Z M 68.637 7.9 C 68.237 10.7 66.037 10.7 64.037 10.7 L 62.837 10.7 L 63.637 6.2 C 63.637 5.9 63.937 5.7 64.237 5.7 L 64.737 5.7 C 66.137 5.7 67.437 5.7 68.137 6.5 C 68.537 6.9 68.737 7.3 68.637 7.9 Z" fill="#009cde" />
                  <path d="M 90.937 7.8 L 87.237 7.8 C 86.937 7.8 86.637 8 86.637 8.3 L 86.437 9.5 L 86.137 9.1 C 85.337 7.9 83.537 7.5 81.737 7.5 C 77.637 7.5 74.137 10.7 73.437 15.1 C 73.037 17.3 73.537 19.5 74.837 21 C 75.937 22.4 77.637 23 79.537 23 C 82.837 23 84.737 20.9 84.737 20.9 L 84.537 22.1 C 84.437 22.5 84.737 22.9 85.137 22.9 L 88.537 22.9 C 89.037 22.9 89.537 22.5 89.637 22 L 91.637 8.5 C 91.637 8.1 91.337 7.8 90.937 7.8 Z M 85.737 15.2 C 85.337 17.3 83.737 18.7 81.537 18.7 C 80.437 18.7 79.637 18.4 79.037 17.7 C 78.437 17.1 78.237 16.2 78.437 15.2 C 78.737 13.1 80.537 11.7 82.637 11.7 C 83.737 11.7 84.537 12.1 85.137 12.7 C 85.637 13.4 85.937 14.2 85.737 15.2 Z" fill="#009cde" />
                </svg>
              </div>
            </label>
          </div>
          
          <div style={{ marginBottom: '1rem' }}>
            <label style={{
              display: 'flex',
              alignItems: 'center',
              padding: '1rem',
              border: selectedPayment === 'applepay' ? '2px solid #38b6ff' : '1px solid #ddd',
              borderRadius: '8px',
              cursor: 'pointer',
              transition: 'all 0.2s ease',
              opacity: selectedPayment === 'applepay' ? 1 : 0.6
            }}>
              <input 
                type="radio"
                name="payment"
                value="applepay"
                checked={selectedPayment === 'applepay'}
                onChange={() => setSelectedPayment('applepay')}
                style={{ marginRight: '1rem' }}
              />
              <span>{t.applePay}</span>
              <div style={{ marginLeft: 'auto' }}>
                <svg xmlns="http://www.w3.org/2000/svg" width="44" height="18" viewBox="0 0 44 18" fill="none">
                  <path d="M7.33333 3.32C7.93333 2.59333 8.32 1.58667 8.2 0.586667C7.35333 0.626667 6.30667 1.15333 5.68 1.88C5.12 2.52 4.65333 3.54667 4.78667 4.53333C5.73333 4.6 6.72 4.05333 7.33333 3.32Z" fill="black"/>
                  <path d="M11.8267 10.0467C11.8467 8.16 13.36 7.14667 13.44 7.09333C12.5333 5.76 11.1067 5.56 10.6267 5.54667C9.36 5.42667 8.13333 6.3 7.52 6.3C6.89333 6.3 5.89333 5.56 4.82667 5.58667C3.44 5.61333 2.16 6.4 1.46667 7.66667C0.026667 10.2133 1.10667 13.9467 2.48 15.8067C3.17333 16.72 3.98667 17.7467 5.04 17.7067C6.06667 17.6667 6.46667 17.0267 7.71333 17.0267C8.94667 17.0267 9.32 17.7067 10.3867 17.6867C11.48 17.6667 12.1867 16.7533 12.8533 15.8267C13.64 14.7667 13.96 13.7333 13.9733 13.68C13.9467 13.6733 11.8067 12.7933 11.8267 10.0467Z" fill="black"/>
                  <path d="M21.3333 5.07334V17.4267H23.5733V12.76H26.88C29.8133 12.76 31.8667 10.7467 31.8667 8.90667C31.8667 7.06667 29.8533 5.07334 26.9733 5.07334H21.3333ZM23.5733 6.88H26.44C28.36 6.88 29.5867 7.78667 29.5867 8.92C29.5867 10.0533 28.36 10.9733 26.4267 10.9733H23.5733V6.88Z" fill="black"/>
                  <path d="M36.8533 17.5267C38.2533 17.5267 39.56 16.84 40.1867 15.7467H40.24V17.4267H42.3067V9.81334C42.3067 7.66667 40.68 6.33333 38.12 6.33333C35.7467 6.33333 34 7.70667 33.9333 9.66H35.9467C36.08 8.70667 36.9067 8.06667 38.08 8.06667C39.5067 8.06667 40.24 8.77334 40.24 10.0667V10.9867L37.32 11.1C34.6 11.2 33.1733 12.2933 33.1733 14.0133C33.1733 15.7467 34.6667 17.5267 36.8533 17.5267ZM37.4267 15.8533C36.16 15.8533 35.3867 15.0667 35.3867 14.08C35.3867 13.0533 36.1333 12.3467 37.7333 12.28L40.24 12.1667V13.08C40.24 14.6667 39.04 15.8533 37.4267 15.8533Z" fill="black"/>
                </svg>
              </div>
            </label>
          </div>
          
          <div style={{ marginBottom: '1.5rem' }}>
            <label style={{
              display: 'flex',
              alignItems: 'center',
              padding: '1rem',
              border: selectedPayment === 'googlepay' ? '2px solid #38b6ff' : '1px solid #ddd',
              borderRadius: '8px',
              cursor: 'pointer',
              transition: 'all 0.2s ease',
              opacity: selectedPayment === 'googlepay' ? 1 : 0.6
            }}>
              <input 
                type="radio"
                name="payment"
                value="googlepay"
                checked={selectedPayment === 'googlepay'}
                onChange={() => setSelectedPayment('googlepay')}
                style={{ marginRight: '1rem' }}
              />
              <span>{t.googlePay}</span>
              <div style={{ marginLeft: 'auto' }}>
                <svg xmlns="http://www.w3.org/2000/svg" width="44" height="18" viewBox="0 0 44 18" fill="none">
                  <path d="M19.5613 9.24879V12.8764H18.1419V2.62695H21.9993C22.6582 2.61532 23.3108 2.74391 23.9133 3.00494C24.5158 3.26597 25.0538 3.6535 25.4931 4.14195C25.9285 4.61632 26.2608 5.18243 26.4674 5.80036C26.674 6.41829 26.75 7.07497 26.6901 7.72629C26.7466 8.38121 26.6675 9.03994 26.458 9.65917C26.2486 10.2784 25.9135 10.8452 25.4755 11.319C25.0318 11.8052 24.4901 12.1903 23.8847 12.4483C23.2793 12.7064 22.6245 12.8317 21.9642 12.8154H19.5613V9.24879ZM19.5613 4.43809V11.0653H22.0344C22.4673 11.0778 22.8975 10.9934 23.2964 10.8177C23.6953 10.642 24.0536 10.379 24.3476 10.0463C24.6362 9.71879 24.8599 9.33769 25.0064 8.9254C25.153 8.51311 25.2196 8.07797 25.203 7.64151C25.2256 7.20693 25.1636 6.77208 25.0202 6.35999C24.8768 5.9479 24.654 5.56773 24.3652 5.24281C24.0732 4.90461 23.7146 4.63646 23.3142 4.45626C22.9138 4.27606 22.4811 4.18753 22.0462 4.19568H19.5613V4.43809Z" fill="#5F6368"/>
                  <path d="M28.7964 8.82002C28.789 8.22342 28.9289 7.63493 29.2034 7.10851C29.478 6.58209 29.8783 6.13448 30.3684 5.80818C30.8672 5.47696 31.4293 5.2489 32.0189 5.13868C32.6086 5.02846 33.2141 5.03853 33.7997 5.16826C34.3779 5.30164 34.9249 5.55428 35.4082 5.91048C35.8916 6.26668 36.3009 6.71915 36.6115 7.23996L35.3393 8.00761C35.1367 7.64931 34.8479 7.3476 34.4988 7.13113C34.1496 6.91466 33.7518 6.79031 33.3419 6.77101C32.9265 6.75507 32.5128 6.82812 32.1294 6.98515C31.746 7.14218 31.4027 7.3797 31.1231 7.68029C30.8434 7.98087 30.6344 8.33748 30.5107 8.72359C30.387 9.10969 30.3517 9.5172 30.4074 9.91748C30.4631 10.3178 30.6085 10.7006 30.8332 11.04C31.0579 11.3795 31.357 11.6673 31.7086 11.8818C32.0602 12.0963 32.4559 12.2323 32.8684 12.2797C33.281 12.3271 33.6995 12.2849 34.0948 12.1564C34.4902 12.0279 34.8522 11.8163 35.1535 11.5369L36.4257 12.3222C36.0177 12.7832 35.5034 13.1382 34.9288 13.3569C34.3542 13.5757 33.7369 13.6515 33.1274 13.5782C32.5178 13.5049 31.9326 13.2845 31.421 12.9358C30.9094 12.5871 30.486 12.1207 30.1862 11.5761C29.8753 11.0207 29.6951 10.4017 29.6602 9.76707C29.6252 9.13245 29.7363 8.49912 29.9842 7.91217C30.3127 7.53337 29.9842 7.91217 29.9842 7.91217L28.7964 8.82002Z" fill="#5F6368"/>
                  <path d="M41.9883 5.35742H37.4668V7.89297H41.625V9.53761H37.4668V12.8765H35.6816V3.71289H41.9883V5.35742Z" fill="#5F6368"/>
                  <path d="M13.2539 8.02917C13.2539 7.4907 13.2539 6.97673 13.2539 6.43837V6.43837C13.2539 5.93602 13.2188 5.43378 13.1484 4.93164C13.9922 5.93602 14.8008 6.94041 15.5742 7.94479L15.8574 8.32241L15.5742 8.70003C14.9766 9.49232 14.3438 10.2857 13.7109 11.0781C13.7109 10.063 13.7109 9.04866 13.7109 8.0343C13.5566 8.0343 13.4082 8.02917 13.2539 8.02917Z" fill="#EB4335"/>
                  <path d="M4.48047 5.50562C4.72761 5.7823 4.9415 6.0852 5.11914 6.40977C6.17188 8.30977 4.95117 10.7824 2.83203 11.078C1.91219 11.2097 0.974914 10.9654 0.234375 10.3976C0.472656 9.98562 0.710938 9.57362 0.949219 9.16162C1.1875 8.74962 1.5 8.17112 1.73828 7.75912C1.89844 7.49694 2.04297 7.24317 2.22656 6.99887C2.73047 6.29964 3.47266 5.61825 4.48047 5.50562Z" fill="#FBBC04"/>
                  <path d="M13.1484 4.93164C12.4453 3.9457 11.7422 2.95977 11.0391 1.97383C10.6958 1.49961 10.2446 1.10889 9.72339 0.830445C9.20215 0.551999 8.62632 0.391657 8.03906 0.360992C7.11375 0.357881 6.22741 0.700618 5.54297 1.31742C5.19141 1.6082 4.83984 1.89898 4.48047 2.18977C4.47656 2.18977 4.47656 2.18977 4.47656 2.18977C4.47656 3.12398 4.47656 4.05039 4.47656 4.9768C4.47656 5.14938 4.47656 5.32977 4.48047 5.50562C5.27344 5.42273 6.06641 5.5582 6.78516 5.93582C7.36328 6.24609 7.85156 6.71484 8.20312 7.27273C8.20312 7.27273 8.26172 7.36977 8.32031 7.45508L9.47266 5.61961C9.64844 5.33664 9.63125 4.97645 9.42383 4.70508C9.21641 4.4337 8.86484 4.3332 8.5625 4.46523C8.51193 4.49108 8.46481 4.52309 8.42266 4.56055C8.1875 4.73312 8.04297 4.99312 8.04297 5.26484L7.17188 5.26484L7.17188 5.26699C7.17188 4.62398 7.53906 4.01602 8.14453 3.74086C8.74219 3.46789 9.47656 3.60211 9.92969 4.08664C10.3867 4.59133 10.4141 5.33664 9.99609 5.87273L8.69531 7.76156C8.9875 8.04109 9.21094 8.37398 9.36328 8.74289L10.6641 6.85406C11.4961 5.5582 11.1094 3.82398 10.043 2.91398C8.97656 1.99414 7.37891 1.8082 6.17578 2.48742C5.56251 2.83398 5.10157 3.37867 4.85547 4.03281C4.83254 4.0879 4.81177 4.14376 4.79297 4.2002C4.67969 4.56055 4.63281 4.93773 4.64844 5.31289C4.64844 5.31289 4.48047 5.29328 4.47656 5.29328C4.47656 5.03328 4.47656 4.76367 4.47656 4.50586C4.47656 3.73164 4.47656 2.96523 4.47656 2.18977C3.96094 2.63016 3.47656 3.10586 3.02734 3.61055C2.10156 4.63664 1.40625 5.88742 1.26953 7.31398C1.26953 7.31398 1.26953 7.31398 1.26953 7.31618C0.988285 7.77242 0.789065 8.28027 0.683594 8.81086C0.683594 8.8152 0.683594 8.81953 0.683594 8.82383C0.44923 9.59519 0.454577 10.424 0.699219 11.1918C0.851563 11.6434 1.11328 12.0553 1.45313 12.3969C2.01172 12.9406 2.67188 13.3652 3.40234 13.6387C4.39453 14.0357 5.49609 14.1309 6.53906 13.9035C8.23047 13.5227 9.67969 12.3535 10.3437 10.7789C10.793 9.72648 10.9414 8.5793 10.7812 7.45508C10.7812 7.45508 10.7812 7.45508 10.7812 7.45508C10.6973 7.27711 10.6055 7.10236 10.5039 6.93142L10.5938 6.80586C11.5273 7.90789 12.4062 9.00125 13.25 10.0582C13.3828 10.2308 13.5352 10.3652 13.7109 10.461V8.03645C13.5566 8.03645 13.4102 8.03133 13.2539 8.03133C13.2539 7.49286 13.2539 6.95889 13.2539 6.42053V6.42053C13.2539 5.91818 13.2188 5.41594 13.1484 4.93164Z" fill="#4285F4"/>
                  <path d="M4.48438 5.50549C4.40625 4.47237 4.71875 3.44362 5.36328 2.63003C5.08594 2.81736 4.82031 3.02158 4.54688 3.22581C4.19141 3.50221 3.55078 4.08003 3.23047 4.45315C2.125 5.70393 1.48828 7.34081 1.74219 8.97581C1.74219 8.97581 1.74219 8.97581 1.74219 8.97581C1.98047 8.5639 2.21875 8.15198 2.45703 7.74007C2.69531 7.32815 3.00781 6.74955 3.24609 6.33764C3.42964 6.04233 3.64427 5.76441 3.88672 5.50983C4.08594 5.51237 4.28516 5.50549 4.48438 5.50549Z" fill="#EA4335"/>
                </svg>
              </div>
            </label>
          </div>
          
          <div style={{
            display: 'flex',
            alignItems: 'center',
            backgroundColor: '#f8f9fa',
            padding: '0.75rem',
            borderRadius: '8px',
            marginBottom: '2rem'
          }}>
            <Shield size={18} style={{ marginRight: '0.75rem', color: '#38b6ff' }} />
            <div>
              <div style={{ 
                fontWeight: '500', 
                fontSize: '0.9rem',
                marginBottom: '0.2rem'
              }}>
                {t.securePayment}
              </div>
              <div style={{ 
                fontSize: '0.8rem',
                color: '#666'
              }}>
                {t.secureInfo}
              </div>
            </div>
          </div>
        </div>
        
        <div style={{
          borderTop: '1px solid #eee',
          paddingTop: '1rem',
          marginBottom: '2rem'
        }}>
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            fontSize: '0.9rem',
            marginBottom: '0.5rem'
          }}>
            <div>{t.subtotal}</div>
            <div>{productPrice.toFixed(2)}€</div>
          </div>
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            fontSize: '0.85rem',
            color: '#666',
            marginBottom: '0.5rem'
          }}>
            <div>{t.vat}</div>
            <div>{vatAmount.toFixed(2)}€</div>
          </div>
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            fontWeight: 'bold',
            fontSize: '1.1rem',
            marginTop: '1rem',
            paddingTop: '1rem',
            borderTop: '1px solid #eee'
          }}>
            <div>{t.total}</div>
            <div>{totalPrice.toFixed(2)}€</div>
          </div>
        </div>
          
        <div style={{
          display: 'flex',
          gap: '1rem',
          marginTop: '1rem'
        }}>
          <button 
            onClick={handlePreviousStep}
            style={{
              backgroundColor: '#f0f0f0',
              color: '#666',
              border: 'none',
              borderRadius: '4px',
              padding: '1rem',
              fontWeight: 'bold',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flex: '1'
            }}
          >
            <ChevronLeft size={18} style={{ marginRight: '0.5rem' }} />
            {t.back}
          </button>
          
          <button 
            onClick={completeOrder}
            disabled={isProcessing}
            style={{
              backgroundColor: isProcessing ? '#cccccc' : '#E31837',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              padding: '1rem',
              fontWeight: 'bold',
              cursor: isProcessing ? 'not-allowed' : 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flex: '2',
              transition: 'background-color 0.3s ease',
              position: 'relative',
              overflow: 'hidden'
            }}
            onMouseOver={(e) => {
              if (!isProcessing) e.currentTarget.style.backgroundColor = '#c51027';
            }}
            onMouseOut={(e) => {
              if (!isProcessing) e.currentTarget.style.backgroundColor = '#E31837';
            }}
          >
            {isProcessing ? (
              <>
                <span style={{ 
                  display: 'inline-block', 
                  width: '16px', 
                  height: '16px', 
                  borderRadius: '50%',
                  border: '2px solid rgba(255,255,255,0.3)',
                  borderTopColor: 'white',
                  animation: 'spin 1s linear infinite',
                  marginRight: '0.5rem'
                }}></span>
                {language === 'fr' ? 'Traitement...' : 
                 language === 'de' ? 'Wird bearbeitet...' : 
                 'Processing...'}
              </>
            ) : (
              <>
                {t.purchaseButton}
                <Shield size={16} style={{ marginLeft: '0.5rem' }} />
              </>
            )}
            
            {/* Add global styles for the spinner animation */}
            <style>
              {`
                @keyframes spin {
                  to { transform: rotate(360deg); }
                }
              `}
            </style>
          </button>
        </div>
      </div>
    );
  };

  const renderConfirmationStep = () => {
    // Generate a random order number
    const orderNumber = `LPC-${new Date().getFullYear()}-${Math.floor(100000 + Math.random() * 900000)}`;
    const orderDate = new Date();
    const finalPrice = totalPrice - promoDiscount;
    
    return (
      <div>
        <div style={{
          textAlign: 'center',
          marginBottom: '2rem'
        }}>
          <div style={{
            width: '80px',
            height: '80px',
            backgroundColor: '#4CAF50',
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 1.5rem'
          }}>
            <CheckCircle size={40} color="white" />
          </div>
          
          <h2 style={{ 
            fontSize: '1.8rem', 
            color: '#333',
            marginBottom: '0.5rem'
          }}>
            {t.thankYou}
          </h2>
          
          <p style={{ 
            color: '#666',
            marginBottom: '1rem'
          }}>
            {t.orderConfirmed}
          </p>
          
          <p style={{ 
            color: '#666',
            fontSize: '0.9rem'
          }}>
            {t.emailSent} <strong>{email}</strong>
          </p>
        </div>
        
        <div style={{
          marginBottom: '2rem'
        }}>
          <button style={{
            backgroundColor: '#E31837',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            padding: '0.75rem 1.5rem',
            fontWeight: 'bold',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto',
            transition: 'background-color 0.3s ease'
          }}
          onMouseOver={(e) => {
            e.currentTarget.style.backgroundColor = '#c51027';
          }}
          onMouseOut={(e) => {
            e.currentTarget.style.backgroundColor = '#E31837';
          }}
          >
            {t.downloadGuide}
          </button>
        </div>
        
        <div style={{
          backgroundColor: '#f8f9fa',
          borderRadius: '8px',
          padding: '1.5rem',
          marginBottom: '2rem'
        }}>
          <h3 style={{
            fontSize: '1.1rem',
            marginBottom: '1rem'
          }}>
            {t.orderSummary}
          </h3>
          
          <div style={{
            display: 'flex',
            fontSize: '0.9rem',
            marginBottom: '0.75rem'
          }}>
            <div style={{ flex: '1', color: '#666' }}>{t.orderNumber}:</div>
            <div style={{ flex: '2', fontWeight: '500' }}>{orderNumber}</div>
          </div>
          
          <div style={{
            display: 'flex',
            fontSize: '0.9rem',
            marginBottom: '0.75rem'
          }}>
            <div style={{ flex: '1', color: '#666' }}>{t.orderDate}:</div>
            <div style={{ flex: '2', fontWeight: '500' }}>{formatDate(orderDate)}</div>
          </div>
          
          <div style={{
            display: 'flex',
            fontSize: '0.9rem',
            marginBottom: '0.75rem'
          }}>
            <div style={{ flex: '1', color: '#666' }}>{t.product}:</div>
            <div style={{ flex: '2', fontWeight: '500' }}>{t.guide}</div>
          </div>
          
          <div style={{
            display: 'flex',
            fontSize: '0.9rem',
            marginBottom: '0.75rem'
          }}>
            <div style={{ flex: '1', color: '#666' }}>{t.subtotal}:</div>
            <div style={{ flex: '2', fontWeight: '500' }}>{productPrice.toFixed(2)}€</div>
          </div>
          
          {promoApplied && (
            <div style={{
              display: 'flex',
              fontSize: '0.9rem',
              marginBottom: '0.75rem',
              color: '#4caf50'
            }}>
              <div style={{ flex: '1' }}>{t.promo}:</div>
              <div style={{ flex: '2', fontWeight: '500' }}>-{promoDiscount.toFixed(2)}€</div>
            </div>
          )}
          
          <div style={{
            display: 'flex',
            fontSize: '0.9rem',
            marginBottom: '0.75rem'
          }}>
            <div style={{ flex: '1', color: '#666' }}>{t.vat}:</div>
            <div style={{ flex: '2', fontWeight: '500' }}>{vatAmount.toFixed(2)}€</div>
          </div>
          
          <div style={{
            display: 'flex',
            fontSize: '1rem',
            marginTop: '0.75rem',
            paddingTop: '0.75rem',
            borderTop: '1px solid #eee'
          }}>
            <div style={{ flex: '1', color: '#333', fontWeight: 'bold' }}>{t.total}:</div>
            <div style={{ flex: '2', fontWeight: 'bold' }}>{finalPrice.toFixed(2)}€</div>
          </div>
        </div>

        {/* Add secure transaction message */}
        <div style={{
          backgroundColor: '#f1f8e9',
          borderRadius: '8px',
          padding: '1rem',
          marginBottom: '1.5rem',
          display: 'flex',
          alignItems: 'center',
          gap: '0.75rem'
        }}>
          <Shield size={20} color="#4caf50" />
          <p style={{ 
            margin: 0, 
            fontSize: '0.85rem', 
            color: '#666' 
          }}>
            {language === 'fr' 
              ? 'Votre transaction a été traitée en toute sécurité. Une confirmation a été envoyée à votre adresse email.' 
              : language === 'de' 
              ? 'Ihre Transaktion wurde sicher verarbeitet. Eine Bestätigung wurde an Ihre E-Mail-Adresse gesendet.' 
              : 'Your transaction has been securely processed. A confirmation has been sent to your email address.'}
          </p>
        </div>
        
        <button 
          onClick={onClose}
          style={{
            backgroundColor: '#f0f0f0',
            color: '#666',
            border: 'none',
            borderRadius: '4px',
            padding: '1rem',
            width: '100%',
            fontWeight: 'bold',
            cursor: 'pointer',
            transition: 'background-color 0.3s ease'
          }}
          onMouseOver={(e) => {
            e.currentTarget.style.backgroundColor = '#e0e0e0';
          }}
          onMouseOut={(e) => {
            e.currentTarget.style.backgroundColor = '#f0f0f0';
          }}
        >
          {t.close}
        </button>
      </div>
    );
  };

  const renderCurrentStep = () => {
    switch (step) {
      case 'cart':
        return renderCartStep();
      case 'info':
        return renderInfoStep();
      case 'payment':
        return renderPaymentStep();
      case 'confirmation':
        return renderConfirmationStep();
      default:
        return renderCartStep();
    }
  };
  
  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 1000,
    }}>
      <div style={{
        backgroundColor: 'white',
        borderRadius: '8px',
        width: '90%',
        maxWidth: '600px',
        maxHeight: '90vh',
        overflowY: 'auto',
        padding: '2rem',
        position: 'relative',
        boxShadow: '0 10px 25px rgba(0, 0, 0, 0.1)',
      }}>
        <button 
          onClick={onClose}
          style={{
            position: 'absolute',
            top: '1rem',
            right: '1rem',
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            color: '#666',
            padding: '0.5rem',
            borderRadius: '50%',
          }}
        >
          <X size={20} />
        </button>
        
        {renderStepIndicator()}
        {renderCurrentStep()}
      </div>
    </div>
  );
};

export default CheckoutModal;