# 🚀 Hossein Mirian Portfolio 

<div align="center">

[![CI - Test, Coverage & E2E](https://github.com/hoseinmirian/hoseinmirian-portfolio-next/actions/workflows/ci-test.yml/badge.svg)](https://github.com/hoseinmirian/hoseinmirian-portfolio-next/actions)
[![codecov](https://codecov.io/gh/hoseinmirian/hoseinmirian-portfolio-next/graph/badge.svg?token=BWMZ8H8BE0)](https://codecov.io/gh/hoseinmirian/hoseinmirian-portfolio-next)
[![Next.js 16](https://img.shields.io/badge/Next.js-16-black?logo=next.js)](https://nextjs.org/)
[![React 19](https://img.shields.io/badge/React-19-blue?logo=react)](https://react.dev/)
[![TypeScript 5.9](https://img.shields.io/badge/TypeScript-5.9-blue?logo=typescript)](https://www.typescriptlang.org/)

**A high-performance, production-ready portfolio built with a Clean Architecture mindset.**
*Showcasing modern full-stack patterns, strict type safety, and automated quality assurance.*

</div>

---

## 🛠️ Tech Stack & Features

### 🧠 Core Engine
* **Next.js 16 (App Router):** Leveraging Server Components, Suspense, and Streaming for optimal performance.
* **React 19:** Utilizing the latest React features and the new **React Compiler** (Babel plugin).
* **TypeScript 5.9:** Strict typing across the entire boundary (API, UI, and Testing).
* **Zod:** Runtime schema validation for API responses and form data.

### 🧱 Architecture & Pattern
* **Data Access Layer (DAL):** Decoupled business logic from the UI using a dedicated layer for data fetching and mutations, ensuring maintainability.
* **🤖 AI-Assisted Development:** Built with a "human-in-the-loop" AI workflow (Claude) to optimize complex logic and boilerplate.
* **🎨 UI System:** Crafted with **Tailwind CSS 4.1**, **shadcn/ui**, and **Lucide React** icons. Fully accessible (A11y) and themeable.

### ✅ Quality Assurance (Test-First Mindset)
* **🧪 Unit/Integration:** **Vitest** with JSDOM and `@testing-library/react`.
* **🎭 E2E Testing:** **Cypress** covering critical user journeys on preview branches via dynamic CI/CD.
* **📖 Storybook 10:** Component-driven development with isolated UI testing and accessibility audits.
* **🛠️ MSW (Mock Service Worker):** Seamless API mocking for both development and testing.

---

## 📊 Technical Overview

| Category | Tools |
| :--- | :--- |
| **Framework** | Next.js 16 (App Router), React 19, TypeScript 5.9 |
| **Styling** | Tailwind CSS 4.1, shadcn/ui, Lucide Icons |
| **Validation** | Zod (Schema Validation), React Hook Form |
| **Testing** | Vitest, Cypress, MSW (Mock Service Worker), Codecov |
| **Backend** | Mongoose (MongoDB), Data Access Layer (DAL) |
| **Tooling** | Storybook 10, ESLint, Prettier, Bundle Analyzer |
| **Insights** | Vercel Analytics, Speed Insights |

---

## 💻 Essential Commands

### 🏗️ Setup & Development
Start the local development server with pre-dev linting.
```bash
# Install dependencies
npm install

# Start development server (runs 'npm run lint' first)
npm run dev

# Open Storybook UI components documentation
npm run storybook
```

🧪 Testing Suite
Comprehensive testing from unit to end-to-end.

```bash
# Run all unit tests with Vitest
npm run test

# Run Vitest with interactive UI dashboard
npm run test:ui

# Generate test coverage report
npm run coverage

# Run E2E tests (Cypress) against local production build
npm run e2e:run
```

🚀 Production & Analysis
Build and verify the production bundle.

```bash
# Build for production (includes linting check)
npm run build

# Start production server
npm run start

# Analyze bundle size for performance optimization
npm run analyze
```

🧹 Quality & Formatting
Keep the codebase clean and strictly typed.

```bash
# Run ESLint check & TypeScript type-check
npm run lint
npm run ts

# Automatically fix linting/formatting issues
npm run lint:fix
```

👨‍💻 Author
Hossein Mirian Full-Stack Engineer | Clean Architecture Advocate | Node.js 22

<div align="center"> Built with ❤️ using Next.js 16 </div>
