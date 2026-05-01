import { useState, useEffect } from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import OnboardingScreen from '../../src/components/onboarding/OnboardingScreen';
import { useProfileStore } from '../../src/stores/profileStore';
import { colors } from '../../src/theme/tokens';
import { fonts, typeScale } from '../../src/theme/typography';
import type { AvatarId } from '../../src/types/avatar';

// TODO: fontFamily strings require expo-font preloading.

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
  }

  const question = QUESTIONS[currentQ];

  return (
    <OnboardingScreen>
      <View style={styles.content}>
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
              style={[
                styles.option,
                selectedIndex === i && styles.optionSelected,
              ]}
              onPress={() => handleSelect(opt.avatar, i)}
            >
              <Text style={styles.optionText}>{opt.text}</Text>
            </Pressable>
          ))}
        </View>
      </View>
    </OnboardingScreen>
  );
}

const styles = StyleSheet.create({
  content: {
    flex: 1,
    paddingTop: 20,
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
  },
  intro: {
    marginBottom: 40,
  },
  introHeadline: {
    // TODO: fontFamily: fonts.display (Cinzel)
    fontSize: typeScale.displayS.fontSize,
    color: colors.bone,
    letterSpacing: 1,
    marginBottom: 12,
  },
  introSub: {
    // TODO: fontFamily: fonts.body (Montserrat)
    fontSize: typeScale.bodyS.fontSize,
    color: colors.text.secondary,
    lineHeight: typeScale.bodyS.lineHeight,
  },
  prompt: {
    // TODO: fontFamily: fonts.body (Montserrat)
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
    backgroundColor: '#ffffff10',
  },
  optionText: {
    // TODO: fontFamily: fonts.body (Montserrat)
    fontSize: typeScale.bodyS.fontSize,
    color: colors.text.primary,
    lineHeight: typeScale.bodyS.lineHeight,
  },
});
