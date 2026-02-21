interface SynorqLogoProps {
    className?: string;
    width?: number;
    height?: number;
  }
  
  export function SynorqLogo({ className = "", width = 130, height = 34 }: SynorqLogoProps) {
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 140 36"
        fill="none"
        width={width}
        height={height}
        className={className}
        aria-label="Synorq"
      >
        <defs>
          <linearGradient id="synorq-mark" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#00D4FF" />
            <stop offset="100%" stopColor="#7B2FFF" />
          </linearGradient>
        </defs>
  
        {/* Outer hexagon frame */}
        <path
          d="M10 6 L20 2 L30 6 L34 16 L30 26 L20 30 L10 26 L6 16 Z"
          fill="none"
          stroke="url(#synorq-mark)"
          strokeWidth="1.2"
          opacity="0.35"
        />
  
        {/* Spoke lines from outer to inner nodes */}
        <line x1="20" y1="2"  x2="20" y2="10" stroke="url(#synorq-mark)" strokeWidth="1" opacity="0.45" />
        <line x1="34" y1="16" x2="26" y2="16" stroke="url(#synorq-mark)" strokeWidth="1" opacity="0.45" />
        <line x1="20" y1="30" x2="20" y2="22" stroke="url(#synorq-mark)" strokeWidth="1" opacity="0.45" />
  
        {/* Inner connector arcs — right side (primary) */}
        <path
          d="M20 10 Q27 13 26 16"
          fill="none"
          stroke="url(#synorq-mark)"
          strokeWidth="1.6"
          strokeLinecap="round"
        />
        <path
          d="M26 16 Q27 19 20 22"
          fill="none"
          stroke="url(#synorq-mark)"
          strokeWidth="1.6"
          strokeLinecap="round"
        />
  
        {/* Inner connector arc — left side (subtle) */}
        <path
          d="M20 10 Q13 13 14 16 Q13 19 20 22"
          fill="none"
          stroke="#00D4FF"
          strokeWidth="0.9"
          strokeLinecap="round"
          opacity="0.3"
        />
  
        {/* Core nodes */}
        <circle cx="20" cy="10" r="2.8" fill="url(#synorq-mark)" />
        <circle cx="26" cy="16" r="2.2" fill="url(#synorq-mark)" opacity="0.75" />
        <circle cx="20" cy="22" r="2.8" fill="url(#synorq-mark)" />
        <circle cx="14" cy="16" r="1.6" fill="#00D4FF" opacity="0.4" />
  
        {/* Center dot */}
        <circle cx="20" cy="16" r="1.2" fill="#00D4FF" opacity="0.6" />
  
        {/* Wordmark */}
        <text
          x="44"
          y="23"
          fontFamily="'Syne', 'Arial Black', sans-serif"
          fontWeight="700"
          fontSize="15.5"
          letterSpacing="1"
          fill="white"
        >
          SYNORQ
        </text>
      </svg>
    );
  }