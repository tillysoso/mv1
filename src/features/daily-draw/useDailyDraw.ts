import { useState, useEffect } from 'react';
import { useProfileStore } from '../../stores/profileStore';
import { useAuthStore } from '../../stores/authStore';
import { supabase } from '../../lib/supabase/client';
import { MAJOR_ARCANA_CARDS } from './cardData';
import type { TarotCard } from '../../types/tarot';

function todayString(): string {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
}

function pickRandom<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

export function useDailyDraw() {
  const { user } = useAuthStore();
  const { todaysCard, setTodaysCard, birthCards } = useProfileStore();
  const [hasDrawnToday, setHasDrawnToday] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [card, setCard] = useState<TarotCard | null>(null);

  useEffect(() => {
    async function check() {
      setIsLoading(true);

      if (todaysCard) {
        setCard(todaysCard);
        setHasDrawnToday(true);
        setIsLoading(false);
        return;
      }

      if (user?.id) {
        try {
          const today = todayString();
          const { data } = await supabase
            .from('streaks')
            .select('last_draw_date, last_card_id')
            .eq('user_id', user.id)
            .single();

          if (data?.last_draw_date === today && data?.last_card_id) {
            const found = MAJOR_ARCANA_CARDS.find((c) => c.id === data.last_card_id);
            if (found) {
              setCard(found);
              setTodaysCard(found);
              setHasDrawnToday(true);
              setIsLoading(false);
              return;
            }
          }
        } catch {
          // Supabase not configured — fall through to local draw
        }
      }

      setIsLoading(false);
    }

    check();
  }, [user?.id]);

  function resolveAuraContext(selected: TarotCard): TarotCard {
    // Recognition override if card matches profile cards
    if (birthCards) {
      const isProfileCard =
        selected.number === birthCards.personalityCard.number ||
        selected.number === birthCards.soulCard.number;
      if (isProfileCard) return { ...selected, auraContext: 'recognition' };
    }
    return selected;
  }

  async function draw() {
    const selected = resolveAuraContext(pickRandom(MAJOR_ARCANA_CARDS));
    setCard(selected);
    setHasDrawnToday(true);
    setTodaysCard(selected);

    if (user?.id) {
      const today = todayString();
      try {
        await supabase.from('readings').insert({
          user_id: user.id,
          spread_type: 'single',
          avatar_id: null,
          cards: [selected],
          reflection_note: null,
        });
        await supabase.from('streaks').upsert(
          { user_id: user.id, last_draw_date: today, last_card_id: selected.id },
          { onConflict: 'user_id' },
        );
      } catch {
        // Silently fail — local state is source of truth
      }
    }
  }

  return { card, hasDrawnToday, isLoading, draw };
}
