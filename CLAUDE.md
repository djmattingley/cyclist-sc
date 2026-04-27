# Cyclist S&C Program — Developer Handoff

> **Claude Code**: This is the authoritative specification for the Cyclist S&C coaching app.
> Read this entire document before writing any code. All programming rules, data schemas,
> component contracts, and AI prompt logic are defined here.

---

## 1. Project Overview

An interactive strength & conditioning coaching app for an experienced but detrained cyclist.
The app generates, displays, and adapts S&C sessions across a progressive multi-block program.
An embedded Claude AI coach adapts sessions in real-time based on athlete feedback.

**Current state**: Working React prototype (Babel standalone, localStorage, sandboxed Claude API).
**Handoff goal**: Production-grade implementation with real auth, sync, and Anthropic API.

---

## 2. Athlete Profile

| Attribute | Detail |
|---|---|
| Experience | Cyclist 5–10 years, strong S&C background |
| Current status | Detrained since March — returning from layoff |
| Time available | 1×20 min/week now → 2×35–45 min/week long-term |
| Constraints | Young family, demanding job, limited recovery window |
| Equipment | Home default (KBs/DBs, mini-band, floor). Gym available on request. |

---

## 3. System Modes

### 3.1 Rebuild Mode (Blocks 1–3)

Activated when the user is returning from a layoff, illness, or detraining period.

- **Always takes precedence** over cycling phase logic.
- The system progresses the user through Blocks 1 → 2 → 3 in sequence.
- Cycling phase may be captured as optional context but must NOT override the rebuild block structure.
- Goal: restore movement quality, tendon tolerance, trunk stiffness, hinge/single-leg strength, session consistency.
- Automatically exits to Performance Mode after Block 3 is completed (all 4 weeks including deload).
- Can be re-entered at any time if the user reports a significant layoff (2+ weeks missed = restart current block; 4+ weeks = drop one full block).

### 3.2 Performance Mode (Block 4+)

Activated after completing Blocks 1–3 (or when user explicitly states they are not rebuilding).

- **Always ask the user which cycling phase they are in** before generating any Block 4+ session.
- The cycling phase determines session volume, intensity, RFD emphasis, DOMS tolerance, and exercise selection.
- The selected phase persists until the user changes it.
- If the user changes phase mid-block, regenerate the remaining weeks of the current block for the new phase.

---

## 4. Cycling Phases (Performance Mode Only)

| Phase | Volume | Intensity | RFD Focus | DOMS Tolerance | Deload Frequency |
|---|---|---|---|---|---|
| **Base** | High | Moderate | Low | Moderate | Every 4th week |
| **Build** | Moderate | Moderate–High | Low–Moderate | Low | Every 4th week |
| **Specialty** | Reduced | Moderate | Moderate–High | Very low | Every 3rd week |
| **Race** | Very low | Low (freshness) | High | Zero | Every 2nd week |
| **Transition** | Minimal | Low | None | None | N/A |

### Phase-specific S&C guidelines:

**Base**
- Priority: strength development, technique, trunk stiffness, single-leg strength
- Volume: 2–3 sets per movement, full 35–45 min sessions
- Upper body: push + pull + shoulder stability, 1–2 sets each
- Strength work: eccentric loading, progressive overload, load increases between blocks

**Build**
- Priority: maintain strength, introduce low-impact power prep, avoid DOMS
- Volume: 2 sets per movement, 35 min sessions
- Power prep: begin explosive intent (low-load, high-velocity)
- Upper body: same as Base, RPE ≤5
- Avoid any exercise that causes 24+ h soreness

**Specialty**
- Priority: maintain strength with minimal fatigue, increase movement velocity
- Volume: 1–2 sets per movement, 30–35 min sessions
- Power/RFD: low-load high-velocity movements (banded hip snap, DB hang clean)
- Deload: every 3rd week, not every 4th
- Upper body: 1 set each, RPE ≤5, pull only in deload weeks

**Race**
- Priority: absolute freshness, rate of force development only
- Volume: 1 set per movement, 30–35 min sessions
- Power/RFD only — no strength accumulation
- Sessions must leave the athlete feeling better, not fatigued
- Acceptable: trap bar jump, med ball throw, banded hip snap
- Avoid: anything that risks DOMS, hypertrophy, or high neural demand
- Upper body: shoulder stability only (Y-T-W, face pull), 1 set, RPE 4

