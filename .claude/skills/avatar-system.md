---
description: Majestic avatar system — AvatarAura Skia path construction, AvatarPortrait presence levels, portal shapes, aura context animations, and image asset conventions.
trigger: avatar-system
---

# Majestic — Avatar System Skill

You are implementing avatar and aura components for **Majestic**. This skill covers everything from the Skia path geometry to the Reanimated animation sequences. Follow every rule without exception.

---

## Source Files

Read these before implementing:

- `src/components/avatar/AvatarAura.tsx` — canonical Skia + Reanimated aura implementation
- `src/components/avatar/AvatarPortrait.tsx` — presence level routing, portal shapes, image states
- `src/theme/tokens.ts` — `avatarAccents` (primary, secondary, tertiary, particleStart, particleEnd)
- `src/types/avatar.ts` — `AvatarId`, `AvatarPresenceLevel`, `PortalShape`, `AvatarState`
- `src/types/tarot.ts` — `AuraContext`
- `src/stores/avatarStore.ts` — `useAvatarStore`, `setAvatar`

---

## AvatarPortrait — the only avatar rendering surface

**Never hand-build avatar portrait layouts.** Always use `<AvatarPortrait>`.

```tsx
import AvatarPortrait from 'src/components/avatar/AvatarPortrait';

<AvatarPortrait
  avatarId="casper"             // AvatarId — always dynamic from store
  presenceLevel="hero"          // AvatarPresenceLevel
  auraContext="neutral"         // AuraContext | 'gathering' (optional, defaults 'neutral')
  imageState="neutral"          // 'neutral' | 'active' | 'reflective' (optional, defaults 'neutral')
/>
```

AvatarPortrait internally routes to `AvatarAura` and the correct image — you do not compose these separately for standard portrait use.

---

## Presence Levels

| Level | Portal shape | Aura canvas | Portrait image | Used for |
|---|---|---|---|---|
| `hero` | `arch` | 280 × 280 | 220 × 220 | Avatar selection, milestone moments |
| `presence` | `livingCircle` | 200 × 200 | 140 × 140 | Daily draw, reading initiation |
| `signal` | `livingCircle` | 160 × 160 | none (arc only) | Reading screen ambient |
| `mark` | `livingCircle` | 80 × 80 | none (emblem placeholder) | Nav bars, metadata rows |
| `none` | — | — | — | Renders null |

The portal shape is determined by presence level — do not pass a shape prop to AvatarPortrait, it resolves it internally.

---

## Image States

| State | When to use |
|---|---|
| `neutral` | Default, resting, reading not in progress |
| `active` | Responding, card reveal, direct address |
| `reflective` | Post-reading, introspective moment |

**Asset convention:** `assets/avatars/{avatarId}/{avatarId}-{state}.png`

Examples:
- `assets/avatars/casper/casper-neutral.png`
- `assets/avatars/eli/eli-active.png`

**Fallback note:** Olivia and Destiny currently have no `neutral.png` — AvatarPortrait falls back to `active` for both. Do not special-case this in new code; the component handles it.

---

## AvatarAura — direct use (advanced)

Use `AvatarAura` directly only when you need an aura without a portrait image (e.g. a loading indicator, a card-backing pulse). For all other cases use `AvatarPortrait`.

```tsx
import AvatarAura from 'src/components/avatar/AvatarAura';

<AvatarAura
  avatarId={activeAvatar}       // AvatarId
  shape="livingCircle"          // PortalShape: 'arch' | 'livingCircle'
  auraContext="neutral"         // AuraContext | 'gathering'
  size={160}                    // number — matches AURA_SIZE for the intended presence level
/>
```

---

## Portal Shapes — Skia Path Geometry

### Living Circle (270° arc — `livingCircle`)

A 270° arc with a gap at the bottom (the "threshold" — never fully closed).

```ts
function buildLivingCirclePath(cx, cy, r) {
  const path = Skia.Path.Make();
  // startAngle=100°, sweepAngle=340° → gap from ~80° to ~100° (bottom-ish)
  path.addArc({ x: cx - r, y: cy - r, width: r * 2, height: r * 2 }, 100, 340);
  return path;
}
// cx = size/2, cy = size/2, r = size * 0.44
```

### Arch (`arch`)

Two vertical rails meeting in a cubic-bezier bridge at the top. Conveys ritual significance — used only at `hero` presence.

