import { defineConfig } from 'cypress'

export default defineConfig({
  e2e: {
    baseUrl: 'http://localhost:3000',
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
    retries: {
      // Run the test up to 2 extra times in CI if it fails
      runMode: 2,
      // Don't retry while you're locally developing (it's annoying)
      openMode: 0
    },
    // This helps if your Next.js app takes a second to load on the preview URL
    defaultCommandTimeout: 10000
  }
})