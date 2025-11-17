# Education Web App

A modern education platform built with Next.js 14, TypeScript, and Tailwind CSS.

## Project Structure

```
edu-web-app/
├─ .github/                   # CI/CD workflows
├─ public/                    # static assets: images, fonts, favicon
│  ├─ images/
│  └─ favicon.ico
├─ src/
│  ├─ app/                    # Next.js 13+ routing & layouts
│  │  ├─ (auth)/             # Authentication pages
│  │  ├─ (dashboard)/        # Dashboard pages
│  │  ├─ layout.tsx          # Main layout
│  │  └─ page.tsx            # Home page
│  ├─ components/             # UI components
│  │  ├─ ui/                 # Atomic UI components
│  │  └─ layout/             # Layout components
│  ├─ features/              # Feature-first structure
│  │  ├─ auth/              # Authentication feature
│  │  ├─ courses/           # Courses feature
│  │  └─ lessons/           # Lessons feature
│  ├─ hooks/                 # Global reusable hooks
│  ├─ lib/                   # Utility functions
│  ├─ services/              # API client
│  ├─ store/                 # Global state management
│  ├─ styles/                # Tailwind / global CSS
│  ├─ configs/               # Configuration files
│  ├─ pages/api/             # Backend API routes
│  ├─ server/                # Server-only logic
│  ├─ tests/                 # Test files
│  └─ docs/                  # Documentation
├─ scripts/                   # Development scripts
├─ .env.example
├─ next.config.js
├─ tsconfig.json
├─ package.json
└─ README.md
```

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

1. Install dependencies:
```bash
npm install
```

2. Copy environment variables:
```bash
cp .env.example .env
```

3. Update `.env` with your configuration values.

4. Run the development server:
```bash
npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Features

- **Authentication**: Login and registration system ([docs](./src/features/auth/README.md))
- **Courses**: Course management and browsing ([docs](./src/features/courses/README.md))
- **Lessons**: Lesson content and tracking ([docs](./src/features/lessons/README.md))
- **Dashboard**: User dashboard with progress tracking
- **Responsive Design**: Mobile-first responsive UI

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **State Management**: Zustand
- **HTTP Client**: Axios
- **Testing**: Jest, React Testing Library
- **Code Quality**: ESLint, Prettier

## Development

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm run lint:fix` - Fix ESLint errors automatically
- `npm run format` - Format code with Prettier
- `npm run format:check` - Check code formatting
- `npm run type-check` - Run TypeScript type checking
- `npm run test` - Run tests
- `npm run test:watch` - Run tests in watch mode
- `npm run test:coverage` - Run tests with coverage report

## Project Architecture

### Feature-First Structure

The project follows a feature-first architecture where each feature (auth, courses, lessons) contains:
- `components/` - Feature-specific components
- `hooks/` - Feature-specific hooks
- `services.ts` - API service functions
- `types.ts` - TypeScript type definitions

### API Routes

API routes are located in `src/pages/api/` and follow RESTful conventions:
- `GET /api/courses` - List all courses
- `POST /api/courses` - Create a course
- `GET /api/courses/[id]` - Get course by ID
- `PUT /api/courses/[id]` - Update course
- `DELETE /api/courses/[id]` - Delete course

Similar patterns for lessons and auth endpoints.

## Best Practices & Standards

This project follows industry best practices:

### ✅ Feature-First Architecture
- Self-contained features with clear boundaries
- Easy to locate and maintain code

### ✅ Component Separation
- **UI Components**: Pure, reusable components with no business logic (`src/components/ui/`)
  - Strongly typed props with JSDoc
  - Examples: `Button`, `Input`, `Card`, `Spinner`
- **Feature Components**: Business logic components (`src/features/[feature]/components/`)
  - Can use UI components for presentation
  - Examples: `CourseCard`, `LoginForm`, `LessonList`

### ✅ Hooks Separation
- **Global Hooks**: Reusable across features (`src/hooks/`)
  - Pure logic, no UI
  - Examples: `useWindowSize`, `useDebounce`
- **Feature Hooks**: Feature-specific logic (`src/features/[feature]/hooks/`)
  - Pure logic, no UI
  - Examples: `useAuth` (login/logout), `useCourses` (fetch course list)

### ✅ Service Layer
- All API calls through typed service layer
- Strict typing of request/response
- Error handling in service layer
- No API calls in components directly
- Examples: `features/courses/services.ts`, `services/apiClient.ts`

### ✅ API & Backend
- Next.js API routes in `/pages/api/`
- Feature-based API folder structure (auth, courses, lessons)
- Server-only logic in `/server/` (DB, cron, jobs)
- DTO / response types strictly typed
- Input validation required for all endpoints

