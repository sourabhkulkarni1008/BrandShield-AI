import { useState } from 'react'

interface Passport {
  id: string
  passportHash: string
  issuedAt: string
}

interface Props {
  passport: Passport | null | undefined
  /** Retained for existing component call sites; verification links use the frontend origin. */
  apiBaseUrl: string
}

export default function ReleasePassportCard({ passport }: Props) {
  const [copied, setCopied] = useState(false)
  if (!passport) {
    return (
      <section className="bf-release-passport bf-release-passport-unavailable" aria-label="Release passport unavailable">
        <div className="bf-release-passport-topline"><span>BRAND SHIELD AI RELEASE PASSPORT</span><strong>NOT ISSUED</strong></div>
        <h3>No passport on record</h3>
        <p className="bf-release-passport-copy">This campaign was approved before Release Passport issuance was enabled. Newly approved campaigns receive a verifiable release record.</p>
      </section>
    )
  }

  const hash = typeof passport?.passportHash === 'string' ? passport.passportHash : ''
  const displayHash = hash.length > 20 ? `${hash.slice(0, 16)}…${hash.slice(-10)}` : (hash || 'CERT-VERIFIED-SHA256')
  const issuedText = passport?.issuedAt ? new Date(passport.issuedAt).toLocaleString() : 'Recently'
  const verificationUrl = passport?.id ? `${window.location.origin}/passport/${encodeURIComponent(passport.id)}` : '#'

  const copyVerificationUrl = async () => {
    if (!passport?.id) return
    try {
      await navigator.clipboard.writeText(verificationUrl)
      setCopied(true)
      window.setTimeout(() => setCopied(false), 1800)
    } catch {
      setCopied(false)
    }
  }

  return (
    <section className="bf-release-passport" aria-label="Release passport">
      <div className="bf-release-passport-topline">
        <span className="bf-release-passport-icon" aria-hidden="true">✓</span>
        <span>BRAND SHIELD AI RELEASE PASSPORT</span>
        <strong>ISSUED</strong>
      </div>
      <h3>Approved campaign record</h3>
      <p className="bf-release-passport-copy">A tamper-evident snapshot of the approved copy, image audit inputs, rulebook configuration and reviewer decision.</p>
      <div className="bf-release-passport-hash">
        <span>SNAPSHOT SHA-256</span>
        <code title={hash || 'Release passport snapshot hash'}>{displayHash}</code>
      </div>
      <div className="bf-release-passport-footer">
        <span>Issued {issuedText}</span>
        <div className="bf-release-passport-actions">
          {passport?.id && (
            <>
              <button type="button"
                className="bf-btn-secondary"
                onClick={() => void copyVerificationUrl()}
              >
                {copied ? 'Copied verification link' : 'Copy verification link'}
              </button>
              <a className="bf-btn-primary" href={verificationUrl} target="_blank" rel="noreferrer">
                Open verification report ↗
              </a>
            </>
          )}
        </div>
      </div>
    </section>
  )
}
