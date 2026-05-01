import { supabase } from '../client';
import type { BirthCards } from '../../../types/tarot';
import type { AvatarId } from '../../../types/avatar';

export interface Profile {
  id: string;
  date_of_birth_day: number | null;
  date_of_birth_month: number | null;
  date_of_birth_year: number | null;
  personality_card_number: number | null;
  personality_card_name: string | null;
  soul_card_number: number | null;
  soul_card_name: string | null;
  same_card: boolean | null;
  active_avatar: AvatarId | null;
}

export async function saveProfile(
  userId: string,
  dob: { day: number; month: number; year: number },
  birthCards: BirthCards,
): Promise<void> {
  const { error } = await supabase.from('profiles').upsert({
    id: userId,
    date_of_birth_day: dob.day,
    date_of_birth_month: dob.month,
    date_of_birth_year: dob.year,
    personality_card_number: birthCards.personalityCard.number,
    personality_card_name: birthCards.personalityCard.name,
    soul_card_number: birthCards.soulCard.number,
    soul_card_name: birthCards.soulCard.name,
    same_card: birthCards.sameCard,
  });
  if (error) throw error;
}

export async function getProfile(userId: string): Promise<Profile> {
  const { data, error } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', userId)
    .single();
  if (error) throw error;
  return data as Profile;
}

export async function updateAvatar(userId: string, avatarId: AvatarId): Promise<void> {
  const { error } = await supabase
    .from('profiles')
    .update({ active_avatar: avatarId })
    .eq('id', userId);
  if (error) throw error;
}
