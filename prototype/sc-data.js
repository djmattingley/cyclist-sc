// ══════════════════════════════════════════════════════════════════════════
// CYCLIST S&C — PROGRAM DATA  (sc-data.js)
// ══════════════════════════════════════════════════════════════════════════

window.SC_COLOR_MAP = {
  accent:{ pill:"#a3e635", text:"#0d1a00", glow:"oklch(0.82 0.20 128/0.18)", border:"oklch(0.82 0.20 128/0.35)" },
  amber: { pill:"#fbbf24", text:"#1a0d00", glow:"oklch(0.78 0.16 60/0.18)",  border:"oklch(0.78 0.16 60/0.35)" },
  red:   { pill:"#f87171", text:"#1a0000", glow:"oklch(0.65 0.18 25/0.18)",  border:"oklch(0.65 0.18 25/0.35)" },
};

window.SC_CAT_COLORS = {
  mobility:    { bg:"oklch(0.52 0.01 255/0.12)", accent:"oklch(0.60 0.01 255)" },
  "power-prep":{ bg:"oklch(0.82 0.20 128/0.08)", accent:"oklch(0.82 0.20 128)" },
  "power-rfd": { bg:"oklch(0.72 0.18 200/0.10)", accent:"oklch(0.72 0.18 200)" },
  lower:       { bg:"oklch(0.78 0.16 60/0.08)",  accent:"oklch(0.78 0.16 60)" },
  upper:       { bg:"oklch(0.70 0.15 290/0.08)", accent:"oklch(0.70 0.15 290)" },
  core:        { bg:"oklch(0.65 0.18 25/0.08)",  accent:"oklch(0.65 0.18 25)" },
};

// ── Exercise library ───────────────────────────────────────────────────────
window.SC_EX = {
  // MOBILITY ────────────────────────────────────────────────────
  hip9090:{ name:"Hip 90/90 Flow", cat:"mobility", icon:"◎",
    cues:["Sit tall, both knees at 90°","Rotate hips from front shin to back shin with control","Breathe into each position before rotating","Let the hip open — don't force it"],
    regression:"Seated figure-4 static hold 30 s/side", progression:"Lean forward over front shin to deepen hip flexor" },
  worldGreatest:{ name:"World's Greatest Stretch", cat:"mobility", icon:"◎",
    cues:["Lunge forward, place same-side hand inside foot","Rotate thoracic spine — reach elbow to sky","Keep back knee low","Move fluidly, don't rush the rotation"],
    regression:"Split stance hip flexor stretch only", progression:"Rearfoot elevated variant" },
  heelDrop:{ name:"Heel Drop + Ankle Circle", cat:"mobility", icon:"◎",
    cues:["Stand on step edge, lower heel slowly below platform","Circle ankle fully before raising","Keep shin vertical","8 each direction per side"],
    regression:"Flat-ground ankle circles only", progression:"Single-leg balance challenge on the raise" },
  thoracicRot:{ name:"Thoracic Rotation", cat:"mobility", icon:"◎",
    cues:["Side-lying, knees stacked at 90°, arms straight ahead","Rotate top arm overhead to the floor — follow with eyes","Hold 2 s at end range","Breathe out as you rotate"],
    regression:"Seated thoracic rotation, arms crossed", progression:"Add a reach at end range; open book" },

  // POWER PREP ──────────────────────────────────────────────────
  slhb:{ name:"Single-Leg Hip Bridge", cat:"power-prep", icon:"▲",
    cues:["Drive through planted heel, not toes","Squeeze glute hard at top","Keep pelvis level — free hip stays up","2 s controlled descent"],
    regression:"Bilateral hip bridge, same tempo", progression:"2 s pause at top; marching at top" },
  lateralBand:{ name:"Lateral Band Walk", cat:"power-prep", icon:"▲",
    cues:["Mini-band just above knees, hip-width stance","Stay in quarter-squat throughout","Resist band pulling knees in","Step wide, feet together — don't shuffle"],
    regression:"No band, bodyweight lateral step", progression:"Wider steps; band around ankles" },
  skaterSquat:{ name:"Skater Squat (Assisted)", cat:"power-prep", icon:"▲",
    cues:["Hold light support — door frame or band","Single leg, lower rear knee toward floor","Control the descent — it's a loaded single-leg squat","Drive back up through the heel"],
    regression:"Slow step-up with controlled eccentric", progression:"Remove assistance; eventually add load" },

  // LOWER — Block 1 (anchors) ────────────────────────────────────
  rdl:{ name:"Romanian Deadlift", cat:"lower", icon:"◆",
    cues:["Hinge at hips — push back, not down","Soft knees, weight over mid-foot","Bar or dumbbells close to legs throughout","Stop at hamstring tension, before back rounds"],
    regression:"Bodyweight good morning — arms crossed", progression:"3 s eccentric; swap for SL RDL in Block 2" },
  stepUp:{ name:"Step-Up", cat:"lower", icon:"◆",
    cues:["Drive through heel of working leg — not bottom foot","Control descent — 2 s down","Stand fully upright at top","Keep pelvis level throughout"],
    regression:"Reduce box height to 20–25 cm", progression:"1 s pause at top; Bulgarian SS in Block 2" },
  lateralLunge:{ name:"Lateral Lunge", cat:"lower", icon:"◆",
    cues:["Push hips back as you step wide — hinge, not squat","Keep planted foot flat, knee over toes","Chest up, slight forward lean is fine","Drive back through working heel"],
    regression:"Reduce range — shorten step width", progression:"Goblet hold; 2 s pause; Cossack squat Block 2" },
  calfRaise:{ name:"Single-Leg Calf Raise", cat:"lower", icon:"◆",
    cues:["Lower heel below step — full range","Rise over 2 s, pause 1 s at top","Really squeeze at top","Use wall for balance only"],
    regression:"Bilateral calf raise, same tempo", progression:"Increase pause to 3 s; add load Block 2" },

  // LOWER — Block 2 swaps ────────────────────────────────────────
  slRDL:{ name:"Single-Leg RDL", cat:"lower", icon:"◆",
    cues:["Stand on one leg, hinge forward with flat back","Free leg tracks back as counterbalance","Feel hamstring load in standing leg","Drive hip through to return — don't pull with back"],
    regression:"Romanian deadlift bilateral", progression:"KB in opposite hand; load increases Block 3" },
  bulgarianSS:{ name:"Bulgarian Split Squat", cat:"lower", icon:"◆",
    cues:["Rear foot elevated hip-height, front foot far enough forward","Lower straight down — not forward","Keep torso upright, drive through front heel","2 s eccentric from Week 6"],
    regression:"Step-up or reverse lunge", progression:"Add load — KB goblet hold; tempo Block 3" },
  cossack:{ name:"Cossack Squat", cat:"lower", icon:"◆",
    cues:["Wide stance, shift weight to one side, toes up on straight leg","Hinge into the working hip as you lower","Keep working heel flat","Push back up through heel"],
    regression:"Lateral lunge, reduced range", progression:"Add KB goblet hold; slow eccentric" },

  // LOWER — Block 3 progressions ─────────────────────────────────
  tempoBulgarian:{ name:"Tempo Bulgarian Split Squat", cat:"lower", icon:"◆",
    cues:["3 s eccentric — deliberate and slow","Pause 1 s at bottom — no bounce","Drive up through front heel with intent","Keep torso tall throughout"],
    regression:"Bulgarian split squat without tempo", progression:"Add load — KB in each hand" },

  // UPPER ────────────────────────────────────────────────────────
  bandPullApart:{ name:"Band Pull-Apart", cat:"upper", icon:"●",
    cues:["Light band at shoulder height","Pull apart until arms are wide — squeeze shoulder blades","Control the return — don't let it snap back","Elbows soft, not locked"],
    regression:"Face pull into wall-mounted band", progression:"Increase tension; 2 s hold at end range" },
  pushUp:{ name:"Push-Up", cat:"upper", icon:"●",
    cues:["Hands just wider than shoulder-width","Straight line from ears to heels — no hips sagging","Lower chest to floor over 2 s","Push through the heel of each hand"],
    regression:"Incline push-up on bench or counter", progression:"3 s eccentric + 1 s pause; add load Block 2" },
  kbRow:{ name:"Single-Arm KB Row", cat:"upper", icon:"●",
    cues:["Hinge to ~45°, free hand on knee","Drive elbow back — not up","Shoulder blade retracts at top","Keep hips square throughout"],
    regression:"Resistance band seated row", progression:"Heavier load; 3 s eccentric on lower phase" },
  faceYTW:{ name:"Y-T-W (Shoulder Stability)", cat:"upper", icon:"●",
    cues:["Prone on floor or incline bench, thumbs up throughout","Y — arms overhead at 45°, hold 2 s","T — arms out sideways, hold 2 s","W — elbows bent, squeeze 2 s"],
    regression:"Band pull-apart only", progression:"Add light plates (0.5–1 kg); longer holds" },

  // CORE ─────────────────────────────────────────────────────────
  deadBug:{ name:"Dead Bug", cat:"core", icon:"■",
    cues:["Press lower back into floor — maintain throughout","Extend opposite arm and leg simultaneously","Exhale as limbs extend","Return to start before switching sides"],
    regression:"Extend arms only, feet planted", progression:"Resistance band across thighs; 3 s extend" },
  sidePlank:{ name:"Side Plank Hold", cat:"core", icon:"■",
    cues:["Stack feet or stagger for stability","Drive hips up — don't sag","Top arm long, eyes forward, breathe","Squeeze glutes throughout"],
    regression:"Modified side plank — knees bent", progression:"Add hip dip; leg raise Block 2" },
  hollowHold:{ name:"Hollow Hold", cat:"core", icon:"■",
    cues:["Press lower back into floor — remove the arch","Arms overhead, legs extended low","Breathe shallow — maintain position","Tuck chin slightly"],
    regression:"Bent-knee hollow hold (knees at 90°)", progression:"Hollow rock Block 3" },
  sidePlankLR:{ name:"Side Plank + Leg Raise", cat:"core", icon:"■",
    cues:["Hold a solid side plank first","Raise top leg to hip height — pause 1 s","Lower under control","Hips stay stacked throughout"],
    regression:"Side plank static hold", progression:"Copenhagen plank Block 3" },
  paloff:{ name:"Pallof Press", cat:"core", icon:"■",
    cues:["Band at chest height, step sideways for tension","Press hands away — resist rotation","Pause 2 s at full extension","Keep hips and shoulders square"],
    regression:"Reduce band tension; hold at chest without pressing", progression:"3 s pause; overhead Pallof variation" },
  farmerCarry:{ name:"Farmer Carry (Suitcase)", cat:"core", icon:"■",
    cues:["Heavy load in one hand — suitcase carry","Stand tall, don't lean away","Short quick steps, tight core","Anti-lateral flexion — resist the pull"],
    regression:"Lighter load or shorter distance", progression:"Heavier load; longer distance" },
  hollowRock:{ name:"Hollow Rock", cat:"core", icon:"■",
    cues:["Start from a solid hollow hold","Rock forward and back — keep the shape","Shoulders and legs move together","Control each end range — no crashing"],
    regression:"Hollow hold static", progression:"Slow the rock; increase reps" },
  copenhagan:{ name:"Copenhagen Plank", cat:"core", icon:"■",
    cues:["Side plank with top foot on bench or chair","Drive hips up — straight line head to feet","Bottom leg can rest or hover","Breathe — don't hold your breath"],
    regression:"Side plank + leg raise", progression:"Adduct bottom leg to meet top; extend duration" },

  // ── POWER / RFD ────────────────────────────────────────────
  bandHipSnap:{ name:"Band Hip Snap", cat:"power-rfd", icon:"⚡",
    cues:["Band anchored behind you at hip height","Start hinged — hips loaded back, slight knee bend","Explosive hip extension — snap hips through to standing with intent","Absorb back to start under control — 2 s return"],
    regression:"Single-leg hip bridge with 2 s pause at top", progression:"Heavier band; add a jump at top (gym: trap-bar jump)" },
  dbHangClean:{ name:"DB Hang Clean (Light)", cat:"power-rfd", icon:"⚡",
    cues:["DBs at hip crease, slight hinge","Explosive triple extension — ankle, knee, hip simultaneously","Pull DBs up — catch in a quarter squat, absorb the landing","Full reset each rep — quality beats speed"],
    regression:"Romanian deadlift (controlled)", progression:"Trap-bar jump (gym); marginally increase load" },

  // ── GYM VARIANTS ─────────────────────────────────────────────
  trapBarJump:{ name:"Trap-Bar Jump", cat:"power-rfd", icon:"⚡",
    cues:["Light load only — 20–40% of your trap-bar DL max","Explosive intent on every single rep — no half-measures","Land softly — absorb through hips and knees","Full reset between reps — this is not a squat jump"],
    regression:"DB hang clean", progression:"Slightly increase load; reactive bounding" },
  mbChestThrow:{ name:"Med Ball Chest Throw", cat:"power-rfd", icon:"⚡",
    cues:["Stand ~1 m from a solid wall, med ball at chest","Explosive chest press — full body drive behind every throw","Catch and reset — don't chase speed with slop","Max intent each throw — fewer reps, better quality"],
    regression:"Push-up with explosive push phase", progression:"Heavier ball; step back to increase flight time" },
  trapBarDL:{ name:"Trap-Bar Deadlift", cat:"lower", icon:"◆",
    cues:["Stand inside bar, feet hip-width, handles at sides","Hinge and grip — chest up, hips back, arms straight","Drive through both feet simultaneously","Keep the bar close — don't let it drift forward"],
    regression:"Romanian deadlift (bilateral)", progression:"Add load; single-leg trap-bar RDL Block 3+" },
  boxStepDown:{ name:"Box Step-Down", cat:"power-prep", icon:"▲",
    cues:["Stand on box edge, working foot on box, free foot hanging","Lower the free heel toward the floor under control — 3 s","Working leg absorbs all the load — don't plop down","Return to standing by driving through the working heel"],
    regression:"Assisted skater squat", progression:"Higher box; add light load" },
  cableFacePull:{ name:"Cable Face Pull", cat:"upper", icon:"●",
    cues:["Cable at eye height, rope attachment","Pull to forehead — elbows high and wide","Externally rotate at end — thumbs back, pause 1 s","Control the return over 2 s"],
    regression:"Band pull-apart", progression:"Increase load; 2 s hold at end range" },
  dbBenchPress:{ name:"DB Bench Press", cat:"upper", icon:"●",
    cues:["Feet flat on floor, natural arch in back","Lower DBs to chest over 2 s — elbows ~45° from torso","Drive up through the heel of each hand","DBs meet at top — don't let them drift over your face"],
    regression:"Push-up (floor)", progression:"Increase load; single-arm DB press" },
  cableRow:{ name:"Seated Cable Row", cat:"upper", icon:"●",
    cues:["Sit tall, slight forward lean at start","Drive elbows back to ribs — not up","Squeeze shoulder blades hard at end range","Control the return over 2 s — don't let cable pull you forward"],
    regression:"Single-arm KB row", progression:"Increase load; 3 s eccentric" },
  inclineBenchYTW:{ name:"Incline Bench Y-T-W", cat:"upper", icon:"●",
    cues:["Prone on incline bench (~45°), thumbs up throughout","Y — reach overhead at 45°, hold 2 s","T — arms out sideways, hold 2 s","W — elbows bent, pull back, squeeze shoulder blades, hold 2 s"],
    regression:"Floor Y-T-W bodyweight", progression:"Add light plates (0.5–1 kg); longer holds" },
  cablePaloff:{ name:"Cable Pallof Press", cat:"core", icon:"■",
    cues:["Cable at chest height, stand sideways to the stack","Press straight out — resist the rotation","Pause 2 s at full extension","Keep hips and shoulders square throughout"],
    regression:"Band Pallof press", progression:"3 s pause; overhead cable Pallof variation" },
  trapBarCarry:{ name:"Trap-Bar Farmer Carry", cat:"core", icon:"■",
    cues:["Stand inside trap bar — load heavier than a KB carry","Stand tall, brace hard","Short quick steps — don't waddle","Anti-lateral flexion — this is trunk work, not a stroll"],
    regression:"KB suitcase carry (one side)", progression:"Heavier load; longer distance" },
};

