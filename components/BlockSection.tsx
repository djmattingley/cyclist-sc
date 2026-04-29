'use client'

import { SC_CAT_COLORS } from '@/lib/utils'
import type { BlockSectionData, ExerciseLogs, SetLog } from '@/lib/types'
import ExerciseCard from './ExerciseCard'

interface Props {
  block: BlockSectionData
  sessionKey?: string
  sessionLogs?: ExerciseLogs
  onLogSets?: (sessionKey: string, exKey: string, sets: SetLog[]) => void
}

export default function BlockSection({ block, sessionKey, sessionLogs, onLogSets }: Props) {
  const c = SC_CAT_COLORS[block.cat] ?? SC_CAT_COLORS.core
  return (
    <div style={{ marginBottom: 16 }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 10 }}>
        <div style={{ width: 3, height: 18, borderRadius: 2, background: c.accent }} />
        <div style={{ fontFamily: "'Barlow Condensed',sans-serif", fontWeight: 700, fontSize: 14, letterSpacing: '.10em', color: c.accent }}>
          {block.name.toUpperCase()}
        </div>
        <div style={{ fontFamily: "'DM Mono',monospace", fontSize: 11, color: 'var(--muted)' }}>{block.dur}</div>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
        {block.exercises.map((e) => (
          <ExerciseCard
            key={e.ex}
            exKey={e.ex}
            sets={e.sets}
            reps={e.reps}
            note={e.note}
            loggedSets={sessionLogs?.[e.ex]}
            onLogSets={sessionKey && onLogSets ? (sets) => onLogSets(sessionKey, e.ex, sets) : undefined}
          />
        ))}
      </div>
    </div>
  )
}
