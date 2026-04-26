---
name: lean-startup
description: Apply Build-Measure-Learn to validate assumptions quickly and avoid building things nobody wants. Use when planning product development, designing experiments, evaluating product-market fit, or deciding whether to pivot or persevere. Trigger on "MVP", "how do we validate this", "are we building the right thing", or "product-market fit".
metadata:
  author: wondelai
  version: "1.0.0"
---

# Lean Startup

Framework for validated learning through rapid experimentation. Build as little as possible to learn as much as possible.

## Core Principle

"Entrepreneurs are everywhere." Build → Measure → Learn as fast as possible. **Validated learning** — evidence from real customer behavior — is the only measure of progress.

## The Build-Measure-Learn Loop

```
        BUILD
       ↗     ↘
  IDEAS       PRODUCT
  ↑               ↓
  LEARN       DATA
       ↖     ↙
        MEASURE
```

**The goal**: minimize the total time through the loop, not the time to build.

## Leap-of-Faith Assumptions

Before building, identify and rank your riskiest assumptions:

1. **Value hypothesis**: Does this create real value for customers?
2. **Growth hypothesis**: Will customers tell others / will this spread?

Test the riskiest assumption first. Everything else is premature.

## MVP Types

| MVP Type | What It Tests | Example |
|----------|--------------|---------|
| **Smoke test** | Demand (will anyone want this?) | Landing page with "Buy Now" that captures emails |
| **Concierge** | Value (does doing this manually deliver value?) | Zappos founder photographed shoes from stores |
| **Wizard of Oz** | Feasibility + value (simulate automation manually) | Early Airbnb manually processed bookings |
| **Single feature** | Core value proposition in isolation | Gmail launched invite-only with just email |

## Innovation Accounting

Replace vanity metrics with **actionable metrics**:

| Vanity Metric | Actionable Alternative |
|---------------|----------------------|
| Total sign-ups | % of sign-ups who complete key action |
| Page views | Retention cohorts |
| Total revenue | Revenue per customer by acquisition channel |
| App downloads | Daily/weekly active users |

Progress = moving from baseline → target on actionable metrics, per cohort.

## Pivot or Persevere

Review decision: Are you making progress on validated learning?

**Pivot types:**
- **Zoom-in pivot**: One feature becomes the whole product
- **Zoom-out pivot**: Whole product becomes one feature
- **Customer segment pivot**: Same product, different customer
- **Customer need pivot**: Different problem for same customer
- **Platform pivot**: Application → platform (or vice versa)
- **Business architecture pivot**: High margin/low volume ↔ Low margin/high volume

**Persevere** when: you're making validated learning progress, cohort metrics improving, leading indicators moving.

**Pivot** when: metrics are flat, validated learning is negative, you've run out of iterations on this hypothesis.

## Three Engines of Growth

| Engine | How It Works | Key Metric |
|--------|-------------|------------|
| **Sticky** | Retain more than you churn | Retention rate / churn rate |
| **Viral** | Each customer brings others | Viral coefficient (>1 = viral) |
| **Paid** | Revenue per customer > acquisition cost | LTV / CAC ratio |

## Five Whys

For every problem, ask "Why?" five times. The root cause is usually a human/process failure, not a technical one.

Root cause → systematic fix. Symptom → band-aid.

## Common Mistakes

| Mistake | Fix |
|---------|-----|
| Building too much before validating | Define the smallest test that proves/disproves the assumption |
| Measuring vanity metrics | Define actionable metrics per cohort before building |
| Not talking to customers | Minimum 5 customer conversations before building anything |
| Mistaking activity for progress | Progress = validated learning, not features shipped |
| Pivoting too quickly | Give each direction enough time to get signal |

## Quick Diagnostic

| Question | If No → Action |
|----------|----------------|
| Have you identified your riskiest assumption? | List all assumptions; rank by risk |
| Is your MVP the minimum needed to test it? | What can you cut and still get signal? |
| Are your metrics actionable (not vanity)? | Define what "learning" looks like before building |
| Have you spoken to 5+ customers this week? | Schedule customer conversations |
| Is each experiment proving/disproving one thing? | One variable per experiment |

## Reference

Based on *The Lean Startup* by Eric Ries and *The Startup Owner's Manual* by Steve Blank.
