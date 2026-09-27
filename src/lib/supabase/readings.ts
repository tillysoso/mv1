import { supabase } from './client';
import type { AvatarId, TarotCard } from '../../types';
import { TABLE } from '../../constants';

export async function saveReading(userId: string, payload: {
  spreadType: 'single' | 'three_card';
  avatarId: AvatarId;
  cards: TarotCard[];
  reflectionNote?: string;
}) {
  const { error } = await supabase
    .from(TABLE.READINGS)
    .insert({
      user_id: userId,
      spread_type: payload.spreadType,
      avatar_id: payload.avatarId,
      cards: payload.cards,
      reflection_note: payload.reflectionNote ?? null,
    });
  if (error) throw error;
}

export async function getRecentReadings(userId: string, limit = 10) {
  const { data, error } = await supabase
    .from(TABLE.READINGS)
    .select('*')
    .eq('user_id', userId)
    .order('created_at', { ascending: false })
    .limit(limit);
  if (error) throw error;
  return data ?? [];
}
