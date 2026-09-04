// Draft — mirrors the pattern in readings.ts / profile.ts. Matches
// `journal_entries` (supabase/migrations/0002_subscription_and_journal.sql).
// Not yet imported anywhere; app/(tabs)/journal.tsx is still a placeholder.
import { supabase } from '../client';
import type { AvatarId } from '../../../types/avatar';

export interface JournalEntryRow {
  id: string;
  user_id: string;
  reading_id: string | null;
  avatar_id: AvatarId | null;
  intention: string | null;
  note: string | null;
  created_at: string;
  updated_at: string;
}

export interface SaveJournalEntryPayload {
  readingId?: string | null;
  avatarId: AvatarId | null;
  intention?: string;
  note?: string;
}

export async function saveJournalEntry(
  userId: string,
  payload: SaveJournalEntryPayload,
): Promise<JournalEntryRow> {
  const { data, error } = await supabase
    .from('journal_entries')
    .insert({
      user_id: userId,
      reading_id: payload.readingId ?? null,
      avatar_id: payload.avatarId,
      intention: payload.intention ?? null,
      note: payload.note ?? null,
    })
    .select()
    .single();
  if (error) throw error;
  return data as JournalEntryRow;
}

export async function getJournalEntries(userId: string, limit = 20): Promise<JournalEntryRow[]> {
  const { data, error } = await supabase
    .from('journal_entries')
    .select('*')
    .eq('user_id', userId)
    .order('created_at', { ascending: false })
    .limit(limit);
  if (error) throw error;
  return (data ?? []) as JournalEntryRow[];
}