**Transition**
- Priority: tissue health, mobility, mental recovery
- Volume: minimal — mobility + 1–2 optional light movements
- No structured sets/reps programming required
- Duration: 15–20 min maximum
- Exercises: hip 90/90, world's greatest stretch, light band work, optional light carry
- No RPE targets — athlete does what feels good
- Duration: 2–4 weeks, then reassess (return to Base or Rebuild)

---

## 5. Block Structure

### 5.1 Rebuild Blocks (1–3)

Every block follows: **Build → Load → Overload → Deload** (4 weeks)

| | Build | Load | Overload | Deload |
|---|---|---|---|---|
| RPE | 5 | 5–6 | 6 | 4–5 |
| Volume | Baseline | +reps | +reps + tempo | Build-week reps, no tempo |
| Color | Green | Green | Amber | Red |

### 5.2 Block Progression

| Block | Sessions | Duration | Mode |
|---|---|---|---|
| 1 | 1×/week | 20 min | Rebuild |
| 2 | 1×/week + optional micro | 30 min | Rebuild |
| 3 | 2×/week | 35 + 30 min | Rebuild |
| 4+ | 2×/week | 35–45 min (phase-dependent) | Performance |

### 5.3 Session Time Templates

```
Block 1 (20 min):  Mobility 3 + Power Prep 4 + Lower 7 + Upper 2 + Core 4
Block 2 (30 min):  Mobility 4 + Power Prep 5 + Lower 12 + Upper 4 + Core 5
Block 3A (35 min): Mobility 4 + Power Prep 5 + Lower 16 + Upper 5 + Core 5
Block 3B (30 min): Mobility 3 + Hip Stability 8 + Lower Acc 8 + Core+Carry 7 + Upper Pull 4

Block 4 Base/Build A (40 min): Mobility 4 + Power Prep 6 + Lower 16 + Upper 5 + Core 9
Block 4 Base/Build B (35 min): Mobility 3 + Hip Stability 8 + Lower Acc 8 + Core+Carry 9 + Upper Pull 7
Block 4 Specialty A (35 min):  Mobility 4 + Power/RFD 8 + Lower 12 + Upper 5 + Core 6
Block 4 Specialty B (30 min):  Mobility 3 + Activation 5 + Power/RFD 6 + Lower Acc 8 + Core+Carry 7 + Upper Pull 4 - 3 min short but tight transitions bring this to 30
Block 4 Race A (35 min):       Mobility 5 + Power/RFD 10 + Lower 10 + Upper 4 + Core 6
Block 4 Race B (30 min):       Mobility 4 + Activation 6 + Power/RFD 8 + Core+Carry 8 + Upper Stability 4
Block 4 Transition (20 min):   Mobility 10 + Optional light movement 10
```

### 5.4 Time Prioritisation (if running short)

Drop in this order:
1. Upper body first
2. Core to 1 set each
3. Last Lower exercise
4. Power Prep/RFD to 1 round

**Never shorten Mobility.**

---

## 6. Programming Rules

### 6.1 Within-block progression
- Reps and TUT/tempo only. No load increases within a block.
- Load increases happen at the start of a new block.
- Deload: keep session duration, drop reps to Build-week levels, remove all tempo constraints.

### 6.2 RPE definitions
- Session-level RPE is the governing target (felt average for the session).
- Section ceilings: Mobility ≤3, Power Prep ≤5, Power/RFD ≤6, Lower ≤6, Upper ≤5, Core ≤6.
- Race phase upper body: RPE ≤4.

### 6.3 Power Prep vs Power/RFD
**Power Prep** (Blocks 1–3, Base/Build phases):
- Low-load neuromuscular activation.
- Acceptable: SL hip bridge, lateral band walk, assisted skater squat, step-up variations.
- Not acceptable: depth jumps, bilateral plyometrics, bounding, box jumps.

**Power/RFD** (Specialty, Race phases):
- Low-load, high-velocity, explosive intent.
- Acceptable: banded hip snap, DB hang clean (light), trap bar jump (gym), med ball throws.
- Not acceptable: heavy bilateral jumps, anything risking DOMS.

### 6.4 Exercise anchors (never drop across any block/phase)
These movement patterns must be present in every training block, with variation only:

