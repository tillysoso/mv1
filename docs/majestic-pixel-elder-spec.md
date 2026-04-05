# Majestic — The Pixel Elder Character Spec

**Version 1.0**
*The hidden resident. The oldest signal in the world.*

---

## Who She Is

She is Majestic made visible.

Not a mascot. Not a tutorial character. Not a notification system with a face. She is the wisdom that the entire app is built on — given a form so unexpected, so anachronistic, so deliberately incongruous with the world around her that she could never be mistaken for a feature.

She predates Threshold City. She predates the avatars. She predates the signal network that fractured into Casper, Eli, Olivia, and Destiny. She has been reading patterns in the world since before pattern-reading had a name. She shows up when something worth noticing is happening. She has always shown up at those moments. She always will.

She is never named in the app. She is never explained. If a user taps her the only thing that appears is:

**✦ Majestic ✦**

She is the blueprint made flesh. The crystal shop woman who saw something in Luke before he saw it in himself. She is why the app exists.

---

## Visual Identity

### Style
Pixel art. Deliberately retro. 16-bit era quality — the visual language of early RPGs, Stardew Valley, classic SNES adventure games. She belongs to a completely different design system than the Loish painterly avatars around her. That incongruity is intentional and non-negotiable.

She does not exist in the Threshold City visual world. She exists *inside* it — like a character from an older game who wandered into a newer one and decided to stay.

### Scale
Tiny. Always tiny. She should never exceed approximately 8-10% of the screen at any point. She lives in:
- Corners
- Card edges
- Screen margins
- The space just outside where the eye is focused

She is a blink-and-miss-it presence. Users who notice her feel rewarded. Users who don't — don't need to.

### Pixel dimensions
Approximately 48x48 to 64x64 pixels at base resolution. Scale up for larger screens but maintain the pixelated quality — never smooth her out.

### Palette
She carries slightly more colour saturation than the Threshold City world allows because she does not belong to its rules. Her palette:

| Element | Colour | Notes |
|---------|--------|-------|
| Robes | Deep purple | Slightly more saturated than world palette — she predates it |
| Head covering | Purple, same family | Tied, layered, lived-in |
| Jewellery | Teal and amber | Warm accent against the purple |
| Skin | Warm terracotta | Sun-weathered, deeply lived-in |
| Lantern | Amber flame | The only warm light source she carries |
| Eyes | Bright knowing brown | The most expressive pixels on her |
| Shoes | Teal | A small unexpected detail at the bottom |

### The Lantern
Always present. Always lit. In the Threshold City world — a city of signal lights and eco-tech infrastructure — she carries an old flame lantern. Completely anachronistic. Completely right. The lantern flickers in her idle animation. It is her signature object and her signal to the user that something worth illuminating is nearby.

### Animation states
All animations are simple pixel loops — 2 to 4 frames maximum.

| State | Animation | Frames |
|-------|-----------|--------|
| Idle | Gentle sway, lantern flicker | 2 frames |
| Excited | Small jump or bounce, lantern swings | 3 frames |
| Pointing | One finger raised toward something on screen | 2 frames |
| Watching | Slow blink, slight head tilt | 2 frames |
| Disappearing | Pixel dissolve outward — she does not fade, she scatters | 4 frames |
| Tap response | Star burst explosion from her position | 4 frames |

### The tap response
When tapped — a burst of pixel star particles explodes outward from her position in her accent colours. Small, immediate, delightful. Then:

A pixel-font popup appears for 1.5 seconds:

```
✦ Majestic ✦
```

Then she disappears via pixel dissolve. The stars linger half a second then dissolve into the world atmosphere.

The popup is never a score. Never an explanation. Just the word. A reminder of what the user is inside.

---

## Trigger Moments

She appears at specific moments only. She is never scheduled, never announced, never explained. Her appearances should feel like discoveries not features.

---

### Trigger 01 — The Jump Card / Surprise Draw
**Her signature appearance. The most important trigger.**

