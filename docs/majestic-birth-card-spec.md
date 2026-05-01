**Majestic**

Onboarding Narrative & Flow

*Version 2.0  —  Full Rewrite*

*Your adventure. But Majestic.*

**01  Overview**

**Three-phase structure**

Onboarding is the most important experience in the entire app. It is where the brand promise lands or dies. For Majestic it carries particular weight because the audience arrives already primed for depth — through cultural recommendation, aesthetic recognition, or quiet personal curiosity. They are sceptical of being profiled, sold to, or sorted. Every screen must honour that.

Onboarding now runs in three distinct phases:

| **Phase** | **Name** | **Purpose** | **Screens** |
| --- | --- | --- | --- |
| **01** | Signal & Entry | World entry. Terminal moment. Name and date of birth. The user becomes real inside the world. | 01 — 04 |
| **02** | The Majestic Profile | Birth card calculation. Personality card and soul card revealed. First codex entry. | 05 — 07 |
| **03** | Choose Your Companion | World quiz. Avatar recommendation. Conscious selection. UI theme and tone of voice locked. | 08 — 12 |

**Design principles**

**Theme: **Threshold City as primary atmosphere — Folklore Signal bleeds in from Phase 2 onward

**Motion tone: **Ceremonial, restrained. Each transition feels like a threshold crossing not a page load

**Copy tone: **Scene-setting not selling. Present-tense. World-adjacent. Never clinical or administrative

**Terminal register: **Phase 1 uses a command-line aesthetic — monospace type, character-by-character reveal, blinking cursor. The world's interface reaching out

**Avatar reveal timing: **Withheld until Phase 3. The user earns the introduction

**Quiz philosophy: **External scenarios not personal questions. The user solves world problems not self-assessments. Avatar recommendation surfaced as suggestion not result

**What onboarding must never do**

- Explain too much — the world reveals through feeling not exposition

- Feel like a sign-up flow — no form energy, no administrative progress bars

- Profile the user obviously — questions are world-adjacent scenarios not personality tests

- Rush — every beat needs room to land

- Use wellness language, fortune-telling framing, or spiritual jargon

- Present avatar selection as a personality result — it is a conscious choice informed by a suggestion

**02  Phase 1 — Signal ****&**** Entry**

**PHASE 01  —  ****Signal ****&**** Entry***     The world reaches out. The user becomes real inside it.*

Screen 01  —  **Signal***     / World entry — atmosphere only*

**[ ATTRACTION ]**

**[ ATMOSPHERE ]**

**[ THRESHOLD CITY ]**

*Something in this city reads patterns.*

It always has. Not everyone notices.

**Motion**

- App opens to a single full-screen environment — rain on glass, canal reflection, rooftop mist, or signal light filtering through overgrowth. No UI chrome. Just world.

- A single unidentifiable emblem pulses faintly in the distance.

- Headline fades in slowly. No button. After a beat a subtle tap-anywhere cue appears — not a button, a breath.

- Transition: the emblem drifts toward the user as the screen dissolves. Not a swipe. A crossing.

**Audience notes**

- Anime-spiritual: immediate emotional world-entry before any product logic appears.

- Tabletop-lore: the emblem signals a visual system worth learning.

- Occult-esoteric: the restraint communicates seriousness. This is not a wellness app.

Screen 02  —  **The Terminal***     / Command-line entry — name*

**[ TERMINAL REGISTER ]**

**[ WORLD ENTRY ]**

**[ IDENTITY ]**

This screen establishes the command-line aesthetic. Monospace type. Character-by-character text reveal. A blinking cursor. The world's interface has noticed the user is here.

MAJESTIC SIGNAL DETECTED.

INITIALISING.

...

Before we go further —

What do you go by?

> _

The user types their name. Single field. No label. Just the cursor waiting.

On confirm:

[Name].

Good. The signal has you now.

**Motion**

- Text types itself out character by character at a measured pace — fast enough to feel alive, slow enough to feel intentional.

