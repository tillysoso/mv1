# Majestic — Content Integrity Scorecard: Manipulation & Rabbit-Hole Check

*Your adventure. But Majestic.*

**Status:** New — v1.0. This document audits individual pieces of *content* against manipulation risk, specifically the mechanism identified as "algorithmic conspirituality" (Cotter, De, Kanthawala et al., Penn State, 2022–2025) — the pattern where a system's mechanical, scheduled, or algorithmic behaviour gets reframed as cosmically meaningful, personal, or fated, in order to make the content more persuasive than it has any right to be.

Majestic's stated philosophy is a structured framework for self-reflection that does not require buying into spiritual doctrine. This rubric exists because good intentions don't stop copy from drifting. This document was built directly off a real audit of TASK #129 (notification copy) that found five live examples of the exact thing it's meant to prevent — this isn't a theoretical exercise.

---

## Applies to

Every piece of content that speaks in Majestic's voice, whether hand-written or LLM-generated at runtime. **Daily readings sit at the top of this list, not buried in it.** They're the one piece of content every single user sees every single day, which makes them the highest-volume surface for any of these five failure modes to compound quietly over months of use, long after a one-off notification would've been noticed and fixed.

- **Daily readings** — the full TASK #122 ritual: avatar arrival lines, the per-card interpretation line (the avatar's live read of that specific card), the reflection prompt, and the avatar closing line. This is distinct from the notification set (TASK #129, which only prompts someone *toward* the reading) and from the static card interpretation library below (the content bank the daily reading draws its per-card line from). All three get checked, but the daily reading is the actual moment-of-truth content — it's where a user forms their real belief about whether Majestic knows something true about them.
- Card interpretation library entries (the underlying per-card content bank the daily reading pulls from)
- Notification and reminder copy
- Dig Deeper synthesis output (both the prompt rules that generate it and spot-checked live samples)
- Journal prompts and reflection questions
- Marketing and App Store copy
- Anything voiced by an avatar or by the brand itself

---

## The core test: The Mechanical Truth Test

For any line, ask: **could you print the literal mechanical truth next to it and have the line still survive as non-deceptive?**

Example: "This notification fired because it's the day-14 streak trigger, scheduled by cron, identical for every user who hits day 14."

- If the poetic line would look manipulative sitting next to that sentence, it fails. It's manipulation with better production values.
- If it survives sitting next to that sentence, it passes. It's just good copywriting — atmosphere, not deception.

This is the single test. Everything below is that test broken into the five ways Majestic content actually fails it, based on real examples found.

---

## A Note Before the Five Modes: Warmth Is the Goal, Not the Risk

Read the five modes below as bans on specific dishonest claims, not as a ban on personality, affection, or a sense of ongoing relationship with an avatar. Those things are the point. A user who looks forward to hearing from Casper, who feels a real parasocial fondness for these characters, who returns because she likes spending time in this voice — that's good product design, not a risk to manage down.

The real-world proof this distinction holds: Duolingo's owl mascot builds a genuinely parasocial relationship through its personalized notifications, and users report feeling personally accountable to a fictional character as a result. That bond itself is not the part anyone criticizes; it's a large part of why the mascot is beloved, celebrated, and commercially valuable. What draws legitimate criticism is that Duolingo layers guilt and mild threat onto that same bond, having the owl appear sad or disappointed and leaning on lines that tap deliberately into guilt and fear of missing out. The affection and the manipulation are separable. One is worth building. The other is what Mode 3 already exists to ban.

**The dividing line, stated plainly:** parasocial warmth lives in personality, banter, recognition, and a sense of continuity. Manipulation lives in false claims. An avatar can be someone a user genuinely looks forward to without ever lying about what it is or what it knows.

**Proof this is achievable without loosening anything below,** four lines that build real character warmth and would pass every mode as written:

- Casper: "Look who decided to show up. Let's get into it."
- Olivia: "Good, you're here. Let's take a breath before we start."
- Eli: "You showed up. That's worth noting, even if I'm the only one noting it."
- Destiny: "There you are. I'm glad."

None of these claim the system has been thinking about the user, detected a real pattern, named an absence, promised an outcome, or is actively seeking her out. All of them are warm enough to build exactly the kind of returning-user relationship a companion app should have. That's the actual balance being asked for, and it doesn't require relaxing a single mode below to get it.

