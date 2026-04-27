# Handoff: Cyclist S&C Program — Production Build

## Overview

This is a **production build brief** for a cycling-specific strength & conditioning coaching app. A working React prototype already exists (see `prototype/` folder). The task is to rebuild it as a production Next.js application with real authentication, cross-device data sync, and a live Anthropic API integration.

The prototype is **high-fidelity** — it has final colours, typography, interactions, and AI logic. Use it as the visual and behavioural specification. Do not copy the Babel/standalone code directly; rebuild it properly in Next.js using the established patterns below.

---

## Tech Stack to Build

| Layer | Technology | Notes |
|---|---|---|
| Frontend | Next.js 14 (App Router) | TypeScript |
| Auth | Supabase Auth | Email/magic link — no passwords |
| Database | Supabase (PostgreSQL) | See schema below |
| AI | Anthropic SDK (`claude-haiku-4-5`) | Server-side only, API key in env |
| Hosting | Vercel | Already set up |
| PWA | next-pwa | iOS home screen install |

---

## What Already Exists (in `prototype/`)

| File | Purpose |
|---|---|
| `Cyclist S&C Program.html` | Full working prototype — visual + interaction reference |
| `sc-data.js` | **All program data**: exercises, 4 blocks, system prompt, gym swaps |
| `CLAUDE.md` | **Complete spec document** — read this before writing any code |

**Read `CLAUDE.md` in full before starting.** It is the authoritative specification for all programming logic, data schemas, AI prompt rules, and component contracts.

---

## Implementation Order

### Phase 1 — Scaffold
1. `npx create-next-app@latest cyclist-sc --typescript --app`
2. Install: `@supabase/supabase-js`, `@anthropic-ai/sdk`, `next-pwa`
3. Set up Supabase project, copy `SUPABASE_URL` + `SUPABASE_ANON_KEY` to `.env.local`
4. Add `ANTHROPIC_API_KEY` to `.env.local` (server-side only — never expose to client)
5. Deploy skeleton to Vercel, connect GitHub repo

### Phase 2 — Auth + Database
1. Enable Supabase Auth (magic link / email OTP)
2. Create tables (see schema below)
3. Enable Row Level Security on all tables
4. Build `/login` page (email input → magic link → redirect to `/`)

### Phase 3 — Core UI
Rebuild these components from the prototype:
- `BlockTabs` — 4 block tabs (B1–B4), each showing week range
- `WeekCard` — expandable, shows session blocks + action bar
- `ExerciseCard` — expandable, shows cues / regression / progression
- `BlockSection` — groups exercises under a named section
- `MicroSession` — Block 2 only, 3 option tabs (Hip Stability / Trunk / Lower Primer)
- `SessionTabs` — Block 3+ only, A/B session switcher
- `QuickSession` — strips Upper, cuts Core to 1 set, drops last Lower exercise
- `FeedbackPanel` — feedback form + Claude response renderer
- `EscalationBanner` — appears when `fatigueStreak >= 2`
- `EnvToggle` — HOME / GYM toggle (header)
- `PhaseSelector` — 5 cycling phases (Block 4+ only, Performance Mode)
- `ModeIndicator` — REBUILD MODE / PERFORMANCE MODE badge

### Phase 4 — AI Integration
Replace `window.claude.complete()` with a Next.js API route:

```ts
// app/api/coach/route.ts
import Anthropic from '@anthropic-ai/sdk';
const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

export async function POST(req: Request) {
  const { messages, system } = await req.json();
  const response = await client.messages.create({
    model: 'claude-haiku-4-5',
    max_tokens: 1024,
    system,
    messages,
  });
  return Response.json({ text: response.content[0].text });
}
```

The `system` prompt is in `window.SC_SYSTEM_PROMPT` (see `sc-data.js`). Copy it into a TypeScript constant. The prompt construction logic is in `FeedbackPanel` in the prototype — port it to a helper function.

### Phase 5 — Data sync
Replace `localStorage` with Supabase queries. See state management section below.

### Phase 6 — PWA
Add `manifest.json` and `next-pwa` config for iOS home screen install.

---

## Database Schema (Supabase)

```sql
-- Users are handled by Supabase Auth (auth.users)

create table user_settings (
  user_id uuid primary key references auth.users(id) on delete cascade,
  env text default 'home' check (env in ('home','gym')),
  cycling_phase text check (cycling_phase in ('base','build','specialty','race','transition')),
  active_block int default 1,
  updated_at timestamptz default now()
);

create table user_progress (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) on delete cascade,
  block_id int not null,
  week_n int not null,
  session_label text,        -- null for Blocks 1-2, 'A' or 'B' for Block 3+
  completed bool default false,
  missed bool default false,
  feedback jsonb,            -- { time, soreness, ride, rpe, result, ts }
  created_at timestamptz default now(),
  updated_at timestamptz default now(),
  unique (user_id, block_id, week_n, session_label)
);

-- Row level security
alter table user_settings enable row level security;
alter table user_progress enable row level security;

create policy "Users can only access own data" on user_settings
  for all using (auth.uid() = user_id);

create policy "Users can only access own data" on user_progress
  for all using (auth.uid() = user_id);
```

