'use client'

export default function EscalationBanner({ level }: { level: number }) {
  return (
    <div style={{
      marginBottom: 16, padding: '12px 16px', borderRadius: 10,
      background: 'oklch(0.65 0.18 25/0.10)', border: '1px solid oklch(0.65 0.18 25/0.4)',
    }}>
      <div style={{ fontFamily: "'Barlow Condensed',sans-serif", fontWeight: 700, fontSize: 14, letterSpacing: '.10em', color: 'oklch(0.65 0.18 25)', marginBottom: 4 }}>
        ⚠ {level >= 3 ? 'THREE' : 'TWO'} CONSECUTIVE HIGH-FATIGUE SESSIONS
      </div>
      <div style={{ fontSize: 13, color: 'oklch(0.78 0.005 90)', lineHeight: 1.55 }}>
        {level >= 3
          ? "Log feedback on the latest session — coach will recommend dropping back to the previous block's Build week."
          : 'Log feedback on the latest session — coach will recommend an unplanned deload.'}
      </div>
    </div>
  )
}
