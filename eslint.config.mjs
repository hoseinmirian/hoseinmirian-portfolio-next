// ESLint config for Next.js 16
// Using default export from eslint-config-next instead of FlatCompat
// Storybook plugin added back for v9 support

import nextConfig from 'eslint-config-next'
import storybook from 'eslint-plugin-storybook'

const eslintConfig = [
  {
    ignores: [
      'node_modules/**',
      '.next/**',
      'out/**',
      'build/**',
      'html/**',
      'public/**',
      'coverage/**',
      'cypress/**',
      'cypress.config.ts',
      'next-env.d.ts',
      'stories/**',
      'storybook-static/**'
    ]
  },
  ...nextConfig,
  ...storybook.configs['flat/recommended']
]

export default eslintConfig
