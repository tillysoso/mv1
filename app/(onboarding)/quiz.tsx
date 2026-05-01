import { useState, useEffect } from 'react';
import { useState, useRef } from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withSequence,
  runOnJS,
} from 'react-native-reanimated';
import { useRouter } from 'expo-router';
import OnboardingScreen from '../../src/components/onboarding/OnboardingScreen';
import { trackQuizAnswer } from '../../src/lib/analytics';
import { useProfileStore } from '../../src/stores/profileStore';
import { colors } from '../../src/theme/tokens';
import { fonts, typeScale } from '../../src/theme/typography';
import type { AvatarId } from '../../src/types';
import { ROUTE } from '../../src/constants';

// Quiz questions from the Majestic narrative spec (source of truth).
// Note: prompt draft had slightly different wording — spec version used here
// as it uses the finalized world-adjacent scenario copy.

type Option = { text: string; avatar: AvatarId };
type Question = { prompt: string; options: Option[] };

const QUESTIONS: Question[] = [
  {
    prompt:
      'You find an abandoned plant shop in the city. Everything inside is still growing — somehow. What do you do?',
    options: [
      { text: 'Take the most interesting one home and figure out what it needs', avatar: 'olivia' },
      { text: 'Sit in there for a while. It feels like it has something to say', avatar: 'destiny' },
      { text: 'Start asking around. Someone has been keeping this place alive', avatar: 'eli' },
      { text: "Open it back up. Places like this shouldn't stay closed", avatar: 'casper' },
    ],
  },
  {
    prompt:
      'Someone in your city has been leaving tiny handwritten notes in unexpected places for years. You just found one. It says something that feels oddly specific to your life right now. First thought?',
    options: [
      { text: 'Who is this person and how did they know', avatar: 'eli' },
      { text: 'You keep it. It found you for a reason', avatar: 'destiny' },
      { text: 'You write one back and leave it somewhere new', avatar: 'casper' },
      { text: 'You wonder how many other people needed to find it today', avatar: 'olivia' },
    ],
  },
  {
    prompt:
      'A signal has been broadcasting from somewhere in the city for years. Most people tune it out. You never have. What keeps drawing you back?',
    options: [
      { text: 'It changes slightly every time. Something is trying to be understood', avatar: 'eli' },
      { text: 'It feels like company somehow', avatar: 'destiny' },
      { text: "You want to be the one who finally figures out where it's coming from", avatar: 'casper' },
      { text: 'Because something that consistent deserves to be acknowledged', avatar: 'olivia' },
    ],
  },
  {
    prompt:
      "You stumble onto a rooftop garden nobody seems to know about. In the middle of the city. Fully alive. Your first instinct?",
    options: [
      { text: 'Explore every corner of it immediately', avatar: 'casper' },
      { text: 'Stay very still and just take it in', avatar: 'destiny' },
      { text: 'Try to work out how it got here and who planted it first', avatar: 'eli' },
      { text: 'Come back tomorrow with something to contribute to it', avatar: 'olivia' },
    ],
  },
];

