interface BrandShieldLogoProps {
  variant?: 'header' | 'auth' | 'hero' | 'verification'
  showDescriptor?: boolean
  className?: string
}

export default function BrandShieldLogo({
  variant = 'header',
  showDescriptor = true,
  className = '',
}: BrandShieldLogoProps) {
  const isHero = variant === 'hero'
  const isAuth = variant === 'auth'
  const markSize = isHero ? 48 : isAuth ? 40 : 32

  return (
    <div
      className={`bs-brand-lockup bs-brand-lockup--${variant} ${className}`}
      role="img"
      aria-label="Brand Shield AI — Autonomous Brand Governance"
    >
      <div className="bs-logo-mark-wrapper">
        <svg
          className="bs-logo-symbol"
          width={markSize}
          height={markSize}
          viewBox="0 0 48 48"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <linearGradient id={`bsShieldGrad-${variant}`} x1="4" y1="4" x2="44" y2="44" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#00f2fe" />
              <stop offset="50%" stopColor="#38bdf8" />
              <stop offset="100%" stopColor="#818cf8" />
            </linearGradient>
            <linearGradient id={`bsCoreGrad-${variant}`} x1="16" y1="14" x2="32" y2="34" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#38bdf8" />
              <stop offset="100%" stopColor="#00f2fe" />
            </linearGradient>
            <filter id={`bsGlow-${variant}`} x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="2" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
          </defs>

          {/* Glowing Ambient Core */}
          <circle cx="24" cy="22" r="14" fill="#00f2fe" opacity="0.12" filter={`url(#bsGlow-${variant})`} />

          {/* Outer Shield Shell */}
          <path
            d="M24 4L8 10V22C8 31.8 14.8 40.8 24 44C33.2 40.8 40 31.8 40 22V10L24 4Z"
            stroke={`url(#bsShieldGrad-${variant})`}
            strokeWidth="2.75"
            strokeLinejoin="round"
            fill="rgba(11, 19, 38, 0.85)"
          />

          {/* Micro Grid Inner Track */}
          <path
            d="M24 10.5L14 14.5V21C14 27.5 18.2 33.6 24 36.5C29.8 33.6 34 27.5 34 21V14.5L24 10.5Z"
            stroke="#00f2fe"
            strokeWidth="1.2"
            strokeDasharray="2 2"
            opacity="0.5"
            fill="none"
          />

          {/* Central AI Facet Diamond */}
          <polygon
            points="24,14 31,23 24,32 17,23"
            fill={`url(#bsCoreGrad-${variant})`}
            opacity="0.95"
          />

          {/* Neural Node Core */}
          <circle cx="24" cy="23" r="3.2" fill="#ffffff" filter={`url(#bsGlow-${variant})`} />

          {/* Cyber Nodes */}
          <circle cx="24" cy="7" r="1.5" fill="#00f2fe" />
          <circle cx="11" cy="18" r="1.2" fill="#38bdf8" />
          <circle cx="37" cy="18" r="1.2" fill="#38bdf8" />
        </svg>
      </div>

      <div className="bs-brand-text">
        <div className="bs-brand-heading">
          <span className="bs-brand-name">Brand Shield</span>
          <span className="bs-brand-badge-ai">AI</span>
        </div>
        {showDescriptor && (
          <span className="bs-brand-descriptor">
            {isHero
              ? 'Autonomous Brand Governance & Preflight Protection'
              : 'Governance & Verification'}
          </span>
        )}
      </div>
    </div>
  )
}
