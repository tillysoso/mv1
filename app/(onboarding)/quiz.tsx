import { useState } from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import OnboardingScreen from '../../src/components/onboarding/OnboardingScreen';
import { useProfileStore } from '../../src/stores/profileStore';
import { colors } from '../../src/theme/tokens';
import { fonts, typeScale } from '../../src/theme/typography';
import type { AvatarId } from '../../src/types/avatar';

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

  function handleSelect(avatar: AvatarId) {
    const newScores = { ...scores, [avatar]: scores[avatar] + 1 };
    setScores(newScores);

    if (currentQ === QUESTIONS.length - 1) {
      // Q4 tiebreaker
      setLastAnswer(avatar);
      const finalScores: Record<string, number> = { ...newScores, _tiebreaker: avatar === 'casper' ? 0 : avatar === 'destiny' ? 1 : avatar === 'eli' ? 2 : 3 };
      setQuizScores(finalScores);
      router.push('/(onboarding)/recommendation');
    } else {
      setCurrentQ((q) => q + 1);
    }
  }

  const question = QUESTIONS[currentQ];

  return (
    <OnboardingScreen>
      <View style={styles.content}>
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
      </View>
    </OnboardingScreen>
  );
}

const styles = StyleSheet.create({
  content: {
    flex: 1,
    paddingTop: 20,
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
  optionPressed: {
    borderColor: colors.mist,
    backgroundColor: '#ffffff08',
  },
  optionText: {
    fontFamily: fonts.body,
    fontSize: typeScale.bodyS.fontSize,
    color: colors.text.primary,
    lineHeight: typeScale.bodyS.lineHeight,
  },
});
