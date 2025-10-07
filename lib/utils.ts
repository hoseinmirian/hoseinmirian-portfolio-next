import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

// combine class names
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// base url helper
// lib/getBaseUrl.ts (or inside lib/utils.ts)

function stripTrailingSlash(url: string) {
  return url.endsWith('/') ? url.slice(0, -1) : url
}

/**
 * Returns the canonical base URL.
 *
 * Precedence (server side):
 * 1. Explicit canonical env: NEXT_PUBLIC_SITE_URL (recommended, include https://)
 * 2. Vercel production domain: VERCEL_PROJECT_PRODUCTION_URL
 * 3. Current deployment (preview/production): VERCEL_URL
 * 4. Fallback: http://localhost:3000
 *
 * Client side:
 * Uses window.location.origin (never for canonical SEO usage during build).
 *
 * Notes:
 * - For sitemap/OG/canonical tags: prefer an explicit NEXT_PUBLIC_SITE_URL.
 * - VERCEL_URL / VERCEL_BRANCH_URL are ephemeral for previews; avoid them for canonical links.
 */
export function getBaseUrl(): string {
  if (typeof window !== 'undefined') {
    return window.location.origin
  }

  // 1. Explicit canonical (set this in all envs)
  const explicit = process.env.NEXT_PUBLIC_SITE_URL
  if (explicit) {
    return stripTrailingSlash(explicit)
  }

  // 2. Production domain (newer Vercel system var)
  const prod = process.env.VERCEL_PROJECT_PRODUCTION_URL
  if (prod) {
    return `https://${stripTrailingSlash(prod)}`
  }

  // 3. Current deployment (preview or production)
  const deploy = process.env.VERCEL_URL
  if (deploy) {
    return `https://${stripTrailingSlash(deploy)}`
  }

  // 4. Local dev fallback
  return 'http://localhost:3000'
}