# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Next.js 15 full-stack portfolio application (migrated from React). Chat-style UI where users select predefined questions and receive animated answers with optional media. Deployed on Vercel at https://next-umsungjun.vercel.app/.

## Commands

- `npm run dev` — Dev server with Turbopack
- `npm run build` — Generates Prisma client then builds (`prisma generate && next build`)
- `npm run lint` — ESLint
- `npm run prettier` — Format all files with Prettier
- `npm run download:i18n` — Sync translations from Google Sheets to `messages/` directory

## Tech Stack

- **Framework:** Next.js 15, React 19, TypeScript (strict mode)
- **Styling:** Tailwind CSS 3 (custom breakpoint `web: 1055px`)
- **State:** Zustand with sessionStorage persistence
- **Data Fetching:** SWR (client), Prisma 7 with PostgreSQL/Supabase (server)
- **i18n:** next-intl — Korean (default) and English, locale prefix always present in URL
- **Font:** Pretendard Variable (loaded via CDN in layout)

## Architecture

### Routing & Rendering

All pages are under `app/[locale]/`. Middleware (`middleware.ts`) redirects `/` and bare locale paths to `/[locale]/home`.

The home page uses **Next.js parallel routes**:
- `@chat/` — Client-side rendered chat interface (475px fixed width)
- `@side/` — Server-side rendered profile/contact section (hidden below 1055px)

### API Routes

- `GET /api/question` — Returns all questions ordered by ID
- `POST /api/answer` — Accepts `{ id: number }`, returns answers for that question

Both return `{ success: boolean, data: T[] }` shape.

### Database (Prisma + Supabase PostgreSQL)

Schema in `prisma/schema.prisma`: `Question` → has many `Answer` (cascade delete). Answers can have optional `mediaUrl` (Google Drive file ID) and `mediaType` (IMAGE | VIDEO).

Prisma client uses a **singleton pattern** in `lib/server/prisma.ts` to prevent connection accumulation during dev hot reload. Uses `@prisma/adapter-pg` for connection pooling via Supabase pgBouncer.

### Chat Flow

1. `SelectQuestion` fetches questions via SWR, filters out already-asked ones
2. User clicks a question → it's added to Zustand store → POST `/api/answer` fetches answers
3. Answers render with a 1s loading animation, then display text + optional media
4. Chat history lives in Zustand store backed by sessionStorage (resets per session)

### i18n

- Routing config: `i18n/routing.ts` — exports wrapped Next.js navigation APIs (Link, redirect, usePathname, useRouter)
- Server request config: `i18n/request.ts`
- Translation files: `messages/ko.json`, `messages/en.json`
- DB content is bilingual: `contentKo` / `contentEn` fields, selected by locale in components

### Environment Variables

Client (`NEXT_PUBLIC_`): `PHONE_NUMBER`, `MAIL`, `GOOGLE_DRIVE_IMG_URL`, `CHANNEL_PLUGIN_KEY`
Server: `DATABASE_URL` (pooled), `DIRECT_URL` (migrations)

## Commit Convention

Korean commit messages with prefixes: `Feat`, `Fix`, `Docs`, `Style`, `Refactor`, `Test`, `Chore`, `Design`, `Rename`, `Remove`

## Code Style

- Prettier: double quotes, 2-space indent, trailing comma ES5
- Import order enforced by `@trivago/prettier-plugin-sort-imports`: CSS → React → Next → `@/` aliases → node_modules → relative
- Path alias: `@/*` maps to project root
