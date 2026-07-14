<p align="center">
  <img src="./app/web/omnipost-web/apps/web/omnipost-web-fullstack/public/logo.png" alt="OmniPost Logo" width="120" />
</p>

<h1 align="center">OmniPost</h1>

<p align="center">
  <strong>Write once. Publish everywhere.</strong>
</p>

<p align="center">
  An open-source social media management platform for managing, scheduling, and publishing content across multiple platforms from a single dashboard.
</p>

<p align="center">
  <img alt="Status" src="https://img.shields.io/badge/status-active_development-orange?style=for-the-badge" />
  <img alt="License" src="https://img.shields.io/badge/license-MIT-blue?style=for-the-badge" />
  <img alt="React" src="https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react" />
  <img alt="Open Source" src="https://img.shields.io/badge/Open_Source-Yes-success?style=for-the-badge&logo=github" />
</p>

<p align="center">
  <img alt="Nextjs" src="https://img.shields.io/badge/Next.js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white" />
  <img alt="Turborepo" src="https://img.shields.io/badge/Turborepo-Monorepo-EF4444?style=for-the-badge&logo=turborepo" />
  <img alt="TypeScript" src="https://img.shields.io/badge/TypeScript-5.9-3178C6?style=for-the-badge&logo=typescript" />
  <img alt="TypeScript" src="https://img.shields.io/badge/shadcn/ui-000000?style=for-the-badge&logo=shadcn/ui&logoColor=white" />
  <img alt="Tailwind CSS" src="https://img.shields.io/badge/Tailwind_CSS-4-06B6D4?style=for-the-badge&logo=tailwindcss" />
</p>

<p align="center">
  <img alt="Express" src="https://img.shields.io/badge/Express-5-000000?style=for-the-badge&logo=express" />
  <img alt="Prisma" src="https://img.shields.io/badge/Prisma-7-2D3748?style=for-the-badge&logo=prisma" />
  <img alt="PostgreSQL" src="https://img.shields.io/badge/PostgreSQL-16-4169E1?style=for-the-badge&logo=postgresql" />
  <img alt="Docker" src="https://img.shields.io/badge/Docker-Compose-2496ED?style=for-the-badge&logo=docker" />
</p>

---

## 🚀 What is OmniPost?

OmniPost is an open-source social media management platform that helps creators, developers, startups, and teams manage content publishing from one unified dashboard.

Instead of logging into multiple platforms individually, OmniPost provides:

* ✍️ Content creation & rich post editor
* 🔗 Connected account management (Instagram, Facebook, X, LinkedIn)
* 📋 Post history & status tracking
* 🔐 OAuth authentication (Google, GitHub)
* 👤 User profile & settings management
* 🏠 Full marketing site (Landing, Features, Pricing, About, Contact)

All from a single interface.

---

## 🎯 Vision

Modern creators publish across multiple platforms:

* X (Twitter)
* LinkedIn
* Instagram
* Facebook

Managing content separately for every platform wastes time. OmniPost aims to become the open-source alternative to expensive social media management tools by providing a unified publishing experience — built transparently, for developers.

---

## ✨ Feature Status

| Feature                      | Status         |
| ---------------------------- | -------------- |
| Landing Page                 | ✅ Implemented  |
| Features / Pricing / About / Contact Pages | ✅ Implemented  |
| Dashboard UI                 | ✅ Implemented  |
| Post Editor UI               | ✅ Implemented  |
| Connected Accounts UI        | ✅ Implemented  |
| Post History UI              | ✅ Implemented  |
| Settings UI                  | ✅ Implemented  |
| User Profile UI              | ✅ Implemented  |
| Login / Signup UI            | ✅ Implemented  |
| Prisma Database Schema       | ✅ Implemented  |
| PostgreSQL via Docker        | ✅ Implemented  |
| Auth API (Express 5)         | ✅ Implemented  |
| OAuth Integration (Google)   | 🚧 In Progress |
| OAuth Integration (GitHub)   | 🚧 In Progress |
| UniAuth Library Integration  | 🚧 In Progress |
| Multi-Platform Publishing    | 📅 Planned     |
| Scheduling Engine            | 📅 Planned     |
| Analytics Dashboard          | 📅 Planned     |
| Team Workspaces              | 📅 Planned     |
| AI Content Assistance        | 📅 Planned     |
| Public API                   | 📅 Planned     |

---

## 🏗️ Architecture

