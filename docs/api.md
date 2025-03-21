# CodeSmart API Documentation

## Base URL

- Development: `http://localhost:3000`
- Production: (TBD)

## Endpoints

### 1. POST /api/hints

Fetches a hint for a LeetCode problem using the Gemini API, cached in Redis.

#### Request

- **Method**: POST
- **Body**:
  ```json
  {
    "problem": "Two Sum"
  }
  ```