| Pattern | B1 | B2 | B3 | B4+ |
|---|---|---|---|---|
| Hinge | RDL | SL RDL | SL RDL | SL RDL / Trap-Bar |
| Single-leg squat | Step-up | Bulgarian SS | Tempo Bulgarian SS | (maintain, reduce volume in Race) |
| Hip stability | SL hip bridge + band walk | ← | ← | ← (always present) |
| Trunk anti-extension | Dead bug | Hollow hold | Hollow rock | Hollow rock / Pallof |
| Trunk anti-lateral | Side plank | Side plank+LR | Copenhagen | Copenhagen |

### 6.5 Exercise swaps (between blocks, never within)
- Swap 2–3 exercises per block.
- Always change at least one lower-body pattern.
- Always carry hip stability work (SL hip bridge + band walk).
- Block 1→2: RDL→SL RDL, Step-up→Bulgarian SS, Lateral lunge→Cossack, Dead bug→Hollow hold, Side plank→Side plank+LR
- Block 2→3: Add tempo to Bulgarian SS and SL RDL, Hollow hold→Hollow rock, Side plank+LR→Copenhagen
- Block 3→4+: Phase-dependent (see Section 4)

### 6.6 Upper body rules
| Block | Volume | Exercises | RPE cap |
|---|---|---|---|
| 1 | 1 set | Push OR pull (pull default) | ≤5 |
| 2 | 2 sets total | Push + pull, 1 set each | ≤5 |
| 3 | 4–6 sets/week | Push + pull + shoulder stability across both sessions | ≤5 |
| 4 Base/Build | Same as Block 3 | Full upper block | ≤5 |
| 4 Specialty | 2–3 sets/week | Pull + shoulder stability | ≤5 |
| 4 Race | 1–2 sets/week | Shoulder stability only | ≤4 |
| 4 Transition | Optional | Light band work only | N/A |

**Always 3+ reps in reserve. No grinding. No failure. Upper DOMS affecting riding position = too much.**

### 6.7 Cycling compatibility
- S&C sessions: 24–48 h before easy rides only. Never before hard intervals or races.
- Race week or cycling >10 h/week: default to deload-level S&C or skip.
- Heavy legs on rides: attribute to S&C only if within 24–48 h of session AND cycling load was stable.

### 6.8 Missed week protocol
| Missed | Action |
|---|---|
| 1 week | Repeat that week before advancing |
| 2+ weeks in a block | Restart block from Week 1 |
| 4+ weeks | Drop back one full block |
| Any duration | Never skip the deload week |

### 6.9 Block exit criteria
- Complete all 4 weeks (including deload) before advancing.
- Do not advance if: deload RPE ≥6, or cycling performance degraded during the block.
- Rebuild Mode: automatically remains active until all 3 rebuild blocks are complete.
- Performance Mode: triggered automatically after Block 3 completion (or explicitly by user).

---

## 7. Feedback Adaptation Rules

### 7.1 Single-session response
- High fatigue (RPE ≥2 above plan, or explicit soreness): reduce reps 20–30%, remove last Lower exercise.
- Fresh + time available: add 2 reps per working set only. Never exceed time cap.

### 7.2 Escalation (consecutive high-fatigue sessions)
| Streak | Action |
|---|---|
| 1 | Adapt next session only |
| 2 | Initiate unplanned deload regardless of block position |
| 3 | Drop back to previous block Build week |
| Deload RPE ≥6 | Do not advance block |

### 7.3 Ride impact attribution
Attribute S&C-caused fatigue only if: timing is within 24–48 h of session AND cycling load was stable.

### 7.4 Block 3+ dual-session feedback
- Log Session A and Session B separately.
- Session A fatigue affects Session B that same week.
- Combined weekly fatigue affects following week.

### 7.5 Phase-change mid-block
If user changes cycling phase mid-block: regenerate remaining weeks for the new phase, starting from that week. Do not restart the block.

---

## 8. Environment Toggle (HOME / GYM)

| Setting | Equipment assumed |
|---|---|
| Home | 1–2 KBs or DBs, mini-band, floor, step/box |
| Gym | All of the above + barbell, trap bar, cable machines, benches, med balls |

Gym swaps (home key → gym key):
```
rdl           → trapBarDL
skaterSquat   → boxStepDown
bandHipSnap   → trapBarJump
dbHangClean   → trapBarJump
bandPullApart → cableFacePull
pushUp        → dbBenchPress
kbRow         → cableRow
faceYTW       → inclineBenchYTW
paloff        → cablePaloff
farmerCarry   → trapBarCarry
```

---

## 9. Data Architecture

