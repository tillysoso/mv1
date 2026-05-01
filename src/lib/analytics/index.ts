import { Platform } from 'react-native';

declare global {
  interface Window {
    gtag: (...args: unknown[]) => void;
    dataLayer: unknown[];
  }
}

function gtag(...args: unknown[]): void {
  if (Platform.OS !== 'web') return;
  if (typeof window === 'undefined' || typeof window.gtag !== 'function') return;
  window.gtag(...args);
}

// ---------------------------------------------------------------------------
// Page tracking
// ---------------------------------------------------------------------------

/** Fire manually on each route change. GA4 auto page_view is disabled in +html.tsx. */
export function trackPageView(path: string, title?: string): void {
  gtag('event', 'page_view', {
    page_location: path,
    page_title: title,
  });
}

// ---------------------------------------------------------------------------
// Navigation clicks
// ---------------------------------------------------------------------------

/**
 * Track a tap/click on any navigation element (CTAs, back buttons, tab bar items).
 * GA4 event: navigation_click
 * Parameters: item_name, destination
 */
export function trackNavigationClick(item_name: string, destination: string): void {
  gtag('event', 'navigation_click', {
    item_name,
    destination,
  });
}

// ---------------------------------------------------------------------------
// Form interactions
// ---------------------------------------------------------------------------

/**
 * Track form submissions (name entry, date-of-birth entry).
 * GA4 event: form_submit
 * Parameters: form_id, form_name
 */
export function trackFormSubmit(form_id: string, form_name: string): void {
  gtag('event', 'form_submit', {
    form_id,
    form_name,
  });
}

// ---------------------------------------------------------------------------
// Content selection (component listings / card listings)
// ---------------------------------------------------------------------------

/**
 * Track selection of an item from a content listing (avatar grid, card grid).
 * Follows GA4 recommended event: select_content
 * Parameters: content_type, item_id
 */
export function trackSelectContent(content_type: string, item_id: string): void {
  gtag('event', 'select_content', {
    content_type,
    item_id,
  });
}

// ---------------------------------------------------------------------------
// Quiz interactions
// ---------------------------------------------------------------------------

/**
 * Track each quiz answer selection during onboarding.
 * GA4 event: quiz_answer_selected
 * Parameters: question_index (0-based), answer_text, avatar_affinity
 */
export function trackQuizAnswer(
  question_index: number,
  answer_text: string,
  avatar_affinity: string,
): void {
  gtag('event', 'quiz_answer_selected', {
    question_index,
    answer_text,
    avatar_affinity,
  });
}

// ---------------------------------------------------------------------------
// Copy to clipboard
// ---------------------------------------------------------------------------

/**
 * Track copy-to-clipboard interactions on code samples or shareable content.
 * GA4 event: copy_to_clipboard
 * Parameters: content_type (e.g. "code_sample", "card_name"), item_id (optional)
 */
export function trackCopyToClipboard(content_type: string, item_id?: string): void {
  gtag('event', 'copy_to_clipboard', {
    content_type,
    item_id,
  });
}

// ---------------------------------------------------------------------------
// Search and filter (component listings)
// ---------------------------------------------------------------------------

/**
 * Track search queries on card or component listings.
 * GA4 recommended event: search
 * Parameters: search_term, result_count (optional)
 */
export function trackSearch(search_term: string, result_count?: number): void {
  gtag('event', 'search', {
    search_term,
    result_count,
  });
}

/**
 * Track filter interactions on card or component listings.
 * GA4 event: filter_applied
 * Parameters: filter_type (e.g. "suit", "aura_context"), filter_value
 */
export function trackFilterApplied(filter_type: string, filter_value: string): void {
  gtag('event', 'filter_applied', {
    filter_type,
    filter_value,
  });
}

// ---------------------------------------------------------------------------
// Scroll depth
// ---------------------------------------------------------------------------

/**
 * Track how far a user has scrolled on long pages.
 * GA4 event: scroll_depth
 * Parameters: percent_scrolled (25 | 50 | 75 | 100), page_path
 */
export function trackScrollDepth(
  percent_scrolled: 25 | 50 | 75 | 100,
  page_path: string,
): void {
  gtag('event', 'scroll_depth', {
    percent_scrolled,
    page_path,
  });
}
