// Mirrors the subscription columns added to `profiles` in
// supabase/migrations/0002_subscription_and_journal.sql. Draft — no
// RevenueCat integration exists in src/ yet. Field names and gating rules
// come from docs/01-product-strategy/majestic-subscription-tier-spec.md.
export type SubscriptionTier = 'monthly' | 'payg' | null;

export interface SubscriptionState {
  subscriptionActive: boolean;
  subscriptionTier: SubscriptionTier;
  subscriptionExpiresAt: string | null; // ISO timestamp
}

// Reading-credit gating (spec section 02) — 3 free Dig Deeper unlocks/day,
// reset at local midnight. Daily draw and the base reading are never gated.
export interface ReadingCreditState {
  readingsToday: number;
  readingsResetAt: string; // ISO timestamp
}

export const FREE_DAILY_READING_CREDITS = 3;
