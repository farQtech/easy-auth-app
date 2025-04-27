# Easy Auth API (NestJS)

This is the backend API for the Easy Auth App, built with [NestJS](https://nestjs.com/) and MongoDB. It provides secure authentication, user management, and serves the static frontend in production.

---

## 🚀 Features
- JWT authentication with secure password hashing (bcrypt)
- Rate limiting and account lockout for brute-force protection
- Centralized error and log messages for maintainability
- Helmet for secure HTTP headers
- Environment variable support for secrets and configuration
- Serves static frontend using `@nestjs/serve-static`
- Linting and formatting enforced

---

## 📦 Dependencies
- `@nestjs/common`, `@nestjs/core`, `@nestjs/jwt`, `@nestjs/mongoose`, `@nestjs/passport`, `@nestjs/serve-static`, `@nestjs/throttler`
- `mongoose`, `bcryptjs`, `passport`, `passport-jwt`, `passport-local`, `winston`, `nest-winston`, `helmet`
- **Dev:** `jest`, `typescript`, `eslint`, `prettier`, etc.

---

## 🛠️ Scripts
- **Development:**
  ```sh
  npm run dev
  ```
- **Build:**
  ```sh
  npm run build
  ```
- **Production:**
  ```sh
  npm run prod
  ```
- **Lint:**
  ```sh
  npm run lint
  ```
- **Test:**
  ```sh
  npm run test
  ```

---

## 🔒 Security & Best Practices
- JWT tokens for stateless authentication
- Passwords hashed with bcrypt before storage
- Rate limiting and account lockout to prevent brute-force attacks
- Helmet for secure HTTP headers
- All secrets and sensitive config via environment variables
- Centralized error and log messages for easier maintenance
- Linting and formatting enforced for code quality

---

## 📁 Serving the Client
- In production, the API serves the static frontend from `../client/dist` using `@nestjs/serve-static`.
- All API endpoints are available under `/api`.

---

## 📄 More Info
- [Root README](../../README.md)
- [Client README](../client/README.md)

---
