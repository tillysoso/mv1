# Majestic — Ritual & Notification Copy

**Tasks #122 and #129 — Draft for Review**
*Your adventure. But Majestic.*

---

## TASK #122 — Daily Draw Meditation & Reflection Ritual Spec

---

### Overview

The daily draw ritual is not a feature. It is the practice. It is the moment the app earns its place in the user's day — not through novelty but through the quality of the pause it creates.

The ritual wraps the daily card draw in a brief, avatar-guided breathing and grounding sequence. Before the card. After the card. The structure is the same every day. What changes is the card and the companion voice.

**Updated — v2.0:** The breath beat is now integrated into the talisman interaction system. Each avatar has a unique talisman object (Casper:  iron prayer beads; Eli: resonance tuning fork; Olivia: stone vessel; Destiny: sea glass). The Pixel Elder lamp sequence fires before the breath beat. Onboarding uses a compressed exhale-only beat (2.5s). Full updated spec including talisman framework, altar system, 4-layer visual hierarchy, and Pixel Elder lamp mechanic i  `majestic-altar-ritual-spec-v2.md`. The avatar arrival lines and reflection prompts in this document remain current.


**Guiding principle:** Every second of this sequence should feel intentional. Nothing performative. Nothing that sounds like a meditation app. The breath is a tool for arriving, not a product to be sold.

---

### Ritual Structure

#### BEFORE THE DRAW — Arrival Sequence (~60–90 seconds total)

**Purpose:** Get the user out of momentum and into presence before they touch the deck.

**Visual state:** Avatar in neutral portal. Particles at resting motion. No card visible. Background ambient at low.

**Phase 1 — The Settle (no audio required)**

A single line from the companion appears. No animation. Just text, in the companion's voice, landing like a message rather than a prompt.

Then: a breath prompt. One inhale cue. One exhale cue. Minimal visual — a slow pulse on the avatar's emblem, or a single particle movement that maps to the breath rhythm.

**Duration:** One breath cycle. ~6 seconds. Not forced. The user continues when ready.

---

#### AVATAR ARRIVAL LINES — BEFORE THE DRAW

*One line per avatar. Appears as the settle phase begins. Sets the tone without naming an emotion.*

**Casper (Fire)**
> Something is asking for your attention today. Let's find out what it is.

**Olivia (Earth)**
> Before we look at the card — take a breath. There is no rush in here.

**Eli (Air)**
> You have been in motion. This is the still point before the signal arrives.

**Destiny (Water)**
> Whatever you brought in with you today — you can set it down for a moment. I'm here.

---

**Phase 2 — The Intention Set (optional, user-triggered)**

A secondary prompt appears beneath the breath visual. Soft, not demanding.

*"Is there something specific moving through you today?"*

The user can type a short intention — one line, no more — or skip entirely. If they type: it is stored to their journal and surfaced after the draw alongside their card. It is never used to alter the card. It is used to deepen the reflection.

**UX note:** This field should feel like a notebook margin, not a form field. Low contrast, no border, placeholder text disappears on first tap.

---

#### AFTER THE DRAW — Integration Sequence (~60–90 seconds)

**Purpose:** Slow the reveal. Give the card room to land. Move the user from seeing to feeling.

**Visual state:** Card revealed, face-up. Avatar shifts to active state. Aura layer at full. Companion interpretation line below the card.

**Phase 1 — The First Read**

