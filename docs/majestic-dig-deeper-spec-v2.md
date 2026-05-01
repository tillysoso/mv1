# MAJESTIC — DIG DEEPER

## Feature Spec — v2.0

*Supersedes v1.0. Your adventure. But Majestic.*

-----

## 00 — WHAT CHANGED IN V2

The subscription model is now defined. This changes the access model for some Dig Deeper content. Summary of changes from v1.0:

|Content                            |v1.0                          |v2.0                                              |
|-----------------------------------|------------------------------|--------------------------------------------------|
|Avatar lore resonance (Codex)      |Free — all authenticated users|**Free — unchanged. World-building, not utility.**|
|Extended reading (Codex)           |Free — all authenticated users|**Free — unchanged. Depth without angle.**        |
|Love / Career / Life angles (Codex)|Free — all authenticated users|**Subscription only — “Dig Even Deeper” tier.**   |
|Reading screen spread synthesis    |Free — all authenticated users|**Uses reading credit. Subscription = unlimited.**|
|Reading screen angle buttons       |Free — all authenticated users|**Subscription only — same gate as Codex angles.**|

The principle: **the world is free. The advice is gated.**

Avatar lore resonance is the avatar speaking about their relationship to a card — world, character, atmosphere. It stays free because it makes the product feel alive and drives discovery. The angles (Love / Career / Life) are traditional tarot reading utility — specific life-area guidance. That’s the subscription value proposition.

-----

## 01 — WHAT THIS IS

Dig Deeper is a content system that lives in two places: the Codex card detail and the Reading screen. It is the layer beneath the surface read — where the avatar’s personal relationship with a card lives, and where the user can go further than the standard interpretation.

It is not a chat interface. The user does not type questions.

The Codex layer is static and pre-written. The Reading screen layer is LLM-generated and spread-specific. This distinction is intentional and must be maintained.

-----

## 02 — CONTENT & ACCESS MODEL

### Three tiers, two entry points

|Tier           |Label          |Gate                                       |Where                                                                                                                                  |
|---------------|---------------|-------------------------------------------|---------------------------------------------------------------------------------------------------------------------------------------|
|Free           |—              |Authenticated user                         |Codex: avatar lore resonance + extended reading. Reading screen: base avatar interpretation (companion line, aura, card meaning).      |
|Dig Deeper     |DIG DEEPER     |Reading credit (3/day free) or subscription|Reading screen: AI spread synthesis + angle buttons.                                                                                   |
|Dig Even Deeper|DIG EVEN DEEPER|Subscription only                          |Codex: Love / Career / Life angle interpretations. Reading screen: same angle buttons (Love / Career / Life) applied to spread context.|

### The user journey through the tiers

Free user, daily draw:
→ Card revealed → Base avatar companion line → Reading complete. Clean, meaningful, free.

Free user taps DIG DEEPER after an initiated reading:
→ AI spread synthesis generates in avatar voice → Angle buttons appear → User taps an angle → **Paywall prompt** if not subscribed. The synthesis is always free. The angles are not.

Subscriber taps DIG DEEPER:
→ Full experience. Synthesis + all angles. No interruption.

Subscriber opens Codex card detail:
→ Full content visible: avatar lore resonance + extended reading + Love / Career / Life angles all visible and tappable.

Free user opens Codex card detail:
→ Avatar lore resonance visible (free). Extended reading visible (free). Angle pills visible but locked — tapping one surfaces the upgrade prompt.

-----

## 03 — SURFACE ONE: CODEX CARD DETAIL

### Where it lives

Below the main card detail content — after the avatar one-liner, world lore fragment, and YOUR RECORD section. Signal-line divider. Label: **DIG DEEPER** in tracked uppercase, avatar accent colour, small.

### Content layers

**Avatar lore resonance — FREE**

How this avatar personally relates to this card. A character moment, not an interpretation. The avatar speaks about their own experience or instinct in relation to the card’s energy. Written in avatar voice. 3–4 sentences.

This is the most important content in Dig Deeper. It makes the feature feel like a world, not a reference tool. Canonical and fixed — never varies by user or session.

Format: Montserrat italic, bone white. Avatar emblem micro inline left. No label — it arrives directly.

Access: all authenticated users, regardless of subscription or discovery state. A user can read Casper’s take on The Tower before they’ve ever drawn it. This is intentional — it creates pull toward undiscovered cards.

**Extended reading — FREE**

The “what this card actually means when it shows up in your life” layer. Grounded, present-tense, specific enough to feel personal. Parent voice. 4–6 sentences. Not the onboarding interpretation copy — a lived-context layer.

Label: **THE CARD** in tracked uppercase, mist grey, small.

Access: all authenticated users.

**Love / Career / Life angles — SUBSCRIPTION ONLY**

