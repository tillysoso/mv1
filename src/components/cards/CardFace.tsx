import { Pressable } from 'react-native';
import CardPlaceholder from './CardPlaceholder';
import type { TarotCard } from '../../types/tarot';
import type { AvatarId } from '../../types/avatar';

// TODO: When card images land, conditionally render <Image> instead of
// <CardPlaceholder>. imagePath will be added to TarotCard type at that point.
// Convention: assets/cards/[suit]/[card-id].png

interface CardFaceProps {
  card: TarotCard;
  avatarId: AvatarId;
  size: 'full' | 'daily' | 'thumb';
  onPress?: () => void;
}

export default function CardFace({ card, avatarId, size, onPress }: CardFaceProps) {
  const inner = <CardPlaceholder card={card} avatarId={avatarId} size={size} />;

  if (!onPress) return inner;
  return (
    <Pressable onPress={onPress} style={{ alignSelf: 'center' }}>
      {inner}
    </Pressable>
  );
}
