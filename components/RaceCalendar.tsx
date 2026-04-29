'use client'

import { useState } from 'react'
import { createClient } from '@/lib/supabase/client'

interface Props {
  userId: string
  initialRaceDate: string | null
}

interface PhaseZone {
  label: string
  minWeeks: number
  maxWeeks: number | null
  color: string
  bg: string
  s3Guidance: string
}

const PHASE_ZONES: PhaseZone[] = [
  {
    label: 'Base',
    minWeeks: 12, maxWeeks: null,
    color: 'oklch(0.82 0.20 128)', bg: 'oklch(0.82 0.20 128/0.10)',
    s3Guidance: 'High volume · strength development · technique focus · progressive overload. Full 35–45 min sessions.',
  },
  {
    label: 'Build',
    minWeeks: 8, maxWeeks: 11,
    color: 'oklch(0.78 0.16 60)', bg: 'oklch(0.78 0.16 60/0.10)',
    s3Guidance: 'Moderate volume · introduce power prep · avoid DOMS. 2 sets per movement, 35 min sessions.',
  },
  {
    label: 'Specialty',
    minWeeks: 4, maxWeeks: 7,
    color: 'oklch(0.72 0.18 200)', bg: 'oklch(0.72 0.18 200/0.10)',
    s3Guidance: 'Reduced volume · RFD / explosive intent · minimise fatigue. 1–2 sets, 30–35 min. Deload every 3rd week.',
  },
  {
    label: 'Race / Taper',
    minWeeks: 1, maxWeeks: 3,
    color: 'oklch(0.65 0.18 25)', bg: 'oklch(0.65 0.18 25/0.10)',
    s3Guidance: 'Freshness only · 1 set per movement · power/RFD only. Sessions must leave you feeling better, not fatigued.',
  },
  {
    label: 'Event Week',
    minWeeks: 0, maxWeeks: 0,
    color: 'oklch(0.70 0.15 290)', bg: 'oklch(0.70 0.15 290/0.10)',
    s3Guidance: 'Mobility and light activation only. Rest, sleep, and race-day prep.',
  },
]

// Timeline bar zones (left = far out, right = race day)
const TIMELINE_ZONES = [
  { label: 'BASE',       weeks: 12, color: 'oklch(0.82 0.20 128/0.65)' },
  { label: 'BUILD',      weeks: 4,  color: 'oklch(0.78 0.16 60/0.65)'  },
  { label: 'SPECIALTY',  weeks: 4,  color: 'oklch(0.72 0.18 200/0.65)' },
  { label: 'RACE',       weeks: 4,  color: 'oklch(0.65 0.18 25/0.65)'  },
]
const TIMELINE_TOTAL = TIMELINE_ZONES.reduce((s, z) => s + z.weeks, 0) // 24

function weeksUntil(dateStr: string): number {
  const now = new Date()
  now.setHours(0, 0, 0, 0)
  const race = new Date(dateStr + 'T00:00:00')
  return (race.getTime() - now.getTime()) / (7 * 24 * 60 * 60 * 1000)
}

function getZone(weeks: number): PhaseZone | null {
  if (weeks < 0)  return null
  if (weeks === 0) return PHASE_ZONES[4]
  for (const z of PHASE_ZONES) {
    if (weeks >= z.minWeeks && (z.maxWeeks === null || weeks <= z.maxWeeks)) return z
  }
  return PHASE_ZONES[0]
}

function formatDate(dateStr: string): string {
  return new Date(dateStr + 'T00:00:00').toLocaleDateString('en-GB', {
    weekday: 'long', day: 'numeric', month: 'long', year: 'numeric',
  })
}

function todayISO(): string {
  return new Date().toISOString().split('T')[0]
}

