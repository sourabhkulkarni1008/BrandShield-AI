import { Component, StrictMode, type ErrorInfo, type ReactNode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './index.css'
import App from './App.tsx'
import ReleasePassportVerificationPage from './ReleasePassportVerificationPage'

class ErrorBoundary extends Component<{ children: ReactNode }, { hasError: boolean; error: Error | null }> {
  constructor(props: { children: ReactNode }) {
    super(props)
    this.state = { hasError: false, error: null }
  }

  static getDerivedStateFromError(error: Error) {
    return { hasError: true, error }
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Unhandled UI exception:', error, errorInfo)
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: '#0a0e17',
          color: '#e2e8f0',
          fontFamily: 'Inter, system-ui, sans-serif',
          padding: '2rem',
        }}>
          <div style={{
            maxWidth: '520px',
            background: '#131b2e',
            border: '1px solid rgba(239, 68, 68, 0.4)',
            borderRadius: '12px',
            padding: '2rem',
            textAlign: 'center',
            boxShadow: '0 10px 25px rgba(0,0,0,0.5)',
          }}>
            <div style={{
              width: '48px',
              height: '48px',
              borderRadius: '50%',
              background: 'rgba(239, 68, 68, 0.15)',
              color: '#ef4444',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 1rem',
              fontSize: '24px',
              fontWeight: 'bold',
            }}>!</div>
            <h2 style={{ fontSize: '1.25rem', marginBottom: '0.5rem', color: '#f8fafc' }}>Review Dashboard Notice</h2>
            <p style={{ color: '#94a3b8', fontSize: '0.9rem', marginBottom: '1.5rem', lineHeight: '1.5' }}>
              The review queue encountered a state transition glitch. Your session and drafts are preserved.
            </p>
            <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
              <button
                type="button"
                onClick={() => { window.location.href = '/' }}
                style={{
                  padding: '0.6rem 1.2rem',
                  borderRadius: '6px',
                  border: '1px solid #334155',
                  background: 'transparent',
                  color: '#e2e8f0',
                  cursor: 'pointer',
                  fontWeight: 500,
                }}
              >
                Return to Dashboard
              </button>
              <button
                type="button"
                onClick={() => { window.location.reload() }}
                style={{
                  padding: '0.6rem 1.2rem',
                  borderRadius: '6px',
                  border: 'none',
                  background: '#2563eb',
                  color: '#ffffff',
                  cursor: 'pointer',
                  fontWeight: 600,
                }}
              >
                Reload View
              </button>
            </div>
          </div>
        </div>
      )
    }
    return this.props.children
  }
}

const API_BASE_URL =
  (import.meta.env.VITE_API_URL as string | undefined)?.trim().replace(/\/+$/, '') ||
  (import.meta.env.PROD ? 'https://brandshield-ai-ipfn.onrender.com' : 'http://localhost:3000')

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ErrorBoundary>
      <BrowserRouter>
        <Routes>
          <Route path="/passport/:passportId" element={<ReleasePassportVerificationPage apiBaseUrl={API_BASE_URL} />} />
          <Route path="/" element={<App />}>
            <Route index element={<span hidden aria-hidden="true" />} />
            <Route path="login" element={<span hidden aria-hidden="true" />} />
            <Route path="audit/text" element={<span hidden aria-hidden="true" />} />
            <Route path="audit/image" element={<span hidden aria-hidden="true" />} />
            <Route path="rulebook" element={<span hidden aria-hidden="true" />} />
            <Route path="submissions" element={<span hidden aria-hidden="true" />} />
            <Route path="submissions/:submissionId/edit" element={<span hidden aria-hidden="true" />} />
            <Route path="review" element={<span hidden aria-hidden="true" />} />
            <Route path="*" element={<span hidden aria-hidden="true" />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </ErrorBoundary>
  </StrictMode>,
)
