import { useState } from "react";

// ─── Mode config ──────────────────────────────────────────────────────────────
// chat    = Claude chat session (writing, specs, content)
// cowork  = Cowork desktop app with Claude (file ops, execution)
// code    = You write code (Claude Code / Cowork / direct)
// offline = No Claude needed (Midjourney, designer, chasing people)
const modeConfig = {
  chat:    { label: "Chat",    color: "bg-indigo-950 text-indigo-300 border border-indigo-800" },
  cowork:  { label: "Cowork",  color: "bg-violet-950 text-violet-300 border border-violet-800" },
  code:    { label: "Code",    color: "bg-cyan-950 text-cyan-300 border border-cyan-800" },
  offline: { label: "Offline", color: "bg-orange-950 text-orange-300 border border-orange-800" },
};

// ─── Task data ────────────────────────────────────────────────────────────────
// done       → Oso has completed their side — tell Claude to verify
// today      → Suggested for tonight/tomorrow — flagged in plan panel
// mode       → How this task gets done (chat/cowork/code/offline)
// offline    → Can be done without internet or Claude
// dependsOn  → Task IDs that must be done first

const tasks = [

  // ─────────────────────────────────────────────────────────────────────────
  // PHASE 01–05 — FOUNDATION, VOICE, DESIGN SYSTEM, ONBOARDING, THEMING
  // All complete. The world is defined.
  // ─────────────────────────────────────────────────────────────────────────

  {
    phase: "01 — Brand Foundation",
    status: "complete",
    estimate: "Complete ✓",
    items: [
      { id: 1,  task: "Brand vision, mission and core value proposition",   status: "complete", note: "Defined in PRD v3", done: true, today: false, mode: "chat", offline: false, dependsOn: [] },
      { id: 2,  task: "Target audience and subculture strategy",            status: "complete", note: "Three overlapping clusters: anime-spiritual, occult-esoteric, tabletop-lore", done: true, today: false, mode: "chat", offline: false, dependsOn: [] },
      { id: 3,  task: "Brand line",                                         status: "complete", note: "Your adventure. But Majestic.", done: true, today: false, mode: "chat", offline: false, dependsOn: [] },
      { id: 4,  task: "Brand positioning statement",                        status: "complete", note: "Future-mythic guidance — intuition coaching for people who think in systems", done: true, today: false, mode: "chat", offline: false, dependsOn: [] },
      { id: 5,  task: "Updated PRD v3",                                     status: "complete", note: "Full update — Majestic Profile, Pixel Elder, avatar character details, emblem system, one world four accents, v3 markdown created", done: true, today: false, mode: "chat", offline: false, dependsOn: [] },
    ]
  },
  {
    phase: "02 — Brand Voice & Avatar Content",
    status: "inprogress",
    estimate: "~2–4h chat remaining — #18 and #19 are chatbot-prep, not blocking v1 build.",
    items: [
      { id: 6,  task: "Brand voice personality and principles",             status: "complete", note: "Defined in Brand Voice doc", done: true, today: false, mode: "chat", offline: false, dependsOn: [] },
      { id: 7,  task: "Voice by surface",                                   status: "complete", note: "App store, onboarding, cards, notifications — all written", done: true, today: false, mode: "chat", offline: false, dependsOn: [] },
      { id: 8,  task: "Avatar naming",                                      status: "complete", note: "Casper (Fire), Olivia (Earth), Eli (Air), Destiny (Water)", done: true, today: false, mode: "chat", offline: false, dependsOn: [] },
      { id: 9,  task: "Avatar personas — appearance, lifestyle, aesthetic", status: "complete", note: "Full character definitions in Brand Voice doc and Avatar Visual Rule Sheet v2", done: true, today: false, mode: "chat", offline: false, dependsOn: [] },
      { id: 10, task: "Avatar voice profiles and sample lines",              status: "complete", note: "Defined in Brand Voice doc", done: true, today: false, mode: "chat", offline: false, dependsOn: [] },
      { id: 11, task: "Avatar introduction copy for onboarding",            status: "complete", note: "All four written in avatar voice", done: true, today: false, mode: "chat", offline: false, dependsOn: [] },
      { id: 12, task: "Avatar first words on companion confirmation",        status: "complete", note: "Casper: Right. Let's go. Olivia: Good. We'll figure it out together. Eli: There's a lot to explore. Destiny: I'm glad you're here.", done: true, today: false, mode: "chat", offline: false, dependsOn: [] },
      { id: 13, task: "Avatar return session greetings",                    status: "complete", note: "Four lines per avatar for second session open", done: true, today: false, mode: "chat", offline: false, dependsOn: [] },
      { id: 14, task: "Avatar resonance lines for profile card appearances", status: "complete", note: "Lines for when personality or soul card appears in a reading", done: true, today: false, mode: "chat", offline: false, dependsOn: [] },
      { id: 15, task: "Extended character backstories — all four avatars",  status: "complete", note: "Full origin stories: Casper/privilege reckoning, Eli/breaking from conditioning, Olivia/circumstantial armour, Destiny/depth beneath surface", done: true, today: false, mode: "chat", offline: false, dependsOn: [] },
      { id: 16, task: "Avatar character references locked",                  status: "complete", note: "Casper/Jaime Lannister, Eli/Invincible+Seth Cohen, Olivia/female anime protagonist, Destiny/Paris Hilton subverted", done: true, today: false, mode: "chat", offline: false, dependsOn: [] },
      { id: 17, task: "Avatar naming language in-app",                      status: "complete", note: "Companions, Witnesses, Interpreters, Partial Readers, Living Perspectives, Elemental Voices, Sacred Companions — never guides/oracles/deities", done: true, today: false, mode: "chat", offline: false, dependsOn: [] },
      { id: 136, task: "Per-avatar one-liners — all 22 Major Arcana",       status: "complete", note: "88 lines locked — 4 avatars × 22 cards. majestic-avatar-oneliners-final.md. Voice keys: Casper/jock, Olivia/no-crumbs-loving, Eli/class-clown-artist, Destiny/big-sister.", done: true, today: false, mode: "chat", offline: false, dependsOn: [44] },
      { id: 137, task: "Avatar LLM seed prompts — all four avatars",        status: "complete", note: "System prompt seeds for runtime Minor Arcana generation — majestic-avatar-llm-seeds.md. Voice brief, rules, canonical examples, aura calibration, quality checklist.", done: true, today: false, mode: "chat", offline: false, dependsOn: [136] },
      { id: 18, task: "Avatar character profile expansion — deeper lore and dialogue", status: "todo", note: "Full character bibles for coaching/chatbot feature: interior monologue, decision-making frameworks, extended sample conversations. Not blocking v1.", done: false, today: false, mode: "chat", offline: false, dependsOn: [] },
      { id: 19, task: "Avatar coach/mentor voice scripts — tarot scenario library", status: "todo", note: "Per avatar: scripts for love, career, loss, transition, decision-making, recurring card patterns — chatbot feature prep.", done: false, today: false, mode: "chat", offline: false, dependsOn: [18] },
    ]
  },
  {
    phase: "03 — Product Design System",
    status: "complete",
    estimate: "Complete ✓",
    items: [
      { id: 20, task: "Visual language direction",                           status: "complete", note: "Future-mythic luminous eco-tech folklore — Design System doc", done: true, today: false, mode: "chat", offline: false, dependsOn: [] },
      { id: 21, task: "Colour system — full hex values confirmed",           status: "complete", note: "Colour System v1.0 — all hex values locked. Majestic purple #9500FF, Threshold Deep #1A1A2E, all four elemental accent sets", done: true, today: false, mode: "chat", offline: false, dependsOn: [] },
      { id: 22, task: "Composition system and card framing rules",           status: "complete", note: "Design System doc", done: true, today: false, mode: "chat", offline: false, dependsOn: [] },
      { id: 23, task: "Typography — fonts selected and scale locked",        status: "complete", note: "Cinzel (display), Montserrat (body), Space Mono (terminal), script font (wordmark). Full scale in Typography System v1.0", done: true, today: false, mode: "chat", offline: false, dependsOn: [] },
      { id: 24, task: "Motion system and card state model",                  status: "complete", note: "Design Brief Handoff doc — timing, card states, transition philosophy", done: true, today: false, mode: "chat", offline: false, dependsOn: [] },
      { id: 25, task: "Elemental motion skins",                              status: "complete", note: "Fire, Water, Earth, Air — per avatar in Accent System doc", done: true, today: false, mode: "chat", offline: false, dependsOn: [] },
      { id: 26, task: "Avatar visual rule sheet",                            status: "complete", note: "Avatar Visual Rule Sheet v2 — 70/20/10 ratio, all four avatars, aura rules, portal system, app states", done: true, today: false, mode: "chat", offline: false, dependsOn: [] },
      { id: 27, task: "Anime theme component variations",                    status: "complete", note: "Threshold City, Magical Relic, Folklore Signal, Codex Arc", done: true, today: false, mode: "chat", offline: false, dependsOn: [] },
      { id: 28, task: "Avatar UI theme mapping locked",                      status: "complete", note: "Casper=Threshold City, Destiny=Folklore Signal, Eli=Codex Arc, Olivia=Magical Relic", done: true, today: false, mode: "chat", offline: false, dependsOn: [] },
      { id: 29, task: "Component template",                                  status: "complete", note: "Narrative role, avatar role, motion, attraction/immersion/retention", done: true, today: false, mode: "chat", offline: false, dependsOn: [] },
      { id: 30, task: "Aura treatment rules — all card contexts",            status: "complete", note: "Neutral, Breakthrough, Shadow, Recognition — per avatar. Full spec in Aura Treatment Rules & App States v1.0", done: true, today: false, mode: "chat", offline: false, dependsOn: [] },
      { id: 31, task: "Avatar appearance in all app states",                 status: "complete", note: "Onboarding, daily draw, reading screen, codex, journal, profile, navigation, empty states — all defined in Aura doc", done: true, today: false, mode: "chat", offline: false, dependsOn: [] },
    ]
  },
  {
    phase: "04 — Onboarding",
    status: "complete",
    estimate: "Complete ✓",
    items: [
      { id: 32, task: "Three-phase onboarding structure",                    status: "complete", note: "Phase 1: Signal and Entry, Phase 2: Majestic Profile, Phase 3: Choose Your Companion", done: true, today: false, mode: "chat", offline: false, dependsOn: [] },
      { id: 33, task: "Command-line terminal entry screens",                 status: "complete", note: "Name and date of birth — monospace register, character-by-character reveal", done: true, today: false, mode: "chat", offline: false, dependsOn: [] },
      { id: 34, task: "Birth card two-card system",                          status: "complete", note: "Personality card and soul card — calculation logic, reveal sequence, edge cases", done: true, today: false, mode: "chat", offline: false, dependsOn: [] },
      { id: 35, task: "Majestic Profile reveal screens",                     status: "complete", note: "Screens 05 and 06 — Magical Relic transformation sequence", done: true, today: false, mode: "chat", offline: false, dependsOn: [] },
      { id: 36, task: "Profile summary — first codex entry",                 status: "complete", note: "Screen 07 — foundation established, resonance mechanic planted", done: true, today: false, mode: "chat", offline: false, dependsOn: [] },
      { id: 37, task: "World quiz — four external scenario questions",        status: "complete", note: "Plant shop, handwritten notes, signal broadcast, rooftop garden", done: true, today: false, mode: "chat", offline: false, dependsOn: [] },
      { id: 38, task: "Avatar recommendation screen",                        status: "complete", note: "Screen 10 — suggestion not assignment, override always available", done: true, today: false, mode: "chat", offline: false, dependsOn: [] },
      { id: 39, task: "Companion confirmation and UI theme unlock",           status: "complete", note: "Screen 11 — avatar world bleeds in during confirmation", done: true, today: false, mode: "chat", offline: false, dependsOn: [] },
      { id: 40, task: "First draw — ritual established",                     status: "complete", note: "Screen 12 — second codex entry, lore fragment planted", done: true, today: false, mode: "chat", offline: false, dependsOn: [] },
      { id: 41, task: "After onboarding flows",                              status: "complete", note: "Return session, avatar switching, resonance mechanic, first lore fragment", done: true, today: false, mode: "chat", offline: false, dependsOn: [] },
      { id: 42, task: "Full onboarding v2 document",                         status: "complete", note: "12 screens, all three phases, component spec, post-onboarding flows", done: true, today: false, mode: "chat", offline: false, dependsOn: [] },
      { id: 43, task: "Birth card calculation technical spec",                status: "complete", note: "Full dev handoff — numerology rules, all 22 Major Arcana, edge cases, function signature, 18 test cases — majestic-birth-card-spec.md", done: true, today: false, mode: "chat", offline: false, dependsOn: [] },
      { id: 44, task: "Personality and soul card interpretation copy — all 22 Major Arcana", status: "complete", note: "All 22 cards locked. Full interpretations in majestic-arcana-interpretations-final.md. 44 one-liners in majestic-arcana-oneliners-final.md.", done: true, today: false, mode: "chat", offline: false, dependsOn: [] },
    ]
  },
  {
    phase: "05 — Theming",
    status: "complete",
    estimate: "Complete ✓",
    items: [
      { id: 45, task: "Theme direction confirmed — four avatar themes",       status: "complete", note: "Threshold City, Folklore Signal, Codex Arc, Magical Relic — mapped to avatars", done: true, today: false, mode: "chat", offline: false, dependsOn: [] },
      { id: 46, task: "Threshold City theme spec — base world",              status: "complete", note: "Full world spec: light quality, environment grammar, colour, typography, motion, component behaviour", done: true, today: false, mode: "chat", offline: false, dependsOn: [] },
      { id: 47, task: "Avatar accent system — all four",                     status: "complete", note: "All hex values, gradient washes, CSS tokens, elemental motion skins, switching behaviour — Avatar Accent System v1.0", done: true, today: false, mode: "chat", offline: false, dependsOn: [] },
      { id: 48, task: "Folklore Signal theme spec — Destiny / Water",        status: "complete", note: "Colour, atmosphere, motion, UI elements, environmental cues", done: true, today: false, mode: "chat", offline: false, dependsOn: [] },
      { id: 49, task: "Codex Arc theme spec — Eli / Air",                   status: "complete", note: "Colour, atmosphere, motion, UI elements, environmental cues", done: true, today: false, mode: "chat", offline: false, dependsOn: [] },
      { id: 50, task: "Magical Relic theme spec — Olivia / Earth",           status: "complete", note: "Colour, atmosphere, motion, UI elements, environmental cues", done: true, today: false, mode: "chat", offline: false, dependsOn: [] },
      { id: 51, task: "Theme transition rules — switching between avatars",   status: "complete", note: "1500ms total transition sequence defined — fade, world neutral beat, new accent bloom", done: true, today: false, mode: "chat", offline: false, dependsOn: [] },
      { id: 52, task: "Shared elements across all themes",                    status: "complete", note: "What stays constant regardless of avatar — world grammar, base neutrals, motion language", done: true, today: false, mode: "chat", offline: false, dependsOn: [] },
    ]
  },

  // ─────────────────────────────────────────────────────────────────────────
  // PHASE 06–08 — VISUAL PRODUCTION, CARD DESIGN, SURFACE SPECS
  // Asset production + content + all surface specs. Unblocks build phase.
  // ─────────────────────────────────────────────────────────────────────────

  {
    phase: "06 — Avatar & Visual Production",
    status: "inprogress",
    estimate: "Asset production phase. Emblems done. Lottie + Pixel Elder art still needed. Glyphs, frame, icon pending.",
    items: [
      { id: 53, task: "AI prompt library for avatar generation",             status: "complete", note: "One locked prompt per avatar — appearance, environment, aura, mood states — majestic-avatar-prompts.md", done: true, today: false, mode: "chat", offline: false, dependsOn: [] },
      { id: 54, task: "Casper — all three states generated and approved",    status: "complete", note: "Neutral, Active, Reflective — all three confirmed", done: true, today: false, mode: "offline", offline: true, dependsOn: [] },
      { id: 55, task: "Olivia — all three states generated and approved",    status: "complete", note: "Neutral, active, and reflective all confirmed distinct.", done: true, today: false, mode: "offline", offline: true, dependsOn: [] },
      { id: 56, task: "Olivia — reflective state",                           status: "complete", note: "Distinct generation confirmed — dark forest with fireflies, holding glowing orb.", done: true, today: false, mode: "offline", offline: true, dependsOn: [] },
      { id: 57, task: "Destiny — active and reflective states generated",    status: "complete", note: "Active and reflective confirmed with distinct URLs", done: true, today: false, mode: "offline", offline: true, dependsOn: [] },
      { id: 58, task: "Destiny — neutral state",                             status: "complete", note: "Confirmed distinct — city alley, yellow hoodie, glowing tablet.", done: true, today: false, mode: "offline", offline: true, dependsOn: [] },
      { id: 59, task: "Eli — all three states generated and approved",       status: "complete", note: "Neutral, Active, Reflective — all three confirmed", done: true, today: false, mode: "offline", offline: true, dependsOn: [] },
      { id: 60, task: "Pixel Elder character spec",                          status: "complete", note: "Full spec + addendum v1.0 locked — majestic-pixel-elder-addendum.md. NEW: lamp sequence as reading initiator (Trigger #1, every reading). Isekai lamp mechanic: appear → look up → lamp lights → screen dims → radial glow blooms → step back → talisman foregrounded → breath beat. Easter egg transition: visible ritual role in onboarding, recedes to secret post-avatar-selection. Onboarding Screen 12 variant: 64×84px, 4s sequence.", done: true, today: false, mode: "chat", offline: false, dependsOn: [] },
      { id: 61, task: "Pixel Elder — pixel art production",                  status: "todo", note: "48x64px base + 64×84px onboarding variant. 4 new animation states: look_up (2–3f), lamp_flicker (4f: dark→flicker→glow→settle), lamp_hold (2f loop), step_back (3–4f). Palette additions: lamp dark #2A1A00, flicker #C87830, glow #D4A843, corona #F5C842. Do in Aseprite. React Native Reanimated handles screen dim + radial glow expansion (Skia already in stack).", done: false, today: false, mode: "offline", offline: true, dependsOn: [] },
      { id: 62, task: "Avatar emblem set — design production",               status: "complete", note: "All 5 emblems locked via Midjourney. Prompt library in majestic-emblem-prompt-library.md.", done: true, today: false, mode: "offline", offline: true, dependsOn: [] },
      { id: 63, task: "Avatar emblem set — SVG masters and PNG exports",     status: "complete", note: "All 5 emblems × 5 sizes × 4 colour states exported. PNG files in project.", done: true, today: false, mode: "offline", offline: true, dependsOn: [62] },
      { id: 64, task: "Avatar emblem — Lottie animations (trace draw-on + pulse)", status: "todo", note: "600–800ms reveal per emblem, 220ms pulse — spec in Emblem & Glyph Production Brief", done: false, today: false, mode: "offline", offline: true, dependsOn: [63] },
      { id: 65, task: "Avatar motion rules",                                  status: "complete", note: "Locked. majestic-avatar-gesture-posture-library.md v1.0. All 4 avatars × 3 states (neutral/active/reflective). Two portal shapes (living circle + arch), 3 scales, per-surface presence rules, arrival/exit animation timing, Lottie production notes.", done: true, today: false, mode: "chat", offline: false, dependsOn: [] },
      { id: 66, task: "Aura layer tested on mockups",                        status: "todo", note: "Test aura states (neutral, breakthrough, shadow, recognition) across all four avatars at all three scales", done: false, today: false, mode: "cowork", offline: false, dependsOn: [62, 63] },
      { id: 67, task: "Avatar appearance tested in portal at all three scales", status: "todo", note: "Emblem / living circle portrait / full arch — verify at 24px, 48px, 120px", done: false, today: false, mode: "cowork", offline: false, dependsOn: [62, 63] },
      { id: 68, task: "Card frame system",                                   status: "complete", note: "Full spec in Card Frame System v1.0 — brushed metal, arch, circuit trace, gradient wash, all elemental variants", done: true, today: false, mode: "chat", offline: false, dependsOn: [] },
      { id: 69, task: "Final typography selections",                         status: "complete", note: "Cinzel / Montserrat / Space Mono — Google Fonts. Script font (wordmark) — WOFF2 pending", done: true, today: false, mode: "chat", offline: false, dependsOn: [] },
      { id: 70, task: "Colour confirmation and swatch system",               status: "complete", note: "All hex values locked — Colour System v1.0. CSS token file ready to implement", done: true, today: false, mode: "chat", offline: false, dependsOn: [] },
      { id: 71, task: "Emblem and glyph system — spec",                     status: "complete", note: "Avatar emblems, world glyphs (elemental seals, signal markers, Major Arcana sigils) — spec in Emblem & Glyph Production Brief", done: true, today: false, mode: "chat", offline: false, dependsOn: [] },
      { id: 72, task: "Visual identity brief — full handoff document",       status: "complete", note: "Visual Identity Brief v1.0 — consolidates card frame, type, colour, emblems into one production reference", done: true, today: false, mode: "chat", offline: false, dependsOn: [] },
      { id: 73, task: "Brand guidelines document",                           status: "complete", note: "Brand Guidelines v1.0 — logo usage, colour, type, voice, do and don't. Living document.", done: true, today: false, mode: "chat", offline: false, dependsOn: [] },
      { id: 74, task: "World glyph set — elemental seals production",        status: "todo", note: "4 seals (Ignis, Aqua, Terra, Aer) — SVG masters, PNG at 80/160/320px. Used in card art and codex.", done: false, today: false, mode: "offline", offline: true, dependsOn: [] },
      { id: 75, task: "World glyph set — signal markers production",         status: "todo", note: "Directional arrow, signal node, threshold marker, phase indicator — SVG master, PNG at 16/24/32px", done: false, today: false, mode: "offline", offline: true, dependsOn: [] },
      { id: 76, task: "Major Arcana sigils — 22 card sigils",               status: "todo", note: "One per card, abstractly readable, consistent stroke weight — SVG + PNG at 24/48px per sigil", done: false, today: false, mode: "offline", offline: true, dependsOn: [] },
      { id: 77, task: "Card frame — final visual production",                status: "todo", note: "Brushed metal frame artwork, all four elemental variants + Major Arcana variant, card back — SVG master + Figma template", done: false, today: false, mode: "offline", offline: true, dependsOn: [] },
      { id: 78, task: "App icon production",                                 status: "todo", note: "Master emblem on Threshold Deep background — 1024×1024px App Store, plus standard icon sizes", done: false, today: false, mode: "offline", offline: true, dependsOn: [62] },
      { id: 79, task: "Script font — WOFF2 file",                           status: "complete", note: "Remachine Script — WOFF2 confirmed at app/assets/fonts/RemachineScript.woff2 (38KB). TTF + EOT also present. Wordmark token in typography.ts. Confirmed 16 Apr 2026.", done: true, today: false, mode: "offline", offline: true, dependsOn: [] },
    ]
  },
  {
    phase: "07 — Card Design & Content",
    status: "inprogress",
    estimate: "~4h chat (4 prompt libraries) + Midjourney generation time (78 cards). Prompt libraries unblock all generation.",
    items: [
      { id: 80, task: "AI prompt library — Major Arcana",                    status: "complete", note: "22 cards, one locked prompt scaffold each, future-mythic world reinterpretation", done: true, today: false, mode: "chat", offline: false, dependsOn: [] },
      { id: 81, task: "AI prompt library — Wands (Fire / Casper)",          status: "complete", note: "Prompts used in production — all 14 Wands cards generated and approved 16 Apr 2026. See task #86.", done: true, today: false, mode: "chat", offline: false, dependsOn: [] },
      { id: 82, task: "AI prompt library — Cups (Water / Destiny)",         status: "complete", note: "Prompts used in production — all 14 Cups cards generated and approved 16 Apr 2026. See task #87.", done: true, today: false, mode: "chat", offline: false, dependsOn: [] },
      { id: 83, task: "AI prompt library — Swords (Air / Eli)",             status: "complete", note: "Prompts used in production — all 14 Swords cards generated and approved 16 Apr 2026. See task #88.", done: true, today: false, mode: "chat", offline: false, dependsOn: [] },
      { id: 84, task: "AI prompt library — Pentacles (Earth / Olivia)",     status: "complete", note: "Prompts used in production — all 14 Pentacles cards generated and approved 16 Apr 2026. See task #89.", done: true, today: false, mode: "chat", offline: false, dependsOn: [] },
      { id: 85, task: "Major Arcana generation — 22 cards",                 status: "complete", note: "All 22 cards generated and approved 16 Apr 2026. The Fool: s.mj.run/V6y7mXAOsGY | The Magician: s.mj.run/1nxY_Q6ibSc | The High Priestess: s.mj.run/zrWoYqH7ecM | The Empress: s.mj.run/DYKUO5br5P4 | The Emperor: s.mj.run/9dM4KETxX60 | The Hierophant: s.mj.run/M1J8OwPtSlU | The Lovers: s.mj.run/Z1tbueE-ZlA | The Chariot: s.mj.run/2whWjJ5DZKI | Strength: s.mj.run/27KACYkyO_U | The Hermit: s.mj.run/1WaCgoeKcNY | Wheel of Fortune: s.mj.run/prlMguFUEuU | Justice: s.mj.run/N4cKJtwH6o4 | The Hanged Man: s.mj.run/TTUKzQ8zokg | Death: s.mj.run/fly3uzs8PMU | Temperance: s.mj.run/wigVZKIVbwE | The Devil: s.mj.run/LE1lwvLVNto | The Tower: s.mj.run/d-L-tAkHgns | The Star: s.mj.run/H_GfwV0XIyA | The Moon: s.mj.run/A-D09X6G-wY | The Sun: s.mj.run/wJ3jlGfg67c | Judgement: s.mj.run/QvL-G_Sybjo | The World: s.mj.run/WK-xdSFs1Os. Logged in docs/visual/majestic-image-references.md v1.8", done: true, today: false, mode: "offline", offline: true, dependsOn: [] },
      { id: 86, task: "Minor Arcana generation — Wands: 14 cards",          status: "complete", note: "All 14 locked 16 Apr 2026. Ace: s.mj.run/aYManawaQsQ · Two: s.mj.run/R-p86Oc33lk · Three: s.mj.run/GBZaZY_gAig · Four: s.mj.run/Ve_-yvt801I · Five: s.mj.run/LdIvDrQWmQY · Six: s.mj.run/b-WHuSBJ3fw · Seven: s.mj.run/7PaJ81V9C-o · Eight: s.mj.run/Dsn8fETimSE · Nine: s.mj.run/ehQTCNUoydQ · Ten: s.mj.run/m5wTCDsdtRk · Page: s.mj.run/_SFnyxUPSQI · Knight: s.mj.run/5-PUuu0Y6qo · Queen: s.mj.run/Q0jGEwOWg30 · King: s.mj.run/ZQN4ZCrZPDo", done: true, today: false, mode: "offline", offline: true, dependsOn: [81] },
      { id: 87, task: "Minor Arcana generation — Cups: 14 cards",           status: "complete", note: "All 14 locked 16 Apr 2026. Ace: s.mj.run/_24N1HWOEW8 · Two: s.mj.run/xH5Aqjq6MBI · Three: s.mj.run/CB9XWjsAtTk · Four: s.mj.run/Zms0OjSOPRw · Five: s.mj.run/En63Lk9eB80 · Six: s.mj.run/MgW02R32yPE · Seven: s.mj.run/JcRUH9G2Kbo · Eight: s.mj.run/Vmv_wa6_v4k · Nine: s.mj.run/9udbcl44poc · Ten: s.mj.run/3Kd4Ivwzjx8 · Page: s.mj.run/KBqAgB-tsWc · Knight: s.mj.run/ZWF9WLAK2AA · Queen: s.mj.run/tNCrnaZH9_g · King: s.mj.run/h_jHBzzvHtQ", done: true, today: false, mode: "offline", offline: true, dependsOn: [82] },
      { id: 88, task: "Minor Arcana generation — Swords: 14 cards",         status: "complete", note: "All 14 locked 16 Apr 2026. Ace: s.mj.run/TV7zGS6BOk4 · Two: s.mj.run/TUuz_uyDctA · Three: s.mj.run/dRFiziUscvs · Four: s.mj.run/Ab-0JE5Iaos · Five: s.mj.run/vvWzkJefd1k · Six: s.mj.run/EdC-T1JIwAM · Seven: s.mj.run/JvqCbvCiwcE · Eight: s.mj.run/ulDa96KkmIU · Nine: s.mj.run/HETgpQZjXLM · Ten: s.mj.run/SxYgW72a8Sc · Page: s.mj.run/CYVC6dkrsM0 · Knight: s.mj.run/7KCfuhGRVnM · Queen: s.mj.run/S5gq4AkbGTA · King: s.mj.run/oQ-z2A4DTSA", done: true, today: false, mode: "offline", offline: true, dependsOn: [83] },
      { id: 89, task: "Minor Arcana generation — Pentacles: 14 cards",      status: "complete", note: "All 14 locked 16 Apr 2026. Ace: s.mj.run/23Iemw6mZnw · Two: s.mj.run/Kz6iRj4U_P4 · Three: s.mj.run/S6hYXDRZqKc · Four: s.mj.run/SN5Cpe6mB7M · Five: s.mj.run/KNh-ngo9Ux0 · Six: s.mj.run/xQUGiAiGvqE · Seven: s.mj.run/qO7Oo89VPnk · Eight: s.mj.run/vzgmYmYsta8 · Nine: s.mj.run/X9RVEjoQsHA · Ten: s.mj.run/tzTBk-LffiY · Page: s.mj.run/yDEYcxVLdRE · Knight: s.mj.run/siDMsJF8pa8 · Queen: s.mj.run/bsL_XrhTB6s · King: s.mj.run/WOeLADXoO0A", done: true, today: false, mode: "offline", offline: true, dependsOn: [84] },
      { id: 90, task: "Card back design",                                    status: "todo", note: "Universal back — master emblem centred, Majestic purple gradient wash, brand line", done: false, today: false, mode: "offline", offline: true, dependsOn: [77] },
      { id: 91, task: "Card title and metadata treatment",                   status: "complete", note: "Typography rules locked: card name (Cinzel), suit indicator (avatar emblem micro), element bar (accent line), number (Roman/Arabic). Confirmed 16 Apr 2026.", done: true, today: false, mode: "chat", offline: false, dependsOn: [] },
      { id: 92, task: "Aura category mapping — all 78 cards",               status: "complete", note: "All 78 cards locked. Major Arcana in cardData.ts. Minor Arcana block in minorArcana-cardData.ts. Distribution: breakthrough ×24, shadow ×17, neutral ×15.", done: true, today: false, mode: "chat", offline: false, dependsOn: [] },
      { id: 93, task: "Accessibility copy rules for cards",                  status: "complete", note: "Alt text conventions, screen reader logic locked. Dev-ready. Confirmed 16 Apr 2026.", done: true, today: false, mode: "chat", offline: false, dependsOn: [] },
    ]
  },
  {
    phase: "08 — Core Product Surfaces",
    status: "inprogress",
    estimate: "Mostly complete. Daily draw component spec still needs full animated spec.",
    items: [
      { id: 121, task: "Daily draw — component spec",                        status: "inprogress", note: "useDailyDraw.ts hook built. Full animated component spec still needed — shuffle sequence, aura gather, card reveal choreography.", done: false, today: false, mode: "cowork", offline: false, dependsOn: [] },
      { id: 122, task: "Daily draw — meditation/reflection ritual spec",     status: "complete", note: "Locked in majestic-ritual-and-notifications.md. Ambient sequence, breath pulse, avatar voice scripts, category-based reflection prompts.", done: true, today: false, mode: "chat", offline: false, dependsOn: [] },
      { id: 123, task: "Reading screen — 1-card spread spec",                status: "complete", note: "Documented in docs/reading-screen-spec.md — single card, avatar interpretation line, reflection prompt, aura behaviour mapped.", done: true, today: false, mode: "chat", offline: false, dependsOn: [] },
      { id: 124, task: "Reading screen — 3-card spread spec",                status: "complete", note: "Past/Present/Future, sequential reveal, avatar interpretation per position, recognition override on profile card.", done: true, today: false, mode: "chat", offline: false, dependsOn: [] },
      { id: 125, task: "Reading initiation — spread selection UI",           status: "complete", note: "User selects single or three-card on reading tab arrival, before shuffle state begins.", done: true, today: false, mode: "chat", offline: false, dependsOn: [] },
      { id: 126, task: "Deck browser and codex — component spec",           status: "complete", note: "Locked. majestic-codex-spec.md. Discovery model, world lore unlock on first draw, personal lore at 3+ draws, avatar voice in Codex.", done: true, today: false, mode: "chat", offline: false, dependsOn: [] },
      { id: 127, task: "Journal and reflection surface — spec",              status: "complete", note: "Locked. majestic-journal-spec.md. Dual-purpose: reading archive + standalone writing. Save flow universal. No delete in v1.", done: true, today: false, mode: "chat", offline: false, dependsOn: [] },
      { id: 128, task: "Majestic Profile surface — spec",                    status: "complete", note: "Locked. majestic-profile-spec.md. Birth cards, resonance section, current companion, reading history snapshot.", done: true, today: false, mode: "chat", offline: false, dependsOn: [] },
      { id: 129, task: "Notification and reminder language",                 status: "complete", note: "Locked. majestic-ritual-and-notifications.md. All 4 avatars, Days 3/7/14/30, return session, profile card nudge.", done: true, today: false, mode: "chat", offline: false, dependsOn: [] },
      { id: 130, task: "Empty states and loading states",                    status: "complete", note: "Locked. majestic-states-and-switching.md. Full set across all surfaces. Copy rules locked.", done: true, today: false, mode: "chat", offline: false, dependsOn: [] },
      { id: 131, task: "Avatar switching — full UI flow",                    status: "complete", note: "Locked. majestic-states-and-switching.md. 1500ms transition: fade → world neutral beat → accent bloom → avatar arrival.", done: true, today: false, mode: "chat", offline: false, dependsOn: [126, 127, 128] },
      { id: 154, task: "Altar & ritual spec — avatar altars, talismans and breath mechanic", status: "complete", note: "Locked v2.0. majestic-altar-ritual-spec-v2.md. Four-layer visual hierarchy: Light Source / Talisman / Reading Surface / Element. Talisman replaces generic hold gesture as ritual initiator. 5s breath max. Onboarding compressed exhale-only. Reflection Mode flagged for v2.", done: true, today: false, mode: "chat", offline: false, dependsOn: [121, 122] },
      { id: 157, task: "Quiz skip UX — onboarding companion selection without quiz", status: "todo", note: "Add skip option to Screen 08 quiz intro. Routes to Screen 10 with no highlighted recommendation — all four avatars shown equally. User still chooses. Companion system stays clean. Copy needed: 'Skip straight to choosing.' in parent voice.", done: false, today: false, mode: "chat", offline: false, dependsOn: [37, 38] },
      { id: 158, task: "Sound design spec — reading audio events",           status: "todo", note: "SCOPE LOCKED: ambient audio for 1-card and 3-card readings only. 4 sound events: shuffle, deal, card select, reveal. Needs: audio asset list (source/create), integration spec for Expo AV, per-event timing relative to animation. Write spec before sourcing assets.", done: false, today: false, mode: "chat", offline: false, dependsOn: [156] },
      { id: 159, task: "Subscription tier spec — gating logic and UX",      status: "complete", note: "Locked v1.0. majestic-subscription-tier-spec.md. Free: daily draw always + 3 initiated readings/day + lore + extended reading. Dig Deeper (AI synthesis) uses reading credit. Angles = subscription. Pricing: $14.99/month, $2.99 PAYG. Upgrade prompt principles locked. Supabase schema additions defined.", done: true, today: false, mode: "chat", offline: false, dependsOn: [115] },
      { id: 160, task: "Supabase schema — subscription fields",              status: "todo", note: "Add to profiles: readings_today, readings_reset_at, subscription_active, subscription_tier, subscription_expires_at. Rename card_content.interp_general → interp_life. RLS: subscription fields server-side only, never client-writable.", done: false, today: false, mode: "code", offline: false, dependsOn: [111] },
      { id: 161, task: "Subscription screen UI",                             status: "todo", note: "Full screen (not modal). Emblem + 'Go further.' headline + 3 benefit lines + pricing block + START UNLIMITED CTA + PAYG text link. Avatar accent colour. No free trial in v1. See subscription-tier-spec.md Section 08.", done: false, today: false, mode: "code", offline: false, dependsOn: [159] },
      { id: 162, task: "RevenueCat webhook — Supabase edge function",        status: "todo", note: "Receives purchase/renewal/cancellation events from RevenueCat. Updates profiles: subscription_active, subscription_tier, subscription_expires_at. Never client-writable. Product IDs: majestic_monthly, majestic_reading_payg.", done: false, today: false, mode: "code", offline: false, dependsOn: [115, 160] },
      { id: 163, task: "Auth prompt — Screen 11 integration",                status: "todo", note: "Auth fires after avatar first words + 1s hold. Bottom sheet. Apple + Google only. On success: write profile to Supabase (name, DOB, birthCards, avatarId). On failure: persist profileStore to AsyncStorage, retry on next open. Copy locked in majestic-auth-monetisation-spec.md.", done: false, today: false, mode: "code", offline: false, dependsOn: [105, 112] },
      { id: 164, task: "Auth & monetisation positioning spec",                status: "complete", note: "Locked v1.0. majestic-auth-monetisation-spec.md. Auth at Screen 11, value-before-ask principle, paid feature discovery sequence, copy locked, dev notes for credit gate and local fallback.", done: true, today: false, mode: "chat", offline: false, dependsOn: [] },
      { id: 155, task: "Altar world-names — Threshold City lore names for altar objects", status: "todo", note: "Each altar object needs a Threshold City name (ember source, stone vessel, antenna, water surface). Lore layer for tabletop audience. Brief copy task once altar spec is locked.", done: false, today: false, mode: "chat", offline: false, dependsOn: [154] },
      { id: 156, task: "Sound design — ambient audio for card readings",      status: "todo", note: "DECIDED. Scope: ambient audio for 1-card and 3-card readings only. Sound events: shuffle, deal, card select, reveal. No altar ambient (post-v1). No onboarding audio. New work stream — needs audio assets sourced/created + integration spec before build.", done: false, today: false, mode: "offline", offline: true, dependsOn: [154] },
    ]
  },

  // ─────────────────────────────────────────────────────────────────────────
  // PHASE 09–10 — INFRASTRUCTURE + BUILD
  // The actual construction. Schema first, then everything else.
  // ─────────────────────────────────────────────────────────────────────────

  {
    phase: "09 — Infrastructure & Security",
    status: "inprogress",
    estimate: "~2–4h cowork/code. Schema + RLS is the critical unblock for build phase. Do these before building data-dependent features.",
    items: [
      { id: 98,  task: "Tech stack confirmation",                             status: "complete", note: "Expo 54, Expo Router 6, RN 0.81.5, NativeWind 4.2.3, Reanimated 4.1.1, Skia 2.2.12, Supabase JS 2.101, Zustand 5.0.12, TypeScript 5.9.", done: true, today: false, mode: "code", offline: false, dependsOn: [] },
      { id: 132, task: "App scaffold and project structure",                 status: "complete", note: "Full Expo Router project — src/ with components/, features/, lib/, stores/, theme/, types/, utils/. All deps installed.", done: true, today: false, mode: "code", offline: false, dependsOn: [] },
      { id: 112, task: "Auth flow — Supabase Auth implementation",           status: "complete", note: "supabase/auth.ts — signUp, signIn, signOut, getCurrentUser, onAuthStateChange. authStore.ts initialises listener. AUTH TIMING LOCKED: prompt fires at Screen 11 (Companion Confirmed), after avatar first words. Apple + Google only. No email/password in v1. See majestic-auth-monetisation-spec.md.", done: true, today: false, mode: "code", offline: false, dependsOn: [] },
      { id: 111, task: "Database schema — provision in Supabase dashboard", status: "complete", note: "Tables provisioned 16 Apr 2026: profiles, readings, streaks. RLS enabled on all three. Auto-create profile trigger on auth.users insert. SQL: docs/technical/majestic-supabase-schema.sql.", done: true, today: false, mode: "cowork", offline: false, dependsOn: [] },
      { id: 145, task: "Security — RLS policies + API key protection",       status: "todo", note: "Do with #111. RLS: auth.uid()=user_id on all tables. LLM API key behind Supabase edge function (never in app bundle). Service role key server-side only. Input sanitisation on journal/intention fields.", done: false, today: true, mode: "code", offline: false, dependsOn: [111] },
      { id: 150, task: "App Store accounts — Apple Developer + Google Play", status: "todo", note: "Apple Developer Program ($99/yr) + Google Play Console ($25 one-time). Apple approval can take days — start now if not already done. Required before any submission.", done: false, today: false, mode: "offline", offline: true, dependsOn: [] },
      { id: 146, task: "Error monitoring — Sentry integration",              status: "todo", note: "Install @sentry/react-native. Catches JS errors, native crashes, performance issues. Do before beta so you have visibility from day one. Without this you're flying blind.", done: false, today: false, mode: "code", offline: false, dependsOn: [132] },
      { id: 147, task: "Analytics — PostHog integration",                    status: "todo", note: "Install posthog-react-native. Track onboarding completion, daily draw rate, D3/D7/D30 retention, avatar distribution. Do before beta — you need data from the first user.", done: false, today: false, mode: "code", offline: false, dependsOn: [132] },
      { id: 153, task: "Deep linking — notification routing",                status: "todo", note: "Configure Expo Router deep links so notification taps open specific screens (e.g. daily draw notification → opens daily draw). Do with #114 push notifications.", done: false, today: false, mode: "code", offline: false, dependsOn: [114] },
    ]
  },
  {
    phase: "10 — Build",
    status: "inprogress",
    estimate: "~8–12 weeks. Portal + aura systems are the animation critical path. Supabase schema is the data critical path.",
    items: [
      { id: 133, task: "Zustand state stores — authStore, avatarStore, profileStore", status: "complete", note: "All three implemented and typed. authStore: user/initialised/listener. avatarStore: activeAvatar/setAvatar. profileStore: name/DOB/birthCards/quizScores/todaysCard.", done: true, today: false, mode: "code", offline: false, dependsOn: [] },
      { id: 134, task: "Major Arcana card data — TypeScript implementation", status: "complete", note: "src/features/daily-draw/cardData.ts — all 22 cards. Breakthrough/shadow/neutral aura context mapped.", done: true, today: false, mode: "code", offline: false, dependsOn: [] },
      { id: 99,  task: "Birth card calculator — implement and test",          status: "complete", note: "birthCardCalculator.js + .ts. 18 test cases in birthCardCalculator.test.mjs. Run: bun test", done: true, today: false, mode: "cowork", offline: false, dependsOn: [] },
      { id: 100, task: "Colour token file — implement in codebase",          status: "complete", note: "src/theme/tokens.ts — full colour system, all avatar accent sets with particle values.", done: true, today: false, mode: "code", offline: false, dependsOn: [] },
      { id: 101, task: "Typography implementation",                           status: "complete", note: "src/theme/typography.ts — fonts, weights, full type scale displayXL→caption.", done: true, today: false, mode: "code", offline: false, dependsOn: [] },
      { id: 102, task: "Avatar accent theme switcher — implement",           status: "inprogress", note: "avatarStore.ts (Zustand) done. Token sets defined. Full animated CSS token swap + transition layer still needed.", done: false, today: false, mode: "code", offline: false, dependsOn: [] },
      { id: 109, task: "Portal system — implement (Arch + Living Circle)",   status: "inprogress", note: "AvatarPortrait.tsx and portal folder scaffolded. Shape logic and edge treatments not yet implemented.", done: false, today: false, mode: "code", offline: false, dependsOn: [62] },
      { id: 108, task: "Aura state system — implement",                      status: "inprogress", note: "AvatarAura.tsx scaffolded. Aura context type defined. Full animated aura layer with per-avatar accents still needed.", done: false, today: false, mode: "code", offline: false, dependsOn: [92, 62] },
      { id: 106, task: "Living signal layer — implement",                    status: "todo", note: "Elemental particle system, emblem pulse, glyph trace — four elemental motion skins", done: false, today: false, mode: "code", offline: false, dependsOn: [109] },
      { id: 103, task: "Onboarding flow — build Phase 1 (Signal & Entry)",  status: "inprogress", note: "OnboardingScreen.tsx + TerminalInput.tsx scaffolded. Individual route screens not yet built.", done: false, today: false, mode: "code", offline: false, dependsOn: [] },
      { id: 104, task: "Onboarding flow — build Phase 2 (Majestic Profile)", status: "inprogress", note: "birthCardCalculator.ts in features/birth-card/. profileStore.ts tracks all state. Individual reveal screens not yet built.", done: false, today: false, mode: "code", offline: false, dependsOn: [] },
      { id: 105, task: "Onboarding flow — build Phase 3 (Choose Companion)", status: "todo", note: "World quiz, avatar recommendation, companion confirmation, UI theme bloom. Quiz score → avatar mapping logic needed.", done: false, today: false, mode: "code", offline: false, dependsOn: [103, 104] },
      { id: 109, task: "Portal system — implement (Arch + Living Circle)",   status: "inprogress", note: "AvatarPortrait.tsx COMPLETE: arch + livingCircle shape logic, presence levels (hero/presence/signal/mark/none), aura integration, portrait image rendering. portal/ subfolder was not created — code lives directly in AvatarPortrait.tsx. Edge case: mark presenceLevel shows placeholder circle; Lottie emblem replacement still todo.", done: false, today: false, mode: "code", offline: false, dependsOn: [62] },
      { id: 108, task: "Aura state system — implement",                      status: "complete", note: "AvatarAura.tsx VERIFIED COMPLETE 2026-05-01: per-avatar accent colours, animated aura states (neutral/breakthrough/shadow/recognition/gathering) with Reanimated withRepeat/withSequence, Skia stroke+blur on native, web fallback. Bug: AuraContext imported from wrong file (types/avatar instead of types/tarot) — fix in code-quality Group A.", done: true, today: false, mode: "code", offline: false, dependsOn: [92, 62] },
      { id: 106, task: "Living signal layer — implement",                    status: "todo", note: "Elemental particle system, emblem pulse, glyph trace — four elemental motion skins", done: false, today: false, mode: "code", offline: false, dependsOn: [109] },
      { id: 103, task: "Onboarding flow — build Phase 1 (Signal & Entry)",  status: "complete", note: "VERIFIED COMPLETE 2026-05-01. All Phase 1 screens built at app/(onboarding)/: index.tsx (entry/fade-in), name.tsx (terminal input + char-by-char reveal), dob.tsx (day/month/year). OnboardingScreen.tsx + TerminalInput.tsx in src/components/onboarding/.", done: true, today: false, mode: "code", offline: false, dependsOn: [] },
      { id: 104, task: "Onboarding flow — build Phase 2 (Majestic Profile)", status: "complete", note: "VERIFIED COMPLETE 2026-05-01. All Phase 2 screens built: calculating.tsx (birth card calc + animated pulse), personality.tsx, soul.tsx (card reveals with interpretations from cardInterpretations.ts), profile.tsx. birthCardCalculator integrated. profileStore wired.", done: true, today: false, mode: "code", offline: false, dependsOn: [] },
      { id: 105, task: "Onboarding flow — build Phase 3 (Choose Companion)", status: "complete", note: "VERIFIED COMPLETE 2026-05-01. All Phase 3 screens built: quiz.tsx (4 questions, score tallying, tiebreaker), recommendation.tsx (score → avatar mapping, all 4 selectable, suggested badge), confirm.tsx (accent bloom animation, first words, Supabase sync), first-draw.tsx.", done: true, today: false, mode: "code", offline: false, dependsOn: [103, 104] },
      { id: 107, task: "Card flip and reveal animation",                     status: "todo", note: "Shuffle → jump card spike → hold → reveal → settle. Continuous gesture spec in Design Brief Handoff", done: false, today: false, mode: "code", offline: false, dependsOn: [85, 77] },
      { id: 110, task: "Pixel Elder — integration",                          status: "todo", note: "Floating overlay layer, trigger logic, tap detection, session limit (max 2 per session), position collision avoidance", done: false, today: false, mode: "code", offline: false, dependsOn: [61] },
      { id: 113, task: "Offline cache — implement",                          status: "todo", note: "Last 3 readings, daily tarotscope, journal offline-first, sync on reconnect.", done: false, today: false, mode: "code", offline: false, dependsOn: [111] },
      { id: 114, task: "Push notification system — implement",               status: "todo", note: "Streak maintenance, daily draw prompt — avatar-voiced, per Expo Notifications. Notification language locked in #129.", done: false, today: false, mode: "code", offline: false, dependsOn: [129, 111] },
      { id: 115, task: "Payment and subscription — RevenueCat",              status: "todo", note: "Keys slotted in .env.example. lib/revenuecat/ exists but empty. TIER STRUCTURE LOCKED: Daily draw always free. 3 initiated readings/day free (1-card + 3-card combined). Dig Deeper AI interpretations on reading screen = premium gate. Subscription = unlimited readings + Dig Deeper. Pay-as-you-go = per-reading unlock TBD pricing. Build gating logic around readingCount in profileStore + Supabase.", done: false, today: false, mode: "code", offline: false, dependsOn: [] },
      { id: 115, task: "Payment and subscription — RevenueCat",              status: "todo", note: "AUDIT NOTE 2026-05-01: lib/revenuecat/ folder does NOT exist — must be created before implementation (previous note was incorrect). Keys in .env.example. TIER STRUCTURE LOCKED: Daily draw always free. 3 initiated readings/day free (1-card + 3-card combined). Dig Deeper AI interpretations on reading screen = premium gate. Subscription = unlimited readings + Dig Deeper. Pay-as-you-go = per-reading unlock TBD pricing. Build gating logic around readingCount in profileStore + Supabase.", done: false, today: false, mode: "code", offline: false, dependsOn: [] },
    ]
  },

  // ─────────────────────────────────────────────────────────────────────────
  // PHASE 11–12 — PRE-LAUNCH + GO TO MARKET
  // Everything needed to actually ship. Legal, compliance, store presence.
  // ─────────────────────────────────────────────────────────────────────────

  {
    phase: "11 — Pre-Launch",
    status: "todo",
    estimate: "~3–4h chat (privacy policy, compliance check) + ~1h code (TestFlight, beta track). Do before submitting to App Store.",
    items: [
      { id: 152, task: "TestFlight + Android beta track setup",              status: "todo", note: "Set up TestFlight (iOS) and Google Play internal testing track (Android) before closed beta. Required to distribute to testers.", done: false, today: false, mode: "offline", offline: true, dependsOn: [150] },
      { id: 148, task: "Privacy policy + terms of service",                  status: "todo", note: "Both app stores require these before submission. Majestic collects DOB, stores journal entries, processes payments — needs proper drafting, not a template. Can be done in chat.", done: false, today: false, mode: "chat", offline: false, dependsOn: [] },
      { id: 149, task: "GDPR — account deletion flow",                       status: "todo", note: "Users in AU/EU/UK need ability to delete account and all associated data. Required for compliance. Implement delete account endpoint in Supabase + UI flow in app.", done: false, today: false, mode: "code", offline: false, dependsOn: [111] },
      { id: 151, task: "App Store review — pre-submission compliance check", status: "todo", note: "Review against Apple guidelines before submitting. Tarot/spiritual content, in-app purchases, and user-generated content (journal) each have specific rules. Better to find issues before Apple does.", done: false, today: false, mode: "chat", offline: false, dependsOn: [148] },
    ]
  },
  {
    phase: "12 — Go To Market",
    status: "todo",
    estimate: "~3–4h chat (copy: app store + landing + social) + visual production (screenshots, social assets). Post-build.",
    items: [
      { id: 116, task: "App store copy — title, subtitle, description",      status: "todo", note: "Pre-entry myth layer — implies world before explaining product. Brand voice: scene-setting not selling", done: false, today: false, mode: "chat", offline: false, dependsOn: [] },
      { id: 117, task: "App store visuals — screenshots and preview",        status: "todo", note: "Atmospheric, world-entry, not feature-led. Needs card frame + avatar assets to complete", done: false, today: false, mode: "offline", offline: true, dependsOn: [85, 62, 77] },
      { id: 118, task: "Landing page copy and structure",                    status: "todo", note: "Scene-setting not selling. Needs avatar portraits and world visuals", done: false, today: false, mode: "chat", offline: false, dependsOn: [116] },
      { id: 119, task: "Social presence strategy",                           status: "todo", note: "Which platforms, what content, how the world is introduced pre-launch", done: false, today: false, mode: "chat", offline: false, dependsOn: [] },
      { id: 120, task: "Launch narrative — soft launch and community seeding", status: "todo", note: "Soft launch, community seeding across anime/tabletop/esoteric channels, cultural channel strategy", done: false, today: false, mode: "chat", offline: false, dependsOn: [119] },
    ]
  },
  {
    phase: "13 — Future Releases",
    status: "future",
    estimate: "Post-v1 and post-beta scope. Ideas and enhancements captured here so nothing gets lost.",
    items: [
      { id: 138, task: "Journal moodboard mode — canvas editor",             status: "future", note: "Canvas-based editor on journal entries — stickers, emoji, text overlays, drag/drop, export to image. Skia already in stack.", done: false, today: false, mode: "code", offline: false, dependsOn: [127] },
      { id: 139, task: "Alternative card decks",                              status: "future", note: "Additional deck art sets — same card structure, different visual world. Premium unlockable or seasonal.", done: false, today: false, mode: "offline", offline: true, dependsOn: [] },
      { id: 140, task: "Full environmental variation per avatar theme",        status: "future", note: "Each avatar gets their own distinct world environment beyond accent colour — defined in Threshold City spec as post-v1 scope.", done: false, today: false, mode: "chat", offline: false, dependsOn: [] },
      { id: 141, task: "AR card reveal feature",                               status: "future", note: "Card reveal via device camera. Defined in Design Brief Handoff as future scope.", done: false, today: false, mode: "code", offline: false, dependsOn: [] },
      { id: 142, task: "Seasonal and time-based world shifts",                 status: "future", note: "World atmosphere changes with real-world time, season, or moon phase. Threshold City spec post-v1.", done: false, today: false, mode: "code", offline: false, dependsOn: [] },
      { id: 143, task: "Pattern tracking and insight summaries — Journal",     status: "future", note: "Cross-reading pattern analysis — card frequency, recurring themes, journalling summaries. Requires reading history.", done: false, today: false, mode: "chat", offline: false, dependsOn: [127] },
      { id: 144, task: "Social and sharing features",                          status: "future", note: "Shareable card detail views, reading sharing, community features. Scope TBD post-beta.", done: false, today: false, mode: "chat", offline: false, dependsOn: [] },
    ]
  }
];