export default function RaceCalendar({ userId, initialRaceDate }: Props) {
  const supabase = createClient()
  const [raceDate, setRaceDate]   = useState<string | null>(initialRaceDate)
  const [saving, setSaving]       = useState(false)

  const weeks   = raceDate ? weeksUntil(raceDate) : null
  const weeksRounded = weeks !== null ? Math.floor(weeks) : null
  const zone    = weeks !== null ? getZone(weeks) : null
  const isPast  = weeks !== null && weeks < 0

  // Marker position on 24-week timeline bar (clamped 0–100%)
  const markerPct = weeks !== null
    ? Math.max(0, Math.min(100, ((TIMELINE_TOTAL - Math.min(weeks, TIMELINE_TOTAL)) / TIMELINE_TOTAL) * 100))
    : null

  async function handleDateChange(val: string | null) {
    setRaceDate(val)
    setSaving(true)
    await supabase.from('user_settings').upsert(
      { user_id: userId, race_date: val, updated_at: new Date().toISOString() },
      { onConflict: 'user_id' },
    )
    setSaving(false)
  }

  return (
    <div style={{ minHeight: '100vh', background: 'var(--background)', fontFamily: "'DM Sans',sans-serif" }}>

      {/* Header */}
      <header style={{
        borderBottom: '1px solid oklch(0.22 0.01 255)', padding: '16px 24px',
        position: 'sticky', top: 0, zIndex: 10,
        background: 'oklch(0.11 0.012 255/0.96)', backdropFilter: 'blur(12px)',
      }}>
        <div style={{ maxWidth: 700, margin: '0 auto', display: 'flex', alignItems: 'center', gap: 14 }}>
          <a href="/" style={{ color: 'var(--muted)', fontSize: 22, textDecoration: 'none', lineHeight: 1, flexShrink: 0 }}>←</a>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 10, fontFamily: "'Barlow Condensed',sans-serif", fontWeight: 700, letterSpacing: '.18em', color: 'var(--accent)' }}>CYCLIST S&amp;C</div>
            <div style={{ fontFamily: "'Barlow Condensed',sans-serif", fontWeight: 800, fontSize: 24, letterSpacing: '.01em', lineHeight: 1 }}>
              RACE CALENDAR
            </div>
          </div>
          {saving && (
            <span style={{ fontSize: 10, fontFamily: "'DM Mono',monospace", color: 'var(--muted)' }}>saving…</span>
          )}
        </div>
      </header>

      <main style={{ maxWidth: 700, margin: '0 auto', padding: '24px 24px 56px' }}>

        {/* Date picker */}
        <div style={{ marginBottom: 24 }}>
          <label style={{ fontSize: 10, fontFamily: "'Barlow Condensed',sans-serif", fontWeight: 700, letterSpacing: '.15em', color: 'var(--muted)', display: 'block', marginBottom: 8 }}>
            TARGET RACE DATE
          </label>
          <div style={{ display: 'flex', gap: 8 }}>
            <input
              type="date"
              value={raceDate ?? ''}
              min={todayISO()}
              onChange={e => handleDateChange(e.target.value || null)}
              style={{
                flex: 1, background: 'oklch(0.16 0.010 255)',
                border: `1px solid ${raceDate ? (zone?.color ?? 'oklch(0.28 0.01 255)') : 'oklch(0.28 0.01 255)'}`,
                borderRadius: 10, padding: '12px 14px',
                color: 'var(--text)', fontSize: 15,
                fontFamily: "'DM Sans',sans-serif", outline: 'none', colorScheme: 'dark',
              }}
            />
            {raceDate && (
              <button
                onClick={() => handleDateChange(null)}
                style={{
                  padding: '0 16px', borderRadius: 10, border: '1px solid oklch(0.26 0.01 255)',
                  background: 'oklch(0.16 0.010 255)', color: 'var(--muted)', cursor: 'pointer', fontSize: 12,
                  fontFamily: "'Barlow Condensed',sans-serif", fontWeight: 700, letterSpacing: '.06em',
                }}
              >
                CLEAR
              </button>
            )}
          </div>
        </div>

        {/* Empty state */}
        {!raceDate && (
          <div style={{ textAlign: 'center', padding: '48px 24px' }}>
            <div style={{ fontSize: 40, marginBottom: 14 }}>🗓</div>
            <div style={{ fontFamily: "'Barlow Condensed',sans-serif", fontWeight: 800, fontSize: 20, letterSpacing: '.05em', marginBottom: 8 }}>
              SET YOUR TARGET EVENT
            </div>
            <p style={{ fontSize: 13, color: 'var(--muted)', lineHeight: 1.65, maxWidth: 320, margin: '0 auto' }}>
              Pick your race date above to get S&C phase recommendations and a personalised training timeline.
            </p>
          </div>
        )}

        {/* Past event */}
        {raceDate && isPast && (
          <div style={{ padding: '24px', borderRadius: 14, background: 'oklch(0.70 0.15 290/0.08)', border: '1px solid oklch(0.70 0.15 290/0.3)', textAlign: 'center' }}>
            <div style={{ fontFamily: "'Barlow Condensed',sans-serif", fontWeight: 800, fontSize: 32, color: 'oklch(0.70 0.15 290)', marginBottom: 6 }}>
              POST-EVENT
            </div>
            <div style={{ fontSize: 13, color: 'var(--muted)' }}>{formatDate(raceDate)}</div>
            <div style={{ fontSize: 13, color: 'oklch(0.68 0.005 90)', marginTop: 10, lineHeight: 1.6 }}>
              Well done! Consider a Transition phase — mobility focus, minimal structure, 2–4 weeks before reassessing.
            </div>
          </div>
        )}

        {/* Active countdown */}
        {raceDate && !isPast && zone && (
          <>
            {/* Countdown card */}
            <div style={{ padding: '22px 24px', borderRadius: 14, background: zone.bg, border: `1px solid ${zone.color}55`, marginBottom: 14 }}>
              <div style={{ display: 'flex', alignItems: 'baseline', gap: 10, marginBottom: 4 }}>
                <span style={{ fontFamily: "'Barlow Condensed',sans-serif", fontWeight: 900, fontSize: 64, lineHeight: 1, color: zone.color }}>
                  {weeksRounded}
                </span>
                <span style={{ fontFamily: "'Barlow Condensed',sans-serif", fontWeight: 700, fontSize: 22, color: zone.color, opacity: 0.8 }}>
                  {weeksRounded === 1 ? 'WEEK' : 'WEEKS'} OUT
                </span>
              </div>
              <div style={{ fontSize: 12, color: 'var(--muted)', fontFamily: "'DM Mono',monospace" }}>{formatDate(raceDate)}</div>
            </div>

            {/* Phase recommendation */}
            <div style={{ padding: '18px 20px', borderRadius: 12, background: 'oklch(0.16 0.010 255)', border: '1px solid oklch(0.24 0.01 255)', marginBottom: 14 }}>
              <div style={{ fontSize: 10, fontFamily: "'Barlow Condensed',sans-serif", fontWeight: 700, letterSpacing: '.15em', color: 'var(--muted)', marginBottom: 10 }}>
                RECOMMENDED S&amp;C PHASE
              </div>
              <div style={{ fontFamily: "'Barlow Condensed',sans-serif", fontWeight: 900, fontSize: 34, letterSpacing: '.02em', color: zone.color, marginBottom: 10 }}>
                {zone.label.toUpperCase()}
              </div>
              <div style={{ fontSize: 13, color: 'oklch(0.78 0.005 90)', lineHeight: 1.65 }}>
                {zone.s3Guidance}
              </div>
            </div>

            {/* Phase timeline */}
            <div style={{ padding: '16px 18px', borderRadius: 12, background: 'oklch(0.16 0.010 255)', border: '1px solid oklch(0.24 0.01 255)', marginBottom: 14 }}>
              <div style={{ fontSize: 10, fontFamily: "'Barlow Condensed',sans-serif", fontWeight: 700, letterSpacing: '.15em', color: 'var(--muted)', marginBottom: 12 }}>
                PHASE TIMELINE
              </div>
              <div style={{ position: 'relative', borderRadius: 6, overflow: 'visible', marginBottom: 8 }}>
                {/* Bar */}
                <div style={{ display: 'flex', height: 28, borderRadius: 6, overflow: 'hidden' }}>
                  {TIMELINE_ZONES.map(z => (
                    <div
                      key={z.label}
                      style={{ flex: z.weeks, background: z.color, display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                    >
                      <span style={{ fontSize: 8, fontFamily: "'Barlow Condensed',sans-serif", fontWeight: 700, letterSpacing: '.08em', color: '#fff', opacity: 0.9 }}>
                        {z.label}
                      </span>
                    </div>
                  ))}
                </div>
                {/* Current position marker */}
                {markerPct !== null && (
                  <div style={{
                    position: 'absolute', top: -4, bottom: -4,
                    left: `calc(${markerPct}% - 1px)`,
                    width: 3, background: '#fff', borderRadius: 2,
                    boxShadow: '0 0 8px rgba(255,255,255,0.9)',
                  }} />
                )}
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 6 }}>
                <span style={{ fontSize: 9, fontFamily: "'DM Mono',monospace", color: 'oklch(0.38 0.01 255)' }}>24w out</span>
                <span style={{ fontSize: 9, fontFamily: "'DM Mono',monospace", color: 'oklch(0.38 0.01 255)' }}>RACE DAY →</span>
              </div>

              {/* Phase boundary legend */}
              <div style={{ display: 'flex', gap: 12, marginTop: 14, flexWrap: 'wrap' }}>
                {([
                  ['oklch(0.82 0.20 128)', '≥12w Base'],
                  ['oklch(0.78 0.16 60)',  '8–11w Build'],
                  ['oklch(0.72 0.18 200)', '4–7w Specialty'],
                  ['oklch(0.65 0.18 25)',  '1–3w Race'],
                ] as [string, string][]).map(([col, lbl]) => (
                  <div key={lbl} style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
                    <div style={{ width: 10, height: 10, borderRadius: 2, background: col }} />
                    <span style={{ fontSize: 10, fontFamily: "'DM Mono',monospace", color: 'oklch(0.45 0.01 255)' }}>{lbl}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Deload timing — future option 2 */}
            <div style={{ padding: '14px 18px', borderRadius: 12, background: 'oklch(0.14 0.010 255)', border: '1px dashed oklch(0.24 0.01 255)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 10, fontFamily: "'Barlow Condensed',sans-serif", fontWeight: 700, letterSpacing: '.15em', color: 'oklch(0.38 0.01 255)', marginBottom: 4 }}>
                    DELOAD TIMING
                  </div>
                  <div style={{ fontSize: 12, color: 'oklch(0.42 0.01 255)', lineHeight: 1.55 }}>
                    Auto-scheduling coming soon — will flag if any planned deload week clashes with your race build.
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
      </main>
    </div>
  )
}