### 9.1 Files
| File | Purpose |
|---|---|
| `sc-data.js` | All program data: exercises, blocks, system prompt, gym swaps |
| `Cyclist S&C Program.html` | Main React app — all UI components and state |
| `CLAUDE.md` | This file |

### 9.2 Exercise schema (`window.SC_EX`)
```js
{
  name: string,
  cat: 'mobility' | 'power-prep' | 'power-rfd' | 'lower' | 'upper' | 'core',
  icon: '◎' | '▲' | '⚡' | '◆' | '●' | '■',
  cues: string[],       // 4 coaching cues
  regression: string,
  progression: string,
}
```

### 9.3 Block schema (`window.SC_BLOCKS`)
```js
{
  id: number,
  label: string,           // "BLOCK 1"
  subtitle: string,        // "Foundation"
  weekRange: string,       // "Weeks 1–4"
  sessionDuration: string,
  sessionsPerWeek: number,
  equipment: string,
  goal: string,
  scheduling: string,
  structure: string,       // time breakdown string
  weeks: Week[],
  microNote?: string,      // Block 2 only
}
```

### 9.4 Week schema
Blocks 1–2: `{ n, theme, rpe, color, note, blocks[], micro? }`
Block 3+: `{ n, theme, rpe, color, note, sessions[] }`

Session: `{ label, dur, icon, blocks[] }`
Block: `{ name, dur, cat, exercises[] }`
Exercise: `{ ex, sets, reps, note }`

### 9.5 localStorage keys
| Key | Type | Description |
|---|---|---|
| `sc_completed` | `{ "b1-w1": bool }` | Week completion flags |
| `sc_missed` | `{ "b1-w2": bool }` | Missed week flags |
| `sc_feedbacks` | `{ "b1-w1": FeedbackObj }` | Per-week feedback + AI response |
| `sc_env` | `"home" \| "gym"` | Equipment environment |
| `sc_cycling_phase` | `"base" \| "build" \| "specialty" \| "race" \| "transition"` | Active cycling phase (Performance Mode only) |

Feedback key format:
- Blocks 1–2: `b${blockId}-w${weekN}`
- Block 3+: `b${blockId}-w${weekN}-A` or `b${blockId}-w${weekN}-B`

### 9.6 Gym swaps (`window.SC_GYM_SWAPS`)
Plain object mapping home exercise key → gym exercise key.
Applied at render time in `ExerciseCard` via React context (`EnvCtx`).

---

## 10. Component Architecture

### 10.1 Context providers
```
EnvCtx       React.createContext('home')    — environment toggle
```

### 10.2 Component tree
```
App
├── Header
│   ├── BlockTabs
│   ├── EnvToggle (HOME/GYM)
│   ├── ModeIndicator (REBUILD/PERFORMANCE)
│   └── PhaseSelector (Performance Mode only — 5 cycling phases)
├── BlockInfoCard
├── EscalationBanner (conditionally rendered)
├── WeekStrip (4 quick-toggle cards)
└── WeekCard[] (one per week)
    ├── SessionTabs (Block 3+ only — A/B)
    ├── CoachNote
    ├── BlockSection[]
    │   └── ExerciseCard[] (expandable — shows cues, regression, progression)
    ├── MicroSession (Block 2 only — 3 option tabs)
    ├── QuickSession (trimmed version on demand — ⚡ button)
    ├── ActionBar (MARK DONE / MISSED? / ⚡ QUICK / LOG FEEDBACK)
    └── FeedbackPanel (expandable — form + Claude response)
```

### 10.3 State (all in App, passed down as props)
```js
activeBlock     number           // which block tab is selected (0-indexed)
openWeek        number | null    // which week card is expanded
env             'home' | 'gym'
cyclingPhase    string | null    // null = not yet selected in Performance Mode
completed       Record<string, bool>
missed          Record<string, bool>
feedbacks       Record<string, FeedbackObj>
```

### 10.4 Derived state
```js
isPerformanceMode = activeBlock >= 3
escalationLevel   = count of consecutive high-RPE weeks in current block
blockProgress     = completed weeks / 4
```

---

## 11. AI Integration

### 11.1 Current implementation
`window.claude.complete({ messages, system })` — sandboxed, uses claude-haiku-4-5.

### 11.2 Production implementation
Replace with Anthropic SDK:
```js
import Anthropic from '@anthropic-ai/sdk';
const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });
```

Use `claude-haiku-4-5` for speed. Upgrade to `claude-sonnet-4-5` if response quality needs improving.

