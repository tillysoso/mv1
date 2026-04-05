// ─── Minor Arcana — Midjourney Prompt Libraries ───────────────────────────────
//
// 56 locked prompts — 4 suits × 14 cards.
// Use for Midjourney generation (task #86–89).
// After generation: apply card frame via Figma template (task #77).
// File naming: [suit]-[number]-[name].png e.g. wands-01-ace.png

export type Suit = "wands" | "cups" | "swords" | "pentacles";
export type CardRank =
  | "ace" | "two" | "three" | "four" | "five" | "six" | "seven"
  | "eight" | "nine" | "ten" | "page" | "knight" | "queen" | "king";

export interface MinorArcanaPrompt {
  suit: Suit;
  rank: CardRank;
  number: number; // 1–14
  name: string;   // e.g. "Ace of Wands"
  avatar: "Casper" | "Destiny" | "Eli" | "Olivia";
  element: "Fire" | "Water" | "Air" | "Earth";
  prompt: string;
}

// ─── Style suffix (append to every prompt) ───────────────────────────────────
export const PROMPT_SUFFIX =
  "future-mythic tarot card illustration, painterly digital art, cinematic lighting, rich jewel tones, luminous glow effects, detailed atmospheric, no text or borders --ar 2:3 --v 6.1";

// ─── Wands — Fire / Casper / Threshold City ──────────────────────────────────
const WANDS: MinorArcanaPrompt[] = [
  {
    suit: "wands", rank: "ace", number: 1, name: "Ace of Wands",
    avatar: "Casper", element: "Fire",
    prompt: `A disembodied hand emerges from a swirling cloud of embers and crimson sparks, holding a single tall wand crackling with fire at its tip, Threshold City skyline glowing orange-amber in the deep background, upward vertical composition, raw creative potential, ${PROMPT_SUFFIX}`,
  },
  {
    suit: "wands", rank: "two", number: 2, name: "Two of Wands",
    avatar: "Casper", element: "Fire",
    prompt: `A young Black man in a dark structured coat stands on a Threshold City rooftop at dusk, one hand on a lit wand, the other holding a small glowing orb showing a map of city lights below him, a second wand planted beside him, looking toward the horizon with quiet ambition, amber and deep violet skyline behind, ${PROMPT_SUFFIX}`,
  },
  {
    suit: "wands", rank: "three", number: 3, name: "Three of Wands",
    avatar: "Casper", element: "Fire",
    prompt: `A solitary figure stands at the edge of a high Threshold City platform, three ember-bright wands planted around them forming a loose arc, glowing vehicles and distant portal-ships launching into the neon horizon below, warm orange from the wands, cool deep blue from the city, expansion and anticipation, ${PROMPT_SUFFIX}`,
  },
  {
    suit: "wands", rank: "four", number: 4, name: "Four of Wands",
    avatar: "Casper", element: "Fire",
    prompt: `Four glowing wands form a luminous archway in a Threshold City public plaza, figures celebrating beneath in warm amber and gold light, fire-ribbon garlands woven between the wands, small crowd in motion, joyful homecoming and community, ${PROMPT_SUFFIX}`,
  },
  {
    suit: "wands", rank: "five", number: 5, name: "Five of Wands",
    avatar: "Casper", element: "Fire",
    prompt: `Five figures in sharp urban streetwear clash in an open Threshold City space, each holding a wand crackling with competing fire energy, sparks flying in all directions, dynamic diagonal composition, scattered purpose and creative competition, ember orange and hot white light, ${PROMPT_SUFFIX}`,
  },
  {
    suit: "wands", rank: "six", number: 6, name: "Six of Wands",
    avatar: "Casper", element: "Fire",
    prompt: `A triumphant figure is carried forward on a raised platform through a crowd in Threshold City, six ember-bright wands raised around them like a procession, golden fire light catching their face, the crowd's hands reaching upward, recognition and earned victory, ${PROMPT_SUFFIX}`,
  },
  {
    suit: "wands", rank: "seven", number: 7, name: "Seven of Wands",
    avatar: "Casper", element: "Fire",
    prompt: `A determined figure stands alone on a Threshold City rooftop edge, holding one lit wand defensively against six more wands rising toward them from below, feet planted wide, posture defiant and resolute, smoke and ember light from below, holding ground, ${PROMPT_SUFFIX}`,
  },
  {
    suit: "wands", rank: "eight", number: 8, name: "Eight of Wands",
    avatar: "Casper", element: "Fire",
    prompt: `Eight wands streak horizontally across the frame like blazing firebolts through the night sky above Threshold City, each leaving a bright ember trail, pure kinetic momentum, near-blur of speed and direction, warm orange against deep purple-black, swift and unstoppable movement, ${PROMPT_SUFFIX}`,
  },
  {
    suit: "wands", rank: "nine", number: 9, name: "Nine of Wands",
    avatar: "Casper", element: "Fire",
    prompt: `A battle-worn figure leans against the last of nine wands planted in a row behind them, bandaged hand on the staff, expression exhausted but eyes fiercely alert, scorch marks and ember dust across the Threshold City ground at their feet, pre-dawn amber glow, last stand resilience, ${PROMPT_SUFFIX}`,
  },
  {
    suit: "wands", rank: "ten", number: 10, name: "Ten of Wands",
    avatar: "Casper", element: "Fire",
    prompt: `A figure walks with their back to us through a dark Threshold City alley, bent under the weight of ten wands bound together in a heavy bundle, a faint glow of street light visible at the end of the alley ahead, burden and overextension but still moving, ${PROMPT_SUFFIX}`,
  },
  {
    suit: "wands", rank: "page", number: 11, name: "Page of Wands",
    avatar: "Casper", element: "Fire",
    prompt: `A young person in layered dark streetwear holds a single tall wand, examining the crackling ember tip with wide-eyed curiosity and delight, Threshold City rooftop at twilight behind them, warm fire light on their face, beginning of adventure and discovery, ${PROMPT_SUFFIX}`,
  },
  {
    suit: "wands", rank: "knight", number: 12, name: "Knight of Wands",
    avatar: "Casper", element: "Fire",
    prompt: `A figure in dark urban armour charges directly toward the viewer through Threshold City streets on a fast vehicle, wand raised like a lance, fire trailing behind in streaks of orange and red, motion blur in the background, full commitment and reckless forward energy, ${PROMPT_SUFFIX}`,
  },
  {
    suit: "wands", rank: "queen", number: 13, name: "Queen of Wands",
    avatar: "Casper", element: "Fire",
    prompt: `A magnetic woman sits with authority in a high-rise Threshold City space, tall windows behind her showing the city below, a lit wand upright in one hand, a black cat at her feet, warm amber fire light and cool city blue in tension, sunflower motif woven into her surroundings, confident and self-possessed, ${PROMPT_SUFFIX}`,
  },
  {
    suit: "wands", rank: "king", number: 14, name: "King of Wands",
    avatar: "Casper", element: "Fire",
    prompt: `A commanding older man sits enthroned in a fire-lit Threshold City chamber, a tall wand planted before him like a staff, his direct gaze carrying intelligence and authority, ember light playing across dark textured walls, salamander motif in the architecture, visionary leadership, ${PROMPT_SUFFIX}`,
  },
];

