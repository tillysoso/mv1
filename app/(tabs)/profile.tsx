import { View, Text, ScrollView, TouchableOpacity, Image, StyleSheet, SafeAreaView } from 'react-native';
import { useAvatarStore } from '../../src/stores/avatarStore';
import { useProfileStore } from '../../src/stores/profileStore';
import AvatarPortrait from '../../src/components/avatar/AvatarPortrait';
import CardPlaceholder from '../../src/components/cards/CardPlaceholder';
import { MAJOR_ARCANA_CARDS } from '../../src/features/daily-draw/cardData';
import { colors, avatarAccents } from '../../src/theme/tokens';
import { typeScale } from '../../src/theme/typography';
import type { AvatarId } from '../../src/types/avatar';

const AVATAR_IDS: AvatarId[] = ['casper', 'eli', 'olivia', 'destiny'];

const AVATAR_NAMES: Record<AvatarId, string> = {
  casper: 'Casper',
  eli: 'Eli',
  olivia: 'Olivia',
  destiny: 'Destiny',
};

const AVATAR_IMAGES: Record<AvatarId, any> = {
  casper: require('../../assets/avatars/casper/casper-neutral.png'),
  eli: require('../../assets/avatars/eli/eli-neutral.png'),
  olivia: require('../../assets/avatars/olivia/olivia-active.png'),
  destiny: require('../../assets/avatars/destiny/destiny-active.png'),
};

export default function ProfileScreen() {
  const { activeAvatar, setAvatar } = useAvatarStore();
  const { birthCards } = useProfileStore();

  const personalityCard = birthCards
    ? MAJOR_ARCANA_CARDS.find(c => c.number === birthCards.personalityCard.number) ?? null
    : null;
  const soulCard = birthCards && !birthCards.sameCard
    ? MAJOR_ARCANA_CARDS.find(c => c.number === birthCards.soulCard.number) ?? null
    : null;

  return (
    <View style={styles.root}>
      <SafeAreaView style={styles.safe}>
        <ScrollView
          contentContainerStyle={styles.scroll}
          showsVerticalScrollIndicator={false}
        >
          <Text style={styles.screenLabel}>Majestic Profile</Text>

          {/* Active avatar at hero level */}
          <View style={styles.portraitSection}>
            <AvatarPortrait
              avatarId={activeAvatar}
              presenceLevel="hero"
              auraContext="neutral"
              imageState="neutral"
            />
            <Text style={styles.avatarName}>{AVATAR_NAMES[activeAvatar]}</Text>
          </View>

          {/* Companion selector */}
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionLabel}>Your companion</Text>
          </View>
          <View style={styles.avatarGrid}>
            {AVATAR_IDS.map(id => {
              const accent = avatarAccents[id];
              const isActive = id === activeAvatar;
              return (
                <TouchableOpacity
                  key={id}
                  style={[styles.avatarChip, { borderColor: isActive ? accent.primary : colors.ash }]}
                  onPress={() => setAvatar(id)}
                  activeOpacity={0.75}
                >
                  <Image
                    source={AVATAR_IMAGES[id]}
                    style={[styles.avatarChipImage, { borderColor: isActive ? accent.primary : colors.ash }]}
                    resizeMode="cover"
                  />
                  <Text style={[styles.avatarChipName, { color: isActive ? accent.primary : colors.text.secondary }]}>
                    {AVATAR_NAMES[id]}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>

          {/* Birth cards */}
          {birthCards ? (
            <>
              <View style={styles.sectionHeader}>
                <Text style={styles.sectionLabel}>Profile cards</Text>
              </View>
              <View style={styles.birthCardRow}>
                {personalityCard && (
                  <View style={styles.birthCardSlot}>
                    <Text style={styles.birthCardRoleLabel}>
                      {birthCards.sameCard ? 'Personality & Soul' : 'Personality'}
                    </Text>
                    <CardPlaceholder card={personalityCard} avatarId={activeAvatar} size="thumb" />
                    <Text style={styles.birthCardName}>{birthCards.personalityCard.name}</Text>
                  </View>
                )}
                {soulCard && (
                  <View style={styles.birthCardSlot}>
                    <Text style={styles.birthCardRoleLabel}>Soul</Text>
                    <CardPlaceholder card={soulCard} avatarId={activeAvatar} size="thumb" />
                    <Text style={styles.birthCardName}>{birthCards.soulCard.name}</Text>
                  </View>
                )}
              </View>
            </>
          ) : (
            <View style={styles.noBirthCards}>
              <Text style={styles.noBirthCardsText}>
                Complete onboarding to reveal your Majestic Profile cards.
              </Text>
            </View>
          )}
        </ScrollView>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: colors.bg.primary,
  },
  safe: {
    flex: 1,
  },
  scroll: {
    flexGrow: 1,
    alignItems: 'center',
    paddingTop: 24,
    paddingBottom: 48,
    paddingHorizontal: 24,
  },
  screenLabel: {
    fontSize: 10,
    letterSpacing: 4,
    color: colors.text.tertiary,
    textTransform: 'uppercase',
    marginBottom: 32,
  },
  portraitSection: {
    alignItems: 'center',
    marginBottom: 32,
  },
  avatarName: {
    fontSize: typeScale.displayS.fontSize,
    letterSpacing: typeScale.displayS.letterSpacing,
    color: colors.bone,
    marginTop: 12,
  },
  sectionHeader: {
    width: '100%',
    paddingBottom: 8,
    borderBottomWidth: 1,
    borderBottomColor: colors.ash,
    marginBottom: 20,
  },
  sectionLabel: {
    fontSize: 10,
    letterSpacing: 3,
    color: colors.text.tertiary,
    textTransform: 'uppercase',
  },
  avatarGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    marginBottom: 32,
  },
  avatarChip: {
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 4,
    padding: 12,
    width: 84,
    margin: 6,
  },
  avatarChipImage: {
    width: 48,
    height: 48,
    borderRadius: 24,
    borderWidth: 2,
    marginBottom: 8,
  },
  avatarChipName: {
    fontSize: 10,
    letterSpacing: 1.5,
    textTransform: 'uppercase',
  },
  birthCardRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 32,
  },
  birthCardSlot: {
    alignItems: 'center',
    marginHorizontal: 12,
  },
  birthCardRoleLabel: {
    fontSize: 9,
    letterSpacing: 2,
    color: colors.text.tertiary,
    textTransform: 'uppercase',
    marginBottom: 8,
  },
  birthCardName: {
    fontSize: 11,
    letterSpacing: 1,
    color: colors.text.secondary,
    textAlign: 'center',
    maxWidth: 80,
    marginTop: 8,
  },
  noBirthCards: {
    padding: 24,
    borderWidth: 1,
    borderColor: colors.ash,
    borderRadius: 2,
    width: '100%',
  },
  noBirthCardsText: {
    fontSize: typeScale.bodyS.fontSize,
    lineHeight: typeScale.bodyS.lineHeight,
    color: colors.text.secondary,
    textAlign: 'center',
  },
});
