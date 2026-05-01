# Card Data — Placeholder Structure
Until card images are generated and the full card content
database is populated, all card components use this
placeholder data structure.
## Placeholder card object
{
  id: 'major-00',
  name: 'The Fool',
  number: 0,
  suit: 'major',
  auraContext: 'breakthrough',
  imagePath: null   ← null triggers placeholder UI
}
## Aura context mapping (partial — expand as cards are confirmed)
breakthrough: The Fool, The Star, The Sun, The World,
              Judgement, The Chariot, all Aces
shadow:       The Tower, The Devil, The Moon, The Hanged Man,
              Death, Three of Swords, Ten of Swords, Five of Cups
recognition:  Triggered by profileStore — any card matching
              personalityCard.number or soulCard.number
neutral:      Everything else
## Image path convention (for when assets land)
major-arcana:  assets/cards/major-arcana/[card-id].png
wands:         assets/cards/wands/[card-id].png
cups:          assets/cards/cups/[card-id].png
swords:        assets/cards/swords/[card-id].png
pentacles:     assets/cards/pentacles/[card-id].png