### 11.3 System prompt location
`window.SC_SYSTEM_PROMPT` in `sc-data.js`.
Covers all programming rules, phase logic, escalation, upper body caps, missed week protocol.

### 11.4 Prompt construction (per feedback submission)
The prompt dynamically includes:
- Block ID and week number
- Session label (A/B if Block 3+)
- Full session text (exercises × sets × reps)
- Athlete feedback (time, soreness, ride impact, RPE)
- Environment (home/gym)
- Cycling phase (Performance Mode)
- Escalation context (if streak ≥2)
- Next session (if not final week)

### 11.5 Response format contract
The AI must respond with these exact section labels (no markdown headers):
```
VERDICT: [GO AS PLANNED / ADJUST / UNPLANNED DELOAD / DROP BLOCK]
CHANGES: [bullet list or "None — proceed as planned"]
REASON: [1–2 sentences]
COACH NOTE: [one practical tip]
```
Parser in `FeedbackPanel.renderResult()` splits on these labels.

---

## 12. Known Technical Debt

| Issue | Severity | Fix |
|---|---|---|
| Babel standalone build | High | Replace with Vite + proper JSX |
| `window.*` globals | High | Convert to ES module imports |
| Dual gym data (sc-data.js + inline fallback) | Medium | Single source in production |
| localStorage only | High | Add backend for cross-device sync (see Section 13) |
| `window.claude.complete()` | High | Replace with real Anthropic SDK + server-side key |
| No auth | High | Add Clerk or Supabase Auth |
| No error boundaries | Medium | Wrap components in React error boundaries |
| No loading states for data | Low | Add skeleton screens |

---

## 13. Mobile + Cross-Device Sync

### Current behaviour
State stored in `localStorage` — per-device, no sync. Opening on a second device (phone) starts fresh.

### Recommended production stack
```
Frontend:    Next.js (App Router)
Auth:        Clerk or Supabase Auth
Database:    Supabase (PostgreSQL) or Firebase Firestore
Hosting:     Vercel (free tier covers this use case)
AI:          Anthropic API (server-side, API key in env var)
PWA:         Add manifest.json + service worker for iOS home screen install
```

### Data model (Supabase example)
```sql
users (id, email, created_at)

user_progress (
  id, user_id,
  block_id INT,
  week_n INT,
  session_label TEXT,   -- null, 'A', or 'B'
  completed BOOL,
  missed BOOL,
  feedback JSONB,       -- { time, soreness, ride, rpe, result, ts }
  created_at, updated_at
)

user_settings (
  user_id,
  env TEXT,             -- 'home' | 'gym'
  cycling_phase TEXT,   -- null | 'base' | 'build' | 'specialty' | 'race' | 'transition'
  active_block INT,
  updated_at
)
```

### iOS home screen (PWA)
Add to `<head>`:
```html
<link rel="manifest" href="/manifest.json">
<meta name="apple-mobile-web-app-capable" content="yes">
<meta name="apple-mobile-web-app-status-bar-style" content="black-translucent">
```

---

## 14. Future Work (Priority Order)

1. **Production build** — Vite + Next.js, Supabase, Clerk, Anthropic SDK
2. **Cross-device sync** — see Section 13
3. **PWA / iOS install** — home screen app experience
4. **Race calendar integration** — mark target event date; auto-adjust deload timing and phase
5. **Cycling volume input** — weekly hours slider; auto-scale S&C volume accordingly
6. **Print / PDF export** — single-page printable session card
7. **Progress charts** — RPE trend, completion rate, session streak
8. **Injury/limitation flags** — "knee pain", "shoulder issue" → substitute exercises
9. **Beyond-Phase-4 generation** — Claude generates new blocks on demand based on phase + feedback history
10. **Coach override mode** — let the user edit exercise prescriptions manually

---

## 15. Appendix — Exercise Categories

| Cat key | Display name | Colour | Icon | Used in |
|---|---|---|---|---|
| `mobility` | MOBILITY | Slate | ◎ | All blocks, all phases |
| `power-prep` | POWER PREP | Lime | ▲ | Blocks 1–3, Base/Build phases |
| `power-rfd` | POWER / RFD | Cyan | ⚡ | Specialty, Race phases |
| `lower` | LOWER | Amber | ◆ | All blocks, all phases |
| `upper` | UPPER | Purple | ● | All blocks, all phases |
| `core` | CORE | Red-orange | ■ | All blocks, all phases |