export default function QuizScreen() {
  const router = useRouter();
  const { setQuizScores } = useProfileStore();
  const [currentQ, setCurrentQ] = useState(0);
  const [scores, setScores] = useState<Record<AvatarId, number>>({
    casper: 0, destiny: 0, eli: 0, olivia: 0,
  });
  // Tiebreaker: last answer for Q4 (index 3)
  const [lastAnswer, setLastAnswer] = useState<AvatarId | null>(null);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);

  async function handleSelect(avatar: AvatarId, index: number) {
    if (selectedOption !== null) return;
    setSelectedOption(index);
  // Track per-question answers so back can undo scores
  const [answers, setAnswers] = useState<AvatarId[]>([]);

  function handleBack() {
    if (currentQ === 0) {
      router.back();
      return;
    }
    // Undo the previous answer's score
    const prev = answers[currentQ - 1];
    setScores((s) => ({ ...s, [prev]: Math.max(0, s[prev] - 1) }));
    setAnswers((a) => a.slice(0, -1));
    setCurrentQ((q) => q - 1);
  }
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  // Reset scores on mount so back-navigation from recommendation can't corrupt results
  useEffect(() => {
    setQuizScores({});
  }, []);

  function handleSelect(avatar: AvatarId, index: number) {
    if (selectedIndex !== null) return; // prevent double-tap during confirmation delay

    setSelectedIndex(index);

    setTimeout(() => {
      const newScores = { ...scores, [avatar]: scores[avatar] + 1 };
      setScores(newScores);
      setSelectedIndex(null);

      if (currentQ === QUESTIONS.length - 1) {
        const finalScores: Record<string, number> = {
          ...newScores,
          _tiebreaker: avatar === 'casper' ? 0 : avatar === 'destiny' ? 1 : avatar === 'eli' ? 2 : 3,
        };
        setQuizScores(finalScores);
        router.push('/(onboarding)/recommendation');
      } else {
        setCurrentQ((q) => q + 1);
      }
    }, 320);
  const opacity = useSharedValue(1);
  const isTransitioning = useRef(false);

  function advanceTo(newQ: number) {
    opacity.value = withSequence(
      withTiming(0, { duration: 180 }),
      withTiming(0, { duration: 20 }, () => {
        runOnJS(setCurrentQ)(newQ);
        opacity.value = withTiming(1, { duration: 280 });
        runOnJS(() => { isTransitioning.current = false; })();
      }),
    );
  }

  function handleSelect(avatar: AvatarId, answerText: string) {
    trackQuizAnswer(currentQ, answerText, avatar);
  function handleSelect(avatar: AvatarId) {
    if (isTransitioning.current) return;
    isTransitioning.current = true;

    const newScores = { ...scores, [avatar]: scores[avatar] + 1 };
    setScores(newScores);
    setAnswers((a) => [...a, avatar]);

    await new Promise(r => setTimeout(r, 180));
    setSelectedOption(null);

    if (currentQ === QUESTIONS.length - 1) {
      // Q4 tiebreaker
      const finalScores: Record<string, number> = { ...newScores, _tiebreaker: avatar === 'casper' ? 0 : avatar === 'destiny' ? 1 : avatar === 'eli' ? 2 : 3 };
      setQuizScores(newScores, avatar);
      // Q4 tiebreaker: encode last answer as index for deterministic resolution
      const finalScores: Record<string, number> = {
        ...newScores,
        _tiebreaker: avatar === 'casper' ? 0 : avatar === 'destiny' ? 1 : avatar === 'eli' ? 2 : 3,
      };
      setQuizScores(finalScores);
      router.push(ROUTE.ONBOARDING_RECOMMEND);
      router.push('/(onboarding)/recommendation');
      opacity.value = withTiming(0, { duration: 200 }, () => {
        runOnJS(setQuizScores)(finalScores);
        runOnJS(router.push)('/(onboarding)/recommendation');
      });
    } else {
      advanceTo(currentQ + 1);
    }
  }

  const animatedStyle = useAnimatedStyle(() => ({ opacity: opacity.value }));
  const question = QUESTIONS[currentQ];

  return (
    <OnboardingScreen>
      <View style={styles.content}>
        <Pressable style={styles.backLink} onPress={handleBack}>
          <Text style={styles.backText}>‹ back</Text>
        </Pressable>
        {/* Step indicator */}
        <View style={styles.stepRow}>
          {QUESTIONS.map((_, i) => (
            <View
              key={i}
              style={[
                styles.stepDot,
                i < currentQ && styles.stepDotDone,
                i === currentQ && styles.stepDotActive,
              ]}
            />
          ))}
        </View>

        {currentQ === 0 && (
          <View style={styles.intro}>
            <Text style={styles.introHeadline}>The world has patterns too.</Text>
            <Text style={styles.introSub}>Four questions. No wrong answers. Just how you move.</Text>
          </View>
        )}

        <Text style={styles.prompt}>{question.prompt}</Text>

        <View style={styles.options}>
          {question.options.map((opt, i) => (
            <Pressable
              key={i}
              style={({ pressed }) => [styles.option, (pressed || selectedOption === i) && styles.optionPressed]}
              onPress={() => handleSelect(opt.avatar, i)}
              disabled={selectedOption !== null}
              style={({ pressed }) => [styles.option, pressed && styles.optionPressed]}
              onPress={() => handleSelect(opt.avatar, opt.text)}
              style={[
                styles.option,
                selectedIndex === i && styles.optionSelected,
              ]}
              onPress={() => handleSelect(opt.avatar, i)}
            >
              <Text style={styles.optionText}>{opt.text}</Text>
            </Pressable>
        <View style={styles.progressRow}>
          {QUESTIONS.map((_, i) => (
            <View
              key={i}
              style={[styles.progressDot, i === currentQ && styles.progressDotActive]}
            />
          ))}
        </View>

        <Animated.View style={[styles.questionWrap, animatedStyle]}>
          {currentQ === 0 && (
            <View style={styles.intro}>
              <Text style={styles.introHeadline}>The world has patterns too.</Text>
              <Text style={styles.introSub}>Four questions. No wrong answers. Just how you move.</Text>
            </View>
          )}

          <Text style={styles.prompt}>{question.prompt}</Text>

          <View style={styles.options}>
            {question.options.map((opt, i) => (
              <Pressable
                key={i}
                style={({ pressed }) => [styles.option, pressed && styles.optionPressed]}
                onPress={() => handleSelect(opt.avatar)}
              >
                <Text style={styles.optionText}>{opt.text}</Text>
              </Pressable>
            ))}
          </View>
        </Animated.View>
      </View>
    </OnboardingScreen>
  );
}

const styles = StyleSheet.create({
  content: {
    flex: 1,
    paddingTop: 4,
  },
  backLink: {
    alignSelf: 'flex-start',
    marginBottom: 20,
  },
  backText: {
    fontFamily: fonts.terminal,
    fontSize: 13,
    color: colors.text.tertiary,
    letterSpacing: 0.5,
  },
  stepRow: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 32,
  },
  stepDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: colors.ash,
  },
  stepDotDone: {
    backgroundColor: colors.mist,
  },
  stepDotActive: {
    backgroundColor: colors.bone,
    width: 18,
    borderRadius: 3,
  progressRow: {
    flexDirection: 'row',
    gap: 6,
    marginBottom: 32,
  },
  progressDot: {
    width: 20,
    height: 2,
    backgroundColor: colors.ash,
    borderRadius: 1,
  },
  progressDotActive: {
    backgroundColor: colors.mist,
  },
  questionWrap: {
    flex: 1,
  },
  intro: {
    marginBottom: 40,
  },
  introHeadline: {
    fontFamily: fonts.display,
    fontSize: typeScale.displayS.fontSize,
    color: colors.bone,
    letterSpacing: 1,
    marginBottom: 12,
  },
  introSub: {
    fontFamily: fonts.body,
    fontSize: typeScale.bodyS.fontSize,
    color: colors.text.secondary,
    lineHeight: typeScale.bodyS.lineHeight,
  },
  prompt: {
    fontFamily: fonts.body,
    fontSize: typeScale.bodyL.fontSize,
    color: colors.bone,
    lineHeight: typeScale.bodyL.lineHeight,
    marginBottom: 36,
  },
  options: {
    gap: 12,
  },
  option: {
    borderWidth: 1,
    borderColor: colors.ash,
    paddingVertical: 16,
    paddingHorizontal: 20,
  },
  optionSelected: {
    borderColor: colors.mist,
    // 8% white overlay for press feedback — no dedicated token
    backgroundColor: 'rgba(255, 255, 255, 0.03)',
    backgroundColor: '#ffffff10',
  },
  optionText: {
    fontFamily: fonts.body,
    fontSize: typeScale.bodyS.fontSize,
    color: colors.text.primary,
    lineHeight: typeScale.bodyS.lineHeight,
  },
});