// ─── Cups — Water / Destiny / Folklore Signal ─────────────────────────────────
const CUPS: MinorArcanaPrompt[] = [
  {
    suit: "cups", rank: "ace", number: 1, name: "Ace of Cups",
    avatar: "Destiny", element: "Water",
    prompt: `A disembodied hand emerges from canal mist, holding a luminous chalice overflowing with cool glowing light and floating water petals, still canal water surface below reflecting the light upward, dove motif in the mist above, pure emotional potential, Folklore Signal atmosphere, ${PROMPT_SUFFIX}`,
  },
  {
    suit: "cups", rank: "two", number: 2, name: "Two of Cups",
    avatar: "Destiny", element: "Water",
    prompt: `Two figures face each other on a narrow Folklore Signal footbridge over a dark canal, each holding a cup that glows with soft teal light, the cups nearly touching between them, caduceus and lion's head symbol floating in the air between them as a glow, soft rain or canal mist, mutual recognition and connection, ${PROMPT_SUFFIX}`,
  },
  {
    suit: "cups", rank: "three", number: 3, name: "Three of Cups",
    avatar: "Destiny", element: "Water",
    prompt: `Three young women celebrate together on a Folklore Signal canal terrace, cups raised in a toast, flowering vines and hanging lights around them, teal and rose light mixing warmly, the canal glowing behind them, laughter and friendship and abundance, ${PROMPT_SUFFIX}`,
  },
  {
    suit: "cups", rank: "four", number: 4, name: "Four of Cups",
    avatar: "Destiny", element: "Water",
    prompt: `A young person sits cross-legged on Folklore Signal canal steps, arms folded, gazing inward and unaware, three cups beside them on the steps, a fourth luminous cup offered by a hand emerging from the water beside them, ennui and missed opportunity, cool teal and grey, ${PROMPT_SUFFIX}`,
  },
  {
    suit: "cups", rank: "five", number: 5, name: "Five of Cups",
    avatar: "Destiny", element: "Water",
    prompt: `A cloaked figure stands on a Folklore Signal bridge, hunched in grief, three cups spilled on the wet cobblestones before them, two cups still upright behind them, dark canal water below, cool rain-light, loss and what remains visible but unseen, ${PROMPT_SUFFIX}`,
  },
  {
    suit: "cups", rank: "six", number: 6, name: "Six of Cups",
    avatar: "Destiny", element: "Water",
    prompt: `An older child offers a cup of glowing water-flowers to a smaller child in a sunlit Folklore Signal courtyard, pastel warmth in an otherwise cool palette, nostalgia and innocence, water feature or fountain between them, the past giving to the present, ${PROMPT_SUFFIX}`,
  },
  {
    suit: "cups", rank: "seven", number: 7, name: "Seven of Cups",
    avatar: "Destiny", element: "Water",
    prompt: `A figure in silhouette stands before seven cups floating in the canal air, each cup containing a different glowing vision — a wreathed figure, a castle, a creature, a jewel, a laurel, a serpent, a shrouded form — dreamlike and overwhelming, cool luminescence, illusion and too many paths, ${PROMPT_SUFFIX}`,
  },
  {
    suit: "cups", rank: "eight", number: 8, name: "Eight of Cups",
    avatar: "Destiny", element: "Water",
    prompt: `A cloaked figure walks away from the viewer along a Folklore Signal canal bank at night, leaving behind eight cups arranged in a careful stack, heading into mist and darkness under a partial moon reflected in the water, leaving what was built for something more, cool and melancholy, ${PROMPT_SUFFIX}`,
  },
  {
    suit: "cups", rank: "nine", number: 9, name: "Nine of Cups",
    avatar: "Destiny", element: "Water",
    prompt: `A self-satisfied figure sits in a richly lit Folklore Signal interior, arms folded contentedly, nine luminous cups arranged in an arc on a shelf behind them like a display of achievement, canal light through tall narrow windows, comfort and wishes fulfilled, ${PROMPT_SUFFIX}`,
  },
  {
    suit: "cups", rank: "ten", number: 10, name: "Ten of Cups",
    avatar: "Destiny", element: "Water",
    prompt: `Two figures stand on a Folklore Signal canal bridge, arms around each other, looking out together, ten glowing cups arranged in a luminous arc above them like a rainbow of light over the canal, distant buildings warm and lit, wholeness and emotional completion, ${PROMPT_SUFFIX}`,
  },
  {
    suit: "cups", rank: "page", number: 11, name: "Page of Cups",
    avatar: "Destiny", element: "Water",
    prompt: `A young person in flowing Folklore Signal streetwear stands at the canal's edge, holding a cup from which a small luminous fish or creature emerges unexpectedly, their expression open with surprise and wonder, still canal water behind, dreamy light, emotional curiosity, ${PROMPT_SUFFIX}`,
  },
  {
    suit: "cups", rank: "knight", number: 12, name: "Knight of Cups",
    avatar: "Destiny", element: "Water",
    prompt: `A lone figure on a slow-moving canal barge or gondola moves purposefully through still teal water, carrying a luminous cup before them with great care, the canal surface perfectly still around them, cool canal light, romantic and idealistic, moving toward something felt rather than known, ${PROMPT_SUFFIX}`,
  },
  {
    suit: "cups", rank: "queen", number: 13, name: "Queen of Cups",
    avatar: "Destiny", element: "Water",
    prompt: `A graceful woman sits at the edge of still Folklore Signal water, an ornate covered chalice resting in her hands, one foot touching the water's surface, her expression deeply interior and empathic, teal light on her face from the water below, emotionally sovereign and intuitive, ${PROMPT_SUFFIX}`,
  },
  {
    suit: "cups", rank: "king", number: 14, name: "King of Cups",
    avatar: "Destiny", element: "Water",
    prompt: `A composed older man sits on a floating throne or dock-throne over deep Folklore Signal canal water, holding a chalice with one hand, his other resting on the armrest, a fish motif in the throne architecture, his calm surface suggesting immense depth beneath, mastery of the emotional world, ${PROMPT_SUFFIX}`,
  },
];

