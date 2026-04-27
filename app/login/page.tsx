'use client'

import { useState } from 'react'
import { createClient } from '@/lib/supabase/client'

export default function LoginPage() {
  const [email, setEmail]     = useState('')
  const [sent, setSent]       = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError]     = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email) return
    setLoading(true)
    setError(null)
    const supabase = createClient()
    const { error } = await supabase.auth.signInWithOtp({
      email,
      options: { emailRedirectTo: `${window.location.origin}/auth/callback` },
    })
    if (error) setError(error.message)
    else setSent(true)
    setLoading(false)
  }

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
            Enter your email — we&apos;ll send you a magic link.
          </p>
        </div>

        {!sent ? (
          <form onSubmit={handleSubmit} style={{ display: 'grid', gap: 12 }}>
            <div>
              <label style={{ fontSize: 10, fontFamily: "'Barlow Condensed',sans-serif", fontWeight: 700, letterSpacing: '.12em', color: 'var(--muted)', display: 'block', marginBottom: 6 }}>
                EMAIL ADDRESS
              </label>
              <input
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="your@email.com"
                required
                style={{
                  width: '100%', background: 'oklch(0.16 0.010 255)', border: '1px solid oklch(0.28 0.01 255)',
                  borderRadius: 10, padding: '12px 16px', color: 'var(--text)', fontSize: 15, outline: 'none',
                  fontFamily: "'DM Sans',sans-serif",
                }}
              />
            </div>
            {error && (
              <div style={{ padding: '10px 14px', background: 'oklch(0.65 0.18 25/0.12)', borderRadius: 8, border: '1px solid oklch(0.65 0.18 25/0.4)', fontSize: 13, color: 'oklch(0.65 0.18 25)' }}>
                {error}
              </div>
            )}
            <button
              type="submit"
              disabled={loading || !email}
              style={{
                padding: '13px 0', borderRadius: 10, border: 'none', cursor: loading ? 'wait' : 'pointer',
                background: (!email || loading) ? 'oklch(0.22 0.01 255)' : 'var(--accent)',
                color: (!email || loading) ? 'var(--muted)' : '#0d1a00',
                fontFamily: "'Barlow Condensed',sans-serif", fontWeight: 700, fontSize: 16, letterSpacing: '.08em',
                transition: 'all .2s', marginTop: 4,
              }}
            >
              {loading ? 'SENDING…' : 'SEND MAGIC LINK →'}
            </button>
          </form>
        ) : (
          <div style={{ textAlign: 'center', padding: '24px', background: 'oklch(0.82 0.20 128/0.08)', borderRadius: 12, border: '1px solid oklch(0.82 0.20 128/0.3)' }}>
            <div style={{ fontSize: 24, marginBottom: 12 }}>✉</div>
            <div style={{ fontFamily: "'Barlow Condensed',sans-serif", fontWeight: 700, fontSize: 18, color: 'var(--accent)', marginBottom: 8 }}>CHECK YOUR EMAIL</div>
            <p style={{ fontSize: 14, color: 'oklch(0.75 0.005 90)', lineHeight: 1.6 }}>
              We sent a link to <strong>{email}</strong>. Click it to sign in.
            </p>
            <button onClick={() => setSent(false)} style={{ marginTop: 16, background: 'none', border: 'none', cursor: 'pointer', color: 'var(--muted)', fontSize: 13, textDecoration: 'underline' }}>
              Use a different email
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