Three fixed interpretations — one per life angle. 2–3 sentences each. Parent voice. Renamed from “Love / Career / General” — “Life” is broader and more Majestic in register than “General.”

Label: **DIG EVEN DEEPER** in tracked uppercase, avatar accent colour, small. Below the free content, visually separated by signal-line divider.

Displayed as three tappable pills: **LOVE**, **CAREER**, **LIFE** in tracked uppercase.

**Free user state:** Pills are visible but carry a subtle lock signal — not a padlock icon, never that. Instead: pills render at 50% opacity with a faint signal-line border. Tapping one surfaces the upgrade prompt inline (see Section 05).

**Subscriber state:** Pills at full opacity, fully interactive. One open at a time. Default: all closed.

### Empty state — unwritten cards

For cards where content is not yet written, avatar lore resonance and extended reading show graceful empty states:

|Avatar |Empty state line                                                           |
|-------|---------------------------------------------------------------------------|
|Casper |*this one’s still forming. come back to it.*                               |
|Olivia |*not everything reveals itself at once. it will.*                          |
|Eli    |*the card’s here. the words aren’t ready yet. worth noting the difference.*|
|Destiny|*some things take time to say properly. this is one of them.*              |

The DIG EVEN DEEPER section does not render when angle content is unwritten — no empty pills, no placeholder.

-----

## 04 — SURFACE TWO: READING SCREEN

### Where it lives

After all cards revealed, reading sequence complete, avatar closing line appeared. A single button at the bottom:

**DIG DEEPER** — Cinzel, small, avatar accent colour, full-width subtle button. Present but not aggressive. Only appears after initiated readings (1-card and 3-card spreads). Never appears after daily draw.

### Access by subscription state

**Free user:** Button visible. Tapping opens Dig Deeper. Spread synthesis generates free (uses reading credit). Angle buttons appear after synthesis — tapping any angle surfaces the upgrade prompt.

**Subscriber:** Button visible. Full experience. Synthesis + angles. No interruption.

### What happens on tap — Phase 1: Spread synthesis

Auto-appears on tap. No additional interaction required.

The avatar’s synthesised read of the spread as a whole — the relationship between the cards, the dominant thread, the tension or momentum across positions. Not a summary of individual cards. The gestalt.

LLM-generated. Avatar-voiced. 3–5 sentences for 3-card spreads. 1–2 sentences for 1-card.

LLM receives:

- All cards drawn, in order, with positions
- Aura classifications (breakthrough / shadow / neutral)
- Active avatar seed from `majestic-avatar-llm-seeds.md`

Format: Montserrat, bone white. Avatar emblem micro inline left. Slight left indent.

**This synthesis counts against the user’s 3 free readings/day.** The button is the gate, not the card draw itself. If a user has used their 3 free readings, the DIG DEEPER button is replaced by an upgrade prompt on the reading screen. The base reading (avatar companion line, card meaning) is always delivered first regardless.

> **Dev note:** The credit check fires on DIG DEEPER button tap — not on card draw, not on reading screen arrival. The card draw and base interpretation are always free and unconditional. Sequence: card drawn → base reading rendered → DIG DEEPER button appears → user taps → *credit check here* → if credits available, increment `readings_today` and proceed → if not, show upgrade prompt instead of opening Dig Deeper panel. Never reverse this order. The user must always receive their card and companion line before any gate appears.

### What happens on tap — Phase 2: Angle buttons

Appear below synthesis after 300ms delay.

**3-card spreads:** WHAT’S THE TENSION / WHAT’S THE ADVICE / WHAT AM I NOT SEEING
**1-card spreads:** GO DEEPER / WHAT TO WATCH / WHAT THIS ISN’T

These angle labels are the reading-screen equivalents. They map to the same underlying “Love / Career / Life” gate but framed as spread-specific questions rather than life-area lenses. This framing is intentional — it keeps the reading screen in the language of the reading, not the language of traditional tarot categories.

**Free user taps an angle:** Upgrade prompt appears inline below the buttons. See Section 05.

**Subscriber taps an angle:** LLM generates. 2–4 sentences, avatar-voiced. Output appears below buttons, replacing any previous angle output. One angle visible at a time.

LLM receives: synthesis already generated (passed as context) + specific angle.

### Caching

Synthesis: generated once per reading session, stored locally for session duration. Does not regenerate on Dig Deeper close/reopen within same session.

Angle outputs: ephemeral. Each tap generates fresh. Not stored.

-----

## 05 — UPGRADE PROMPT

### Principle

The upgrade prompt is not a wall. It is an invitation. It appears inline — not as a modal, not as a full-screen interruption. It arrives in the space where the content would have been.

It never appears before the user has received something valuable. The base reading always lands first. The synthesis always lands first. The user has already gotten something. The upgrade is an offer to go further, not a gate on what they came for.

