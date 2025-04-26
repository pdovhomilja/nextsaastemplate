# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands
- `pnpm dev` - Start development server
- `pnpm build` - Build for production (generates Prisma client, pushes DB schema, builds Next.js)
- `pnpm lint` - Run ESLint for code quality checks
- `pnpm start` - Start production server

## Code Style
- **TypeScript**: Use strict typing; avoid `any` type
- **Imports**: Group imports (React, third-party, internal); use `@/` path alias
- **Components**: Use shadcn/ui component patterns with Tailwind CSS
- **Authentication**: NextAuth.js with server components/actions
- **Formatting**: Follow ESLint config (`next/core-web-vitals`)
- **Naming**: PascalCase for components; camelCase for functions/variables
- **Error Handling**: Use Zod for validation; FormError/FormSuccess components for UI feedback
- **Internationalization**: Use next-intl with locale files in messages directory
- **State Management**: React state hooks; server actions for data mutations