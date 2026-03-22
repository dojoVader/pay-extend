# PayExtend — System Architecture

## Overview

PayExtend is a monorepo SaaS platform for browser extension management. The stack consists of three main layers: an **Nginx** reverse proxy, a **NestJS** REST API, and a **Vue 3** SPA dashboard.

```
┌─────────────────────────────────────────────────────────────┐
│                        Browser                              │
└────────────────────────┬────────────────────────────────────┘
                         │ HTTP
                         ▼
┌─────────────────────────────────────────────────────────────┐
│                   Nginx  (:7000)                            │
│                                                             │
│   /api/*  ──────────────────────────►  backend:3000         │
│   /*       ──────────────────────────►  Vue SPA (static)    │
└─────────────────────────────────────────────────────────────┘
         │                                        │
         ▼                                        ▼
┌─────────────────┐                  ┌────────────────────────┐
│  NestJS Backend │                  │     Vue 3 SPA          │
│  (port 3000)    │                  │  (Vite build / dist/)  │
└────────┬────────┘                  └────────────────────────┘
         │
         ▼
┌─────────────────┐
│  MariaDB 10.11  │
│  (port 3306)    │
└─────────────────┘
```

---

## Nginx

**Location:** `apps/spa/nginx/nginx.conf`
**Exposed port:** `7000`

Nginx runs inside the SPA Docker container and serves as the single entry point for all traffic.

### Responsibilities

| Rule | Behaviour |
|---|---|
| `location /api/` | Reverse-proxy to `http://backend:3000/` |
| `location /assets/` | Serve static assets with a 1-year `Cache-Control` header |
| `location /` | Serve `index.html` with HTML5 history fallback (`try_files $uri $uri/ /index.html`) |
| Gzip | Enabled for `text/html`, `text/css`, `application/javascript`, `application/json` |

### Key config excerpt

```nginx
server {
    listen 80;

    location /api/ {
        proxy_pass http://backend:3000/;
    }

    location /assets/ {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }

    location / {
        root /usr/share/nginx/html;
        try_files $uri $uri/ /index.html;
    }
}
```

---

## NestJS Backend

**Location:** `apps/backend/`
**Port:** `3000`
**Language:** TypeScript
**ORM:** TypeORM (MariaDB, `synchronize: true` in development)

### Module Map

```
src/
├── app.module.ts               Root module — wires everything together
└── modules/
    ├── auth/                   Authentication (JWT + Local Passport)
    │   ├── auth.controller.ts  POST /auth/register, /auth/login, GET /auth/verify
    │   ├── auth.service.ts     register(), login(), validateUser()
    │   ├── guards/
    │   │   └── jwtauth.guard   Reads httpOnly cookie, verifies JWT
    │   └── strategies/
    │       ├── jwt.strategy    Bearer token strategy (Passport)
    │       └── local.strategy  Username/password strategy (Passport)
    ├── extension-context/      Browser extension configuration
    ├── chrome-webstore/        Chrome Web Store API integration
    ├── notifications/          Notification management
    └── dashboard/              Dashboard config (app name, version, logo)
```

### Authentication Flow

```
Client                   Nginx              NestJS (AuthController)
  │                        │                        │
  │── POST /api/auth/login ►│── POST /auth/login ───►│
  │                        │                        │  bcrypt.compare()
  │                        │                        │  jwtService.sign()
  │◄── Set-Cookie: jwt ────│◄── 200 + access_token ─│
  │    (httpOnly, 1h)      │                        │
  │                        │                        │
  │── GET /api/auth/verify ►│── GET /auth/verify ───►│
  │    (cookie sent auto)  │                        │  JwtGuard reads cookie
  │◄── { email, role } ────│◄── 200 user payload ───│
```

### Database Entities

