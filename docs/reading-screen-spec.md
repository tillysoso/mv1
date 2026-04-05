# Reading Screen — Component Spec
## Spread types
single:     1 card — position label "What needs attention"
three_card: 3 cards — positions "Past", "Present", "Future"
## Screen flow
1. User arrives at reading tab
2. Spread selection UI — single or three card
3. Shuffle state — aura enters gathering, face-down cards appear
4. Card selection — tap each face-down card to hold then reveal
5. Interpretation — avatar voice below each revealed card
6. Reflection prompt — journal entry option after all cards revealed
## Avatar interpretation placeholder structure
Each revealed card shows:
- Card name + number (Cinzel)
- Avatar interpretation line (Montserrat Medium, avatar voice)
  Placeholder: "[Avatar] sees [card name] here."
- Reflection prompt below all cards:
  "What does this bring up for you?"
## Aura behaviour during reading
Shuffle:           gathering state, intensity building
Each card hold:    peak gather on that card's position
Each card reveal:  release then card context state
All revealed:      settled, card context of most significant card
Profile card hit:  recognition state on that card
