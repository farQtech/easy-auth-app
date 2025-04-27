import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { configDefaults } from 'vitest/config'

export default defineConfig(() => {
  // Use the environment variable, fallback to localhost for local dev
  const apiProxy = process.env.VITE_API_URL || 'http://localhost:3000';

  return {
    plugins: [react()],
    server: {
      proxy: {
        '/api': {
          target: apiProxy,
          changeOrigin: true,
        },
      },
    },
    test: {
      environment: 'jsdom',
      globals: true, 
      exclude: [...configDefaults.exclude, 'e2e/**'],
    },
  }
})
