# Easy Auth App Monorepo

[![CI](https://github.com/farQtech/easy-auth-app/actions/workflows/ci.yml/badge.svg)](https://github.com/farQtech/easy-auth-app/actions/workflows/ci.yml)

Welcome to the **Easy Auth App**! This monorepo contains both the API (NestJS) and Client (React) projects for a modern, secure authentication system.

---

## 📦 Project Structure

- [`apps/api`](./apps/api/README.md) — NestJS API (backend)
- [`apps/client`](./apps/client/README.md) — React Client (frontend)

---

## 🚀 Quick Start

### 1. Install dependencies (from root):
```sh
npm install
```

### 2. Development
- **API:**
  ```sh
  cd apps/api
  npm run dev
  ```
- **Client:**
  ```sh
  cd apps/client
  npm run dev
  ```

### 3. Production
- **Build everything:**
  ```sh
  npm run build
  ```
- **Start API (serves both API and static client):**
  ```sh
  npm run prod
  ```

---

## 🔒 Security & Best Practices

### API (NestJS)
- Uses JWT authentication and bcrypt for password hashing
- Rate limiting and account lockout for brute-force protection
- Centralized error and log messages
- Helmet for secure HTTP headers
- Environment variables for secrets
- Linting and formatting enforced

### Client (React)
- All sensitive logic handled on the backend
- Form validation and password strength enforcement
- No secrets or tokens stored in code
- Linting and formatting enforced

---

## 📚 Project Details
- **Monorepo** managed with [Turborepo](https://turbo.build/)
- **TypeScript** everywhere
- **Modern stack:** NestJS, React, Vite, Mongoose, Vitest/Jest
- **CI/CD ready** (add your pipeline of choice)
- **Easy to extend** for new features

---

## 📄 More Info
- [API README](./apps/api/README.md)
- [Client README](./apps/client/README.md)

---
