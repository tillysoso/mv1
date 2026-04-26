---
name: ux-heuristics
description: Evaluate interfaces against proven usability principles. Use when auditing existing UI, reviewing designs before shipping, or identifying why users struggle with a feature. Trigger on "users are confused by", "usability audit", "heuristic evaluation", "why is this hard to use", or "UI review".
metadata:
  author: wondelai
  version: "1.0.0"
---

# UX Heuristics

Usability evaluation framework combining Steve Krug's "Don't Make Me Think" principles with Nielsen's 10 Heuristics. Rate severity 0–4 and fix in priority order.

## Core Principle

**"Don't Make Me Think"** — interfaces should be self-evident. Users should never have to ask "What is this?" or "What does this do?"

Krug's Three Laws:
1. **Clarity over cleverness** — obvious always beats clever
2. **Confidence beats click count** — one click that feels right > two clicks that feel uncertain
3. **Brevity respects user time** — if in doubt, cut it out

## Nielsen's 10 Heuristics

| # | Heuristic | Description |
|---|-----------|-------------|
| 1 | **Visibility of system status** | Always tell users what's happening (loading, success, error) |
| 2 | **Match real world** | Use words and concepts the user knows, not system language |
| 3 | **User control & freedom** | Clearly marked emergency exits; undo & redo |
| 4 | **Consistency & standards** | Same word, same action, always — follow platform conventions |
| 5 | **Error prevention** | Design to prevent problems before they happen |
| 6 | **Recognition over recall** | Show options; don't make users remember |
| 7 | **Flexibility & efficiency** | Shortcuts for expert users; novices can ignore them |
| 8 | **Aesthetic & minimalist design** | Every extra element competes with relevant information |
| 9 | **Help users recognize errors** | Error messages in plain language, with a solution |
| 10 | **Help & documentation** | When needed, it's searchable and task-focused |

## Severity Rating Scale

| Level | Description | Priority |
|-------|-------------|----------|
| **0** | Cosmetic only — fix if time allows | Low |
| **1** | Minor usability problem — low priority | Low |
| **2** | Minor usability problem — should fix | Medium |
| **3** | Major usability problem — important to fix | High |
| **4** | Usability catastrophe — must fix before shipping | Critical |

## The Trunk Test

Open any page on your site. Without reading anything, answer:
- What site/app is this?
- What page am I on?
- What are the major sections?
- What can I do here?
- Where can I go from here?
- Where am I in the hierarchy?

If users can't answer these without reading content, navigation/hierarchy needs work.

## Quick Diagnostic Checklist

**Visibility (Heuristic 1):**
- [ ] Loading states for all async operations
- [ ] Success confirmation after key actions
- [ ] Progress indicators for multi-step flows
- [ ] Error states that explain what went wrong

**Language (Heuristic 2):**
- [ ] No jargon or technical terms in user-facing copy
- [ ] Labels match the user's mental model, not the system's
- [ ] Error messages in plain language

**Control (Heuristic 3):**
- [ ] Clear way to undo any action
- [ ] Confirmation dialogs for destructive actions
- [ ] Easy way to cancel or go back

**Consistency (Heuristic 4):**
- [ ] Same term used for same concept throughout
- [ ] Same action always produces same result
- [ ] Platform conventions followed

**Error Prevention (Heuristic 5):**
- [ ] Form validation before submission
- [ ] Inline validation as user types
- [ ] Constraints that prevent invalid input

**Recognition (Heuristic 6):**
- [ ] Visible options (don't hide actions behind cryptic icons)
- [ ] Form defaults and examples shown
- [ ] Previously visited paths visible

## Common Dark Patterns (Fail Heuristics)

- Confirm-shaming ("No thanks, I want to stay uninformed")
- Hidden unsubscribe links
- Pre-checked opt-ins
- Bait-and-switch pricing
- Forced continuity (free trial to auto-paid)
- Roach motel (easy in, impossible out)

## Reference

Based on Steve Krug's *Don't Make Me Think* and Jakob Nielsen's 10 Usability Heuristics. For visual design evaluation, see refactoring-ui.
