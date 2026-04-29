'use client'

import { useState, useCallback, useMemo, useEffect } from 'react'
import type { User } from '@supabase/supabase-js'
import { createClient } from '@/lib/supabase/client'
import { SC_BLOCKS } from '@/lib/program-data'
import { EnvCtx } from './EnvCtx'
import {
  bc, getEscalationLevel, parseKey,
  progressToCompleted, progressToMissed, progressToFeedbacks, progressToExerciseLogs,
} from '@/lib/utils'
import type { Environment, CyclingPhase, ExerciseLogs, FeedbackData, SetLog, UserProgress, UserSettings } from '@/lib/types'
import Header from './Header'
import BlockInfoCard from './BlockInfoCard'
import EscalationBanner from './EscalationBanner'
import WeekStrip from './WeekStrip'
import WeekCard from './WeekCard'
import ProgressCard from './ProgressCard'

interface Props {
  user: User
  initialSettings: UserSettings | null
  initialProgress: UserProgress[]
}

export default function ProgramApp({ user, initialSettings, initialProgress }: Props) {
  const supabase = createClient()

  const [activeBlock, setActiveBlock] = useState(initialSettings ? initialSettings.active_block - 1 : 0)
  const [openWeek, setOpenWeek]       = useState<number | null>(null)
  const [env, setEnv]                 = useState<Environment>(initialSettings?.env ?? 'home')
  const [cyclingPhase, setCyclingPhase] = useState<CyclingPhase | null>(initialSettings?.cycling_phase ?? null)
  const [completed, setCompleted]         = useState<Record<string, boolean>>(() => progressToCompleted(initialProgress))
  const [missed, setMissed]               = useState<Record<string, boolean>>(() => progressToMissed(initialProgress))
  const [feedbacks, setFeedbacks]         = useState<Record<string, FeedbackData>>(() => progressToFeedbacks(initialProgress))
  const [exerciseLogs, setExerciseLogs]   = useState<Record<string, ExerciseLogs>>(() => progressToExerciseLogs(initialProgress))
  const [saveError, setSaveError]         = useState(false)
  const [stale, setStale]                 = useState(false)

  useEffect(() => {
    const clientBuild = process.env.NEXT_PUBLIC_VERCEL_GIT_COMMIT_SHA ?? 'dev'
    if (clientBuild === 'dev') return
    const check = async () => {
      try {
        const res = await fetch('/api/build-id')
        const { buildId } = await res.json()
        if (buildId !== clientBuild) setStale(true)
      } catch { /* ignore */ }
    }
    const onVisible = () => { if (document.visibilityState === 'visible') check() }
    document.addEventListener('visibilitychange', onVisible)
    return () => document.removeEventListener('visibilitychange', onVisible)
  }, [])

  const block = SC_BLOCKS[activeBlock]

  async function upsertProgress(key: string, data: Partial<{ completed: boolean; missed: boolean; feedback: FeedbackData | null; exercise_logs: ExerciseLogs }>) {
    const { blockId, weekN, sessionLabel } = parseKey(key)
    const { error } = await supabase.from('user_progress').upsert({
      user_id: user.id,
      block_id: blockId,
      week_n: weekN,
      session_label: sessionLabel,
      ...data,
      updated_at: new Date().toISOString(),
    }, { onConflict: 'user_id,block_id,week_n,session_label' })
    if (error) setSaveError(true)
    else setSaveError(false)
  }

  async function saveSettings(data: Partial<Pick<UserSettings, 'env' | 'cycling_phase' | 'active_block'>>) {
    const { error } = await supabase.from('user_settings').upsert({
      user_id: user.id,
      ...data,
      updated_at: new Date().toISOString(),
    }, { onConflict: 'user_id' })
    if (error) setSaveError(true)
    else setSaveError(false)
  }

  const toggleComplete = useCallback((key: string) => {
    setCompleted(prev => {
      const next = { ...prev, [key]: !prev[key] }
      upsertProgress(key, { completed: next[key] })
      return next
    })
  }, [])

  const toggleMissed = useCallback((key: string) => {
    setMissed(prev => {
      const next = { ...prev, [key]: !prev[key] }
      upsertProgress(key, { missed: next[key] })
      return next
    })
  }, [])

  const saveFeedback = useCallback((key: string, data: FeedbackData | null) => {
    setFeedbacks(prev => {
      const next = data
        ? { ...prev, [key]: data }
        : Object.fromEntries(Object.entries(prev).filter(([k]) => k !== key))
      upsertProgress(key, { feedback: data })
      return next
    })
  }, [])

  const saveExerciseLog = useCallback((sessionKey: string, exKey: string, sets: SetLog[]) => {
    setExerciseLogs(prev => {
      const sessionLogs: ExerciseLogs = { ...(prev[sessionKey] ?? {}), [exKey]: sets }
      const next = { ...prev, [sessionKey]: sessionLogs }
      upsertProgress(sessionKey, { exercise_logs: sessionLogs })
      return next
    })
  }, [])

  const handleEnvChange = (e: Environment) => {
    setEnv(e)
    saveSettings({ env: e })
  }

  const handlePhaseChange = (p: CyclingPhase) => {
    setCyclingPhase(p)
    saveSettings({ cycling_phase: p })
  }

  const isBlockAccessible = (i: number) =>
    i === 0 || SC_BLOCKS[i - 1].weeks.every(w => !!completed[bc(SC_BLOCKS[i - 1].id, w.n)])

  const handleBlockChange = (i: number) => {
    if (!isBlockAccessible(i)) return
    setActiveBlock(i)
    setOpenWeek(null)
    saveSettings({ active_block: i + 1 })
  }

  const escalationLevel = useMemo(() => getEscalationLevel(feedbacks, block.id), [feedbacks, block.id])
  const blockDone = block.weeks.filter(w => completed[bc(block.id, w.n)]).length

  return (
    <EnvCtx.Provider value={env}>
      <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
        {stale && (
          <div
            onClick={() => window.location.reload()}
            style={{
              position: 'sticky', top: 0, zIndex: 20, cursor: 'pointer',
              background: 'oklch(0.72 0.18 200/0.95)', backdropFilter: 'blur(8px)',
              padding: '10px 24px', textAlign: 'center',
            }}
          >
            <span style={{ fontSize: 13, color: '#fff', fontFamily: "'DM Sans',sans-serif" }}>
              New version available — tap to refresh
            </span>
          </div>
        )}
        {saveError && (
          <div style={{
            position: 'sticky', top: 0, zIndex: 20,
            background: 'oklch(0.65 0.18 25/0.95)', backdropFilter: 'blur(8px)',
            padding: '10px 24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          }}>
            <span style={{ fontSize: 13, color: '#fff', fontFamily: "'DM Sans',sans-serif" }}>
              ⚠ Save failed — check your connection. Your changes are not persisted.
            </span>
            <button onClick={() => setSaveError(false)} style={{ background: 'none', border: 'none', color: '#fff', fontSize: 16, cursor: 'pointer', padding: '0 4px', lineHeight: 1 }}>✕</button>
          </div>
        )}
        <Header
          block={block}
          activeBlock={activeBlock}
          onBlockChange={handleBlockChange}
          env={env}
          onEnvChange={handleEnvChange}
          cyclingPhase={cyclingPhase}
          onPhaseChange={handlePhaseChange}
          completed={completed}
          blockDone={blockDone}
        />
        <main style={{ flex: 1, padding: '20px 24px 40px', maxWidth: 700, margin: '0 auto', width: '100%' }}>
          <BlockInfoCard block={block} activeBlock={activeBlock} cyclingPhase={cyclingPhase} />
          {escalationLevel >= 2 && <EscalationBanner level={escalationLevel} />}
          {activeBlock >= 3 && !cyclingPhase ? (
            <div style={{ borderRadius: 14, border: '1px solid oklch(0.72 0.18 200/0.35)', background: 'oklch(0.72 0.18 200/0.06)', padding: '28px 24px', textAlign: 'center' }}>
              <div style={{ fontFamily: "'Barlow Condensed',sans-serif", fontWeight: 800, fontSize: 22, letterSpacing: '.04em', marginBottom: 8 }}>
                SELECT YOUR CYCLING PHASE
              </div>
              <p style={{ fontSize: 13, color: 'var(--muted)', lineHeight: 1.65, marginBottom: 24, maxWidth: 380, margin: '0 auto 24px' }}>
                Performance Mode sessions are tuned to your current cycling phase. Select below to unlock your sessions — you can change it any time.
              </p>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5,1fr)', gap: 8 }}>
                {([['base','Base','High vol · strength dev'],['build','Build','Mod vol · avoid DOMS'],['specialty','Specialty','Low vol · add RFD'],['race','Race','Freshness only'],['transition','Trans.','Mobility & recovery']] as [CyclingPhase,string,string][]).map(([k, lbl, sub]) => (
                  <button key={k} onClick={() => handlePhaseChange(k)} style={{
                    padding: '12px 6px', borderRadius: 10, cursor: 'pointer',
                    background: 'oklch(0.72 0.18 200/0.12)',
                    border: '1px solid oklch(0.72 0.18 200/0.35)',
                    color: 'oklch(0.72 0.18 200)',
                    fontFamily: "'Barlow Condensed',sans-serif", fontWeight: 700, fontSize: 13, letterSpacing: '.06em',
                    transition: 'all .15s',
                  }}>
                    {lbl}
                    <div style={{ fontSize: 9, color: 'oklch(0.55 0.01 255)', fontFamily: "'DM Mono',monospace", marginTop: 4, fontWeight: 400, lineHeight: 1.4 }}>{sub}</div>
                  </button>
                ))}
              </div>
            </div>
          ) : (
            <>
              <WeekStrip block={block} completed={completed} missed={missed} onToggle={toggleComplete} />
              <ProgressCard block={block} feedbacks={feedbacks} />
              <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                {block.weeks.map((w, i) => (
                  <WeekCard
                    key={i}
                    blockId={block.id}
                    weekData={w}
                    isOpen={openWeek === i}
                    onToggle={() => setOpenWeek(openWeek === i ? null : i)}
                    isComplete={!!completed[bc(block.id, w.n)]}
                    onToggleComplete={() => toggleComplete(bc(block.id, w.n))}
                    isMissed={!!missed[bc(block.id, w.n)]}
                    onToggleMissed={() => toggleMissed(bc(block.id, w.n))}
                    feedbacks={feedbacks}
                    onSaveFeedback={saveFeedback}
                    exerciseLogs={exerciseLogs}
                    onSaveExerciseLog={saveExerciseLog}
                    escalationLevel={escalationLevel}
                    cyclingPhase={cyclingPhase}
                  />
                ))}
              </div>
            </>
          )}

          {/* Next block teaser */}
          {activeBlock < SC_BLOCKS.length - 1 && (
            <div style={{ marginTop: 20, borderRadius: 12, padding: '14px 18px', background: 'oklch(0.14 0.010 255)', border: '1px dashed oklch(0.28 0.01 255)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <div style={{ width: 34, height: 34, borderRadius: 8, background: 'oklch(0.20 0.01 255)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 16, color: 'var(--muted)' }}>→</div>
                <div>
                  <div style={{ fontFamily: "'Barlow Condensed',sans-serif", fontWeight: 700, fontSize: 15, letterSpacing: '.05em', color: 'var(--muted)' }}>
                    {SC_BLOCKS[activeBlock + 1].label} — {SC_BLOCKS[activeBlock + 1].subtitle}
                  </div>
                  <div style={{ fontSize: 12, color: 'oklch(0.42 0.01 255)', marginTop: 2 }}>
                    {SC_BLOCKS[activeBlock + 1].sessionDuration} · {SC_BLOCKS[activeBlock + 1].weekRange} · complete all 4 weeks to unlock
                  </div>
                </div>
              </div>
            </div>
          )}
        </main>
      </div>
    </EnvCtx.Provider>
  )
}
