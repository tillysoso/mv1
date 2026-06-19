// ─── Major Arcana — Birth Card One-Liners ────────────────────────────────────
//
// Source of truth: docs/majestic-arcana-oneliners-final.md
// Used on onboarding Phase 2 reveal screens (05 personality, 06 soul) and the
// profile summary (07) — short, single-line essence/purpose statements.
// Keyed by arcana number (0–21), matching birthCardCalculator's MAJOR_ARCANA map.

export interface CardOneliner {
  personality: string;
  soul: string;
}

export const CARD_ONELINERS: Record<number, CardOneliner> = {
  0: {
    personality: 'You move before you are ready, and somewhere in you, you know that is exactly right.',
    soul: 'You are here to keep beginning — with your eyes open this time.',
  },
  1: {
    personality: 'You can make almost anything happen. The question is whether you are doing it for yourself or for the image.',
    soul: 'You are here to build something real with the tools you already have.',
  },
  2: {
    personality: 'You already know. The work is learning to say it.',
    soul: 'You are here to trust your own perception before the world confirms it.',
  },
  3: {
    personality: 'You give warmth easily and track the cost of it badly.',
    soul: 'You are here to create — and to make sure you are included in what you nurture.',
  },
  4: {
    personality: 'You bring order to chaos, and sometimes use order to avoid it.',
    soul: 'You are here to build things that hold without you holding them together.',
  },
  5: {
    personality: 'You know how systems work — now decide which ones you actually believe in.',
    soul: 'You are here to translate what is true across the distance between then and now.',
  },
  6: {
    personality: 'You already know what you want. The delay is not doubt — it is the weight of making it real.',
    soul: 'You are here to build a life that matches what you actually value, not what looks right.',
  },
  7: {
    personality: 'You know how to move. The work is making sure you are pointed somewhere that matters.',
    soul: 'You are here to master your own momentum — direction first, speed second.',
  },
  8: {
    personality: 'You hold everything together so well that no one notices what it costs you.',
    soul: 'You are here to learn that needing something is not the opposite of being strong.',
  },
  9: {
    personality: 'Solitude is how you function — just make sure you are retreating and not hiding.',
    soul: 'You are here to find what is true in the quiet, and carry it back.',
  },
  10: {
    personality: 'You feel the pattern before it has a name — now decide if you are riding it or making it.',
    soul: 'You are here to understand cycles well enough to move with them, not against them.',
  },
  11: {
    personality: 'You see what is fair clearly — apply that same standard to yourself.',
    soul: 'You are here to stand for something real, consistently, even when it costs you.',
  },
  12: {
    personality: 'The pause is your strength — until it becomes the place you live instead of act.',
    soul: 'You are here to let go of what you were defending and find what that frees up.',
  },
  13: {
    personality: 'You knew before anyone else. What you are still learning is how to let it cost what it cost.',
    soul: 'You are here to outgrow — completely, intentionally, and more than once.',
  },
  14: {
    personality: 'You smooth things over so well you sometimes smooth over yourself.',
    soul: 'You are here to hold contradiction long enough for something new to form from it.',
  },
  15: {
    personality: 'You know what you are attached to. Seeing it clearly is the first real choice.',
    soul: 'You are here to understand what freedom actually looks like from the inside.',
  },
  16: {
    personality: 'You are not surprised. The real question is what you build on next.',
    soul: 'You are here to develop the courage to dismantle things before they fall.',
  },
  17: {
    personality: 'You have a softness that survives things — stop pretending it does not need tending.',
    soul: 'You are here to restore — yourself first, and through that, something in others.',
  },
  18: {
    personality: 'You feel what is beneath the surface — hold the perception before you fill in the story.',
    soul: 'You are here to witness what is hidden, without narrating what you have not yet seen.',
  },
  19: {
    personality: 'The light is real — make sure it is coming from inside and not from the room.',
    soul: 'You are here to be so genuinely alive that the light becomes a consequence, not a performance.',
  },
  20: {
    personality: 'The clarity has already arrived. The only question left is what you are waiting for.',
    soul: 'You are here to keep answering the call — honestly, repeatedly, and further each time.',
  },
  21: {
    personality: 'You have earned more than you are letting yourself have. Stay in it before you move on.',
    soul: 'You are here to understand what it means to be complete — and to call it yours.',
  },
};

export function getCardOneliner(arcanaNumber: number): CardOneliner | undefined {
  return CARD_ONELINERS[arcanaNumber];
}
