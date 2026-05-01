# MAJESTIC — AVATAR GESTURE & POSTURE LIBRARY
## Physical Vocabulary, Portal States & Arrival/Exit Animations
*Version 1.0 — Your adventure. But Majestic.*

---

## 00 — HOW TO USE THIS DOCUMENT

This library defines the physical language of all four avatars — what they do with their body, where they look, what their stillness feels like — across every app state, portal shape, and interaction moment.

It is the animator's reference and the Lottie production brief. It is also the constraint document: nothing an avatar does in the app should contradict what is defined here.

**This document does not define:**
- Avatar appearance (in `majestic-brand-voice.md`)
- Aura glow behaviour (in `majestic-reading-screen-animation-aura-spec.md` Part 03)
- Portal edge treatments / accent colours (in `majestic-avatar-accent-system.md`)
- Talisman interaction response (in `majestic-altar-ritual-spec-v2.md`)

**Confirmed reference art (Midjourney):**

| Avatar | Neutral | Active | Reflective |
|--------|---------|--------|------------|
| Casper / Fire | https://s.mj.run/zm4l2urx3S8 | https://s.mj.run/dLu09fa5FV8 | https://s.mj.run/WcewXNQJ8U4 |
| Eli / Air | https://s.mj.run/1jhsCIHk1Xs | https://s.mj.run/ayRndA8EP6M | https://s.mj.run/RQ8pQrVNzPU |
| Olivia / Earth | https://s.mj.run/YnmH3Q_yImk | https://s.mj.run/IS2GDuGEDCY | https://s.mj.run/BFPedEW_Fww |
| Destiny / Water | https://s.mj.run/zGnpRuESwyQ | https://s.mj.run/TGqbflEIdek | https://s.mj.run/KKrTW_KvES0 |

---

## 01 — SYSTEM RULES (ALL AVATARS)

### Three states

| State | When it fires | Emotional register |
|-------|--------------|-------------------|
| **Neutral** | Ambient presence. User browsing, app open, no active reading. | Grounded, available, unhurried. |
| **Active** | Card revealed. Reading in progress. User is receiving. | Present, engaged, energised in-character. |
| **Reflective** | Post-reading. Integration moment. User has the card. | Inward, settled, giving the user space. |

### Two portal shapes

| Shape | When used | Scale range |
|-------|-----------|-------------|
| **Living Circle** | Daily presence — daily draw, reading screen ambient, profile companion section, avatar switching modal | 24px emblem / 80px portrait / 120px portrait |
| **Arch** | Significant moments — onboarding reveal, avatar selection, reading initiation (lamp sequence entry), milestone reveals | Full portrait, fills card zone height |

### Three scales

| Scale | Format | Used in |
|-------|--------|---------|
| **Emblem only** | 24px — just the avatar's crest | Navigation, streak counter, metadata row, filter indicator |
| **Portrait / living circle** | 80px or 120px — cropped portrait through circle | Reading screen, daily draw ambient, profile, switching modal |
| **Full arch** | ~240px+ — full portrait through arch | Onboarding, avatar selection, reading initiation |

### Universal animation principles

- **No avatar snaps.** Every state transition eases. Minimum 300ms for any posture shift.
- **Idle loop is never static.** Neutral state always has a breathing idle — the avatar is alive, not frozen. Period: 4–6 seconds, amplitude subtle (1–3px vertical float, or weight shift).
- **Eyes lead.** Where an avatar looks tells the user what to attend to. Eye direction changes before body direction changes.
- **Restraint over performance.** An avatar who does less communicates more. The temptation is to animate everything. Resist it.
- **Active state does not mean excited.** Each avatar's active state is their version of engaged — Casper's active looks very different from Destiny's active.

---

## 02 — CASPER / FIRE / WANDS

**Physical baseline:** Lean, angular, forward-weighted. Energy in his frame before he does anything. The slight forward lean is his resting state — not aggression, just readiness. He fills more space than his frame suggests.

