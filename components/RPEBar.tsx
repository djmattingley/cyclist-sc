'use client'

export default function RPEBar({ rpe, color = 'var(--accent)' }: { rpe: string; color?: string }) {
  const v = parseFloat(String(rpe).split('–').pop()!) / 10
  const filled = Math.round(v * 10)
  return (
    <div style={{ display: 'flex', gap: 3, alignItems: 'center' }}>
      {Array.from({ length: 10 }, (_, i) => (
        <div key={i} style={{
          width: 12, height: 4, borderRadius: 2,
          background: i < filled ? color : 'oklch(0.28 0.01 255)',
          transition: 'background .2s',
        }} />
      ))}
      <span style={{ marginLeft: 6, fontFamily: "'DM Mono',monospace", fontSize: 11, color: 'var(--muted)' }}>
        RPE {rpe}
      </span>
    </div>
  )
}
