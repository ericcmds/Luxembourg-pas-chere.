import React, { useState, useEffect } from 'react';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

// Typ-Definitionen
interface CrowdfundingOption {
  id: number;
  title: string;
  description: string;
  price: number;
  currency: string;
  maxBackers?: number;
  currentBackers: number;
  imageUrl?: string;
}

// Validierungsschema
const pledgeSchema = z.object({
  optionId: z.number().int().positive(),
  name: z.string().min(2, { message: 'Name muss mindestens 2 Zeichen lang sein' }),
  email: z.string().email({ message: 'Bitte geben Sie eine gültige E-Mail-Adresse ein' }),
  amount: z.number().positive({ message: 'Betrag muss größer als 0 sein' }),
  paymentMethod: z.enum(['credit-card', 'paypal', 'bank-transfer'], {
    errorMap: () => ({ message: 'Bitte wählen Sie eine Zahlungsmethode' })
  }),
  message: z.string().optional()
});

type PledgeFormData = z.infer<typeof pledgeSchema>;

export default function CrowdfundingSection() {
  const [options, setOptions] = useState<CrowdfundingOption[]>([]);
  const [selectedOption, setSelectedOption] = useState<CrowdfundingOption | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  const { register, handleSubmit, formState: { errors }, reset, setValue } = useForm<PledgeFormData>({
    resolver: zodResolver(pledgeSchema)
  });

  // Beispiel-Crowdfunding-Optionen (in echter Implementierung würden diese vom Server geladen)
  const sampleOptions: CrowdfundingOption[] = [
    {
      id: 1,
      title: "Digitaler Unterstützer",
      description: "Unterstützen Sie unser Projekt digital und erhalten Sie einen exklusiven Zugang zu digitalen Extras und Updates.",
      price: 10,
      currency: "EUR",
      currentBackers: 42,
      imageUrl: "https://via.placeholder.com/100?text=Digital"
    },
    {
      id: 2,
      title: "Frühbucher-Edition",
      description: "Erhalten Sie das Buch vor allen anderen mit persönlicher Widmung und exklusiven Bonusinhalten.",
      price: 30,
      currency: "EUR",
      currentBackers: 28,
      imageUrl: "https://via.placeholder.com/100?text=Frühbucher"
    },
    {
      id: 3,
      title: "Supporter-Paket",
      description: "Erhalten Sie das Buch, eine Danksagung im Buch und Einladung zu einer exklusiven Online-Veranstaltung.",
      price: 50,
      currency: "EUR",
      currentBackers: 15,
      imageUrl: "https://via.placeholder.com/100?text=Supporter"
    },
    {
      id: 4,
      title: "VIP-Unterstützer",
      description: "Alles aus dem Supporter-Paket plus ein persönliches Beratungsgespräch für Ihren Luxemburg-Aufenthalt.",
      price: 100,
      currency: "EUR",
      currentBackers: 8,
      maxBackers: 20,
      imageUrl: "https://via.placeholder.com/100?text=VIP"
    },
  ];

  // Crowdfunding-Optionen laden
  useEffect(() => {
    // In der realen Implementierung würden wir hier die API abfragen
    // fetch('/api/crowdfunding')
    //   .then(response => response.json())
    //   .then(data => {
    //     if (data.success) {
    //       setOptions(data.data);
    //     } else {
    //       setError('Fehler beim Laden der Crowdfunding-Optionen');
    //     }
    //   })
    //   .catch(err => {
    //     console.error('Fehler beim Laden der Crowdfunding-Optionen:', err);
    //     setError('Fehler beim Laden der Crowdfunding-Optionen');
    //   })
    //   .finally(() => {
    //     setLoading(false);
    //   });

    // Für die Demo verwenden wir die Beispieldaten direkt
    setTimeout(() => {
      setOptions(sampleOptions);
      setLoading(false);
    }, 500);
  }, []);

  const handleOptionSelect = (option: CrowdfundingOption) => {
    setSelectedOption(option);
    setValue('optionId', option.id);
    setValue('amount', option.price);
    setShowModal(true);
  };

  const onSubmit = async (data: PledgeFormData) => {
    setSubmitting(true);
    try {
      // In der realen Implementierung würden wir hier die API aufrufen
      // const response = await fetch('/api/crowdfunding/pledge', {
      //   method: 'POST',
      //   headers: {
      //     'Content-Type': 'application/json'
      //   },
      //   body: JSON.stringify(data)
      // });
      // const result = await response.json();
      
      // if (result.success) {
      //   setSuccess(true);
      //   // Backers-Anzahl aktualisieren
      //   setOptions(options.map(opt => 
      //     opt.id === data.optionId 
      //       ? { ...opt, currentBackers: opt.currentBackers + 1 } 
      //       : opt
      //   ));
      // } else {
      //   setError(result.message || 'Fehler bei der Übermittlung');
      // }

      // Für die Demo simulieren wir eine erfolgreiche Antwort
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setSuccess(true);
      setOptions(options.map(opt => 
        opt.id === data.optionId 
          ? { ...opt, currentBackers: opt.currentBackers + 1 } 
          : opt
      ));

    } catch (err) {
      console.error('Fehler bei der Crowdfunding-Pledge:', err);
      setError('Fehler bei der Übermittlung. Bitte versuchen Sie es später erneut.');
    } finally {
      setSubmitting(false);
    }
  };

  const closeModal = () => {
    setShowModal(false);
    setError('');
    setSuccess(false);
    reset();
  };

  // Falls noch keine Optionen geladen wurden
  if (loading) {
    return (
      <section className="section" id="crowdfunding">
        <div className="container">
          <div className="section-heading">
            <h2>Unterstützen Sie unser Projekt</h2>
            <p>Laden...</p>
          </div>
          <div style={{ display: 'flex', justifyContent: 'center', padding: '40px 0' }}>
            <div className="spinner"></div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="section" id="crowdfunding">
      <div className="container">
        <div className="section-heading">
          <h2>Unterstützen Sie unser Projekt</h2>
          <p>Helfen Sie uns, noch mehr Menschen dabei zu unterstützen, Luxemburg preiswert zu erleben</p>
        </div>

        {error && !showModal && (
          <div style={{ 
            backgroundColor: '#f8d7da', 
            color: '#721c24', 
            padding: '10px 15px', 
            borderRadius: '4px', 
            marginBottom: '20px',
            textAlign: 'center'
          }}>
            {error}
          </div>
        )}

        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', 
          gap: '20px',
          marginBottom: '30px'
        }}>
          {options.map(option => (
            <div key={option.id} style={{ 
              backgroundColor: 'white',
              borderRadius: '8px',
              overflow: 'hidden',
              boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
              display: 'flex',
              flexDirection: 'column'
            }}>
              {option.imageUrl && (
                <div style={{ padding: '20px', background: '#f5f5f5', textAlign: 'center' }}>
                  <img src={option.imageUrl} alt={option.title} style={{ maxWidth: '100px', height: 'auto' }} />
                </div>
              )}
              <div style={{ padding: '20px', flex: 1 }}>
                <h3 style={{ color: '#38b6ff', marginBottom: '10px' }}>{option.title}</h3>
                <p style={{ marginBottom: '15px', fontSize: '14px' }}>{option.description}</p>
                
                <div style={{ 
                  display: 'flex', 
                  justifyContent: 'space-between', 
                  alignItems: 'center',
                  marginBottom: '15px',
                  padding: '10px 0',
                  borderTop: '1px solid #eee',
                  borderBottom: '1px solid #eee'
                }}>
                  <div>
                    <strong style={{ fontSize: '18px', color: '#e81414' }}>{option.price} {option.currency}</strong>
                  </div>
                  <div style={{ fontSize: '13px', color: '#666' }}>
                    {option.currentBackers} Unterstützer
                    {option.maxBackers && ` von ${option.maxBackers}`}
                  </div>
                </div>
                
                <button 
                  className="cta-button"
                  style={{
                    width: '100%',
                    backgroundColor: '#38b6ff',
                    color: 'white',
                    border: 'none',
                    borderRadius: '4px',
                    padding: '12px',
                    cursor: 'pointer',
                    fontWeight: 'bold',
                    transition: 'background-color 0.3s'
                  }}
                  onClick={() => handleOptionSelect(option)}
                  disabled={option.maxBackers && option.currentBackers >= option.maxBackers}
                >
                  {option.maxBackers && option.currentBackers >= option.maxBackers
                    ? 'Ausgebucht'
                    : 'Sélectionner'}
                </button>
              </div>
            </div>
          ))}
        </div>

        <div style={{ textAlign: 'center' }}>
          <p>Haben Sie Fragen zu unserem Crowdfunding? Kontaktieren Sie uns unter <a href="mailto:info@luxembourgpascher.lu">info@luxembourgpascher.lu</a></p>
        </div>

        {/* Modal für Spendenformular */}
        {showModal && (
          <div style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0,0,0,0.7)',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            zIndex: 1000
          }} onClick={closeModal}>
            <div style={{
              backgroundColor: 'white',
              borderRadius: '8px',
              width: '90%',
              maxWidth: '500px',
              maxHeight: '90vh',
              overflow: 'auto',
              padding: '30px',
              position: 'relative'
            }} onClick={e => e.stopPropagation()}>
              <button 
                style={{
                  position: 'absolute',
                  top: '15px',
                  right: '15px',
                  background: 'none',
                  border: 'none',
                  fontSize: '24px',
                  cursor: 'pointer',
                  color: '#666'
                }}
                onClick={closeModal}
              >
                &times;
              </button>

              {success ? (
                <div style={{ textAlign: 'center', padding: '20px 0' }}>
                  <div style={{ 
                    width: '60px', 
                    height: '60px', 
                    margin: '0 auto 20px', 
                    borderRadius: '50%', 
                    backgroundColor: '#d4edda',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '30px',
                    color: '#28a745'
                  }}>
                    ✓
                  </div>
                  <h3 style={{ color: '#28a745', marginBottom: '15px' }}>Danke für Ihre Unterstützung!</h3>
                  <p>Ihre Unterstützung hilft uns, unser Projekt weiterzuentwickeln. Sie erhalten in Kürze eine Bestätigungs-E-Mail.</p>
                  <button 
                    className="cta-button"
                    style={{
                      marginTop: '20px',
                      backgroundColor: '#38b6ff',
                      color: 'white',
                      border: 'none',
                      borderRadius: '4px',
                      padding: '10px 20px',
                      cursor: 'pointer'
                    }}
                    onClick={closeModal}
                  >
                    Schließen
                  </button>
                </div>
              ) : (
                <>
                  <h3 style={{ marginBottom: '20px', color: '#38b6ff' }}>
                    {selectedOption?.title}
                  </h3>

                  {error && (
                    <div style={{ 
                      backgroundColor: '#f8d7da', 
                      color: '#721c24', 
                      padding: '10px 15px', 
                      borderRadius: '4px', 
                      marginBottom: '20px' 
                    }}>
                      {error}
                    </div>
                  )}

                  <form onSubmit={handleSubmit(onSubmit)}>
                    <div style={{ marginBottom: '15px' }}>
                      <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>
                        Name*
                      </label>
                      <input 
                        {...register('name')}
                        style={{ 
                          width: '100%', 
                          padding: '10px', 
                          border: errors.name ? '1px solid #dc3545' : '1px solid #ddd',
                          borderRadius: '4px'
                        }}
                      />
                      {errors.name && (
                        <span style={{ color: '#dc3545', fontSize: '12px' }}>
                          {errors.name.message}
                        </span>
                      )}
                    </div>

                    <div style={{ marginBottom: '15px' }}>
                      <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>
                        E-Mail*
                      </label>
                      <input 
                        {...register('email')}
                        type="email"
                        style={{ 
                          width: '100%', 
                          padding: '10px', 
                          border: errors.email ? '1px solid #dc3545' : '1px solid #ddd',
                          borderRadius: '4px'
                        }}
                      />
                      {errors.email && (
                        <span style={{ color: '#dc3545', fontSize: '12px' }}>
                          {errors.email.message}
                        </span>
                      )}
                    </div>

                    <div style={{ marginBottom: '15px' }}>
                      <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>
                        Unterstützungsbetrag ({selectedOption?.currency})*
                      </label>
                      <input 
                        {...register('amount', { valueAsNumber: true })}
                        type="number"
                        min={selectedOption?.price || 1}
                        style={{ 
                          width: '100%', 
                          padding: '10px', 
                          border: errors.amount ? '1px solid #dc3545' : '1px solid #ddd',
                          borderRadius: '4px'
                        }}
                      />
                      {errors.amount && (
                        <span style={{ color: '#dc3545', fontSize: '12px' }}>
                          {errors.amount.message}
                        </span>
                      )}
                      <span style={{ fontSize: '12px', color: '#666' }}>
                        Mindestbetrag: {selectedOption?.price} {selectedOption?.currency}
                      </span>
                    </div>

                    <div style={{ marginBottom: '15px' }}>
                      <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>
                        Zahlungsmethode*
                      </label>
                      <select 
                        {...register('paymentMethod')}
                        style={{ 
                          width: '100%', 
                          padding: '10px', 
                          border: errors.paymentMethod ? '1px solid #dc3545' : '1px solid #ddd',
                          borderRadius: '4px'
                        }}
                      >
                        <option value="">-- Bitte auswählen --</option>
                        <option value="credit-card">Kreditkarte</option>
                        <option value="paypal">PayPal</option>
                        <option value="bank-transfer">Überweisung</option>
                      </select>
                      {errors.paymentMethod && (
                        <span style={{ color: '#dc3545', fontSize: '12px' }}>
                          {errors.paymentMethod.message}
                        </span>
                      )}
                    </div>

                    <div style={{ marginBottom: '20px' }}>
                      <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>
                        Nachricht (optional)
                      </label>
                      <textarea 
                        {...register('message')}
                        style={{ 
                          width: '100%', 
                          padding: '10px', 
                          border: '1px solid #ddd',
                          borderRadius: '4px',
                          minHeight: '80px'
                        }}
                      />
                    </div>

                    <button 
                      type="submit"
                      className="cta-button"
                      style={{
                        width: '100%',
                        backgroundColor: '#e81414',
                        color: 'white',
                        border: 'none',
                        borderRadius: '4px',
                        padding: '12px',
                        cursor: 'pointer',
                        fontWeight: 'bold',
                        opacity: submitting ? 0.7 : 1
                      }}
                      disabled={submitting}
                    >
                      {submitting ? 'Wird verarbeitet...' : 'Jetzt unterstützen'}
                    </button>
                  </form>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}