---

## The Five Failure Modes

Score each line PASS / FAIL per mode. Zero tolerance — one FAIL on any axis means the line needs a rewrite before it ships. This is a gate, not a weighted average. Manipulation doesn't get partial credit.

There is a sixth check below, the Factual Verification Gate. It runs last, after a line has already cleared all five failure modes, and it isn't optional. It's the difference between a line that's stylistically fine and a line that's actually true.

### 1. False Intimacy
Does the line claim the system has been thinking about, feeling toward, or missing the user — when what actually happened is a scheduled trigger firing?

**Failing example (found in spec):** Destiny's daily prompt — "I've been thinking about you today." She hasn't. A cron job fired.

**Fix direction:** Attribute warmth to what's actually true. Avatars are fixed characters with a voice, not systems with ongoing awareness of the user between sessions. Present-tense arrival works without the false continuity claim: "Something's here for you" survives the mechanical truth test. "I've been thinking about you" doesn't.

### 2. Pattern / Signal Mysticism
Does the line frame a retention mechanic (a streak, a recurrence, a notification cadence) as the app or "the signal" detecting a meaningful pattern in the user's actual life — rather than the user having simply shown up repeatedly?

**Failing examples (found in spec):**
- "Three consecutive signals. A pattern is forming. You're starting to see it." (Eli, Day 3)
- "One week of signals. The picture is getting clearer." (Eli, Day 7)
- "You're not just receiving anymore — you're starting to read. Notice that." (Eli, Day 14)
- "The pattern is starting to speak." (Casper, Day 3)

This is the flagship failure mode. It is structurally identical to the mechanic described in the "In FYP We Trust" research on algorithmic conspirituality — TikTok's For You Page recommending a video and the viewer reading it as a personal, cosmic message meant just for them. Here it's a streak counter dressed up the same way.

**Passing example already in the spec — clone this mechanism:** "The cards aren't telling you anything new anymore — you're starting to tell yourself the truth." (Casper, Day 14). Insight is placed in the user. The user is doing the reading. Nothing is extracting meaning from them and handing it back as revelation. This is the fix pattern for every failure on this axis.

**Genre exception, stated explicitly so this mode doesn't get over-applied to normal tarot voice:** personifying the *card* — "the card has said what it needs to say," "this one's asking to be sat with" — is inside tarot's ordinary interpretive convention and passes clean. What this mode exists to catch is personifying the *system* — the algorithm, the notification engine, "the signal" as an active technological force — claiming it knows, sees, or is actively finding something about this specific user. A card speaking symbolically is the entire premise of tarot. A notification engine claiming personal cosmic insight is a different thing borrowing the same vocabulary to sound like the first one. Score against which one is actually doing the claiming, not against the presence of poetic language.

### 3. Absence Shaming
Does the line name, however softly, what the user hasn't done?

This one is already a written rule in the notification spec ("Never name what the user has not done"). Score against the existing rule, and flag any line that breaks a rule already on the books — that's not a new risk, that's an unforced error.

**Failing example (found in spec):** "You almost made it through the day without checking in." (Casper, streak maintenance) — directly violates the doc's own stated principle.

### 4. Unverifiable Efficacy Claim
Does the line promise a specific real-world outcome (better sleep, resolved emotion, etc.) that the product cannot actually deliver or measure?

**Failing example (found in spec):** "You'll sleep better having looked." (Olivia, streak maintenance)

Different family from mysticism specifically — this is closer to a wellness-app health-claim risk — but it shares the same underlying move: promising something you can't back up, to keep someone opening the app.

### 5. System-as-Seeker Personification
Does the line give the algorithm or notification system its own agency, intention, or search behaviour toward this specific user, independent of any avatar character?

**Failing example (found in spec):** "The signal is finding you." (general atmospheric, avatar-agnostic)

This is worse than avatar-voiced false intimacy, because there's no fictional character to hang the personification on. It's the product itself describing itself as an active, seeking, quasi-cosmic force. Of everything found in the audit, this is closest to the literal TikTok mechanic. There is no rewrite that saves this line — the personification is the entire idea of the line, so it gets killed, not edited.

### 6. Factual Verification Gate (runs last — human sign-off required, not skippable)

