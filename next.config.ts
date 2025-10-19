import type { NextConfig } from 'next'
import bundleAnalyzer from '@next/bundle-analyzer'

const withBundleAnalyzer = bundleAnalyzer({
  enabled: process.env.ANALYZE === 'true'
})

const nextConfig: NextConfig = {
  outputFileTracingRoot: __dirname, // silence warning about double package.json (can be fixed in later Next.js versions)
  experimental: {
    reactCompiler: true
  }
}

export default withBundleAnalyzer(nextConfig)
