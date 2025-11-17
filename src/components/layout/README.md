# Layout Components

This directory contains consistent layout components used across the application.

## Components

### Header
Consistent header with navigation and authentication links.

```tsx
import { Header } from '@/components/layout/Header';

<Header />
```

### Footer
Consistent footer with links and contact information.

```tsx
import { Footer } from '@/components/layout/Footer';

<Footer />
```

### Sidebar
Dashboard sidebar with navigation items.

```tsx
import { Sidebar } from '@/components/layout/Sidebar';

<Sidebar />
```

### PageShell
Page wrapper component that includes Header and Footer.

```tsx
import { PageShell } from '@/components/layout/PageShell';

<PageShell>
  <h1>Page Content</h1>
</PageShell>
```

## Principles

- ✅ **Consistent Layout**: Same Header, Footer, Sidebar across all pages
- ✅ **Tailwind CSS**: All styling through Tailwind classes
- ✅ **No Inline Styles**: Never use inline styles
- ✅ **Theme Colors**: Use semantic color names (primary, secondary, etc.)
- ✅ **Responsive**: Mobile-first responsive design

## Usage

### Basic Page

```tsx
import { PageShell } from '@/components/layout/PageShell';

export default function Page() {
  return (
    <PageShell>
      <div className="container section">
        <h1>Page Title</h1>
        <p>Page content</p>
      </div>
    </PageShell>
  );
}
```

### Dashboard Page

```tsx
import { Header } from '@/components/layout/Header';
import { Sidebar } from '@/components/layout/Sidebar';
import { Footer } from '@/components/layout/Footer';

export default function DashboardPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <div className="flex flex-1">
        <Sidebar />
        <main className="flex-1 p-6">
          <h1>Dashboard</h1>
        </main>
      </div>
      <Footer />
    </div>
  );
}
```

## Styling

All layout components use:
- Tailwind utility classes
- Theme colors (primary, secondary, etc.)
- Consistent spacing
- No inline styles

## Customization

To customize layout components:
1. Modify the component file
2. Use Tailwind classes
3. Follow theme color system
4. Maintain consistency across pages