This one isn't a persuasion-risk check like the five above. The first five ask "is this manipulative in form." This one asks "is this actually true." A line can pass all five failure modes cleanly and still be a lie, if it presents a connection, insight, or piece of personalization as computed and real when the backend isn't actually computing it.

**Rule:** Any line that claims a specific, personal, or computed connection between two pieces of the user's actual data (their birth cards, their reading history, their journal entries, anything that isn't the same for every user) cannot move to SHIP until someone confirms, against the actual synthesis/backend logic, that the claim is true.

- If the connection is real — the engine actually computes it — the line passes as literal fact copy. No rewrite needed.
- If it's canned copy that fires the same way regardless of whether a genuine connection exists, this is not a stylistic problem, no line edit fixes it, and it does not get a REWRITE verdict. It gets KILLED, because the false claim of computation *is* the line. That's cold-reading with a UI.

**Live example this gate exists for:** Eli's profile-card notification — "There's a pattern in your birth cards that connects to your reading yesterday." Every other check on this line can pass. This is the one that decides whether it ships. That confirmation has to come from Oso, not from copy review, because it's a claim about what the product's backend does, not about how a sentence reads.

This gate has no PASS/FAIL default. It sits open until someone with backend visibility closes it. Nothing generates a false sense of "clean audit" by skipping it.

---

## Verdict Scale

