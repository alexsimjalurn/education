# API Contracts

This document describes all API endpoints, their request/response formats, and validation rules.

## Base URL

- **Development**: `http://localhost:3000/api`
- **Production**: `https://api.example.com/api`

## Response Format

All API responses follow a standard format:

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

## Authentication

Most endpoints require authentication via Bearer token:

```
Authorization: Bearer <token>
```

## Auth Endpoints

### POST /api/auth/login

Login user with email and password.

**Request**:
```json
{
  "email": "user@example.com",
  "password": "password123"
}
```

**Response** (200):
```json
{
  "success": true,
  "data": {
    "user": {
      "id": "1",
      "email": "user@example.com",
      "name": "John Doe",
      "role": "student",
      "createdAt": "2024-01-01T00:00:00.000Z"
    },
    "token": "jwt-token-here"
  }
}
```

**Validation**:
- `email`: Required, valid email format
- `password`: Required, string

**Error Codes**:
- `INVALID_CREDENTIALS` (401): Invalid email or password

---

### POST /api/auth/register

Register a new user.

**Request**:
```json
{
  "name": "John Doe",
  "email": "user@example.com",
  "password": "Password123",
  "role": "student"
}
```

**Response** (201):
```json
{
  "success": true,
  "data": {
    "user": {
      "id": "1",
      "email": "user@example.com",
      "name": "John Doe",
      "role": "student",
      "createdAt": "2024-01-01T00:00:00.000Z"
    },
    "token": "jwt-token-here"
  }
}
```

**Validation**:
- `name`: Required, string
- `email`: Required, valid email format
- `password`: Required, minimum 8 characters, must contain uppercase, lowercase, and number
- `role`: Optional, "student" or "teacher" (default: "student")

**Error Codes**:
- `VALIDATION_ERROR` (400): Invalid input data
- `EMAIL_EXISTS` (409): Email already registered

---

### GET /api/auth/me

Get current authenticated user.

**Headers**:
```
Authorization: Bearer <token>
```

**Response** (200):
```json
{
  "success": true,
  "data": {
    "id": "1",
    "email": "user@example.com",
    "name": "John Doe",
    "role": "student",
    "createdAt": "2024-01-01T00:00:00.000Z"
  }
}
```

**Error Codes**:
- `AUTHENTICATION_ERROR` (401): Not authenticated

---

### POST /api/auth/logout

Logout current user.

**Headers**:
```
Authorization: Bearer <token>
```

**Response** (200):
```json
{
  "success": true,
  "data": {
    "message": "Logged out successfully"
  }
}
```

**Error Codes**:
- `AUTHENTICATION_ERROR` (401): Not authenticated

---

## Courses Endpoints

### GET /api/courses

Get all courses.

**Query Parameters**:
- `page` (optional): Page number (default: 1)
- `pageSize` (optional): Items per page (default: 10)
- `paginated` (optional): Return paginated response (default: false)

**Response** (200):
```json
{
  "success": true,
  "data": [
    {
      "id": "1",
      "title": "Introduction to React",
      "description": "Learn React fundamentals",
      "instructor": "John Doe",
      "duration": 120,
      "price": 99.99,
      "level": "beginner",
      "category": "programming",
      "thumbnail": "https://example.com/image.jpg",
      "createdAt": "2024-01-01T00:00:00.000Z",
      "updatedAt": "2024-01-01T00:00:00.000Z"
    }
  ]
}
```

**Paginated Response** (when `paginated=true`):
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

---

### GET /api/courses/[id]

Get course by ID.

**Response** (200):
```json
{
  "success": true,
  "data": {
    "id": "1",
    "title": "Introduction to React",
    "description": "Learn React fundamentals",
    "instructor": "John Doe",
    "duration": 120,
    "price": 99.99,
    "level": "beginner",
    "category": "programming",
    "thumbnail": "https://example.com/image.jpg",
    "createdAt": "2024-01-01T00:00:00.000Z",
    "updatedAt": "2024-01-01T00:00:00.000Z"
  }
}
```

**Error Codes**:
- `NOT_FOUND` (404): Course not found

---

### POST /api/courses

Create a new course.

**Headers**:
```
Authorization: Bearer <token>
```

**Request**:
```json
{
  "title": "Introduction to React",
  "description": "Learn React fundamentals",
  "instructor": "John Doe",
  "duration": 120,
  "price": 99.99,
  "level": "beginner",
  "category": "programming",
  "thumbnail": "https://example.com/image.jpg"
}
```

**Response** (201):
```json
{
  "success": true,
  "data": {
    "id": "1",
    "title": "Introduction to React",
    "description": "Learn React fundamentals",
    "instructor": "John Doe",
    "duration": 120,
    "price": 99.99,
    "level": "beginner",
    "category": "programming",
    "thumbnail": "https://example.com/image.jpg",
    "createdAt": "2024-01-01T00:00:00.000Z",
    "updatedAt": "2024-01-01T00:00:00.000Z"
  }
}
```

**Validation**:
- `title`: Required, string
- `description`: Required, string
- `instructor`: Required, string
- `duration`: Required, positive number
- `price`: Required, non-negative number
- `level`: Required, "beginner" | "intermediate" | "advanced"
- `category`: Required, string
- `thumbnail`: Optional, string (URL)

**Error Codes**:
- `VALIDATION_ERROR` (400): Invalid input data
- `AUTHENTICATION_ERROR` (401): Not authenticated