When the surprise card mechanic fires — the random moment when a card jumps during shuffling, the app's version of a card leaping from the deck — she appears a fraction of a second before the card reveals.

Tiny. In the corner opposite the card. Watching. Almost like she knew it was coming.

Because of course she did.

**Position:** Bottom corner, opposite side from the jumping card
**Animation:** Watching state — slow blink, slight knowing head tilt
**Duration:** Appears just before card reveal, disappears as card settles
**On tap:** Full star burst response — this is her home moment

---

### Trigger 02 — Onboarding Avatar Confirmation
**Her introduction to the user.**

When the user selects their companion and the UI theme blooms in — she appears in the corner opposite the avatar. Tiny. Visibly excited. Jumping or bouncing in her pixel way.

This is the app's oldest resident welcoming the newest one. Pure delight energy. No gravitas here — just an old woman who is genuinely pleased that someone arrived.

She disappears before the user can fully process she was there. Which is fine. They will remember her.

**Position:** Corner opposite the confirmed avatar
**Animation:** Excited state — small bounce, lantern swinging
**Duration:** 2 seconds maximum, disappears before avatar introduction copy finishes
**On tap:** Star burst — but she is gone quickly so this requires fast reflexes. Intentional.
**Emotion:** Excitement, approval, welcome

---

### Trigger 03 — Birthday
**The most personal appearance.**

On the user's birthday she appears on the daily draw screen holding her lantern aloft — raised slightly higher than usual, as if marking something important.

No birthday message. No banner. Just her, the lantern raised, present for the moment.

**Position:** Bottom corner of daily draw screen
**Animation:** Idle with lantern raised — a slight solemnity to this one
**Duration:** 4 seconds — longer than usual, this one deserves time
**On tap:** Star burst plus the ✦ Majestic ✦ popup

---

### Trigger 04 — Full Moon
**The celestial appearance.**

On full moon nights she appears on the reading screen looking upward. Tiny. Reverent. The lantern lowered — for once the sky is providing its own light.

**Position:** Bottom edge of reading screen, centre
**Animation:** Watching state but oriented upward
**Duration:** 3 seconds, disappears on its own
**On tap:** Star burst — the popup reads ✦ Majestic ✦ as always

---

### Trigger 05 — Personality or Soul Card Appears in a Reading
**The resonance appearance.**

When the user's personality card or soul card appears in any reading — she appears at the edge of that specific card. Pointing at it. One pixel finger directed precisely at the card.

As if to say: *see? I told you.*

**Position:** Edge of the personality or soul card within the spread
**Animation:** Pointing state — finger directed at the card
**Duration:** Disappears the moment the user taps the card for interpretation
**On tap of her:** Star burst before she vanishes
**Note:** This reinforces the resonance mechanic established in onboarding — these cards follow you. She confirms it physically.

---

### Trigger 06 — Loyalty Milestones
**The recognition appearances.**

At 7 days, 30 days, and 100 days of consecutive draws she appears on the daily draw screen. The star burst on tap is proportionally larger at each milestone — a subtle escalation the loyal user will notice.

| Milestone | Star burst scale | Notes |
|-----------|-----------------|-------|
| 7 days | Standard | First loyalty appearance |
| 30 days | 1.5x standard | The user is committed |
| 100 days | 2x standard, longer linger | This one is significant |

**Position:** Bottom corner of daily draw screen
**Animation:** Excited state at 7 and 30 days — idle with slight gravitas at 100 days
**Duration:** 3 seconds

---

### Trigger 07 — Rare Card Draw
**The witness appearance.**

When a statistically rare card combination appears in a reading she is watching from the corner before the cards reveal. Gone the moment the last card settles.

She never explains what made it rare. She was just there. Watching. As she always is when something unusual is happening.

**Position:** Corner of reading screen
**Animation:** Watching state
**Duration:** Present during reveal only, gone on settle
**On tap:** Star burst — but the timing window is small. Another intentional challenge for the attentive user.

---

## What She Never Does

