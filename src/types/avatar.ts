export type AvatarId = 'casper' | 'olivia' | 'eli' | 'destiny';

export type AvatarState = 'neutral' | 'active' | 'reflective';

export type PortalShape = 'arch' | 'livingCircle';

export type AvatarPresenceLevel = 'hero' | 'presence' | 'signal' | 'mark' | 'none';

export interface AvatarAccent {
  primary: string;
  secondary: string;
  tertiary: string;
  particleStart: string;
  particleEnd: string;
}
