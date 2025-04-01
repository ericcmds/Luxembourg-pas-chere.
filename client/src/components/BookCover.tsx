import { useState, useEffect, useRef } from 'react';

export default function BookCover() {
  const [rotation, setRotation] = useState({ x: 0, y: 10 });
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Handle mouse movement for 3D effect
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    
    const rect = containerRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    // Calculate rotation based on mouse position
    const rotateY = ((e.clientX - centerX) / (rect.width / 2)) * 15;
    const rotateX = ((e.clientY - centerY) / (rect.height / 2)) * -10;
    
    setRotation({ x: rotateX, y: rotateY });
  };
  
  // Reset rotation when mouse leaves
  const handleMouseLeave = () => {
    setRotation({ x: 0, y: 10 });
  };
  
  // Add subtle animation
  useEffect(() => {
    const interval = setInterval(() => {
      setRotation(prev => ({
        x: prev.x + (Math.random() * 0.8 - 0.4),
        y: prev.y + (Math.random() * 0.8 - 0.4)
      }));
    }, 3000);
    
    return () => clearInterval(interval);
  }, []);

  return (
    <div 
      ref={containerRef}
      className="book-cover-container position-relative" 
      style={{ maxWidth: '350px', cursor: 'pointer' }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {/* Echtes Buchcover mit 3D-Effekt */}
      <img 
        src="/assets/cover.png" 
        alt="Luxembourg Pas Cher - Guide Pratique" 
        className="img-fluid transition-all duration-300"
        style={{
          filter: 'drop-shadow(0 10px 15px rgba(0, 0, 0, 0.3))',
          transform: `perspective(1200px) rotateY(${rotation.y}deg) rotateX(${rotation.x}deg)`,
          transformOrigin: 'left center',
          width: '100%',
          borderRadius: '4px',
          objectFit: 'contain'
        }}
        onError={(e) => {
          console.error('Fehler beim Laden des Buchcovers, Fallback wird verwendet');
          const target = e.target as HTMLImageElement;
          target.style.display = 'none';
          
          // Fallback zum original SVG wenn das Bild nicht geladen werden kann
          const fallbackContainer = document.createElement('div');
          fallbackContainer.innerHTML = `
            <svg
              class="w-100 h-100 mx-auto transition-all duration-300"
              viewBox="0 0 240 340"
              xmlns="http://www.w3.org/2000/svg"
              style="
                filter: drop-shadow(0 10px 15px rgba(0, 0, 0, 0.3));
                transform: perspective(1200px) rotateY(${rotation.y}deg) rotateX(${rotation.x}deg);
                transform-origin: left center;
              "
            >
              <defs>
                <linearGradient id="bookSpineGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stop-color="#b31c1c" />
                  <stop offset="100%" stop-color="#e11d48" />
                </linearGradient>
                <linearGradient id="bookCoverGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stop-color="#e11d48" />
                  <stop offset="100%" stop-color="#b91c1c" />
                </linearGradient>
                <filter id="shadowEffect" x="-20%" y="-20%" width="140%" height="140%">
                  <feDropShadow dx="3" dy="3" stdDeviation="5" flood-opacity="0.3" />
                </filter>
              </defs>
              <rect x="0" y="10" width="20" height="320" rx="2" fill="url(#bookSpineGradient)" filter="url(#shadowEffect)" />
              <rect x="20" y="10" width="220" height="320" rx="3" fill="url(#bookCoverGradient)" filter="url(#shadowEffect)" />
              <rect x="5" y="20" width="10" height="300" rx="1" fill="#ffffff" fill-opacity="0.1" />
              <rect x="30" y="30" width="200" height="20" fill="#00A1DE" />
              <rect x="30" y="50" width="200" height="20" fill="#FFFFFF" />
              <rect x="30" y="70" width="200" height="20" fill="#E60023" />
              <text x="130" y="140" font-family="Montserrat, Arial, sans-serif" font-size="22" font-weight="bold" fill="white" text-anchor="middle">LUXEMBOURG</text>
              <text x="130" y="170" font-family="Montserrat, Arial, sans-serif" font-size="22" font-weight="bold" fill="white" text-anchor="middle">PAS CHÈRE</text>
              <text x="130" y="200" font-family="Open Sans, Arial, sans-serif" font-size="12" fill="white" text-anchor="middle">Guide to Affordable Living</text>
              <circle cx="130" cy="240" r="30" fill="white" fill-opacity="0.2" />
              <text x="130" y="250" font-family="Montserrat, Arial, sans-serif" font-size="32" font-weight="bold" fill="white" text-anchor="middle">€</text>
              <text x="130" y="300" font-family="Open Sans, Arial, sans-serif" font-size="12" fill="white" text-anchor="middle">The Ultimate Savings Guide</text>
              <path d="M240,10 C235,15 235,325 240,330" stroke="#f8f8f8" stroke-width="1" fill="none" />
            </svg>
          `;
          target.parentNode?.appendChild(fallbackContainer.firstElementChild!);
        }}
      />
      
      {/* Book reflection effect */}
      <div className="book-reflection position-absolute bottom-0 start-50 translate-middle-x w-75" 
           style={{ height: '20px', background: 'linear-gradient(to bottom, rgba(255,255,255,0.3), transparent)', 
                   borderTopLeftRadius: '50%', borderTopRightRadius: '50%', transform: 'scaleY(-1)', opacity: 0.3 }}>
      </div>
    </div>
  );
}