import '@testing-library/jest-dom/vitest'
import ResizeObserver from 'resize-observer-polyfill'
import { cleanup } from '@testing-library/react'
import { createMockRouter } from '@/tests/test-utility'
import { server } from '@/tests/mocks/server'
import { resetDb } from '@/tests/mocks/db'

vi.mock('next/navigation', () => ({
  useRouter: () => createMockRouter({}),
  usePathname: () => '/',
  useSearchParams: () => new URLSearchParams()
}))

// Global test setup - runs before all tests
beforeAll(() => {
  // mock Service Worker
  server.listen()

  // Mock fetch
  global.fetch = vi.fn()

  // Mock console methods to reduce noise in tests (optional - comment out if you need to see logs)
  vi.spyOn(console, 'error').mockImplementation(() => {})
  vi.spyOn(console, 'warn').mockImplementation(() => {})

  // Mock IntersectionObserver
  global.IntersectionObserver = vi.fn().mockImplementation(() => ({
    observe: vi.fn(),
    unobserve: vi.fn(),
    disconnect: vi.fn()
  }))

  // Mock ResizeObserver
  global.ResizeObserver = ResizeObserver

  // Mock scrollTo and scroll methods
  window.scrollTo = vi.fn()
  window.HTMLElement.prototype.scrollIntoView = vi.fn()
  window.HTMLElement.prototype.hasPointerCapture = vi.fn()
  window.HTMLElement.prototype.releasePointerCapture = vi.fn()
  window.HTMLElement.prototype.setPointerCapture = vi.fn()

  // Mock localStorage with more realistic behavior
  const createStorageMock = () => {
    let store: Record<string, string> = {}
    return {
      getItem: vi.fn((key: string) => store[key] || null),
      setItem: vi.fn((key: string, value: string) => {
        store[key] = String(value)
      }),
      removeItem: vi.fn((key: string) => {
        delete store[key]
      }),
      clear: vi.fn(() => {
        store = {}
      }),
      get length() {
        return Object.keys(store).length
      },
      key: vi.fn((index: number) => Object.keys(store)[index] || null)
    }
  }

  Object.defineProperty(window, 'localStorage', {
    value: createStorageMock()
  })

  Object.defineProperty(window, 'sessionStorage', {
    value: createStorageMock()
  })
})

// Runs before each test
beforeEach(() => {
  // Mock window.matchMedia - do this in beforeEach so it's fresh for each test
  Object.defineProperty(window, 'matchMedia', {
    writable: true,
    value: vi.fn().mockImplementation((query: string) => ({
      matches: false,
      media: query,
      onchange: null,
      addListener: vi.fn(), // deprecated
      removeListener: vi.fn(), // deprecated
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
      dispatchEvent: vi.fn()
    }))
  })

  // DON'T use fake timers by default - only when needed
  // vi.useFakeTimers() // Comment this out - enable per test when needed

  // Clear all mocks before each test
  vi.clearAllMocks()
})

// Runs after each test
afterEach(() => {
  // Cleanup DOM after each test
  cleanup()

  // Clean up timers if they were used
  if (vi.isFakeTimers()) {
    vi.runOnlyPendingTimers()
    vi.useRealTimers()
  }

  // Mock cleanup - order matters!
  vi.clearAllMocks() // Clear call history and results
  // vi.resetAllMocks() // Reset implementation to original mock
  // DON'T use vi.restoreAllMocks() here - it would break our global mocks
  server.resetHandlers() // Reset any request handlers that are added during the tests
})

// Global teardown - runs after all tests
afterAll(() => {
  resetDb() // Reset in-memory database
  // Restore all mocks
  vi.restoreAllMocks()
  server.close()
})
