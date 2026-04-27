'use client'

import { useState } from 'react'
import { useEnv } from './EnvCtx'
import { SC_EX, SC_GYM_SWAPS } from '@/lib/program-data'
import { SC_CAT_COLORS } from '@/lib/utils'
import type { SetLog } from '@/lib/types'
import CatTag from './CatTag'

interface Props {
  exKey: string
  sets: string | null
  reps: string
  note: string | null
  loggedSets?: SetLog[]
  onLogSets?: (sets: SetLog[]) => void
}

function parseSetCount(sets: string | null): number {
  if (!sets) return 0
  const nums = sets.match(/\d+/g)
  return nums ? Math.max(...nums.map(Number)) : 0
}

function parseReps(reps: string): number {
  const m = reps.match(/\d+/)
  return m ? parseInt(m[0]) : 0
}

const INPUT_STYLE: React.CSSProperties = {
  background: 'oklch(0.13 0.010 255)',
  border: '1px solid oklch(0.26 0.01 255)',
  borderRadius: 6,
  color: 'var(--text)',
  fontSize: 14,
  fontFamily: "'DM Mono',monospace",
  textAlign: 'center',
  outline: 'none',
  padding: '5px 4px',
  width: 54,
  WebkitAppearance: 'none',
  MozAppearance: 'textfield',
}

export default function ExerciseCard({ exKey, sets, reps, note, loggedSets, onLogSets }: Props) {
  const [open, setOpen] = useState(false)
  const env = useEnv()
  const resolvedKey = env === 'gym' ? (SC_GYM_SWAPS[exKey] ?? exKey) : exKey
  const ex = SC_EX[resolvedKey] ?? SC_EX[exKey]
  if (!ex) return null

  const isSwapped = env === 'gym' && !!SC_GYM_SWAPS[exKey]
  const c = SC_CAT_COLORS[ex.cat] ?? SC_CAT_COLORS.core
  const setCount = parseSetCount(sets)
  const prescribedReps = parseReps(reps)
  const showLog = setCount > 0 && ex.cat !== 'mobility'
  const showKg = ex.cat === 'lower' || ex.cat === 'upper'

  const [localSets, setLocalSets] = useState<SetLog[]>(() => {
    if (loggedSets && loggedSets.length > 0) return loggedSets
    return Array.from({ length: setCount }, () => ({ kg: null, reps: prescribedReps }))
  })

  function handleField(i: number, field: 'kg' | 'reps', val: string) {
    setLocalSets(prev => {
      const next = [...prev]
      next[i] = { ...next[i], [field]: val === '' ? (field === 'kg' ? null : 0) : Number(val) }
      return next
    })
  }

  function handleBlur() {
    onLogSets?.(localSets)
  }

  const loggedCount = localSets.filter(s => s.reps > 0 && (showKg ? s.kg !== null : true)).length

  return (
    <div onClick={() => setOpen(o => !o)} style={{
      background: open ? 'oklch(0.19 0.012 255)' : 'oklch(0.165 0.010 255)',
      border: `1px solid ${open ? c.accent + '55' : 'oklch(0.24 0.01 255)'}`,
      borderRadius: 10, overflow: 'hidden', cursor: 'pointer',
      transition: 'border-color .2s,background .2s',
    }}>
      {/* Header row */}
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
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexShrink: 0 }}>
          {showLog && loggedCount > 0 && (
            <span style={{ fontFamily: "'DM Mono',monospace", fontSize: 10, color: c.accent }}>
              {loggedCount}/{setCount}
            </span>
          )}
          <span style={{ fontFamily: "'DM Mono',monospace", fontSize: sets ? 13 : 12, color: sets ? c.accent : 'var(--muted)', fontWeight: 500 }}>
            {sets ? `${sets} × ${reps}` : reps}
          </span>
          <span style={{ color: 'var(--muted)', fontSize: 12, transform: open ? 'rotate(180deg)' : 'none', transition: 'transform .2s' }}>▾</span>
        </div>
      </div>

      {open && (
        <div style={{ padding: '0 14px 14px', borderTop: '1px solid oklch(0.22 0.01 255)' }}>

          {/* Set logging */}
          {showLog && (
            <div style={{ marginTop: 12, marginBottom: 14 }} onClick={e => e.stopPropagation()}>
              <div style={{ fontSize: 10, fontFamily: "'Barlow Condensed',sans-serif", fontWeight: 700, letterSpacing: '.12em', color: c.accent, marginBottom: 8 }}>
                LOG SETS
              </div>
              {localSets.map((s, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 7 }}>
                  <span style={{ fontSize: 11, color: 'var(--muted)', width: 38, fontFamily: "'DM Mono',monospace", flexShrink: 0 }}>
                    SET {i + 1}
                  </span>
                  {showKg && (
                    <>
                      <input
                        type="number"
                        inputMode="decimal"
                        placeholder="—"
                        min={0}
                        value={s.kg ?? ''}
                        onChange={e => handleField(i, 'kg', e.target.value)}
                        onBlur={handleBlur}
                        style={INPUT_STYLE}
                      />
                      <span style={{ fontSize: 11, color: 'var(--muted)', flexShrink: 0 }}>kg</span>
                    </>
                  )}
                  <input
                    type="number"
                    inputMode="numeric"
                    min={0}
                    value={s.reps || ''}
                    onChange={e => handleField(i, 'reps', e.target.value)}
                    onBlur={handleBlur}
                    style={INPUT_STYLE}
                  />
                  <span style={{ fontSize: 11, color: 'var(--muted)', flexShrink: 0 }}>reps</span>
                  {(showKg ? s.kg !== null && s.reps > 0 : s.reps > 0) && (
                    <span style={{ color: c.accent, fontSize: 13, marginLeft: 2 }}>✓</span>
                  )}
                </div>
              ))}
            </div>
          )}

          {/* Coaching cues */}
          <div style={{ marginTop: showLog ? 0 : 12, display: 'grid', gap: 10 }}>
            <div>
              <div style={{ fontSize: 10, fontFamily: "'Barlow Condensed',sans-serif", fontWeight: 700, letterSpacing: '.12em', color: c.accent, marginBottom: 6 }}>
                COACHING CUES
              </div>
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
