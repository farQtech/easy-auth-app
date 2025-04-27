# Easy Auth Client (React)

This is the frontend for the Easy Auth App, built with [React](https://react.dev/) and [Vite](https://vitejs.dev/). It provides a modern, user-friendly interface for authentication and user management.

---

## 🚀 Features
- Modern React with hooks and functional components
- Form validation and password strength enforcement
- Centralized UI labels, validation, and API endpoints
- Toast notifications for user feedback
- Linting and formatting enforced
- TypeScript for type safety

---

## 📦 Dependencies
- `react`, `react-dom`, `react-router-dom`, `react-hook-form`, `yup`, `axios`, `js-cookie`, `react-toastify`
- **Dev:** `vite`, `typescript`, `eslint`, `vitest`, `@testing-library/react`, etc.

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
- **Preview (serve build locally):**
  ```sh
  npm run preview
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
- All sensitive logic handled on the backend (no secrets in client code)
- Form validation and password strength checks before submission
- No tokens or secrets stored in code or exposed in the build
- Linting and formatting enforced for code quality

---

## 📁 Production
- The client is built with Vite and output to `dist/`
- In production, the static files are served by the API using `@nestjs/serve-static`

---

## 📄 More Info
- [Root README](../../README.md)
- [API README](../api/README.md)

---
