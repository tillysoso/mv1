---
name: bencium-controlled-ux-designer
description: Expert UI/UX design guidance for unique, accessible interfaces. Use for visual decisions, colors, typography, layouts. Always ask before making design decisions. Use this skill when the user asks to build web components, pages, or applications.
metadata:
  version: 1.0.0
---

# UX Designer

Expert UI/UX design skill that helps create unique, accessible, and thoughtfully designed interfaces. This skill emphasizes design decision collaboration, breaking away from generic patterns, and building interfaces that stand out while remaining functional and accessible.

## Core Philosophy

**CRITICAL: Design Decision Protocol**
- **ALWAYS ASK** before making any design decisions (colors, fonts, sizes, layouts)
- Never implement design changes until explicitly instructed
- The guidelines below are practical guidance for when design decisions are approved
- Present alternatives and trade-offs, not single "correct" solutions

## Foundational Design Principles

### Stand Out From Generic Patterns

**Avoid Generic Training Dataset Patterns:**
- Don't default to "Claude style" designs (excessive bauhaus, liquid glass, apple-like)
- Don't use generic SaaS aesthetics that look machine-generated
- Don't rely only on solid colors - suggest photography, patterns, textures
- Think beyond typical patterns - you can step off the written path

**Draw Inspiration From:**
- Modern landing pages (Perplexity, Comet Browser, Dia Browser)
- Framer templates and their innovative approaches
- Leading brand design studios
- Historical design movements (Bauhaus, Otl Aicher, Braun) - but as inspiration, not imitation
- Beautiful background animations (CSS, SVG) - slow, looping, subtle

**Visual Interest Strategies:**
- Unique color pairs that aren't typical
- Animation effects that feel fresh
- Background patterns that add depth without distraction
- Typography combinations that create contrast
- Visual assets that tell a story

### Core Design Philosophy

1. **Simplicity Through Reduction**
   - Identify the essential purpose and eliminate distractions
   - Begin with complexity, then deliberately remove until reaching the simplest effective solution
   - Every element must justify its existence

2. **Material Honesty**
   - Digital materials have unique properties - embrace them
   - Buttons should communicate affordance through color, spacing, and typography (not shadows)
   - Cards use borders and background differentiation (not depth effects)
   - Animations follow real-world physics principles adapted to digital responsiveness

   **Examples:**
   - Clickable: Use distinct colors, hover state changes, cursor feedback
   - Containers: Use subtle borders (1px), background color shifts, or generous padding
   - Hierarchy: Use scale, weight, and spacing rather than elevation

3. **Functional Layering (Not Visual Depth)**
   - Create hierarchy through typography scale, color contrast, and spatial relationships
   - Layer information conceptually (primary → secondary → tertiary)
   - Reject skeuomorphic shadows/gradients that imitate physical depth
   - Embrace functional depth: modals over content, dropdowns over UI

4. **Obsessive Detail**
   - Consider every pixel, interaction, and transition
   - Excellence emerges from hundreds of small, intentional decisions
   - Balance: Details should serve simplicity, not complexity
   - When detail conflicts with clarity, clarity wins

5. **Coherent Design Language**
   - Every element should visually communicate its function
   - Elements should feel part of a unified system
   - Nothing should feel arbitrary

6. **Invisibility of Technology**
   - The best technology disappears
   - Users should focus on content and goals, not on understanding the interface

### What This Means in Practice

**Color Usage:**
- Base palette: 4-5 neutral shades (backgrounds, borders, text)
- Accent palette: 1-3 bold colors (CTAs, status, emphasis)
- Neutrals are slightly desaturated, warm or cool based on brand intent
- Accents are saturated enough to create clear contrast

**Typography:**
- Headlines: Emotional, attention-grabbing (personality over pure legibility)
- Body/UI: Functional, highly legible (clarity over expression)
- 2-3 typefaces maximum
- Clear mathematical scale (e.g., 1.25x between sizes)

**Animation:**
- Purposeful: Guides attention, establishes relationships, provides feedback
- Subtle: Felt rather than seen (100-300ms for most interactions)
- Physics-informed: Natural easing, appropriate mass/momentum

**Spacing:**
- Generous negative space creates clarity and breathing room
- Mathematical relationships (e.g., 4px base, 8/16/24/32/48px scale)
- Consistent application creates visual rhythm

### Design Decision Checklist

Before presenting any design, verify:

1. **Purpose**: Does every element serve a clear function?
2. **Hierarchy**: Is visual importance aligned with content importance?
3. **Consistency**: Do similar elements look and behave similarly?
4. **Accessibility**: Does it meet WCAG AA standards? (contrast, touch targets, keyboard nav)
5. **Responsiveness**: Does it work on mobile, tablet, desktop?
6. **Uniqueness**: Does this break from generic SaaS patterns?
7. **Approval**: Have I asked before implementing colors, fonts, sizes, layouts?

## Visual Design Standards

### Color & Contrast

**Color System Architecture:**

Every interface needs two color roles:

1. **Base/Neutral Palette (4-5 colors):**
   - Backgrounds (lightest)
   - Surface colors (cards, inputs)
   - Borders and dividers
   - Text (darkest)
   - Use slightly desaturated, warm or cool greys based on brand

2. **Accent Palette (1-3 colors):**
   - Primary action (CTA buttons)
   - Status indicators (success, warning, error, info)
   - Focus/hover states
   - Use saturated colors for clear contrast against neutrals

**Palette Structure Example:**
```
Neutrals: slate-50, slate-100, slate-300, slate-700, slate-900
Accents: teal-500 (primary), amber-500 (warning), red-500 (error)
```

**Color Application Rules:**

- **Backgrounds**: Lightest neutral (slate-50 or white)
- **Text**: Darkest neutral for primary text (slate-900), mid-tone for secondary (slate-600)
- **Buttons (primary)**: Accent color with white text
- **Buttons (secondary)**: Neutral with border and dark text
- **Status indicators**: Specific accent (green=success, red=error, amber=warning, blue=info)
- **Interactive states**:
  - Hover: Darken by 10-15% or shift hue slightly
  - Focus: Use ring/outline in accent color
  - Disabled: Reduce opacity to 40-50% and remove hover effects

**Intentional Color Usage:**
- Every color must serve a purpose (hierarchy, function, status, or action)
- Avoid decorative colors that don't communicate meaning
- Maintain consistency: same color = same meaning throughout

**Accessibility:**
- Ensure sufficient contrast for color-blind users
- Follow WCAG 2.1 AA: minimum 4.5:1 for normal text, 3:1 for large text
- Don't rely on color alone to convey information (add icons or labels)

### Typography Excellence

**Font Selection:**
- Use 2-3 typefaces maximum
- Limit to 3 weights per typeface (e.g., Regular 400, Medium 500, Bold 700)
- Prefer variable fonts for fine-tuned control and performance

**Typographic Scale (1.25x ratio):**
```
xs:   0.64rem (10px)
sm:   0.8rem  (13px)
base: 1rem    (16px)
lg:   1.25rem (20px)
xl:   1.563rem (25px)
2xl:  1.953rem (31px)
3xl:  2.441rem (39px)
4xl:  3.052rem (49px)
5xl:  3.815rem (61px)
```

**Spacing & Readability:**
- Line height: 1.5x font size for body text
- Line length: 45-75 characters optimal
- Letter spacing: Tighter for large text (-0.02em to -0.05em), looser for small (+0.01em to +0.03em)

## Interaction Design

### Motion & Animation

**Timing Guidelines:**
- Micro-interactions (button press, checkbox): 100-150ms
- State changes (accordion, tab switch): 200-300ms
- Page transitions (modal open/close): 300-500ms

**Performance:**
- Animate `transform` and `opacity` only (GPU-accelerated)
- Avoid animating `width`, `height`, `top`, `left`, `margin`
- Implement `@media (prefers-reduced-motion: reduce)`

## Styling Implementation

**Component Library:**
- Prefer shadcn components (v4, `@/components/ui`)
- Use Tailwind utility classes exclusively
- Use `@phosphor-icons/react` for iconography
- Use `sonner` for notifications

**Layout:**
- Use grid/flex wrappers with `gap` for spacing
- Mobile-first responsive design
- Minimum 44x44px touch targets

## Accessibility Standards

- WCAG 2.1 AA compliance required
- Keyboard navigability for all interactive elements
- Semantic HTML for screen reader compatibility
- Visible focus states
- Alternative text for images

## Common Patterns to Avoid

❌ **Don't:**
- Use generic SaaS blue (#3B82F6) without consideration
- Default to shadows and gradients for depth
- Copy Apple's design language
- Use glass morphism effects
- Make design decisions without asking

✅ **Do:**
- Ask before making design decisions
- Suggest unique, contextually appropriate color pairs
- Use flat, minimal design
- Provide immediate feedback for interactions
- Create generous white space
- Test with real devices
- Validate accessibility
