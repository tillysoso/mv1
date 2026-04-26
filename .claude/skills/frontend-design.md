---
description: Majestic design system — colors, typography, avatar accents, component patterns, and animation rules for building UI that matches the app aesthetic.
trigger: frontend-design
---

# Majestic — Frontend Design Skill

You are implementing UI for **Majestic**, a tarot-themed React Native/Expo app set in Threshold City. When this skill is active you must follow every rule below without exception. Check the referenced source files if you need the exact token value or component signature.

---

## Stack

- Expo 54 + React Native 0.81.5 + Expo Router (file-based)
- TypeScript, NativeWind 4 (Tailwind for RN) — used for layout utilities only
- React Native Reanimated 4 — all animation
- @shopify/react-native-skia 2 — gradients, aura arcs, complex paths
- Zustand 5 — state (`avatarStore`, `profileStore`, `authStore`)
- Supabase — auth + database

---

## Source of Truth Files

Always read these files before implementing anything:

- `src/theme/tokens.ts` — every color token
- `src/theme/typography.ts` — every font, weight, and type scale step
- `src/types/avatar.ts` — `AvatarId`, `AvatarPresenceLevel`, `PortalShape`, `AvatarState`
- `src/types/tarot.ts` — `AuraContext`, `TarotCard`
- `src/stores/avatarStore.ts` — `useAvatarStore`, `activeAvatar`
- `src/components/onboarding/OnboardingScreen.tsx` — the screen shell all onboarding screens use
- `src/components/avatar/AvatarAura.tsx` — aura animation pattern reference
- `src/components/cards/CardPlaceholder.tsx` — Skia gradient card reference

---

## Color Tokens

Import: `import { colors, avatarAccents } from 'src/theme/tokens';`

### World palette (`colors`)

| Token | Hex | Use |
|---|---|---|
| `colors.majestic` | `#9500FF` | Brand accent, loading indicators |
| `colors.bg.primary` | `#1A1A2E` | Default screen background |
| `colors.bg.secondary` | `#16213E` | Card backs, elevated surfaces |
| `colors.bg.tertiary` | `#0F3460` | Deep wells, modals |
| `colors.bg.canal` | `#3D6B7A` | Mid-tone atmosphere |
| `colors.bg.signal` | `#4A5585` | Signal-state tints |
| `colors.bg.dusk` | `#6B4F8C` | Dusk/portal tints |
| `colors.text.primary` | `#F0EDE8` | Body prose, main labels |
| `colors.text.secondary` | `#A8A8B8` | Secondary labels, captions |
| `colors.text.tertiary` | `#6B6B7B` | Placeholders, system lines |
| `colors.obsidian` | `#0D0D14` | Root background (darkest) |
| `colors.charcoal` | `#1E1E2E` | Card fill, overlay surfaces |
| `colors.ash` | `#3A3A4A` | Inactive borders, dividers |
| `colors.mist` | `#7A7A8A` | Subtle borders, inactive states |
| `colors.bone` | `#F0EDE8` | Primary text (alias of `text.primary`) |
| `colors.brass` | `#8B7355` | Warm accent detail |
| `colors.moon` | `#C8D0D8` | Cool neutral highlight |

### Avatar accent sets (`avatarAccents`)

Each avatar has `primary`, `secondary`, `tertiary`, `particleStart`, `particleEnd`.

| Avatar | primary | secondary | tertiary |
|---|---|---|---|
| `casper` | `#C94B2C` | `#E8603A` | `#D4A843` |
| `destiny` | `#2A7B8C` | `#4DBFCC` | `#5B6FA8` |
| `eli` | `#A8B4C8` | `#6ECFCF` | `#9B8FBF` |
| `olivia` | `#5C6B3A` | `#A85C3A` | `#C49A4A` |

**Never** hardcode a specific avatar's hex value. Always resolve dynamically:

```ts
const activeAvatar = useAvatarStore((s) => s.activeAvatar);
const accent = avatarAccents[activeAvatar];
// then use accent.primary, accent.secondary, accent.tertiary
```

---

## Typography

Import: `import { fonts, fontWeights, typeScale } from 'src/theme/typography';`

### Font families

| Token | Family | When to use |
|---|---|---|
| `fonts.display` | `'Cinzel'` | Headlines, card names, avatar names, display text |
| `fonts.body` | `'Montserrat'` | All body prose, quiz options, onboarding prompts |
| `fonts.terminal` | `'SpaceMono'` | System lines, terminal prompts, field labels, `>` carets |
| `fonts.wordmark` | `'RemachineScript'` | The "Majestic" wordmark lockup ONLY — never for UI |

