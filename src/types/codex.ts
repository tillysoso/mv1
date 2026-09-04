// Client-side model for the Codex two-tier system (PRD v4 §06). There is no
// codex_unlocks table (see supabase/README.md) — the eligibility rule for
// the expanded layer is still an open product decision, so `isUnlocked`
// below is intentionally a function signature, not a stored boolean.
import type { AvatarId } from './avatar';
import type { TarotCard } from './tarot';

export interface CodexEntry {
  card: TarotCard;
  firstDrawnAt: string | null; // null until the user has drawn this card once
}

export interface CodexExpandedContent {
  avatarId: AvatarId;
  interpretation: string;
  lore: string;
}

// Placeholder for whatever the eligibility rule turns out to be
// (subscription, streak milestone, or a combination — PRD v4 §06).
export type CodexUnlockRule = (params: {
  subscriptionActive: boolean;
  currentStreak: number;
}) => boolean;
