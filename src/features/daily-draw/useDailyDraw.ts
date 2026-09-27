import { useState, useEffect } from 'react';
import { useProfileStore } from '../../stores/profileStore';
import { useAuthStore } from '../../stores/authStore';
import { handleSupabaseError } from '../../utils/handleError';
import { saveReading } from '../../lib/supabase/v2/readings';
import { getStreak, recordDraw } from '../../lib/supabase/v2/streaks';
import { trackDailyDrawCompleted } from '../../lib/analytics/posthog';
import { MAJOR_ARCANA_CARDS } from './cardData';
import { SPREAD_TYPE, AURA_CONTEXT } from '../../constants';

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
          const streak = await getStreak(user.id);

          if (streak?.last_draw_date === today) {
            const found = MAJOR_ARCANA_CARDS.find((c) => c.id === streak.last_card_id);
            if (found) {
              setTodaysCard(found);
              setIsLoading(false);
              return;
            }
          }
        } catch (e) {
          console.error('[DailyDraw] streak lookup failed, falling back to local draw:', handleSupabaseError(e).message);
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
      if (isProfileCard) return { ...selected, auraContext: AURA_CONTEXT.RECOGNITION };
    }
    return selected;
  }

  async function draw() {
    const selected = resolveAuraContext(pickRandom(MAJOR_ARCANA_CARDS));
    setTodaysCard(selected);
    trackDailyDrawCompleted();

    if (user?.id) {
      const today = todayString();
      try {
        await Promise.all([
          saveReading(user.id, { spreadType: SPREAD_TYPE.SINGLE, avatarId: null, cards: [selected] }),
          recordDraw(user.id, { date: today, cardId: selected.id }),
        ]);
      } catch (e) {
        console.error('[DailyDraw] failed to persist reading/streak:', e);
      }
    }
  }

  return { card: todaysCard, hasDrawnToday: todaysCard !== null, isLoading, draw };
}
