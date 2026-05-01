# Accessibility Reference

Comprehensive guide for implementing accessible interfaces following WCAG 2.1 AA standards.

## Core Principles (POUR)

- **Perceivable**: Information presentable in ways users can perceive
- **Operable**: UI components navigable by all users
- **Understandable**: Information and operation understandable
- **Robust**: Content interpretable by assistive technologies

## Semantic HTML

Use appropriate elements (`<header>`, `<nav>`, `<main>`, `<article>`, `<footer>`) over generic `<div>` wrappers.

Maintain correct heading hierarchy: h1 → h2 → h3 (never skip levels).

## Keyboard Navigation

```tsx
// All interactive elements keyboard accessible
<button className="focus:outline-none focus:ring-4 focus:ring-blue-500 focus:ring-offset-2 rounded-lg">
  Accessible Button
</button>

// Custom interactive elements
<div role="button" tabIndex={0} onClick={handleClick}
  onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') handleClick(); }}>
  Custom Button
</div>
```

## ARIA Attributes

```tsx
// Labels for icon-only buttons
<button aria-label="Close dialog"><X size={24} /></button>

// Expanded state
<button aria-expanded={isOpen} aria-controls="dropdown-menu">Menu</button>

// Live regions for dynamic content
<div role="status" aria-live="polite" aria-atomic="true">{statusMessage}</div>
<div role="alert" aria-live="assertive">{errorMessage}</div>
```

## Color Contrast (WCAG AA)

- Normal text: minimum **4.5:1**
- Large text (18pt+ or 14pt+ bold): minimum **3:1**
- UI components and graphics: minimum **3:1**

Tools: Chrome DevTools Accessibility tab, WebAIM Contrast Checker, axe DevTools extension.

## Alternative Text

```tsx
// Informative images
<img src="chart.png" alt="Bar chart showing sales increased 40% in Q4 2025" />

// Decorative images
<img src="decoration.png" alt="" role="presentation" />

// Icon buttons
<button aria-label="Search"><MagnifyingGlass /></button>

// Icons with adjacent text
<button className="flex items-center gap-2">
  <MagnifyingGlass aria-hidden="true" />
  Search
</button>
```

## Forms

```tsx
// Always associate labels
<label htmlFor="email">Email Address</label>
<input id="email" type="email" required aria-required="true" />

// Error handling
<input aria-invalid={hasError} aria-describedby={hasError ? 'email-error' : undefined} />
{hasError && <p id="email-error" role="alert">Please enter a valid email address</p>}

// Group related inputs
<fieldset>
  <legend>Contact Preferences</legend>
  <label><input type="checkbox" name="email" /> Email</label>
</fieldset>
```

## Focus Management

```tsx
// Skip link
<a href="#main-content" className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-blue-600 focus:text-white focus:rounded-lg">
  Skip to main content
</a>
```

## Testing Checklist

**Keyboard Navigation:**
- [ ] Navigate entire site using Tab key
- [ ] Activate all interactive elements with Enter/Space
- [ ] Focus indicators clearly visible
- [ ] No keyboard traps
- [ ] Logical tab order

**Visual Testing:**
- [ ] Text has sufficient contrast (4.5:1 minimum)
- [ ] UI works at 200% zoom
- [ ] No information conveyed by color alone
- [ ] Focus indicators visible

## Resources

- [WCAG 2.1 Quick Reference](https://www.w3.org/WAI/WCAG21/quickref/)
- [WebAIM Contrast Checker](https://webaim.org/resources/contrastchecker/)
- [ARIA Authoring Practices Guide](https://www.w3.org/WAI/ARIA/apg/)
