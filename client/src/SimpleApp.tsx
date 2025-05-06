import React from 'react';

export default function SimpleApp() {
  return (
    <div style={{ 
      padding: '20px', 
      fontFamily: 'Arial, sans-serif', 
      maxWidth: '1200px', 
      margin: '0 auto' 
    }}>
      <header style={{ 
        backgroundColor: '#38b6ff', 
        color: 'white', 
        padding: '20px', 
        borderRadius: '8px', 
        marginBottom: '20px' 
      }}>
        <h1>Luxembourg Pas Cher</h1>
        <p>Die besten Tipps und Angebote für ein erschwingliches Leben in Luxemburg</p>
      </header>
      
      <main>
        <section style={{ 
          backgroundColor: '#f5f5f5',
          padding: '20px',
          borderRadius: '8px',
          marginBottom: '20px'
        }}>
          <h2 style={{ color: '#333' }}>Willkommen zu Luxembourg Pas Cher</h2>
          <p style={{ lineHeight: 1.6 }}>
            Entdecken Sie, wie Sie dieses wunderschöne Land genießen können, ohne Ihr Portemonnaie zu leeren.
            Unser Guide bietet Ihnen die besten Tipps und Angebote für ein erschwingliches Leben in Luxemburg.
          </p>
          
          <div style={{ 
            display: 'flex', 
            gap: '20px', 
            flexWrap: 'wrap',
            marginTop: '20px'
          }}>
            <div style={{ 
              flex: '1 1 300px', 
              backgroundColor: 'white', 
              padding: '20px', 
              borderRadius: '8px',
              boxShadow: '0 2px 5px rgba(0,0,0,0.1)'
            }}>
              <h3 style={{ color: '#38b6ff' }}>Unser Buch</h3>
              <p>Das Buch "Luxembourg Pas Cher" enthält über 500 Angebote und Tipps.</p>
              <button style={{
                backgroundColor: '#e81414',
                color: 'white',
                border: 'none',
                padding: '10px 20px',
                borderRadius: '4px',
                cursor: 'pointer',
                marginTop: '10px'
              }}>
                Jetzt bestellen
              </button>
            </div>
            
            <div style={{ 
              flex: '1 1 300px', 
              backgroundColor: 'white', 
              padding: '20px', 
              borderRadius: '8px',
              boxShadow: '0 2px 5px rgba(0,0,0,0.1)'
            }}>
              <h3 style={{ color: '#38b6ff' }}>Über uns</h3>
              <p>Wir sind ein engagiertes Team, das es sich zur Aufgabe gemacht hat, das Leben in Luxemburg für alle erschwinglich zu machen.</p>
              <button style={{
                backgroundColor: '#38b6ff',
                color: 'white',
                border: 'none',
                padding: '10px 20px',
                borderRadius: '4px',
                cursor: 'pointer',
                marginTop: '10px'
              }}>
                Mehr erfahren
              </button>
            </div>
          </div>
        </section>
        
        <section style={{ 
          backgroundColor: '#f5f5f5',
          padding: '20px',
          borderRadius: '8px',
          marginBottom: '20px'
        }}>
          <h2 style={{ color: '#333' }}>Zielgruppen</h2>
          <p style={{ lineHeight: 1.6, marginBottom: '20px' }}>
            Unser Guide richtet sich an verschiedene Zielgruppen, die in Luxemburg leben oder arbeiten.
          </p>
          
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', 
            gap: '20px'
          }}>
            {/* Student */}
            <div style={{
              backgroundColor: 'white',
              borderRadius: '8px',
              padding: '20px',
              boxShadow: '0 2px 5px rgba(0,0,0,0.1)'
            }}>
              <h3 style={{ color: '#38b6ff', marginBottom: '10px' }}>Student·in</h3>
              <p>Ob Luxemburger oder international, Studierende sind mit hohen Lebenshaltungskosten konfrontiert, besonders bei der Unterkunft.</p>
            </div>
            
            {/* Entrepreneur */}
            <div style={{
              backgroundColor: 'white',
              borderRadius: '8px',
              padding: '20px',
              boxShadow: '0 2px 5px rgba(0,0,0,0.1)'
            }}>
              <h3 style={{ color: '#e81414', marginBottom: '10px' }}>Selbständige·r</h3>
              <p>Mit begrenztem Budget jongliert er/sie zwischen selbstständiger Tätigkeit und persönlichen Ausgaben.</p>
            </div>
            
            {/* Families */}
            <div style={{
              backgroundColor: 'white',
              borderRadius: '8px',
              padding: '20px',
              boxShadow: '0 2px 5px rgba(0,0,0,0.1)'
            }}>
              <h3 style={{ color: '#38b6ff', marginBottom: '10px' }}>Familien</h3>
              <p>Alleinerziehende oder prekäre Familien vereinen mentale Belastung und finanzielle Instabilität.</p>
            </div>
          </div>
        </section>
      </main>
      
      <footer style={{ 
        backgroundColor: '#1f2937', 
        color: 'white', 
        padding: '20px', 
        borderRadius: '8px', 
        marginTop: '20px',
        textAlign: 'center'
      }}>
        <p>&copy; 2023 Luxembourg Pas Cher. Alle Rechte vorbehalten.</p>
      </footer>
    </div>
  );
}