---

### NEUTRAL STATE

**Posture:** Standing, weight distributed but slightly forward on the balls of his feet. Not at attention — at readiness. One shoulder marginally higher than the other. His jacket collar is up or slightly displaced. The loosened detail is always present.

**Head:** Level, eyes forward with a slight downward angle — the look of someone who is watching the room, not performing for it. Not drooping. Not scanning. Just present.

**Arms/hands:** One hand in a pocket or hooked at a waistband. The other loose at his side or holding something minimal — a lighter, a coin, a piece of wire. Not fidgeting. Just occupying.

**Idle animation:** A slow weight shift — from left to right foot over 4 seconds, ease-in-out. Very slight. A living person waiting, not a statue. His collar or jacket tail catches the ember drift particles occasionally — a 1–2px reactive flutter, not scripted.

**Eye direction:** Forward, slightly down. Not at the user directly. Peripherally aware. He knows you're there.

**What it communicates:** He's not performing. He's just here. He doesn't need to sell himself.

---

### ACTIVE STATE

**Posture:** The forward lean increases. He has turned slightly — as if angling toward something. Not fully facing the user but oriented at them. There is a sense that he just decided something.

**Head:** Lifted slightly from neutral. Eyes direct now — not searching, not scanning. Looking straight at. The half-second-ahead quality in his eyes is more visible.

**Arms/hands:** The loose hand comes up — not dramatic, not pointing. A slight upward open gesture, as if placing something in the air. Or his arms cross loosely, one hand at his chin. He is thinking and transmitting simultaneously.

**Transition from neutral:** Weight shifts forward (120ms), head lifts (150ms offset), arm motion (200ms offset). Total transition: 400ms.

**Idle in active:** No weight shift idle. He holds the forward orientation. His particles increase — ember sparks rise more frequently from his edge. A heat shimmer at the portal boundary.

**Eye direction:** At the user. Held. Casper in active state does not look away.

**What it communicates:** He has something to say and he's going to say it directly.

---

### REFLECTIVE STATE

**Posture:** The lean releases. He settles back onto both feet — balanced, less directed. One hand goes to the back of his neck briefly, then drops. He hasn't disengaged, but the urgency has left his frame.

**Head:** Tilted slightly — not bowed, not averted. A 5–10° angle to one side. The quality of someone who just heard something and is letting it settle.

**Arms/hands:** Both at rest. One loose at his side. One at his hip or with a thumb hooked at a pocket. No gesture outward — the energy has gone inward.

**Idle in reflective:** Very slow breathing lift — 2px vertical over 5 seconds. Almost imperceptible. His ember particles reduce to minimum — a single slow drift every few seconds.

**Eye direction:** Angled down and to one side. Not at the user. Giving them the space. He is present but not watching.

**What it communicates:** The card has said what it needed to say. He's not chasing it.

---

### PORTAL ARRIVAL / EXIT ANIMATIONS

**Living Circle arrival (80px / 120px):**
- Portal edge traces from bottom to full circle over 400ms, avatar accent ember — circuit trace style
- Portrait fades in as circle completes, 200ms, ease-out
- On completion: idle begins immediately

**Living Circle exit:**
- Portrait fades 300ms
- Circle edge fades 200ms, overlapping

**Arch arrival (full portrait):**
- Arch traces from base upward — two vertical lines rise, then connect at the apex, over 600ms, avatar accent
- Portrait fades in behind arch as it completes, 300ms, ease-out
- Casper's arrival in arch: he is already in forward-lean active posture on appearance. He does not arrive passive.

**Arch exit:**
- Portrait fades 400ms, ember particles linger briefly at 30% opacity before dissolving (200ms additional)
- Arch fades 300ms

---

## 03 — ELI / AIR / SWORDS

**Physical baseline:** Light, elegant, slightly asymmetrical. He holds himself like someone who has developed a careful relationship with their own awkwardness — not self-conscious, but precise. There is always something slightly off about his symmetry in exactly the right way.

