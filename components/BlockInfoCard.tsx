'use client'

import type { BlockData, CyclingPhase } from '@/lib/types'

interface Props {
  block: BlockData
  activeBlock: number
  cyclingPhase: CyclingPhase | null
}

export default function BlockInfoCard({ block, activeBlock, cyclingPhase }: Props) {
  const isPerf = activeBlock >= 3
  return (
    <div style={{ background: 'oklch(0.16 0.010 255)', borderRadius: 12, border: '1px solid oklch(0.24 0.01 255)', padding: '14px 18px', marginBottom: 16 }}>
      <div style={{ display: 'grid', gap: 10 }}>
        <div>
          <div style={{ fontSize: 10, fontFamily: "'Barlow Condensed',sans-serif", fontWeight: 700, letterSpacing: '.15em', color: 'var(--muted)', marginBottom: 5 }}>GOAL</div>
          <p style={{ fontSize: 13, color: 'oklch(0.78 0.005 90)', lineHeight: 1.65 }}>{block.goal}</p>
        </div>
        <div style={{ height: 1, background: 'oklch(0.22 0.01 255)' }} />
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap' }}>
          <span style={{
            fontSize: 10, fontFamily: "'Barlow Condensed',sans-serif", fontWeight: 700, letterSpacing: '.14em',
            color: isPerf ? 'oklch(0.72 0.18 200)' : 'oklch(0.78 0.16 60)',
            background: isPerf ? 'oklch(0.72 0.18 200/0.12)' : 'oklch(0.78 0.16 60/0.12)',
            padding: '3px 10px', borderRadius: 4,
            border: `1px solid ${isPerf ? 'oklch(0.72 0.18 200/0.35)' : 'oklch(0.78 0.16 60/0.35)'}`,
          }}>
            {isPerf ? 'PERFORMANCE MODE' : 'REBUILD MODE'}
          </span>
          {isPerf && cyclingPhase && (
            <span style={{
              fontSize: 10, fontFamily: "'Barlow Condensed',sans-serif", fontWeight: 700, letterSpacing: '.12em',
              color: 'oklch(0.72 0.18 200)', background: 'oklch(0.72 0.18 200/0.08)',
              padding: '3px 10px', borderRadius: 4, border: '1px solid oklch(0.72 0.18 200/0.25)',
            }}>
              {cyclingPhase.toUpperCase()} PHASE
            </span>
          )}
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
          {[
            ['SESSION', `${block.sessionDuration} · ${block.sessionsPerWeek}×/week`],
            ['STRUCTURE', block.structure],
            ['EQUIPMENT', block.equipment],
            ['SCHEDULING', block.scheduling],
          ].map(([lbl, val]) => (
            <div key={lbl}>
              <div style={{ fontSize: 9, fontFamily: "'Barlow Condensed',sans-serif", fontWeight: 700, letterSpacing: '.12em', color: 'var(--muted)', marginBottom: 4 }}>{lbl}</div>
              <div style={{ fontSize: 12, color: 'oklch(0.68 0.005 90)', lineHeight: 1.5 }}>{val}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
