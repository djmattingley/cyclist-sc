'use client'

import { useState, useCallback, useMemo } from 'react'
import type { User } from '@supabase/supabase-js'
import { createClient } from '@/lib/supabase/client'
import { SC_BLOCKS } from '@/lib/program-data'
import { EnvCtx } from './EnvCtx'
import {
  bc, getEscalationLevel, parseKey,
  progressToCompleted, progressToMissed, progressToFeedbacks,
} from '@/lib/utils'
import type { Environment, CyclingPhase, FeedbackData, UserProgress, UserSettings } from '@/lib/types'
import Header from './Header'
import BlockInfoCard from './BlockInfoCard'
import EscalationBanner from './EscalationBanner'
import WeekStrip from './WeekStrip'
import WeekCard from './WeekCard'

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
  const [completed, setCompleted]     = useState<Record<string, boolean>>(() => progressToCompleted(initialProgress))
  const [missed, setMissed]           = useState<Record<string, boolean>>(() => progressToMissed(initialProgress))
  const [feedbacks, setFeedbacks]     = useState<Record<string, FeedbackData>>(() => progressToFeedbacks(initialProgress))

  const block = SC_BLOCKS[activeBlock]

  async function upsertProgress(key: string, data: Partial<{ completed: boolean; missed: boolean; feedback: FeedbackData | null }>) {
    const { blockId, weekN, sessionLabel } = parseKey(key)
    await supabase.from('user_progress').upsert({
      user_id: user.id,
      block_id: blockId,
      week_n: weekN,
      session_label: sessionLabel,
      ...data,
      updated_at: new Date().toISOString(),
    }, { onConflict: 'user_id,block_id,week_n,session_label' })
  }

  async function saveSettings(data: Partial<Pick<UserSettings, 'env' | 'cycling_phase' | 'active_block'>>) {
    await supabase.from('user_settings').upsert({
      user_id: user.id,
      ...data,
      updated_at: new Date().toISOString(),
    }, { onConflict: 'user_id' })
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

  const handleEnvChange = (e: Environment) => {
    setEnv(e)
    saveSettings({ env: e })
  }

  const handlePhaseChange = (p: CyclingPhase) => {
    setCyclingPhase(p)
    saveSettings({ cycling_phase: p })
  }

  const handleBlockChange = (i: number) => {
    setActiveBlock(i)
    setOpenWeek(null)
    saveSettings({ active_block: i + 1 })
  }

  const escalationLevel = useMemo(() => getEscalationLevel(feedbacks, block.id), [feedbacks, block.id])
  const blockDone = block.weeks.filter(w => completed[bc(block.id, w.n)]).length

  return (
    <EnvCtx.Provider value={env}>
      <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
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
          <WeekStrip block={block} completed={completed} missed={missed} onToggle={toggleComplete} />
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
                escalationLevel={escalationLevel}
                cyclingPhase={cyclingPhase}
              />
            ))}
          </div>

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
