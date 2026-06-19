import type { AvatarId } from '../types';

export const AVATAR_NAMES: Record<AvatarId, string> = {
  casper: 'Casper',
  eli: 'Eli',
  olivia: 'Olivia',
  destiny: 'Destiny',
};

export const AVATAR_ELEMENTS: Record<AvatarId, string> = {
  casper: 'Fire',
  destiny: 'Water',
  eli: 'Air',
  olivia: 'Earth',
};

// Locked first-words — spoken once at onboarding confirm, reused verbatim
// as the confirmation beat in the avatar switcher. Consistency is the point.
export const FIRST_WORDS: Record<AvatarId, string> = {
  casper: 'Right. Let\'s go.',
  eli: 'There\'s a lot to explore.',
  olivia: 'Good. We\'ll figure it out together.',
  destiny: 'I\'m glad you\'re here.',
};

export const AVATAR_IMAGES: Record<AvatarId, any> = {
  casper: require('../../assets/avatars/casper/casper-neutral.png'),
  eli: require('../../assets/avatars/eli/eli-neutral.png'),
  olivia: require('../../assets/avatars/olivia/olivia-neutral.png'),
  destiny: require('../../assets/avatars/destiny/destiny-active.png'),
};
