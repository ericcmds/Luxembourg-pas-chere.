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
    <section id="faq" className="faq-section">
      <div className="container">
        <div className="section-header text-center">
          <h2 className="section-title">{t.faqTitle}</h2>
          <p className="section-description">{t.faqDescription}</p>
        </div>
        
        <div className="faq-container">
          {faqs.map((faq, index) => (
            <div 
              key={index} 
              className={`faq-item ${faq.isOpen ? 'active' : ''}`}
              onClick={() => toggleFAQ(index)}
            >
              <div className="faq-question">
                <h3>{faq.question}</h3>
                <div className="faq-icon">
                  {faq.isOpen ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                </div>
              </div>
              
              <div className={`faq-answer ${faq.isOpen ? 'open' : ''}`}>
                <p>{faq.answer}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQSection;