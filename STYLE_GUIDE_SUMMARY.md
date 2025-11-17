# Coding Style Summary

Quick reference for the coding style standards enforced in this project.

## Quick Rules

| Rule | Value |
|------|-------|
| **Semicolons** | Always required |
| **Quotes** | Single quotes (`'`) |
| **Indentation** | 2 spaces (no tabs) |
| **Line Length** | 80 characters max |
| **TypeScript `any`** | Error (use `unknown` or proper types) |

## Import Order

```typescript
// 1. External libraries (React, Next.js, third-party)
import React from 'react';
import { NextPage } from 'next';
import axios from 'axios';

// 2. Absolute imports (@/...)
import { Button } from '@/components/ui/Button';
import { useAuth } from '@/features/auth/hooks/useAuth';

// 3. Relative imports (./... or ../...)
import { formatDate } from './helpers';
import { validateEmail } from '../validation';
```

**Rules:**
- Each group separated by blank line
- Alphabetically sorted within each group
- Case-insensitive sorting

## TypeScript

- **Strict mode**: Enabled with all checks
- **No `any`**: Use `unknown` or proper types
- **Exception**: Only when absolutely necessary with `eslint-disable` comment

```typescript
// ✅ Good
function process(data: unknown): string {
  if (typeof data === 'string') {
    return data;
  }
  return '';
}

// ⚠️ Only when necessary
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function legacyApi(response: any): void {
  // ...
}
```

## Formatting

All code is automatically formatted with Prettier. Run:
```bash
npm run format        # Format all files
npm run format:check  # Check formatting
```

## Linting

ESLint enforces:
- Import order
- No `any` types
- Code quality rules

Run:
```bash
npm run lint          # Check linting
npm run lint:fix      # Auto-fix issues
```

## VS Code Setup

The project includes VS Code settings for:
- Auto-format on save
- ESLint auto-fix on save
- Recommended extensions

Install recommended extensions when prompted.

## Full Documentation

See [CODING_STYLE.md](./src/docs/CODING_STYLE.md) for complete style guide.