---

### NEUTRAL STATE

**Posture:** Standing, but not quite still. A very subtle weight distribution that shifts occasionally — his body has a thinking quality. Not restless like Casper. More like a system processing. One hip marginally dropped. His layered clothing has a drift to it.

**Head:** Tilted — always slightly. 5–8° is his default. Not dramatic. The natural angle of someone who is listening to something the room can't hear yet. His asymmetrical hair falls consistently with this tilt.

**Arms/hands:** Forearms raised slightly — not crossed, not defensive. One hand might hold a small object (a folded paper, a narrow book, a symbolic small object) at waist height. Not clutching. Resting. The other hand open and dropped.

**Idle animation:** A very slow full-body sway — 1px amplitude, 6-second period. Like a signal antenna in a light breeze. Imperceptible unless you're looking. His hair and clothing layers catch the signal-arc particles occasionally.

**Eye direction:** Angled up and to one side. Not making eye contact. He is thinking about something adjacent to you, not at you. He knows you're there. He's getting to it.

**What it communicates:** He's already a step into the interpretation. He's not waiting to begin.

---

### ACTIVE STATE

**Posture:** He straightens — the tilt resolves. He becomes more symmetrical in active state, which is actually slightly surprising. The asymmetry was his idle; the attention is his upright.

**Head:** Level. Eyes forward and slightly widened — not alarmed, curious. The quality of someone who has just seen the pattern.

**Arms/hands:** The held object may transfer to his other hand, or be set aside. His gesturing hand lifts — an open palm, or two fingers raised in a thinking gesture, or pointing at something slightly off to the side as if annotating the air. He illustrates as he communicates.

**Transition from neutral:** Tilt resolves (200ms), posture straightens (250ms offset), hand rises (200ms offset). Total: 500ms. Slower than Casper — Eli assembles his engagement rather than surging into it.

**Idle in active:** Subtle head oscillation — very small, 2–3° back and forth over 3 seconds. The physical manifestation of active processing.

**Eye direction:** Forward, held. But occasionally cuts briefly to one side (a 0.5s glance away) and returns — as if checking the thought against another reference. This is character behaviour, not distraction.

**What it communicates:** He has isolated something. He's about to show it to you.

---

### REFLECTIVE STATE

**Posture:** The tilt returns — deeper this time. 10–12°, more pronounced than neutral. He is turned slightly away, one shoulder toward the portal edge. He is thinking more than presenting.

**Head:** Bowed slightly from the tilt — not dejected. Contemplative. A person re-reading something internally.

**Arms/hands:** Folded loosely — not defensive, just contained. Or one hand at his chin, a slow thinking gesture. The held object returns to both hands if he set it down.

**Idle in reflective:** The sway amplitude increases very slightly — 2px, 7-second period. His signal arc particles reduce but become more visible — slower, clearer traces.

**Eye direction:** Down and inward. Away from the user entirely. He is not giving them anything new. He is letting the silence be useful.

**What it communicates:** He has said what he can say. The rest requires the user to do their own thinking.

---

### PORTAL ARRIVAL / EXIT ANIMATIONS

**Living Circle arrival:**
- Signal arcs trace the circle perimeter — not all at once, sequentially, like a signal completing, 500ms
- Portrait appears as arcs close, 200ms, ease-out
- On arrival: idle tilt present immediately

**Living Circle exit:**
- Signal arcs dissolve outward from one point, 300ms
- Portrait fades with arcs, 200ms

**Arch arrival (full portrait):**
- Arch traces differently — signal lines draw themselves, then glyph fragments briefly appear at the arch apex before resolving into the clean arch geometry, 700ms total. More layered than Casper's arrival.
- Portrait fades in, 300ms
- Eli arrives in his asymmetric neutral — he does not surge forward. He arrives already processing.

