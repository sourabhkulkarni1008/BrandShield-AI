import { useState } from 'react'
import './LandingPage.css'
import {
  Shield,
  ShieldCheck,
  Cpu,
  FileCheck2,
  Eye,
  Lock,
  Sparkles,
  ArrowRight,
  CheckCircle2,
  AlertTriangle,
  Layers,
  BarChart3,
  Users,
} from 'lucide-react'
import BrandShieldLogo from './BrandShieldLogo'

interface LandingPageProps {
  onNavigateLogin: () => void
  onDemoLogin: (role: 'CREATOR' | 'REVIEWER' | 'MANAGER') => void
  demoBusyRole: string | null
}

export default function LandingPage({
  onNavigateLogin,
  onDemoLogin,
  demoBusyRole,
}: LandingPageProps) {
  const [activeSimulationTab, setActiveSimulationTab] = useState<'copy' | 'visual' | 'passport'>('copy')

  return (
    <div className="bs-landing">
      {/* Background Cyber Ambient Mesh */}
      <div className="bs-landing-ambient" aria-hidden="true">
        <div className="bs-ambient-glow bs-glow-top-cyan" />
        <div className="bs-ambient-glow bs-glow-bottom-violet" />
        <div className="bs-ambient-grid" />
      </div>

      {/* Floating Glassmorphic Header */}
      <header className="bs-landing-header">
        <div className="bs-landing-header-inner">
          <BrandShieldLogo variant="header" />

          <nav className="bs-landing-nav">
            <a href="#features" className="bs-landing-nav-link">Capabilities</a>
            <a href="#sandbox" className="bs-landing-nav-link">Live Demo</a>
            <a href="#architecture" className="bs-landing-nav-link">Architecture</a>
            <a href="#security" className="bs-landing-nav-link">Trust &amp; Security</a>
          </nav>

          <div className="bs-landing-header-actions">
            <button
              type="button"
              className="btn-cyber-secondary bs-header-btn-login"
              onClick={onNavigateLogin}
            >
              Sign In
            </button>
            <a
              href="#sandbox"
              className="btn-cyber-primary bs-header-btn-cta"
            >
              Explore Live Demo
              <ArrowRight size={16} />
            </a>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bs-hero-section">
        <div className="bs-hero-container">
          {/* Status Tag */}
          <div className="bs-hero-badge" role="status">
            <span className="bs-pulse-dot" aria-hidden="true" />
            <span className="bs-badge-text">Brand Shield AI v2.4 • Active Enterprise Protection</span>
            <span className="bs-badge-pill">Autonomous</span>
          </div>

          <h1 className="bs-hero-title">
            Autonomous Brand Governance &amp;{' '}
            <span className="bs-gradient-text">Pre-Publication Verification</span>
          </h1>

          <p className="bs-hero-subtitle">
            Shield your brand identity across marketing copy and creative assets. Detect regulatory compliance violations,
            verify factual claims against approved truth, audit WCAG visual standards, and generate cryptographic Release Passports.
          </p>

          <div className="bs-hero-actions">
            <a href="#sandbox" className="btn-cyber-primary bs-hero-btn-primary">
              <Sparkles size={18} />
              Launch Live Role Demo
              <ArrowRight size={18} />
            </a>
            <button
              type="button"
              className="btn-cyber-secondary bs-hero-btn-secondary"
              onClick={onNavigateLogin}
            >
              <Lock size={16} />
              Enterprise Sign In
            </button>
          </div>

          {/* Interactive Live Metrics Bar */}
          <div className="bs-metrics-strip glass-panel">
            <div className="bs-metric-item">
              <div className="bs-metric-icon-wrap cyan">
                <Cpu size={20} />
              </div>
              <div className="bs-metric-data">
                <strong className="bs-metric-val">100%</strong>
                <span className="bs-metric-lbl">Deterministic Rule Engine</span>
              </div>
            </div>

            <div className="bs-metric-divider" />

            <div className="bs-metric-item">
              <div className="bs-metric-icon-wrap emerald">
                <FileCheck2 size={20} />
              </div>
              <div className="bs-metric-data">
                <strong className="bs-metric-val">&lt; 150ms</strong>
                <span className="bs-metric-lbl">Sub-Second Preflight Audit</span>
              </div>
            </div>

            <div className="bs-metric-divider" />

            <div className="bs-metric-item">
              <div className="bs-metric-icon-wrap sapphire">
                <Eye size={20} />
              </div>
              <div className="bs-metric-data">
                <strong className="bs-metric-val">WCAG 2.2</strong>
                <span className="bs-metric-lbl">Pixel Contrast &amp; Color Standards</span>
              </div>
            </div>

            <div className="bs-metric-divider" />

            <div className="bs-metric-item">
              <div className="bs-metric-icon-wrap violet">
                <ShieldCheck size={20} />
              </div>
              <div className="bs-metric-data">
                <strong className="bs-metric-val">SHA-256</strong>
                <span className="bs-metric-lbl">Tamper-Evident Passports</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Live Interactive Sandbox Launcher */}
      <section id="sandbox" className="bs-sandbox-section">
        <div className="bs-section-header">
          <div className="bs-section-tag">
            <Users size={14} />
            <span>Interactive Role Sandbox</span>
          </div>
          <h2 className="bs-section-title">Experience the Complete Governance Flow</h2>
          <p className="bs-section-desc">
            Choose a role below to enter the live workspace immediately. No password or account setup required.
          </p>
        </div>

        <div className="bs-role-grid">
          {/* Creator Role */}
          <div className="bs-role-card glass-card creator">
            <div className="bs-role-card-header">
              <div className="bs-role-avatar creator">CR</div>
              <div className="bs-role-badge">Creator Workspace</div>
            </div>
            <h3 className="bs-role-title">Marketing Creator</h3>
            <p className="bs-role-description">
              Draft campaign copy, upload creative assets, run real-time preflight checks, fix compliance findings, and submit drafts for human review.
            </p>
            <ul className="bs-role-features">
              <li><CheckCircle2 size={15} className="bs-check-icon" /> AI preflight text &amp; tone audit</li>
              <li><CheckCircle2 size={15} className="bs-check-icon" /> Computer vision &amp; pixel contrast scan</li>
              <li><CheckCircle2 size={15} className="bs-check-icon" /> Structured exception requests</li>
            </ul>
            <button
              type="button"
              className="btn-cyber-primary bs-role-btn"
              onClick={() => onDemoLogin('CREATOR')}
              disabled={demoBusyRole !== null}
            >
              {demoBusyRole === 'CREATOR' ? 'Entering Creator Workspace…' : 'Enter as Creator'}
              <ArrowRight size={16} />
            </button>
          </div>

          {/* Reviewer Role */}
          <div className="bs-role-card glass-card reviewer featured">
            <div className="bs-role-pill-featured">Recommended</div>
            <div className="bs-role-card-header">
              <div className="bs-role-avatar reviewer">RV</div>
              <div className="bs-role-badge">Approval Gateway</div>
            </div>
            <h3 className="bs-role-title">Brand Reviewer</h3>
            <p className="bs-role-description">
              Inspect submitted campaigns, review revision diffs side-by-side, rule on creator exception requests, and issue cryptographic Release Passports.
            </p>
            <ul className="bs-role-features">
              <li><CheckCircle2 size={15} className="bs-check-icon" /> Campaign revision intelligence &amp; diffs</li>
              <li><CheckCircle2 size={15} className="bs-check-icon" /> Human-in-the-loop exception decisions</li>
              <li><CheckCircle2 size={15} className="bs-check-icon" /> Tamper-evident passport generation</li>
            </ul>
            <button
              type="button"
              className="btn-cyber-primary bs-role-btn"
              onClick={() => onDemoLogin('REVIEWER')}
              disabled={demoBusyRole !== null}
            >
              {demoBusyRole === 'REVIEWER' ? 'Entering Reviewer Workspace…' : 'Enter as Reviewer'}
              <ArrowRight size={16} />
            </button>
          </div>

          {/* Manager Role */}
          <div className="bs-role-card glass-card manager">
            <div className="bs-role-card-header">
              <div className="bs-role-avatar manager">MG</div>
              <div className="bs-role-badge">Governance Admin</div>
            </div>
            <h3 className="bs-role-title">Brand Manager</h3>
            <p className="bs-role-description">
              Maintain the brand rulebook, verify approved factual claims, configure accessibility color standards, and monitor enterprise governance analytics.
            </p>
            <ul className="bs-role-features">
              <li><CheckCircle2 size={15} className="bs-check-icon" /> Dynamic rulebook with regex patterns</li>
              <li><CheckCircle2 size={15} className="bs-check-icon" /> Role-based color contrast matrix</li>
              <li><CheckCircle2 size={15} className="bs-check-icon" /> Recurring violation radar &amp; insights</li>
            </ul>
            <button
              type="button"
              className="btn-cyber-primary bs-role-btn"
              onClick={() => onDemoLogin('MANAGER')}
              disabled={demoBusyRole !== null}
            >
              {demoBusyRole === 'MANAGER' ? 'Entering Manager Workspace…' : 'Enter as Manager'}
              <ArrowRight size={16} />
            </button>
          </div>
        </div>
      </section>

      {/* Interactive Feature Simulation Showcase */}
      <section id="features" className="bs-features-section">
        <div className="bs-section-header">
          <div className="bs-section-tag">
            <Cpu size={14} />
            <span>Core Capabilities</span>
          </div>
          <h2 className="bs-section-title">Four Lines of Defense for Brand Integrity</h2>
          <p className="bs-section-desc">
            Explore how Brand Shield AI protects every layer of your brand communication before it reaches the public.
          </p>
        </div>

        {/* Tab Selector */}
        <div className="bs-sim-tabs">
          <button
            type="button"
            className={`bs-sim-tab ${activeSimulationTab === 'copy' ? 'active' : ''}`}
            onClick={() => setActiveSimulationTab('copy')}
          >
            <FileCheck2 size={16} />
            <span>1. Text Preflight &amp; Claims</span>
          </button>
          <button
            type="button"
            className={`bs-sim-tab ${activeSimulationTab === 'visual' ? 'active' : ''}`}
            onClick={() => setActiveSimulationTab('visual')}
          >
            <Eye size={16} />
            <span>2. Pixel Contrast &amp; Logo</span>
          </button>
          <button
            type="button"
            className={`bs-sim-tab ${activeSimulationTab === 'passport' ? 'active' : ''}`}
            onClick={() => setActiveSimulationTab('passport')}
          >
            <ShieldCheck size={16} />
            <span>3. Release Passports</span>
          </button>
        </div>

        {/* Interactive Simulation Display */}
        <div className="bs-sim-display glass-panel">
          {activeSimulationTab === 'copy' && (
            <div className="bs-sim-content">
              <div className="bs-sim-editor-mock">
                <div className="bs-mock-window-bar">
                  <div className="bs-mock-dots">
                    <span className="dot red" />
                    <span className="dot yellow" />
                    <span className="dot green" />
                  </div>
                  <span className="bs-mock-window-title">Campaign Copy Preflight Audit</span>
                </div>
                <div className="bs-mock-editor-body">
                  <p className="bs-mock-text">
                    Experience our revolutionary <span className="highlight-err">cheapest ever</span> handcrafted knitwear, crafted from{' '}
                    <span className="highlight-warn">100% pure Himalayan yak wool</span>. Tested to keep you{' '}
                    <span className="highlight-pass">warm in sub-zero alpine climates</span>.
                  </p>
                </div>
              </div>

              <div className="bs-sim-findings-mock">
                <div className="bs-mock-finding-card error">
                  <div className="bs-finding-meta">
                    <AlertTriangle size={16} className="text-rose" />
                    <span className="bs-finding-badge error">PROHIBITED TERMINOLOGY</span>
                    <span className="bs-rule-code">RULE: TERM_04</span>
                  </div>
                  <strong>&quot;cheapest ever&quot;</strong>
                  <p>Brand positioning prohibits discount-oriented language. Campa Cola represents premium Indian heritage refreshment.</p>
                  <div className="bs-suggested-fix">
                    <span>Suggested replacement:</span>
                    <code>&quot;celebratory value at MRP ₹20&quot;</code>
                  </div>
                </div>

                <div className="bs-mock-finding-card warning">
                  <div className="bs-finding-meta">
                    <AlertTriangle size={16} className="text-amber" />
                    <span className="bs-finding-badge warning">UNVERIFIED CLAIM</span>
                    <span className="bs-rule-code">CLAIM: FACT_02</span>
                  </div>
                  <strong>&quot;100% natural fruit juice zero sugar&quot;</strong>
                  <p>Nutritional claims must match approved truth (Campa Cola 500ml contains 21g carbohydrates per serving).</p>
                </div>
              </div>
            </div>
          )}

          {activeSimulationTab === 'visual' && (
            <div className="bs-sim-content visual-tab">
              <div className="bs-visual-demo-grid">
                <div className="bs-visual-card glass-card">
                  <div className="bs-visual-header">
                    <span className="bs-visual-title">OCR &amp; Pixel Contrast Extraction</span>
                    <span className="bs-status-pill green">WCAG 2.2 PASS</span>
                  </div>
                  <div className="bs-visual-preview-frame">
                    <div className="bs-contrast-demo-box">
                      <span className="bs-contrast-ratio">Contrast Ratio: <strong>7.42 : 1</strong></span>
                      <p className="bs-contrast-sample-text">The Great Indian Taste</p>
                      <span className="bs-contrast-subtext">Level AAA Compliant</span>
                    </div>
                  </div>
                  <p className="bs-visual-caption">Real-time RGB luminance computation against foreground and background text pixels.</p>
                </div>

                <div className="bs-visual-card glass-card">
                  <div className="bs-visual-header">
                    <span className="bs-visual-title">Official Brand Asset Verification</span>
                    <span className="bs-status-pill cyan">LOGO CONFIRMED</span>
                  </div>
                  <div className="bs-visual-preview-frame logo-frame">
                    <img src="/campacola-logo.png" alt="Campa Cola Mark" className="bs-sample-logo" />
                    <div className="bs-logo-match-meter">
                      <span>Wordmark Match: <strong>100%</strong></span>
                      <div className="bs-meter-bar"><div className="bs-meter-fill" style={{ width: '100%' }} /></div>
                    </div>
                  </div>
                  <p className="bs-visual-caption">Detects official brand wordmarks and flags unauthorized emblem variations.</p>
                </div>
              </div>
            </div>
          )}

          {activeSimulationTab === 'passport' && (
            <div className="bs-sim-content passport-tab">
              <div className="bs-passport-preview glass-card">
                <div className="bs-passport-top">
                  <div className="bs-passport-id">
                    <ShieldCheck size={22} className="text-emerald" />
                    <span>BRAND SHIELD RELEASE PASSPORT</span>
                  </div>
                  <span className="bs-passport-status">CRYPTOGRAPHICALLY VERIFIED</span>
                </div>
                <h4 className="bs-passport-title">Himalayan Solstice Autumn Launch</h4>
                <p className="bs-passport-meta">Snapshot SHA-256 Digest: <code>e4b3c29f8a12d3...48ab92e0</code></p>
                <div className="bs-passport-grid">
                  <div className="bs-passport-item">
                    <span>Approved By</span>
                    <strong>Senior Brand Reviewer</strong>
                  </div>
                  <div className="bs-passport-item">
                    <span>Audit Receipts</span>
                    <strong>Text + Vision Linked</strong>
                  </div>
                  <div className="bs-passport-item">
                    <span>Verification Endpoint</span>
                    <strong>Public URL Verifiable</strong>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Security & Architecture Pillars */}
      <section id="architecture" className="bs-architecture-section">
        <div className="bs-section-header">
          <div className="bs-section-tag">
            <Lock size={14} />
            <span>Architecture &amp; Trust</span>
          </div>
          <h2 className="bs-section-title">Built for Enterprise Security &amp; Speed</h2>
          <p className="bs-section-desc">
            Designed from the ground up for strict confidentiality, verifiable audit trails, and zero downtime.
          </p>
        </div>

        <div className="bs-arch-grid">
          <div className="bs-arch-card glass-card">
            <div className="bs-arch-icon cyan"><Shield size={24} /></div>
            <h3>Deterministic Gateways</h3>
            <p>Critical brand claims and terminology are verified deterministically through structured rulebook algorithms before AI semantic evaluation runs.</p>
          </div>

          <div className="bs-arch-card glass-card">
            <div className="bs-arch-icon sapphire"><Layers size={24} /></div>
            <h3>Revision Intelligence</h3>
            <p>Word-level text diffs and media asset comparisons let reviewers see exactly what changed between draft versions in seconds.</p>
          </div>

          <div className="bs-arch-card glass-card">
            <div className="bs-arch-icon emerald"><ShieldCheck size={24} /></div>
            <h3>Immutable Release Records</h3>
            <p>Every approved campaign receives a signed SHA-256 release passport containing tamper-evident proof of audit findings and human sign-off.</p>
          </div>

          <div className="bs-arch-card glass-card">
            <div className="bs-arch-icon violet"><BarChart3 size={24} /></div>
            <h3>Governance Intelligence</h3>
            <p>Managers track recurring rule violations, exception patterns, and team compliance trends to continuously refine the brand rulebook.</p>
          </div>
        </div>
      </section>

      {/* Call to Action Footer Strip */}
      <section className="bs-cta-banner">
        <div className="bs-cta-card glass-panel">
          <div className="bs-cta-content">
            <span className="bs-cta-tag">GET STARTED IMMEDIATELY</span>
            <h2>Ready to Protect Your Brand with AI?</h2>
            <p>Join world-class marketing and brand safety teams with deterministic preflight governance.</p>
          </div>
          <div className="bs-cta-buttons">
            <a href="#sandbox" className="btn-cyber-primary">
              <Sparkles size={18} />
              Launch Live Demo
            </a>
            <button
              type="button"
              className="btn-cyber-secondary"
              onClick={onNavigateLogin}
            >
              Sign In to Account
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bs-footer">
        <div className="bs-footer-inner">
          <div className="bs-footer-brand">
            <BrandShieldLogo variant="header" />
            <p className="bs-footer-tagline">
              Autonomous AI Brand Governance, Preflight Violation Detection &amp; Cryptographic Verification.
            </p>
          </div>

          <div className="bs-footer-links">
            <div className="bs-footer-col">
              <h4>Platform</h4>
              <a href="#sandbox">Live Demo Sandbox</a>
              <a href="#features">Text Preflight</a>
              <a href="#features">Pixel Contrast</a>
              <a href="#architecture">Release Passports</a>
            </div>

            <div className="bs-footer-col">
              <h4>Roles</h4>
              <button type="button" onClick={() => onDemoLogin('CREATOR')}>Creator Workspace</button>
              <button type="button" onClick={() => onDemoLogin('REVIEWER')}>Reviewer Gateway</button>
              <button type="button" onClick={() => onDemoLogin('MANAGER')}>Manager Dashboard</button>
            </div>

            <div className="bs-footer-col">
              <h4>Security</h4>
              <span>SHA-256 Verified</span>
              <span>WCAG 2.2 AAA</span>
              <span>Zero-Retention Audit</span>
            </div>
          </div>
        </div>

        <div className="bs-footer-bottom">
          <p>© {new Date().getFullYear()} Brand Shield AI. All rights reserved.</p>
          <div className="bs-footer-status">
            <span className="bs-pulse-dot" />
            <span>All Verification Systems Operational</span>
          </div>
        </div>
      </footer>
    </div>
  )
}