- The cursor blinks. The environment breathes behind the terminal layer.

- On name confirmation — the user's name appears back at them in the terminal register. First time Majestic has used their name. It should feel like being seen.

- Brief pause after confirmation. Then the terminal resumes.

**Design notes**

- The terminal aesthetic is not retro for its own sake. It belongs to the Majestic world — signal systems, wayfinding terminals, environmental interfaces. It feels like the city's infrastructure is initialising a connection.

- This moment of the name appearing back at the user is load-bearing. It is the first proof that Majestic is paying attention.

- No back button on this screen. The user has stepped through the threshold.

Screen 03  —  **The Clock***     / Date of birth — temporal reading*

**[ TERMINAL REGISTER ]**

**[ BIRTH DATA ]**

**[ PROFILE INITIALISATION ]**

One more thing, [Name].

When did you arrive?

DAY   MM   YYYY

> _

Three minimal input fields — day, month, year. Clean, restrained. Not a date picker. The terminal register continues.

On confirm:

Calculating.

...

The signal is reading your pattern.

**Motion**

- The calculating beat is a genuine moment of anticipation. The cursor blinks. Environmental particles gather faintly — the first hint that something is being assembled specifically for this user.

- Transition to Phase 2 is the most significant motion beat so far — not a screen slide but a dissolution, as if the terminal is giving way to something deeper.

**Design notes**

- When did you arrive is deliberately poetic. Not date of birth. Not DOB. The language is in the world register without being obscure.

- The birth card calculation runs in the background during the transition. The result is ready before the next screen loads.

- Edge case: if the numerology produces two different cards for personality and soul, both are surfaced. If the reduction produces the same card for both — which can happen — the profile screen acknowledges this as a notable reading.

Screen 04  —  **Threshold***     / Transition into profile — world deepens*

**[ TRANSITION ]**

**[ ANTICIPATION ]**

**[ WORLD DEEPENING ]**

*The pattern is older than you think.*

And more specific than you expected.

**Motion**

- Full environmental transition. The terminal layer dissolves. The world opens — richer, deeper, more atmospheric than the opening screen.

- The elemental world shifts toward the user's calculated element — warmth for Fire, cool water light for Water, moss and amber for Earth, luminous silver for Air. Barely perceptible at this stage.

- A single card back drifts into frame — face down. It settles. Waits.

- Tap to continue — but the user will tap immediately. The anticipation is doing its job.

**03  Phase 2 — The Majestic Profile**

**PHASE 02  —  ****The Majestic Profile***     Birth cards revealed. The user**'**s foundation established.*

Phase 2 is the emotional centrepiece of onboarding. The birth card system gives every user two cards that belong only to them — before they have drawn a single card, before they have done any work in the app. They arrive with a foundation that is already uniquely theirs.

**The two-card system**

**Personality Card: **Who they are. Their shadow, their essence, the archetype they carry. The given — the thing they were born into. Corresponds to a Major Arcana card.

**Soul Card: **Their purpose. Who they are here to embody. The becoming — the direction of their growth. Also a Major Arcana card, sometimes the same as the personality card.

**Calculation: **Day + Month + Year digits summed and reduced numerologically to a number between 1 and 22, mapping to the Major Arcana. The soul card uses a secondary reduction of the personality card number where applicable.

**Same card result: **If personality and soul cards resolve to the same card the profile acknowledges this — this person carries their purpose as their nature. Present this as significant not as a technical limitation.

*Full calculation logic, edge cases, and numerology rules to be documented in a separate technical spec for development.*

Screen 05  —  **Personality Card Reveal***     / First card — who they are*

**[ REVELATION ]**

**[ PROFILE ]**

**[ ARCHETYPAL IDENTITY ]**

The face-down card from screen 04 is still present. The avatar has not appeared yet. This reveal belongs to Majestic — the brand voice, not a companion.

*[Name]. This is your personality card.*

This is who you are. Your shadow. Your essence. The archetype you were born carrying.

