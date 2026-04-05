import { supabase } from './client';
import type { BirthCards } from '../../types/tarot';
import type { AvatarId } from '../../types/avatar';

export async function saveProfile(userId: string, dob: {
  day: number; month: number; year: number
}, birthCards: BirthCards) {
  const { error } = await supabase
    .from('profiles')
    .update({
      date_of_birth_day: dob.day,
      date_of_birth_month: dob.month,
      date_of_birth_year: dob.year,
      personality_card_number: birthCards.personalityCard.number,
      personality_card_name: birthCards.personalityCard.name,
      soul_card_number: birthCards.soulCard.number,
      soul_card_name: birthCards.soulCard.name,
      same_card: birthCards.sameCard,
    })
    .eq('id', userId);
  if (error) throw error;
}

export async function getProfile(userId: string) {
  const { data, error } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', userId)
    .single();
  if (error) throw error;
  return data;
}

export async function updateAvatar(userId: string, avatarId: AvatarId) {
  const { error } = await supabase
    .from('profiles')
    .update({ active_avatar: avatarId })
    .eq('id', userId);
  if (error) throw error;
}
