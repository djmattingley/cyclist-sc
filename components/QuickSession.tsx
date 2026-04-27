'use client'

import type { BlockSectionData } from '@/lib/types'
import BlockSection from './BlockSection'

export default function QuickSession({ blocks }: { blocks: BlockSectionData[] }) {
  const trimmed = blocks
    .filter(b => b.cat !== 'upper')
    .map(b => {
      if (b.cat === 'core') return { ...b, exercises: b.exercises.map(e => ({ ...e, sets: '1' })) }
      if (b.cat === 'lower') {
        const exs = [...b.exercises]
        exs.pop()
        return { ...b, exercises: exs }
      }
      return b
    })
  const mins = trimmed.reduce((acc, b) => acc + parseInt(b.dur), 0)

  return (
    <div style={{ padding: '0 20px 16px' }}>
      <div style={{
        display: 'flex', alignItems: 'center', gap: 8, marginBottom: 14,
        padding: '8px 12px', background: 'oklch(0.78 0.16 60/0.08)', borderRadius: 8,
        border: '1px solid oklch(0.78 0.16 60/0.3)',
      }}>
        <span style={{ color: 'oklch(0.78 0.16 60)', fontSize: 14 }}>⚡</span>
        <div>
          <div style={{ fontFamily: "'Barlow Condensed',sans-serif", fontWeight: 700, fontSize: 13, letterSpacing: '.08em', color: 'oklch(0.78 0.16 60)' }}>
            QUICK SESSION — ~{mins} MIN
          </div>
          <div style={{ fontSize: 11, color: 'oklch(0.60 0.01 255)', marginTop: 1 }}>
            Upper removed · Core 1 set each · Last lower exercise dropped
          </div>
        </div>
      </div>
      {trimmed.map((b, i) => <BlockSection key={i} block={b} />)}
    </div>
  )
}