### Type scale

| Step | fontSize | fontWeight | letterSpacing | lineHeight |
|---|---|---|---|---|
| `displayXL` | 44 | bold (700) | 2 | — |
| `displayL` | 32 | bold (700) | 2 | — |
| `displayM` | 26 | semiBold (600) | 1.5 | — |
| `displayS` | 18 | regular (400) | 2 | — |
| `bodyL` | 18 | regular (400) | — | 30 |
| `bodyM` | 16 | regular (400) | — | 27 |
| `bodyS` | 14 | regular (400) | — | 23 |
| `label` | 12 | semiBold (600) | 1 | — |
| `micro` | 11 | regular (400) | — | — |
| `terminal` | 17 | regular (400) | 0.5 | — |

Use `typeScale.displayM.fontSize`, not a bare number.

---

## Spacing

All spacing values must be multiples of 8px. Canonical values in use: 8, 12, 16, 20, 24, 32, 36, 40, 48, 60. Never use arbitrary pixel values like 22 or 45.

---

## Screen Layout — OnboardingScreen Shell

All onboarding screens wrap their content in `<OnboardingScreen>`. Do not re-implement the shell.

```tsx
import OnboardingScreen from 'src/components/onboarding/OnboardingScreen';

export default function MyScreen() {
  return (
    <OnboardingScreen
      bottomContent={<CTA />}   // optional — fixed at bottom
    >
      {/* screen content — receives paddingH 32, paddingTop 60 */}
    </OnboardingScreen>
  );
}
```

The shell provides:
- Root `backgroundColor: colors.obsidian` (`#0D0D14`)
- Atmosphere glow layer (pointer-events none, absolute)
- SafeAreaView wrapping everything
- Content area: `paddingHorizontal: 32`, `paddingTop: 60`, `paddingBottom: 24`
- Bottom slot: `paddingHorizontal: 32`, `paddingBottom: 40`

---

## Avatar System

### Presence levels → portal shape + size

| Level | Shape | Aura size | Portrait size | When used |
|---|---|---|---|---|
| `hero` | `arch` | 280 | 220 | Avatar selection, milestone |
| `presence` | `livingCircle` | 200 | 140 | Daily draw, reading initiation |
| `signal` | `livingCircle` | 160 | 0 (arc only) | Reading screen ambient |
| `mark` | `livingCircle` | 80 | 0 (emblem) | Navigation, metadata |
| `none` | — | 0 | 0 | Returns null |

Use `<AvatarPortrait avatarId={...} presenceLevel="hero" auraContext="neutral" />`. Never build a custom portrait layout — use the component.

### Aura contexts → animation intensity

| Context | Intensity | Behavior |
|---|---|---|
| `neutral` | 0.4 | Slow ambient pulse, loop |
| `gathering` | 0.7 | Particles accumulate at boundary |
| `breakthrough` | 0.8 | Spike to 0.95 then settle |
| `shadow` | 0.3 | Fade to lower intensity, slow |
| `recognition` | 0.6 | Hold 500ms, single outward pulse, return |

The `auraContext` prop is driven by `TarotCard.auraContext`. Pass it through; do not hardcode.

---

## Reanimated Animation Rules

1. All animated values use `useSharedValue` from `react-native-reanimated`. No `Animated.Value` (old API).
2. No instant transitions. Every opacity or position change goes through `withTiming`.
3. Minimum aura transition: **300ms**. Atmospheric screen fades: **800ms** in, easing `Easing.out(Easing.ease)`.
4. Looping pulses use `withRepeat(withSequence(withTiming(...), withTiming(...)), -1, false)`.
5. Easing is always `Easing.inOut(Easing.ease)` for pulses, `Easing.out(Easing.ease)` for entrances.
6. Skia paint alpha is **not** directly driven by shared values. Wrap a Skia `<Canvas>` in `<Animated.View>` and animate the View's opacity.

```tsx
// Correct pattern — Skia canvas with Reanimated opacity
<Animated.View style={[{ position: 'absolute', width: size, height: size }, { opacity: strokeOpacity }]}>
  <Canvas style={{ width: size, height: size }}>
    <Path path={path} color={accent.primary} style="stroke" strokeWidth={2.5} />
  </Canvas>
</Animated.View>
```

---

## Skia Usage Rules

