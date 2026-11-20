import BrandShieldLogo from './BrandShieldLogo'

interface BrandFlightLogoProps {
  variant?: 'header' | 'auth' | 'hero' | 'verification'
  showDescriptor?: boolean
  className?: string
}

export default function BrandFlightLogo({
  variant = 'header',
  showDescriptor = true,
  className = '',
}: BrandFlightLogoProps) {
  return (
    <BrandShieldLogo
      variant={variant}
      showDescriptor={showDescriptor}
      className={className}
    />
  )
}
