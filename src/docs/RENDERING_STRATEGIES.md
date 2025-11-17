# Rendering Strategies

This document explains when and how to use SSR, SSG, and ISR in Next.js App Router.

## Rendering Strategies

### Server-Side Rendering (SSR)

Use for dynamic content that changes frequently and needs to be fresh on every request.

**When to use:**
- User-specific content
- Frequently changing data
- Real-time data

**Example**:
```tsx
// app/courses/[id]/page.tsx
export default async function CoursePage({ params }: { params: { id: string } }) {
  // Fetch on every request (no cache)
  const course = await fetch(`https://api.example.com/courses/${params.id}`, {
    cache: 'no-store',
  }).then(res => res.json());

  return <div>{course.title}</div>;
}
```

### Static Site Generation (SSG)

Use for content that doesn't change often and can be pre-rendered at build time.

**When to use:**
- Static pages
- Content that rarely changes
- SEO-critical pages

**Example**:
```tsx
// app/about/page.tsx
export default async function AboutPage() {
  // Fetch at build time
  const data = await fetch('https://api.example.com/about', {
    next: { revalidate: false }, // Static, never revalidate
  }).then(res => res.json());

  return <div>{data.content}</div>;
}

// Generate static params for dynamic routes
export async function generateStaticParams() {
  const courses = await fetch('https://api.example.com/courses').then(res => res.json());
  return courses.map((course: { id: string }) => ({
    id: course.id,
  }));
}
```

### Incremental Static Regeneration (ISR)

Use for content that can be cached but needs periodic updates.

**When to use:**
- Content that changes occasionally
- Large number of pages
- Need for fast page loads with fresh content

**Example**:
```tsx
// app/courses/page.tsx
export const revalidate = 3600; // Revalidate every hour

export default async function CoursesPage() {
  // Fetch with revalidation
  const courses = await fetch('https://api.example.com/courses', {
    next: { revalidate: 3600 }, // Revalidate every hour
  }).then(res => res.json());

  return (
    <div>
      {courses.map((course: Course) => (
        <CourseCard key={course.id} course={course} />
      ))}
    </div>
  );
}
```

## Decision Guide

| Content Type | Strategy | Example |
|--------------|----------|---------|
| User dashboard | SSR | `/dashboard` |
| Static pages | SSG | `/about`, `/contact` |
| Course listings | ISR | `/courses` (revalidate: 3600) |
| Course details | ISR | `/courses/[id]` (revalidate: 3600) |
| User profile | SSR | `/profile` |
| Blog posts | SSG | `/blog/[slug]` |

## Best Practices

### ✅ DO

- Use SSG for static content
- Use ISR for frequently accessed pages
- Use SSR for user-specific content
- Set appropriate revalidation times
- Use `generateStaticParams` for dynamic routes

### ❌ DON'T

- Use SSR for static content
- Use SSG for frequently changing content
- Set revalidation too frequently (waste resources)
- Mix strategies without reason

## Performance Considerations

- **SSG**: Fastest (pre-rendered), but requires rebuild for updates
- **ISR**: Fast (cached) with periodic updates, best balance
- **SSR**: Slower (rendered on request), but always fresh

## Examples

### Course List (ISR)

```tsx
// app/courses/page.tsx
export const revalidate = 3600; // 1 hour

export default async function CoursesPage() {
  const courses = await courseService.getAll();
  return <CourseList courses={courses} />;
}
```

### Course Detail (ISR)

```tsx
// app/courses/[id]/page.tsx
export const revalidate = 3600;

export async function generateStaticParams() {
  const courses = await courseService.getAll();
  return courses.map(course => ({ id: course.id }));
}

export default async function CoursePage({ params }: { params: { id: string } }) {
  const course = await courseService.getById(params.id);
  return <CourseDetail course={course} />;
}
```

### User Dashboard (SSR)

```tsx
// app/dashboard/page.tsx
export default async function DashboardPage() {
  // Fetch user-specific data on every request
  const userData = await fetch('https://api.example.com/user/dashboard', {
    cache: 'no-store',
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
  }).then(res => res.json());

  return <Dashboard data={userData} />;
}
```

