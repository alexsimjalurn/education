# Styling & Theme Guide

This document explains the styling approach and theme system.

## Principles

### ✅ Use Tailwind CSS

All styling is done through Tailwind CSS utility classes. No inline styles.

```tsx
// ✅ Good: Tailwind classes
<div className="bg-primary-600 text-white px-4 py-2 rounded-lg">
  Button
</div>

// ❌ Bad: Inline styles
<div style={{ backgroundColor: '#3b82f6', color: 'white', padding: '1rem' }}>
  Button
</div>
```

### ✅ Global Design Tokens in `/styles/`

All design tokens (colors, spacing, typography) are defined in:
- `src/styles/theme.ts` - TypeScript theme configuration
- `src/styles/globals.css` - CSS variables and base styles
- `tailwind.config.js` - Tailwind theme extension

### ✅ Layout Consistency

Use consistent layout components:
- `Header` - App header
- `Footer` - App footer
- `Sidebar` - Dashboard sidebar
- `PageShell` - Page wrapper with Header and Footer

### ✅ Avoid Inline Styles

Never use inline styles. Always use Tailwind classes or CSS classes.

## Theme System

### Colors

Use semantic color names from the theme:

```tsx
// Primary colors
<div className="bg-primary-600 text-white">Primary</div>
<div className="bg-primary-100 text-primary-900">Light Primary</div>

// Secondary colors
<div className="bg-secondary-600 text-white">Secondary</div>

// Semantic colors
<div className="bg-success-500 text-white">Success</div>
<div className="bg-error-500 text-white">Error</div>
<div className="bg-warning-500 text-white">Warning</div>
```

### Spacing

Use consistent spacing scale:

```tsx
// Spacing utilities
<div className="p-4">Padding medium</div>
<div className="m-2">Margin small</div>
<div className="space-y-4">Vertical spacing</div>
<div className="gap-6">Grid gap</div>
```

### Typography

Use typography utilities:

```tsx
<h1 className="text-4xl font-bold">Heading 1</h1>
<h2 className="text-3xl font-semibold">Heading 2</h2>
<p className="text-base text-secondary-700">Body text</p>
```

## Layout Components

### PageShell

Use `PageShell` for consistent page layout:

```tsx
import { PageShell } from '@/components/layout/PageShell';

export default function Page() {
  return (
    <PageShell>
      <h1>Page Content</h1>
    </PageShell>
  );
}
```

### Header

Consistent header across all pages:

```tsx
import { Header } from '@/components/layout/Header';

<Header />
```

### Footer

Consistent footer across all pages:

```tsx
import { Footer } from '@/components/layout/Footer';

<Footer />
```

### Sidebar

Dashboard sidebar:

```tsx
import { Sidebar } from '@/components/layout/Sidebar';

<Sidebar />
```

## CSS Variables

CSS variables are defined in `globals.css` and can be used in custom CSS:

```css
.custom-class {
  color: rgb(var(--color-primary));
  padding: var(--spacing-md);
}
```

## Tailwind Configuration

The Tailwind config extends the theme with:
- Custom colors (primary, secondary, success, error, warning)
- Custom spacing scale
- Custom font families
- CSS variable support

## Best Practices

### ✅ DO

- Use Tailwind utility classes
- Use semantic color names (primary, secondary, etc.)
- Use consistent spacing scale
- Use layout components (Header, Footer, Sidebar, PageShell)
- Use responsive prefixes (sm:, md:, lg:)
- Use theme colors from `tailwind.config.js`

### ❌ DON'T

- Use inline styles
- Use hardcoded colors (use theme colors)
- Use arbitrary values when theme values exist
- Create custom CSS when Tailwind utilities exist
- Mix styling approaches

## Examples

### Button Styling

```tsx
// ✅ Good: Tailwind classes
<button className="bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700 transition-colors">
  Click me
</button>

// ❌ Bad: Inline styles
<button style={{ backgroundColor: '#3b82f6', color: 'white', padding: '1rem' }}>
  Click me
</button>
```

### Card Styling

```tsx
// ✅ Good: Tailwind classes
<div className="bg-white rounded-lg shadow-md p-6">
  Card content
</div>

// ❌ Bad: Inline styles
<div style={{ backgroundColor: 'white', borderRadius: '0.5rem', padding: '1.5rem' }}>
  Card content
</div>
```

### Responsive Design

```tsx
// ✅ Good: Tailwind responsive classes
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
  {items.map(item => <Item key={item.id} />)}
</div>
```

## File Structure

```
src/
├── styles/
│   ├── globals.css      # Global CSS, variables, base styles
│   ├── theme.ts         # TypeScript theme configuration
│   └── README.md        # Styles documentation
├── components/
│   └── layout/
│       ├── Header.tsx   # Consistent header
│       ├── Footer.tsx   # Consistent footer
│       ├── Sidebar.tsx  # Consistent sidebar
│       └── PageShell.tsx # Page wrapper
└── tailwind.config.js   # Tailwind configuration
```

## Summary

| Aspect | Approach |
|--------|----------|
| **Styling** | Tailwind CSS utility classes |
| **Theme** | Global design tokens in `/styles/` |
| **Layout** | Consistent components (Header, Footer, Sidebar, PageShell) |
| **Inline Styles** | ❌ Never use |
| **Colors** | Semantic names (primary, secondary, success, error, warning) |
| **Spacing** | Consistent scale (xs, sm, md, lg, xl, 2xl, 3xl) |

