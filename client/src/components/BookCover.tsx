import { useState } from 'react';

export default function BookCover() {
  // Wir verzichten auf die Rotation für ein exaktes Design wie im Screenshot
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div 
      className="book-cover-container position-relative" 
      style={{ 
        width: '100%',
        cursor: 'pointer',
        transition: 'all 0.3s ease'
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Cover genau wie im Screenshot */}
      <div
        style={{
          width: '100%',
          borderRadius: '2px',
          overflow: 'hidden',
          boxShadow: isHovered 
            ? '0 10px 25px rgba(0, 0, 0, 0.2)' 
            : '0 5px 15px rgba(0, 0, 0, 0.15)',
          transform: isHovered ? 'translateY(-5px)' : 'translateY(0)',
          transition: 'all 0.3s ease'
        }}
      >
        {/* Das Buchcover - exakt wie im Screenshot */}
        <div 
          style={{
            background: 'white',
            borderRadius: '2px',
            overflow: 'hidden',
            position: 'relative'
          }}
        >
          {/* Autor */}
          <div 
            style={{
              padding: '10px',
              textAlign: 'center',
              borderBottom: '1px solid #f0f0f0',
              fontSize: '14px',
              fontWeight: '500',
              color: '#333'
            }}
          >
            PASCALE ZADROUQ
          </div>
          
          {/* Hauptteil des Covers */}
          <div 
            style={{
              textAlign: 'center',
              padding: '20px 15px',
              background: 'white'
            }}
          >
            <div 
              style={{
                fontWeight: 'bold',
                fontSize: '24px',
                color: '#333',
                marginBottom: '5px',
                textTransform: 'uppercase'
              }}
            >
              LE LUXEMBOURG
            </div>
            <div 
              style={{
                fontWeight: 'bold',
                fontSize: '24px',
                color: '#333',
                marginBottom: '15px',
                textTransform: 'uppercase'
              }}
            >
              PAS CHER
            </div>
            
            {/* Roter Strich */}
            <div 
              style={{
                height: '6px',
                width: '80%',
                margin: '0 auto 15px',
                background: '#E31837',
                borderRadius: '3px'
              }}
            ></div>
            
            {/* Untertitel */}
            <div 
              style={{
                fontWeight: '400',
                fontSize: '12px',
                color: '#666',
                marginTop: '15px',
                textTransform: 'uppercase'
              }}
            >
              GUIDE PRATIQUE
            </div>
            
            {/* Untertitel Details */}
            <div 
              style={{
                fontSize: '10px',
                color: '#666',
                marginTop: '5px',
                lineHeight: '1.4',
                padding: '0 10px'
              }}
            >
              POUR NE PAS SE RUINER AU QUOTIDIEN 
              <br />
              ET VIVRE BIEN MÊME PAS CHER AU GRAND
              <br />
              DUCHÉ DE LUXEMBOURG
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}