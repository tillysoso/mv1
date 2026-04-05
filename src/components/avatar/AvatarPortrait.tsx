import { View, Image, StyleSheet } from 'react-native';
import AvatarAura from './AvatarAura';
import { colors } from '../../theme/tokens';
import type { AvatarId, AvatarPresenceLevel, PortalShape } from '../../types/avatar';
import type { AuraContext } from '../../types/tarot';

// Avatar portrait images — neutral state preferred, fall back to active
const IMAGES: Record<AvatarId, Record<string, any>> = {
  casper: {
    neutral:    require('../../../assets/avatars/casper/casper-neutral.png'),
    active:     require('../../../assets/avatars/casper/casper-active.png'),
    reflective: require('../../../assets/avatars/casper/casper-reflective.png'),
  },
  eli: {
    neutral:    require('../../../assets/avatars/eli/eli-neutral.png'),
    active:     require('../../../assets/avatars/eli/eli-active.png'),
    reflective: require('../../../assets/avatars/eli/eli-reflective.png'),
  },
  olivia: {
    // No neutral yet — fall back to active
    neutral:    require('../../../assets/avatars/olivia/olivia-active.png'),
    active:     require('../../../assets/avatars/olivia/olivia-active.png'),
    reflective: require('../../../assets/avatars/olivia/olivia-reflective.png'),
  },
  destiny: {
    // No neutral yet — fall back to active
    neutral:    require('../../../assets/avatars/destiny/destiny-active.png'),
    active:     require('../../../assets/avatars/destiny/destiny-active.png'),
    reflective: require('../../../assets/avatars/destiny/destiny-reflective.png'),
  },
};

// Portal shape by presence level per aura spec
const PORTAL_SHAPE: Record<AvatarPresenceLevel, PortalShape> = {
  hero:     'arch',
  presence: 'livingCircle',
  signal:   'livingCircle',
  mark:     'livingCircle',
  none:     'livingCircle',
};

// Aura canvas size by presence level
const AURA_SIZE: Record<AvatarPresenceLevel, number> = {
  hero:     280,
  presence: 200,
  signal:   160,
  mark:     80,
  none:     0,
};

// Portrait image size inside the aura
const PORTRAIT_SIZE: Record<AvatarPresenceLevel, number> = {
  hero:     220,
  presence: 140,
  signal:   0,   // arc only
  mark:     0,   // emblem only — TODO replace with Lottie emblem
  none:     0,
};

interface AvatarPortraitProps {
  avatarId: AvatarId;
  presenceLevel: AvatarPresenceLevel;
  auraContext?: AuraContext | 'gathering';
  imageState?: 'neutral' | 'active' | 'reflective';
}

export default function AvatarPortrait({
  avatarId,
  presenceLevel,
  auraContext = 'neutral',
  imageState = 'neutral',
}: AvatarPortraitProps) {
  const auraSize = AURA_SIZE[presenceLevel];
  const portraitSize = PORTRAIT_SIZE[presenceLevel];
  const shape = PORTAL_SHAPE[presenceLevel];
  const showPortrait = portraitSize > 0;

  if (presenceLevel === 'none') return null;

  return (
    <View style={[styles.root, { width: auraSize, height: auraSize }]}>
      {/* Aura arc behind portrait */}
      <View style={StyleSheet.absoluteFill}>
        <AvatarAura
          avatarId={avatarId}
          shape={shape}
          auraContext={auraContext}
          size={auraSize}
        />
      </View>

      {/* Portrait image centred within aura */}
      {showPortrait && (
        <View style={styles.portraitContainer}>
          <Image
            source={IMAGES[avatarId][imageState]}
            style={{ width: portraitSize, height: portraitSize, borderRadius: portraitSize / 2 }}
            resizeMode="cover"
          />
        </View>
      )}

      {/* mark: emblem placeholder — TODO: replace with Lottie emblem when assets land */}
      {presenceLevel === 'mark' && (
        <View style={[styles.emblemPlaceholder, { backgroundColor: colors.charcoal }]} />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  portraitContainer: {
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
  },
  emblemPlaceholder: {
    width: 40,
    height: 40,
    borderRadius: 20,
    position: 'absolute',
  },
});