```ts
function buildArchPath(w, h, inset) {
  const path = Skia.Path.Make();
  const left = inset;         // inset = size * 0.12
  const right = w - inset;
  const bottom = h;
  const archTop = h * 0.12;
  const midX = w / 2;
  path.moveTo(left, bottom);
  path.lineTo(left, archTop + (right - left) / 2);
  path.cubicTo(left, archTop, midX - 10, archTop * 0.4, midX, archTop * 0.35);
  path.cubicTo(midX + 10, archTop * 0.4, right, archTop, right, archTop + (right - left) / 2);
  path.lineTo(right, bottom);
  return path;
}
```

---

## Two-Layer Rendering

Every aura renders two Skia canvases, each wrapped in its own `Animated.View`:

1. **Glow layer** — `strokeWidth: 8` + `<BlurMask blur={10} style="normal" />`, opacity = `intensity * 0.3`
2. **Stroke layer** — `strokeWidth: 2.5`, no blur, opacity = `intensity`

Both layers use `accent.primary` as the path color. The glow layer goes behind (rendered first in JSX).

```tsx
<View style={{ width: size, height: size }}>
  {/* Glow layer — behind */}
  <Animated.View style={[{ position: 'absolute', width: size, height: size }, { opacity: glowOpacity }]}>
    <Canvas style={{ width: size, height: size }}>
      <Path path={path} color={accent.primary} style="stroke" strokeWidth={8}>
        <BlurMask blur={10} style="normal" />
      </Path>
    </Canvas>
  </Animated.View>

  {/* Stroke layer — in front */}
  <Animated.View style={[{ position: 'absolute', width: size, height: size }, { opacity: strokeOpacity }]}>
    <Canvas style={{ width: size, height: size }}>
      <Path path={path} color={accent.primary} style="stroke" strokeWidth={2.5} />
    </Canvas>
  </Animated.View>
</View>
```

Do not attempt to drive Skia `Paint` alpha directly from a Reanimated shared value — the Animated.View wrapper is the correct pattern.

---

## Aura Context Animations

Intensity targets: `neutral` 0.4, `gathering` 0.7, `breakthrough` 0.8, `shadow` 0.3, `recognition` 0.6

| Context | strokeOpacity animation | glowOpacity animation |
|---|---|---|
| `neutral` | `withRepeat(withSequence(withTiming(base+0.15, 1500ms), withTiming(base-0.05, 1500ms)), -1)` | Same sequence × 0.3 |
| `gathering` | Same as neutral at 0.7 base | Same × 0.3 |
| `breakthrough` | `withSequence(withTiming(0.95, 300ms), withTiming(base, 700ms))` | Sequence to 0.4 then base × 0.3 |
| `shadow` | `withTiming(base, 800ms)` | `withTiming(base * 0.3, 800ms)` |
| `recognition` | `withSequence(withDelay(500, withTiming(0.9, 400ms)), withTiming(base, 600ms))` | Same to 0.4 then base × 0.3 |

Easing for all: `Easing.inOut(Easing.ease)`.

Trigger animation in a `useEffect` on `[auraContext]`. The effect sets the shared value — it does not return a cleanup function.

---

## Accent Color Resolution

Always resolve accent from the `avatarId` prop, never hardcode:

```ts
import { avatarAccents } from 'src/theme/tokens';

const accent = avatarAccents[avatarId];
// accent.primary   → main stroke + glow color
// accent.secondary → inner border (CardPlaceholder), signal lines
// accent.tertiary  → warmth detail
// accent.particleStart / particleEnd → future particle system
```

For components that reflect the _active_ avatar (not a passed-in ID), use:

```ts
const activeAvatar = useAvatarStore((s) => s.activeAvatar);
const accent = avatarAccents[activeAvatar];
```

---

## Do

- Use `<AvatarPortrait>` for all portrait rendering — never compose AvatarAura + Image manually
- Pass `avatarId` dynamically from store or prop — never hardcode `"casper"` etc.
- Use `useSharedValue` + `useEffect([auraContext])` for animation triggers
- Render glow layer behind stroke layer in JSX order
- Set `size` on `AvatarAura` to match the `AURA_SIZE` for the intended presence level
- Use `Easing.inOut(Easing.ease)` for all aura pulses

## Do Not

- Hardcode an avatar ID in JSX — always from store or prop
- Use `Animated.Value` (old API) — use `useSharedValue`
- Drive Skia `Paint` opacity directly with a shared value — wrap in `Animated.View`
- Set `shadow`/`elevation` for glow — use `BlurMask` inside Canvas
- Use a different strokeWidth for the main arc (2.5) or glow layer (8)
- Implement custom avatar rendering logic — all geometry lives in `AvatarAura.tsx`
- Add a third avatar image state beyond neutral/active/reflective
