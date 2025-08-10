import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
// vite.config.js
export default defineConfig({
  plugins: [react()],
  preview: {
    port: 10000,
    host: true,
    allowedHosts: ['phonebook-frontend-gvjh.onrender.com']
  }
})
