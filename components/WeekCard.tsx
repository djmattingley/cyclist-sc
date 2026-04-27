'use client'

import { useState } from 'react'
import { SC_BLOCKS } from '@/lib/program-data'
import { SC_COLOR_MAP, bc } from '@/lib/utils'
import type { WeekData, BlockSectionData, ExerciseLogs, FeedbackData, CyclingPhase, SetLog } from '@/lib/types'
import RPEBar from './RPEBar'
import BlockSection from './BlockSection'
import QuickSession from './QuickSession'
import MicroSession from './MicroSession'
import FeedbackPanel from './FeedbackPanel'

interface Props {
  blockId: number
  weekData: WeekData
  isOpen: boolean
  onToggle: () => void
  isComplete: boolean
  onToggleComplete: () => void
  isMissed: boolean
  onToggleMissed: () => void
  feedbacks: Record<string, FeedbackData>
  onSaveFeedback: (key: string, data: FeedbackData | null) => void
  exerciseLogs: Record<string, ExerciseLogs>
  onSaveExerciseLog: (sessionKey: string, exKey: string, sets: SetLog[]) => void
  escalationLevel: number
  cyclingPhase: CyclingPhase | null
}

export default function WeekCard({
  blockId, weekData, isOpen, onToggle,
  isComplete, onToggleComplete,
  isMissed, onToggleMissed,
  feedbacks, onSaveFeedback,
  exerciseLogs, onSaveExerciseLog,
  escalationLevel, cyclingPhase,
}: Props) {
  const [showFeedback, setShowFeedback] = useState(false)
  const [showQuick, setShowQuick]       = useState(false)
  const [activeSession, setActiveSession] = useState(0)

  const c = SC_COLOR_MAP[weekData.color] ?? SC_COLOR_MAP.accent
  const isMultiSession = 'sessions' in weekData
  const hasMicro = 'micro' in weekData && !isMultiSession

  const getBlocks = (sessIdx = 0): BlockSectionData[] =>
    'sessions' in weekData ? weekData.sessions[sessIdx].blocks : (weekData.blocks ?? [])

  const getNextBlocks = (sessIdx = 0): BlockSectionData[] | null => {
    const blockData = SC_BLOCKS[blockId - 1]
    const nextWeek = blockData?.weeks.find(w => w.n === weekData.n + 1)
    if (!nextWeek) return null
    if ('sessions' in nextWeek) return nextWeek.sessions[sessIdx]?.blocks ?? null
    return nextWeek.blocks ?? null
  }

  const fbKey = isMultiSession
    ? bc(blockId, weekData.n, activeSession === 0 ? '-A' : '-B')
    : bc(blockId, weekData.n)

  const hasFeedback = isMultiSession
    ? !!(feedbacks[bc(blockId, weekData.n, '-A')]?.result) || !!(feedbacks[bc(blockId, weekData.n, '-B')]?.result)
    : !!(feedbacks[bc(blockId, weekData.n)]?.result)

  const blockData = SC_BLOCKS[blockId - 1]
  const microNote = blockData?.microNote ?? ''

  return (
    <div style={{
      background: isOpen ? 'oklch(0.155 0.012 255)' : 'oklch(0.145 0.010 255)',
      border: `1px solid ${isOpen ? c.border : 'oklch(0.24 0.01 255)'}`,
      borderRadius: 14, overflow: 'hidden',
      transition: 'border-color .25s,background .25s',
      boxShadow: isOpen ? `0 0 32px ${c.glow}` : 'none',
      opacity: isMissed ? 0.8 : 1,
    }}>
      {/* Header */}
      <button onClick={onToggle} style={{
        width: '100%', background: 'none', border: 'none', cursor: 'pointer',
        color: 'inherit', display: 'flex', alignItems: 'center', gap: 16,
        padding: '18px 20px', textAlign: 'left',
      }}>
        <div style={{
          width: 46, height: 46, borderRadius: 10, flexShrink: 0,
          background: isOpen ? c.pill : 'oklch(0.20 0.01 255)',
          display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'background .25s',
        }}>
          <span style={{ fontFamily: "'Barlow Condensed',sans-serif", fontWeight: 800, fontSize: 18, color: isOpen ? c.text : 'var(--muted)' }}>
            W{weekData.n}
          </span>
        </div>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap' }}>
            <span style={{ fontFamily: "'Barlow Condensed',sans-serif", fontWeight: 700, fontSize: 22, letterSpacing: '.02em' }}>
              {weekData.theme.toUpperCase()}
            </span>
            <span style={{
              fontFamily: "'DM Mono',monospace", fontSize: 10, fontWeight: 500,
              background: isOpen ? c.pill + '22' : 'oklch(0.20 0.01 255)',
              color: isOpen ? c.pill : 'var(--muted)', padding: '2px 8px', borderRadius: 4,
              border: `1px solid ${isOpen ? c.pill + '44' : 'oklch(0.26 0.01 255)'}`, transition: 'all .2s',
            }}>RPE {weekData.rpe}</span>
            {hasFeedback && <span style={{ fontFamily: "'DM Mono',monospace", fontSize: 9, background: 'oklch(0.70 0.15 290/0.15)', color: 'oklch(0.70 0.15 290)', padding: '2px 7px', borderRadius: 4, border: '1px solid oklch(0.70 0.15 290/0.35)' }}>ADAPTED</span>}
            {isMissed && <span style={{ fontFamily: "'DM Mono',monospace", fontSize: 9, background: 'oklch(0.65 0.18 25/0.15)', color: 'oklch(0.65 0.18 25)', padding: '2px 7px', borderRadius: 4, border: '1px solid oklch(0.65 0.18 25/0.35)' }}>MISSED</span>}
          </div>
          <RPEBar rpe={weekData.rpe} />
        </div>
        <span style={{ fontSize: 18, color: isOpen ? c.pill : 'var(--muted)', transform: isOpen ? 'rotate(180deg)' : 'none', transition: 'transform .25s,color .25s', flexShrink: 0 }}>▾</span>
      </button>

      {isOpen && (
        <div>
          {/* Missed banner */}
          {isMissed && (
            <div style={{ margin: '0 20px 16px', padding: '10px 14px', borderRadius: 8, background: 'oklch(0.65 0.18 25/0.10)', border: '1px solid oklch(0.65 0.18 25/0.35)' }}>
              <div style={{ fontFamily: "'Barlow Condensed',sans-serif", fontWeight: 700, fontSize: 12, letterSpacing: '.10em', color: 'oklch(0.65 0.18 25)', marginBottom: 4 }}>MISSED WEEK PROTOCOL</div>
              <div style={{ fontSize: 12, color: 'oklch(0.75 0.005 90)', lineHeight: 1.55 }}>Repeat this week before advancing to Week {weekData.n + 1}. Do not skip ahead.</div>
            </div>
          )}

          {/* Session tabs (Block 3+) */}
          {'sessions' in weekData && (
            <div style={{ padding: '0 20px 12px', display: 'flex', gap: 8 }}>
              {weekData.sessions.map((s, i) => (
                <button key={i} onClick={() => { setActiveSession(i); setShowFeedback(false); setShowQuick(false) }} style={{
                  flex: 1, padding: '8px 0', borderRadius: 9, cursor: 'pointer',
                  background: activeSession === i ? c.pill + '22' : 'oklch(0.20 0.01 255)',
                  color: activeSession === i ? c.pill : 'var(--muted)',
                  fontFamily: "'Barlow Condensed',sans-serif", fontWeight: 700, fontSize: 13, letterSpacing: '.06em',
                  border: `1px solid ${activeSession === i ? c.pill + '44' : 'oklch(0.26 0.01 255)'}`, transition: 'all .15s',
                }}>
                  {s.icon} {s.label.split('—')[1]?.trim() ?? s.label} · {s.dur}
                </button>
              ))}
            </div>
          )}

          {/* Coach note + session blocks */}
          <div style={{ padding: '0 20px 4px' }}>
            <div style={{ margin: '4px 0 18px', padding: '10px 14px', background: c.glow, border: `1px solid ${c.border}`, borderRadius: 8, fontSize: 13, color: 'oklch(0.78 0.005 90)', lineHeight: 1.6 }}>
              <span style={{ color: c.pill, fontFamily: "'Barlow Condensed',sans-serif", fontWeight: 700, fontSize: 11, letterSpacing: '.10em', marginRight: 6 }}>COACH NOTE</span>
              {weekData.note}
            </div>
            {showQuick && !isMultiSession
              ? <QuickSession blocks={getBlocks()} />
              : getBlocks(activeSession).map((b, i) => (
                  <BlockSection
                    key={i}
                    block={b}
                    sessionKey={fbKey}
                    sessionLogs={exerciseLogs[fbKey] ?? {}}
                    onLogSets={onSaveExerciseLog}
                  />
                ))
            }
          </div>

          {/* Micro-sessions (Block 2) */}
          {hasMicro && 'micro' in weekData && weekData.micro && (
            <MicroSession options={weekData.micro} note={microNote} />
          )}

          {/* Action bar */}
          <div style={{ borderTop: '1px solid oklch(0.20 0.01 255)', padding: '12px 20px', display: 'flex', gap: 8, alignItems: 'center', flexWrap: 'wrap' }}>
            <button onClick={e => { e.stopPropagation(); onToggleComplete() }} style={{
              flex: 1, minWidth: 90, padding: '9px 0', borderRadius: 9, border: 'none', cursor: 'pointer',
              background: isComplete ? c.pill : 'oklch(0.22 0.01 255)',
              color: isComplete ? c.text : 'var(--muted)',
              fontFamily: "'Barlow Condensed',sans-serif", fontWeight: 700, fontSize: 12, letterSpacing: '.08em', transition: 'all .2s',
            }}>
              {isComplete ? '✓ DONE' : 'MARK DONE'}
            </button>
            <button onClick={e => { e.stopPropagation(); onToggleMissed() }} style={{
              flex: 1, minWidth: 90, padding: '9px 0', borderRadius: 9, cursor: 'pointer',
              background: isMissed ? 'oklch(0.65 0.18 25/0.15)' : 'oklch(0.18 0.01 255)',
              color: isMissed ? 'oklch(0.65 0.18 25)' : 'var(--muted)',
              border: `1px solid ${isMissed ? 'oklch(0.65 0.18 25/0.4)' : 'oklch(0.24 0.01 255)'}`,
              fontFamily: "'Barlow Condensed',sans-serif", fontWeight: 700, fontSize: 12, letterSpacing: '.08em', transition: 'all .2s',
            }}>
              {isMissed ? '⚠ MISSED' : 'MISSED?'}
            </button>
            {!isMultiSession && (
              <button onClick={e => { e.stopPropagation(); setShowQuick(q => !q); setShowFeedback(false) }} style={{
                flex: 1, minWidth: 90, padding: '9px 0', borderRadius: 9, cursor: 'pointer',
                background: showQuick ? 'oklch(0.78 0.16 60/0.15)' : 'oklch(0.18 0.01 255)',
                color: showQuick ? 'oklch(0.78 0.16 60)' : 'var(--muted)',
                border: `1px solid ${showQuick ? 'oklch(0.78 0.16 60/0.4)' : 'oklch(0.24 0.01 255)'}`,
                fontFamily: "'Barlow Condensed',sans-serif", fontWeight: 700, fontSize: 12, letterSpacing: '.08em', transition: 'all .2s',
              }}>
                ⚡ QUICK
              </button>
            )}
            <button onClick={e => { e.stopPropagation(); setShowFeedback(f => !f); setShowQuick(false) }} style={{
              flex: 1, minWidth: 100, padding: '9px 0', borderRadius: 9, cursor: 'pointer',
              background: showFeedback ? 'oklch(0.70 0.15 290/0.15)' : 'oklch(0.18 0.01 255)',
              color: showFeedback ? 'oklch(0.70 0.15 290)' : 'var(--muted)',
              border: `1px solid ${showFeedback ? 'oklch(0.70 0.15 290/0.4)' : 'oklch(0.24 0.01 255)'}`,
              fontFamily: "'Barlow Condensed',sans-serif", fontWeight: 700, fontSize: 12, letterSpacing: '.08em', transition: 'all .2s',
            }}>
              {hasFeedback ? 'VIEW ADAPT' : 'LOG FEEDBACK'}
            </button>
          </div>

          {showFeedback && (
            <FeedbackPanel
              blockId={blockId}
              weekN={weekData.n}
              sessionLabel={'sessions' in weekData ? weekData.sessions[activeSession].label : null}
              blocks={getBlocks(activeSession)}
              nextBlocks={getNextBlocks(activeSession)}
              nextLabel={'sessions' in weekData ? weekData.sessions[activeSession].label : null}
              saved={feedbacks[fbKey] ?? null}
              onSave={data => { onSaveFeedback(fbKey, data); if (!data) setShowFeedback(false) }}
              onClose={() => setShowFeedback(false)}
              escalationLevel={escalationLevel}
              cyclingPhase={cyclingPhase}
            />
          )}
        </div>
      )}
    </div>
  )
}
