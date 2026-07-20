<p align="center">
  <img src="apps/web/omnipost-web-fullstack/public/logo.png" alt="OmniPost Logo" width="80" />
</p>

<h1 align="center">OmniPost</h1>

<p align="center">
  <strong>One platform to create and distribute content across every social network.</strong>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/Next.js-16-black?logo=next.js" alt="Next.js" />
  <img src="https://img.shields.io/badge/React-19-61DAFB?logo=react" alt="React" />
  <img src="https://img.shields.io/badge/TypeScript-5.9-3178C6?logo=typescript" alt="TypeScript" />
  <img src="https://img.shields.io/badge/Prisma-7-2D3748?logo=prisma" alt="Prisma" />
  <img src="https://img.shields.io/badge/PostgreSQL-16-4169E1?logo=postgresql" alt="PostgreSQL" />
  <img src="https://img.shields.io/badge/Clerk-Auth-6C47FF?logo=clerk" alt="Clerk" />
  <img src="https://img.shields.io/badge/Turborepo-Monorepo-EF4444?logo=turborepo" alt="Turborepo" />
  <img src="https://img.shields.io/badge/License-ISC-green" alt="License" />
</p>

---

## 📖 Description

**OmniPost** is an open-source social media management platform that lets you compose a single post and publish it simultaneously across multiple social networks — Instagram, Facebook, LinkedIn, X (Twitter), YouTube, and more.

Instead of logging into each platform individually, OmniPost provides a unified dashboard where you can:

- **Create posts** with a rich content editor and publish to multiple platforms at once
- **Connect social accounts** via OAuth and manage them from one place
- **Track post history** and monitor distribution status per platform
- **Customize your workspace** with theme, accent color, density, and animation settings

The project is built as a **Turborepo monorepo** with a Next.js fullstack frontend, a standalone Express auth API, and shared packages for the database, types, and UI components.

---

## ✨ Features

| Feature | Status |
|---------|--------|
| Multi-platform post creation | ✅ Implemented (UI) |
| Clerk-based authentication (sign-in / sign-up) | ✅ Implemented |
| JWT access & refresh token generation | ✅ Implemented |
| User sync (Clerk → PostgreSQL) on auth callbacks | ✅ Implemented |
| Dashboard with sidebar navigation | ✅ Implemented |
| Connected accounts management page | ✅ Implemented (UI) |
| Post history page | ✅ Implemented (UI) |
| Appearance settings (theme, accent, density, animations) | ✅ Implemented |
| Appearance settings API (`GET`/`PUT /api/appearance`) | ✅ Implemented |
| LinkedIn OAuth flow via Uniauth | ✅ Implemented |
| Landing page with FAQ & footer | ✅ Implemented |
| Dark mode / light mode / system theme | ✅ Implemented |
| Mobile-responsive navigation (Sheet overlay) | ✅ Implemented |
| Custom 404 page | ✅ Implemented |
| Platform icons (9 platforms) | ✅ Implemented |
| Standalone Express auth API (Google, GitHub, TrueCaller OAuth) | 🚧 Work in Progress |
| Post distribution to social platforms (API integration) | 🚧 Work in Progress |
| Analytics dashboard (charts, sparklines) | 🚧 Work in Progress (UI only) |
| AI assistant for content suggestions | 🚧 Work in Progress (UI only) |
| Scheduling / queued post publishing | 📋 Planned |

---

## 🛠️ Tech Stack

### Frontend

