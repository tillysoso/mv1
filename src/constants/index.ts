import type { AvatarId } from '../types';

// ─── Avatar ───────────────────────────────────────────────────────────────────

export const AVATAR_IDS: readonly AvatarId[] = ['casper', 'eli', 'olivia', 'destiny'];

export const DEFAULT_AVATAR_ID: AvatarId = 'casper';

// ─── Aura context ─────────────────────────────────────────────────────────────

export const AURA_CONTEXT = {
  NEUTRAL:      'neutral',
  BREAKTHROUGH: 'breakthrough',
  SHADOW:       'shadow',
  RECOGNITION:  'recognition',
  GATHERING:    'gathering',
} as const;

// ─── Card suits ───────────────────────────────────────────────────────────────

export const SUIT = {
  MAJOR:     'major',
  WANDS:     'wands',
  CUPS:      'cups',
  SWORDS:    'swords',
  PENTACLES: 'pentacles',
} as const;

// ─── Supabase table names ─────────────────────────────────────────────────────

export const TABLE = {
  PROFILES: 'profiles',
  READINGS: 'readings',
  STREAKS:  'streaks',
} as const;

// ─── Reading spread types ─────────────────────────────────────────────────────

export const SPREAD_TYPE = {
  SINGLE:     'single',
  THREE_CARD: 'three_card',
} as const;

// ─── Portal shapes ────────────────────────────────────────────────────────────

export const PORTAL_SHAPE = {
  ARCH:          'arch',
  LIVING_CIRCLE: 'livingCircle',
} as const;

// ─── Avatar states ────────────────────────────────────────────────────────────

export const AVATAR_STATE = {
  NEUTRAL:    'neutral',
  ACTIVE:     'active',
  REFLECTIVE: 'reflective',
} as const;

// ─── Presence levels ──────────────────────────────────────────────────────────

export const PRESENCE_LEVEL = {
  HERO:     'hero',
  PRESENCE: 'presence',
  SIGNAL:   'signal',
  MARK:     'mark',
  NONE:     'none',
} as const;

// ─── Navigation routes ────────────────────────────────────────────────────────

export const ROUTE = {
  TABS:                   '/(tabs)',
  ONBOARDING:             '/(onboarding)',
  ONBOARDING_NAME:        '/(onboarding)/name',
  ONBOARDING_DOB:         '/(onboarding)/dob',
  ONBOARDING_CALCULATING: '/(onboarding)/calculating',
  ONBOARDING_PERSONALITY: '/(onboarding)/personality',
  ONBOARDING_SOUL:        '/(onboarding)/soul',
  ONBOARDING_PROFILE:     '/(onboarding)/profile',
  ONBOARDING_QUIZ:        '/(onboarding)/quiz',
  ONBOARDING_RECOMMEND:   '/(onboarding)/recommendation',
  ONBOARDING_CONFIRM:     '/(onboarding)/confirm',
  ONBOARDING_FIRST_DRAW:  '/(onboarding)/first-draw',
} as const;
