import type { ReactElement, ReactNode } from 'react'
import { render } from '@testing-library/react'
import { ThemeProvider } from 'next-themes'
import type { RenderOptions } from '@testing-library/react'
import ToasterProvider from '@/providers/ToasterProvider'
import {
  AppRouterContext,
  type AppRouterInstance
} from 'next/dist/shared/lib/app-router-context.shared-runtime'
import { HttpResponse, delay, http } from 'msw'
import { server } from './mocks/server'

// ✅ ---- msw helpers
export const simulateDelay = (endpoint: string) => {
  server.use(
    http.get(endpoint, async () => {
      await delay()
      return HttpResponse.json([])
    })
  )
}

export const simulateError = (endpoint: string) => {
  server.use(http.get(endpoint, () => HttpResponse.error()))
}

export const simulateResponse = <T extends Record<string, unknown>>(
  endpoint: string,
  data: T,
  options?: { delay?: number; status?: number }
) => {
  server.use(
    http.get(endpoint, async () => {
      if (options?.delay) {
        await delay(options.delay)
      }
      return HttpResponse.json(data, { status: options?.status ?? 200 })
    })
  )
}

// ✅ Mock App Router Factory for App Router
export function createMockRouter(
  overrides: Partial<AppRouterInstance> = {}
): AppRouterInstance {
  return {
    back: vi.fn(),
    forward: vi.fn(),
    refresh: vi.fn(),
    push: vi.fn(),
    replace: vi.fn(),
    prefetch: vi.fn(),
    ...overrides // 👈 allows overrides per test
  }
}

const AllTheProviders = ({
  children,
  router
}: {
  children: ReactNode
  router?: Partial<AppRouterInstance>
}) => {
  return (
    <AppRouterContext.Provider value={createMockRouter(router)}>
      <ThemeProvider
        enableSystem
        attribute='class'
        defaultTheme='system'
        disableTransitionOnChange
      >
        {children}
        <ToasterProvider />
      </ThemeProvider>
    </AppRouterContext.Provider>
  )
}

// Custom render with providers by default
const renderWithProviders = (
  ui: ReactElement,
  options?: Omit<RenderOptions, 'wrapper'> & {
    router?: Partial<AppRouterInstance>
  }
) => {
  const { router, ...renderOptions } = options || {}
  return render(ui, {
    wrapper: ({ children }) => (
      <AllTheProviders router={router}>{children}</AllTheProviders>
    ),
    ...renderOptions
  })
}

// Alternative: render without any wrapper (pure component)
const renderWithoutProviders = (ui: ReactElement, options?: RenderOptions) =>
  render(ui, options)

// Re-export everything
export * from '@testing-library/react'
// Override render method
export { renderWithoutProviders as render }
export { renderWithProviders }
export {
  default as userEvent,
  type UserEvent,
  type keyboardKey,
  type Options
} from '@testing-library/user-event'