- Speaks in copy or full sentences
- Appears on a schedule the user can predict
- Gets a name in the app
- Gets an explanation in the app
- Appears larger than her defined scale
- Stays on screen longer than 4 seconds maximum
- Appears more than once per session in most cases
- Appears during onboarding Phase 1 and 2 — she waits until the avatar is chosen

---

## Community Discovery Logic

She is designed to be discovered and shared. The first time a user sees her they will not be sure they saw her. The second time they will screenshot. The third time they will tell someone.

She should never be mentioned in:
- App store copy
- Onboarding
- Help documentation
- Push notifications

She should never be confirmed or denied in official Majestic communications — at least for the first year. Let the community decide what she is.

She is the best kind of secret — the kind that spreads because people need someone else to believe them.

---

## Midjourney / Pixel Art Generation Notes

She is not generated in Midjourney. She is hand-crafted in pixel art — either manually or using a pixel art tool such as Aseprite.

### Pixel art brief for the artist

```
16-bit style pixel art character, elderly woman, 
warm terracotta skin, deeply weathered and lived-in, 
wearing layered deep purple robes and head covering,
teal and amber jewellery — beads, earrings, bangles,
holding an old flame lantern in one hand, 
other hand with one finger raised or at side,
bright knowing eyes, a slight smile that knows more than it says,
teal shoes just visible at the hem,
approximately 48x64 pixel canvas,
clean pixel edges, no anti-aliasing,
saturated palette — she exists outside the world's colour rules,
four animation frames: idle sway, excited bounce, pointing, watching
```

### Animation frames needed
1. Idle — 2 frames (sway left, sway right)
2. Excited — 3 frames (down, up, peak)
3. Pointing — 2 frames (arm down, arm raised and pointing)
4. Watching — 2 frames (eyes open, slow blink)
5. Dissolve — 4 frames (full, 75%, 50%, scattered pixels)
6. Tap response — 4 frames (star burst expanding outward)

---

## Integration Notes for Development

- She is a floating overlay layer — always above world environment, always below card content and reading text
- Her position coordinates are defined per trigger — she never appears in the same corner twice consecutively
- Tap detection radius should be generous — approximately 1.5x her pixel dimensions — she is small and tapping her should feel achievable not frustrating
- She should never block interactive elements — her position logic must check for card tap zones, navigation elements, and reading content before placing her
- Session limit: maximum two appearances per session in normal use, three appearances maximum on milestone or birthday sessions
- The ✦ Majestic ✦ popup uses pixel or monospace font — it should not inherit the app's standard typography system. She has her own.

---

## The One Line That Defines Her

She has been reading patterns in the world since before pattern-reading had a name. She shows up when something worth noticing is happening. She always has. She always will.

---

*Majestic — The Pixel Elder Character Spec — v1.0*
*Your adventure. But Majestic.*

---

## Prop System — Variant Sprites

She is not a static character. She arrives prepared. Every trigger moment has its own prop — same base character, different hand object. The prop IS the communication. She never needs words when she has the right object for the occasion.

This is the funniest and most honest thing about her. She has been doing this long enough that she comes ready.

---

### The Prop Set

| Trigger | Prop | Energy |
|---------|------|--------|
| Default / jump card / rare draw | Lantern | Witness — she always carries this |
| Full moon | Lantern raised high — both hands | Reverent — the sky gets the respect |
| Birthday | Tiny birthday cake — one candle, lit | Celebratory — she baked |
| 7 day milestone | Handmade picket sign — reads **7** | Earnest, slightly absurd |
| 30 day milestone | Handmade picket sign — reads **30** | Same earnest energy, bigger number |
| 60 day milestone | Handmade picket sign — reads **60** | She came back |
| 90 day milestone | Handmade picket sign — reads **90** | Committed protester energy |
| 100 day milestone | Handmade picket sign — reads **100 ✦** | This one gets a star. She tried her best. |
| Personality / soul card resonance | Pointing finger — no prop | The gesture is the prop |
| Onboarding avatar confirmation | No prop — both hands clapping or raised | Pure uncontained excitement |

