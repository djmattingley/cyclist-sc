'use client'

import { bc } from '@/lib/utils'
import type { BlockData, FeedbackData } from '@/lib/types'

interface Props {
  block: BlockData
  feedbacks: Record<string, FeedbackData>
}

function parseRpePlanned(rpeStr: string): number {
  const nums = rpeStr.match(/\d+/g)
  return nums ? Math.max(...nums.map(Number)) : 5
}

function rpeColor(rpe: number) {
  if (rpe <= 5) return { bar: 'oklch(0.82 0.20 128)', text: 'oklch(0.78 0.18 128)' }
  if (rpe <= 6) return { bar: 'oklch(0.78 0.16 60)',  text: 'oklch(0.74 0.15 60)'  }
  return           { bar: 'oklch(0.65 0.18 25)',  text: 'oklch(0.65 0.18 25)'  }
}

export default function ProgressCard({ block, feedbacks }: Props) {
  const isMultiSession = block.weeks.some(w => 'sessions' in w)

  const rows = block.weeks.map(w => {
    let actualRpe: number | null = null
    if (isMultiSession) {
      const fbA = feedbacks[bc(block.id, w.n, '-A')]
      const fbB = feedbacks[bc(block.id, w.n, '-B')]
      const rpes = [fbA?.rpe, fbB?.rpe].filter((r): r is number => r != null)
      if (rpes.length) actualRpe = Math.round(rpes.reduce((a, b) => a + b, 0) / rpes.length)
    } else {
      actualRpe = feedbacks[bc(block.id, w.n)]?.rpe ?? null
    }
    return { week: w, actualRpe, plannedRpe: parseRpePlanned(w.rpe) }
  })

  if (!rows.some(r => r.actualRpe !== null)) return null

  return (
    <div style={{
      background: 'oklch(0.16 0.010 255)',
      borderRadius: 12, border: '1px solid oklch(0.24 0.01 255)',
      padding: '14px 18px', marginBottom: 16,
    }}>
      <div style={{
        fontSize: 10, fontFamily: "'Barlow Condensed',sans-serif", fontWeight: 700,
        letterSpacing: '.15em', color: 'var(--muted)', marginBottom: 12,
      }}>
        SESSION RPE LOG
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 9 }}>
        {rows.map(({ week, actualRpe, plannedRpe }) => {
          const c = actualRpe !== null ? rpeColor(actualRpe) : null
          const abovePlan = actualRpe !== null && actualRpe > plannedRpe
          return (
            <div key={week.n} style={{ display: 'grid', gridTemplateColumns: '80px 1fr 60px', gap: 10, alignItems: 'center' }}>
              {/* Week label */}
              <div style={{ display: 'flex', alignItems: 'baseline', gap: 5, minWidth: 0 }}>
                <span style={{ fontFamily: "'Barlow Condensed',sans-serif", fontWeight: 800, fontSize: 13, color: 'var(--accent)', flexShrink: 0 }}>W{week.n}</span>
                <span style={{ fontFamily: "'Barlow Condensed',sans-serif", fontSize: 11, color: 'var(--muted)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                  {week.theme}
                </span>
              </div>

              {/* Bar track */}
              <div style={{ position: 'relative', height: 6, background: 'oklch(0.22 0.01 255)', borderRadius: 3 }}>
                {actualRpe !== null && c && (
                  <div style={{
                    position: 'absolute', left: 0, top: 0, height: '100%',
                    width: `${actualRpe * 10}%`,
                    background: c.bar, borderRadius: 3,
                  }} />
                )}
                {/* Planned RPE tick mark */}
                <div style={{
                  position: 'absolute', top: -3, bottom: -3,
                  left: `calc(${plannedRpe * 10}% - 1px)`,
                  width: 2, background: 'oklch(0.38 0.01 255)', borderRadius: 1,
                }} />
              </div>

              {/* Value + deviation */}
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: 4 }}>
                {actualRpe !== null && c
                  ? <>
                      <span style={{ fontFamily: "'DM Mono',monospace", fontSize: 12, color: c.text, fontWeight: 500 }}>
                        {actualRpe}
                      </span>
                      {abovePlan && (
                        <span style={{ fontSize: 9, color: 'oklch(0.65 0.18 25)', fontFamily: "'DM Mono',monospace" }}>↑</span>
                      )}
                    </>
                  : <span style={{ fontFamily: "'DM Mono',monospace", fontSize: 12, color: 'oklch(0.28 0.01 255)' }}>—</span>
                }
              </div>
            </div>
          )
        })}
      </div>

      {/* Legend */}
      <div style={{ display: 'flex', gap: 14, marginTop: 12, paddingTop: 10, borderTop: '1px solid oklch(0.20 0.01 255)', flexWrap: 'wrap' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
          <div style={{ width: 2, height: 8, background: 'oklch(0.38 0.01 255)', borderRadius: 1 }} />
          <span style={{ fontSize: 9, fontFamily: "'DM Mono',monospace", color: 'oklch(0.40 0.01 255)' }}>planned</span>
        </div>
        {([
          ['oklch(0.82 0.20 128)', '≤5 easy'],
          ['oklch(0.78 0.16 60)',  '6 mod'],
          ['oklch(0.65 0.18 25)',  '7+ high'],
        ] as [string, string][]).map(([col, lbl]) => (
          <div key={lbl} style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
            <div style={{ width: 12, height: 6, background: col, borderRadius: 2 }} />
            <span style={{ fontSize: 9, fontFamily: "'DM Mono',monospace", color: 'oklch(0.40 0.01 255)' }}>{lbl}</span>
          </div>
        ))}
        {isMultiSession && (
          <span style={{ fontSize: 9, fontFamily: "'DM Mono',monospace", color: 'oklch(0.36 0.01 255)', marginLeft: 'auto' }}>avg A+B</span>
        )}
      </div>
    </div>
  )
}
