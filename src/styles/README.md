# Styles

This directory contains global styles, theme configuration, and design tokens.

## Files

### `globals.css`
Global CSS file that includes:
- Tailwind directives
- CSS custom properties (variables)
- Base styles
- Component classes
- Utility classes

### `theme.ts`
TypeScript theme configuration with:
- Colors (primary, secondary, success, error, warning)
- Spacing scale
- Border radius
- Shadows
- Breakpoints
- Typography

## Usage

### Tailwind CSS

Use Tailwind utility classes throughout the application:

```tsx
<div className="bg-primary-600 text-white px-4 py-2 rounded-lg">
  Button
</div>
```

### Theme Values

Import theme values when needed in TypeScript:

```tsx
import { theme } from '@/styles/theme';

const primaryColor = theme.colors.primary[500];
```

### CSS Variables

Use CSS variables in custom CSS:

```css
.custom-class {
  color: rgb(var(--color-primary));
  padding: var(--spacing-md);
}
```

## Design Tokens

### Colors

- **Primary**: Blue scale (primary-50 to primary-900)
- **Secondary**: Gray scale (secondary-50 to secondary-900)
- **Success**: Green scale
- **Error**: Red scale
- **Warning**: Yellow scale

### Spacing

- xs: 0.25rem (4px)
- sm: 0.5rem (8px)
- md: 1rem (16px)
- lg: 1.5rem (24px)
- xl: 2rem (32px)
- 2xl: 3rem (48px)
- 3xl: 4rem (64px)

### Typography

- Font families: Inter (sans), Fira Code (mono)
- Font sizes: xs, sm, base, lg, xl, 2xl, 3xl, 4xl

## Best Practices

1. **Use Tailwind classes**: Prefer Tailwind utilities over custom CSS
2. **Use theme colors**: Use semantic color names (primary, secondary, etc.)
3. **Consistent spacing**: Use spacing scale (xs, sm, md, lg, xl)
4. **No inline styles**: Always use Tailwind classes or CSS classes
5. **Responsive design**: Use Tailwind responsive prefixes (sm:, md:, lg:)

## Layout Components

Use layout components for consistency:
- `Header` - Consistent header
- `Footer` - Consistent footer
- `Sidebar` - Consistent sidebar
- `PageShell` - Page wrapper with Header and Footer