| Entity | Table | Key columns |
|---|---|---|
| `User` | `user` | `id`, `email`, `password` (bcrypt), `name`, `role` |
| `Installation` | `installation` | `id`, `user_id` |
| `ExtensionContext` | `extension_context` | `id`, `extensionItemId`, `status` |
| `DomSelector` | `dom_selector` | `id`, `key`, `selector`, `strategy`, `isActive` |
| `Notification` | `notification` | `id`, `message`, `read` |
| `ConfigurationSettings` | `configuration_settings` | `id`, `appName`, `version` |

### Environment Variables (`.development.env`)

| Variable | Purpose |
|---|---|
| `DB_HOST` | MariaDB host (Docker: `db`) |
| `DB_PORT` | MariaDB port (default `3306`) |
| `DB_USERNAME` | Database user |
| `DB_PASSWORD` | Database password |
| `DB_NAME` | Database name |
| `SECRET` | JWT signing secret |
| `PORT` | NestJS listen port |

---

## Vue 3 SPA

**Location:** `apps/spa-next/`
**Build tool:** Vite
**State management:** Pinia (with `pinia-plugin-persistedstate`)
**Styling:** Tailwind CSS
**Icons:** Iconify (`@iconify/vue`)

### Directory Structure

```
src/
├── main.ts                 App entry — mounts Vue, registers Pinia + Router
├── App.vue
├── constant/
│   └── index.ts            PAYEXTEND_BASE_URL
├── router/
│   └── index.ts            History-mode router + navigation guard
├── stores/
│   └── auth.ts             Pinia auth store (persisted to localStorage)
├── helpers/
│   ├── jwt.ts              decodeJWT helper
│   └── fetchWithAuth.ts    Authenticated fetch wrapper
├── layouts/
│   ├── AppLayout.vue       Sidebar + Topbar shell
│   └── components/
│       ├── Sidebar.vue
│       └── Topbar.vue      Breadcrumb, search, user name + avatar
├── components/
│   └── PageHeader.vue
└── views/
    ├── auth/
    │   ├── login/          Login form → POST /api/auth/login
    │   ├── register/       Register form → POST /api/auth/register
    │   └── logout/
    ├── dashboard/          Calls GET /api/auth/verify on mount
    ├── extension-management/
    ├── dom-selectors/
    ├── extension-logs/
    └── integrations/
        ├── stripe/
        ├── smtp/
        └── chrome-webstore/
```

### Routing & Auth Guard

All routes except `/auth/*` and `/` require a valid session. The navigation guard in `router/index.ts` checks `localStorage` for a persisted auth token and redirects unauthenticated users to `/auth/login?redirect=<original-path>`.

```
/               → redirect → /dashboard
/dashboard      → guarded  → views/dashboard/index.vue
/auth/login     → public   → views/auth/login/index.vue
/auth/register  → public   → views/auth/register/index.vue
/extension/*    → guarded
/integrations/* → guarded
```

### API Communication

All API calls use the `/api/` prefix, which Nginx proxies to the NestJS backend. The `auth/login` endpoint sets an httpOnly JWT cookie; all subsequent protected requests send it automatically via `credentials: 'include'`.

---

## Docker Compose

```
services:
  db          MariaDB 10.11          (internal :3306)
  backend     NestJS app             (internal :3000)
  spa         Nginx + Vue SPA build  (host :7000)
  adminer     DB admin UI            (host :9090)
```

The `spa` container builds the Vue app at image build time (`npm run build`) and serves the resulting `dist/` directory through Nginx. The `backend` container connects to `db` over the Docker bridge network using the hostname `db`.

---

## Request Lifecycle (end-to-end)

```
1. Browser navigates to http://localhost:7000/dashboard
2. Nginx serves index.html (Vue SPA)
3. Vue router guard checks localStorage for auth token
4. Dashboard mounts → GET /api/auth/verify (cookie attached automatically)
5. Nginx proxies → GET http://backend:3000/auth/verify
6. JwtGuard reads req.cookies.jwt, verifies signature
7. NestJS returns { email, role, sub }
8. Dashboard renders; Topbar displays user name from Pinia store
```
