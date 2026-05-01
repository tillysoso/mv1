---
description: Majestic onboarding flow — 11-screen sequence, terminal UI patterns, character-reveal animations, DOB field chain, profile store progression, and screen routing conventions.
trigger: onboarding-screens
---

# Majestic — Onboarding Screens Skill

You are implementing onboarding screens for **Majestic**. The onboarding flow has 11 screens across 3 phases. Follow every pattern below — all existing screens use them consistently.

---

## Source Files

- `src/components/onboarding/OnboardingScreen.tsx` — screen shell (required wrapper)
- `src/components/onboarding/TerminalInput.tsx` — avatar-accented text input
- `src/stores/profileStore.ts` — name, dob, birthCards, onboardingComplete, quizScores
- `src/stores/avatarStore.ts` — activeAvatar, setAvatar
- `src/theme/tokens.ts` — colors
- `src/theme/typography.ts` — fonts, typeScale
- `app/(onboarding)/` — all 11 screen files as implementation reference
- `docs/onboarding-screen-map.md` — phase map and routing order

---

## Screen Sequence

### Phase 1 — Signal & Entry (discovery, no data collection)

| Screen | Route | Purpose |
|---|---|---|
| Entry | `(onboarding)/index` | Brand reveal, atmosphere, Begin CTA |
| Name | `(onboarding)/name` | Collect user's name via terminal input |
| Date of Birth | `(onboarding)/dob` | Collect DD / MM / YYYY |
| Calculating | `(onboarding)/calculating` | Animated birth card calculation |

### Phase 2 — Majestic Profile (birth card reveal)

| Screen | Route | Purpose |
|---|---|---|
| Personality | `(onboarding)/personality` | Reveal personality card |
| Soul | `(onboarding)/soul` | Reveal soul card |
| Profile | `(onboarding)/profile` | Both birth cards displayed together |
| Quiz | `(onboarding)/quiz` | 5-question personality scoring |
| Recommendation | `(onboarding)/recommendation` | Recommend best-match avatar |

### Phase 3 — Choose Your Companion

| Screen | Route | Purpose |
|---|---|---|
| Confirm | `(onboarding)/confirm` | User confirms avatar selection |
| First Draw | `(onboarding)/first-draw` | Ritual first card draw |

Navigation between screens always uses `router.push('/(onboarding)/next-screen')` from `expo-router`.

---

## OnboardingScreen Shell

Every onboarding screen wraps its content in `<OnboardingScreen>`. Never re-implement the dark background, atmosphere layer, or SafeAreaView.

```tsx
import { useRouter } from 'expo-router';
import OnboardingScreen from 'src/components/onboarding/OnboardingScreen';

export default function MyScreen() {
  const router = useRouter();

  return (
    <OnboardingScreen
      bottomContent={
        <Pressable onPress={() => router.push('/(onboarding)/next')}>
          <Text>Continue</Text>
        </Pressable>
      }
    >
      {/* screen body */}
    </OnboardingScreen>
  );
}
```

---

## Terminal Prompt Pattern

All text-input screens use a `>` caret + `TerminalInput`. The caret is a `Text` node; the input is a separate component. Never put the caret inside the input.

```tsx
import TerminalInput from 'src/components/onboarding/TerminalInput';
import { colors, fonts } from 'src/theme/tokens';

<View style={{ flexDirection: 'row', alignItems: 'center' }}>
  <Text style={{ fontFamily: fonts.terminal, fontSize: 20, color: colors.text.secondary }}>
    {'> '}
  </Text>
  <TerminalInput
    value={value}
    onChangeText={setValue}
    onSubmit={handleSubmit}
    autoFocus
  />
</View>
```

`TerminalInput` automatically wires `selectionColor` and `cursorColor` to `avatarAccents[activeAvatar].primary`.

---

## Character-Reveal Animation

Prompts and headlines appear via a character-by-character reveal on mount — not via opacity fade. This is the canonical pattern used on the name screen and entry screen.

```tsx
const [displayed, setDisplayed] = useState('');
const full = 'What should I call you?';

useEffect(() => {
  let i = 0;
  const id = setInterval(() => {
    setDisplayed(full.slice(0, i + 1));
    i++;
    if (i >= full.length) clearInterval(id);
  }, 30);                          // 30ms per character
  return () => clearInterval(id);
}, []);

// Render
<Text style={styles.prompt}>{displayed}</Text>
```

30ms per character is the spec. Do not substitute a fade transition for the character reveal.

---

## Entry Screen Fade

The entry screen (index) uses a whole-content opacity fade on mount — the only screen that uses fade-in instead of character reveal. This is because it's the brand moment, not a prompt.

```tsx
const opacity = useSharedValue(0);

useEffect(() => {
  opacity.value = withTiming(1, { duration: 800, easing: Easing.out(Easing.ease) });
}, []);

<Animated.View style={{ opacity }}>
  {/* headline, divider, CTA */}
</Animated.View>
```

---

## Date of Birth Fields

DOB uses three `TerminalInput` fields (DD, MM, YYYY) with auto-advance on max-length fill and a ref chain for focus management.

