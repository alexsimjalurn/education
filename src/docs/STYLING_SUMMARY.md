# Styling Summary

Quick reference for styling and theming.

## Tailwind CSS

All styling is done through Tailwind CSS utility classes.

```tsx
// ✅ Good
<div className="bg-primary-600 text-white px-4 py-2 rounded-lg">
  Button
</div>

// ❌ Bad
<div style={{ backgroundColor: '#3b82f6', color: 'white' }}>
  Button
</div>
```

## Global Design Tokens

Design tokens are defined in `/styles/`:

- **`theme.ts`** - TypeScript theme configuration
- **`globals.css`** - CSS variables and base styles
- **`tailwind.config.js`** - Tailwind theme extension

## Theme Colors

Use semantic color names:

- `primary-*` - Primary brand colors (blue)
- `secondary-*` - Secondary colors (gray)
- `success-*` - Success states (green)
- `error-*` - Error states (red)
- `warning-*` - Warning states (yellow)

```tsx
<div className="bg-primary-600 text-white">Primary</div>
<div className="bg-secondary-500 text-white">Secondary</div>
<div className="bg-success-500 text-white">Success</div>
```

## Layout Components

Use consistent layout components:

- `Header` - App header
- `Footer` - App footer
- `Sidebar` - Dashboard sidebar
- `PageShell` - Page wrapper

```tsx
import { PageShell } from '@/components/layout/PageShell';

<PageShell>
  <h1>Page Content</h1>
</PageShell>
```

## No Inline Styles

Never use inline styles. Always use Tailwind classes.

```tsx
// ❌ Bad
<div style={{ padding: '1rem', backgroundColor: 'blue' }}>

// ✅ Good
<div className="p-4 bg-primary-600">
```

## Spacing

Use consistent spacing scale:

- `xs` - 0.25rem (4px)
- `sm` - 0.5rem (8px)
- `md` - 1rem (16px)
- `lg` - 1.5rem (24px)
- `xl` - 2rem (32px)

```tsx
<div className="p-4 m-2 space-y-4 gap-6">
```

## Responsive Design

Use Tailwind responsive prefixes:

```tsx
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
```

## Utility Classes

Custom utility classes in `globals.css`:

- `.container` - Max-width container with padding
- `.page-shell` - Page wrapper layout
- `.section` - Section spacing
- `.layout-grid` - Responsive grid layout

