# AGENTS.md

## Referenced Agent Skills

- vercel-react-best-practices

## General Guidelines

- This file provides guidance to AI coding agents when working with code in this repository.

- When reviewing or generating React / Next.js code, ALWAYS apply the
  Vercel React Best Practices agent skill.

- Assume React Compiler is enabled. Do NOT suggest manual memoization
  unless it is proven necessary.

- When suggesting performance optimizations, ALWAYS explain the tradeoff
  and why the change is necessary.

- When generating React code, apply the rules in: skills/react-best-practices.md

## React Best Practices (MANDATORY)

Follow **Vercel React Best Practices** strictly.

### Rendering & Performance

- Do NOT use `useMemo` or `useCallback` unless:
    - There is a proven performance issue
    - OR the component is demonstrably re-rendering too often
- Prefer derived values over state
- Avoid unnecessary re-renders
- Avoid inline object / function props only when it actually matters

---

### State Management

- Prefer local state first
- Lift state only when truly shared
- Avoid global state unless unavoidable
- Context must be:
    - Split by concern
    - Memoized
    - Small and focused

🚫 Never create a “god context”

---

### Effects (`useEffect`)

- `useEffect` is ONLY for:
    - External systems
    - Subscriptions
    - Imperative APIs
- Do NOT use `useEffect` for:
    - Derived state
    - Data transformation
    - Syncing props to state

Every effect must answer:
> “What external system am I syncing with?”

---

### Data Fetching

- Fetch data at the highest reasonable level
- Avoid fetches in deeply nested components
- Avoid waterfalls
- Prefer parallel fetching
- Components should mostly *consume* data, not fetch it

---

## Component Design Rules

- Components do ONE thing
- Prefer composition over configuration
- Avoid boolean prop explosions (`isAdmin`, `isEditable`, `isCompact`)
- Files over ~300 lines must be split
- JSX should remain readable (no logic-heavy JSX)

---

## Hooks Rules

- Custom hooks:
    - Must start with `use`
    - Must NOT return JSX
    - Must encapsulate real logic
- Do NOT create hooks that simply wrap another hook with no added value

---

## Error Handling

- Prefer explicit error states
- Do NOT swallow errors
- Error boundaries only for UI crashes

---

## Testing Philosophy (IMPORTANT)

- Test behavior, not implementation
- Test what the user sees and does
- Prefer:
    - `getByRole`
    - `getByText`
- try to use `within` to scope the component being tested
- Avoid:
    - Snapshot tests (unless layout is stable)
    - Testing internal state
    - Mocking React internals

---

## TypeScript Rules

- Avoid `any`
- Prefer explicit return types for exported functions
- Use discriminated unions for complex states
- Narrow types early

---

## Code Style

- Prefer named exports
- Early returns over nested conditionals
- Delete code when possible
- Avoid clever one-liners

---

## What the Agent SHOULD Do

- Suggest the simplest working solution
- Call out anti-patterns explicitly
- Explain *why* something is wrong
- Prefer removing code over adding code

---

## What the Agent MUST NOT Do

- Do NOT add memoization “just in case”
- Do NOT invent APIs or libraries
- Do NOT refactor unrelated code
- Do NOT introduce global state unnecessarily

## Project Overview

This is a portfolio website for Hossein Mirian built with Next.js 15 (App Router), TypeScript, and MongoDB. The project
uses Turbopack, Vitest for testing, Storybook for component development, and includes advanced features like React
Compiler and MSW for mocking.

## Development Commands

### Running the Application

- `npm run dev` - Start development server with Turbopack (runs linting first)
- `npm run dev:no-turbopack` - Start development server without Turbopack
- `npm run build` - Build production bundle with Turbopack (runs linting first)
- `npm run build:no-turbopack` - Build without Turbopack
- `npm start` - Start production server

### Testing

- `npm test` - Run tests in watch mode with Vitest
- `npm run test:ui` - Run tests with Vitest UI
- `npm run coverage` - Generate coverage report
- `npm run test:coverage-ui` - Run tests with UI and coverage enabled

### Linting & Formatting

- `npm run lint` - Run ESLint
- `npm run lint:fix` - Fix ESLint errors automatically

### Storybook

- `npm run storybook` - Start Storybook dev server on port 6006
- `npm run build-storybook` - Build Storybook for production

### Analysis

- `npm run analyze` - Analyze bundle size with webpack-bundle-analyzer

## Architecture

### Layered Architecture Pattern

The codebase follows a strict separation of concerns with the following layers:

1. **Pages Layer** (`app/` directory)
    - Next.js 15 App Router pages
    - Each page uses Server Components by default
    - Pages call server actions from the `actions/` directory

