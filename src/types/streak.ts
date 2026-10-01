// Mirrors the `streaks` table (supabase/migrations/0001_init.sql). Not yet
// consumed anywhere — the data layer uses the snake_case StreakRow in
// src/lib/supabase/v2/streaks.ts.
export interface Streak {
  userId: string;
  lastDrawDate: string; // 'YYYY-MM-DD', local — see ARCHITECTURE-ESSENTIALS.md re: timezones
  lastCardId: string;
  currentStreak: number;
  longestStreak: number;
}