```text
┌─────────────────────────────────────────────┐
│              omnipost-web (Turborepo)        │
│                                             │
│  ┌─────────────────┐  ┌──────────────────┐  │
│  │   apps/web      │  │  apps/apis/auth  │  │
│  │  React 19 + Vite│  │  Express 5 API   │  │
│  │  Tailwind CSS 4 │  │  TypeScript      │  │
│  │  React Router 7 │  │  UniAuth OAuth   │  │
│  └────────┬────────┘  └────────┬─────────┘  │
│           │                    │             │
│           └─────────┬──────────┘             │
│                     │                        │
│         ┌───────────▼──────────┐             │
│         │    shared/Database   │             │
│         │  Prisma 7 + pg       │             │
│         │  @repo/database      │             │
│         └───────────┬──────────┘             │
│                     │                        │
│         ┌───────────▼──────────┐             │
│         │  PostgreSQL 16       │             │
│         │  (Docker Compose)    │             │
│         └──────────────────────┘             │
│                                             │
│  shared/ui  ·  shared/eslint-config         │
│  shared/typescript-config                   │
└─────────────────────────────────────────────┘
```

**OAuth Providers (via `@deba_1307/uniauth`):** Google · GitHub

**Publishing Targets (schema defined):** Instagram · Facebook · X · LinkedIn

---

## 📦 Tech Stack

### Frontend — `apps/web`

| Technology        | Version  | Role                           |
| ----------------- | -------- | ------------------------------ |
| React             | 19       | UI library                     |
| Vite              | 8        | Build tool & dev server        |
| Tailwind CSS      | 4        | Utility-first styling          |
| React Router DOM  | 7        | Client-side routing            |
| ESLint            | 10       | Code linting                   |

### Backend — `apps/apis/auth`

| Technology        | Version  | Role                           |
| ----------------- | -------- | ------------------------------ |
| Node.js           | ≥18      | Runtime                        |
| TypeScript        | 5.9      | Type-safe development          |
| Express           | 5        | HTTP framework                 |
| `@deba_1307/uniauth` | 0.1.x | OAuth 2.0 (Google, GitHub)   |
| cookie-parser     | 1.4      | Cookie handling                |
| ts-node-dev       | —        | Dev server with hot-reload     |

### Database — `shared/Database`

| Technology        | Version  | Role                           |
| ----------------- | -------- | ------------------------------ |
| Prisma            | 7        | ORM & schema management        |
| `@prisma/client`  | 7        | Type-safe DB client            |
| `@prisma/adapter-pg` | 7    | PostgreSQL adapter             |
| pg                | 8        | PostgreSQL driver              |
| PostgreSQL        | 16       | Relational database            |
| Docker Compose    | —        | Local DB container             |

### Shared Packages

| Package                      | Role                              |
| ---------------------------- | --------------------------------- |
| `@repo/ui`                   | Shared React component library    |
| `@repo/eslint-config`        | Shared ESLint configuration       |
| `@repo/typescript-config`    | Shared TypeScript configurations  |

### Build & Tooling

| Tool              | Role                               |
| ----------------- | ---------------------------------- |
| Turborepo         | Monorepo task orchestration        |
| npm Workspaces    | Package management                 |
| Prettier          | Code formatting                    |

---

## 📂 Project Structure

```text
Omnipost/
├── app/
│   └── web/
│       └── omnipost-web/               ← Turborepo monorepo root
│           ├── apps/
│           │   ├── web/                ← React 19 frontend (Vite)
│           │   │   ├── src/
│           │   │   │   ├── components/
│           │   │   │   │   ├── Landing-page/   (Landingpage, Features, Pricing, About, Contact, Solution)
│           │   │   │   │   ├── HeroSection/    (Dashboard, PostEditor, Accounts, History, Settings, UserInfo)
│           │   │   │   │   ├── Login-signup/   (LoginPage, SignupPage)
│           │   │   │   │   ├── Layout/         (Header, Sidebar, Footer)
│           │   │   │   │   └── Error/          (ErrorPage)
│           │   │   │   ├── Layout.jsx
│           │   │   │   ├── main.jsx
│           │   │   │   └── index.css
│           │   │   └── public/
│           │   │       └── logo.png
│           │   └── apis/
│           │       └── auth/           ← Express 5 Auth API (TypeScript)
│           │           └── src/
│           │               ├── app.ts
│           │               ├── index.ts
│           │               ├── controller/
│           │               ├── routes/         (basic.routes, user.router)
│           │               └── utils/          (UniAuth config, error handlers)
│           ├── shared/
│           │   ├── Database/           ← Prisma + PostgreSQL package
│           │   │   ├── prisma/
│           │   │   │   ├── schema.prisma
│           │   │   │   └── migrations/
│           │   │   ├── docker-compose.yaml
│           │   │   └── prisma.config.ts
│           │   ├── ui/                 ← Shared React component library
│           │   ├── eslint-config/      ← Shared ESLint rules
│           │   └── typescript-config/  ← Shared tsconfig presets
│           ├── package.json
│           ├── turbo.json
│           └── .env
└── readme.md
```

---

## 🗄️ Database Schema

Defined in `shared/Database/prisma/schema.prisma` with the following models:

