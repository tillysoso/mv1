// Matches `streaks` (supabase/migrations/0001_init.sql). current_streak /
// longest_streak are deliberately not written from the client — see
// supabase/migrations/0003_rls_hardening.sql.
import { supabase } from '../client';

export interface StreakRow {
  user_id: string;
  last_draw_date: string; // 'YYYY-MM-DD', device-local — see ARCHITECTURE-ESSENTIALS.md re: timezones
  last_card_id: string;
  current_streak: number;
  longest_streak: number;
  updated_at: string;
}

// Returns null when the user has never drawn (no row yet), rather than
// surfacing PostgREST's PGRST116 "no rows" error to the caller.
export async function getStreak(userId: string): Promise<StreakRow | null> {
  const { data, error } = await supabase
    .from('streaks')
    .select('*')
    .eq('user_id', userId)
    .maybeSingle();
  if (error) throw error;
  return data as StreakRow | null;
}

export async function recordDraw(
  userId: string,
  draw: { date: string; cardId: string },
): Promise<void> {
  const { error } = await supabase
    .from('streaks')
    .upsert(
      { user_id: userId, last_draw_date: draw.date, last_card_id: draw.cardId },
      { onConflict: 'user_id' },
    );
  if (error) throw error;
}
