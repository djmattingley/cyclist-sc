'use client'

import { useState } from 'react'
import { useEnv } from './EnvCtx'
import { SC_EX, SC_GYM_SWAPS } from '@/lib/program-data'
import { SC_CAT_COLORS } from '@/lib/utils'
import CatTag from './CatTag'

interface Props {
  exKey: string
  sets: string | null
  reps: string
  note: string | null
}

export default function ExerciseCard({ exKey, sets, reps, note }: Props) {
  const [open, setOpen] = useState(false)
  const env = useEnv()
  const resolvedKey = env === 'gym' ? (SC_GYM_SWAPS[exKey] ?? exKey) : exKey
  const ex = SC_EX[resolvedKey] ?? SC_EX[exKey]
  if (!ex) return null
  const isSwapped = env === 'gym' && !!SC_GYM_SWAPS[exKey]
  const c = SC_CAT_COLORS[ex.cat] ?? SC_CAT_COLORS.core

  return (
    <div onClick={() => setOpen(o => !o)} style={{
      background: open ? 'oklch(0.19 0.012 255)' : 'oklch(0.165 0.010 255)',
      border: `1px solid ${open ? c.accent + '55' : 'oklch(0.24 0.01 255)'}`,
      borderRadius: 10, overflow: 'hidden', cursor: 'pointer',
      transition: 'border-color .2s,background .2s',
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '10px 14px' }}>
        <span style={{ color: c.accent, fontSize: 14, flexShrink: 0 }}>{ex.icon}</span>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: 8, flexWrap: 'wrap' }}>
            <span style={{ fontFamily: "'Barlow Condensed',sans-serif", fontWeight: 600, fontSize: 15 }}>{ex.name}</span>
            <CatTag cat={ex.cat} />
            {isSwapped && (
              <span style={{
                fontSize: 9, fontFamily: "'Barlow Condensed',sans-serif", fontWeight: 700, letterSpacing: '.12em',
                color: 'oklch(0.70 0.15 290)', background: 'oklch(0.70 0.15 290/0.12)',
                padding: '2px 6px', borderRadius: 3, border: '1px solid oklch(0.70 0.15 290/0.35)',
              }}>GYM</span>
            )}
          </div>
          {note && <div style={{ fontSize: 11, color: 'oklch(0.60 0.01 255)', marginTop: 2 }}>{note}</div>}
        </div>
        <span style={{
          fontFamily: "'DM Mono',monospace", fontSize: sets ? 13 : 12,
          color: sets ? c.accent : 'var(--muted)', fontWeight: 500, flexShrink: 0,
        }}>
          {sets ? `${sets} × ${reps}` : reps}
        </span>
        <span style={{ color: 'var(--muted)', fontSize: 12, marginLeft: 4, transform: open ? 'rotate(180deg)' : 'none', transition: 'transform .2s' }}>▾</span>
      </div>

      {open && (
        <div style={{ padding: '0 14px 14px', borderTop: '1px solid oklch(0.22 0.01 255)' }}>
          <div style={{ marginTop: 12, display: 'grid', gap: 10 }}>
            <div>
              <div style={{
                fontSize: 10, fontFamily: "'Barlow Condensed',sans-serif", fontWeight: 700,
                letterSpacing: '.12em', color: c.accent, marginBottom: 6,
              }}>COACHING CUES</div>
              {ex.cues.map((cue, i) => (
                <div key={i} style={{ display: 'flex', gap: 8, marginBottom: 5 }}>
                  <span style={{ color: c.accent, fontSize: 10, marginTop: 3, flexShrink: 0 }}>→</span>
                  <span style={{ fontSize: 13, color: 'oklch(0.80 0.005 90)', lineHeight: 1.5 }}>{cue}</span>
                </div>
              ))}
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
              {[['REGRESSION', ex.regression], ['PROGRESSION', ex.progression]].map(([lbl, txt]) => (
                <div key={lbl} style={{
                  background: 'oklch(0.14 0.01 255)', borderRadius: 8,
                  padding: '8px 10px', border: '1px solid oklch(0.22 0.01 255)',
                }}>
                  <div style={{ fontSize: 9, fontFamily: "'Barlow Condensed',sans-serif", fontWeight: 700, letterSpacing: '.12em', color: 'var(--muted)', marginBottom: 5 }}>{lbl}</div>
                  <div style={{ fontSize: 12, color: 'oklch(0.75 0.005 90)', lineHeight: 1.5 }}>{txt}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
