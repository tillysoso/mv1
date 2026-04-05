export const colors = {
  // Brand constant
  majestic: '#9500FF',

  // World base
  bg: {
    primary: '#1A1A2E',
    secondary: '#16213E',
    tertiary: '#0F3460',
    canal: '#3D6B7A',
    signal: '#4A5585',
    dusk: '#6B4F8C',
  },

  // Text
  text: {
    primary: '#F0EDE8',
    secondary: '#A8A8B8',
    tertiary: '#6B6B7B',
  },

  // Neutrals
  obsidian: '#0D0D14',
  charcoal: '#1E1E2E',
  ash: '#3A3A4A',
  mist: '#7A7A8A',
  bone: '#F0EDE8',
  brass: '#8B7355',
  moon: '#C8D0D8',
} as const;

export const avatarAccents = {
  casper: {
    primary: '#C94B2C',
    secondary: '#E8603A',
    tertiary: '#D4A843',
    particleStart: '#C94B2C',
    particleEnd: '#D4A843',
  },
  destiny: {
    primary: '#2A7B8C',
    secondary: '#4DBFCC',
    tertiary: '#5B6FA8',
    particleStart: '#4DBFCC',
    particleEnd: '#5B6FA8',
  },
  eli: {
    primary: '#A8B4C8',
    secondary: '#6ECFCF',
    tertiary: '#9B8FBF',
    particleStart: '#A8B4C8',
    particleEnd: '#6ECFCF',
  },
  olivia: {
    primary: '#5C6B3A',
    secondary: '#A85C3A',
    tertiary: '#C49A4A',
    particleStart: '#5C6B3A',
    particleEnd: '#C49A4A',
  },
} as const;

export type AvatarId = keyof typeof avatarAccents;