// ── Gym exercise swaps (home key → gym key) ────────────────────────────────
window.SC_GYM_SWAPS = {
  rdl:           'trapBarDL',
  skaterSquat:   'boxStepDown',
  bandHipSnap:   'trapBarJump',
  dbHangClean:   'trapBarJump',
  bandPullApart: 'cableFacePull',
  pushUp:        'dbBenchPress',
  kbRow:         'cableRow',
  faceYTW:       'inclineBenchYTW',
  paloff:        'cablePaloff',
  farmerCarry:   'trapBarCarry',
};

// ── Helpers ────────────────────────────────────────────────────────────────
window.SC_sessionToText = function(blocks) {
  if (!blocks) return "(no session data)";
  return blocks.map(b => {
    const lines = b.exercises.map(e => {
      const ex = window.SC_EX[e.ex];
      const name = ex ? ex.name : e.ex;
      const vol = e.sets ? e.sets+" × "+e.reps : e.reps;
      return "    - "+name+": "+vol+(e.note?" ("+e.note+")":"");
    }).join("\n");
    return "  "+b.name+" ("+b.dur+"):\n"+lines;
  }).join("\n");
};

window.SC_getEscalationLevel = function(feedbacks, blockId) {
  // Count consecutive high-fatigue weeks (rpe >= 7) going backwards through current block
  let streak = 0;
  const prefix = "b"+blockId+"-";
  const relevant = Object.entries(feedbacks)
    .filter(([k]) => k.startsWith(prefix))
    .sort(([a],[b]) => b.localeCompare(a)); // most recent first
  for (const [, fb] of relevant) {
    if (fb && fb.rpe >= 7) streak++;
    else break;
  }
  return streak; // 0=normal, 1=watch, 2=unplanned deload, 3+=drop block
};

