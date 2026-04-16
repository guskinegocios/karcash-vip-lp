import React from 'react';

interface LogoProps {
  variant?: 'light' | 'dark';
  className?: string;
  h?: number | string;
}

export const Logo: React.FC<LogoProps> = ({ variant = 'light', className = '', h = 40 }) => {
  // Variant colors
  const textColor = variant === 'light' ? '#ffffff' : '#05100B';
  const circleColor = variant === 'light' ? '#92FE01' : '#05100B'; // Lime vs Black
  const kColor = '#ffffff'; // K is always white inside the circle as requested

  return (
    <svg 
      height={h}
      viewBox="0 0 320 80" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      {/* Circle Icon */}
      <circle cx="40" cy="40" r="38" fill={circleColor} />
      
      {/* Stylized 'K' inside circle */}
      <path 
        d="M32 20H40V35L48 20H58L46 38L58 60H48L40 42V60H32V20Z" 
        fill={kColor} 
      />
      
      {/* KARCASH Text */}
      <text 
        x="95" 
        y="50" 
        fill={textColor} 
        style={{ 
          fontFamily: "'Space Grotesk', 'Inter', sans-serif", 
          fontWeight: 900, 
          fontSize: '42px',
          letterSpacing: '-0.02em'
        }}
      >
        KARCASH
      </text>
    </svg>
  );
};