// ─── Swords — Air / Eli / Codex Arc ──────────────────────────────────────────
const SWORDS: MinorArcanaPrompt[] = [
  {
    suit: "swords", rank: "ace", number: 1, name: "Ace of Swords",
    avatar: "Eli", element: "Air",
    prompt: `A disembodied hand emerges from storm clouds dense with silver signal static, holding a single gleaming sword upright, a crown of luminous light at the blade's tip, wreath and palm fronds rendered as signal-light, pre-dawn silver and blue-grey, truth and breakthrough clarity, Codex Arc atmosphere, ${PROMPT_SUFFIX}`,
  },
  {
    suit: "swords", rank: "two", number: 2, name: "Two of Swords",
    avatar: "Eli", element: "Air",
    prompt: `A blindfolded figure sits in perfect stillness in a minimal Codex Arc signal-lit room, two swords crossed over their chest, a crescent moon and still water visible through the window behind them, poised between two choices, internal conflict and deliberate not-knowing, ${PROMPT_SUFFIX}`,
  },
  {
    suit: "swords", rank: "three", number: 3, name: "Three of Swords",
    avatar: "Eli", element: "Air",
    prompt: `Three swords pierce a luminous heart-shape suspended in a field of silver signal static and rain, the heart glowing even as it is pierced, Codex Arc geometry in the background, clean and precise grief, muted pre-dawn blue-grey palette, sorrow rendered with clarity and without sentimentality, ${PROMPT_SUFFIX}`,
  },
  {
    suit: "swords", rank: "four", number: 4, name: "Four of Swords",
    avatar: "Eli", element: "Air",
    prompt: `A figure lies in absolute stillness in a minimal Codex Arc space, three swords mounted precisely on the wall above them like a display, one sword laid across them in their hands, pale silver light, deep and necessary rest after conflict, the posture of conscious recuperation, ${PROMPT_SUFFIX}`,
  },
  {
    suit: "swords", rank: "five", number: 5, name: "Five of Swords",
    avatar: "Eli", element: "Air",
    prompt: `A figure in a dark coat collects two swords in a Codex Arc public space, two more swords planted nearby and two others walking away in the background, one additional sword at their feet, pre-dawn blue light, hollow victory and the aftermath of conflict, something gained at cost, ${PROMPT_SUFFIX}`,
  },
  {
    suit: "swords", rank: "six", number: 6, name: "Six of Swords",
    avatar: "Eli", element: "Air",
    prompt: `A figure guides a small group onto a signal-vessel or elevated moving platform crossing dark calm water toward a distant lit Codex Arc skyline, six swords upright in the prow of the vessel, movement away from turbulence toward something more stable, passage and necessary transition, ${PROMPT_SUFFIX}`,
  },
  {
    suit: "swords", rank: "seven", number: 7, name: "Seven of Swords",
    avatar: "Eli", element: "Air",
    prompt: `A lone figure slips away in the pre-dawn from a Codex Arc encampment or archive, carrying five swords in their arms, two swords left planted in the ground behind them, their expression over their shoulder sharp and calculating, silver-blue signal light catching their movement, strategy or deception, moving alone, ${PROMPT_SUFFIX}`,
  },
  {
    suit: "swords", rank: "eight", number: 8, name: "Eight of Swords",
    avatar: "Eli", element: "Air",
    prompt: `A figure stands bound and blindfolded within a ring of eight swords planted in the ground around them in a Codex Arc space, the swords close but not touching, Codex Arc architecture visible beyond the ring, they could leave if they turned around, self-imposed restriction and fear-based limitation, pre-dawn grey, ${PROMPT_SUFFIX}`,
  },
  {
    suit: "swords", rank: "nine", number: 9, name: "Nine of Swords",
    avatar: "Eli", element: "Air",
    prompt: `A figure sits bolt upright in darkness, hands pressed to their face, nine swords arranged vertically on the wall behind them like a grid of blades, the faintest pre-dawn blue at the window edge, anxiety and sleeplessness rendered with unflinching clarity, the suffering is in the mind, ${PROMPT_SUFFIX}`,
  },
  {
    suit: "swords", rank: "ten", number: 10, name: "Ten of Swords",
    avatar: "Eli", element: "Air",
    prompt: `A figure lies face down in a Codex Arc plaza, ten swords arranged in their back like a precise signal array pointing skyward, the pre-dawn horizon just beginning to lighten behind distant architecture, the darkest point before the turn, an ending that is also a release, ${PROMPT_SUFFIX}`,
  },
  {
    suit: "swords", rank: "page", number: 11, name: "Page of Swords",
    avatar: "Eli", element: "Air",
    prompt: `A young person with sharp alert eyes holds a single sword raised and ready in a Codex Arc open space, wind catching their coat or hair, their gaze scanning the horizon with quick intelligence, pre-dawn light making the blade glow silver, curious and vigilant and slightly reckless, ${PROMPT_SUFFIX}`,
  },
  {
    suit: "swords", rank: "knight", number: 12, name: "Knight of Swords",
    avatar: "Eli", element: "Air",
    prompt: `A figure on a fast airborne vehicle or signal-platform charges directly at the viewer, sword levelled forward, storm clouds and signal static blurring behind at speed, pre-dawn light cutting through, pure intellectual kinetic force and conviction, nothing stopping this momentum, ${PROMPT_SUFFIX}`,
  },
  {
    suit: "swords", rank: "queen", number: 13, name: "Queen of Swords",
    avatar: "Eli", element: "Air",
    prompt: `A composed woman sits elevated in a Codex Arc space, one arm raised and sword held vertical, the other arm outstretched with open hand, her gaze direct and clear as signal light, storm and pre-dawn sky behind her, sharp discernment without cruelty, truth spoken plainly, ${PROMPT_SUFFIX}`,
  },
  {
    suit: "swords", rank: "king", number: 14, name: "King of Swords",
    avatar: "Eli", element: "Air",
    prompt: `An authoritative figure sits in a Codex Arc elevated position, sword held perfectly upright before them, pre-dawn light making the blade gleam, their gaze measured and judicial, signal architecture framing the throne behind them, complete mastery of mind and language, clarity as power, ${PROMPT_SUFFIX}`,
  },
];