**Arch exit:**
- Portrait fades 400ms
- Arch dissolves — glyph fragments appear briefly at apex again as the arch un-draws, then clear. The arch remembers its pattern on the way out.

---

## 04 — OLIVIA / EARTH / PENTACLES

**Physical baseline:** Settled, capable, compact. She occupies exactly the space she needs and no more. Her stillness is not absence — it is the stillness of someone who has decided something already. Her hands look capable. She does not gesture unless there is something to gesture at.

---

### NEUTRAL STATE

**Posture:** Rooted. Both feet planted. Weight even or slightly back — not retreating, just grounded. She does not lean forward. She does not drift. A settled stance, arms at her sides or one forearm across her body holding the opposite arm loosely.

**Head:** Level. Slightly lowered from horizontal — not watchful, just settled. The quality of someone who has stopped performing being ready.

**Arms/hands:** One arm loose at her side. The other bent at the elbow, hand resting — on her own forearm, or at her waist. Her hands are not decorative. They're at rest the way hands are when they've done real work.

**Idle animation:** A single slow breath — a 3px chest rise over 4 seconds, ease-in-out sine. Her botanical particles drift past her — she does not react to them. They belong to her world.

**Eye direction:** Forward and level. She looks at you. Not performing the look — just looking. Unhurried.

**What it communicates:** She is not trying to impress you. She is simply here, which turns out to be enough.

---

### ACTIVE STATE

**Posture:** She does not lunge or surge. She orients — a slow, deliberate turn toward you. Weight shifts forward fractionally. The impression is of a person who has decided to direct their full attention, which is a different kind of weight than Casper's forward momentum.

**Head:** Lifts 5° from neutral. Direct eye contact now, sustained. She does not blink out of it.

**Arms/hands:** One hand moves — outward, palm up, a measured open gesture. Not offering. Presenting. The difference is that she is not asking you to take anything; she is showing you something that is already yours. The movement is slow and deliberate — 400ms to full extension.

**Transition from neutral:** Weight shift (200ms), head lift (150ms offset), hand opens (300ms offset). Total: 600ms. The slowest avatar transition. She does not hurry.

**Idle in active:** No idle movement. She holds. The breath animation continues. Her root-line particles increase slightly at the portal edge — but she does not move.

**Eye direction:** At the user. Sustained. She will not look away first.

**What it communicates:** I have looked at this. Here is what I see. Take your time with it.

---

### REFLECTIVE STATE

**Posture:** Returns to rooted but opens slightly — a small weight shift back, the hand that extended now returned and both at rest. She has not closed off. She has simply completed the offering.

**Head:** Very slight downward tilt — 3–5°. The quality of looking at something near rather than far. Patient.

**Arms/hands:** Both at rest. No gesture. The capable stillness of her neutral, but warmer — less neutral and more present.

**Idle in reflective:** The breath slows — 6-second period. A single botanical spore drifts past at longer intervals. Her portal edge softens — the root lines dim slightly.

**Eye direction:** Forward but softened — not at you directly, not away. The middle distance. She is holding the space, not filling it.

**What it communicates:** Stay as long as you need. There is no rush here.

---

### PORTAL ARRIVAL / EXIT ANIMATIONS

**Living Circle arrival:**
- Root lines trace the circle from the bottom, growing upward, 500ms — like something growing rather than drawing
- Portrait appears as roots complete, 250ms, ease-out
- Olivia arrives in neutral posture, grounded

**Living Circle exit:**
- Root lines retract — from top back downward, 400ms
- Portrait fades with retraction, 200ms

**Arch arrival (full portrait):**
- Root lines grow from base of arch upward along both sides — slower than the emblem circle, 800ms total
- At arch apex: a botanical detail briefly blooms — a small leaf edge or root curl — before resolving into clean arch geometry
- Portrait appears, 300ms
- Olivia arrives in neutral. She does not arrive activated. She is already here when the arch completes.