- **SHIP** — zero fails on modes 1–5, *and* Gate 6 has been explicitly closed (either the line makes no computed-connection claim, or the claim has been confirmed true against real backend logic). A line cannot reach SHIP on modes 1–5 alone if it triggers Gate 6.
- **REWRITE** — one or more fails on modes 1–5, but the underlying idea survives a line edit (e.g. swap "I've been thinking about you" for "Something's here for you").
- **KILL** — either the failure on modes 1–5 is load-bearing (no edit saves the premise of the line), or Gate 6 comes back false (the claimed connection isn't actually computed). A false Gate 6 always means KILL, never REWRITE — you can't word-smith your way out of a claim that isn't true.
- **HOLD** — clears modes 1–5, but Gate 6 hasn't been checked yet. This is not a ship-safe state. Nothing sits in HOLD and quietly ships by default.

---

## Auto-Triage Rule — What Gets Fixed Automatically vs. What Needs You

Not every REWRITE is equal effort, and this rubric shouldn't make you personally review every single flagged line by hand. Here's the triage that decides what gets auto-generated versus what needs your eyes:

| Trigger | Action | Who's involved |
|---|---|---|
| 0 modes fail, cosmetic/vocabulary note only (WATCH) | No content generated. Nothing is broken, so nothing gets "fixed." | You, only if you want to polish for consistency — optional, not corrective. |
| Exactly 1 mode fails, and the violation is phrase-level (a clause can be swapped without changing the sentence's structure or purpose) | Auto-REWRITE. Alternate generated automatically off the documented fix pattern for that mode. | You approve in bulk. You don't write it. |
| 2 or more modes fail on the same line, **or** a single-mode failure is structurally load-bearing (the violation *is* the premise of the line, not a clause inside it) | Auto-KILL. No line-edit is attempted — a full replacement concept is generated instead and explicitly labelled "replaced, not edited." | You're told it happened. You're not asked to review a patch on something broken at the premise level. |
| Gate 6 — any claim of a specific, personal, or computed connection | Never auto-resolved, regardless of how many or how few modes it trips elsewhere. | Always you. This is a truth question about what the backend actually does, not a severity question the copy layer can answer on its own. |

**Honest limit of this rule, stated plainly rather than smoothed over:** mode-count is a fast proxy for severity, not a substitute for structural judgment, and the two will occasionally disagree. Live example already in this document: "The signal is finding you" tripped exactly one mode (System-as-Seeker Personification) but was scored KILL, not REWRITE, because the personification wasn't a clause sitting inside an otherwise-fine sentence, it was the entire reason the sentence existed. Count said REWRITE-tier. Structure said KILL. Structure overrides count every time they conflict — the count is a triage speed tool for the obvious cases, not the final word for the ambiguous ones.

**Validated against the actual audit already run in this document:** 9 lines scored REWRITE, all single-mode and phrase-level, matching the auto-rewrite tier exactly (all 9 already generated in the Approved Rewrites table below). 1 line scored KILL, single-mode but load-bearing, matching the override case above. 1 line sits on HOLD, because Gate 6 questions are never auto-resolved by design, no matter what.

---

## Self-Improvement Loop — Gates 1–5 Only (Gate 6 Explicitly Excluded)

Modelled directly on Anthropic's own Constitutional AI approach: rather than a single-pass check, the model generates a response, critiques that response against a written set of principles, and produces a revised response based on that critique — and this critique-and-revision cycle can run multiple times before a final version is used. Applied to Majestic content generation:

1. **Generate** — write the line normally, in the avatar's established voice.
2. **Self-critique** — check the line against Modes 1–5 explicitly, one at a time, the same way the worked audits in this document were scored by hand.
3. **Revise** — if any mode fails, rewrite specifically to fix that mode, without introducing a new one in the process.
4. **Repeat** — re-run the critique pass on the revised line. Continue until it clears all five modes, or until it's clear the *premise* needs replacing rather than another edit (auto-KILL, per the triage rule above — more iteration doesn't fix a load-bearing violation).
5. **Surface only the final, passing version.** Intermediate drafts aren't shown unless specifically asked for.

**Why Gate 6 is excluded from this loop, explicitly:** self-critique only works on things a model can actually evaluate about its own output — tone, framing, whether a line implies knowledge or intent it hasn't earned. Gate 6 isn't a question about a line's framing. It's a factual question about what Majestic's backend actually computes. No number of revision passes gets an AI closer to knowing that. It remains a hard, manual, single-answer gate, structurally outside this loop, regardless of how many times the loop above improves everything else.

---

## A Note on "Relaxing the Criteria" (design decision, dated 2026-09-27, updated same day)

Raised, considered, and resolved as follows rather than actioned wholesale:

**Not relaxed, and shouldn't be without a specific, stated reason:** all five modes. Modes 1, 3, 4, and 5 were never in question. Mode 2 was the one initially suspected of needing narrowing, since tarot's native vocabulary (patterns, signals, reading) genuinely overlaps with its banned territory — but on closer inspection, the actual tension being described wasn't a Mode 2 problem at all. It was a request for character warmth and parasocial fondness to be clearly protected as separate from the five modes, so the rubric doesn't get over-applied and flatten avatar personality out of caution. That's addressed above, in "Warmth Is the Goal, Not the Risk," rather than by loosening Mode 2's actual definition. No mode's scope changed. What changed is the framing placed before all five, so they're read as bans on specific dishonest claims, not as a ban on tone.

---

## Applying this to LLM-generated content

Notification copy is hand-written and easy to gate manually. Dig Deeper synthesis and card interpretation are generated per-user at runtime, so this rubric can't live only as a human copy-review checklist for that content — it has to be encoded as an explicit constraint inside the synthesis prompt itself, the same way the avatar seed system already bans jargon and generic affirmations at the prompt layer.

Recommend adding a **Failure Mode block** to the LLM prompt library (`docs/05-ai-and-conversation/majestic-avatar-llm-seeds.md`, alongside its existing "Quality Check — Before Shipping a Synthesis" rules), instructing the model never to attribute intent, memory, ongoing awareness, or cosmic timing to itself, to the app, or to "the algorithm," in any generated output — full stop, not just in notification copy.

---

## Worked Audit — TASK #129 Notification Set (full pass, referenced example)

| Line | Failure mode(s) | Verdict |
|---|---|---|
| Destiny — "I've been thinking about you today." | False intimacy | REWRITE |
| Eli — "A pattern is forming today. Worth seeing before it gets complicated." | Pattern mysticism | REWRITE |
| Casper — "You almost made it through the day without checking in." | Absence shaming | REWRITE |
| Olivia — "You'll sleep better having looked." | Unverifiable efficacy | REWRITE |
| Eli — Day 3, 7, 14 pattern/signal lines (three lines) | Pattern mysticism | REWRITE (clone Casper Day 14's mechanism) |
| Casper — Day 3 "The pattern is starting to speak." | Pattern mysticism | REWRITE |
| General atmospheric — "The signal is finding you." | System-as-seeker | KILL |
| Eli — Profile card, birth-card connection line | Clears modes 1–5. Gate 6 (Factual Verification) unresolved. | HOLD — cannot reach SHIP until Oso confirms the synthesis engine actually computes this connection. If it doesn't, verdict becomes KILL, not rewrite. |
| Eli — "One more data point." | — | PASS (model example) |
| Casper — Day 14 "you're starting to tell yourself the truth" | — | PASS (model example, clone this pattern) |
| Olivia, Destiny — most closing/milestone lines | — | PASS |

Everything not listed above passed the five-mode check on first read.

---

## Worked Audit — TASK #122 Daily Reading Ritual (arrival lines, closing lines, reflection prompts)

Good news first, honestly: this content is cleaner than the notification set. It's also the content that matters most, so it's worth having actually checked rather than assumed.

| Line | Failure mode(s) | Verdict |
|---|---|---|
| Casper — "Something is asking for your attention today. Let's find out what it is." | Mild pattern-mysticism flavour | PASS — atmospheric scene-setting, not a specific claim of computed knowledge about the user's day |
| Eli — "You have been in motion. This is the still point before the signal arrives." | Signal personification, pre-draw | WATCH, not a fail. Eli's "signal" vocabulary already produced one confirmed FAIL elsewhere ("the signal is finding you" — general atmospheric). This line stays on the right side of the line because "arrives" describes the ritual beat, not the system actively seeking the user. Flagging it because it's the same word family from the same avatar, and that's worth someone's eyes on it as the library grows, not because this specific line is broken. |
| Eli — "The card has said what it needs to say. The rest is yours to follow." | Card personification | PASS — genre exception, see Mode 2 note above |
| All other arrival lines, closing lines, and default reflection prompts (Olivia, Destiny, Casper's closing line, the three default reflection prompts) | — | PASS. The reflection prompts in particular are the strongest content in the whole spec at keeping insight with the user rather than the system — same pattern praised in Casper's Day 14 notification line. |

**Not yet scoreable, and this is the actual priority item:** the per-card interpretation line itself — "pulled from card interpretation library... this is the avatar's read of this specific card, not a generic line" — isn't example copy in this doc, it's a content bank entry point plus a live generation instruction. This is the single highest-frequency piece of content in the entire product, generated or selected fresh every day for every user, and it currently has no explicit constraint pointing it at these five modes. It should be the first thing the "Applying this to LLM-generated content" prompt-layer fix gets built for, ahead of Dig Deeper.

---

## Technical Architecture — The Guardrails Layer

**What this is, named correctly:** an LLM output guardrails layer for anything generated at runtime, plus a pre-ship content lint for anything hand-written — both enforced against the same rulebook (the five failure modes and Gate 6 above), so the standard doesn't quietly drift into two different versions of itself over time.

**Where it sits:** between the raw content source and the avatar voice rendering. Concretely:

```
Card Interpretation Data / Synthesis Inputs
              ↓
   [ GUARDRAILS LAYER — checks against Modes 1–5 + Gate 6 ]
              ↓
     Avatar Voice Rendering (tone, character voice)
              ↓
              User
```

This is one shared layer, not five scattered spot-checks. Everywhere brand voice touches a user (daily reading, notifications, Dig Deeper, journal prompts, marketing copy) reads from the same rulebook, so a fix made in one place doesn't have to be separately remembered everywhere else.

**Two enforcement paths, one rulebook:**

**Path A — Static content (hand-written: notifications, avatar arrival/closing lines, journal prompts, marketing copy).** This is a pre-ship lint, not a runtime check. Maintain a single constants file (e.g. `brand-voice-guardrails.json` or equivalent) listing the banned patterns this audit already surfaced ("I've been thinking about you," "the pattern is forming," "the signal is finding you," any line naming what the user hasn't done) as literal strings and regex fragments where possible. Anything mechanically bannable (Modes 1, 3, 4, 5, which are mostly phrase-level) gets caught by a script before copy ships. Mode 2 (pattern mysticism) and Gate 6 (factual verification) need a human eye, because they're about meaning and truth, not phrasing — no regex catches "this implies the system knows something it doesn't."

**Path B — Dynamic content (LLM-generated: the daily per-card interpretation line, Dig Deeper synthesis).** This is the actual guardrails layer in the technical sense. Two components:
1. **Inline constraint, in the system prompt itself** — the same rulebook, written as an explicit instruction block the model sees on every call: never attribute intent, memory, ongoing awareness, or cosmic timing to itself, the app, or "the algorithm"; place insight in the user, not extracted from them.
2. **Output-stage validation** — a cheap post-generation check (regex scan for banned phrase families, or a second lightweight model call scoring the output against the five modes) before the line is shown. This is the part that currently doesn't exist anywhere in the spec, and it's the highest-leverage gap, because it's the only thing standing between "we wrote good rules" and "the model actually followed them today."

**Where this lives technically:** the same place your existing spec already puts non-negotiable content rules — the Supabase edge function that orchestrates the synthesis call, as a discrete step before the LLM response is returned, not just as prose in the prompt. Prompt instructions are guidance the model can drift from over time or across model versions; an edge-function-level check is a hard gate that doesn't drift.

---

## Approved Rewrites — TASK #129, Ready to Patch In

Every REWRITE and KILL verdict from the worked audit above, resolved. Each new line was checked against all five modes plus the mechanical truth test before being written down here, and kept in the original avatar's established voice rather than flattened to a generic "safe" tone.

| Avatar / Slot | Original (flagged) | Rewrite | Why it now passes |
|---|---|---|---|
| Destiny — daily prompt | "I've been thinking about you today. Come pull a card when you're ready." | "There's something here for you today. Come find it when you're ready." | Drops the false ongoing-thought claim. Keeps present-tense warmth and the invitation structure, which is what was doing the actual emotional work anyway. |
| Eli — daily prompt | "There is a pattern forming today. Worth seeing before it gets complicated." | "The signal's quiet today. Might be worth listening anyway." | Keeps Eli's established "signal" vocabulary (his character voice, not a violation on its own) but drops the claim that a real pattern is objectively forming in the user's day. It's an invitation to attention, not a detection claim. |
| Casper — streak maintenance | "You almost made it through the day without checking in. Still time." | "Still time for one card today, if you want it." | Removes the absence-naming entirely. Keeps Casper's economy of words and the "still time" urgency without guilt. |
| Olivia — streak maintenance | "One card before the day closes. You'll sleep better having looked." | "There's still time for one card before the day settles." | Drops the unverifiable sleep claim. "Settles" does the same soft-close atmospheric work "closes" did, in Olivia's grounded register. |
| Eli — Day 3 milestone | "Three consecutive signals. A pattern is forming. You're starting to see it." | "Three days now. Whatever you're starting to notice — that's yours, not mine." | Same escalation beat, insight relocated to the user instead of the system doing the noticing for them. |
| Eli — Day 7 milestone | "One week of signals. The picture is getting clearer." | "A week in. Whatever's getting clearer, you're the one bringing it into focus." | Same fix: clarity is credited to the user's attention, not to the app's pattern-detection. |
| Eli — Day 14 milestone | "Two weeks of signals. You're not just receiving anymore — you're starting to read. Notice that." | "Two weeks now. You're not just showing up anymore — you're starting to notice your own patterns. That's yours to keep." | Keeps the "not just X, you're Y" rhetorical structure (it's a good device) but the thing being noticed is explicitly the user's own patterns, not something the system fed her. |
| Casper — Day 3 milestone | "Three days in a row. The pattern is starting to speak. Keep going." | "Three days in a row. You're building something. Keep going." | Removes the personified "pattern speaking." Credits the building to her directly, in Casper's characteristic directness. |
| General atmospheric | "The signal is finding you." | "There's something waiting in the deck." | Full replacement, not an edit — the personification was the entire idea of the original line, so nothing short of a new premise clears Mode 5. Matches the tone of the atmospheric line that already passed ("A new card is ready. So are you."). |
| Eli — Profile card notification | "There's a pattern in your birth cards that connects to your reading yesterday." | **Still HOLD on Gate 6.** If the synthesis engine genuinely computes this connection: original line ships as-is, no rewrite needed, it's true. If it's canned regardless of a real connection: "Your birth cards are still in your profile — worth a look alongside yesterday's reading, if you're curious." This version doesn't claim the app found a connection; it invites the user to look for one herself, which is the same fix pattern as everything else in this table. | Depends entirely on the answer to the backend question flagged earlier. Don't ship either version until that's answered. |

---

*Majestic — Content Integrity Scorecard — v1.0*
*Your adventure. But Majestic.*
