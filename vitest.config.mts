import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'
import tsconfigPaths from 'vite-tsconfig-paths'

export default defineConfig({
  plugins: [tsconfigPaths(), react()],
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: ['./vitest.setup.ts'],
    coverage: {
      reporter: ['text', 'json', 'html','lcov'],
      include: [
        'app/**/*.{ts,tsx}',
        'components/**/*.{ts,tsx}',
        'hooks/**/*.{ts,tsx}',
        'features/**/*.{ts,tsx}',
        'lib/**/*.{ts,tsx}'
      ],
      exclude: ['app/robots.ts', 'app/sitemap.ts', 'app/manifest.ts']
    },
    reporters: ['default', 'html']
  }
})