---

### PUT /api/courses/[id]

Update a course.

**Headers**:
```
Authorization: Bearer <token>
```

**Request**:
```json
{
  "title": "Updated Title",
  "price": 149.99
}
```

**Response** (200):
```json
{
  "success": true,
  "data": {
    "id": "1",
    "title": "Updated Title",
    "price": 149.99,
    ...
  }
}
```

**Error Codes**:
- `NOT_FOUND` (404): Course not found
- `AUTHENTICATION_ERROR` (401): Not authenticated

---

### DELETE /api/courses/[id]

Delete a course.

**Headers**:
```
Authorization: Bearer <token>
```

**Response** (200):
```json
{
  "success": true,
  "data": {
    "message": "Course deleted successfully"
  }
}
```

**Error Codes**:
- `NOT_FOUND` (404): Course not found
- `AUTHENTICATION_ERROR` (401): Not authenticated

---

## Lessons Endpoints

### GET /api/lessons

Get all lessons, optionally filtered by courseId.

**Query Parameters**:
- `courseId` (optional): Filter lessons by course ID

**Response** (200):
```json
{
  "success": true,
  "data": [
    {
      "id": "1",
      "courseId": "1",
      "title": "Lesson 1: Introduction",
      "description": "Introduction to the course",
      "content": "Full lesson content...",
      "videoUrl": "https://example.com/video.mp4",
      "duration": 30,
      "order": 1,
      "createdAt": "2024-01-01T00:00:00.000Z",
      "updatedAt": "2024-01-01T00:00:00.000Z"
    }
  ]
}
```

---

### GET /api/lessons/[id]

Get lesson by ID.

**Response** (200):
```json
{
  "success": true,
  "data": {
    "id": "1",
    "courseId": "1",
    "title": "Lesson 1: Introduction",
    "description": "Introduction to the course",
    "content": "Full lesson content...",
    "videoUrl": "https://example.com/video.mp4",
    "duration": 30,
    "order": 1,
    "createdAt": "2024-01-01T00:00:00.000Z",
    "updatedAt": "2024-01-01T00:00:00.000Z"
  }
}
```

**Error Codes**:
- `NOT_FOUND` (404): Lesson not found

---

### POST /api/lessons

Create a new lesson.

**Headers**:
```
Authorization: Bearer <token>
```

**Request**:
```json
{
  "courseId": "1",
  "title": "Lesson 1: Introduction",
  "description": "Introduction to the course",
  "content": "Full lesson content...",
  "videoUrl": "https://example.com/video.mp4",
  "duration": 30,
  "order": 1
}
```

**Response** (201):
```json
{
  "success": true,
  "data": {
    "id": "1",
    "courseId": "1",
    "title": "Lesson 1: Introduction",
    "description": "Introduction to the course",
    "content": "Full lesson content...",
    "videoUrl": "https://example.com/video.mp4",
    "duration": 30,
    "order": 1,
    "createdAt": "2024-01-01T00:00:00.000Z",
    "updatedAt": "2024-01-01T00:00:00.000Z"
  }
}
```

**Validation**:
- `courseId`: Required, string
- `title`: Required, string
- `description`: Required, string
- `content`: Required, string
- `duration`: Required, positive number
- `order`: Required, non-negative number
- `videoUrl`: Optional, string (URL)

**Error Codes**:
- `VALIDATION_ERROR` (400): Invalid input data
- `AUTHENTICATION_ERROR` (401): Not authenticated

---

### PUT /api/lessons/[id]

Update a lesson.

**Headers**:
```
Authorization: Bearer <token>
```

**Request**:
```json
{
  "title": "Updated Title",
  "duration": 45
}
```

**Response** (200):
```json
{
  "success": true,
  "data": {
    "id": "1",
    "title": "Updated Title",
    "duration": 45,
    ...
  }
}
```

**Error Codes**:
- `NOT_FOUND` (404): Lesson not found
- `AUTHENTICATION_ERROR` (401): Not authenticated

---

### DELETE /api/lessons/[id]

Delete a lesson.

**Headers**:
```
Authorization: Bearer <token>
```

**Response** (200):
```json
{
  "success": true,
  "data": {
    "message": "Lesson deleted successfully"
  }
}
```

**Error Codes**:
- `NOT_FOUND` (404): Lesson not found
- `AUTHENTICATION_ERROR` (401): Not authenticated

---

## Error Codes

| Code | Status | Description |
|------|--------|-------------|
| `VALIDATION_ERROR` | 400 | Invalid input data |
| `AUTHENTICATION_ERROR` | 401 | Not authenticated |
| `AUTHORIZATION_ERROR` | 403 | Insufficient permissions |
| `NOT_FOUND` | 404 | Resource not found |
| `METHOD_NOT_ALLOWED` | 405 | HTTP method not allowed |
| `INVALID_CREDENTIALS` | 401 | Invalid email or password |
| `EMAIL_EXISTS` | 409 | Email already registered |
| `API_ERROR` | 500 | Internal server error |

## Rate Limiting

API endpoints may be rate-limited:
- **Authentication endpoints**: 5 requests per minute per IP
- **Other endpoints**: 100 requests per minute per user

## Versioning

Current API version: **v1**

Version is specified in the URL path:
- `/api/v1/auth/login`

Future versions will maintain backward compatibility.

