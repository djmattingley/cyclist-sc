'use client'

import { useState } from 'react'
import { useEnv } from './EnvCtx'
import { SC_BLOCKS, SC_EX } from '@/lib/program-data'
import { SC_COLOR_MAP, sessionToText } from '@/lib/utils'
import type { BlockSectionData, FeedbackData, CyclingPhase } from '@/lib/types'

interface Props {
  blockId: number
  weekN: number
  sessionLabel: string | null
  blocks: BlockSectionData[]
  nextBlocks: BlockSectionData[] | null
  nextLabel: string | null
  saved: FeedbackData | null
  onSave: (data: FeedbackData | null) => void
  onClose: () => void
  escalationLevel: number
  cyclingPhase: CyclingPhase | null
}

const KEY_COLORS: Record<string, string> = {
  VERDICT: 'var(--accent)',
  CHANGES: 'oklch(0.78 0.16 60)',
  REASON: 'oklch(0.65 0.18 25)',
  'COACH NOTE': 'oklch(0.70 0.15 290)',
  SUMMARY: 'var(--accent)',
  READINESS: 'oklch(0.78 0.16 60)',
}

function renderResult(text: string) {
  const sections: { label: string | null; lines: string[] }[] = []
  let cur: string | null = null
  let buf: string[] = []

  const flush = () => {
    if (cur !== null || buf.length) { sections.push({ label: cur, lines: [...buf] }); buf = []; cur = null }
  }

  for (const line of text.split('\n').filter(l => l.trim())) {
    const ci = line.indexOf(':')
    const key = ci > 0 ? line.slice(0, ci).trim().toUpperCase() : null
    if (key && KEY_COLORS[key]) { flush(); cur = key; const rest = line.slice(ci + 1).trim(); if (rest) buf.push(rest) }
    else buf.push(line)
  }
  flush()

  return sections.map((sec, i) => {
    const col = sec.label ? (KEY_COLORS[sec.label] ?? 'var(--muted)') : 'var(--muted)'
    return (
      <div key={i} style={{ marginBottom: 12 }}>
        {sec.label && (
          <div style={{ fontSize: 9, fontFamily: "'Barlow Condensed',sans-serif", fontWeight: 700, letterSpacing: '.14em', color: col, marginBottom: 6 }}>
            {sec.label}
          </div>
        )}
        {sec.lines.map((line, j) => {
          const isBullet = line.startsWith('-') || line.startsWith('•')
          const txt = isBullet ? line.replace(/^[-•]\s*/, '') : line
          return isBullet
            ? <div key={j} style={{ display: 'flex', gap: 8, marginBottom: 4 }}>
                <span style={{ color: col, fontSize: 10, marginTop: 3, flexShrink: 0 }}>→</span>
                <span style={{ fontSize: 13, color: 'oklch(0.82 0.005 90)', lineHeight: 1.6 }}>{txt}</span>
              </div>
            : <p key={j} style={{ fontSize: 13, color: 'oklch(0.82 0.005 90)', lineHeight: 1.6, marginBottom: 4 }}>{line}</p>
        })}
      </div>
    )
  })
}

