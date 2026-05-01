import { supabase } from '../client';
import type { AvatarId } from '../../../types/avatar';
import type { TarotCard } from '../../../types/tarot';

export interface Reading {
  id: string;
  user_id: string;
  spread_type: 'single' | 'three_card';
  avatar_id: AvatarId | null;
  cards: TarotCard[];
  reflection_note: string | null;
  created_at: string;
}

export interface SaveReadingPayload {
  spreadType: 'single' | 'three_card';
  avatarId: AvatarId | null;
  cards: TarotCard[];
  reflectionNote?: string;
}

export async function saveReading(
  userId: string,
  payload: SaveReadingPayload,
): Promise<Reading> {
  const { data, error } = await supabase
    .from('readings')
    .insert({
      user_id: userId,
      spread_type: payload.spreadType,
      avatar_id: payload.avatarId ?? null,
      cards: payload.cards,
      reflection_note: payload.reflectionNote ?? null,
    })
    .select()
    .single();
  if (error) throw error;
  return data as Reading;
}

export async function getRecentReadings(userId: string, limit = 10): Promise<Reading[]> {
  const { data, error } = await supabase
    .from('readings')
    .select('*')
    .eq('user_id', userId)
    .order('created_at', { ascending: false })
    .limit(limit);
  if (error) throw error;
  return (data ?? []) as Reading[];
}
