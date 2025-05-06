import React, { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

interface FAQProps {
  language: 'fr' | 'de' | 'en';
  t: Record<string, string>; // Translation object
}

interface FAQItem {
  question: string;
  answer: string;
  isOpen: boolean;
}

const FAQSection: React.FC<FAQProps> = ({ language, t }) => {
  const [faqs, setFaqs] = useState<FAQItem[]>([
    { question: t.faqQuestion1, answer: t.faqAnswer1, isOpen: false },
    { question: t.faqQuestion2, answer: t.faqAnswer2, isOpen: false },
    { question: t.faqQuestion3, answer: t.faqAnswer3, isOpen: false },
    { question: t.faqQuestion4, answer: t.faqAnswer4, isOpen: false },
    { question: t.faqQuestion5, answer: t.faqAnswer5, isOpen: false },
  ]);

  const toggleFAQ = (index: number) => {
    setFaqs(faqs.map((faq, i) => 
      i === index ? { ...faq, isOpen: !faq.isOpen } : faq
    ));
  };

  return (
    <section id="faq" style={{ 
      padding: '5rem 0',
      backgroundColor: '#f9f9f9'
    }}>
      <div style={{ 
        maxWidth: '1200px',
        margin: '0 auto',
        padding: '0 1.5rem'
      }}>
        <div style={{ 
          textAlign: 'center', 
          marginBottom: '3rem' 
        }}>
          <h2 style={{ 
            fontSize: '2.5rem',
            color: '#333',
            marginBottom: '1rem',
            position: 'relative',
            display: 'inline-block',
            paddingBottom: '0.5rem'
          }}>
            {t.faqTitle}
            <span style={{
              position: 'absolute',
              bottom: 0,
              left: '50%',
              transform: 'translateX(-50%)',
              width: '80px',
              height: '3px',
              backgroundColor: '#38b6ff'
            }}></span>
          </h2>
          <p style={{ 
            fontSize: '1.1rem',
            color: '#666',
            maxWidth: '800px',
            margin: '0 auto'
          }}>
            {t.faqDescription}
          </p>
        </div>
        
        <div style={{ 
          maxWidth: '900px',
          margin: '0 auto'
        }}>
          {faqs.map((faq, index) => (
            <div 
              key={index} 
              style={{
                marginBottom: '1rem',
                border: '1px solid #eee',
                borderRadius: '8px',
                overflow: 'hidden',
                background: 'white',
                boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
                transition: 'all 0.3s ease'
              }}
            >
              <div 
                style={{
                  padding: '1.25rem',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  cursor: 'pointer',
                  backgroundColor: faq.isOpen ? '#38b6ff' : 'white',
                  color: faq.isOpen ? 'white' : '#333',
                  transition: 'all 0.3s ease'
                }}
                onClick={() => toggleFAQ(index)}
              >
                <h3 style={{ 
                  margin: 0, 
                  fontSize: '1.1rem',
                  fontWeight: '600',
                  paddingRight: '2rem'
                }}>
                  {faq.question}
                </h3>
                <div>
                  {faq.isOpen ? 
                    <ChevronUp size={20} color={faq.isOpen ? 'white' : '#38b6ff'} /> : 
                    <ChevronDown size={20} color={faq.isOpen ? 'white' : '#38b6ff'} />
                  }
                </div>
              </div>
              
              <div style={{
                padding: faq.isOpen ? '1.25rem' : '0 1.25rem',
                maxHeight: faq.isOpen ? '1000px' : '0',
                opacity: faq.isOpen ? 1 : 0,
                overflow: 'hidden',
                transition: 'all 0.3s ease',
                color: '#555',
                fontSize: '1rem',
                lineHeight: '1.6'
              }}>
                <p style={{ margin: '0 0 0.5rem 0' }}>{faq.answer}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQSection;