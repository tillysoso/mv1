// Mirrors the `streaks` table (supabase/migrations/0001_init.sql). Not yet
// consumed anywhere — useDailyDraw.ts reads/writes last_draw_date and
// last_card_id directly via untyped Supabase calls (TABLE.STREAKS).
export interface Streak {
  userId: string;
  lastDrawDate: string; // 'YYYY-MM-DD', local — see ARCHITECTURE-ESSENTIALS.md re: timezones
  lastCardId: string;
  currentStreak: number;
  longestStreak: number;
}