```tsx
const dayRef   = useRef<TextInput>(null);
const monthRef = useRef<TextInput>(null);
const yearRef  = useRef<TextInput>(null);

// Auto-advance: when DD reaches 2 chars, focus MM; when MM reaches 2 chars, focus YYYY
function handleDayChange(text: string) {
  setDay(text);
  if (text.length === 2) monthRef.current?.focus();
}
function handleMonthChange(text: string) {
  setMonth(text);
  if (text.length === 2) yearRef.current?.focus();
}

// Render fields as a single row
<View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
  <TerminalInput ref={dayRef}   value={day}   onChangeText={handleDayChange}   maxLength={2} keyboardType="numeric" placeholder="DD" />
  <Text style={separator}>/</Text>
  <TerminalInput ref={monthRef} value={month} onChangeText={handleMonthChange} maxLength={2} keyboardType="numeric" placeholder="MM" />
  <Text style={separator}>/</Text>
  <TerminalInput ref={yearRef}  value={year}  onChangeText={setYear}           maxLength={4} keyboardType="numeric" placeholder="YYYY" />
</View>
```

Separator `/` uses `fonts.terminal`, color `colors.text.secondary`. The field group sits below the `> ` caret on the same row as a date-format label (`DD / MM / YYYY` in `label` type, `colors.text.tertiary`).

---

## Profile Store — When to Write

Each screen writes to `profileStore` before navigating forward. Never batch writes across multiple screens.

| Screen | Store write |
|---|---|
| Name | `setName(name)` |
| DOB | `setDateOfBirth({ day, month, year })` |
| Calculating | `setBirthCards(computed)` |
| Quiz | `setQuizScores(scores)` |
| Confirm | `setAvatar(avatarId)` (avatarStore), then navigate |
| First Draw | `setTodaysCard(drawnCard)`, `setOnboardingComplete(true)` |

Personality/Soul/Profile/Recommendation screens are display-only — they read `profileStore.birthCards`, not write.

---

## CTA Button — Onboarding Variant

Sharp corners (no border-radius), thin border, `fonts.body` label at `typeScale.label` scale, 2px letter-spacing. Left-aligned by default; center-aligned on brand screens.

```tsx
<Pressable
  style={({ pressed }) => [styles.cta, pressed && { opacity: 0.7 }]}
  onPress={handleNext}
  disabled={!isValid}
>
  <Text style={[styles.ctaText, !isValid && { color: colors.text.tertiary }]}>
    Continue
  </Text>
</Pressable>

const styles = StyleSheet.create({
  cta: {
    borderWidth: 1,
    borderColor: colors.ash,
    paddingVertical: 16,
    paddingHorizontal: 32,
    alignSelf: 'flex-start',
  },
  ctaText: {
    fontFamily: fonts.body,
    fontSize: 12,
    fontWeight: '600',
    color: colors.bone,
    letterSpacing: 2,
  },
});
```

On avatar-accented screens (confirm, first-draw), swap `borderColor: colors.ash` for `borderColor: accent.primary`.

Disabled state uses `colors.text.tertiary` for text and does not change border.

---

## Avatar Selection Grid

The confirm screen renders all four avatars in a 2×2 grid. Each cell:
- `AvatarPortrait` at `presence` level (200px aura, 140px portrait)
- Avatar name in `fonts.display` below
- Selected state: `borderColor: accent.primary`
- Unselected state: `borderColor: colors.ash`, 50% opacity

```tsx
const [selected, setSelected] = useState<AvatarId>('casper');

{(['casper', 'eli', 'olivia', 'destiny'] as AvatarId[]).map((id) => (
  <Pressable key={id} onPress={() => setSelected(id)} style={[styles.avatarCell, selected === id && { borderColor: avatarAccents[id].primary }]}>
    <AvatarPortrait avatarId={id} presenceLevel="presence" auraContext={selected === id ? 'recognition' : 'neutral'} />
    <Text style={styles.avatarName}>{id.charAt(0).toUpperCase() + id.slice(1)}</Text>
  </Pressable>
))}
```

The selected avatar gets `auraContext="recognition"` — single pulse outward, then settle.

---

## Screen Typography Pattern

All onboarding screens follow this hierarchy:

```
[Phase label]        — typeScale.label, fonts.terminal, colors.text.tertiary, uppercase
[Headline]           — typeScale.displayM or displayL, fonts.display, colors.bone
[Subtext / prompt]   — typeScale.bodyM, fonts.body, colors.text.secondary, lineHeight 27
[Terminal input]     — fonts.terminal, 20px (from TerminalInput component)
[System line]        — typeScale.micro or label, fonts.terminal, colors.text.tertiary
```

Dividers between sections: `height: 1`, `backgroundColor: colors.ash`, `opacity: 0.4`.

---

## Do

- Wrap every onboarding screen in `<OnboardingScreen>`
- Use character-reveal (30ms/char `setInterval`) for prompt text appearance
- Use the `> ` caret + `TerminalInput` pattern for all text inputs
- Auto-advance DOB fields on `maxLength` fill via ref chain
- Write to `profileStore` or `avatarStore` before navigating, not after
- Use `router.push('/(onboarding)/...')` for screen-to-screen navigation
- Use `fonts.terminal` for carets, separators, system lines, and labels
- Use `fonts.display` for avatar names and card names on reveal screens

## Do Not

- Re-implement the `OnboardingScreen` shell (background, atmosphere, SafeAreaView)
- Use opacity fade instead of character reveal for prompt text
- Batch store writes across multiple screens
- Use border-radius on CTA buttons (sharp corners throughout onboarding)
- Auto-navigate without user action (except DOB field-to-field auto-focus)
- Use `Animated.Value` (old API) — use Reanimated `useSharedValue`
- Hard-code `'casper'` or any avatar ID — always from store or selection state