**Arch exit:**
- Botanical detail at apex briefly reappears (100ms) as arch un-draws
- Root lines retract from apex down, 500ms
- Portrait fades during retraction, 300ms

---

## 05 — DESTINY / WATER / CUPS

**Physical baseline:** Soft, flowing, unhurried. Her silhouette moves like her clothing — translucent layers always slightly in motion. She occupies her space without filling it. There is something slightly haunted about her expression — not sad, just present in a way most people are not.

---

### NEUTRAL STATE

**Posture:** A gentle contrapposto — weight on one leg, opposite hip dropped, a soft curve through her frame. Not posed. It is simply how she stands when she is not doing anything. Her draping clothing settles around this naturally.

**Head:** Slightly tilted, opposite direction from Eli's — her tilt is softer, less angular. Her hair falls damp and loose across one shoulder. Her eyes are level and unhurried.

**Arms/hands:** Both at her sides, hands loose. One arm may be slightly extended — not gesturing, just open. Like a person who is used to being approached.

**Idle animation:** A slow, full-body weight shift — 2px, 6-second period — like breathing water. Her hair and clothing layers move with the micro-ripple particles. A faint ripple from her resting point spreads outward once every 10–12 seconds — a water quality, barely visible.

**Eye direction:** At you, but softened — she is not looking at you the way Olivia looks at you (direct assessment). She is looking at you the way someone does when they are trying to understand what you need. There is a warmth in it that is not performance.

**What it communicates:** She already knows something is going on with you. She is not going to rush it.

---

### ACTIVE STATE

**Posture:** She stills from the contrapposto — weight centres slightly. She does not surge forward. She deepens — a slow lowering of her centre of gravity, as if settling into something. The effect is of increased presence rather than increased energy.

**Head:** Lifts from the tilt. Her eyes open slightly — not wide, just fully present. The haunted quality gives way to a focused softness.

**Arms/hands:** One hand rises to near chest height — not reaching out, held inward. A quality of receiving, not transmitting. As if the card's energy is something she is also holding.

**Transition from neutral:** Centre of gravity lowers (200ms), head lifts (200ms offset), hand rises (300ms offset). Total: 500ms. Fluid, not sharp.

**Idle in active:** Her ripple frequency increases slightly — once every 6–8 seconds. Her mist layer thickens fractionally at the portal edge. She holds her position with the same ease as her neutral.

**Eye direction:** Fully at the user. Held, soft, sustained. She will not look away. But the quality is holding rather than assessing.

**What it communicates:** I am with you in this. Whatever this card is, we're looking at it together.

---

### REFLECTIVE STATE

**Posture:** Returns to contrapposto — softer than neutral, more settled. As if she has exhaled something. One hand may come to rest at her own chest briefly, then drop. She is giving the reading back to the user.

**Head:** Returns to the soft tilt, slightly deeper — 8–10°. Her hair falls more fully across her shoulder. She has turned a few degrees away — not retreating, but no longer directing.

**Arms/hands:** Both at rest. Loose. The quality of someone who has finished saying what they needed to say and is now simply present.

**Idle in reflective:** The water idle slows and deepens — her sway period extends to 8 seconds. A single ripple every 15 seconds. Her mist layer thickens slightly — her world becomes quieter, more interior.

**Eye direction:** Down and to one side. Away from you. Not dismissive — private. She is giving you the space to sit with it.

**What it communicates:** You showed up. That matters. I'm still here, but the rest is yours.

---

### PORTAL ARRIVAL / EXIT ANIMATIONS

**Living Circle arrival:**
- Ripple rings trace the circle outward from centre — two concentric rings expanding, the outermost becoming the portal edge, 500ms
- Portrait appears as rings settle, 200ms, ease-out
- Destiny arrives in neutral — soft contrapposto, already present

**Living Circle exit:**
- Portrait fades 300ms
- Ripple rings contract inward — rings converge back to centre point, 400ms, ease-in

