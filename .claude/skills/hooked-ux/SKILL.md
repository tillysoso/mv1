---
name: hooked-ux
description: Design habit-forming product loops using the Hook Model. Use when designing onboarding, retention features, or engagement mechanics. Trigger on "why aren't users coming back", "habit formation", "user retention", "engagement loops", "notifications strategy", or "daily active users". Evaluate ethics using the Manipulation Matrix.
metadata:
  author: wondelai
  version: "1.0.0"
---

# Hook Model

Framework for building habit-forming products. Use with ethical care — the Manipulation Matrix applies.

## Core Principle

"The anticipation of reward — not the reward itself — creates dopamine."

Habits form when a behavior becomes automatic in response to a cue, without deliberate decision-making.

## The Four Phases of the Hook

```
TRIGGER → ACTION → VARIABLE REWARD → INVESTMENT → (repeat)
```

### Phase 1: Trigger

**External triggers** (early): notifications, emails, ads, word-of-mouth — tell users what to do next.

**Internal triggers** (goal): emotions or situations automatically linked to the product. Boredom → Instagram. Loneliness → Facebook. The goal is to become the internal trigger.

**Map internal triggers**: What emotions precede product use? What situation creates the itch the product scratches?

### Phase 2: Action

**Fogg's Behavior Model**: Behavior = Motivation × Ability × Trigger

The action must be the **simplest possible behavior** in anticipation of reward.

Reduce friction before adding motivation:
- Reduce steps to minimum
- Remove required registration
- Enable without account
- Pre-fill forms
- Use social login

Heuristics for ability: time, money, physical effort, cognitive effort, social deviance, non-routine.

### Phase 3: Variable Reward

**Why variable?** Predictable rewards create satiation. Variability creates anticipation.

Three types:
| Type | Reward | Example |
|------|--------|---------|
| **Tribe** | Social acceptance, connection | Likes, comments, upvotes |
| **Hunt** | Resources, information | Scroll feed, search results |
| **Self** | Completion, mastery, control | Streaks, achievements, inbox zero |

Combine types. Preserve the element of mystery and variability.

### Phase 4: Investment

Users invest time, data, effort, or social capital — increasing the value of the product and making it harder to leave.

Types of investment:
- **Data**: playlist, history, preferences
- **Content**: posts, photos, work created
- **Followers**: social graph, reputation
- **Skills**: learned features, workflows
- **Commitment**: customized settings

Investment also **loads the next trigger**: calendar invite → reminder notification.

## The Habit Zone

For a behavior to become a habit:
1. High frequency of use (at minimum weekly)
2. Perceived utility (user gets real value)

If either is missing, the product won't form habits naturally.

**Habit Testing:**
1. Define habitual users (e.g., use 3x in first 7 days)
2. Look for ≥5% of users becoming habitual
3. Identify what habitual users have in common → replicate in onboarding

## The Manipulation Matrix

Ask two questions before using the Hook Model:
1. **Does the product improve users' lives?**
2. **Would I use this product myself?**

| Improves lives | Use myself | You are |
|---------------|------------|---------|
| Yes | Yes | **Facilitator** — build freely |
| Yes | No | **Peddler** — check your assumptions |
| No | Yes | **Entertainer** — acceptable but watch for harm |
| No | No | **Dealer** — stop. You're building harm. |

Ethical design: only build hooks for products you'd recommend to people you love.

## Common Mistakes

| Mistake | Fix |
|---------|-----|
| External triggers that don't load internal ones | Map the emotional state you want to own |
| Too much friction before variable reward | Cut every unnecessary step |
| Fixed, predictable rewards | Add variability and personalization |
| No investment phase | Find where users can put something valuable "in" |
| Optimizing for engagement over value | Apply the Manipulation Matrix |

## Quick Diagnostic

| Question | If No → Action |
|----------|----------------|
| What internal trigger does your product own? | Interview users: what emotion precedes use? |
| Is the path to reward under 3 steps? | Remove every unnecessary step |
| Is the reward variable? | Add personalization or randomization |
| Do users invest something valuable each session? | Design an investment mechanic |
| Does this product genuinely improve users' lives? | Apply the Manipulation Matrix honestly |

## Reference

Based on *Hooked: How to Build Habit-Forming Products* by Nir Eyal. See also Drive Motivation for intrinsic motivation design, and improve-retention for retention behavior.
