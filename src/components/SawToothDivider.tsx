import React from 'react';

interface SawToothDividerProps {
  fillColor?: string;
  inverted?: boolean;
  className?: string;
}

export const SawToothDivider: React.FC<SawToothDividerProps> = ({
  fillColor = '#FAF5EB',
  inverted = false,
  className = '',
}) => {
  return (
    <div
      className={`w-full overflow-hidden leading-none pointer-events-none select-none ${
        inverted ? 'rotate-180' : ''
      } ${className}`}
      style={{ height: '14px' }}
    >
      <svg
        className="w-full h-full block"
        viewBox="0 0 1200 14"
        preserveAspectRatio="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="
            M0,0 
            L10,14 L20,0 L30,14 L40,0 L50,14 L60,0 L70,14 L80,0 L90,14 L100,0
            L110,14 L120,0 L130,14 L140,0 L150,14 L160,0 L170,14 L180,0 L190,14 L200,0
            L210,14 L220,0 L230,14 L240,0 L250,14 L260,0 L270,14 L280,0 L290,14 L300,0
            L310,14 L320,0 L330,14 L340,0 L350,14 L360,0 L370,14 L380,0 L390,14 L400,0
            L410,14 L420,0 L430,14 L440,0 L450,14 L460,0 L470,14 L480,0 L490,14 L500,0
            L510,14 L520,0 L530,14 L540,0 L550,14 L560,0 L570,14 L580,0 L590,14 L600,0
            L610,14 L620,0 L630,14 L640,0 L650,14 L660,0 L670,14 L680,0 L690,14 L700,0
            L710,14 L720,0 L730,14 L740,0 L750,14 L760,0 L770,14 L780,0 L790,14 L800,0
            L810,14 L820,0 L830,14 L840,0 L850,14 L860,0 L870,14 L880,0 L890,14 L900,0
            L910,14 L920,0 L930,14 L940,0 L950,14 L960,0 L970,14 L980,0 L990,14 L1000,0
            L1010,14 L1020,0 L1030,14 L1040,0 L1050,14 L1060,0 L1070,14 L1080,0 L1090,14 L1100,0
            L1110,14 L1120,0 L1130,14 L1140,0 L1150,14 L1160,0 L1170,14 L1180,0 L1190,14 L1200,0
            L1200,14 L0,14 Z
          "
          fill={fillColor}
        />
      </svg>
    </div>
  );
};
