'use client'

import { SC_CAT_COLORS } from '@/lib/utils'
import type { ExerciseCat } from '@/lib/types'

const CAT_LABELS: Record<ExerciseCat, string> = {
  mobility: 'MOBILITY',
  'power-prep': 'POWER PREP',
  'power-rfd': 'POWER / RFD',
  lower: 'LOWER',
  upper: 'UPPER',
  core: 'CORE',
}

export default function CatTag({ cat }: { cat: ExerciseCat }) {
  const c = SC_CAT_COLORS[cat] ?? SC_CAT_COLORS.core
  return (
    <span style={{
      fontSize: 9, fontFamily: "'Barlow Condensed',sans-serif", fontWeight: 700, letterSpacing: '.12em',
      color: c.accent, background: c.bg, padding: '2px 7px', borderRadius: 3,
      border: `1px solid ${c.accent}44`,
    }}>
      {CAT_LABELS[cat] ?? cat.toUpperCase()}
    </span>
  )
}
