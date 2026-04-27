'use client'

import { SC_COLOR_MAP, bc } from '@/lib/utils'
import type { BlockData } from '@/lib/types'

interface Props {
  block: BlockData
  completed: Record<string, boolean>
  missed: Record<string, boolean>
  onToggle: (key: string) => void
}

export default function WeekStrip({ block, completed, missed, onToggle }: Props) {
  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 8, marginBottom: 16 }}>
      {block.weeks.map((w, i) => {
        const c = SC_COLOR_MAP[w.color]
        const done = completed[bc(block.id, w.n)]
        const miss = missed[bc(block.id, w.n)]
        return (
          <div key={i} onClick={() => onToggle(bc(block.id, w.n))} style={{
            background: done ? c.pill : 'oklch(0.16 0.01 255)',
            borderRadius: 10, padding: '10px 12px',
            border: `1px solid ${done ? c.pill : 'oklch(0.24 0.01 255)'}`,
            cursor: 'pointer', transition: 'all .2s',
          }}>
            <div style={{ fontFamily: "'Barlow Condensed',sans-serif", fontWeight: 800, fontSize: 14, color: done ? c.text : c.pill }}>W{w.n}</div>
            <div style={{ fontFamily: "'Barlow Condensed',sans-serif", fontWeight: 600, fontSize: 10, letterSpacing: '.08em', color: done ? c.text + 'cc' : 'var(--muted)' }}>
              {w.theme.toUpperCase()}
            </div>
            <div style={{ fontSize: 9, fontFamily: "'DM Mono',monospace", marginTop: 2, color: done ? c.text + '99' : 'oklch(0.38 0.01 255)' }}>
              {miss ? '⚠ missed' : done ? '✓ done' : 'tap to mark'}
            </div>
          </div>
        )
      })}
    </div>
  )
}