// ─── Config ───────────────────────────────────────────────────────────────────
const statusConfig = {
  complete:   { label: "Complete",     color: "bg-emerald-900 text-emerald-300 border border-emerald-700", dot: "bg-emerald-400", border: "border-emerald-800" },
  inprogress: { label: "In Progress",  color: "bg-amber-900 text-amber-300 border border-amber-700",       dot: "bg-amber-400",   border: "border-amber-800" },
  todo:       { label: "To Do",        color: "bg-slate-800 text-slate-400 border border-slate-600",       dot: "bg-slate-500",   border: "border-slate-700" },
  future:     { label: "Future",       color: "bg-purple-900 text-purple-300 border border-purple-700",    dot: "bg-purple-400",  border: "border-purple-800" },
  cowork:     { label: "Cowork",       color: "bg-blue-900 text-blue-300 border border-blue-700",          dot: "bg-blue-400",    border: "border-blue-800" },
  code:       { label: "Code",         color: "bg-cyan-900 text-cyan-300 border border-cyan-700",          dot: "bg-cyan-400",    border: "border-cyan-800" },
  offline:    { label: "Offline",      color: "bg-slate-700 text-slate-300 border border-slate-500",       dot: "bg-slate-400",   border: "border-slate-600" },
};

const phaseStatusConfig = {
  complete:   { bg: "bg-[#0d0d1a]", border: "border-emerald-900", heading: "text-emerald-300" },
  inprogress: { bg: "bg-[#0d0d1a]", border: "border-amber-900",   heading: "text-amber-300" },
  todo:       { bg: "bg-[#0d0d1a]", border: "border-slate-700",   heading: "text-slate-300" },
  future:     { bg: "bg-[#0d0d1a]", border: "border-purple-800",  heading: "text-purple-300" },
  cowork:     { bg: "bg-[#0d0d1a]", border: "border-blue-800",    heading: "text-blue-300" },
  code:       { bg: "bg-[#0d0d1a]", border: "border-cyan-800",    heading: "text-cyan-300" },
};

