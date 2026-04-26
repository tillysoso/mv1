---
description: Majestic tarot card rendering — CardPlaceholder Skia gradient patterns, card sizes, TarotCard type, Roman numeral display, and future CardFace asset conventions.
trigger: tarot-cards
---

# Majestic — Tarot Cards Skill

You are implementing tarot card UI for **Majestic**. Cards are rendered through `CardPlaceholder` (placeholder/loading state) or the future `CardFace` component (final art). Follow every rule below.

---

## Source Files

- `src/components/cards/CardPlaceholder.tsx` — canonical card rendering component
- `src/theme/tokens.ts` — `avatarAccents`, `colors`
- `src/theme/typography.ts` — `fonts` (Cinzel for card text)
- `src/types/tarot.ts` — `TarotCard`, `AuraContext`, `Suit`, `BirthCards`

---

## CardPlaceholder — the only card rendering surface (until CardFace ships)

**Never build a custom card layout.** Always use `<CardPlaceholder>`.

```tsx
import CardPlaceholder from 'src/components/cards/CardPlaceholder';

<CardPlaceholder
  card={tarotCard}           // TarotCard
  avatarId={activeAvatar}    // AvatarId — drives gradient accent colors
  size="daily"               // 'full' | 'daily' | 'thumb'
/>
```

The `avatarId` prop determines which accent set is used for the gradient — always pass the active avatar dynamically.

---

## Card Sizes

| Size | width | height | Use |
|---|---|---|---|
| `full` | 240 | 360 | Reading detail, single-card spread |
| `daily` | 200 | 300 | Daily draw screen, recommendation screen |
| `thumb` | 80 | 120 | Codex grid, recent readings row, profile |

`thumb` renders gradient only — no text content (too small). `full` and `daily` render the Roman numeral + card name.

---

## TarotCard Type

```ts
interface TarotCard {
  id: string;           // kebab-case: 'the-fool', 'ten-of-cups'
  name: string;         // Display name: 'The Fool', 'Ten of Cups'
  number: number;       // 0–21 major arcana; 1–14 minor arcana
  suit: Suit;           // 'major' | 'wands' | 'cups' | 'swords' | 'pentacles'
  auraContext: AuraContext;  // 'neutral' | 'breakthrough' | 'shadow' | 'recognition'
}
```

The `auraContext` on `TarotCard` drives the `AvatarAura` animation when this card is the active reading card. Always pass `card.auraContext` through to `AvatarPortrait`'s `auraContext` prop — never hardcode the context.

---

## Skia Gradient Pattern

CardPlaceholder uses a Skia `LinearGradient` inside a `Rect` for the card background. The gradient blends from `accent.primary` (with `99` alpha suffix) → `colors.charcoal` → `accent.secondary` (with `66` alpha suffix).

```tsx
<Canvas style={StyleSheet.absoluteFill}>
  <Rect x={0} y={0} width={width} height={height}>
    <LinearGradient
      start={vec(0, 0)}
      end={vec(width, height)}
      colors={[accent.primary + '99', colors.charcoal, accent.secondary + '66']}
    />
  </Rect>
</Canvas>
```

Alpha suffixes in hex: `99` = ~60% opacity, `66` = ~40% opacity.

---

## Card Layer Stack

From bottom to top:

1. **Skia gradient** (`StyleSheet.absoluteFill` Canvas) — diagonal, corner-to-corner
2. **Outer border** — `borderWidth: 3`, `borderColor: colors.ash`, `borderRadius: 8`, on the root View
3. **Inner signal border** — `View` with `StyleSheet.absoluteFillObject`, `borderWidth: 1.5`, `borderColor: accent.secondary`, `borderRadius: 6`, `margin: 6`
4. **Content** (`full`/`daily` only) — centered Roman numeral + card name
5. **Accent bar** — `height: 3`, `backgroundColor: accent.primary`, `opacity: 0.8`, bottom of card

---

## Text on Cards

Roman numeral (above name):
```tsx
<Text style={{ fontFamily: fonts.display, fontSize: 14, letterSpacing: 2, opacity: 0.7, color: accent.secondary }}>
  {ROMAN[card.number]}
</Text>
```

Card name (below numeral):
```tsx
<Text style={{ fontFamily: fonts.display, fontSize: 13, textAlign: 'center', letterSpacing: 1, lineHeight: 18, color: colors.bone }} numberOfLines={2}>
  {card.name}
</Text>
```

Both use `fonts.display` (Cinzel). Never use `fonts.body` or `fonts.terminal` for card text.

---

## Roman Numeral Map

Major Arcana 0–21:

```ts
const ROMAN: Record<number, string> = {
  0:'0', 1:'I', 2:'II', 3:'III', 4:'IV', 5:'V', 6:'VI', 7:'VII',
  8:'VIII', 9:'IX', 10:'X', 11:'XI', 12:'XII', 13:'XIII',
  14:'XIV', 15:'XV', 16:'XVI', 17:'XVII', 18:'XVIII', 19:'XIX',
  20:'XX', 21:'XXI',
};
```

Minor Arcana (1–14) use Arabic numerals or court names — do not force them through the Roman map.

---

## Suit Values

| Suit | Element | Avatar affinity |
|---|---|---|
| `major` | All | — |
| `wands` | Fire | Casper |
| `cups` | Water | Destiny |
| `swords` | Air | Eli |
| `pentacles` | Earth | Olivia |

Suit-to-avatar affinity may drive `avatarId` on the card component when no explicit avatar selection has been made.

---

## Future CardFace Convention

When real card art ships, the `CardFace` component will replace `CardPlaceholder`. Asset convention:

- Path: `assets/cards/{suit}/{card-id}.png`
- Examples: `assets/cards/major/the-fool.png`, `assets/cards/cups/ten-of-cups.png`

`CardFace` will accept the same `card`, `avatarId`, `size` props as `CardPlaceholder` — swap the import only.

---

## BirthCards

The profile screen displays two birth cards (personality + soul). Rendered as a pair of `CardPlaceholder` components at `daily` or `full` size. If `birthCards.sameCard` is true, only one card is shown.

```tsx
const { personalityCard, soulCard, sameCard } = profileStore.birthCards;

<CardPlaceholder card={toTarotCard(personalityCard)} avatarId={activeAvatar} size="daily" />
{!sameCard && (
  <CardPlaceholder card={toTarotCard(soulCard)} avatarId={activeAvatar} size="daily" />
)}
```

---

## Do

- Use `<CardPlaceholder>` for all card rendering — never build a custom card shell
- Pass `avatarId` dynamically from `useAvatarStore` — never hardcode an avatar's accent colors
- Use `fonts.display` (Cinzel) for all text on cards
- Derive `auraContext` from `card.auraContext` — never hardcode `'neutral'`
- Use the `+ '99'` / `+ '66'` alpha suffix pattern for gradient transparency
- Render inner signal border + accent bar on every card (all sizes)

## Do Not

- Build custom card gradients outside CardPlaceholder
- Use `fonts.body` or `fonts.terminal` for card number or name
- Show text content inside `thumb` size cards — gradient only
- Hardcode card dimensions — always use the `SIZES` map via the `size` prop
- Use `shadow`/`elevation` for card depth — the Skia gradient provides all depth
- Hardcode an avatar's hex value for the card gradient
