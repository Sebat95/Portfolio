import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react()
  ],
  build: {
    sourcemap: false, // disable sourcemaps in production for smaller builds
    chunkSizeWarningLimit: 500 // since threejs is big, allow for bigger chunks
  }
})
