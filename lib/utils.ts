import type { ExerciseLogs, FeedbackData, UserProgress } from './types'

export const SC_COLOR_MAP = {
  accent: { pill: '#a3e635', text: '#0d1a00', glow: 'oklch(0.82 0.20 128/0.18)', border: 'oklch(0.82 0.20 128/0.35)' },
  amber:  { pill: '#fbbf24', text: '#1a0d00', glow: 'oklch(0.78 0.16 60/0.18)',  border: 'oklch(0.78 0.16 60/0.35)' },
  red:    { pill: '#f87171', text: '#1a0000', glow: 'oklch(0.65 0.18 25/0.18)',  border: 'oklch(0.65 0.18 25/0.35)' },
} as const

export const SC_CAT_COLORS = {
  mobility:     { bg: 'oklch(0.52 0.01 255/0.12)', accent: 'oklch(0.60 0.01 255)' },
  'power-prep': { bg: 'oklch(0.82 0.20 128/0.08)', accent: 'oklch(0.82 0.20 128)' },
  'power-rfd':  { bg: 'oklch(0.72 0.18 200/0.10)', accent: 'oklch(0.72 0.18 200)' },
  lower:        { bg: 'oklch(0.78 0.16 60/0.08)',  accent: 'oklch(0.78 0.16 60)' },
  upper:        { bg: 'oklch(0.70 0.15 290/0.08)', accent: 'oklch(0.70 0.15 290)' },
  core:         { bg: 'oklch(0.65 0.18 25/0.08)',  accent: 'oklch(0.65 0.18 25)' },
} as const

export type ColorKey = keyof typeof SC_COLOR_MAP
export type CatColorKey = keyof typeof SC_CAT_COLORS

export const bc = (blockId: number, weekN: number, suffix = '') =>
  `b${blockId}-w${weekN}${suffix}`

export function parseKey(key: string): { blockId: number; weekN: number; sessionLabel: string | null } {
  const match = key.match(/^b(\d+)-w(\d+)(-(\w+))?$/)
  if (!match) throw new Error(`Invalid key: ${key}`)
  return {
    blockId: parseInt(match[1]),
    weekN: parseInt(match[2]),
    sessionLabel: match[4] ?? null,
  }
}

export function getEscalationLevel(feedbacks: Record<string, FeedbackData>, blockId: number): number {
  let streak = 0
  const prefix = `b${blockId}-`
  const relevant = Object.entries(feedbacks)
    .filter(([k]) => k.startsWith(prefix))
    .sort(([a], [b]) => {
      const nA = parseInt(a.match(/w(\d+)/)?.[1] ?? '0')
      const nB = parseInt(b.match(/w(\d+)/)?.[1] ?? '0')
      return nB - nA
    })
  for (const [, fb] of relevant) {
    if (fb && fb.rpe >= 7) streak++
    else break
  }
  return streak
}

export function sessionToText(blocks: { name: string; dur: string; exercises: Array<{ ex: string; sets: string | null; reps: string; note: string | null }> }[], exLib: Record<string, { name: string }>): string {
  if (!blocks) return '(no session data)'
  return blocks.map(b => {
    const lines = b.exercises.map(e => {
      const name = exLib[e.ex]?.name ?? e.ex
      const vol = e.sets ? `${e.sets} × ${e.reps}` : e.reps
      return `    - ${name}: ${vol}${e.note ? ` (${e.note})` : ''}`
    }).join('\n')
    return `  ${b.name} (${b.dur}):\n${lines}`
  }).join('\n')
}

export function progressToCompleted(records: UserProgress[]): Record<string, boolean> {
  const result: Record<string, boolean> = {}
  for (const r of records) {
    if (!r.completed) continue
    const suffix = r.session_label ? `-${r.session_label}` : ''
    result[`b${r.block_id}-w${r.week_n}${suffix}`] = true
  }
  return result
}

export function progressToMissed(records: UserProgress[]): Record<string, boolean> {
  const result: Record<string, boolean> = {}
  for (const r of records) {
    if (!r.missed) continue
    const suffix = r.session_label ? `-${r.session_label}` : ''
    result[`b${r.block_id}-w${r.week_n}${suffix}`] = true
  }
  return result
}

export function progressToFeedbacks(records: UserProgress[]): Record<string, FeedbackData> {
  const result: Record<string, FeedbackData> = {}
  for (const r of records) {
    if (!r.feedback) continue
    const suffix = r.session_label ? `-${r.session_label}` : ''
    result[`b${r.block_id}-w${r.week_n}${suffix}`] = r.feedback
  }
  return result
}

export function progressToExerciseLogs(records: UserProgress[]): Record<string, ExerciseLogs> {
  const result: Record<string, ExerciseLogs> = {}
  for (const r of records) {
    if (!r.exercise_logs || Object.keys(r.exercise_logs).length === 0) continue
    const suffix = r.session_label ? `-${r.session_label}` : ''
    result[`b${r.block_id}-w${r.week_n}${suffix}`] = r.exercise_logs
  }
  return result
}