// ── System prompt ──────────────────────────────────────────────────────────
window.SC_SYSTEM_PROMPT = `You are a cycling-specific strength & conditioning coach.

ATHLETE PROFILE:
Experienced cyclist (5–10 years), detrained since March. Limited time (young family, demanding job).
Block 1: 1×20 min/week → Block 2: 1×30 min + micro → Block 3: 2×30–35 min/week → Block 4+: 2×35–45 min (phase-dependent).
Strong S&C background — adapts faster than a true beginner, but start conservative.

═══ SYSTEM MODES ══════════════════════════════════════════════════════════════════

REBUILD MODE (Blocks 1–3):
Active when returning from layoff or detraining. ALWAYS takes precedence over cycling phase.
Goal: restore movement quality, tendon tolerance, trunk stiffness, hinge/single-leg strength, consistency.
Cycling phase = optional context only. Do NOT let it override the rebuild block progression.
Automatically exits after Block 3 deload is complete.

PERFORMANCE MODE (Block 4+):
Active after completing Blocks 1–3. Must ask cycling phase before generating any session.
Cycling phase determines all session parameters. Preserve phase unless user changes it.
If phase changes mid-block: regenerate remaining weeks for new phase from that point.

═══ CYCLING PHASES (Performance Mode only) ══════════════════════════════════

BASE: High volume (2–3 sets), 40–45 min. Strength dev, technique, trunk stiffness. Upper: push+pull+stability 1–2 sets RPE≤5. Deload every 4th week.

BUILD: Moderate volume (2 sets), 35–40 min. Maintain strength, low-impact power prep. Avoid all DOMS. Upper: push+pull 1 set RPE≤5. Deload every 4th week.

SPECIALTY: Reduced volume (1–2 sets), 30–35 min. Maintain strength, increase velocity. Introduce Power/RFD (banded hip snap, DB hang clean). Upper: pull + shoulder stability 1 set RPE≤5. Deload every 3rd week.

RACE: Very low volume (1 set), 30–35 min. FRESHNESS IS EVERYTHING. Power/RFD only — no strength accumulation. Sessions must leave athlete feeling better, not fatigued. Upper: shoulder stability only (Y-T-W, face pull) 1 set RPE≤4. AVOID anything risking DOMS. Deload every 2nd week.

TRANSITION: Minimal. Mobility + 1–2 optional light movements only. 15–20 min max. No RPE targets. Focus: tissue health, mental recovery. 2–4 weeks, then reassess.

═══ BLOCK STRUCTURE ══════════════════════════════════════════════════════════════════

4-week blocks: Build (RPE 5) → Load (RPE 5–6) → Overload (RPE 6) → Deload (RPE 4–5).
RPE is session average. Section ceilings: Mobility ≤3, Power Prep/RFD ≤5–6, Lower ≤6, Upper ≤5 (≤4 in Race), Core ≤6.
Within-block: reps + TUT/tempo only. Load changes only between blocks.
Deload: keep duration, drop to Build-week reps, remove all tempo constraints.

SESSION TIME TEMPLATES:
Block 1 (20 min): Mobility 3 + Power Prep 4 + Lower 7 + Upper 2 + Core 4
Block 2 (30 min): Mobility 4 + Power Prep 5 + Lower 12 + Upper 4 + Core 5
Block 3A (35 min): Mobility 4 + Power Prep 5 + Lower 16 + Upper 5 + Core 5
Block 3B (30 min): Mobility 3 + Hip Stability 8 + Lower Acc 8 + Core+Carry 7 + Upper Pull 4
Block 4 Base A (40 min): Mobility 4 + Power Prep 6 + Lower 16 + Upper 5 + Core 9
Block 4 Specialty/Race A (35 min): Mobility 5 + Power/RFD 10 + Lower 10 + Upper 4 + Core 6

TIME PRIORITISATION (if short): 1. Upper, 2. Core to 1 set each, 3. Last Lower exercise, 4. Power to 1 round. NEVER shorten Mobility.

═══ PROGRAMMING RULES ══════════════════════════════════════════════════════════════════

POWER PREP (Blocks 1–3, Base/Build): Low-load activation only. SL hip bridge, lateral band walk, assisted skater squat. NO plyometrics.

POWER/RFD (Specialty, Race): Low-load, high-velocity. Banded hip snap, DB hang clean (light), trap-bar jump (gym), med ball throw. NOT: heavy jumps, anything risking DOMS.

EXERCISE ANCHORS (never drop, only vary):
- Hinge: RDL → SL RDL → Tempo SL RDL (maintain in B4)
- Single-leg squat: Step-up → Bulgarian SS → Tempo Bulgarian SS (reduce volume in Race)
- Hip stability: SL hip bridge + lateral band walk (ALWAYS present, every session)
- Trunk anti-extension: Dead bug → Hollow hold → Hollow rock
- Trunk anti-lateral: Side plank → Side plank+LR → Copenhagen

UPPER BODY CAPS: B1=1 set. B2=2 sets. B3=4–6 sets/week. Base/Build=same. Specialty=2–3 sets (pull only). Race=1–2 sets (stability only). Always 3+ RIR. No failure.

MISSED WEEK: 1 week → repeat. 2+ in block → restart W1. 4+ weeks → drop one full block. Never skip deload.

CYCLING COMPAT: 24–48 h before easy rides only. Race week or >10 h/week → deload or skip. Heavy legs: attribute to S&C only if timing (<48 h) AND stable cycling load both match.

═══ FEEDBACK ESCALATION ══════════════════════════════════════════════════════════════════

1 high-fatigue week: reps −20–30%, remove last Lower, Upper ≤1 set.
2 consecutive: unplanned deload.
3 consecutive: drop back to previous block Build week.
Deload RPE ≥6: do not advance block.
Fresh + time: +2 reps per set only. Never exceed time cap.
Block 3+: A and B separate. A fatigue affects B that week. Phase change mid-block: regenerate remaining weeks.

BLOCK STRUCTURE:
4-week blocks: Build (RPE 5) → Load (RPE 5–6) → Overload (RPE 6) → Deload (RPE 4–5).
RPE is session average. Section ceilings: Mobility ≤3, Power Prep ≤5, Lower ≤6, Upper ≤5, Core ≤6.
Within-block progression: reps + TUT/tempo only. Load increases only between blocks, never within.
Deload: keep duration, drop reps to Build levels, remove all tempo constraints.

SESSION TIME TEMPLATES:
Block 1 (20 min): Mobility 3 + Power Prep 4 + Lower 7 + Upper 2 + Core 4
Block 2 (30 min): Mobility 4 + Power Prep 5 + Lower 12 + Upper 4 + Core 5
Block 3A (35 min): Mobility 4 + Power Prep 5 + Lower 16 + Upper 5 + Core 5
Block 3B (30 min): Mobility 3 + Hip Stability 8 + Lower Accessory 8 + Core+Carry 7 + Upper Pull 4

TIME PRIORITISATION (if running short — drop in this order):
1. Upper body first. 2. Core to 1 set each. 3. Last Lower exercise. 4. Power Prep to 1 round.
Never shorten Mobility.

POWER PREP (low-load neuromuscular activation only):
Acceptable: SL hip bridge, lateral band walk, assisted skater squat, step-up variations.
Not acceptable: depth jumps, bilateral plyometrics, bounding, box jumps.

UPPER BODY RULES:
Block 1: push OR pull, 1 set, RPE ≤5. Default to pull. Add push in Load/Deload weeks.
Block 2: push + pull, 1 set each, RPE ≤5. Volume cap = 2 sets total.
Block 3: push + pull + shoulder stability (Y-T-W, face pull), 1–2 sets each. Optional arm accessory 1 set max.
Volume cap = 4–6 sets/week across both Block 3 sessions.
Always 3+ reps in reserve. No grinding. No failure. Upper DOMS affecting riding position = too much.

EXERCISE ANCHORS (variation changes block-to-block, intent never changes):
Hinge: RDL → SL RDL → Tempo SL RDL
Single-leg squat: Step-up → Bulgarian SS → Tempo Bulgarian SS
Hip stability: SL hip bridge + lateral band walk (always present in every session)
Trunk anti-extension: Dead bug → Hollow hold → Hollow rock
Trunk anti-lateral: Side plank → Side plank+LR → Copenhagen plank

EXERCISE SWAPS (between blocks only, never within a block):
Block 1→2: RDL→SL RDL, Step-up→Bulgarian SS, Lateral lunge→Cossack, Dead bug→Hollow hold, Side plank→Side plank+LR
Block 2→3: Add tempo to Bulgarian SS and SL RDL, Hollow hold→Hollow rock, Side plank+LR→Copenhagen plank
Always swap 2–3 exercises. Always change at least one lower pattern. Always carry hip stability work.

MISSED WEEK PROTOCOL:
1 week missed → repeat that week before advancing.
2+ weeks missed in a block → restart block from Week 1.
4+ weeks missed → drop back one full block.
Never skip deload — it is the most important week of any block.

CYCLING COMPATIBILITY:
S&C 24–48 h before easy rides only. Never before hard intervals or races.
Race week or cycling >10 h/week → default to deload-level S&C or skip entirely.
Heavy legs on rides → attribute to S&C only if within 24–48 h of session AND cycling load was stable.

BLOCK EXIT CRITERIA:
Complete all 4 weeks (including deload) before advancing.
Do not advance if: deload RPE was ≥6, or cycling performance degraded during the block.

FEEDBACK ESCALATION:
High fatigue = athlete-reported RPE ≥ 2 above planned, or explicit soreness/fatigue report.
1 high-fatigue week: adapt next week only (reps −20–30%, remove last Lower exercise, Upper stays 1 set).
2 consecutive: initiate unplanned deload regardless of block position.
3 consecutive: drop back to previous block Build week.
Deload RPE ≥6: do not advance block.
Fresh + time available: add 2 reps per working set only. No new exercises, no extra sets, never exceed time cap.
Block 3: log Session A and B separately. A fatigue affects B that same week.

RESPONSE FORMAT — use these exact labels, no markdown headers:
VERDICT: [GO AS PLANNED / ADJUST / UNPLANNED DELOAD / DROP BLOCK]
CHANGES: [bullet list, or "None — proceed as planned"]
REASON: [1–2 sentences]
COACH NOTE: [one practical tip]

Be concise and direct. No fluff.

RESPONSE FORMAT — exact labels, no markdown headers:
VERDICT: [GO AS PLANNED / ADJUST / UNPLANNED DELOAD / DROP BLOCK]
CHANGES: [bullet list or “None — proceed as planned”]
REASON: [1–2 sentences]
COACH NOTE: [one practical tip]`;

