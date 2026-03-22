# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

PayExtend is a monorepo for a browser extension management SaaS platform. It consists of a NestJS backend API and a Vue 3 SPA dashboard, orchestrated via Docker Compose with Nginx as a reverse proxy.

## Monorepo Structure

- `apps/backend/` — NestJS API (TypeScript, TypeORM, MariaDB)
- `apps/spa/` — Vue 3 frontend (Vite, Pinia, Tailwind CSS)
- `apps/spa/nginx/` — Nginx config used inside the SPA Docker image
- `packages/` — Shared configs (typescript-config, ui)
- `docs/` — Entity and integration documentation

Package manager: **pnpm** (v10.27.0). Build orchestration: **Turbo**.

## Commands

### Full Stack (Docker)

```bash
docker compose up --build     # Start all services (nginx:7000, backend:3000, adminer:9090)
docker compose up -d          # Detached mode
docker compose down           # Stop all services
```

### Backend (`apps/backend/`)

```bash
# From repo root
yarn start:dev       # NestJS watch mode
yarn build           # nest build → dist/
yarn lint            # ESLint with --fix
yarn test            # Jest unit tests
yarn test:e2e        # E2E tests
yarn test:watch      # Jest watch mode
yarn test:cov        # Coverage report
yarn typeorm         # TypeORM CLI (use for migrations)
```

### Frontend (`apps/spa/`)

```bash
# From apps/spa-old/
npm run dev          # Vite dev server on port 9090
npm run build        # Vite production build → dist/
npm run type-check   # vue-tsc type checking
npm run lint         # ESLint with --fix
npm run format       # Prettier
```

## Architecture

### Request Flow

```
Browser → Nginx (:7000) → /api/* → backend:3000 (NestJS)
                        → /* → Vue SPA (static files)
```

### Backend Architecture

NestJS modules under `apps/backend/src/modules/`:

| Module | Purpose |
|---|---|
| `auth/` | JWT + Local Passport strategies, register/login endpoints, httpOnly cookie |
| `extension-context/` | Browser extension configuration management |
| `notifications/` | Notification management |
| `chrome-webstore/` | Chrome Web Store API integration, extension validation |
| `dashboard/` | Dashboard configuration (app name, version, logo) |

**Global JWT guard** (`JwtGuard`) is registered as `APP_GUARD` — all routes require authentication by default. Use `@Public()` decorator to opt out.

**Database entities** live in `apps/backend/src/dtos/entities/`: User, Installation, ExtensionContext, DomSelector, Notification, ConfigurationSettings.

**Environment config** is loaded from `.development.env` at the backend root. Required variables: `DB_HOST`, `DB_PORT`, `DB_USERNAME`, `DB_PASSWORD`, `DB_NAME`, `SECRET` (JWT), `PORT`.

### Frontend Architecture

Vue 3 SPA with Vite (`apps/spa/src/`):

- **Router** (`router/index.ts`): History-mode routing with a global navigation guard that checks for a JWT token in localStorage (Pinia `auth` store). Unauthenticated users are redirected to `/auth/login` with a `redirect` query param.
- **Stores** (`stores/`): Pinia with `pinia-plugin-persistedstate`. The `auth` store persists to localStorage under the key `'auth'`.
- **Views** (`views/`): Organized by feature — `auth/`, `extension-management/`, `dom-selectors/`, `integrations/` (payment, smtp, chrome-webstore), `dashboard/`.
- **Layouts** (`layouts/`): Sidebar navigation defined in `layouts/components/sidenav/components/AppMenu.vue`.
- **API calls**: Auth store POSTs to `/api/auth/login`. All API calls go through the `/api/` prefix (proxied by Nginx to the backend).
- Path alias `@` resolves to `./src`.

### Nginx

Nginx runs inside the SPA Docker container (not a separate service). Config at `apps/spa/nginx/nginx.conf`:
- Serves Vue SPA with HTML5 history fallback (`try_files $uri $uri/ /index.html`)
- Proxies `/api/` → `http://backend:3000/`
- Long-term caching for `/assets/` (1 year), short cache for source maps
- Gzip compression enabled

## Database

MariaDB 10.11 in Docker. TypeORM is configured with `synchronize: true` in development (auto-creates/updates schema). For production migrations, use the TypeORM CLI via `yarn typeorm`.

Docker Compose database credentials:
- Host: `db`, Port: `3306`
- User: `x64`, Password: `password`, DB: `payextend_platform`

Adminer UI available at `http://localhost:9090`.

## Key Integrations

- **Payment**: Stripe, Polar.sh, LemonSqueezy (UI routes exist; backend integration in progress)
- **Chrome Web Store API**: Validates and fetches extension metadata via `ChromeWebstoreModule`
- **Firebase**: `nestjs-firebase` package integrated in backend
- **Google OAuth**: `google-auth-library` available in backend

## Code Style

- Backend: Prettier with `singleQuote: true`, `trailingComma: 'all'`; TypeScript with decorators enabled
- Frontend: Same Prettier config; Vue 3 Composition API with `<script setup>`
- ESLint extends `@typescript-eslint/recommended` with strict type rules disabled
