interface NikoLogoProps {
  size?: number;
  className?: string;
}

export function NikoLogo({ size = 120, className = "" }: NikoLogoProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 120 120"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <defs>
        <linearGradient id="nikoGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#6B5FFF" />
          <stop offset="50%" stopColor="#A855F7" />
          <stop offset="100%" stopColor="#FF4D9F" />
        </linearGradient>
      </defs>

      {/* Neural network nodes - left vertical line */}
      <circle cx="35" cy="30" r="6" fill="url(#nikoGradient)" />
      <circle cx="35" cy="60" r="6" fill="url(#nikoGradient)" />
      <circle cx="35" cy="90" r="6" fill="url(#nikoGradient)" />

      {/* Neural network nodes - right vertical line */}
      <circle cx="85" cy="30" r="6" fill="url(#nikoGradient)" />
      <circle cx="85" cy="60" r="6" fill="url(#nikoGradient)" />
      <circle cx="85" cy="90" r="6" fill="url(#nikoGradient)" />

      {/* Connecting lines forming the "N" shape with neural network style */}
      {/* Left vertical stem */}
      <line
        x1="35"
        y1="30"
        x2="35"
        y2="90"
        stroke="url(#nikoGradient)"
        strokeWidth="4"
        strokeLinecap="round"
      />

      {/* Diagonal connecting lines (neural network connections) */}
      <line
        x1="35"
        y1="30"
        x2="85"
        y2="60"
        stroke="url(#nikoGradient)"
        strokeWidth="4"
        strokeLinecap="round"
        opacity="0.7"
      />

      <line
        x1="35"
        y1="60"
        x2="85"
        y2="90"
        stroke="url(#nikoGradient)"
        strokeWidth="4"
        strokeLinecap="round"
        opacity="0.7"
      />

      {/* Main diagonal stem forming the N */}
      <line
        x1="35"
        y1="30"
        x2="85"
        y2="90"
        stroke="url(#nikoGradient)"
        strokeWidth="5"
        strokeLinecap="round"
      />

      {/* Right vertical stem */}
      <line
        x1="85"
        y1="30"
        x2="85"
        y2="90"
        stroke="url(#nikoGradient)"
        strokeWidth="4"
        strokeLinecap="round"
      />

      {/* Additional neural connections for complexity */}
      <line
        x1="35"
        y1="90"
        x2="85"
        y2="60"
        stroke="url(#nikoGradient)"
        strokeWidth="3"
        strokeLinecap="round"
        opacity="0.4"
      />

      <line
        x1="35"
        y1="60"
        x2="85"
        y2="30"
        stroke="url(#nikoGradient)"
        strokeWidth="3"
        strokeLinecap="round"
        opacity="0.4"
      />
    </svg>
  );
}
