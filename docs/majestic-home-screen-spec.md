# MAJESTIC — HOME SCREEN SPEC
## Ground State / Command Center — Task #170 + #171
*Your adventure. But Majestic.*

**Version:** 1.0
**Status:** LOCKED — confirmed June 2026
**Related:** majestic-navigation-architecture-spec.md

---

## 01 — NARRATIVE ROLE

The home screen is the threshold. The user is not inside Threshold City — they are at the edge of it, looking in. From this command center position they receive what they need for the day, then choose where to go.

This is the operational state. Not introspective, not expansive — present and ready. What do I need today? What's happening in my world right now?

The home screen sets the tone for the entire session. It must feel alive, atmospheric, and personally addressed — without being overwhelming.

---

## 02 — ENVIRONMENT — COMMAND CENTER

See `majestic-navigation-architecture-spec.md` Section 02 (State 1) for full environment spec.

**Summary:** A panoramic window looking out at Threshold City. The user is inside a dark, minimal command center. HUD elements on the glass. Console hardware at the bottom edge. The city breathes outside.

**Avatar colour temperature:** The city's neon glow subtly shifts per active avatar. Pending Luke confirmation.

---

## 03 — CONTENT STRUCTURE

The home screen UI sits as a HUD layer over the command center window. Semi-transparent panels, glassmorphism blur — city reads through underneath. Everything is floating in front of the glass.

**Stack from bottom to top of scroll:**

### A — Avatar Selector (compact)
Avatar pill showing active companion — emoji/avatar icon + name. Tap to switch. Shows avatar accent border. Remaining avatars accessible via "+3" or carousel.

### B — Personalized Greeting
Two lines. Co-Star register — second person, direct, present tense.

```
[time-of-day signal]  ·  [moon phase]
Good morning, [name].
```

Space Mono for the metadata line. Cinzel for the greeting proper.

### C — Daily Directive
**The most important piece of copy on the home screen.**

One to two sentences. Informed by today's card. Co-Star coded — no hedging, no softening, second person, fragment syntax where appropriate.

> *The pause isn't failure. Stop trying to outrun it today.*

Montserrat body, bone white, slightly larger than body size. This is not a caption. It is the day's message.

**Voice:** Neutral Majestic voice at home screen level — not avatar-voiced. The avatar voice lives in Dig Deeper and the altar. The home directive is direct from the world.

### D — Pop Culture Reference Card

A single tangible hook that unlocks the card's meaning through something the user already knows. Film, song, historical moment, artwork, or quote — one type per day, rotated.

**Format:**
```
[media type icon]  "[Reference title]"  — [Author/Artist/Context]

One sentence connection back to the card. Makes the through-line explicit.
```

**Reference types:** Film, song, historical figure/moment, artwork, quote. Five types = five ways to hit the same card meaning.

**Avatar filtering:** References are drawn from the active avatar's cultural domain:
- **Destiny** → music, neo-soul, conscious R&B, emotionally felt art
- **Olivia** → literature, cultural movements, social history (Lorde, Morrison, hooks, Angelou register)
- **Eli** → film, anime, prestige TV, visual media
- **Casper** → sport, performance under pressure, competition history, business

**Freshness system:**
- Multiple reference types per card (5-6 per card per avatar)
- Same reference cannot repeat within 30 days (enforced by data layer)
- Avatar switch changes the reference pool entirely
- Moon phase modifier subtly shifts the framing language (waxing: lean in, waning: release)

**Content requirement:** 78 cards × 4 avatars × 5-6 references = ~1,500-1,800 reference units. See Task #175.

### E — Observational Prompts
Two or three short lines. Present tense. Awareness, not obligation. Informed by the card but not prescriptive.

Prompt types rotate:
- *Watch for:*
- *Be mindful of:*
- *Notice today:*
- *Pay attention when:*

These are not a to-do list. They do not have checkboxes. They are carried — read once, held throughout the day.

```
Watch for: the moment you reach for your phone instead of sitting with a feeling.
Be mindful of: advice from someone who doesn't know the full story.
```

Space Mono for the label. Montserrat for the content. Mist grey palette.

### F — Daily Card
The card drawn for today. Visible as a thumbnail with the card name. Tap to expand to full card detail / Codex entry.

```
[Card thumbnail at reading scale]
[Card name — Cinzel]
[Small: "Tap to explore in the Codex"]
```

### G — Moon Phase Strip
Ambient world context. Compact. One line.

```
🌘  [Moon phase name]  ·  [One-line implication]
```

Space Mono, mist grey. This is informational, not decorative.

---

## 04 — CONTENT VOICE — CO-STAR REGISTER

The home screen daily directive and observational prompts use the Co-Star register. This means:

**Characteristics:**
- Second person singular — "you", always
- Fragment sentences — no padding, no explanatory filler
- Uncomfortable specificity — feels like it already knows something
- Present tense observation — not future prediction
- No hedging — no "might", "could", "maybe", "perhaps"
- Cosmic frame, human problem — bridges card meaning and real-world moment

**What it is not:**
- Fortune telling ("today you will...")
- Generic affirmation ("you are strong and capable...")
- Soft suggestion ("you might want to consider...")
- Avatar-voiced (the avatar lives in Dig Deeper — home screen is world voice)

**Examples (High Priestess):**
> *You already know the answer. You're asking other people because you're afraid of it.*
> *Watch for: the moment you ask for an opinion on something you've already decided.*

**Examples (The Tower):**
> *Something is breaking down. That's not the problem — your resistance to it is.*
> *Notice today: where you're holding on harder than the situation requires.*

---

## 05 — DAILY DRAW METHOD

**Unresolved — decision needed.**

The method by which today's card is selected has not been locked. Options:
1. **Algorithmic** — system selects based on aura state, moon phase, or random draw
2. **User-selected** — user performs their own selection via the altar (fan selection)
3. **Hybrid** — algorithmic default with option to override via Reading tab

This decision affects the home screen UX flow significantly. Flagged for Luke decision. Until resolved, the prototype assumes algorithmic draw displayed on home screen with a "read more" pathway to the Codex.

---

## 06 — OPEN DECISIONS

1. **Daily draw method** — algorithmic, user-selected, or hybrid?
2. **Avatar colour temperature** — city shifts per active avatar?
3. **Directive content** — 22 Major Arcana directives needed before build. See Task #177.
4. **Reference database** — research phase required before content production. See Task #175.

---

*Document owner: Oso. Confirmed June 2026.*
*Related: majestic-navigation-architecture-spec.md, majestic-altar-ritual-spec-v2.md*
