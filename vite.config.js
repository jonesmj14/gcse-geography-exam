import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// GITLAB PAGES FIX:
// base must match your GitLab project name exactly.
// e.g. repo is gitlab.com/username/gcse-geography-exam → base = '/gcse-geography-exam/'
// During CI, CI_PROJECT_NAME is set automatically by GitLab.
// For local dev, base defaults to '/' so hot-reload works normally.
const GITLAB_PROJECT_NAME = process.env.CI_PROJECT_NAME || 'gcse-geography-exam'

export default defineConfig({
  plugins: [react()],
  base: process.env.CI ? `/${GITLAB_PROJECT_NAME}/` : '/',
  build: {
    outDir: 'dist',
    sourcemap: false,
  },
})