2. **Server Actions Layer** (`actions/` directory)
    - Contains Next.js server actions
    - Validates data using Zod schemas from DTOs
    - Calls DAL layer for database operations
    - Handles error responses and formats data for the client

3. **DAL (Data Access Layer)** (`dal/` directory)
    - Contains database access logic
    - All DAL files MUST import `'server-only'` at the top
    - Communicates with Mongoose models in the `db/` directory
    - Transforms raw Mongoose documents into DTOs
    - Example: `appDataDAL.findAll()` fetches from MongoDB and returns typed data

4. **DTO Layer** (`dal/dto/` directory)
    - Defines Zod schemas and TypeScript types for data contracts
    - Provides schemas for Create, Update operations
    - Includes factory functions for testing (e.g., `createAppDataDTO`)

5. **Database Layer** (`db/` directory)
    - Contains Mongoose models and database connection logic
    - `db/db.ts` implements a singleton Database class for connection management
    - Models are defined with Zod schemas for validation
    - Handles connection pooling and hot-reload in development

6. **Features Layer** (`features/` directory)
    - Organized by feature (e.g., `portfolio/`, `resume/`, `contact/`)
    - Each feature contains:
        - `components/` - Feature-specific React components
        - `hooks/` - Custom React hooks (if needed)
        - `actions/` - Feature-specific server actions (if needed)

7. **Components Layer** (`components/` directory)
    - Shared/reusable React components
    - `components/ui/` contains shadcn/ui components (Button, Dropdown, etc.)

8. **Providers Layer** (`providers/` directory)
    - React Context providers (e.g., `AppDataProvider` for global app data)
    - Theme provider using `next-themes`

### Key Architectural Patterns

- **Server-Only Code**: DAL and database code use `'server-only'` import to prevent client-side inclusion
- **Type Safety**: Zod schemas define runtime validation and TypeScript types
- **Error Handling**: Centralized error handling utilities in `db/utils.ts`
- **Database Singleton**: Single MongoDB connection shared across the app with hot-reload safety
- **Path Aliases**: Use `@/*` to import from project root (configured in `tsconfig.json`)

### Data Flow Example

```
Page (app/portfolio/page.tsx)
  ↓ calls
Server Action (actions/appData.ts → getAllAppData)
  ↓ calls
DAL (dal/appData-dal.ts → appDataDAL.findAll)
  ↓ calls
Mongoose Model (db/models/appDataModel.ts)
  ↓ queries
MongoDB Database
```

## Important Technical Notes

### Environment Variables

- `.env.development` - Development environment config
- `.env.production` - Production environment config
- Required variables: `DATABASE_URI`, `DATABASE_NAME`, `NEXT_PUBLIC_SITE_URL`

### React & Next.js

- Uses React 19 and Next.js 15 with App Router
- React Compiler is enabled (`experimental.reactCompiler: true`)
- Font optimization using `next/font` with Josefin Sans and Lora
- Vercel Analytics and Speed Insights integrated

### Testing

- Vitest configured with jsdom environment
- Testing Library for component tests
- MSW (Mock Service Worker) for API mocking
- Global test utilities in `vitest.setup.ts`
- Coverage includes `app/`, `components/`, `hooks/`, `features/`, `lib/`
- Excludes: `robots.ts`, `sitemap.ts`, `manifest.ts`, `index.ts`, `*.d.ts`

### Styling

- Tailwind CSS v4 with custom configuration
- Uses `@tailwindcss/postcss` plugin
- Custom fonts: Josefin Sans (headings/body) and Lora (serif)
- Theme switching with `next-themes`
- shadcn/ui components with `class-variance-authority` and `tailwind-merge`

### Node Version

- Requires Node 22 (specified in `engines` field in `package.json`)

## Common Patterns

### Adding a New Feature

1. Create feature directory in `features/[feature-name]/`
2. Add components in `features/[feature-name]/components/`
3. Create DAL in `dal/[feature-name]-dal.ts` (with `'server-only'`)
4. Define DTOs in `dal/dto/[feature-name]-dto.ts`
5. Create Mongoose model in `db/models/[feature-name]Model.ts`
6. Add server action in `actions/[feature-name].ts`
7. Create page in `app/[feature-name]/page.tsx`

### Creating Server Actions

- Always validate inputs with Zod schemas from DTOs
- Use error utilities from `db/utils.ts` for consistent error handling
- Return type should be `{ success: boolean, data?: T, errors?: string[] }`

### Writing Tests

- Place tests near the code they test (e.g., `component.test.tsx` next to `component.tsx`)
- Use Testing Library queries (`getByRole`, `getByText`, etc.)
- Use MSW for mocking API calls when needed
