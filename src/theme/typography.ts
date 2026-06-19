// ─── Font family aliases ───────────────────────────────────────────────────────
// Fonts are loaded in app/_layout.tsx via expo-font under these exact aliases.
// Weight variants are separate families in React Native — use the appropriate
// alias rather than combining fontFamily + fontWeight across platforms.
export const fonts = {
  // Display — Cinzel (@expo-google-fonts/cinzel)
  display:         'Cinzel_400Regular',
  displaySemiBold: 'Cinzel_600SemiBold',
  displayBold:     'Cinzel_700Bold',

  // Body — Montserrat (@expo-google-fonts/montserrat)
  bodyLight:    'Montserrat_300Light',
  body:         'Montserrat_400Regular',
  bodyMedium:   'Montserrat_500Medium',
  bodySemiBold: 'Montserrat_600SemiBold',
  bodyBold:     'Montserrat_700Bold',

  // Terminal — Space Mono (@expo-google-fonts/space-mono)
  terminal: 'SpaceMono_400Regular',

  // Wordmark — Remachine Script (custom asset, Luke-designed)
  // Use ONLY for the Majestic wordmark lockup — never for body or UI text.
  wordmark: 'RemachineScript',
} as const;

// ─── Font asset map (for useFonts in app/_layout.tsx) ────────────────────────
// Google Fonts packages export font data directly — imported and mapped there.
// Only custom local assets are declared here.
export const localFontAssets = {
  RemachineScript: require('../../assets/fonts/RemachineScript.ttf'),
} as const;

export const fontWeights = {
  light:    '300',
  regular:  '400',
  medium:   '500',
  semiBold: '600',
  bold:     '700',
} as const;

export const typeScale = {
  displayXL: { fontSize: 44, letterSpacing: 2 },
  displayL:  { fontSize: 32, letterSpacing: 2 },
  displayM:  { fontSize: 26, letterSpacing: 1.5 },
  displayS:  { fontSize: 18, letterSpacing: 2 },
  bodyL:     { fontSize: 18, lineHeight: 30 },
  bodyM:     { fontSize: 16, lineHeight: 27 },
  bodyS:     { fontSize: 14, lineHeight: 23 },
  label:     { fontSize: 12, letterSpacing: 1 },
  micro:     { fontSize: 11 },
  terminal:  { fontSize: 17, letterSpacing: 0.5 },
} as const;
