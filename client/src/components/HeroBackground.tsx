export default function HeroBackground() {
  return (
    <svg
      className="absolute inset-0 w-full h-full object-cover"
      xmlns="http://www.w3.org/2000/svg"
      width="100%"
      height="100%"
      preserveAspectRatio="xMidYMid slice"
      viewBox="0 0 1200 800"
    >
      <defs>
        <linearGradient id="gradient1" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#1a365d" stopOpacity="0.7" />
          <stop offset="100%" stopColor="#00A1DE" stopOpacity="0.7" />
        </linearGradient>
        <linearGradient id="gradient2" x1="100%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#E60023" stopOpacity="0.4" />
          <stop offset="100%" stopColor="#1a365d" stopOpacity="0.4" />
        </linearGradient>
        <pattern id="pattern1" width="10" height="10" patternUnits="userSpaceOnUse">
          <circle cx="5" cy="5" r="1" fill="white" opacity="0.05" />
        </pattern>
      </defs>
      
      {/* Background base */}
      <rect width="100%" height="100%" fill="#042f4a" />
      
      {/* Cityscape silhouettes - Luxembourg skyline stylized */}
      <g opacity="0.3">
        {/* Castle/Fortress (representing Bock Casemates) */}
        <path d="M0,550 L100,550 L100,450 L150,450 L150,500 L200,500 L200,450 L250,450 L250,550 L300,550 L300,500 L350,500 L350,530 L400,530 L400,550 L0,550 Z" fill="#0a1a2a" />
        
        {/* Modern buildings in the background */}
        <path d="M350,550 L350,400 L380,400 L380,430 L400,430 L400,380 L430,380 L430,420 L450,420 L450,350 L480,350 L480,550 Z" fill="#0a1a2a" />
        <path d="M500,550 L500,420 L530,420 L530,380 L560,380 L560,420 L580,420 L580,350 L610,350 L610,550 Z" fill="#0a1a2a" />
        
        {/* Philharmonie (inspired by) */}
        <path d="M650,550 L650,430 L700,400 L750,430 L750,550 Z" fill="#0a1a2a" />
        
        {/* Kirchberg buildings */}
        <path d="M800,550 L800,350 L850,350 L850,400 L900,400 L900,300 L950,300 L950,400 L1000,400 L1000,350 L1050,350 L1050,550 Z" fill="#0a1a2a" />
        
        {/* More buildings to the right */}
        <path d="M1100,550 L1100,380 L1150,380 L1150,400 L1200,400 L1200,550 Z" fill="#0a1a2a" />
      </g>
      
      {/* Petrusse valley representation */}
      <path d="M150,550 C250,520 300,560 400,530 C500,500 600,560 700,540 C800,520 900,560 1000,530 C1100,500 1200,550 1200,550 L1200,650 L0,650 L0,550 C50,530 100,560 150,550 Z" fill="#142e3e" />
      
      {/* River or water effect */}
      <path d="M0,600 C100,580 200,610 300,590 C400,570 500,610 600,590 C700,570 800,610 900,590 C1000,570 1100,610 1200,590 L1200,800 L0,800 Z" fill="#1f4766" />
      
      {/* Overlay gradients for depth and color */}
      <rect width="100%" height="100%" fill="url(#gradient1)" />
      <rect width="100%" height="100%" fill="url(#gradient2)" />
      <rect width="100%" height="100%" fill="url(#pattern1)" />
      
      {/* Light sources (like stars or lights) */}
      <g opacity="0.6">
        <circle cx="200" cy="150" r="1" fill="white" />
        <circle cx="350" cy="100" r="1" fill="white" />
        <circle cx="500" cy="180" r="1" fill="white" />
        <circle cx="650" cy="120" r="1" fill="white" />
        <circle cx="800" cy="200" r="1" fill="white" />
        <circle cx="950" cy="150" r="1" fill="white" />
        <circle cx="1100" cy="180" r="1" fill="white" />
      </g>
    </svg>
  );
}