### Copy — inline upgrade prompt

*Single line, Montserrat italic, mist grey, in the content space:*

> *There’s more here. Unlock the full reading.*

Below it, two options — minimal, no pressure:

**UNLOCK THIS READING** — avatar accent colour, small Cinzel button. One-time pay-as-you-go.
**SEE SUBSCRIPTION** — mist grey text link. Routes to subscription screen.

No countdown. No “you have X readings left” anxiety. The scarcity is never weaponised.

### After upgrade (subscription)

The locked content appears immediately. No reload. No navigation away. It arrives in the same space the prompt was.

-----

## 06 — DATA & STORAGE

### Codex static content (Supabase)

```
card_content table:
  card_id                  — references cards(id)
  avatar_lore_casper       — text | null
  avatar_lore_olivia       — text | null
  avatar_lore_eli          — text | null
  avatar_lore_destiny      — text | null
  extended_reading         — text | null
  interp_love              — text | null
  interp_career            — text | null
  interp_life              — text | null   ← renamed from interp_general
```

Null values trigger graceful empty state. Free content (lore + extended) always returned. Angle content (love/career/life) returned only if user.subscription_active = true in profiles table.

Row-level security: read access on card_content is public for lore + extended fields. Angle fields filtered server-side based on subscription status — not just hidden client-side.

### Reading screen Dig Deeper (local state)

Spread synthesis stored in component state for session duration only. Not persisted to Supabase. Not saved to journal unless user explicitly saves the reading.

Angle outputs ephemeral — not stored anywhere.

### Reading credit tracking (Supabase)

```
profiles table additions:
  readings_today           — integer, default 0
  readings_reset_at        — timestamptz (midnight local time)
  subscription_active      — boolean, default false
  subscription_tier        — text | null ('monthly' | 'payg')
```

Reading credit check: on DIG DEEPER button tap, check readings_today < 3 OR subscription_active. If credit available, increment readings_today and proceed. If not, show upgrade prompt instead of opening Dig Deeper.

Reset: readings_today resets to 0 at midnight local time via edge function or client-side check on app open.

-----

## 07 — CONTENT REQUIREMENTS

### What needs to be written

|Content                                   |Volume             |Gate        |Priority           |
|------------------------------------------|-------------------|------------|-------------------|
|Avatar lore resonance — Major Arcana      |88 pieces (22 × 4) |Free        |**High — showcase**|
|Extended reading — Major Arcana           |22 pieces          |Free        |High               |
|Love / Career / Life angles — Major Arcana|66 pieces (22 × 3) |Subscription|Medium             |
|Avatar lore resonance — Minor Arcana      |224 pieces (56 × 4)|Free        |Low — post-launch  |
|Extended reading — Minor Arcana           |56 pieces          |Free        |Low                |
|Love / Career / Life angles — Minor Arcana|168 pieces (56 × 3)|Subscription|Low                |

**For showcase:** Major Arcana lore resonance is the priority. Users will see these first and most. 88 pieces, batchable via LLM with avatar seeds.

### Production order

1. Avatar lore resonance — Major Arcana (highest impact, most character-defining)
1. Extended reading — Major Arcana
1. Love / Career / Life angles — Major Arcana (subscription content, lower urgency pre-launch)
1. Minor Arcana by suit — Wands first

-----

## 08 — WHAT THIS IS NOT

- Not a chat interface. The user does not type questions.
- Not a personalisation engine. Codex content does not vary by user.
- Not a replacement for the journal. Reflection and intention live there.
- Not a card-by-card breakdown on the reading screen. That is the main reading view. Dig Deeper speaks to the spread as a whole.
- Not an anxiety-driving paywall. The upgrade prompt is an invitation, arrives after value, never weaponises scarcity.

-----

## 09 — OUT OF SCOPE FOR V1

- Per-avatar Love / Career / Life interpretations on reading screen (v2 — angles use parent voice in v1)
- Saving Dig Deeper synthesis to journal automatically
- Dig Deeper for daily draw
- User-typed questions or freeform prompts
- Sharing Dig Deeper output

-----

## 10 — COMPANION DOCUMENTS

|Document                                  |Relationship                                        |
|------------------------------------------|----------------------------------------------------|
|`majestic-subscription-tier-spec.md`      |Defines the full subscription model — read alongside|
|`majestic-codex-spec.md`                  |Dig Deeper lives inside the Codex card detail       |
|`majestic-avatar-llm-seeds.md`            |Avatar seeds for all LLM calls                      |
|`majestic-arcana-interpretations-final.md`|Source content for Major Arcana                     |
|`majestic-ritual-and-notifications.md`    |Reading screen close flow                           |

-----

*Majestic — Dig Deeper — v2.0*
*Your adventure. But Majestic.*
