# Majestic — Onboarding Screen Map
## Phase 1 — Signal & Entry
screen-01  /app/(onboarding)/index.tsx         Entry — Threshold City atmosphere, brand reveal
screen-02  /app/(onboarding)/name.tsx           Name input — terminal register, Space Mono
screen-03  /app/(onboarding)/dob.tsx            Date of birth input — terminal register
## Phase 2 — Majestic Profile
screen-04  /app/(onboarding)/calculating.tsx    Birth card calculation loading state
screen-05  /app/(onboarding)/personality.tsx    Personality card reveal
screen-06  /app/(onboarding)/soul.tsx           Soul card reveal (or same-card state)
screen-07  /app/(onboarding)/profile.tsx        Majestic Profile summary — first codex entry
## Phase 3 — Choose Your Companion
screen-08  /app/(onboarding)/quiz.tsx           World quiz — 4 questions
screen-09  /app/(onboarding)/recommendation.tsx Avatar recommendation
screen-10  /app/(onboarding)/confirm.tsx        Companion confirmation — UI theme bloom
screen-11  /app/(onboarding)/first-draw.tsx     First card draw — ritual established
## Navigation
Entry point:  /app/(onboarding)/index.tsx
Exit point:   navigates to /app/(tabs)/ on first-draw completion
Completed flag: stored in profileStore + Supabase profiles table