---

## State Management

### Prototype (localStorage) → Production (Supabase)

| Prototype key | Supabase table | Column |
|---|---|---|
| `sc_completed` | `user_progress` | `completed` |
| `sc_missed` | `user_progress` | `missed` |
| `sc_feedbacks` | `user_progress` | `feedback` |
| `sc_env` | `user_settings` | `env` |
| `sc_phase` | `user_settings` | `cycling_phase` |
| `activeBlock` | `user_settings` | `active_block` |

### Key format for progress records
- Blocks 1–2: `{ block_id, week_n, session_label: null }`
- Block 3+: `{ block_id, week_n, session_label: 'A' | 'B' }`

### Escalation logic
```ts
// Count consecutive high-fatigue weeks (rpe >= 7) going backwards in current block
function getEscalationLevel(feedbacks: FeedbackRecord[], blockId: number): number {
  const blockFeedbacks = feedbacks
    .filter(f => f.block_id === blockId)
    .sort((a, b) => b.week_n - a.week_n);
  let streak = 0;
  for (const fb of blockFeedbacks) {
    if (fb.feedback?.rpe >= 7) streak++;
    else break;
  }
  return streak;
}
```

---

## Program Data

All program data lives in `sc-data.js` in the prototype. Port it to TypeScript:

```ts
// lib/program-data.ts
export const SC_EX: Record<string, Exercise> = { /* from sc-data.js */ }
export const SC_BLOCKS: Block[] = [ /* from sc-data.js */ ]
export const SC_GYM_SWAPS: Record<string, string> = { /* from sc-data.js */ }
export const SC_SYSTEM_PROMPT: string = `...` // from sc-data.js
```

The gym swap is applied at render time: if `env === 'gym'` and `SC_GYM_SWAPS[exKey]` exists, render the gym exercise instead.

---

## Design Tokens

```css
--bg:         oklch(0.11 0.012 255);
--surface:    oklch(0.16 0.010 255);
--border:     oklch(0.24 0.010 255);
--text:       oklch(0.93 0.005 90);
--muted:      oklch(0.52 0.010 255);
--accent:     oklch(0.82 0.20 128);   /* lime green */
--amber:      oklch(0.78 0.16 60);    /* overload weeks */
--red:        oklch(0.65 0.18 25);    /* deload weeks */
--cyan:       oklch(0.72 0.18 200);   /* performance mode / RFD */
--purple:     oklch(0.70 0.15 290);   /* upper body / gym mode */
```

Fonts (Google Fonts): `Barlow Condensed` (headings, labels), `DM Sans` (body), `DM Mono` (numbers, tags).

---

## AI Prompt Contract

The system prompt (`SC_SYSTEM_PROMPT`) instructs Claude to always respond with:

```
VERDICT: [GO AS PLANNED / ADJUST / UNPLANNED DELOAD / DROP BLOCK]
CHANGES: [bullet list or "None — proceed as planned"]
REASON: [1–2 sentences]
COACH NOTE: [one practical tip]
```

The response parser splits on these exact labels. Do not change them.

The user-facing prompt dynamically includes: block ID, week number, session label, full session text, athlete feedback (time/soreness/ride/RPE), environment, cycling phase, escalation context, and next session plan.

---

## PWA Manifest

```json
{
  "name": "Cyclist S&C",
  "short_name": "S&C",
  "start_url": "/",
  "display": "standalone",
  "background_color": "#0d0e14",
  "theme_color": "#0d0e14",
  "icons": [
    { "src": "/icon-192.png", "sizes": "192x192", "type": "image/png" },
    { "src": "/icon-512.png", "sizes": "512x512", "type": "image/png" }
  ]
}
```

Add to `app/layout.tsx`:
```html
<meta name="apple-mobile-web-app-capable" content="yes">
<meta name="apple-mobile-web-app-status-bar-style" content="black-translucent">
```

---

## Environment Variables

```
# .env.local
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
ANTHROPIC_API_KEY=your_anthropic_api_key   # server-side only, no NEXT_PUBLIC_ prefix
```

Set these in Vercel dashboard under Project → Settings → Environment Variables.

---

## Files in this Package

| File | Description |
|---|---|
| `README.md` | This document |
| `CLAUDE.md` | Full programming spec — read before writing any code |
| `prototype/Cyclist S&C Program.html` | High-fidelity prototype — visual + interaction reference |
| `prototype/sc-data.js` | All program data (exercises, blocks, system prompt, gym swaps) |