Use Skia (`@shopify/react-native-skia`) for:
- Gradient card backgrounds: `<Canvas><Rect><LinearGradient ... /></Rect></Canvas>`
- Aura arcs/arch paths: `<Canvas><Path><BlurMask /></Path></Canvas>`
- Any shape or effect that RN's View system cannot express natively

Do not use Skia for:
- Simple colored rectangles or rounded corners (use `View`)
- Text rendering (use `Text`)
- Layout composition (use `View`/`StyleSheet`)

Skia children cannot receive NativeWind `className` props. Keep Skia trees separate from NativeWind-styled views.

---

## Terminal UI Pattern

Terminal / system copy uses `fonts.terminal` (SpaceMono). The `>` caret is always a `Text` element with `fontFamily: fonts.terminal`. Color: `colors.text.secondary`. Placeholder text color: `colors.ash` (`#3A3A4A`).

```tsx
// Terminal prompt row pattern
<View style={{ flexDirection: 'row', alignItems: 'center' }}>
  <Text style={{ fontFamily: fonts.terminal, fontSize: 20, color: colors.text.secondary }}>
    {'> '}
  </Text>
  <TerminalInput value={value} onChangeText={setValue} onSubmit={handleSubmit} />
</View>
```

`TerminalInput` wires `selectionColor` and `cursorColor` to `avatarAccents[activeAvatar].primary` automatically.

---

## Card Sizes

| Size key | width | height | Use |
|---|---|---|---|
| `full` | 240 | 360 | Detail / reading spread |
| `daily` | 200 | 300 | Daily draw screen |
| `thumb` | 80 | 120 | Codex grid, recent readings |

Pass `size="daily"` etc. to `<CardPlaceholder>` and `<CardFace>`. Never build a custom card shell.

---

## CTA Button Pattern

Onboarding CTAs are borderless or thin-bordered, with sharp corners (no border-radius):

```tsx
<Pressable
  style={({ pressed }) => [styles.cta, pressed && { opacity: 0.7 }]}
  onPress={handleNext}
>
  <Text style={styles.ctaText}>Next</Text>
</Pressable>

// styles
cta: {
  borderWidth: 1,
  borderColor: colors.ash,
  paddingVertical: 16,
  paddingHorizontal: 32,
  alignSelf: 'flex-start',   // or 'center' for centered CTAs
},
ctaText: {
  fontFamily: fonts.body,
  fontSize: typeScale.label.fontSize,
  fontWeight: '600',
  color: colors.bone,
  letterSpacing: 2,
},
```

For avatar-accented CTAs (post-selection), replace `borderColor: colors.ash` with `borderColor: accent.primary`.

---

## Do

- Import all colors from `src/theme/tokens.ts`, all type values from `src/theme/typography.ts`
- Use `useAvatarStore((s) => s.activeAvatar)` and `avatarAccents[activeAvatar]` for any accent color
- Wrap all onboarding screen content in `<OnboardingScreen>`
- Use `<AvatarPortrait>` and `<AvatarAura>` — never hand-build avatar rendering
- Use `<CardPlaceholder>` / `<CardFace>` for all tarot card rendering
- Use `withTiming`, `withRepeat`, `withSequence` for every animated value
- Wrap Skia canvases in `Animated.View` when driving opacity from shared values
- Space with multiples of 8px only
- Use `fonts.terminal` for all `>` carets, system lines, field labels (DD/MM/YYYY)
- Use `fonts.display` (Cinzel) for headlines, avatar names, card numerals
- Use `fonts.body` (Montserrat) for prose, quiz options, body copy

---

## Do Not

- Hardcode any hex color value — always use a token
- Use `fonts.wordmark` (RemachineScript) for anything except the "Majestic" wordmark lockup
- Apply NativeWind `className` to Skia `Canvas` children
- Use the old `Animated.Value` API — use Reanimated shared values only
- Make instant opacity switches — everything animates through `withTiming`
- Re-implement the `OnboardingScreen` shell in individual screens
- Render avatar portraits without `AvatarPortrait` — the portal shape, size, and aura are spec-defined
- Set `shadow` / `elevation` for glow effects — use `BlurMask` inside a Skia `Canvas`
- Hardcode a specific avatar's accent color (e.g. `'#C94B2C'`) — always resolve from `avatarAccents[activeAvatar]`
- Use non-multiple-of-8 spacing values
- Use `fonts.terminal` for prose or body copy (only for terminal/system contexts)
