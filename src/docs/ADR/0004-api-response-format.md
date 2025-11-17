# ADR-0004: API Response Format

## Status
Accepted

## Context

We need a consistent response format for all API endpoints to:
- Make error handling predictable
- Provide consistent client-side experience
- Enable easy API client generation
- Support pagination and metadata

## Decision

We will use a standard response format for all API endpoints:

### Success Response

```json
{
  "success": true,
  "data": { ... }
}
```

### Error Response

```json
{
  "success": false,
  "error": {
    "message": "Error message",
    "code": "ERROR_CODE",
    "details": { ... }
  }
}
```

### Paginated Response

```json
{
  "success": true,
  "data": {
    "data": [ ... ],
    "pagination": {
      "page": 1,
      "pageSize": 10,
      "total": 100,
      "totalPages": 10
    }
  }
}
```

## Implementation

- All API routes use `createSuccessResponse()` and `createErrorResponse()` helpers
- Response types are strictly typed with TypeScript
- Error codes are standardized (see API_CONTRACTS.md)

## Consequences

### Positive
- Consistent API responses across all endpoints
- Easy error handling on client side
- Type-safe responses with TypeScript
- Clear distinction between success and error cases

### Negative
- Slightly more verbose responses
- Need to maintain consistency across all endpoints

## Alternatives Considered

- **RESTful status codes only**: Use HTTP status codes without wrapper
  - Rejected: Less consistent, harder to handle errors uniformly
- **GraphQL-style**: Use GraphQL for API
  - Rejected: Too complex for current needs, REST is sufficient

## References

- [API Contracts](./API_CONTRACTS.md)
- [API Backend Documentation](./API_BACKEND.md)

