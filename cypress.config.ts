import { defineConfig } from 'cypress'

export default defineConfig({
  e2e: {
    baseUrl: process.env.E2E_BASE_URL || undefined,
    setupNodeEvents(on, config) {
      return config
    }
  }
})
