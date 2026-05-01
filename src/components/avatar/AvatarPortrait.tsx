import { View, Image, StyleSheet } from 'react-native';
import AvatarAura from './AvatarAura';
import { colors } from '../../theme/tokens';
import type { AvatarId, AvatarPresenceLevel, PortalShape, AuraContext } from '../../types';
import { PORTAL_SHAPE, PRESENCE_LEVEL, AURA_CONTEXT, AVATAR_STATE } from '../../constants';

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
const PORTAL_SHAPE_MAP: Record<AvatarPresenceLevel, PortalShape> = {
  [PRESENCE_LEVEL.HERO]:     PORTAL_SHAPE.ARCH,
  [PRESENCE_LEVEL.PRESENCE]: PORTAL_SHAPE.LIVING_CIRCLE,
  [PRESENCE_LEVEL.SIGNAL]:   PORTAL_SHAPE.LIVING_CIRCLE,
  [PRESENCE_LEVEL.MARK]:     PORTAL_SHAPE.LIVING_CIRCLE,
  [PRESENCE_LEVEL.NONE]:     PORTAL_SHAPE.LIVING_CIRCLE,
};

// Aura canvas size by presence level
const AURA_SIZE: Record<AvatarPresenceLevel, number> = {
  [PRESENCE_LEVEL.HERO]:     280,
  [PRESENCE_LEVEL.PRESENCE]: 200,
  [PRESENCE_LEVEL.SIGNAL]:   160,
  [PRESENCE_LEVEL.MARK]:     80,
  [PRESENCE_LEVEL.NONE]:     0,
};

// Portrait image size inside the aura
const PORTRAIT_SIZE: Record<AvatarPresenceLevel, number> = {
  [PRESENCE_LEVEL.HERO]:     220,
  [PRESENCE_LEVEL.PRESENCE]: 140,
  [PRESENCE_LEVEL.SIGNAL]:   0,   // arc only
  [PRESENCE_LEVEL.MARK]:     0,   // emblem only — TODO replace with Lottie emblem
  [PRESENCE_LEVEL.NONE]:     0,
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
  auraContext = AURA_CONTEXT.NEUTRAL,
  imageState = AVATAR_STATE.NEUTRAL,
}: AvatarPortraitProps) {
  const auraSize = AURA_SIZE[presenceLevel];
  const portraitSize = PORTRAIT_SIZE[presenceLevel];
  const shape = PORTAL_SHAPE_MAP[presenceLevel];
  const showPortrait = portraitSize > 0;

  if (presenceLevel === PRESENCE_LEVEL.NONE) return null;

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
      {presenceLevel === PRESENCE_LEVEL.MARK && (
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
