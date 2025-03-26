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
      <svg
        className="w-100 h-100 mx-auto transition-all duration-300"
        viewBox="0 0 240 340"
        xmlns="http://www.w3.org/2000/svg"
        style={{
          filter: 'drop-shadow(0 10px 15px rgba(0, 0, 0, 0.3))',
          transform: `perspective(1200px) rotateY(${rotation.y}deg) rotateX(${rotation.x}deg)`,
          transformOrigin: 'left center'
        }}
      >
        {/* Book background */}
        <defs>
          <linearGradient id="bookSpineGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#b31c1c" />
            <stop offset="100%" stopColor="#e11d48" />
          </linearGradient>
          <linearGradient id="bookCoverGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#e11d48" />
            <stop offset="100%" stopColor="#b91c1c" />
          </linearGradient>
          <filter id="shadowEffect" x="-20%" y="-20%" width="140%" height="140%">
            <feDropShadow dx="3" dy="3" stdDeviation="5" floodOpacity="0.3" />
          </filter>
        </defs>

        {/* Book spine */}
        <rect x="0" y="10" width="20" height="320" rx="2" fill="url(#bookSpineGradient)" filter="url(#shadowEffect)" />
        
        {/* Book cover */}
        <rect x="20" y="10" width="220" height="320" rx="3" fill="url(#bookCoverGradient)" filter="url(#shadowEffect)" />
        
        {/* Book spine detail */}
        <rect x="5" y="20" width="10" height="300" rx="1" fill="#ffffff" fillOpacity="0.1" />
        
        {/* Luxembourg flag colors - horizontal stripes on top of book */}
        <rect x="30" y="30" width="200" height="20" fill="#00A1DE" />
        <rect x="30" y="50" width="200" height="20" fill="#FFFFFF" />
        <rect x="30" y="70" width="200" height="20" fill="#E60023" />
        
        {/* Book title */}
        <text 
          x="130" 
          y="140" 
          fontFamily="Montserrat, Arial, sans-serif" 
          fontSize="22" 
          fontWeight="bold" 
          fill="white" 
          textAnchor="middle"
        >
          LUXEMBOURG
        </text>
        <text 
          x="130" 
          y="170" 
          fontFamily="Montserrat, Arial, sans-serif" 
          fontSize="22" 
          fontWeight="bold" 
          fill="white" 
          textAnchor="middle"
        >
          PAS CHÈRE
        </text>
        
        {/* Subtitle */}
        <text 
          x="130" 
          y="200" 
          fontFamily="Open Sans, Arial, sans-serif" 
          fontSize="12" 
          fill="white" 
          textAnchor="middle"
        >
          Guide to Affordable Living
        </text>
        
        {/* Euro sign */}
        <circle cx="130" cy="240" r="30" fill="white" fillOpacity="0.2" />
        <text 
          x="130" 
          y="250" 
          fontFamily="Montserrat, Arial, sans-serif" 
          fontSize="32" 
          fontWeight="bold" 
          fill="white" 
          textAnchor="middle"
        >
          €
        </text>
        
        {/* Author name */}
        <text 
          x="130" 
          y="300" 
          fontFamily="Open Sans, Arial, sans-serif" 
          fontSize="12" 
          fill="white" 
          textAnchor="middle"
        >
          The Ultimate Savings Guide
        </text>
        
        {/* Book page effect */}
        <path 
          d="M240,10 C235,15 235,325 240,330" 
          stroke="#f8f8f8" 
          strokeWidth="1" 
          fill="none" 
        />
        {/* Page lines */}
        {[...Array(10)].map((_, i) => (
          <line 
            key={i} 
            x1="240" 
            y1={40 + i * 30} 
            x2="235" 
            y2={40 + i * 30} 
            stroke="#f8f8f8" 
            strokeWidth="0.5" 
          />
        ))}
      </svg>
      
      {/* Book reflection effect */}
      <div className="book-reflection position-absolute bottom-0 start-50 translate-middle-x w-75" 
           style={{ height: '20px', background: 'linear-gradient(to bottom, rgba(255,255,255,0.3), transparent)', 
                   borderTopLeftRadius: '50%', borderTopRightRadius: '50%', transform: 'scaleY(-1)', opacity: 0.3 }}>
      </div>
    </div>
  );
}