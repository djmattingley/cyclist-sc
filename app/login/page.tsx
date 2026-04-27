'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'

type Step = 'email' | 'otp'

export default function LoginPage() {
  const router = useRouter()
  const [step, setStep]       = useState<Step>('email')
  const [email, setEmail]     = useState('')
  const [token, setToken]     = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError]     = useState<string | null>(null)

  async function sendOtp() {
    if (!email) return
    setLoading(true)
    setError(null)
    const supabase = createClient()
    const { error } = await supabase.auth.signInWithOtp({
      email,
      options: { shouldCreateUser: true },
    })
    if (error) setError(error.message)
    else setStep('otp')
    setLoading(false)
  }

  async function verifyOtp() {
    if (!token || token.length < 6) return
    setLoading(true)
    setError(null)
    const supabase = createClient()
    const { error } = await supabase.auth.verifyOtp({
      email,
      token,
      type: 'magiclink',
    })
    if (error) setError(error.message)
    else router.push('/')
    setLoading(false)
  }

  const inputStyle: React.CSSProperties = {
    width: '100%', background: 'oklch(0.16 0.010 255)', border: '1px solid oklch(0.28 0.01 255)',
    borderRadius: 10, padding: '12px 16px', color: 'var(--text)', fontSize: 15, outline: 'none',
    fontFamily: "'DM Sans',sans-serif",
  }

  const btnStyle = (active: boolean): React.CSSProperties => ({
    width: '100%', padding: '13px 0', borderRadius: 10, border: 'none', cursor: active ? 'pointer' : 'wait',
    background: active ? 'var(--accent)' : 'oklch(0.22 0.01 255)',
    color: active ? '#0d1a00' : 'var(--muted)',
    fontFamily: "'Barlow Condensed',sans-serif", fontWeight: 700, fontSize: 16, letterSpacing: '.08em',
    transition: 'all .2s', marginTop: 4,
  })

  return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '24px', background: 'var(--bg)' }}>
      <div style={{ width: '100%', maxWidth: 400 }}>

        <div style={{ marginBottom: 32, textAlign: 'center' }}>
          <span style={{
            fontFamily: "'Barlow Condensed',sans-serif", fontWeight: 800, fontSize: 10, letterSpacing: '.18em',
            color: 'var(--accent)', background: 'oklch(0.82 0.20 128/0.12)',
            padding: '2px 8px', borderRadius: 4, border: '1px solid oklch(0.82 0.20 128/0.3)',
          }}>CYCLIST S&C</span>
          <h1 style={{ fontFamily: "'Barlow Condensed',sans-serif", fontWeight: 800, fontSize: 32, letterSpacing: '.01em', marginTop: 8 }}>
            Sign in
          </h1>
          <p style={{ fontSize: 14, color: 'var(--muted)', marginTop: 8, lineHeight: 1.6 }}>
            {step === 'email'
              ? "Enter your email — we'll send you a 6-digit code."
              : `Enter the code we sent to ${email}`}
          </p>
        </div>

        <div style={{ display: 'grid', gap: 12 }}>
          {step === 'email' ? (
            <>
              <div>
                <label style={{ fontSize: 10, fontFamily: "'Barlow Condensed',sans-serif", fontWeight: 700, letterSpacing: '.12em', color: 'var(--muted)', display: 'block', marginBottom: 6 }}>
                  EMAIL ADDRESS
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  onKeyDown={e => e.key === 'Enter' && sendOtp()}
                  placeholder="your@email.com"
                  style={inputStyle}
                />
              </div>
              {error && <ErrorBox msg={error} />}
              <button onClick={sendOtp} disabled={loading || !email} style={btnStyle(!loading && !!email)}>
                {loading ? 'SENDING…' : 'SEND CODE →'}
              </button>
            </>
          ) : (
            <>
              <div>
                <label style={{ fontSize: 10, fontFamily: "'Barlow Condensed',sans-serif", fontWeight: 700, letterSpacing: '.12em', color: 'var(--muted)', display: 'block', marginBottom: 6 }}>
                  CODE
                </label>
                <input
                  type="text"
                  inputMode="numeric"
                  maxLength={8}
                  value={token}
                  onChange={e => setToken(e.target.value.replace(/\D/g, ''))}
                  onKeyDown={e => e.key === 'Enter' && verifyOtp()}
                  placeholder="12345678"
                  autoFocus
                  style={{ ...inputStyle, fontSize: 24, letterSpacing: '0.3em', textAlign: 'center', fontFamily: "'DM Mono',monospace" }}
                />
              </div>
              {error && <ErrorBox msg={error} />}
              <button onClick={verifyOtp} disabled={loading || token.length < 6} style={btnStyle(!loading && token.length >= 6)}>
                {loading ? 'VERIFYING…' : 'SIGN IN →'}
              </button>
              <button
                onClick={() => { setStep('email'); setToken(''); setError(null) }}
                style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--muted)', fontSize: 13, textDecoration: 'underline', padding: '4px 0' }}
              >
                Use a different email
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  )
}

function ErrorBox({ msg }: { msg: string }) {
  return (
    <div style={{ padding: '10px 14px', background: 'oklch(0.65 0.18 25/0.12)', borderRadius: 8, border: '1px solid oklch(0.65 0.18 25/0.4)', fontSize: 13, color: 'oklch(0.65 0.18 25)' }}>
      {msg}
    </div>
  )
}
