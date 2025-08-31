import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/icon-preview/',
  build: {
    rollupOptions: {
      input: './index.html'
    }
  }
})