**Arch arrival (full portrait):**
- Moonlight quality builds first — a pale diffuse glow at the arch top before the arch draws, 200ms
- Arch traces from apex downward (opposite to Casper/Olivia) — water quality flows down, 600ms
- Portrait appears, 300ms
- Destiny arrives in neutral. Her arrival is quiet. The arch completes around her rather than announcing her.

**Arch exit:**
- Portrait fades 400ms — the slowest avatar portrait fade, most gradual
- Arch dissolves from base upward, 400ms
- Moonlight glow fades last, 200ms — like light going off water

---

## 06 — PER-SURFACE PRESENCE RULES

### Where each portal shape and state applies

| Surface | Portal shape | Scale | Default state | Notes |
|---------|-------------|-------|--------------|-------|
| Daily draw (pre-reveal) | Living Circle | 120px | Neutral | Idle animation active |
| Daily draw (card revealed) | Living Circle | 120px | Active | Fires on card face resolving |
| Daily draw (post-reading) | Living Circle | 120px | Reflective | Fires after companion line settles |
| Reading screen (ambient) | Living Circle | 120px | Neutral | Same as daily draw |
| Reading screen (post-reveal) | Living Circle | 120px | Active | Same as daily draw |
| Reading screen (post-companion line) | Living Circle | 120px | Reflective | Same as daily draw |
| Onboarding — avatar selection (Screen 10) | Arch | Full | Neutral | All four shown simultaneously at reduced scale |
| Onboarding — companion confirmed (Screen 11) | Arch | Full | Active | One avatar, full presence, world unlocks |
| Onboarding — first draw (Screen 12) | Living Circle | 120px | Active → Reflective | Transitions during first draw |
| Profile — companion section | Living Circle | 80px | Neutral | No active/reflective transitions on profile |
| Avatar switching modal | Living Circle | 80px | Neutral | All four shown. Selected avatar animates to active briefly on tap. |
| Navigation tab | Emblem only | 24px | — | No avatar states at this scale. Emblem only. |
| Codex | None | — | — | Avatar is voice only. No portal. No portrait. |
| Journal | None | — | — | Avatar is voice only. No portal. No portrait. |

---

### State transition timing per surface

| Transition | Duration | Easing |
|-----------|----------|--------|
| Neutral → Active | 400–600ms (avatar-specific per Section 02–05) | ease-in-out |
| Active → Reflective | 800ms | ease-out |
| Reflective → Neutral (next session) | Not animated — state resets on session close |
| Active hold before return | 1.5 seconds (3 seconds on recognition) | — |

---

## 07 — LOTTIE PRODUCTION NOTES

- **One Lottie file per avatar, per state:** `casper-neutral.json`, `casper-active.json`, `casper-reflective.json` × 4 avatars = 12 files minimum
- **Separate files for portal arrival/exit:** `casper-circle-arrival.json`, `casper-arch-arrival.json`, `casper-circle-exit.json`, `casper-arch-exit.json` × 4 avatars = 16 files
- **Idle loops:** All neutral/active/reflective files loop. Arrivals and exits play once.
- **State triggers in code:** Drive via `avatarStore.setAvatarState(state)` — same store that handles aura. State values: `'neutral' | 'active' | 'reflective'`.
- **Scale handling:** Lottie files authored at 240px reference size. React Native scaling handles 80px and 120px render targets. Do not produce separate files per scale.
- **Particle layer:** Avatar particles (ember drift, signal arcs, root lines, micro-ripple) are part of the Lottie composition — they are not separate Skia layers at the avatar level. Exception: portal edge glow treatment is Skia (avatar accent system). Coordinate the boundary carefully.
- **Task #64:** Emblem trace draw-on + pulse are separate Lottie files (`casper-emblem-reveal.json` × 4, `casper-emblem-pulse.json` × 4). These are defined in the emblem prompt library and are not part of this spec.

---

*Majestic — Avatar Gesture & Posture Library — v1.0*
*Your adventure. But Majestic.*