// ── Program blocks ─────────────────────────────────────────────────────────
window.SC_BLOCKS = [

// ═══════════════════════════════════════════════════════════ BLOCK 1 ═══════
{
  id:1, label:"BLOCK 1", subtitle:"Foundation",
  weekRange:"Weeks 1–4", sessionDuration:"20 min", sessionsPerWeek:1,
  equipment:"Light dumbbells or KBs, mini-band, floor",
  goal:"Re-establish movement patterns, joint prep, and neuromuscular activation after a detraining period. Zero DOMS, cycling-compatible throughout.",
  scheduling:"Schedule 24–48 h before easy rides. Never before hard intervals.",
  structure:"Mobility 3 + Power Prep 4 + Lower 7 + Upper 2 + Core 4",
  weeks:[
    { n:1, theme:"Build", rpe:"5", color:"accent",
      note:"First session back. Quality over everything — if anything feels off, regress immediately. 3–4 reps in reserve at all times.",
      blocks:[
        { name:"Mobility & Prep", dur:"3 min", cat:"mobility", exercises:[
          {ex:"hip9090",sets:null,reps:"60 s",note:"Continuous flow"},
          {ex:"worldGreatest",sets:null,reps:"4/side",note:null},
          {ex:"heelDrop",sets:null,reps:"8/side",note:null}]},
        { name:"Power Prep", dur:"4 min", cat:"power-prep", exercises:[
          {ex:"slhb",sets:"2",reps:"6/side",note:"Minimal rest between sides"},
          {ex:"lateralBand",sets:"2",reps:"8 steps/side",note:"Rest 15 s"}]},
        { name:"Lower Strength", dur:"7 min", cat:"lower", exercises:[
          {ex:"rdl",sets:"1",reps:"8",note:"Light load or bodyweight"},
          {ex:"stepUp",sets:"1",reps:"8/side",note:"Box ~30 cm"},
          {ex:"lateralLunge",sets:"1",reps:"8/side",note:null},
          {ex:"calfRaise",sets:"1",reps:"12/side",note:null}]},
        { name:"Upper", dur:"2 min", cat:"upper", exercises:[
          {ex:"bandPullApart",sets:"1",reps:"12",note:"Pull focus — cyclists are anterior-chain dominant"}]},
        { name:"Core", dur:"4 min", cat:"core", exercises:[
          {ex:"deadBug",sets:"2",reps:"5/side",note:"Rest 30 s"},
          {ex:"sidePlank",sets:"2",reps:"20 s/side",note:"Rest 20 s"}]},
      ]},
    { n:2, theme:"Load", rpe:"5–6", color:"accent",
      note:"Same exercises, slightly more reps. Finish each set with 3 in reserve. Nothing should burn out.",
      blocks:[
        { name:"Mobility & Prep", dur:"3 min", cat:"mobility", exercises:[
          {ex:"hip9090",sets:null,reps:"60 s",note:null},
          {ex:"worldGreatest",sets:null,reps:"5/side",note:null},
          {ex:"heelDrop",sets:null,reps:"10/side",note:null}]},
        { name:"Power Prep", dur:"4 min", cat:"power-prep", exercises:[
          {ex:"slhb",sets:"2",reps:"8/side",note:null},
          {ex:"lateralBand",sets:"2",reps:"10 steps/side",note:null}]},
        { name:"Lower Strength", dur:"7 min", cat:"lower", exercises:[
          {ex:"rdl",sets:"1",reps:"10",note:null},
          {ex:"stepUp",sets:"1",reps:"10/side",note:null},
          {ex:"lateralLunge",sets:"1",reps:"10/side",note:null},
          {ex:"calfRaise",sets:"1",reps:"15/side",note:null}]},
        { name:"Upper", dur:"2 min", cat:"upper", exercises:[
          {ex:"pushUp",sets:"1",reps:"8",note:"Push pattern — alternates with pull each week"}]},
        { name:"Core", dur:"4 min", cat:"core", exercises:[
          {ex:"deadBug",sets:"2",reps:"6/side",note:null},
          {ex:"sidePlank",sets:"2",reps:"25 s/side",note:null}]},
      ]},
    { n:3, theme:"Overload", rpe:"6", color:"amber",
      note:"Top week. Add 3 s eccentric to RDL and step-up. The slow lowering is where the stimulus lives. Still finish each set comfortable.",
      blocks:[
        { name:"Mobility & Prep", dur:"3 min", cat:"mobility", exercises:[
          {ex:"hip9090",sets:null,reps:"75 s",note:"Spend longer in tight positions"},
          {ex:"worldGreatest",sets:null,reps:"5/side",note:null},
          {ex:"heelDrop",sets:null,reps:"10/side",note:null}]},
        { name:"Power Prep", dur:"4 min", cat:"power-prep", exercises:[
          {ex:"slhb",sets:"2",reps:"8/side",note:"2 s pause at top"},
          {ex:"lateralBand",sets:"2",reps:"12 steps/side",note:null}]},
        { name:"Lower Strength", dur:"7 min", cat:"lower", exercises:[
          {ex:"rdl",sets:"1",reps:"12",note:"3 s eccentric"},
          {ex:"stepUp",sets:"1",reps:"10/side",note:"3 s descent"},
          {ex:"lateralLunge",sets:"1",reps:"12/side",note:"2 s pause at bottom"},
          {ex:"calfRaise",sets:"1",reps:"15/side",note:"3 s up, 2 s pause at top"}]},
        { name:"Upper", dur:"2 min", cat:"upper", exercises:[
          {ex:"kbRow",sets:"1",reps:"8/side",note:"3 s eccentric on lower phase"}]},
        { name:"Core", dur:"4 min", cat:"core", exercises:[
          {ex:"deadBug",sets:"2",reps:"8/side",note:"3 s limb extension"},
          {ex:"sidePlank",sets:"2",reps:"30 s/side",note:null}]},
      ]},
    { n:4, theme:"Deload", rpe:"4–5", color:"red",
      note:"Pull back. Adaptation happens during recovery. Build-week reps, no tempo. This week protects Block 2.",
      blocks:[
        { name:"Mobility & Prep", dur:"3 min", cat:"mobility", exercises:[
          {ex:"hip9090",sets:null,reps:"60 s",note:null},
          {ex:"worldGreatest",sets:null,reps:"4/side",note:null},
          {ex:"heelDrop",sets:null,reps:"8/side",note:null}]},
        { name:"Power Prep", dur:"4 min", cat:"power-prep", exercises:[
          {ex:"slhb",sets:"2",reps:"6/side",note:"Focus on glute feel"},
          {ex:"lateralBand",sets:"2",reps:"8 steps/side",note:null}]},
        { name:"Lower Strength", dur:"7 min", cat:"lower", exercises:[
          {ex:"rdl",sets:"1",reps:"8",note:"Lighter if needed, no tempo"},
          {ex:"stepUp",sets:"1",reps:"8/side",note:null},
          {ex:"lateralLunge",sets:"1",reps:"8/side",note:null},
          {ex:"calfRaise",sets:"1",reps:"10/side",note:null}]},
        { name:"Upper", dur:"2 min", cat:"upper", exercises:[
          {ex:"bandPullApart",sets:"1",reps:"10",note:"Light band, quality over tension"}]},
        { name:"Core", dur:"4 min", cat:"core", exercises:[
          {ex:"deadBug",sets:"2",reps:"5/side",note:null},
          {ex:"sidePlank",sets:"2",reps:"15 s/side",note:null}]},
      ]},
  ]
},

// ═══════════════════════════════════════════════════════════ BLOCK 2 ═══════
{
  id:2, label:"BLOCK 2", subtitle:"Transition",
  weekRange:"Weeks 5–8", sessionDuration:"30 min", sessionsPerWeek:1,
  equipment:"KBs or dumbbells (light–moderate), mini-band, box/step (~45 cm), floor",
  goal:"Exercise swaps build on Block 1 patterns. Session extends to 30 min. Optional micro-sessions (5–10 min) when life allows.",
  scheduling:"Main session: 24–48 h before easy rides. Micro-sessions: easy ride days or rest days only. Never before hard intervals.",
  structure:"Mobility 4 + Power Prep 5 + Lower 12 + Upper 4 + Core 5",
  microNote:"Pick ONE micro-session option when time allows. No warm-up needed. RPE ≤5. Does not substitute for the main session.",
  weeks:[
    { n:5, theme:"Build", rpe:"5", color:"accent",
      note:"New exercises from Block 1 swaps. Bulgarian SS and SL RDL are harder than they look — start conservative. First time doing 2 sets on primary lower work.",
      blocks:[
        { name:"Mobility & Prep", dur:"4 min", cat:"mobility", exercises:[
          {ex:"hip9090",sets:null,reps:"75 s",note:null},
          {ex:"worldGreatest",sets:null,reps:"5/side",note:null},
          {ex:"heelDrop",sets:null,reps:"10/side",note:null},
          {ex:"thoracicRot",sets:null,reps:"5/side",note:"New — take your time"}]},
        { name:"Power Prep", dur:"5 min", cat:"power-prep", exercises:[
          {ex:"skaterSquat",sets:"2",reps:"5/side",note:"Assisted — hold door frame"},
          {ex:"lateralBand",sets:"2",reps:"10 steps/side",note:null}]},
        { name:"Lower Strength", dur:"12 min", cat:"lower", exercises:[
          {ex:"slRDL",sets:"2",reps:"8/side",note:"New — regress to bilateral RDL if balance is an issue"},
          {ex:"bulgarianSS",sets:"2",reps:"8/side",note:"New — rear foot elevated ~45 cm"},
          {ex:"calfRaise",sets:"1",reps:"12/side",note:null}]},
        { name:"Upper", dur:"4 min", cat:"upper", exercises:[
          {ex:"pushUp",sets:"1",reps:"8",note:"Push"},
          {ex:"kbRow",sets:"1",reps:"8/side",note:"Pull"}]},
        { name:"Core", dur:"5 min", cat:"core", exercises:[
          {ex:"hollowHold",sets:"2",reps:"20 s",note:"New — bent-knee regression if needed"},
          {ex:"sidePlankLR",sets:"2",reps:"20 s/side",note:"New — regress to static side plank if needed"}]},
      ],
      micro:[
        { label:"Hip Stability", exercises:[{ex:"slhb",sets:"2",reps:"8/side",note:null},{ex:"lateralBand",sets:"2",reps:"10 steps/side",note:null},{ex:"sidePlank",sets:"1",reps:"25 s/side",note:null}]},
        { label:"Trunk", exercises:[{ex:"hollowHold",sets:"2",reps:"20 s",note:null},{ex:"deadBug",sets:"2",reps:"6/side",note:null},{ex:"paloff",sets:"2",reps:"8/side",note:null}]},
        { label:"Lower Primer", exercises:[{ex:"slRDL",sets:"1",reps:"8/side",note:null},{ex:"cossack",sets:"1",reps:"8/side",note:null},{ex:"calfRaise",sets:"1",reps:"12/side",note:null}]},
      ]},
    { n:6, theme:"Load", rpe:"5–6", color:"accent",
      note:"Add reps across everything. Begin adding 2 s eccentric to Bulgarian SS. Finish sets with 3 in reserve.",
      blocks:[
        { name:"Mobility & Prep", dur:"4 min", cat:"mobility", exercises:[
          {ex:"hip9090",sets:null,reps:"75 s",note:null},
          {ex:"worldGreatest",sets:null,reps:"5/side",note:null},
          {ex:"heelDrop",sets:null,reps:"10/side",note:null},
          {ex:"thoracicRot",sets:null,reps:"6/side",note:null}]},
        { name:"Power Prep", dur:"5 min", cat:"power-prep", exercises:[
          {ex:"skaterSquat",sets:"2",reps:"6/side",note:"Lighter support needed"},
          {ex:"lateralBand",sets:"2",reps:"12 steps/side",note:null}]},
        { name:"Lower Strength", dur:"12 min", cat:"lower", exercises:[
          {ex:"slRDL",sets:"2",reps:"10/side",note:null},
          {ex:"bulgarianSS",sets:"2",reps:"10/side",note:"2 s eccentric"},
          {ex:"calfRaise",sets:"1",reps:"15/side",note:null}]},
        { name:"Upper", dur:"4 min", cat:"upper", exercises:[
          {ex:"pushUp",sets:"1",reps:"10",note:null},
          {ex:"kbRow",sets:"1",reps:"10/side",note:null}]},
        { name:"Core", dur:"5 min", cat:"core", exercises:[
          {ex:"hollowHold",sets:"2",reps:"25 s",note:null},
          {ex:"sidePlankLR",sets:"2",reps:"25 s/side",note:null}]},
      ],
      micro:[
        { label:"Hip Stability", exercises:[{ex:"slhb",sets:"2",reps:"10/side",note:null},{ex:"lateralBand",sets:"2",reps:"12 steps/side",note:null},{ex:"sidePlankLR",sets:"1",reps:"20 s/side",note:null}]},
        { label:"Trunk", exercises:[{ex:"hollowHold",sets:"2",reps:"25 s",note:null},{ex:"deadBug",sets:"2",reps:"6/side",note:null},{ex:"paloff",sets:"2",reps:"10/side",note:null}]},
        { label:"Lower Primer", exercises:[{ex:"slRDL",sets:"1",reps:"10/side",note:null},{ex:"cossack",sets:"1",reps:"10/side",note:null},{ex:"calfRaise",sets:"1",reps:"15/side",note:null}]},
      ]},
    { n:7, theme:"Overload", rpe:"6", color:"amber",
      note:"Top week of Block 2. 3 s eccentrics on SL RDL and Bulgarian SS. Still finish comfortable — these are the hardest sessions since March.",
      blocks:[
        { name:"Mobility & Prep", dur:"4 min", cat:"mobility", exercises:[
          {ex:"hip9090",sets:null,reps:"75 s",note:"Extra time in tight spots"},
          {ex:"worldGreatest",sets:null,reps:"6/side",note:null},
          {ex:"heelDrop",sets:null,reps:"10/side",note:null},
          {ex:"thoracicRot",sets:null,reps:"6/side",note:null}]},
        { name:"Power Prep", dur:"5 min", cat:"power-prep", exercises:[
          {ex:"skaterSquat",sets:"2",reps:"6/side",note:"Reduce support if possible"},
          {ex:"lateralBand",sets:"2",reps:"12 steps/side",note:null}]},
        { name:"Lower Strength", dur:"12 min", cat:"lower", exercises:[
          {ex:"slRDL",sets:"2",reps:"10/side",note:"3 s eccentric"},
          {ex:"bulgarianSS",sets:"2",reps:"10/side",note:"3 s eccentric, 1 s pause at bottom"},
          {ex:"calfRaise",sets:"1",reps:"15/side",note:"3 s up, 2 s pause at top"}]},
        { name:"Upper", dur:"4 min", cat:"upper", exercises:[
          {ex:"pushUp",sets:"1",reps:"10",note:"3 s eccentric"},
          {ex:"kbRow",sets:"1",reps:"10/side",note:"3 s eccentric"}]},
        { name:"Core", dur:"5 min", cat:"core", exercises:[
          {ex:"hollowHold",sets:"2",reps:"30 s",note:null},
          {ex:"sidePlankLR",sets:"2",reps:"30 s/side",note:null}]},
      ],
      micro:[
        { label:"Hip Stability", exercises:[{ex:"slhb",sets:"2",reps:"10/side",note:"2 s pause at top"},{ex:"lateralBand",sets:"2",reps:"12 steps/side",note:null},{ex:"sidePlankLR",sets:"1",reps:"25 s/side",note:null}]},
        { label:"Trunk", exercises:[{ex:"hollowHold",sets:"2",reps:"25 s",note:null},{ex:"paloff",sets:"2",reps:"10/side",note:"2 s hold"},{ex:"farmerCarry",sets:"2",reps:"20 m",note:null}]},
        { label:"Lower Primer", exercises:[{ex:"slRDL",sets:"1",reps:"10/side",note:"3 s eccentric"},{ex:"cossack",sets:"1",reps:"10/side",note:null},{ex:"calfRaise",sets:"1",reps:"15/side",note:null}]},
      ]},
    { n:8, theme:"Deload", rpe:"4–5", color:"red",
      note:"Pull all the way back. Week 5 reps, no tempo, lighter loads. Freshness into Block 3 matters more than stimulus this week.",
      blocks:[
        { name:"Mobility & Prep", dur:"4 min", cat:"mobility", exercises:[
          {ex:"hip9090",sets:null,reps:"75 s",note:null},
          {ex:"worldGreatest",sets:null,reps:"5/side",note:null},
          {ex:"heelDrop",sets:null,reps:"10/side",note:null},
          {ex:"thoracicRot",sets:null,reps:"5/side",note:null}]},
        { name:"Power Prep", dur:"5 min", cat:"power-prep", exercises:[
          {ex:"skaterSquat",sets:"2",reps:"5/side",note:"Back to assisted — stay easy"},
          {ex:"lateralBand",sets:"2",reps:"8 steps/side",note:null}]},
        { name:"Lower Strength", dur:"12 min", cat:"lower", exercises:[
          {ex:"slRDL",sets:"2",reps:"8/side",note:"Lighter, no tempo"},
          {ex:"bulgarianSS",sets:"2",reps:"8/side",note:"No eccentric"},
          {ex:"calfRaise",sets:"1",reps:"10/side",note:null}]},
        { name:"Upper", dur:"4 min", cat:"upper", exercises:[
          {ex:"bandPullApart",sets:"1",reps:"12",note:"Light band"},
          {ex:"kbRow",sets:"1",reps:"8/side",note:"Lighter load"}]},
        { name:"Core", dur:"5 min", cat:"core", exercises:[
          {ex:"hollowHold",sets:"2",reps:"20 s",note:null},
          {ex:"sidePlankLR",sets:"2",reps:"20 s/side",note:null}]},
      ],
      micro:[
        { label:"Hip Stability", exercises:[{ex:"slhb",sets:"2",reps:"6/side",note:null},{ex:"lateralBand",sets:"1",reps:"8 steps/side",note:null}]},
        { label:"Trunk", exercises:[{ex:"hollowHold",sets:"2",reps:"20 s",note:null},{ex:"deadBug",sets:"1",reps:"5/side",note:null}]},
        { label:"Lower Primer", exercises:[{ex:"slRDL",sets:"1",reps:"6/side",note:null},{ex:"calfRaise",sets:"1",reps:"10/side",note:null}]},
      ]},
  ]
},

// ═══════════════════════════════════════════════════════════ BLOCK 3 ═══════
{
  id:3, label:"BLOCK 3", subtitle:"Development",
  weekRange:"Weeks 9–12", sessionDuration:"35 + 30 min", sessionsPerWeek:2,
  equipment:"KBs or dumbbells (moderate), mini-band, bench/box, floor",
  goal:"Two sessions/week. Session A = primary lower stimulus. Session B = hip stability, anti-rotation, upper pull. 48 h minimum between sessions.",
  scheduling:"Session A: same day as or day after an easy ride. Session B: midweek low-load day. Never two S&C sessions on consecutive days.",
  structure:"A: Mobility 4 + Power Prep 5 + Lower 16 + Upper 5 + Core 5 | B: Mobility 3 + Hip Stability 8 + Lower Acc. 8 + Core+Carry 7 + Upper Pull 4",
  weeks:[
    { n:9, theme:"Build", rpe:"5", color:"accent",
      note:"Two sessions/week for the first time. Keep both at RPE 5. Let the volume be the stimulus — don't chase intensity.",
      sessions:[
        { label:"Session A — Primary", dur:"35 min", icon:"A", blocks:[
          { name:"Mobility & Prep", dur:"4 min", cat:"mobility", exercises:[
            {ex:"hip9090",sets:null,reps:"75 s",note:null},
            {ex:"worldGreatest",sets:null,reps:"5/side",note:null},
            {ex:"heelDrop",sets:null,reps:"10/side",note:null},
            {ex:"thoracicRot",sets:null,reps:"5/side",note:null}]},
          { name:"Power Prep", dur:"5 min", cat:"power-prep", exercises:[
            {ex:"skaterSquat",sets:"2",reps:"6/side",note:"Reduce support if ready"},
            {ex:"lateralBand",sets:"2",reps:"12 steps/side",note:null}]},
          { name:"Lower Strength", dur:"16 min", cat:"lower", exercises:[
            {ex:"slRDL",sets:"2",reps:"8/side",note:"2 sets — quality over load"},
            {ex:"tempoBulgarian",sets:"2",reps:"8/side",note:"New — 3 s eccentric from day 1"},
            {ex:"calfRaise",sets:"2",reps:"12/side",note:null}]},
          { name:"Upper", dur:"5 min", cat:"upper", exercises:[
            {ex:"pushUp",sets:"2",reps:"8",note:null},
            {ex:"kbRow",sets:"2",reps:"8/side",note:null}]},
          { name:"Core", dur:"5 min", cat:"core", exercises:[
            {ex:"hollowRock",sets:"2",reps:"8",note:"New — regress to hollow hold if shape breaks"},
            {ex:"copenhagan",sets:"2",reps:"20 s/side",note:"New — regress to side plank+LR if needed"}]},
        ]},
        { label:"Session B — Secondary", dur:"30 min", icon:"B", blocks:[
          { name:"Mobility & Prep", dur:"3 min", cat:"mobility", exercises:[
            {ex:"hip9090",sets:null,reps:"60 s",note:null},
            {ex:"thoracicRot",sets:null,reps:"5/side",note:null}]},
          { name:"Hip Stability", dur:"8 min", cat:"power-prep", exercises:[
            {ex:"slhb",sets:"3",reps:"8/side",note:"3 sets — working block now"},
            {ex:"lateralBand",sets:"3",reps:"12 steps/side",note:null}]},
          { name:"Lower Accessory", dur:"8 min", cat:"lower", exercises:[
            {ex:"stepUp",sets:"2",reps:"10/side",note:"Returning as accessory"},
            {ex:"cossack",sets:"2",reps:"8/side",note:null}]},
          { name:"Core & Carry", dur:"7 min", cat:"core", exercises:[
            {ex:"paloff",sets:"2",reps:"8/side",note:null},
            {ex:"deadBug",sets:"2",reps:"6/side",note:null},
            {ex:"farmerCarry",sets:"2",reps:"20 m",note:"Suitcase — one side at a time"}]},
          { name:"Upper Pull", dur:"4 min", cat:"upper", exercises:[
            {ex:"faceYTW",sets:"2",reps:"5 each position",note:"Slow and controlled"},
            {ex:"kbRow",sets:"1",reps:"8/side",note:null}]},
        ]},
      ]},
    { n:10, theme:"Load", rpe:"5–6", color:"accent",
      note:"Add reps across both sessions. Both feel manageable — correct. The volume across two sessions is the overload, not any single set.",
      sessions:[
        { label:"Session A — Primary", dur:"35 min", icon:"A", blocks:[
          { name:"Mobility & Prep", dur:"4 min", cat:"mobility", exercises:[
            {ex:"hip9090",sets:null,reps:"75 s",note:null},{ex:"worldGreatest",sets:null,reps:"5/side",note:null},
            {ex:"heelDrop",sets:null,reps:"10/side",note:null},{ex:"thoracicRot",sets:null,reps:"6/side",note:null}]},
          { name:"Power Prep", dur:"5 min", cat:"power-prep", exercises:[
            {ex:"skaterSquat",sets:"2",reps:"8/side",note:null},
            {ex:"lateralBand",sets:"2",reps:"12 steps/side",note:null}]},
          { name:"Lower Strength", dur:"16 min", cat:"lower", exercises:[
            {ex:"slRDL",sets:"2",reps:"10/side",note:null},
            {ex:"tempoBulgarian",sets:"2",reps:"10/side",note:"3 s eccentric"},
            {ex:"calfRaise",sets:"2",reps:"15/side",note:null}]},
          { name:"Upper", dur:"5 min", cat:"upper", exercises:[
            {ex:"pushUp",sets:"2",reps:"10",note:null},{ex:"kbRow",sets:"2",reps:"10/side",note:null}]},
          { name:"Core", dur:"5 min", cat:"core", exercises:[
            {ex:"hollowRock",sets:"2",reps:"10",note:null},{ex:"copenhagan",sets:"2",reps:"25 s/side",note:null}]},
        ]},
        { label:"Session B — Secondary", dur:"30 min", icon:"B", blocks:[
          { name:"Mobility & Prep", dur:"3 min", cat:"mobility", exercises:[
            {ex:"hip9090",sets:null,reps:"60 s",note:null},{ex:"thoracicRot",sets:null,reps:"6/side",note:null}]},
          { name:"Hip Stability", dur:"8 min", cat:"power-prep", exercises:[
            {ex:"slhb",sets:"3",reps:"10/side",note:null},{ex:"lateralBand",sets:"3",reps:"12 steps/side",note:null}]},
          { name:"Lower Accessory", dur:"8 min", cat:"lower", exercises:[
            {ex:"stepUp",sets:"2",reps:"12/side",note:null},{ex:"cossack",sets:"2",reps:"10/side",note:null}]},
          { name:"Core & Carry", dur:"7 min", cat:"core", exercises:[
            {ex:"paloff",sets:"2",reps:"10/side",note:"2 s hold"},{ex:"deadBug",sets:"2",reps:"8/side",note:null},
            {ex:"farmerCarry",sets:"2",reps:"25 m",note:null}]},
          { name:"Upper Pull", dur:"4 min", cat:"upper", exercises:[
            {ex:"faceYTW",sets:"2",reps:"6 each position",note:null},{ex:"kbRow",sets:"1",reps:"10/side",note:null}]},
        ]},
      ]},
    { n:11, theme:"Overload", rpe:"6", color:"amber",
      note:"Peak week for Block 3. Full 3 s eccentrics on both sessions. Worked but not wrecked — if both sessions feel RPE 7+, one was too hard.",
      sessions:[
        { label:"Session A — Primary", dur:"35 min", icon:"A", blocks:[
          { name:"Mobility & Prep", dur:"4 min", cat:"mobility", exercises:[
            {ex:"hip9090",sets:null,reps:"75 s",note:"Extra time in tight areas"},{ex:"worldGreatest",sets:null,reps:"6/side",note:null},
            {ex:"heelDrop",sets:null,reps:"12/side",note:null},{ex:"thoracicRot",sets:null,reps:"6/side",note:null}]},
          { name:"Power Prep", dur:"5 min", cat:"power-prep", exercises:[
            {ex:"skaterSquat",sets:"2",reps:"8/side",note:"Minimal or no support"},
            {ex:"lateralBand",sets:"2",reps:"14 steps/side",note:null}]},
          { name:"Lower Strength", dur:"16 min", cat:"lower", exercises:[
            {ex:"slRDL",sets:"2",reps:"10/side",note:"3 s eccentric, pause at bottom"},
            {ex:"tempoBulgarian",sets:"2",reps:"10/side",note:"3 s eccentric, 1 s pause"},
            {ex:"calfRaise",sets:"2",reps:"15/side",note:"3 s up, 2 s hold at top"}]},
          { name:"Upper", dur:"5 min", cat:"upper", exercises:[
            {ex:"pushUp",sets:"2",reps:"10",note:"3 s eccentric"},{ex:"kbRow",sets:"2",reps:"10/side",note:"3 s eccentric"}]},
          { name:"Core", dur:"5 min", cat:"core", exercises:[
            {ex:"hollowRock",sets:"2",reps:"12",note:null},{ex:"copenhagan",sets:"2",reps:"30 s/side",note:null}]},
        ]},
        { label:"Session B — Secondary", dur:"30 min", icon:"B", blocks:[
          { name:"Mobility & Prep", dur:"3 min", cat:"mobility", exercises:[
            {ex:"hip9090",sets:null,reps:"60 s",note:null},{ex:"thoracicRot",sets:null,reps:"6/side",note:null}]},
          { name:"Hip Stability", dur:"8 min", cat:"power-prep", exercises:[
            {ex:"slhb",sets:"3",reps:"10/side",note:"2 s pause at top"},
            {ex:"lateralBand",sets:"3",reps:"14 steps/side",note:"Wider steps"}]},
          { name:"Lower Accessory", dur:"8 min", cat:"lower", exercises:[
            {ex:"stepUp",sets:"2",reps:"12/side",note:"3 s descent"},{ex:"cossack",sets:"2",reps:"10/side",note:"2 s pause at bottom"}]},
          { name:"Core & Carry", dur:"7 min", cat:"core", exercises:[
            {ex:"paloff",sets:"2",reps:"10/side",note:"3 s hold"},{ex:"deadBug",sets:"2",reps:"8/side",note:"3 s extend"},
            {ex:"farmerCarry",sets:"2",reps:"30 m",note:null}]},
          { name:"Upper Pull", dur:"4 min", cat:"upper", exercises:[
            {ex:"faceYTW",sets:"2",reps:"6 each position",note:"2 s hold each"},{ex:"kbRow",sets:"1",reps:"10/side",note:"3 s eccentric"}]},
        ]},
      ]},
    { n:12, theme:"Deload", rpe:"4–5", color:"red",
      note:"Both sessions — both easy. Week 9 reps, no tempo. You're entering the best fitness since March. Protect it.",
      sessions:[
        { label:"Session A — Primary", dur:"35 min", icon:"A", blocks:[
          { name:"Mobility & Prep", dur:"4 min", cat:"mobility", exercises:[
            {ex:"hip9090",sets:null,reps:"75 s",note:null},{ex:"worldGreatest",sets:null,reps:"5/side",note:null},
            {ex:"heelDrop",sets:null,reps:"10/side",note:null},{ex:"thoracicRot",sets:null,reps:"5/side",note:null}]},
          { name:"Power Prep", dur:"5 min", cat:"power-prep", exercises:[
            {ex:"skaterSquat",sets:"2",reps:"5/side",note:"Back to assisted"},
            {ex:"lateralBand",sets:"2",reps:"10 steps/side",note:null}]},
          { name:"Lower Strength", dur:"16 min", cat:"lower", exercises:[
            {ex:"slRDL",sets:"2",reps:"8/side",note:"Lighter, no tempo"},
            {ex:"tempoBulgarian",sets:"2",reps:"8/side",note:"No pause — fluid movement"},
            {ex:"calfRaise",sets:"2",reps:"10/side",note:null}]},
          { name:"Upper", dur:"5 min", cat:"upper", exercises:[
            {ex:"pushUp",sets:"2",reps:"8",note:"No tempo"},{ex:"kbRow",sets:"2",reps:"8/side",note:"Lighter load"}]},
          { name:"Core", dur:"5 min", cat:"core", exercises:[
            {ex:"hollowHold",sets:"2",reps:"20 s",note:"Regress from hollow rock"},
            {ex:"sidePlankLR",sets:"2",reps:"20 s/side",note:"Regress from Copenhagen"}]},
        ]},
        { label:"Session B — Secondary", dur:"30 min", icon:"B", blocks:[
          { name:"Mobility & Prep", dur:"3 min", cat:"mobility", exercises:[
            {ex:"hip9090",sets:null,reps:"60 s",note:null},{ex:"thoracicRot",sets:null,reps:"5/side",note:null}]},
          { name:"Hip Stability", dur:"8 min", cat:"power-prep", exercises:[
            {ex:"slhb",sets:"3",reps:"8/side",note:"No pause"},{ex:"lateralBand",sets:"3",reps:"10 steps/side",note:null}]},
          { name:"Lower Accessory", dur:"8 min", cat:"lower", exercises:[
            {ex:"stepUp",sets:"2",reps:"8/side",note:null},{ex:"cossack",sets:"2",reps:"8/side",note:null}]},
          { name:"Core & Carry", dur:"7 min", cat:"core", exercises:[
            {ex:"paloff",sets:"2",reps:"8/side",note:null},{ex:"deadBug",sets:"2",reps:"5/side",note:null},
            {ex:"farmerCarry",sets:"2",reps:"20 m",note:"Lighter load"}]},
          { name:"Upper Pull", dur:"4 min", cat:"upper", exercises:[
            {ex:"faceYTW",sets:"2",reps:"5 each position",note:null},{ex:"kbRow",sets:"1",reps:"8/side",note:null}]},
        ]},
      ]},
  ]
},

,

// ═══════════════════════════════════════════════════════════ BLOCK 4 ═══════
{
  id:4, label:"BLOCK 4", subtitle:"Performance",
  weekRange:"Weeks 17–20", sessionDuration:"35–40 min", sessionsPerWeek:2,
  equipment:"KBs or DBs (moderate), mini-band, bench/box, floor. Gym: trap bar, cable stack, med ball.",
  goal:"Phase-aligned S&C. Select your cycling phase above to tune volume, intensity, and RFD emphasis. This baseline is the Race/Specialty variant — the coach adapts sessions to your selected phase via feedback.",
  scheduling:"Session A: same day as or after an easy ride. Session B: low-load day. 48 h minimum between sessions. Never before hard intervals.",
  structure:"A: Mobility 5 + Power/RFD 10 + Lower 10 + Upper 4 + Core 6 | B: Mobility 4 + Activation 6 + Power/RFD 6 + Core+Carry 10 + Upper Stability 4",
  weeks:[
    { n:17, theme:"Build", rpe:"5", color:"accent",
      note:"First Performance Mode block. RFD work is about intent, not load. Log cycling phase in feedback — the coach will scale volume up or down for Base/Build/Specialty/Race accordingly.",
      sessions:[
        { label:"Session A — Primary", dur:"35 min", icon:"A", blocks:[
          { name:"Mobility & Prep", dur:"5 min", cat:"mobility", exercises:[
            {ex:"hip9090",sets:null,reps:"75 s",note:null},{ex:"worldGreatest",sets:null,reps:"5/side",note:null},
            {ex:"heelDrop",sets:null,reps:"10/side",note:null},{ex:"thoracicRot",sets:null,reps:"6/side",note:null}]},
          { name:"Power / RFD", dur:"10 min", cat:"power-rfd", exercises:[
            {ex:"bandHipSnap",sets:"3",reps:"5",note:"Max intent — speed, not load"},
            {ex:"lateralBand",sets:"2",reps:"10 steps/side",note:"Activation to complement RFD"}]},
          { name:"Lower Strength", dur:"10 min", cat:"lower", exercises:[
            {ex:"slRDL",sets:"2",reps:"6/side",note:"Maintenance — fresh and fast, not grinding"},
            {ex:"calfRaise",sets:"2",reps:"10/side",note:null}]},
          { name:"Upper", dur:"4 min", cat:"upper", exercises:[
            {ex:"kbRow",sets:"1",reps:"8/side",note:"Pull — keep it light"},
            {ex:"faceYTW",sets:"1",reps:"5 each position",note:"Shoulder stability"}]},
          { name:"Core", dur:"6 min", cat:"core", exercises:[
            {ex:"paloff",sets:"2",reps:"8/side",note:"Anti-rotation for race riding position"},
            {ex:"copenhagan",sets:"2",reps:"20 s/side",note:null}]},
        ]},
        { label:"Session B — Secondary", dur:"30 min", icon:"B", blocks:[
          { name:"Mobility & Prep", dur:"4 min", cat:"mobility", exercises:[
            {ex:"hip9090",sets:null,reps:"60 s",note:null},{ex:"thoracicRot",sets:null,reps:"5/side",note:null}]},
          { name:"Hip Activation", dur:"6 min", cat:"power-prep", exercises:[
            {ex:"slhb",sets:"3",reps:"8/side",note:"Hip stability anchor — always present"},
            {ex:"lateralBand",sets:"3",reps:"10 steps/side",note:null}]},
          { name:"Power / RFD", dur:"6 min", cat:"power-rfd", exercises:[
            {ex:"dbHangClean",sets:"3",reps:"4",note:"Light DBs — explosive intent only"}]},
          { name:"Core & Carry", dur:"10 min", cat:"core", exercises:[
            {ex:"hollowRock",sets:"2",reps:"8",note:null},{ex:"deadBug",sets:"2",reps:"6/side",note:null},
            {ex:"farmerCarry",sets:"2",reps:"20 m",note:"Suitcase carry"}]},
          { name:"Upper Stability", dur:"4 min", cat:"upper", exercises:[
            {ex:"faceYTW",sets:"2",reps:"5 each position",note:"RPE 4 max"}]},
        ]},
      ]},
    { n:18, theme:"Load", rpe:"5–6", color:"accent",
      note:"Add one rep to RFD sets. Lower strength stays the same — the RFD work is the load this week.",
      sessions:[
        { label:"Session A — Primary", dur:"35 min", icon:"A", blocks:[
          { name:"Mobility & Prep", dur:"5 min", cat:"mobility", exercises:[
            {ex:"hip9090",sets:null,reps:"75 s",note:null},{ex:"worldGreatest",sets:null,reps:"5/side",note:null},
            {ex:"heelDrop",sets:null,reps:"10/side",note:null},{ex:"thoracicRot",sets:null,reps:"6/side",note:null}]},
          { name:"Power / RFD", dur:"10 min", cat:"power-rfd", exercises:[
            {ex:"bandHipSnap",sets:"3",reps:"6",note:"One more rep — same intent and speed"},
            {ex:"lateralBand",sets:"2",reps:"12 steps/side",note:null}]},
          { name:"Lower Strength", dur:"10 min", cat:"lower", exercises:[
            {ex:"slRDL",sets:"2",reps:"6/side",note:"Same volume"},
            {ex:"calfRaise",sets:"2",reps:"12/side",note:null}]},
          { name:"Upper", dur:"4 min", cat:"upper", exercises:[
            {ex:"kbRow",sets:"1",reps:"8/side",note:null},{ex:"faceYTW",sets:"1",reps:"6 each position",note:null}]},
          { name:"Core", dur:"6 min", cat:"core", exercises:[
            {ex:"paloff",sets:"2",reps:"10/side",note:"2 s hold"},{ex:"copenhagan",sets:"2",reps:"25 s/side",note:null}]},
        ]},
        { label:"Session B — Secondary", dur:"30 min", icon:"B", blocks:[
          { name:"Mobility & Prep", dur:"4 min", cat:"mobility", exercises:[
            {ex:"hip9090",sets:null,reps:"60 s",note:null},{ex:"thoracicRot",sets:null,reps:"5/side",note:null}]},
          { name:"Hip Activation", dur:"6 min", cat:"power-prep", exercises:[
            {ex:"slhb",sets:"3",reps:"8/side",note:null},{ex:"lateralBand",sets:"3",reps:"12 steps/side",note:null}]},
          { name:"Power / RFD", dur:"6 min", cat:"power-rfd", exercises:[
            {ex:"dbHangClean",sets:"3",reps:"5",note:"One more rep — same light load"}]},
          { name:"Core & Carry", dur:"10 min", cat:"core", exercises:[
            {ex:"hollowRock",sets:"2",reps:"10",note:null},{ex:"deadBug",sets:"2",reps:"6/side",note:null},
            {ex:"farmerCarry",sets:"2",reps:"25 m",note:null}]},
          { name:"Upper Stability", dur:"4 min", cat:"upper", exercises:[
            {ex:"faceYTW",sets:"2",reps:"6 each position",note:null}]},
        ]},
      ]},
    { n:19, theme:"Overload", rpe:"6", color:"amber",
      note:"Peak RFD week. Add one extra set to band hip snap. Lower stays the same — you should leave both sessions feeling fresh, not beaten up.",
      sessions:[
        { label:"Session A — Primary", dur:"35 min", icon:"A", blocks:[
          { name:"Mobility & Prep", dur:"5 min", cat:"mobility", exercises:[
            {ex:"hip9090",sets:null,reps:"75 s",note:"Extra time in tight areas"},{ex:"worldGreatest",sets:null,reps:"6/side",note:null},
            {ex:"heelDrop",sets:null,reps:"10/side",note:null},{ex:"thoracicRot",sets:null,reps:"6/side",note:null}]},
          { name:"Power / RFD", dur:"10 min", cat:"power-rfd", exercises:[
            {ex:"bandHipSnap",sets:"4",reps:"5",note:"Extra set — quality over quantity"},
            {ex:"lateralBand",sets:"2",reps:"12 steps/side",note:null}]},
          { name:"Lower Strength", dur:"10 min", cat:"lower", exercises:[
            {ex:"slRDL",sets:"2",reps:"6/side",note:"Unchanged — RFD is the overload"},
            {ex:"calfRaise",sets:"2",reps:"12/side",note:null}]},
          { name:"Upper", dur:"4 min", cat:"upper", exercises:[
            {ex:"kbRow",sets:"1",reps:"8/side",note:null},{ex:"faceYTW",sets:"1",reps:"6 each position",note:"2 s hold each"}]},
          { name:"Core", dur:"6 min", cat:"core", exercises:[
            {ex:"paloff",sets:"2",reps:"10/side",note:"3 s hold"},{ex:"copenhagan",sets:"2",reps:"30 s/side",note:null}]},
        ]},
        { label:"Session B — Secondary", dur:"30 min", icon:"B", blocks:[
          { name:"Mobility & Prep", dur:"4 min", cat:"mobility", exercises:[
            {ex:"hip9090",sets:null,reps:"60 s",note:null},{ex:"thoracicRot",sets:null,reps:"6/side",note:null}]},
          { name:"Hip Activation", dur:"6 min", cat:"power-prep", exercises:[
            {ex:"slhb",sets:"3",reps:"8/side",note:"2 s pause at top"},{ex:"lateralBand",sets:"3",reps:"12 steps/side",note:null}]},
          { name:"Power / RFD", dur:"6 min", cat:"power-rfd", exercises:[
            {ex:"dbHangClean",sets:"4",reps:"4",note:"Extra set — reset fully between reps"}]},
          { name:"Core & Carry", dur:"10 min", cat:"core", exercises:[
            {ex:"hollowRock",sets:"2",reps:"12",note:null},{ex:"deadBug",sets:"2",reps:"8/side",note:null},
            {ex:"farmerCarry",sets:"2",reps:"30 m",note:null}]},
          { name:"Upper Stability", dur:"4 min", cat:"upper", exercises:[
            {ex:"faceYTW",sets:"2",reps:"6 each position",note:"2 s hold each"}]},
        ]},
      ]},
    { n:20, theme:"Deload", rpe:"4–5", color:"red",
      note:"Freshness deload. Both sessions very light. If a target event is this week or next, consider skipping Session B entirely.",
      sessions:[
        { label:"Session A — Primary", dur:"35 min", icon:"A", blocks:[
          { name:"Mobility & Prep", dur:"5 min", cat:"mobility", exercises:[
            {ex:"hip9090",sets:null,reps:"75 s",note:null},{ex:"worldGreatest",sets:null,reps:"5/side",note:null},
            {ex:"heelDrop",sets:null,reps:"10/side",note:null},{ex:"thoracicRot",sets:null,reps:"5/side",note:null}]},
          { name:"Power / RFD", dur:"10 min", cat:"power-rfd", exercises:[
            {ex:"bandHipSnap",sets:"2",reps:"4",note:"Halved — intent only, not volume"},
            {ex:"lateralBand",sets:"2",reps:"8 steps/side",note:null}]},
          { name:"Lower Strength", dur:"10 min", cat:"lower", exercises:[
            {ex:"slRDL",sets:"1",reps:"6/side",note:"Single set — movement quality only"},
            {ex:"calfRaise",sets:"1",reps:"8/side",note:null}]},
          { name:"Upper", dur:"4 min", cat:"upper", exercises:[
            {ex:"faceYTW",sets:"1",reps:"5 each position",note:"Shoulder stability only"}]},
          { name:"Core", dur:"6 min", cat:"core", exercises:[
            {ex:"paloff",sets:"2",reps:"8/side",note:null},{ex:"copenhagan",sets:"1",reps:"20 s/side",note:null}]},
        ]},
        { label:"Session B — Secondary", dur:"30 min", icon:"B", blocks:[
          { name:"Mobility & Prep", dur:"4 min", cat:"mobility", exercises:[
            {ex:"hip9090",sets:null,reps:"60 s",note:null},{ex:"thoracicRot",sets:null,reps:"5/side",note:null}]},
          { name:"Hip Activation", dur:"6 min", cat:"power-prep", exercises:[
            {ex:"slhb",sets:"2",reps:"6/side",note:"Gentle — just waking up the glutes"},{ex:"lateralBand",sets:"2",reps:"8 steps/side",note:null}]},
          { name:"Power / RFD", dur:"6 min", cat:"power-rfd", exercises:[
            {ex:"dbHangClean",sets:"2",reps:"3",note:"Very light — feel the movement, don't chase it"}]},
          { name:"Core & Carry", dur:"10 min", cat:"core", exercises:[
            {ex:"hollowHold",sets:"2",reps:"20 s",note:"Regress from hollow rock"},{ex:"deadBug",sets:"2",reps:"5/side",note:null},
            {ex:"farmerCarry",sets:"1",reps:"20 m",note:"Light load"}]},
          { name:"Upper Stability", dur:"4 min", cat:"upper", exercises:[
            {ex:"faceYTW",sets:"1",reps:"5 each position",note:null}]},
        ]},
      ]},
  ]
}

]; // end SC_BLOCKS
