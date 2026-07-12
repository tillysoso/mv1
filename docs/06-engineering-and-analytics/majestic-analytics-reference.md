# Analytics Reference — Majestic GA4

This document is the source of truth for every Google Analytics 4 event fired
by the Majestic web build. All tracking is implemented in
`src/lib/analytics/index.ts` and is a no-op on native (iOS / Android) builds.

---

## Setup

GA4 is injected via `app/+html.tsx` (Expo Router's web HTML shell).
Replace the placeholder Measurement ID before deploying:

```
// app/+html.tsx
const GA_MEASUREMENT_ID = 'G-XXXXXXXXXX'; // ← your real ID here
```

`send_page_view: false` is set in the gtag config so that manual `page_view`
events (fired from `_layout.tsx`) are the single source of page tracking and
there are no duplicates on initial load.

---

## Events

### `page_view`
Fires on every route change via `usePathname()` in `app/_layout.tsx`.

| Parameter      | Type   | Example          |
|----------------|--------|------------------|
| `page_location`| string | `/personality`   |
| `page_title`   | string | _(currently undefined; set when titles are added)_ |

**Source:** `app/_layout.tsx` → `usePageTracking()`

---

### `navigation_click`
Fires when a user taps any CTA or navigation element that triggers a route
change. Also fires on tab bar presses.

| Parameter   | Type   | Example                  |
|-------------|--------|--------------------------|
| `item_name` | string | `begin_cta`              |
| `destination` | string | `/name`               |

**Firing locations:**

| Screen            | `item_name`           | `destination`  |
|-------------------|-----------------------|----------------|
| Entry (`/`)       | `begin_cta`           | `/name`        |
| Personality       | `continue_cta`        | `/soul`        |
| Soul              | `continue_cta`        | `/profile`     |
| Profile           | `enter_the_world_cta` | `/quiz`        |
| Confirm           | `lets_begin_cta`      | `/first-draw`  |
| First Draw        | `draw_cta`            | `/(tabs)`      |
| Recommendation    | `choose_avatar_cta`   | `/confirm`     |
| Tab bar (any tab) | `tab_bar`             | Expo route key |

---

### `form_submit`
Fires when an onboarding input form is successfully submitted.

| Parameter   | Type   | Example                       |
|-------------|--------|-------------------------------|
| `form_id`   | string | `name_entry`                  |
| `form_name` | string | `onboarding_name`             |

**Firing locations:**

| Screen | `form_id`     | `form_name`                  |
|--------|---------------|------------------------------|
| Name   | `name_entry`  | `onboarding_name`            |
| DOB    | `dob_entry`   | `onboarding_date_of_birth`   |

---

### `quiz_answer_selected`
Fires on each quiz option selection in `/quiz`.

| Parameter         | Type   | Example                              |
|-------------------|--------|--------------------------------------|
| `question_index`  | number | `0` (zero-based)                     |
| `answer_text`     | string | `"Take the most interesting one home…"` |
| `avatar_affinity` | string | `olivia`                             |

**Source:** `app/(onboarding)/quiz.tsx` → `handleSelect()`

---

### `select_content`
Fires when a user selects an item from a content/component listing.
Currently wired to the avatar selection grid on `/recommendation`.

| Parameter      | Type   | Example    |
|----------------|--------|------------|
| `content_type` | string | `avatar`   |
| `item_id`      | string | `destiny`  |

**Source:** `app/(onboarding)/recommendation.tsx` → avatar card `onPress`

**Future wiring points:**
- Card listing screens (tarot card grid) — use `content_type: "tarot_card"`, `item_id: card.id`

---

### `scroll_depth`
Fires once per threshold (25 / 50 / 75 / 100 %) per screen mount.

| Parameter          | Type   | Example         |
|--------------------|--------|-----------------|
| `percent_scrolled` | number | `75`            |
| `page_path`        | string | `/personality`  |

**Implementation:** `src/lib/analytics/useScrollDepth.ts`

- **Web:** passive `window.scroll` listener (fires when the page body scrolls).
- **Native:** the hook also returns `{ onScroll, scrollEventThrottle: 400 }`
  which can be spread onto any `<ScrollView>` to track native scroll events.

**Currently active on:**

| Screen         | Path             |
|----------------|------------------|
| Personality    | `/personality`   |
| Soul           | `/soul`          |
| Profile        | `/profile`       |
| Recommendation | `/recommendation`|

**To add to a new screen:**
```tsx
import { useScrollDepth } from '../../src/lib/analytics/useScrollDepth';

// Inside the component:
const scrollDepthProps = useScrollDepth('/your-path');

// For a ScrollView (native + web):
<ScrollView {...scrollDepthProps}>…</ScrollView>
```

---

### `copy_to_clipboard`
Ready to wire — not yet fired in production screens.

| Parameter      | Type   | Example         |
|----------------|--------|-----------------|
| `content_type` | string | `card_name`     |
| `item_id`      | string | `major-17`      |

**To wire on a copy action:**
```tsx
import { trackCopyToClipboard } from '../../src/lib/analytics';
import * as Clipboard from 'expo-clipboard';

async function handleCopy(text: string, itemId: string) {
  await Clipboard.setStringAsync(text);
  trackCopyToClipboard('card_name', itemId);
}
```

---

### `search`
Ready to wire — not yet fired in production screens.

| Parameter     | Type   | Example  |
|---------------|--------|----------|
| `search_term` | string | `tower`  |
| `result_count`| number | `3`      |

**To wire on a search input:**
```tsx
import { trackSearch } from '../../src/lib/analytics';

function handleSearch(term: string, results: TarotCard[]) {
  trackSearch(term, results.length);
}
```

---

### `filter_applied`
Ready to wire — not yet fired in production screens.

| Parameter      | Type   | Example        |
|----------------|--------|----------------|
| `filter_type`  | string | `aura_context` |
| `filter_value` | string | `shadow`       |

**To wire on a filter control:**
```tsx
import { trackFilterApplied } from '../../src/lib/analytics';

function handleFilter(type: string, value: string) {
  trackFilterApplied(type, value);
}
```

---

## GA4 Naming Conventions Used

All custom event names follow GA4 rules:
- Lowercase letters, digits, and underscores only
- Starts with a letter
- Max 40 characters
- No spaces

Reserved GA4 event names used as-is: `page_view`, `select_content`, `search`.

---

## Adding New Events

1. Add a typed wrapper function to `src/lib/analytics/index.ts`.
2. Call it at the interaction site — keep the call on the same line as the
   action (e.g. inside `onPress`, not in a `useEffect`).
3. Document the new event in this file.
4. Verify in GA4 DebugView (`?gtag_debug=1` query param on web) before shipping.