| Model         | Description                                        |
| ------------- | -------------------------------------------------- |
| `User`        | App user with profile, refresh token, relations    |
| `Accounts`    | OAuth-linked social media accounts per user        |
| `Post`        | Content post with text, media, and platform jobs   |
| `Media`       | Image or video attachments for posts               |
| `PlatformJob` | Per-platform publish job with status tracking      |

**Enums:** `Gender` · `PostType (Video, Image)` · `SocialMedia (instagram, facebook, x, linkedin)` · `Status (pending, posted, failed)`

---

## 🔐 Authentication

Authentication is handled by the custom [`@deba_1307/uniauth`](https://www.npmjs.com/package/@deba_1307/uniauth) library, providing OAuth 2.0 flows for:

* **Google** — `openid`, `email`, `profile` scopes
* **GitHub** — `openid`, `email`, `profile` scopes

The auth API exposes:

* `POST /api/v1/auth/*` — OAuth flow routes
* `GET /api/v1/user/*` — Authenticated user routes

---

## ⚡ Getting Started

### Prerequisites

* Node.js ≥ 18
* npm ≥ 11
* Docker (for PostgreSQL)

### Clone Repository

```bash
git clone https://github.com/Debanjan2007/Omnipost.git
cd Omnipost/app/web/omnipost-web
```

### Configure Environment

Copy and configure the environment file:

```bash
cp .env.example .env
```

Required variables:

```env
DATABASE_URL=postgresql://<user>:<password>@localhost:5432/<db>?schema=public
PORT=6500
PG_USER=<your_pg_user>
PG_PASS=<your_pg_password>
PG_DB=<your_db_name>
GOOGLE_CLIENT_ID=<your_google_client_id>
GOOGLE_CLIENT_SECRET=<your_google_client_secret>
GOOGLE_REDIRECT_URL=<your_google_redirect_url>
GITHUB_CLIENT_ID=<your_github_client_id>
GITHUB_CLIENT_SECRET=<your_github_client_secret>
GITHUB_REDIRECT_URL=<your_github_redirect_url>
```

### Start PostgreSQL (Docker)

```bash
cd shared/Database
docker compose up -d
```

### Run Database Migrations

```bash
cd shared/Database
npx prisma migrate dev
```

### Install Dependencies

```bash
# From omnipost-web root
npm install
```

### Start Development

```bash
npm run dev
```

This starts both the frontend and auth API via Turborepo.

---

## 🛠️ Available Commands

All commands run from `app/web/omnipost-web/`:

| Command               | Description                             |
| --------------------- | --------------------------------------- |
| `npm run dev`         | Start all apps in development mode      |
| `npm run build`       | Build all apps for production           |
| `npm run lint`        | Lint all workspaces                     |
| `npm run check-types` | TypeScript type check across monorepo   |
| `npm run format`      | Format all `.ts`, `.tsx`, `.md` files   |

---

## 🗺️ Roadmap

### Phase 1 — Foundation

* [x] Marketing site (Landing, Features, Pricing, About, Contact)
* [x] App dashboard UI
* [x] Post editor, account management, history, settings
* [x] Login / Signup UI
* [x] Database schema (Prisma + PostgreSQL)
* [x] Auth API (Express 5 + UniAuth)
* [x] Monorepo setup (Turborepo + npm workspaces)

### Phase 2 — Core Backend

* [ ] Google OAuth flow (end-to-end)
* [ ] GitHub OAuth flow (end-to-end)
* [ ] JWT session management
* [ ] Connect frontend to Auth API
* [ ] Social account linking

### Phase 3 — Publishing Engine

* [ ] Multi-platform publishing (Instagram, Facebook, X, LinkedIn)
* [ ] Queue workers
* [ ] Post scheduling system
* [ ] PlatformJob status tracking

### Phase 4 — Growth

* [ ] Analytics dashboard
* [ ] Team workspaces & collaboration
* [ ] Public API
* [ ] SDK releases

---

## 🌟 Why Open Source?

OmniPost is being built in public.

Goals:

* Encourage community contributions
* Help developers learn full-stack system design
* Provide a free alternative to expensive publishing tools
* Build a transparent and developer-friendly ecosystem

---

## 🤝 Contributing

Contributions are welcome.

You can help by:

* Fixing bugs
* Improving documentation
* Implementing OAuth providers
* Building publisher integrations
* Improving UI/UX
* Writing tests

### Contribution Flow

```bash
Fork Repository
      ↓
Create Feature Branch
      ↓
Make Changes
      ↓
Open Pull Request
```

---

## 📄 License

Licensed under the MIT License.

Feel free to use, modify, and distribute the project.

---

## 👨‍💻 Author

**Debanjan**

GitHub: [https://github.com/Debanjan2007](https://github.com/Debanjan2007)

---

<p align="center">
  <strong>⭐ Star the repository if you find OmniPost useful.</strong>
</p>

<p align="center">
  Built with ❤️ by developers, for developers.
</p>
