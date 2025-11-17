# CI/CD Pipeline

This document explains the CI/CD pipeline configuration and workflow.

## Pipeline Overview

The CI/CD pipeline runs automatically on:
- Push to `main` or `develop` branches
- Pull requests to `main` or `develop`

## Pipeline Steps

### 1. Lint

Runs ESLint to check code quality:

```bash
npm run lint
```

**Fails if:**
- ESLint errors found
- Code style violations

### 2. Type Check

Runs TypeScript compiler to check types:

```bash
npm run type-check
```

**Fails if:**
- TypeScript errors found
- Type mismatches

### 3. Test

Runs Jest tests with coverage:

```bash
npm test -- --coverage
```

**Fails if:**
- Tests fail
- Coverage below 70%

### 4. Build

Builds production bundle:

```bash
npm run build
```

**Fails if:**
- Build errors
- Type errors
- Missing dependencies

## Workflow Files

### CI Pipeline (`.github/workflows/ci.yml`)

Complete CI pipeline with:
- Lint job
- Type check job
- Test job (multiple Node versions)
- Build job

### Test Workflow (`.github/workflows/test.yml`)

Test-only workflow (can be merged with CI pipeline).

## Running Locally

### Run All Checks

```bash
# Lint
npm run lint

# Type check
npm run type-check

# Test
npm test

# Build
npm run build
```

### Pre-commit Checks

Before committing, ensure:
- [ ] Lint passes
- [ ] Type check passes
- [ ] Tests pass
- [ ] Build succeeds

## Best Practices

- ✅ Fix lint errors before committing
- ✅ Ensure all tests pass
- ✅ Run type check locally
- ✅ Test build before pushing
- ✅ Keep CI pipeline fast (< 5 minutes)

## Troubleshooting

### Build Fails

1. Check TypeScript errors: `npm run type-check`
2. Check lint errors: `npm run lint`
3. Review build logs
4. Check environment variables

### Tests Fail

1. Run tests locally: `npm test`
2. Check test coverage: `npm run test:coverage`
3. Review test output
4. Fix failing tests

### Lint Fails

1. Run lint: `npm run lint`
2. Auto-fix: `npm run lint:fix`
3. Review lint errors
4. Fix manually if needed

