# Coding Style Guide

This document defines the coding style standards for this project.

## General Rules

### Semicolons
**Always use semicolons** at the end of statements.

```typescript
// ✅ Good
const name = 'John';
const age = 30;

// ❌ Bad
const name = 'John'
const age = 30
```

### Quotes
**Always use single quotes** for strings.

```typescript
// ✅ Good
const message = 'Hello, world!';
const name = 'John';

// ❌ Bad
const message = "Hello, world!";
const name = "John";
```

### Indentation
**Use 2 spaces** for indentation. Never use tabs.

```typescript
// ✅ Good
function example() {
  if (condition) {
    return true;
  }
}

// ❌ Bad (4 spaces or tabs)
function example() {
    if (condition) {
        return true;
    }
}
```

## Import Order

Imports must be ordered in the following way:

1. **External libraries** (React, Next.js, third-party packages)
2. **Absolute imports** (`@/...`)
3. **Relative imports** (`./...`, `../...`)

Each group should be separated by a blank line and sorted alphabetically.

```typescript
// ✅ Good
import React from 'react';
import { NextPage } from 'next';
import axios from 'axios';

import { Button } from '@/components/ui/Button';
import { useAuth } from '@/features/auth/hooks/useAuth';
import { logger } from '@/lib/logger';

import { formatDate } from './helpers';
import { validateEmail } from '../validation';

// ❌ Bad (wrong order, no grouping)
import { Button } from '@/components/ui/Button';
import React from 'react';
import { formatDate } from './helpers';
import axios from 'axios';
```

### Import Sorting Rules

- Alphabetically sorted within each group
- Case-insensitive sorting
- Newlines between groups
- No unused imports

## TypeScript

### Strict Mode
TypeScript strict mode is enabled. All strict checks are enforced.

### No `any` Type
**Never use `any` type** unless absolutely necessary. Use `unknown` or proper types instead.

```typescript
// ✅ Good
function processData(data: unknown): string {
  if (typeof data === 'string') {
    return data;
  }
  return '';
}

// ⚠️ Only when absolutely necessary (with eslint-disable comment)
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function handleLegacyApi(response: any): void {
  // Legacy API that cannot be typed
}

// ❌ Bad
function processData(data: any): string {
  return data;
}
```

### Type Definitions
- Use `interface` for object shapes
- Use `type` for unions, intersections, and aliases
- Prefer explicit return types for functions

```typescript
// ✅ Good
interface User {
  id: string;
  name: string;
  email: string;
}

type UserRole = 'admin' | 'user' | 'guest';

function getUser(id: string): User | null {
  // ...
}

// ❌ Bad
function getUser(id) {
  // ...
}
```

## Code Formatting

### Prettier
All code is automatically formatted with Prettier. Run `npm run format` before committing.

### Line Length
Maximum line length is 80 characters. Break long lines appropriately.

```typescript
// ✅ Good
const result = someVeryLongFunctionName(
  parameter1,
  parameter2,
  parameter3
);

// ❌ Bad
const result = someVeryLongFunctionName(parameter1, parameter2, parameter3);
```

## React Components

### Component Structure
```typescript
// 1. External imports
import React from 'react';
import { NextPage } from 'next';

// 2. Absolute imports
import { Button } from '@/components/ui/Button';
import { useAuth } from '@/features/auth/hooks/useAuth';

// 3. Relative imports
import { formatDate } from './helpers';

// 4. Types
interface ComponentProps {
  title: string;
  onAction: () => void;
}

// 5. Component
export const Component: React.FC<ComponentProps> = ({ title, onAction }) => {
  // Hooks
  const { user } = useAuth();
  
  // Handlers
  const handleClick = () => {
    onAction();
  };
  
  // Render
  return (
    <div>
      <h1>{title}</h1>
      <Button onClick={handleClick}>Action</Button>
    </div>
  );
};
```

## File Naming

- **Components**: PascalCase (e.g., `UserProfile.tsx`)
- **Hooks**: camelCase starting with `use` (e.g., `useAuth.ts`)
- **Utilities**: camelCase (e.g., `formatDate.ts`)
- **Types**: PascalCase (e.g., `User.ts` or in `types.ts`)

## Enforcement

### Pre-commit Hooks
Consider adding pre-commit hooks to enforce:
- Prettier formatting
- ESLint checks
- TypeScript type checking

### CI/CD
The CI pipeline will:
- Run `npm run lint`
- Run `npm run format:check`
- Run `npm run type-check`
- Run `npm run test`

## Examples

### Complete Example
```typescript
import React, { useState, useEffect } from 'react';
import axios from 'axios';

import { Button } from '@/components/ui/Button';
import { useAuth } from '@/features/auth/hooks/useAuth';
import { logger } from '@/lib/logger';

import { formatDate } from './helpers';

interface UserProfileProps {
  userId: string;
  onUpdate?: () => void;
}

export const UserProfile: React.FC<UserProfileProps> = ({
  userId,
  onUpdate,
}) => {
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    logger.info('User profile loaded', { userId });
  }, [userId]);

  const handleSave = async () => {
    setLoading(true);
    try {
      await axios.post(`/api/users/${userId}`);
      onUpdate?.();
    } catch (error) {
      logger.error('Failed to save user', { error });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h1>{user?.name}</h1>
      <p>Joined: {formatDate(user?.createdAt)}</p>
      <Button onClick={handleSave} isLoading={loading}>
        Save
      </Button>
    </div>
  );
};
```

## Tools

- **Prettier**: Code formatting
- **ESLint**: Code linting with import order rules
- **TypeScript**: Type checking with strict mode

Run these commands:
```bash
npm run format        # Format code
npm run lint          # Check linting
npm run lint:fix      # Fix linting issues
npm run type-check    # Check TypeScript types
```

