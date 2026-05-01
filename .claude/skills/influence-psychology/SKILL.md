---
name: influence-psychology
description: Apply ethical persuasion principles to product design and marketing. Use when designing sign-up flows, pricing pages, CTAs, social proof sections, or onboarding. Trigger on "how do we get more sign-ups", "social proof", "urgency", "trust signals", or "persuasion". Always apply ethically — no dark patterns.
metadata:
  author: wondelai
  version: "1.0.0"
---

# Influence Psychology

Six (+ one) principles of ethical persuasion based on Robert Cialdini's research. People use mental shortcuts (heuristics) that can be triggered to influence behavior — use these to help users make decisions that are genuinely good for them.

## Core Principle

"People don't make decisions rationally." They use mental shortcuts triggered by social context, authority, commitment, and scarcity.

Ethical boundary: Persuasion serves the user's genuine interest. Manipulation serves the persuader's interest at the user's expense.

## The Seven Principles

### 1. Reciprocity

Give first. People feel obligated to return favors.

| Application | Example |
|-------------|---------|
| Lead magnets | Free guide → email capture |
| Free tools | Free calculator → product awareness |
| Trials | 14-day free trial → conversion |
| Unexpected value | Surprise upgrade → loyalty |

**Ethical**: Give genuine value. **Unethical**: Give worthless "gift" to create false obligation.

### 2. Commitment & Consistency

People want to act consistently with their stated commitments. Small commitments lead to larger ones.

| Application | Example |
|-------------|---------|
| Onboarding micro-commitments | "Set your goal" before showing features |
| Profile completion | LinkedIn strength meter |
| Public commitments | "Share your goal" |
| Foot-in-the-door | Free tier → paid upgrade |

**Ethical**: Help users commit to things they genuinely want. **Unethical**: Trap users in commitments they didn't understand.

### 3. Social Proof

People follow the crowd — especially in uncertain situations and from people similar to themselves.

| Type | Application |
|------|-------------|
| Numbers | "10,000+ teams use this" |
| Testimonials | Specific, named, with photo |
| Logos | "Trusted by" company logos |
| Ratings | Star ratings, review counts |
| Usage data | "Most popular plan" |
| Similar users | "Teams like yours choose..." |

**Specificity beats vagueness**: "4.2 hours saved per week" > "saves time"

**Ethical**: Show real social proof. **Unethical**: Fabricate reviews, fake user counts.

### 4. Authority

People defer to credible experts. Establish credibility before asking for commitment.

| Application | Example |
|-------------|---------|
| Expert endorsements | "Recommended by Forbes" |
| Certifications | Security badges, ISO certifications |
| Case studies | Named company, specific results |
| Author/team credentials | "Built by ex-Google engineers" |
| Data | "Based on analysis of 1M+ users" |

**Ethical**: Legitimate credentials only. **Unethical**: Fake badges, misleading claims.

### 5. Liking

People say yes to those they like. People like those who are similar, complimentary, and familiar.

| Application | Example |
|-------------|---------|
| Brand personality | Conversational tone, humor |
| Similarity | "We're a remote team too" |
| Shared values | Sustainability, community |
| Genuine compliments | Progress celebrations |
| Familiarity | Consistent branding, repeated touchpoints |

### 6. Scarcity

People want what's rare or becoming unavailable.

| Type | Application |
|------|-------------|
| Limited quantity | "Only 3 spots remaining" (if true) |
| Limited time | Beta access, early pricing |
| Exclusive access | Invite-only, waitlist |
| Natural scarcity | Capacity limits |

**Ethical**: Only use when scarcity is real. **Unethical**: Fake countdown timers, fabricated limited quantities.

### 7. Unity (Cialdini's 7th)

People say yes to those they consider part of "us" (shared identity).

| Application | Example |
|-------------|---------|
| Community | "Join 50,000 indie makers" |
| Co-creation | Involve users in roadmap |
| Shared identity | Reference customer's industry/role |
| Exclusivity | "For designers, by designers" |

## Ethical Application Checklist

Before deploying any principle, verify:
- [ ] Is the claim **true**? (No fake reviews, real scarcity only)
- [ ] Is the information **transparent**? (No hidden costs or commitments)
- [ ] Is the action **reversible**? (Easy cancel, refund policy clear)
- [ ] Does this **respect autonomy**? (User can decline without penalty)
- [ ] Would you be comfortable if the user saw your thinking?

## Dark Patterns to Avoid

- Fake countdown timers
- Fabricated user counts or reviews
- Hidden cancellation flows
- Pre-checked opt-ins
- Confirm-shaming ("No thanks, I don't want to grow")
- Roach motel (easy in, impossible out)

## Quick Diagnostic

| Question | If No → Action |
|----------|----------------|
| Is your social proof specific and verifiable? | Replace vague claims with named testimonials |
| Is any scarcity you show actually real? | Remove or delay fake urgency |
| Are authority signals legitimate? | Audit all badges and claims |
| Can users easily reverse any commitment? | Audit cancellation and refund flows |
| Would you use these tactics on your family? | Remove any that answer "no" |

## Reference

Based on *Influence* and *Pre-Suasion* by Robert B. Cialdini. See also CRO Methodology for applying these principles to conversion optimization.
