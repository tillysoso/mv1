# Responsive Design Reference

Detailed reference for implementing responsive, mobile-first designs.

## Mobile-First Approach

Always start with mobile design, then progressively enhance for larger screens.

## Breakpoint Strategy

| Range | Pixels | Target Devices | Layout Strategy |
|-------|--------|----------------|-----------------|
| **XS** | 0-479px | Small phones | Single column, stacked navigation, large touch targets (min 44px) |
| **SM** | 480-767px | Large phones | Single column, simplified UI, bottom navigation |
| **MD** | 768-1023px | Tablets | 2 columns possible, sidebar navigation |
| **LG** | 1024-1439px | Small laptops | Multi-column layouts, full navigation |
| **XL** | 1440px+ | Desktop monitors | Max-width containers, multi-panel layouts |

### Tailwind Responsive Classes

```tsx
<div className="
  w-full          // mobile: full width
  sm:w-1/2        // small: half width
  md:w-1/3        // medium: third width
  lg:w-1/4        // large: quarter width
">
```

## Responsive Typography

```tsx
// Fluid with Tailwind
<h1 className="text-3xl md:text-4xl lg:text-5xl">Headline</h1>

// Fluid with CSS clamp
h1 { font-size: clamp(2rem, 5vw, 4rem); }
```

## Touch-Friendly Interfaces

```tsx
// Minimum 44x44px touch targets
<button className="min-w-[44px] min-h-[44px] px-4 py-2 touch-manipulation">
  Tap Me
</button>
```

## Navigation Patterns

### Mobile Menu

```tsx
import { List, X } from '@phosphor-icons/react';

export function MobileNav() {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      <button onClick={() => setIsOpen(!isOpen)} className="md:hidden p-2" aria-label="Toggle menu">
        {isOpen ? <X size={24} /> : <List size={24} />}
      </button>
      {isOpen && (
        <div className="fixed inset-0 z-50 bg-white md:hidden">
          <nav className="p-6 space-y-4">{/* Navigation items */}</nav>
        </div>
      )}
      <nav className="hidden md:flex gap-6">{/* Desktop nav */}</nav>
    </>
  );
}
```

## Common Responsive Patterns

### Card Grid

```tsx
<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 p-4">
  {items.map(item => (
    <article key={item.id} className="bg-white rounded-lg border border-slate-200 overflow-hidden hover:shadow-lg transition-shadow">
      <img src={item.image} alt={item.title} className="w-full h-48 object-cover" loading="lazy" />
      <div className="p-4">
        <h3 className="text-lg font-semibold mb-2">{item.title}</h3>
        <p className="text-slate-600">{item.description}</p>
      </div>
    </article>
  ))}
</div>
```

## Best Practices

✅ **Do:**
- Start with mobile design first
- Use relative units (rem, em, %) for flexibility
- Test on real devices, not just emulators
- Ensure touch targets are at least 44x44px
- Use CSS Grid and Flexbox for flexible layouts

❌ **Don't:**
- Design for desktop first and scale down
- Use fixed pixel widths for layout containers
- Make touch targets too small
- Load all images eagerly
