export type Environment = 'home' | 'gym'
export type CyclingPhase = 'base' | 'build' | 'specialty' | 'race' | 'transition'
export type WeekColor = 'accent' | 'amber' | 'red'
export type ExerciseCat = 'mobility' | 'power-prep' | 'power-rfd' | 'lower' | 'upper' | 'core'

export interface Exercise {
  name: string
  cat: ExerciseCat
  icon: string
  cues: string[]
  regression: string
  progression: string
}

export interface ExerciseRef {
  ex: string
  sets: string | null
  reps: string
  note: string | null
}

export interface BlockSectionData {
  name: string
  dur: string
  cat: ExerciseCat
  exercises: ExerciseRef[]
}

export interface MicroOption {
  label: string
  exercises: ExerciseRef[]
}

export interface SessionData {
  label: string
  dur: string
  icon: string
  blocks: BlockSectionData[]
}

export interface WeekDataBase {
  n: number
  theme: string
  rpe: string
  color: WeekColor
  note: string
}

export interface WeekDataSingle extends WeekDataBase {
  blocks: BlockSectionData[]
  micro?: MicroOption[]
}

export interface WeekDataMulti extends WeekDataBase {
  sessions: SessionData[]
}

export type WeekData = WeekDataSingle | WeekDataMulti

export interface BlockData {
  id: number
  label: string
  subtitle: string
  weekRange: string
  sessionDuration: string
  sessionsPerWeek: number
  equipment: string
  goal: string
  scheduling: string
  structure: string
  weeks: WeekData[]
  microNote?: string
}

export interface FeedbackData {
  time: string
  soreness: string
  ride: string
  rpe: number
  result: string | null
  ts: number
}

export interface UserSettings {
  user_id: string
  env: Environment
  cycling_phase: CyclingPhase | null
  active_block: number
  updated_at: string
}

export interface UserProgress {
  id: string
  user_id: string
  block_id: number
  week_n: number
  session_label: string | null
  completed: boolean
  missed: boolean
  feedback: FeedbackData | null
  created_at: string
  updated_at: string
}
