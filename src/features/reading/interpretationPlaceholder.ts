// Placeholder avatar interpretations — replace with real content
// Source: _discovery/brand/majestic-brand-voice.md

export const interpretationPlaceholder = {
  casper: (cardName: string) =>
    `${cardName}. You already know what this means. Act on it.`,
  eli: (cardName: string) =>
    `${cardName} is showing you a pattern that goes back further than this moment.`,
  olivia: (cardName: string) =>
    `${cardName}. What does this actually look like on an ordinary Wednesday?`,
  destiny: (cardName: string) =>
    `${cardName}. Something in you already felt this coming.`,
} as const;