// ─── Component ────────────────────────────────────────────────────────────────
export default function MajesticTracker() {
  const [filter, setFilter] = useState("all");
  const [expanded, setExpanded] = useState(() => {
    const init = {};
    tasks.forEach((_, i) => { init[i] = false; });
    tasks.forEach((p, i) => { if (p.status === "inprogress") init[i] = true; });
    return init;
  });
  const [planOpen, setPlanOpen] = useState(true);
  const [doneState, setDoneState] = useState(() => {
    const init = {};
    tasks.flatMap(p => p.items).forEach(item => { init[item.id] = item.done; });
    return init;
  });

  const toggleDone = (id, e) => {
    e.stopPropagation();
    setDoneState(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const allItems = tasks.flatMap(p => p.items);
  const totalTasks   = allItems.length;
  const completedTasks  = allItems.filter(i => i.status === "complete").length;
  const inProgressTasks = allItems.filter(i => i.status === "inprogress").length;
  const todoTasks       = allItems.filter(i => i.status === "todo").length;
  const progress = Math.round((completedTasks / totalTasks) * 100);

  const todayItems   = allItems.filter(i => i.today);
  const tonightItems = todayItems.filter(i => i.offline);
  const chatItems    = todayItems.filter(i => i.mode === "chat");
  const coworkItems  = todayItems.filter(i => i.mode === "cowork");

  const taskMap = {};
  allItems.forEach(item => { taskMap[item.id] = item.task; });

  const filteredTasks = tasks.map(phase => ({
    ...phase,
    items: (() => {
      if (filter === "today")   return phase.items.filter(i => i.today);
      if (filter === "offline") return phase.items.filter(i => i.offline && i.status !== "complete");
      if (filter !== "all")     return phase.items.filter(i => i.status === filter);
      return phase.items;
    })()
  })).filter(phase => phase.items.length > 0);

  const flags = [
    { text: "Sound design spec (#158) needed before audio assets can be sourced — write spec first", severity: "amber" },
    { text: "Dig Deeper spec updated to v2.0 (majestic-dig-deeper-spec-v2.md) — upload to project knowledge and replace v1.0", severity: "amber" },
    { text: "Subscription schema additions (#160) needed before RevenueCat build — add readings_today, subscription_active etc. to profiles table", severity: "amber" },
    { text: "Minor Arcana aura classification still needed (56 cards) — Major Arcana done in cardData.ts", severity: "slate" },
    { text: "Luke's font confirmed: Remachine Script at app/assets/fonts/RemachineScript.woff2 — remove stale flag from _flags.md", severity: "slate" },
  ];

  return (
    <div className="min-h-screen font-sans" style={{ background: "#090910" }}>

      {/* ── Header ── */}
      <div style={{ background: "linear-gradient(160deg, #0f0f1f 0%, #1a1a2e 60%, #12082a 100%)" }} className="px-6 py-10 border-b border-purple-900">
        <div className="max-w-4xl mx-auto">
          <p className="text-purple-400 text-xs tracking-[0.25em] uppercase mb-1 font-mono">Project Tracker — v4</p>
          <h1 className="text-4xl font-bold tracking-tight mb-1" style={{ color: "#c8b8e8", fontFamily: "Georgia, serif" }}>Majestic</h1>
          <p className="text-purple-400 italic text-sm mb-8" style={{ fontFamily: "Georgia, serif" }}>Your adventure. But Majestic.</p>

          {/* Progress bar */}
          <div className="mb-2 flex justify-between text-xs text-slate-400 font-mono">
            <span>{completedTasks} of {totalTasks} tasks complete</span>
            <span style={{ color: "#9500FF" }}>{progress}%</span>
          </div>
          <div className="w-full rounded-full h-1.5 mb-5" style={{ background: "#1e1e2e" }}>
            <div className="h-1.5 rounded-full transition-all duration-700" style={{ width: `${progress}%`, background: "linear-gradient(90deg, #9500FF, #6ECFCF)" }} />
          </div>
          <div className="flex gap-6 flex-wrap mb-8">
            {[["bg-emerald-400", completedTasks + " complete"], ["bg-amber-400", inProgressTasks + " in progress"], ["bg-slate-500", todoTasks + " to do"]].map(([dot, label]) => (
              <div key={label} className="flex items-center gap-2">
                <div className={"w-1.5 h-1.5 rounded-full " + dot} />
                <span className="text-xs text-slate-400 font-mono">{label}</span>
              </div>
            ))}
          </div>

          {/* ── Tonight & Tomorrow Plan ── */}
          <div className="mb-6 rounded-lg border border-yellow-900 overflow-hidden" style={{ background: "#0f0e00" }}>
            <button onClick={() => setPlanOpen(p => !p)} className="w-full px-4 py-3 flex items-center justify-between hover:opacity-80 transition-opacity">
              <span className="text-xs font-mono font-bold tracking-widest uppercase text-yellow-300">⭐ Tonight & Tomorrow — Action Plan</span>
              <span className="text-yellow-700 text-xs">{planOpen ? "▲" : "▼"}</span>
            </button>
            {planOpen && (
              <div className="px-4 pb-4 space-y-4 border-t border-yellow-900">
                {tonightItems.length > 0 && (
                  <div className="mt-3">
                    <p className="text-xs font-mono text-orange-400 tracking-widest uppercase mb-2">Tonight — Offline (no Claude needed)</p>
                    <div className="space-y-1">
                      {tonightItems.map(item => (
                        <div key={item.id} className="flex items-start gap-2 text-xs font-mono text-orange-300">
                          <span className="flex-shrink-0 mt-0.5 text-orange-500">⚡</span>
                          <span><span className="text-orange-600 mr-1">#{item.id}</span>{item.task}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
                {chatItems.length > 0 && (
                  <div>
                    <p className="text-xs font-mono text-indigo-400 tracking-widest uppercase mb-2">Tomorrow — Chat with Claude</p>
                    <div className="space-y-1">
                      {chatItems.map(item => (
                        <div key={item.id} className="flex items-start gap-2 text-xs font-mono text-indigo-300">
                          <span className="flex-shrink-0 mt-0.5 text-indigo-500">💬</span>
                          <span><span className="text-indigo-600 mr-1">#{item.id}</span>{item.task}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
                {coworkItems.length > 0 && (
                  <div>
                    <p className="text-xs font-mono text-violet-400 tracking-widest uppercase mb-2">Tomorrow — Cowork with Claude</p>
                    <div className="space-y-1">
                      {coworkItems.map(item => (
                        <div key={item.id} className="flex items-start gap-2 text-xs font-mono text-violet-300">
                          <span className="flex-shrink-0 mt-0.5 text-violet-500">🖥</span>
                          <span><span className="text-violet-600 mr-1">#{item.id}</span>{item.task}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Flags */}
          <div className="space-y-2">
            <p className="text-xs text-slate-500 font-mono tracking-widest uppercase mb-2">⚠ Flags requiring attention</p>
            {flags.map((f, i) => (
              <div key={i} className={`flex items-start gap-2 px-3 py-2 rounded text-xs font-mono ${f.severity === "amber" ? "bg-amber-950 border border-amber-800 text-amber-300" : "bg-slate-900 border border-slate-700 text-slate-400"}`}>
                <span className="mt-0.5 flex-shrink-0">{f.severity === "amber" ? "⚠" : "→"}</span>
                <span>{f.text}</span>
              </div>
            ))}
          </div>

          {/* Mode legend */}
          <div className="mt-5 flex gap-3 flex-wrap">
            <p className="text-xs text-slate-600 font-mono self-center">Mode:</p>
            {Object.entries(modeConfig).map(([key, cfg]) => (
              <span key={key} className={"text-xs px-2 py-0.5 rounded font-mono font-medium border " + cfg.color}>{cfg.label}</span>
            ))}
            <span className="text-xs px-2 py-0.5 rounded font-mono font-medium border bg-yellow-950 text-yellow-300 border-yellow-800">Tonight/Tomorrow</span>
            <span className="text-xs px-2 py-0.5 rounded font-mono font-medium border bg-slate-900 text-slate-400 border-slate-600">⚡ Offline OK</span>
          </div>
        </div>
      </div>

      {/* ── Filter bar ── */}
      <div className="sticky top-0 z-10 border-b border-slate-800" style={{ background: "#0d0d1a" }}>
        <div className="max-w-4xl mx-auto px-6 py-3 flex gap-2 flex-wrap">
          {[
            ["all", "All"],
            ["today", "⭐ Tonight/Tomorrow"],
            ["offline", "⚡ Offline"],
            ["inprogress", "In Progress"],
            ["todo", "To Do"],
            ["complete", "Complete"],
          ].map(([f, label]) => (
            <button key={f} onClick={() => setFilter(f)}
              className={"px-3 py-1.5 rounded text-xs font-mono font-medium transition-all " + (filter === f ? "text-white" : "text-slate-400 hover:text-slate-200")}
              style={filter === f ? { background: f === "today" ? "#7a6000" : f === "offline" ? "#7a3800" : "#9500FF" } : { background: "#1e1e2e" }}>
              {label}
            </button>
          ))}
        </div>
      </div>

      {/* ── Phase list ── */}
      <div className="max-w-4xl mx-auto px-6 py-6 space-y-3">
        {filteredTasks.map((phase, phaseIndex) => {
          const originalIndex = tasks.findIndex(t => t.phase === phase.phase);
          const cfg = phaseStatusConfig[phase.status] || phaseStatusConfig["todo"];
          const isOpen = expanded[originalIndex];
          const phaseComplete = phase.items.filter(i => i.status === "complete").length;
          return (
            <div key={phaseIndex} className={"rounded-lg border overflow-hidden " + cfg.border + " " + cfg.bg}>
              <button onClick={() => setExpanded(prev => ({ ...prev, [originalIndex]: !prev[originalIndex] }))}
                className="w-full px-5 py-4 flex items-center justify-between hover:opacity-80 transition-opacity text-left">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-3 flex-wrap mb-1">
                    <span className={"text-sm font-bold font-mono " + cfg.heading}>{phase.phase}</span>
                    <span className={"text-xs px-2 py-0.5 rounded font-mono font-medium " + statusConfig[phase.status].color}>
                      {statusConfig[phase.status].label}
                    </span>
                  </div>
                  <p className="text-xs text-slate-600 font-mono">{phase.estimate}</p>
                </div>
                <div className="flex items-center gap-3 ml-3 flex-shrink-0">
                  <span className="text-xs text-slate-500 font-mono">{phaseComplete}/{phase.items.length}</span>
                  <span className="text-slate-600 text-xs">{isOpen ? "▲" : "▼"}</span>
                </div>
              </button>

              {isOpen && (
                <div className="px-5 pb-4 space-y-1.5">
                  {phase.items.map(item => {
                    const s = statusConfig[item.status] || statusConfig["todo"];
                    const m = modeConfig[item.mode];
                    const isChecked = doneState[item.id];
                    const incompleteDeps = item.dependsOn.filter(depId => {
                      const dep = allItems.find(i => i.id === depId);
                      return dep && dep.status !== "complete";
                    });
                    const completeDeps = item.dependsOn.filter(depId => {
                      const dep = allItems.find(i => i.id === depId);
                      return dep && dep.status === "complete";
                    });

                    return (
                      <div key={item.id} className={"flex items-start gap-3 p-3 rounded border " + s.border + (item.today ? " ring-1 ring-yellow-800" : "")} style={{ background: item.today ? "#0e0d00" : "#111120" }}>

                        {/* Checkbox */}
                        <button
                          onClick={(e) => toggleDone(item.id, e)}
                          className={"flex-shrink-0 mt-0.5 w-4 h-4 rounded border flex items-center justify-center transition-all " + (isChecked ? "bg-emerald-700 border-emerald-500" : "border-slate-600 hover:border-slate-400")}
                          title={isChecked ? "Mark as not done" : "Mark as done — tell Claude to verify"}
                        >
                          {isChecked && <span className="text-white text-xs leading-none">✓</span>}
                        </button>

                        <div className="flex-1 min-w-0">
                          {/* Top row: task name + badges */}
                          <div className="flex items-start justify-between gap-2 flex-wrap">
                            <p className={"text-sm font-medium flex-1 " + (item.status === "complete" ? "text-slate-500 line-through" : "text-slate-200")}>
                              <span className="text-slate-600 text-xs font-mono mr-1.5">#{item.id}</span>
                              {item.task}
                            </p>
                            <div className="flex items-center gap-1.5 flex-shrink-0 flex-wrap justify-end">
                              {item.today && (
                                <span className="text-xs px-1.5 py-0.5 rounded font-mono font-bold border bg-yellow-950 text-yellow-300 border-yellow-800">⭐ TODAY</span>
                              )}
                              <span className={"text-xs px-1.5 py-0.5 rounded font-mono font-medium " + s.color}>{s.label}</span>
                              {m && <span className={"text-xs px-1.5 py-0.5 rounded font-mono font-medium " + m.color}>{m.label}</span>}
                              {item.offline && item.status !== "complete" && (
                                <span className="text-xs px-1.5 py-0.5 rounded font-mono border bg-slate-900 text-slate-400 border-slate-700">⚡ offline</span>
                              )}
                            </div>
                          </div>

                          {/* Note */}
                          {item.note && <p className="text-xs text-slate-500 mt-1 font-mono leading-relaxed">{item.note}</p>}

                          {/* Dependencies */}
                          {item.status !== "complete" && (incompleteDeps.length > 0 || completeDeps.length > 0) && (
                            <div className="mt-1.5 flex flex-wrap gap-1">
                              {incompleteDeps.map(depId => (
                                <span key={depId} className="text-xs font-mono px-1.5 py-0.5 rounded border bg-amber-950 text-amber-400 border-amber-800">
                                  ↳ needs #{depId} {taskMap[depId] ? `— ${taskMap[depId].substring(0, 40)}${taskMap[depId].length > 40 ? "…" : ""}` : ""}
                                </span>
                              ))}
                              {completeDeps.map(depId => (
                                <span key={depId} className="text-xs font-mono px-1.5 py-0.5 rounded border bg-slate-900 text-slate-600 border-slate-800">
                                  ✓ #{depId} done
                                </span>
                              ))}
                            </div>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}
      </div>

      <div className="max-w-4xl mx-auto px-6 py-8 text-center">
        <p className="text-xs font-mono" style={{ color: "#9500FF" }}>You trusted yourself. Remember this.</p>
      </div>
    </div>
  );
}