The card flips. Magical Relic transformation sequence — compressed, ritualistic:

**Reveal motion sequence**

- Card lifts — light gathers at the edges, emblem wakes

- Elemental rings orbit the card — subtle, atmospheric, not overdone

- Card rotates in 3D — energy bloom at the apex of the flip

- Card face resolves — the user sees their personality card for the first time

- Card settles into a quiet breathing pulse

Below the card — three lines appear in sequence:

*[Card Name]*

[One-line essence of this card in Majestic's world — present tense, emotionally honest, not fortune-telling]

This card tends to come up a lot for you. You will see why.

**Design notes**

- The final line — this card tends to come up a lot for you — is the first hint of the ongoing resonance mechanic. It plants the expectation without explaining the system.

- Card interpretation copy for all 22 Major Arcana personality card readings to be written as a separate content doc — one essence line and one shadow line per card.

- A soft tap-to-continue appears after a generous beat. The user should have time to sit with this.

Screen 06  —  **Soul Card Reveal***     / Second card — their purpose*

**[ REVELATION ]**

**[ PURPOSE ]**

**[ BECOMING ]**

*And this is your soul card.*

Not who you are. Who you are here to become.

Second card drifts in beside or below the personality card. Same reveal sequence but with a different elemental quality — softer, more expansive. The soul card reveal should feel like a horizon opening rather than a truth landing.

*[Card Name]*

[One-line purpose statement for this soul card — directional, aspirational, grounded]

**If personality and soul cards are the same**

*Both cards are the same, [Name].*

You carry your purpose as your nature. Some people spend a lifetime finding what you were born knowing. The work is learning to trust it.

**Design notes**

- The two cards now sit together on screen — personality and soul. The user can look at them side by side before moving on.

- This is the user's Majestic Profile in its simplest visual form. These two cards will appear in their codex, surface in their readings, and be acknowledged whenever they appear in a draw.

Screen 07  —  **Profile Summary***     / The Majestic Profile established*

**[ PROFILE ]**

**[ CODEX ENTRY ONE ]**

**[ CONTINUITY BEGINS ]**

*This is your Majestic Profile, [Name].*

Your foundation. Your first entry in your codex. Everything that follows will be read in light of this.

A clean summary screen showing:

- Personality card — name, archetype, one-line essence

- Soul card — name, archetype, one-line purpose

- A quiet note: These cards tend to appear in your readings. When they do, Majestic will recognise them.

**Motion**

- This screen is quieter than the reveals. The work has been done. The atmosphere settles.

- A codex emblem appears briefly — the first marker in the user's personal continuity. Not gamified. Just acknowledged.

- Transition to Phase 3 is gentle — the profile recedes and the world opens again, now with the user's elemental colour more present.

**Design notes**

- The Majestic Profile screen will exist permanently in the app — accessible from the user's profile or codex at any time.

- The resonance mechanic — highlighting personality and soul cards when they appear in readings — is a core retention feature. This screen plants that expectation at the start.

**04  Phase 3 — Choose Your Companion**

**PHASE 03  —  ****Choose Your Companion***     The quiz. The recommendation. The conscious choice. The UI unlocks.*

Phase 3 introduces the avatar system for the first time. The user now knows who they are and what they carry. The question becomes: how do they want to be guided through it?

The quiz uses externally-framed world scenarios — not personal questions. The user solves problems in the Majestic world. The way they solve them reveals the companion mode that fits them right now. The recommendation is surfaced as a suggestion. The final selection is always a conscious choice.

*Avatar selection determines: the UI theme that loads on first session, the tone of voice across all readings and prompts, the atmospheric world layer the user inhabits. It can be changed at any time.*

Screen 08  —  **World Entry for Quiz***     / Transition and framing*

**[ TRANSITION ]**

**[ QUIZ ENTRY ]**

**[ WORLD SCENARIO FRAMING ]**

*The world has patterns too.*

Four questions. No wrong answers. Just how you move.

**Design notes**

- This brief screen prepares the user for the quiz register — world-adjacent scenarios rather than personal questions.

- No wrong answers is essential framing. The user must feel safe responding instinctively rather than strategically.

- The four avatar emblems appear very faintly in the background — barely visible. First glimpse of what is coming.

Screen 09  —  **The Quiz***     / Four world-scenario questions*

**[ AVATAR ALIGNMENT ]**

**[ WORLD SCENARIOS ]**

**[ PREFERENCE SIGNAL ]**

Each question occupies its own screen. The environment shifts subtly with each question — not dramatically, just a different quality of light or atmosphere. Questions arrive one at a time. No progress counter visible to the user.

***You find an abandoned plant shop in the city. Everything inside is still growing — somehow. What do you do?***

Take the most interesting one home and figure out what it needs*  → Olivia*

Sit in there for a while. It feels like it has something to say*  → Destiny*

Start asking around. Someone has been keeping this place alive*  → Eli*

Open it back up. Places like this shouldn't stay closed*  → Casper*

***Someone in your city has been leaving tiny handwritten notes in unexpected places for years. You just found one. It says something that feels oddly specific to your life right now. First thought?***

Who is this person and how did they know*  → Eli*

You keep it. It found you for a reason*  → Destiny*

You write one back and leave it somewhere new*  → Casper*

You wonder how many other people needed to find it today*  → Olivia*

***A signal has been broadcasting from somewhere in the city for years. Most people tune it out. You never have. What keeps drawing you back?***

It changes slightly every time. Something is trying to be understood*  → Eli*

It feels like company somehow*  → Destiny*

You want to be the one who finally figures out where it's coming from*  → Casper*

Because something that consistent deserves to be acknowledged*  → Olivia*

***You stumble onto a rooftop garden nobody seems to know about. In the middle of the city. Fully alive. Your first instinct?***

Explore every corner of it immediately*  → Casper*

Stay very still and just take it in*  → Destiny*

Try to work out how it got here and who planted it first*  → Eli*

Come back tomorrow with something to contribute to it*  → Olivia*

**Scoring logic**

- Each answer maps to one avatar. Tally across four questions. Highest score is the recommended companion.

- Tiebreaker: if two avatars tie, the question 4 response takes priority as the most recent and most considered signal.

- The recommendation is always one avatar. The user can override at any time.

Screen 10  —  **Recommendation***     / Avatar suggested — not assigned*

**[ RECOMMENDATION ]**

**[ AVATAR FIRST APPEARANCE ]**

**[ USER CHOICE ]**

The recommended avatar appears for the first time. They arrive through their element — not full portrait immediately. Ember glow for Casper, water light for Destiny, luminous signal lines for Eli, rooted warmth for Olivia.

*Right now — [Avatar name] tends to find people like you.*

The avatar's introduction copy appears in their own voice — the same four lines defined in the Brand Voice document. Then the Majestic line:

You made it here for a reason. Let's begin.

Below the recommendation — the four avatars shown small, side by side, each with their name and a single-line essence. A quiet prompt:

Or choose your own companion.

**Avatar UI theme mapping**

| **Avatar** | **Element** | **UI Theme** | **Atmosphere** |
| --- | --- | --- | --- |
| **Casper** | Fire | Threshold City | Urban mystery, signal energy, forward momentum, ember warmth |
| **Destiny** | Water | Folklore Signal | Quiet spirituality, mist and moonlight, reflective depth, hidden world |
| **Eli** | Air | Codex Arc | Systems and pattern, luminous aqua, interpretive intelligence, signal clarity |
| **Olivia** | Earth | Magical Relic | Grounded warmth, botanical weight, relic intimacy, steady presence |

**Design notes**

- The recommendation is a suggestion not a result. The language must reflect this — tends to find people like you not you have been matched with.

- The user who overrides the recommendation and picks a different avatar is doing exactly what Majestic wants — trusting their own read. This should never feel like a wrong choice.

- On selection, the chosen avatar's UI theme begins loading in the background. The transition to the home screen will feel like entering that avatar's world.

Screen 11  —  **Companion Confirmed***     / Selection complete — world unlocks*
**Auth note:** The authentication prompt fires at this screen — after the avatar's first words and a 1-second hold. A bottom sheet appears with Apple Sign In and Google Sign In only. No email/password. Copy: "Your companion is set. Let's make sure the world remembers you." Full timing, copy, fallback logic, and dev implementation in `majestic-auth-monetisation-spec.md`.


**[ CONFIRMATION ]**

**[ WORLD UNLOCK ]**

**[ UI THEME LOADS ]**

The chosen avatar appears fully for the first time — their element at full presence, their emblem resolved, their environment visible behind them.

*[Avatar name] is with you.*

One line from the avatar in their voice — a brief acknowledgement of the beginning. Not the full introduction copy. Just a first word.

**Avatar first words**

**Casper: **Right. Let's go.

**Destiny: **I'm glad you're here.

**Eli: **There's a lot to explore.

**Olivia: **Good. We'll figure it out together.

**Motion**

- The UI theme bleeds in during this screen — colour temperature, atmospheric overlay, environmental elements shifting to the chosen avatar's world.

- Not a dramatic transformation. A gradual arrival. By the time the user taps to continue, they are already inside their companion's world.

Screen 12  —  **First Draw***     / Ritual established*

**[ RETENTION ]**

**[ RITUAL INITIATION ]**

**[ PERSONAL CONTINUITY BEGINS ]**

*Your first card is ready, [Name].*

Take your time. There is no wrong moment.

A single face-down card sits in the centre of the screen. The avatar is present — small, peripheral, present but not dominating. The UI is now fully in the chosen theme.

**Motion**

- At rest: ambient living signal shimmer on the card edge. Breathing pulse.

- On tap: small lift and glow wake-up.

- On hold: elemental particles gather, glyph trace begins, breathing pulse increases.

- On reveal: card expands into the reading screen — the full product surface seen for the first time.

**First draw reading**

- The avatar gives a brief orientation reading — not a full interpretation. Enough to feel the mechanic and the companion's voice without overwhelming the first session.

- After the reading — a light codex marker appears. The user's second codex entry after their Majestic Profile. Not gamified. Just acknowledged.

- A quiet prompt appears after the reading: Your profile and this draw are now in your codex. The world is starting to know you.

**05  After Onboarding**

**Return session — second open**

The second session is as important as the first. The world should remember the user.

On return, the daily draw is waiting — not a home screen full of options. The avatar greets them briefly in their voice. The Majestic Profile cards are present in the background — a quiet reminder of the foundation.

**Return greetings by avatar**

**Casper: **Ready when you are.

**Olivia: **Good. You came back.

**Eli: **Something interesting arrived overnight.

**Destiny: **I was thinking about what you drew yesterday.

**Avatar switching**

The user can change their companion at any time. This is not abandoning a relationship — it is choosing how they want to be met today. Life changes. Different things are needed at different times.

**Switch prompt: **Who do you need right now?

On switch, the UI theme transitions to the new avatar's world. The transition should feel like crossing into a different part of the same city — not like changing apps.

**Personality and soul card resonance**

When the user's personality or soul card appears in any reading, Majestic acknowledges it. A quiet signal — not a notification, not a pop-up. A subtle highlight on the card and a line from the avatar:

**Casper: **That's your card. Pay attention.

**Olivia: **Your personality card just showed up. Worth noticing.

**Eli: **That card belongs to your profile. The pattern is consistent.

**Destiny: **Your card came back. It has something to say.

**First codex lore fragment**

After the first draw, the user receives their first world lore fragment — a brief atmospheric piece connected to their personality card archetype. It is the first entry in the progressive world unlock. Brief. Evocative. A signal that there is more to discover at their own pace.

Majestic  —  Onboarding Narrative & Flow  —  v2.0

*Your adventure. But Majestic.*