// ─── Pentacles — Earth / Olivia / Magical Relic ───────────────────────────────
const PENTACLES: MinorArcanaPrompt[] = [
  {
    suit: "pentacles", rank: "ace", number: 1, name: "Ace of Pentacles",
    avatar: "Olivia", element: "Earth",
    prompt: `A disembodied hand emerges from rich dark earth and roots, holding a single large pentacle-orb that glows with organic bioluminescent light, flowering vines growing up the arm, amber and deep green warmth, an arch of botanical growth framing the scene above, pure material potential and abundance, Magical Relic atmosphere, ${PROMPT_SUFFIX}`,
  },
  {
    suit: "pentacles", rank: "two", number: 2, name: "Two of Pentacles",
    avatar: "Olivia", element: "Earth",
    prompt: `A young person in a Magical Relic coastal space juggles two glowing pentacle-orbs, their body in fluid motion, an infinity-symbol of light connecting the orbiting pentacles, ships or structures visible in the water behind them, adaptability and balance in flux, amber and teal, ${PROMPT_SUFFIX}`,
  },
  {
    suit: "pentacles", rank: "three", number: 3, name: "Three of Pentacles",
    avatar: "Olivia", element: "Earth",
    prompt: `Three figures collaborate in a Magical Relic botanical workshop, one elevated on a scaffold examining a large pentacle-emblem built into the organic architecture, two others studying blueprints or plans below, skilled teamwork and craft, amber light from the walls, mastery in progress, ${PROMPT_SUFFIX}`,
  },
  {
    suit: "pentacles", rank: "four", number: 4, name: "Four of Pentacles",
    avatar: "Olivia", element: "Earth",
    prompt: `A figure sits at the threshold of a Magical Relic city garden, arms wrapped tightly around two pentacle-orbs, a third balanced beneath their feet, a fourth on their head, their expression protective and guarded, holding what they have, unable to move freely, scarcity-thinking in material abundance, ${PROMPT_SUFFIX}`,
  },
  {
    suit: "pentacles", rank: "five", number: 5, name: "Five of Pentacles",
    avatar: "Olivia", element: "Earth",
    prompt: `Two figures move through a cold Magical Relic botanical arcade at night, their clothes worn, light and warmth visible through a stained-glass window of pentacle-vines above them, two pentacle-symbols at the entrance they are passing, poverty or exclusion but not alone, amber warmth just out of reach, ${PROMPT_SUFFIX}`,
  },
  {
    suit: "pentacles", rank: "six", number: 6, name: "Six of Pentacles",
    avatar: "Olivia", element: "Earth",
    prompt: `A figure stands in warm amber lamplight at a Magical Relic market space, distributing glowing pentacle-tokens to two others with open hands, six pentacles balanced on an old scale beside them, generosity and fair exchange, the warmth of giving freely, ${PROMPT_SUFFIX}`,
  },
  {
    suit: "pentacles", rank: "seven", number: 7, name: "Seven of Pentacles",
    avatar: "Olivia", element: "Earth",
    prompt: `A figure leans on a garden tool in a lush Magical Relic cultivated space, surveying with patient evaluation a trellis or wall overgrown with vines, seven pentacle-orbs glowing among the leaves and flowers like ripening fruit, invested waiting, not impatience but readiness, ${PROMPT_SUFFIX}`,
  },
  {
    suit: "pentacles", rank: "eight", number: 8, name: "Eight of Pentacles",
    avatar: "Olivia", element: "Earth",
    prompt: `A focused figure sits at a Magical Relic craft bench, carving or assembling a pentacle-object with total concentration, seven completed pentacle-pieces displayed on the wall behind them, one in hand, amber work-light, the satisfaction of mastery through repetition, apprenticeship and devotion to craft, ${PROMPT_SUFFIX}`,
  },
  {
    suit: "pentacles", rank: "nine", number: 9, name: "Nine of Pentacles",
    avatar: "Olivia", element: "Earth",
    prompt: `A self-possessed woman walks alone in a lush private Magical Relic botanical garden, a bird resting on her gloved hand, nine pentacle-orbs glowing among the vines and plants surrounding her, amber evening light, earned independence and the pleasure of one's own abundance, quietly magnificent, ${PROMPT_SUFFIX}`,
  },
  {
    suit: "pentacles", rank: "ten", number: 10, name: "Ten of Pentacles",
    avatar: "Olivia", element: "Earth",
    prompt: `An extended family or community group gathers in a richly planted Magical Relic space, elders and children and adults, ten pentacle-orbs woven through the architecture and botanical surroundings like constellations, amber warmth throughout, legacy and material completion and belonging across generations, ${PROMPT_SUFFIX}`,
  },
  {
    suit: "pentacles", rank: "page", number: 11, name: "Page of Pentacles",
    avatar: "Olivia", element: "Earth",
    prompt: `A young person crouches in a Magical Relic garden at golden morning, holding a single glowing pentacle-orb up to the light with focused curiosity, botanical overgrowth behind them, amber dew on the leaves, studious and grounded, learning the material world with full attention, ${PROMPT_SUFFIX}`,
  },
  {
    suit: "pentacles", rank: "knight", number: 12, name: "Knight of Pentacles",
    avatar: "Olivia", element: "Earth",
    prompt: `A figure moves steadily and deliberately through a Magical Relic agricultural landscape, a pentacle-orb held before them on an open palm, their mount or vehicle slow and sure, amber fields and botanical growth behind, methodical and reliable forward motion, nothing rushed, ${PROMPT_SUFFIX}`,
  },
  {
    suit: "pentacles", rank: "queen", number: 13, name: "Queen of Pentacles",
    avatar: "Olivia", element: "Earth",
    prompt: `A lush and grounded woman sits enthroned in a Magical Relic botanical garden, a pentacle-orb resting in her lap, a rabbit or small animal near her feet, botanical overgrowth framing her on all sides, warm amber light, deeply at home in the material world, nurturing and abundant and self-sufficient, ${PROMPT_SUFFIX}`,
  },
  {
    suit: "pentacles", rank: "king", number: 14, name: "King of Pentacles",
    avatar: "Olivia", element: "Earth",
    prompt: `A steady older man sits in an established Magical Relic space, a large pentacle-orb before him, his hands resting with authority on the armrests, amber warmth in the architecture around him, botanical vines worked into the throne, bull motif, material mastery and generosity, someone who has built something real and knows it, ${PROMPT_SUFFIX}`,
  },
];

// ─── Full library ─────────────────────────────────────────────────────────────
export const MINOR_ARCANA_PROMPTS: MinorArcanaPrompt[] = [
  ...WANDS,
  ...CUPS,
  ...SWORDS,
  ...PENTACLES,
];

// ─── Lookup helpers ───────────────────────────────────────────────────────────
export function getPromptsBySuit(suit: Suit): MinorArcanaPrompt[] {
  return MINOR_ARCANA_PROMPTS.filter((p) => p.suit === suit);
}

export function getPrompt(suit: Suit, rank: CardRank): MinorArcanaPrompt | undefined {
  return MINOR_ARCANA_PROMPTS.find((p) => p.suit === suit && p.rank === rank);
}
