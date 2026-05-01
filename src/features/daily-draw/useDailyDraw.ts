import { useState, useEffect } from 'react';
import { useProfileStore } from '../../stores/profileStore';
import { useAuthStore } from '../../stores/authStore';
import { supabase } from '../../lib/supabase/client';
import { handleSupabaseError } from '../../utils/handleError';
import { saveReading } from '../../lib/supabase/v2/readings';
import { MAJOR_ARCANA_CARDS } from './cardData';

function todayString(): string {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
}

function pickRandom<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

export function useDailyDraw() {
  const user = useAuthStore((s) => s.user);
  const todaysCard = useProfileStore((s) => s.todaysCard);
  const setTodaysCard = useProfileStore((s) => s.setTodaysCard);
  const birthCards = useProfileStore((s) => s.birthCards);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function check() {
      setIsLoading(true);

      if (todaysCard) {
        setIsLoading(false);
        return;
      }

      if (user?.id) {
        try {
          const today = todayString();
          const { data, error } = await supabase
            .from('streaks')
            .select('last_draw_date, last_card_id')
            .eq('user_id', user.id)
            .single();

          if (error && error.code !== 'PGRST116') {
            console.error('[DailyDraw] streak lookup failed:', handleSupabaseError(error).message);
          }

          if (data?.last_draw_date === today && data?.last_card_id) {
          if (data && data.last_draw_date === today && data.last_card_id) {
            const found = MAJOR_ARCANA_CARDS.find((c) => c.id === data.last_card_id);
            if (found) {
              setTodaysCard(found);
              setIsLoading(false);
              return;
            }
          }
        } catch (e) {
          console.error('[DailyDraw] streak check error, falling back to local draw:', e);
        }
      }

      setIsLoading(false);
    }

    check();
  }, [user?.id, todaysCard]);

  function resolveAuraContext(selected: (typeof MAJOR_ARCANA_CARDS)[number]): (typeof MAJOR_ARCANA_CARDS)[number] {
    if (birthCards) {
      const isProfileCard =
        selected.number === birthCards.personalityCard.number ||
        selected.number === birthCards.soulCard.number;
      if (isProfileCard) return { ...selected, auraContext: 'recognition' as const };
    }
    return selected;
  }

  async function draw() {
    const selected = resolveAuraContext(pickRandom(MAJOR_ARCANA_CARDS));
    setTodaysCard(selected);

    if (user?.id) {
      const today = todayString();
      try {
        await Promise.all([
          supabase.from('readings').insert({
            user_id: user.id,
            spread_type: 'single',
            avatar_id: null,
            cards: [selected],
            reflection_note: null,
          }),
          supabase.from('streaks').upsert(
            { user_id: user.id, last_draw_date: today, last_card_id: selected.id },
            { onConflict: 'user_id' },
          ),
        ]);
        await saveReading(user.id, { spreadType: 'single', avatarId: null, cards: [selected] });
        await supabase.from('streaks').upsert(
          { user_id: user.id, last_draw_date: today, last_card_id: selected.id },
          { onConflict: 'user_id' },
        );
      } catch (e) {
        console.error('[DailyDraw] failed to persist reading/streak:', e);
      }
    }
  }

  return { card: todaysCard, hasDrawnToday: todaysCard !== null, isLoading, draw };
}
