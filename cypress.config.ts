import { defineConfig } from 'cypress'
import config from '@/config'

export default defineConfig({
  e2e: {
    baseUrl: config.cypressBaseUrl,
    setupNodeEvents(on, config) {
      // implement node event listeners here
    }
  },
})