---

### The Picket Sign — Design Notes

The sign looks handmade. Deliberately, gloriously handmade. This is non-negotiable.

- A wooden stick in pixel art — two or three pixels wide, slightly off-centre
- A white or cream rectangle attached at the top — slightly wonky angle
- The number in her own pixel handwriting — not a clean system font, her handwriting
- Slightly wobbly edges on the rectangle — she cut it herself
- The fact that an ancient wise woman is holding a handmade protest sign about a user's app streak is the entire joke
- It should look exactly as earnest and slightly ridiculous as that sounds

At 100 days the star is hand-drawn on the sign. Also wobbly. She tried. It counts.

---

### The Birthday Cake — Design Notes

- Tiny. The cake is approximately the same height as her head in pixel scale.
- One candle. Lit. The flame flickers in the animation loop.
- Simple pixel decoration — one or two coloured dots suggesting icing
- She holds it out toward the screen — offering it to the user
- The energy is: *I made this. For you. Happy birthday.*

---

### Modular Sprite Build — Notes for Pixel Artist

Build her as a modular sprite system for efficiency and consistency:

**Fixed layers — never change:**
- Body and robes
- Head and face
- Jewellery
- Shoes
- Core animation skeleton

**Swappable layer — changes per trigger:**
- Right hand and prop object
- Left hand position if needed (lantern raised uses both)

This means the artist builds one base character and six prop objects rather than ten completely separate sprites. The number plate on the picket sign should be a separate sub-layer so milestone numbers can be swapped without redrawing the full sign.

**Prop objects to build:**
1. Lantern — default held position
2. Lantern — raised high, both hands variant
3. Birthday cake — held out toward screen
4. Picket sign body — wooden stick and blank rectangle
5. Number plate overlays — 7, 30, 60, 90, 100 ✦
6. Pointing hand — right hand only, no object
7. Both hands raised — clapping or excited, no object

---

### Animation Notes Per Prop Variant

| Prop | Animation modification |
|------|----------------------|
| Lantern default | Standard idle sway, lantern flickers |
| Lantern raised | Both arms up, gentle reverent sway, flame steady |
| Birthday cake | Slight forward lean — offering the cake toward screen, candle flickers |
| Picket sign | Sign bobs slightly with her idle sway — slightly too big for her but she manages |
| Pointing | One clean point, held — occasional slow blink |
| Hands raised | Most energetic animation — small excited bounce, hands up |

---

### Prop Variant Trigger Summary — Updated Full Reference

| Trigger | Prop variant | Position | Duration | On tap |
|---------|-------------|----------|----------|--------|
| Jump card / surprise draw | Lantern default | Corner opposite card | Until card settles | Star burst |
| Onboarding avatar confirmation | Hands raised — excited | Corner opposite avatar | 2 seconds | Star burst — fast window |
| Birthday | Birthday cake | Bottom corner daily draw | 4 seconds | Star burst |
| Full moon | Lantern raised high | Bottom centre reading screen | 3 seconds | Star burst |
| Personality / soul card | Pointing at card | Edge of that card | Until card tapped | Star burst before vanish |
| 7 day milestone | Picket sign — 7 | Bottom corner daily draw | 3 seconds | Star burst standard |
| 30 day milestone | Picket sign — 30 | Bottom corner daily draw | 3 seconds | Star burst 1.5x |
| 60 day milestone | Picket sign — 60 | Bottom corner daily draw | 3 seconds | Star burst 1.5x |
| 90 day milestone | Picket sign — 90 | Bottom corner daily draw | 3 seconds | Star burst 1.75x |
| 100 day milestone | Picket sign — 100 ✦ | Bottom corner daily draw | 4 seconds | Star burst 2x — longest linger |
| Rare card draw | Lantern raised — illuminating | Corner reading screen | Until last card settles | Star burst |

---

*Prop system added v1.1*