export default function FeedbackPanel({
  blockId, weekN, sessionLabel, blocks, nextBlocks, nextLabel,
  saved, onSave, onClose, escalationLevel, cyclingPhase,
}: Props) {
  const env = useEnv()
  const [time, setTime]     = useState(saved?.time ?? '')
  const [soreness, setSore] = useState(saved?.soreness ?? '')
  const [ride, setRide]     = useState(saved?.ride ?? '')
  const [rpe, setRpe]       = useState(saved?.rpe ?? 5)
  const [loading, setLoad]  = useState(false)
  const [result, setResult] = useState<string | null>(saved?.result ?? null)

  const blockData = SC_BLOCKS.find(b => b.id === blockId)
  const blockWeek = SC_BLOCKS[blockId - 1]?.weeks.find(w => w.n === weekN)
  const c = SC_COLOR_MAP[blockWeek?.color ?? 'accent'] ?? SC_COLOR_MAP.accent

  const inpStyle: React.CSSProperties = {
    width: '100%', background: 'oklch(0.13 0.01 255)', border: '1px solid oklch(0.26 0.01 255)',
    borderRadius: 8, padding: '9px 12px', color: 'var(--text)', fontSize: 13, outline: 'none', lineHeight: 1.5,
    fontFamily: "'DM Sans',sans-serif",
  }

  const handleSubmit = async () => {
    if (!time && !soreness && !ride) return
    setLoad(true)
    const sessionStr = sessionToText(blocks, SC_EX)
    const nextStr = nextBlocks ? sessionToText(nextBlocks, SC_EX) : null
    const escalMsg = escalationLevel >= 2 ? `\n⚠ ESCALATION: ${escalationLevel} consecutive high-fatigue weeks reported.` : ''
    const plannedRpe = 'rpe' in (blockWeek ?? {}) ? (blockWeek as { rpe: string }).rpe : '?'

    const prompt = `Athlete completed Block ${blockId} Week ${weekN}${sessionLabel ? ' — ' + sessionLabel : ''}.
Block: ${blockData?.label} (${blockData?.subtitle}). Environment: ${env === 'gym' ? 'Gym' : 'Home'}. Cycling Phase: ${cyclingPhase ?? 'Rebuild Mode'}.${escalMsg}

COMPLETED SESSION:
${sessionStr}

ATHLETE FEEDBACK:
- Time taken: ${time || 'not reported'}
- Soreness: ${soreness || 'not reported'}
- Ride impact: ${ride || 'not reported'}
- Perceived effort: RPE ${rpe}/10 (planned: RPE ${plannedRpe})

${!nextBlocks
  ? `This was the final week of Block ${blockId}. Summarise block readiness and give one note for Block ${blockId + 1}.`
  : `PLANNED NEXT SESSION (${nextLabel ?? ''}):\n${nextStr}\n\nShould this session proceed as planned or be adjusted?`}`

    try {
      const resp = await fetch('/api/coach', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: [{ role: 'user', content: prompt }] }),
      })
      const data = await resp.json()
      const text: string = data.text ?? data.error ?? 'No response from coach.'
      const outcome: FeedbackData = { time, soreness, ride, rpe, result: text, ts: Date.now() }
      onSave(outcome)
      setResult(text)
    } catch {
      setResult('Error reaching coach — please try again.')
    }
    setLoad(false)
  }

  return (
    <div style={{
      borderTop: '1px solid oklch(0.22 0.01 255)', padding: '18px 20px',
      background: 'linear-gradient(180deg,oklch(0.155 0.012 255),oklch(0.145 0.010 255))',
    }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 }}>
        <div>
          <div style={{ fontFamily: "'Barlow Condensed',sans-serif", fontWeight: 700, fontSize: 16, letterSpacing: '.06em', color: c.pill }}>
            LOG SESSION FEEDBACK
          </div>
          <div style={{ fontSize: 12, color: 'var(--muted)', marginTop: 2 }}>
            {result ? 'Coaching response saved' : 'Your response will adapt the next session'}
          </div>
        </div>
        <button onClick={onClose} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--muted)', fontSize: 18, padding: 4, lineHeight: 1 }}>✕</button>
      </div>

      {escalationLevel >= 2 && !result && (
        <div style={{ marginBottom: 14, padding: '10px 12px', background: 'oklch(0.65 0.18 25/0.12)', borderRadius: 8, border: '1px solid oklch(0.65 0.18 25/0.4)' }}>
          <div style={{ fontSize: 10, fontFamily: "'Barlow Condensed',sans-serif", fontWeight: 700, letterSpacing: '.12em', color: 'oklch(0.65 0.18 25)', marginBottom: 4 }}>
            ⚠ {escalationLevel >= 3 ? 'THIRD' : 'SECOND'} CONSECUTIVE HIGH-FATIGUE WEEK
          </div>
          <div style={{ fontSize: 12, color: 'oklch(0.75 0.005 90)', lineHeight: 1.5 }}>
            {escalationLevel >= 3
              ? "Coach will recommend dropping back to the previous block's Build week."
              : 'Coach will recommend an unplanned deload regardless of block position.'}
          </div>
        </div>
      )}

      {!result ? (
        <div style={{ display: 'grid', gap: 12 }}>
          {([
            ['TIME TAKEN', 'e.g. 20 minutes, ran 2 min over…', time, setTime],
            ['SORENESS', 'e.g. mild glutes, none in quads…', soreness, setSore],
            ['RIDE IMPACT', 'e.g. next-day intervals felt fine, legs heavy…', ride, setRide],
          ] as [string, string, string, (v: string) => void][]).map(([lbl, ph, val, set]) => (
            <div key={lbl}>
              <label style={{ fontSize: 10, fontFamily: "'Barlow Condensed',sans-serif", fontWeight: 700, letterSpacing: '.12em', color: 'var(--muted)', display: 'block', marginBottom: 6 }}>{lbl}</label>
              <input value={val} onChange={e => set(e.target.value)} placeholder={ph} style={inpStyle} />
            </div>
          ))}
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
              <label style={{ fontSize: 10, fontFamily: "'Barlow Condensed',sans-serif", fontWeight: 700, letterSpacing: '.12em', color: 'var(--muted)' }}>PERCEIVED EFFORT</label>
              <span style={{ fontFamily: "'DM Mono',monospace", fontSize: 13, color: c.pill, fontWeight: 500 }}>RPE {rpe}</span>
            </div>
            <input type="range" min={1} max={10} step={1} value={rpe} onChange={e => setRpe(Number(e.target.value))} style={{ width: '100%', accentColor: 'var(--accent)' }} />
            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 4 }}>
              <span style={{ fontSize: 10, color: 'var(--muted)', fontFamily: "'DM Mono',monospace" }}>1 easy</span>
              <span style={{ fontSize: 10, color: 'var(--muted)', fontFamily: "'DM Mono',monospace" }}>10 max</span>
            </div>
          </div>
          <button
            onClick={handleSubmit}
            disabled={loading || (!time && !soreness && !ride)}
            style={{
              marginTop: 4, padding: '12px 0', borderRadius: 10, border: 'none', cursor: 'pointer',
              background: (!time && !soreness && !ride) ? 'oklch(0.20 0.01 255)' : c.pill,
              color: (!time && !soreness && !ride) ? 'var(--muted)' : c.text,
              fontFamily: "'Barlow Condensed',sans-serif", fontWeight: 700, fontSize: 15, letterSpacing: '.08em',
              display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10, transition: 'all .2s',
            }}
          >
            {loading ? (
              <>
                <span style={{ width: 16, height: 16, border: '2px solid oklch(0.30 0.01 255)', borderTopColor: 'var(--accent)', borderRadius: '50%', animation: 'spin .7s linear infinite', display: 'inline-block' }} />
                ANALYSING…
              </>
            ) : 'GET COACH ADAPTATION →'}
          </button>
        </div>
      ) : (
        <div>
          <div style={{
            background: 'oklch(0.13 0.012 255)', borderRadius: 10,
            border: `1px solid ${c.border}`, padding: 16, marginBottom: 14, boxShadow: `0 0 24px ${c.glow}`,
          }}>
            <div style={{ fontSize: 10, fontFamily: "'Barlow Condensed',sans-serif", fontWeight: 700, letterSpacing: '.14em', color: c.pill, marginBottom: 14 }}>
              COACH RESPONSE
            </div>
            {renderResult(result)}
          </div>
          <button
            onClick={() => { setResult(null); onSave(null) }}
            style={{ background: 'none', border: '1px solid oklch(0.26 0.01 255)', borderRadius: 8, padding: '8px 16px', color: 'var(--muted)', cursor: 'pointer', fontSize: 12 }}
          >
            ← Log again
          </button>
        </div>
      )}
    </div>
  )
}