Companion interpretation line appears — one sentence, avatar-voiced. (Pulled from card interpretation library. This is the avatar's read of this specific card, not a generic line.)

A short pause — 1.5s — before the next element appears. The pause is intentional. Do not skip it.

**Phase 2 — The Reflection Prompt**

A single reflection question appears beneath the interpretation line. One question. The user is not required to answer it in the app — this is a prompt for their own internal space.

If the user set an intention before the draw, the reflection prompt is designed to connect back to it. If they did not, a default prompt is used.

**Phase 3 — The Close**

Avatar returns to neutral. Aura settles. One closing line from the companion appears.

The session is complete. User can save to journal, share, or close.

---

#### AVATAR CLOSING LINES — AFTER THE DRAW

*One line per avatar. Appears as the integration sequence ends.*

**Casper (Fire)**
> You have what you need. The question now is what you do with it.

**Olivia (Earth)**
> Sit with this one today. See what shows up by tonight.

**Eli (Air)**
> The card has said what it needs to say. The rest is yours to follow.

**Destiny (Water)**
> You showed up. That is not nothing. Come back tomorrow.

---

### Reflection Prompts — Default Set (Non-Intention)

*One per card category — to be expanded in Phase 08 card copy. These are the defaults before card-specific prompts are written.*

**Breakthrough cards (upward energy, movement, clarity)**
> What has been waiting for you to give it permission?

**Shadow cards (tension, resistance, complexity)**
> What are you working around instead of walking through?

**Neutral cards (holding, transition, observation)**
> What would it look like to just be exactly where you are today?

---

### Motion Spec — Breath Visual

**The breath pulse:**
- Lives on the avatar's emblem
- Inhale: emblem expands 4–6% over 4 seconds
- Exhale: returns to rest over 4 seconds
- One cycle. Then it stops. It does not loop.
- Colour: avatar accent at 40% opacity. Not white. Not generic.

**Casper:** Ember spark drift upward on exhale — three particles, 600ms
**Olivia:** Single botanical particle — a leaf or spore — settling downward on exhale
**Eli:** A thin signal line traces outward from emblem on exhale, fades at edge
**Destiny:** A water-shimmer ripple expands from emblem on exhale, one ring

---

### What This Is Not

- Not a guided meditation. There is no voice-over.
- Not a wellness feature. The word "mindfulness" never appears.
- Not a prompt to purchase or upgrade.
- Not skippable in a way that makes skipping feel wrong. If the user wants to go straight to the card, that is their choice. The ritual is offered, not imposed.

---

---

## TASK #129 — Notification & Reminder Language

---

### Principles

Every notification is a message from someone who knows you — not a system that has clocked that you have not opened the app. The difference between those two is felt immediately and determines whether the user turns notifications off.

**Rules:**
- Never name what the user has not done ("You haven't drawn today")
- Never use streak anxiety as the mechanism ("Don't break your streak")
- Never be urgent about something that is not urgent
- Always atmospheric before functional
- Avatar-voiced notifications feel like a companion checking in, not an algorithm pinging

---

### Notification Sets

---

#### DAILY DRAW PROMPT

*Sent at the user's set time, or default morning. One per day. Avatar-voiced.*

**Casper**
> Something is already moving today. Might as well know what it is.

> The deck is ready when you are. No pressure. Just don't wait too long.

> One card. One minute. Everything else can wait.

**Olivia**
> Your draw is waiting. No rush — but it's there when you're ready.

> Today has something to say. Come find out what it is.

> The card won't change your morning. It might change how you move through it.

**Eli**
> There is a pattern forming today. Worth seeing before it gets complicated.

> The signal is quiet right now. Good time to check in.

> Something worth reading is waiting for you.

**Destiny**
> I've been thinking about you today. Come pull a card when you're ready.

> Whenever the noise settles — I'll be here.

> The morning has something for you. Whenever you're ready to receive it.

---

#### STREAK MAINTENANCE

*Sent in the evening if the user has not drawn. Only one per day maximum. Never guilt — always warmth or mild wit.*

**Casper**
> You almost made it through the day without checking in. Still time.

> The card is still here. So is the question you haven't asked yet.

**Olivia**
> One card before the day closes. You'll sleep better having looked.

> End-of-day check-in. The deck hasn't forgotten you.

**Eli**
> The day is almost over. One more data point before it closes.

> You've been busy. The signal waited. It's still there.

**Destiny**
> Before the day ends — just one card. For you.

> You made it through today. Want to see what it had to say?

---

#### STREAK MILESTONE

*Sent on day 3, 7, 14, 30, and then monthly. Celebratory without being loud.*

**Day 3 — All avatars (one per companion)**

**Casper**
> Three days in a row. The pattern is starting to speak. Keep going.

**Olivia**
> Three draws. Three mornings you chose to check in with yourself. That's not small.

**Eli**
> Three consecutive signals. A pattern is forming. You're starting to see it.

**Destiny**
> Three days. You kept showing up. That matters more than you know.

---

**Day 7 — All avatars**

**Casper**
> A week. The noise doesn't disappear — you just get better at hearing through it.

**Olivia**
> Seven draws. A week of returning to yourself. That's a practice now.

**Eli**
> One week of signals. The picture is getting clearer.

**Destiny**
> Seven days. You've been here every one of them. I noticed.

---

**Day 14 — All avatars**

**Casper**
> Two weeks. The cards aren't telling you anything new anymore — you're starting to tell yourself the truth. That's the difference.

**Olivia**
> Fourteen draws. You've been here long enough that the practice has roots now. That changes what's possible.

**Eli**
> Two weeks of signals. You're not just receiving anymore — you're starting to read. Notice that.

**Destiny**
> Fourteen days. This isn't a streak anymore. It's a relationship. With yourself. I'm just here for it.

---

**Day 30 — All avatars**

**Casper**
> A month in. You're not the same person who opened this the first day. Good.

**Olivia**
> Thirty draws. That's thirty moments you chose to pay attention. It's working.

**Eli**
> One month of readings. The patterns you're seeing now — you couldn't have seen them on day one.

**Destiny**
> A whole month. You kept coming back. That's the practice. That's everything.

---

#### RETURN SESSION (lapsed user — 3+ days absent)

*Warm, no guilt, no mention of absence. Acts as if the user just went quiet for a while — which is fine.*

**Casper**
> You've been away. The deck's been patient. Come back when you're ready — but don't make it too long.

**Olivia**
> Still here. The cards are still here. No explanation needed.

**Eli**
> A gap in the signal. That's allowed. Come back and we'll pick up where we left off.

**Destiny**
> I haven't heard from you in a few days. That's okay. I'm still here.

---

#### PROFILE CARD NOTIFICATION

*Sent once, after onboarding, 24 hours after first draw. Draws user back to their Majestic Profile.*

**Casper**
> Your birth cards are in your profile. Worth knowing what they've been telling you all along.

**Olivia**
> The cards you were born with are worth revisiting. Your profile has them waiting.

**Eli**
> There's a pattern in your birth cards that connects to your reading yesterday. Your profile has the full picture.

**Destiny**
> Your Majestic Profile has been sitting with your first reading overnight. It has something to show you.

---

#### GENERAL ATMOSPHERIC (used for onboarding nudges, feature discovery, low-priority moments)

*These are brand-voice notifications — no avatar assigned. Used sparingly.*

> Something worth reading is waiting for you.

> The signal is finding you.

> A new card is ready. So are you.

> The deck has been shuffled. The question is yours.

> Your adventure continues whenever you are.

---

### Tone Notes for Dev / Copy Review

- **Never use:** "Don't forget", "You haven't", "Missing", "Breaking your streak", "Reminder:", "It's time to"
- **Always use:** Present tense, minimal punctuation, no exclamation marks, no emoji in companion notifications (atmospheric-only notifications may use one if appropriate — e.g. a card suit symbol)
- **Frequency cap:** Maximum 1 notification per day. Streak notifications only fire if the user has not drawn. Milestone notifications override daily draw prompt on milestone days.
- **Avatar routing:** Notifications are always voiced by the user's active companion. When avatar-agnostic copy is needed (lapsed return, profile card), use the active companion's version.

---

*Majestic — Ritual & Notification Copy — Draft for Review*
*Your adventure. But Majestic.*
