'use client'

import { SC_BLOCKS } from '@/lib/program-data'
import { bc } from '@/lib/utils'
import type { BlockData, Environment, CyclingPhase } from '@/lib/types'

interface Props {
  block: BlockData
  activeBlock: number
  onBlockChange: (i: number) => void
  env: Environment
  onEnvChange: (e: Environment) => void
  cyclingPhase: CyclingPhase | null
  onPhaseChange: (p: CyclingPhase) => void
  completed: Record<string, boolean>
  blockDone: number
}

const PHASES: [CyclingPhase, string][] = [
  ['base', 'Base'], ['build', 'Build'], ['specialty', 'Specialty'], ['race', 'Race'], ['transition', 'Trans.'],
]

export default function Header({ block, activeBlock, onBlockChange, env, onEnvChange, cyclingPhase, onPhaseChange, completed, blockDone }: Props) {
  const progress = (blockDone / 4) * 100

  return (
    <header style={{
      borderBottom: '1px solid oklch(0.22 0.01 255)', padding: '16px 24px',
      position: 'sticky', top: 0, zIndex: 10,
      background: 'oklch(0.11 0.012 255/0.96)', backdropFilter: 'blur(12px)',
    }}>
      <div style={{ maxWidth: 700, margin: '0 auto' }}>
        {/* Title row */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12, marginBottom: 14 }}>
          <div>
            <span style={{
              fontFamily: "'Barlow Condensed',sans-serif", fontWeight: 800, fontSize: 10, letterSpacing: '.18em',
              color: 'var(--accent)', background: 'oklch(0.82 0.20 128/0.12)',
              padding: '2px 8px', borderRadius: 4, border: '1px solid oklch(0.82 0.20 128/0.3)',
            }}>CYCLIST S&C</span>
            <h1 style={{ fontFamily: "'Barlow Condensed',sans-serif", fontWeight: 800, fontSize: 'clamp(22px,5vw,34px)', letterSpacing: '.01em', marginTop: 4, lineHeight: 1 }}>
              {block.label} <span style={{ color: 'var(--accent)' }}>— {block.subtitle}</span>
            </h1>
          </div>
          {/* Progress ring */}
          <div style={{ textAlign: 'center', flexShrink: 0 }}>
            <div style={{
              width: 48, height: 48, borderRadius: '50%',
              background: `conic-gradient(var(--accent) ${progress}%, oklch(0.22 0.01 255) 0)`,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>
              <div style={{ width: 36, height: 36, borderRadius: '50%', background: 'oklch(0.11 0.012 255)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <span style={{ fontFamily: "'Barlow Condensed',sans-serif", fontWeight: 800, fontSize: 13, lineHeight: 1 }}>{blockDone}/4</span>
              </div>
            </div>
            <div style={{ fontSize: 9, color: 'var(--muted)', marginTop: 3, fontFamily: "'DM Mono',monospace" }}>DONE</div>
          </div>
        </div>

        {/* Block tabs */}
        <div style={{ display: 'flex', gap: 6 }}>
          {SC_BLOCKS.map((b, i) => {
            const done = b.weeks.filter(w => completed[bc(b.id, w.n)]).length
            const allDone = done === 4
            return (
              <button key={i} onClick={() => onBlockChange(i)} style={{
                flex: 1, padding: '7px 0', borderRadius: 9, cursor: 'pointer',
                background: activeBlock === i ? 'oklch(0.82 0.20 128/0.15)' : 'oklch(0.17 0.01 255)',
                color: activeBlock === i ? 'var(--accent)' : 'var(--muted)',
                fontFamily: "'Barlow Condensed',sans-serif", fontWeight: 700, fontSize: 13, letterSpacing: '.06em',
                border: `1px solid ${activeBlock === i ? 'oklch(0.82 0.20 128/0.4)' : 'oklch(0.24 0.01 255)'}`,
                transition: 'all .2s',
              }}>
                {b.label.replace('BLOCK ', '')} {allDone ? '✓' : ''}
                <div style={{ fontSize: 9, color: activeBlock === i ? 'var(--accent)' : 'oklch(0.40 0.01 255)', fontFamily: "'DM Mono',monospace", marginTop: 1, fontWeight: 400 }}>
                  {b.weekRange}
                </div>
              </button>
            )
          })}
        </div>

        {/* Environment toggle */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: 10 }}>
          <span style={{ fontFamily: "'DM Mono',monospace", fontSize: 10, color: 'var(--muted)', letterSpacing: '.06em' }}>ENVIRONMENT</span>
          <div style={{ display: 'flex', gap: 4 }}>
            {(['home', 'gym'] as Environment[]).map(e => (
              <button key={e} onClick={() => onEnvChange(e)} style={{
                padding: '4px 14px', borderRadius: 6, cursor: 'pointer',
                background: env === e ? (e === 'gym' ? 'oklch(0.70 0.15 290/0.20)' : 'oklch(0.82 0.20 128/0.12)') : 'oklch(0.18 0.01 255)',
                color: env === e ? (e === 'gym' ? 'oklch(0.70 0.15 290)' : 'var(--accent)') : 'var(--muted)',
                fontFamily: "'Barlow Condensed',sans-serif", fontWeight: 700, fontSize: 12, letterSpacing: '.10em',
                border: `1px solid ${env === e ? (e === 'gym' ? 'oklch(0.70 0.15 290/0.40)' : 'oklch(0.82 0.20 128/0.40)') : 'oklch(0.24 0.01 255)'}`,
                transition: 'all .15s',
              }}>
                {e.toUpperCase()}
              </button>
            ))}
          </div>
        </div>

        {/* Phase selector — Performance Mode only */}
        {activeBlock >= 3 && (
          <div style={{ marginTop: 8 }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 5 }}>
              <span style={{ fontFamily: "'DM Mono',monospace", fontSize: 10, color: 'oklch(0.72 0.18 200)', letterSpacing: '.06em' }}>CYCLING PHASE</span>
              {!cyclingPhase && <span style={{ fontSize: 10, color: 'oklch(0.65 0.18 25)', fontFamily: "'DM Mono',monospace" }}>select to enable phase coaching</span>}
            </div>
            <div style={{ display: 'flex', gap: 4 }}>
              {PHASES.map(([k, lbl]) => (
                <button key={k} onClick={() => onPhaseChange(k)} style={{
                  flex: 1, padding: '5px 2px', borderRadius: 6, cursor: 'pointer',
                  background: cyclingPhase === k ? 'oklch(0.72 0.18 200/0.20)' : 'oklch(0.18 0.01 255)',
                  color: cyclingPhase === k ? 'oklch(0.72 0.18 200)' : 'var(--muted)',
                  fontFamily: "'Barlow Condensed',sans-serif", fontWeight: 700, fontSize: 11, letterSpacing: '.06em',
                  border: `1px solid ${cyclingPhase === k ? 'oklch(0.72 0.18 200/0.45)' : 'oklch(0.24 0.01 255)'}`,
                  transition: 'all .15s',
                }}>
                  {lbl}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </header>
  )
}
