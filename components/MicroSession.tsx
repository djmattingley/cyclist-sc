'use client'

import { useState } from 'react'
import { bc } from '@/lib/utils'
import type { ExerciseLogs, MicroOption, SetLog } from '@/lib/types'
import ExerciseCard from './ExerciseCard'

interface Props {
  options: MicroOption[]
  note: string
  blockId: number
  weekN: number
  exerciseLogs: Record<string, ExerciseLogs>
  onSaveExerciseLog: (sessionKey: string, exKey: string, sets: SetLog[]) => void
}

export default function MicroSession({ options, note, blockId, weekN, exerciseLogs, onSaveExerciseLog }: Props) {
  const [sel, setSel] = useState(0)
  const opt = options[sel]
  const microKey = bc(blockId, weekN, '-micro')
  const sessionLogs = exerciseLogs[microKey] ?? {}

  return (
    <div style={{ borderTop: '1px solid oklch(0.20 0.01 255)', padding: '14px 20px 20px' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12 }}>
        <div style={{ width: 3, height: 16, borderRadius: 2, background: 'oklch(0.70 0.15 290)' }} />
        <div style={{ fontFamily: "'Barlow Condensed',sans-serif", fontWeight: 700, fontSize: 13, letterSpacing: '.10em', color: 'oklch(0.70 0.15 290)' }}>
          MICRO-SESSION (5–10 MIN)
        </div>
      </div>
      <div style={{ fontSize: 12, color: 'oklch(0.55 0.01 255)', marginBottom: 12, lineHeight: 1.55 }}>{note}</div>
      <div style={{ display: 'flex', gap: 6, marginBottom: 12 }}>
        {options.map((o, i) => (
          <button key={i} onClick={() => setSel(i)} style={{
            padding: '5px 12px', borderRadius: 7, cursor: 'pointer',
            background: sel === i ? 'oklch(0.70 0.15 290/0.15)' : 'oklch(0.18 0.01 255)',
            color: sel === i ? 'oklch(0.70 0.15 290)' : 'var(--muted)',
            fontFamily: "'Barlow Condensed',sans-serif", fontWeight: 700, fontSize: 12, letterSpacing: '.06em',
            border: `1px solid ${sel === i ? 'oklch(0.70 0.15 290/0.4)' : 'oklch(0.24 0.01 255)'}`,
            transition: 'all .15s',
          }}>
            {o.label}
          </button>
        ))}
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
        {opt.exercises.map((e) => (
          <ExerciseCard
            key={e.ex}
            exKey={e.ex}
            sets={e.sets}
            reps={e.reps}
            note={e.note}
            loggedSets={sessionLogs[e.ex]}
            onLogSets={(sets) => onSaveExerciseLog(microKey, e.ex, sets)}
          />
        ))}
      </div>
    </div>
  )
}
