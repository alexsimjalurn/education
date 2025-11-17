# ADR-0002: Feature-First Architecture

## Status
Accepted

## Context
We need to organize our codebase in a way that:
- Makes features easy to find and understand
- Reduces coupling between features
- Scales well as the application grows
- Makes it easy for new developers to contribute

## Decision
We will organize our codebase using a feature-first architecture where:
- Each feature (auth, courses, lessons) is self-contained
- Features contain their own components, hooks, services, and types
- UI components are separated from feature components
- Global hooks and utilities are in shared directories

## Structure
```
src/
├── features/          # Feature modules
│   ├── auth/
│   │   ├── components/
│   │   ├── hooks/
│   │   ├── services.ts
│   │   └── types.ts
│   └── courses/
├── components/        # Shared UI components
│   ├── ui/           # Atomic components
│   └── layout/       # Layout components
├── hooks/            # Global reusable hooks
├── lib/              # Utility functions
└── services/         # Shared services
```

## Consequences
### Positive
- Features are self-contained and easier to understand
- Easier to locate code related to a specific feature
- Better code organization and maintainability
- Easier to test features in isolation

### Negative
- Some code duplication might occur (acceptable trade-off)
- Need discipline to keep features independent

## Alternatives Considered
- **Component-first**: Organize by component type (all components together)
  - Rejected: Makes it harder to understand feature boundaries
- **Domain-driven**: Organize by domain models
  - Rejected: Too complex for our current scale

## References
- [Feature-Sliced Design](https://feature-sliced.design/)
- [Next.js App Router Best Practices](https://nextjs.org/docs/app/building-your-application/routing)