### ✅ State Management
- **Global Store**: Zustand stores in `store/` for shared state
  - Examples: `userStore` (user session), `themeStore` (theme management)
  - Consistent naming: `[name]Store`
  - Persisted to localStorage when needed
- **Local State**: React hooks for feature/component-specific state
  - Feature state in hooks (e.g., `useCourses` hook state)
  - Component state with `useState`

### ✅ Consistent Coding Style
- ESLint for linting with import order enforcement
- Prettier for formatting (semicolons, single quotes, 2 spaces)
- TypeScript strict mode (no `any` unless necessary)
- Import order: External → Absolute (@/...) → Relative (./...)

### ✅ Theming & Styling
- **Tailwind CSS**: Utility-first CSS framework
- **Global Design Tokens**: Colors, spacing, typography in `/styles/`
- **Layout Consistency**: Header, Footer, Sidebar, PageShell components
- **No Inline Styles**: All styling through Tailwind classes
- **Theme System**: Semantic colors (primary, secondary, success, error, warning)

### ✅ Testing
- **Test Structure**: Each feature has test folder, co-located with source files
- **Test Types**: Unit + integration tests
- **API Tests**: All API routes tested
- **File Structure**: `Component.test.tsx`, `hook.test.ts`, `service.test.ts`
- **CI**: Runs tests before merge (GitHub Actions)
- **Coverage**: Minimum 70% required

### ✅ Error Handling & Logging
- **Consistent Error Structure**: `{ code: string, message: string, status: number }`
- **Global Logger**: Console for dev, Sentry for production
- **Service Layer**: All errors caught and logged in service layer
- **Custom Error Classes**: ValidationError, ApiError, AuthenticationError, etc.
- **Error Boundaries**: React Error Boundaries for UI errors

### ✅ Documentation
- **Feature READMEs**: Each feature has README.md with usage examples
- **Architecture Decision Records**: Documented in `/docs/ADR/`
- **API Contracts**: All API endpoints documented with request/response formats
- **Coding Standards**: Comprehensive coding guidelines
- **Production Checklist**: Deployment readiness checklist
- **Deployment Guide**: Complete deployment and production guide

### ✅ Deployment & Production
- **Environment Variables**: `.env.example` template with all required variables
- **CI/CD Pipeline**: Automated lint, type-check, test, and build
- **Image Optimization**: Next.js Image component with AVIF/WebP support
- **Bundle Optimization**: Bundle size analysis and code splitting
- **Rendering Strategies**: SSR/SSG/ISR configured per page
- **HTTPS/SSL**: Security headers and SSL configuration
- **Monitoring**: Sentry (error tracking) and Google Analytics setup

## Documentation

- [Architecture Overview](./src/docs/ARCHITECTURE.md)
- [Component Architecture](./src/docs/COMPONENT_ARCHITECTURE.md) - UI vs Feature components
- [Hooks Architecture](./src/docs/HOOKS_ARCHITECTURE.md) - Global vs Feature hooks
- [Service Layer](./src/docs/SERVICE_LAYER.md) - API calls and service architecture
- [API & Backend](./src/docs/API_BACKEND.md) - API routes and backend architecture
- [Testing Guidelines](./src/docs/TESTING_GUIDELINES.md) - Testing strategy and guidelines
- [API Contracts](./src/docs/API_CONTRACTS.md) - API endpoints and contracts
- [Error Handling](./src/docs/ERROR_HANDLING.md) - Error handling and logging strategy
- [Deployment Guide](./src/docs/DEPLOYMENT.md) - Deployment and production guide
- [Rendering Strategies](./src/docs/RENDERING_STRATEGIES.md) - SSR/SSG/ISR guide
- [CI/CD Pipeline](./src/docs/CI_CD.md) - CI/CD configuration
- [Bundle Optimization](./src/docs/BUNDLE_OPTIMIZATION.md) - Bundle size optimization
- [Environment Variables](./src/docs/ENVIRONMENT_VARIABLES.md) - Environment variables guide
- [Monitoring Setup](./src/docs/MONITORING_SETUP.md) - Sentry and GA setup
- [Architecture Decision Records](./src/docs/ADR/) - ADR documentation
- [State Management](./src/docs/STATE_MANAGEMENT.md) - Global stores vs local state
- [Styling Guide](./src/docs/STYLING_GUIDE.md) - Tailwind CSS and theme system
- [Coding Standards](./src/docs/CODING_STANDARDS.md)
- [Coding Style Guide](./src/docs/CODING_STYLE.md) - Detailed style rules
- [Production Checklist](./PRODUCTION_CHECKLIST.md)

## Next Steps

1. Set up database (Prisma recommended)
2. Implement authentication logic
3. Add course and lesson CRUD operations
4. Configure CI/CD pipelines
5. Set up error tracking (e.g., Sentry)
6. Add E2E tests

## License

MIT