| Technology | Purpose |
|------------|---------|
| [Next.js 16](https://nextjs.org) | React framework (App Router, RSC) |
| [React 19](https://react.dev) | UI library |
| [TypeScript 5.9](https://www.typescriptlang.org) | Type safety |
| [Tailwind CSS 4](https://tailwindcss.com) | Utility-first CSS |
| [shadcn/ui](https://ui.shadcn.com) (base-nova style) | Component library |
| [Magic UI](https://magicui.design) | Animated UI components |
| [Lucide React](https://lucide.dev) | Icon library |
| [Motion (Framer Motion)](https://motion.dev) | Animations |
| [next-themes](https://github.com/pacocoursey/next-themes) | Theme management |
| [Zustand](https://zustand.docs.pmnd.rs) | Client state management |
| [Sonner](https://sonner.emilkowal.dev) | Toast notifications |

### Backend

| Technology | Purpose |
|------------|---------|
| [Next.js API Routes](https://nextjs.org/docs/app/building-your-application/routing/route-handlers) | Primary API layer |
| [Express 5](https://expressjs.com) | Standalone auth API service |
| [jsonwebtoken](https://github.com/auth0/node-jsonwebtoken) | JWT token generation |
| [@deba_1307/uniauth](https://www.npmjs.com/package/@deba_1307/uniauth) | OAuth provider abstraction |

### Database & ORM

| Technology | Purpose |
|------------|---------|
| [PostgreSQL 16](https://www.postgresql.org) | Relational database |
| [Prisma 7](https://www.prisma.io) | ORM with type-safe client |
| [@prisma/adapter-pg](https://www.prisma.io/docs/orm/overview/databases/postgresql#pg-adapter) | PostgreSQL driver adapter |

### Authentication

| Technology | Purpose |
|------------|---------|
| [Clerk](https://clerk.com) | Primary auth provider (sign-in, sign-up, session) |
| JWT (access + refresh tokens) | Session tokens stored in httpOnly cookies |

### Infrastructure

| Technology | Purpose |
|------------|---------|
| [Turborepo](https://turborepo.dev) | Monorepo build orchestration |
| [Docker Compose](https://docs.docker.com/compose/) | Local PostgreSQL container |
| [Zod 4](https://zod.dev) | Runtime schema validation |
| [Prettier](https://prettier.io) | Code formatting |
| [ESLint](https://eslint.org) | Code linting |

---

## 🏗️ Architecture

OmniPost follows a **monorepo architecture** managed by Turborepo, with clear separation between apps and shared packages.

```mermaid
graph TB
    subgraph Client["🌐 Client Browser"]
        LP["Landing Page"]
        DA["Dashboard App"]
    end

    subgraph Monorepo["📦 Turborepo Monorepo"]
        subgraph Apps["apps/"]
            subgraph NextApp["web/omnipost-web-fullstack"]
                Pages["Pages & Layouts"]
                APIRoutes["API Route Handlers"]
                Middleware["Clerk Middleware"]
                Components["React Components"]
                Context["Context Providers<br/>(Theme, Appearance, Profile)"]
            end
            subgraph AuthAPI["apis/auth"]
                Express["Express 5 Server"]
                AuthRoutes["OAuth Routes"]
                Controllers["Auth Controllers"]
            end
        end

        subgraph Shared["shared/"]
            DB["@repo/database<br/>(Prisma Client)"]
            Types["@repo/types<br/>(Zod Schemas)"]
            UI["@repo/ui<br/>(Shared Components)"]
            ESLint["@repo/eslint-config"]
            TSConfig["@repo/typescript-config"]
        end
    end

    subgraph External["☁️ External Services"]
        Clerk["Clerk Auth"]
        PG["PostgreSQL 16"]
        LinkedIn["LinkedIn OAuth"]
        Google["Google OAuth"]
        GitHub["GitHub OAuth"]
    end

    LP --> Middleware
    DA --> Middleware
    Middleware --> Pages
    Pages --> APIRoutes
    APIRoutes --> DB
    DB --> PG
    Pages --> Clerk
    APIRoutes --> Clerk
    AuthAPI --> Google
    AuthAPI --> GitHub
    NextApp --> LinkedIn
    Express --> DB
    NextApp -.-> UI
    NextApp -.-> Types
    AuthAPI -.-> Types
    AuthAPI -.-> DB

    style NextApp fill:#1a1a2e,stroke:#6366f1,color:#e2e8f0
    style AuthAPI fill:#1a1a2e,stroke:#f59e0b,color:#e2e8f0
    style Shared fill:#0f172a,stroke:#334155,color:#e2e8f0
    style External fill:#0c0a09,stroke:#737373,color:#e2e8f0
    style Client fill:#172554,stroke:#3b82f6,color:#e2e8f0
```

### Auth Flow

```mermaid
sequenceDiagram
    participant U as User
    participant C as Clerk
    participant CB as Auth Callback<br/>(/auth/*/callback)
    participant DB as PostgreSQL

    U->>C: Sign in / Sign up
    C-->>U: Redirect to callback URL
    U->>CB: GET /auth/login/callback
    CB->>C: currentUser()
    C-->>CB: Clerk user data
    CB->>CB: Generate JWT tokens<br/>(access: 15m, refresh: 7d)
    CB->>DB: Upsert user record
    DB-->>CB: User saved
    CB-->>U: Set httpOnly cookie<br/>Redirect → /dashboard
```

---

## 📁 Project Structure

```
omnipost-web/
├── apps/
│   ├── web/
│   │   └── omnipost-web-fullstack/     # Next.js 16 fullstack app
│   │       ├── app/
│   │       │   ├── page.tsx            # Landing page
│   │       │   ├── layout.tsx          # Root layout (Clerk + Providers)
│   │       │   ├── not-found.tsx       # Custom 404 page
│   │       │   ├── globals.css         # Global styles & CSS variables
│   │       │   ├── auth/               # Auth callback routes
│   │       │   │   ├── login/callback/ #   Login → DB sync → redirect
│   │       │   │   └── signup/callback/#   Signup → DB sync → redirect
│   │       │   ├── api/
│   │       │   │   ├── appearance/     # Appearance settings CRUD
│   │       │   │   └── oauth/linkedin/ # LinkedIn OAuth (WIP)
│   │       │   ├── dashboard/
│   │       │   │   ├── page.tsx        # Dashboard overview
│   │       │   │   ├── layout.tsx      # Sidebar + nav shell
│   │       │   │   ├── create/         # Create post page
│   │       │   │   ├── accounts/       # Connected accounts
│   │       │   │   ├── history/        # Post history
│   │       │   │   ├── settings/       # Appearance settings
│   │       │   │   └── oauth/          # OAuth flows (LinkedIn)
│   │       │   ├── login/              # Clerk sign-in page
│   │       │   ├── signup/             # Clerk sign-up page
│   │       │   ├── context/            # React contexts & Zustand stores
│   │       │   ├── Components/         # App components
│   │       │   └── utils/              # JWT token generation
│   │       ├── components/ui/          # shadcn/ui + Magic UI components
│   │       ├── lib/                    # Utility functions
│   │       └── proxy.ts               # Clerk middleware (route protection)
│   └── apis/
│       └── auth/                       # Standalone Express auth API
│           └── src/
│               ├── index.ts            # Server entry point
│               ├── app.ts             # Express app setup
│               ├── routes/            # OAuth & user routes
│               ├── controller/        # Auth controllers
│               ├── middleware/        # Request data extraction
│               ├── authConfig/        # OAuth provider configs
│               └── utils/             # JWT, error handlers
├── shared/
│   ├── Database/                       # @repo/database
│   │   ├── prisma/
│   │   │   ├── schema.prisma          # Database schema
│   │   │   ├── migrations/            # Migration history
│   │   │   └── generated/             # Prisma Client output
│   │   ├── src/index.ts               # Singleton Prisma client
│   │   ├── docker-compose.yaml        # Local PostgreSQL
│   │   └── prisma.config.ts           # Prisma configuration
│   ├── types/                          # @repo/types
│   │   └── api-types/
│   │       └── user.types.ts          # User schema (Zod + TypeScript)
│   ├── ui/                             # @repo/ui
│   │   └── src/                       # Shared React components
│   ├── eslint-config/                  # @repo/eslint-config
│   └── typescript-config/              # @repo/typescript-config
├── turbo.json                          # Turborepo task configuration
├── package.json                        # Root workspace config
└── .env.example                        # Root env template
```

---

## 🚀 Installation

### Prerequisites

| Requirement | Version |
|-------------|---------|
| Node.js | ≥ 18 |
| npm | ≥ 11 |
| Docker & Docker Compose | Latest (for local PostgreSQL) |
| Clerk account | [clerk.com](https://clerk.com) |

### 1. Clone the repository

```bash
git clone https://github.com/Debanjan2007/Omnipost.git
cd Omnipost/app/web/omnipost-web
```

### 2. Install dependencies

```bash
npm install
```

### 3. Set up environment variables

```bash
# Root-level (for Prisma CLI & Docker Compose)
cp .env.example .env

# Next.js app
cp apps/web/omnipost-web-fullstack/.env.local.example apps/web/omnipost-web-fullstack/.env.local
```

Edit both files and fill in the required values — see the [Environment Variables](#-environment-variables) section below.

### 4. Start the PostgreSQL database

```bash
cd shared/Database
docker compose up -d
cd ../..
```

### 5. Run database migrations

```bash
cd shared/Database
npx prisma migrate dev --config prisma.config.ts
cd ../..
```

### 6. Start the development server

```bash
# Run all apps in the monorepo
npm run dev

# Or run only the Next.js frontend
npx turbo dev --filter=omnipost-web-fullstack
```

The app will be available at **http://localhost:3000**.

### Production Build

```bash
npm run build
```

---

## 🔐 Environment Variables

### Root `.env`

| Variable | Description | Example |
|----------|-------------|---------|
| `PG_USER` | PostgreSQL username (for Docker Compose) | `omnipostpg` |
| `PG_PASS` | PostgreSQL password (for Docker Compose) | `your_password` |
| `PG_DB` | PostgreSQL database name (for Docker Compose) | `omnipostdb` |
| `DATABASE_URL` | Full PostgreSQL connection string | `postgresql://user:pass@localhost:5432/omnipostdb` |

### Next.js App `.env.local`

<details>
<summary><strong>Click to expand full variable table</strong></summary>

| Variable | Required | Description |
|----------|----------|-------------|
| **Clerk** | | |
| `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY` | ✅ | Clerk publishable key |
| `CLERK_SECRET_KEY` | ✅ | Clerk secret key |
| `NEXT_PUBLIC_CLERK_SIGN_IN_URL` | ✅ | Sign-in page path (`/login`) |
| `NEXT_PUBLIC_CLERK_SIGN_UP_URL` | ✅ | Sign-up page path (`/signup`) |
| `NEXT_PUBLIC_CLERK_SIGN_UP_FORCE_REDIRECT_URL` | ✅ | Post-signup callback (`/auth/signup/callback`) |
| `NEXT_PUBLIC_CLERK_SIGN_IN_FORCE_REDIRECT_URL` | ✅ | Post-login callback (`/auth/login/callback`) |
| `NEXT_PUBLIC_CLERK_SIGN_IN_FALLBACK_REDIRECT_URL` | ❌ | Fallback redirect (`/dashboard`) |
| `NEXT_PUBLIC_CLERK_SIGN_UP_FALLBACK_REDIRECT_URL` | ❌ | Fallback redirect (`/dashboard`) |
| **JWT** | | |
| `JWT_ACCESS_SECRET` | ✅ | Secret for signing access tokens |
| `JWT_REFRESH_SECRET` | ✅ | Secret for signing refresh tokens |
| **Database** | | |
| `DATABASE_URL` | ✅ | PostgreSQL connection string |
| **App** | | |
| `NEXT_PUBLIC_APP_URL` | ✅ | App base URL (e.g. `http://localhost:3000`) |
| **OAuth — LinkedIn** | | |
| `LINKEDIN_CLIENT_ID` | ❌ | LinkedIn app client ID |
| `LINKEDIN_CLIENT_SECRET` | ❌ | LinkedIn app client secret |
| `LINKEDIN_REDIRECT_URL` | ❌ | LinkedIn OAuth redirect URL |

</details>

---

## 🔑 Authentication

OmniPost uses a **hybrid authentication architecture** combining [Clerk](https://clerk.com) for identity management and custom JWT tokens for API sessions.

### How it works

1. **Clerk** handles all sign-in/sign-up UI and identity verification (email, Google, GitHub, etc.)
2. After Clerk authentication, the user is redirected to **callback routes** (`/auth/login/callback` or `/auth/signup/callback`)
3. The callback handler:
   - Fetches the Clerk user profile via `currentUser()`
   - **Upserts** the user into the PostgreSQL database (creating a new record or updating an existing one)
   - Generates a pair of **JWT tokens** (access token: 15 min, refresh token: 7 days)
   - Sets the access token in a **secure, httpOnly cookie** (`omnipost_access`)
   - Redirects to `/dashboard`
4. **Clerk middleware** (`proxy.ts`) protects `/dashboard/**` routes and redirects unauthenticated users to `/login`

### Route Protection

| Route Pattern | Access |
|---------------|--------|
| `/dashboard/**` | 🔒 Authenticated only |
| `/login`, `/signup` | 🔓 Public (redirects to `/dashboard` if already signed in) |
| `/` (landing) | 🔓 Public |
| `/api/appearance` | 🔒 Requires Clerk session |

---

## 🌐 Social Integrations

### Implemented (OAuth Configured)

| Platform | OAuth Library | Scopes | Status |
|----------|--------------|--------|--------|
| LinkedIn | `@deba_1307/uniauth` | `openid`, `profile`, `email`, `w_member_social` | ✅ OAuth flow implemented |
| Google | `@deba_1307/uniauth` | `openid`, `email`, `profile` | ✅ Configured in auth API |
| GitHub | `@deba_1307/uniauth` | `openid`, `email`, `profile` | ✅ Configured in auth API |
| TrueCaller | Custom URL builder | Phone verification | ✅ Configured in auth API |

### UI Support (Platform Icons & Dashboard)

OmniPost includes brand-correct icons and dashboard UI for **9 platforms**:

| Platform | Icon | Connect UI |
|----------|------|------------|
| Instagram | ✅ | ✅ |
| Facebook | ✅ | ✅ |
| LinkedIn | ✅ | ✅ |
| Twitter / X | ✅ | ✅ |
| YouTube | ✅ | ✅ |
| Threads | ✅ | 🚧 Not yet connected |
| Bluesky | ✅ | 🚧 Not yet connected |
| TikTok | ✅ | 📋 Planned |
| Pinterest | ✅ | 📋 Planned |

---

## 🗄️ Database

OmniPost uses **PostgreSQL 16** with **Prisma 7** as the ORM. The database runs locally via Docker Compose.

### Schema Overview

```mermaid
erDiagram
    User ||--o{ Accounts : has
    User ||--o{ Post : creates
    User ||--|| AppearanceSettings : configures

    User {
        int id PK
        string email UK
        string name
        string avatar
        enum gender
        datetime dob
        string countryCode
        int phoneNumber
        string clerkId UK
        string refreshToken
        datetime createdAt
        datetime updatedAt
    }

    Accounts {
        uuid id PK
        int userID FK
        string provider
        string providerAccountId
        string accessToken
        string refreshToken
        datetime expiresAt
        datetime createdAt
        datetime updatedAt
    }

    Post ||--o{ Media : contains
    Post ||--o{ PlatformJob : dispatches

    Post {
        uuid id PK
        int userId FK
        string content
        datetime createdAt
    }

    Media {
        uuid id PK
        uuid postId FK
        string url
        enum posttype
        datetime createdAt
    }

    PlatformJob {
        uuid id PK
        uuid postId FK
        enum platform
        enum status
        datetime createdAt
    }

    AppearanceSettings {
        int id PK
        int userId FK
        string theme
        string accentColor
        string density
        boolean animations
        datetime updatedAt
    }
```

### Key Enums

| Enum | Values |
|------|--------|
| `Gender` | `Male`, `Female`, `Others` |
| `PostType` | `Video`, `Image` |
| `SocialMedia` | `instagram`, `facebook`, `x`, `linkedin` |
| `Status` | `pending`, `posted`, `failed` |

---

## 🔌 API Overview

### Next.js API Routes

| Method | Route | Description |
|--------|-------|-------------|
| `GET` | `/api/appearance` | Fetch current user's appearance settings |
| `PUT` | `/api/appearance` | Update appearance settings (theme, accent, density, animations) |
| `GET` | `/dashboard/oauth/linkedin` | Initiate LinkedIn OAuth authorization flow |
| `GET` | `/auth/login/callback` | Post-login: sync user to DB, set JWT cookie, redirect |
| `GET` | `/auth/signup/callback` | Post-signup: create user in DB, set JWT cookie, redirect |

### Express Auth API Routes (Standalone)

| Method | Route | Description |
|--------|-------|-------------|
| `GET` | `/api/v1/oauth/authUrl` | Returns Google & GitHub/TrueCaller authorization URLs |
| `POST` | `/api/v1/oauth/signup` | Creates a new user with extracted body data |

> **Note:** The Express auth API (`apps/apis/auth`) is a standalone service that runs separately from the Next.js app. It is currently a **work in progress**.

---

## 📸 Screenshots

<!-- Add screenshots of your app here -->

| Page | Screenshot |
|------|-----------|
| Landing Page | *Coming soon* |
| Dashboard Overview | *Coming soon* |
| Create Post | *Coming soon* |
| Connected Accounts | *Coming soon* |
| Settings | *Coming soon* |
| Login / Signup | *Coming soon* |

---

## 🤝 Contributing

Contributions are welcome! Here's how to get started:

1. **Fork** the repository
2. **Create** a feature branch (`git checkout -b feature/amazing-feature`)
3. **Commit** your changes (`git commit -m 'feat: add amazing feature'`)
4. **Push** to your branch (`git push origin feature/amazing-feature`)
5. **Open** a Pull Request

### Development Guidelines

- Follow the existing TypeScript and ESLint configuration
- Use [Conventional Commits](https://www.conventionalcommits.org/) for commit messages
- Run `npm run lint` before submitting PRs
- Run `npm run format` to ensure consistent code formatting
- Keep shared packages (`shared/`) framework-agnostic where possible

---

## 🗺️ Roadmap

### In Progress

- [ ] **Post distribution engine** — Actually publish posts to connected social media platforms via their APIs
- [ ] **Analytics pipeline** — Real data from platform APIs (currently UI mockup with static data)
- [ ] **AI content assistant** — AI-powered suggestions for post content and captions
- [ ] **Express auth API completion** — Finalize OAuth callback handling and login flow
- [ ] **LinkedIn OAuth callback** — Handle token exchange and store credentials

### Planned

- [ ] **Post scheduling** — Schedule posts for specific dates/times with a queue system
- [ ] **Media upload** — Upload images and videos for posts
- [ ] **Threads integration** — OAuth + posting via Threads API
- [ ] **Bluesky integration** — OAuth + posting via AT Protocol
- [ ] **TikTok integration** — OAuth + video posting
- [ ] **Pinterest integration** — OAuth + pin creation
- [ ] **Team collaboration** — Multi-user workspaces
- [ ] **Webhook notifications** — Real-time post status updates
- [ ] **CI/CD pipeline** — GitHub Actions for automated testing and deployment
- [ ] **Docker production setup** — Full Dockerfile and docker-compose for production deployment

---

## 📄 License

This project is licensed under the **ISC License**.

---

<p align="center">
  Built with ❤️ by <a href="https://github.com/Debanjan2007">Debanjan</a>
</p>
