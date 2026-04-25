export const fonts = {
  // Cinzel — display headings, card names, Roman numerals
  display: 'Cinzel_400Regular',
  displayBold: 'Cinzel_700Bold',

  // Montserrat — body, UI labels, avatar voice
  body: 'Montserrat_400Regular',
  bodyMedium: 'Montserrat_500Medium',
  bodySemiBold: 'Montserrat_600SemiBold',
  bodyBold: 'Montserrat_700Bold',

  // Space Mono — terminal register, system lines, coords
  terminal: 'SpaceMono_400Regular',

  // Wordmark font — Remachine Script (designed by Luke)
  // Files: assets/fonts/RemachineScript.woff2 / .ttf / .eot
  // Use ONLY for the Majestic wordmark lockup — never for body or UI text
  wordmark: 'RemachineScript',
} as const;

// ─── Font asset map (for useFonts / expo-font) ───────────────────────────────
export const fontAssets = {
  RemachineScript: require('../../assets/fonts/RemachineScript.ttf'),
} as const;

export const fontWeights = {
  light: '300',
  regular: '400',
  medium: '500',
  semiBold: '600',
  bold: '700',
} as const;

export const typeScale = {
  displayXL: { fontSize: 44, fontWeight: fontWeights.bold, letterSpacing: 2 },
  displayL:  { fontSize: 32, fontWeight: fontWeights.bold, letterSpacing: 2 },
  displayM:  { fontSize: 26, fontWeight: fontWeights.semiBold, letterSpacing: 1.5 },
  displayS:  { fontSize: 18, fontWeight: fontWeights.regular, letterSpacing: 2 },
  bodyL:     { fontSize: 18, fontWeight: fontWeights.regular, lineHeight: 30 },
  bodyM:     { fontSize: 16, fontWeight: fontWeights.regular, lineHeight: 27 },
  bodyS:     { fontSize: 14, fontWeight: fontWeights.regular, lineHeight: 23 },
  label:     { fontSize: 12, fontWeight: fontWeights.semiBold, letterSpacing: 1 },
  micro:     { fontSize: 11, fontWeight: fontWeights.regular },
  terminal:  { fontSize: 17, fontWeight: fontWeights.regular, letterSpacing: 0.5 },
} as const;
