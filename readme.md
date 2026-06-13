<p align="center">
  <img src="./app/web/omnipost-web/apps/web/public/logo.png" alt="OmniPost Logo" width="120" />
</p>

<h1 align="center">OmniPost</h1>

<p align="center">
  <strong>Write once. Publish everywhere.</strong>
</p>

<p align="center">
  An open-source platform for managing, scheduling, and publishing content across multiple social media platforms from a single dashboard.
</p>

<p align="center">
  <img alt="Status" src="https://img.shields.io/badge/status-active_development-orange?style=for-the-badge" />
  <img alt="License" src="https://img.shields.io/badge/license-MIT-blue?style=for-the-badge" />
  <img alt="React" src="https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react" />
  <img alt="Open Source" src="https://img.shields.io/badge/Open_Source-Yes-success?style=for-the-badge&logo=github" />
</p>

<p align="center">
  <img alt="Vite" src="https://img.shields.io/badge/Vite-Frontend-646CFF?style=for-the-badge&logo=vite" />
  <img alt="Prisma" src="https://img.shields.io/badge/Prisma-ORM-2D3748?style=for-the-badge&logo=prisma" />
  <img alt="PostgreSQL" src="https://img.shields.io/badge/PostgreSQL-Database-4169E1?style=for-the-badge&logo=postgresql" />
  <img alt="Redis" src="https://img.shields.io/badge/Redis-Queue-E01E5A?style=for-the-badge&logo=redis" />
</p>

---

# 🚀 What is OmniPost?

OmniPost is an open-source social media management platform that helps creators, developers, startups, and teams manage content publishing from one unified dashboard.

Instead of logging into multiple platforms individually, OmniPost aims to provide:

* ✍️ Content creation
* 📅 Post scheduling
* 🔗 Account management
* 📊 Analytics & insights
* 🚀 Multi-platform publishing
* 👥 Team collaboration

All from a single interface.

---

# 🎯 Vision

Modern creators publish across multiple platforms:

* X (Twitter)
* LinkedIn
* Instagram
* Facebook
* Threads
* YouTube Community
* More platforms in the future

Managing content separately for every platform wastes time.

OmniPost aims to become the open-source alternative to expensive social media management tools by providing a unified publishing experience.

---

# ✨ Planned Features

| Feature                   | Status         |
| ------------------------- | -------------- |
| Dashboard                 | ✅ Completed    |
| Post Editor UI            | ✅ Completed    |
| Connected Accounts UI     | ✅ Completed    |
| Post History UI           | ✅ Completed    |
| Settings UI               | ✅ Completed    |
| Landing Page              | ✅ Completed    |
| Authentication System     | 🚧 In Progress |
| OAuth Integrations        | 🚧 In Progress |
| Multi-Platform Publishing | 🚧 In Progress |
| Scheduling Engine         | 📅 Planned     |
| Analytics Dashboard       | 📅 Planned     |
| Team Workspaces           | 📅 Planned     |
| AI Content Assistance     | 💡 Future      |
| Public API                | 💡 Future      |

---

# 🏗️ Architecture

```text
                    ┌─────────────┐
                    │   Frontend  │
                    │   React 19  │
                    └──────┬──────┘
                           │
                           ▼
                 ┌──────────────────┐
                 │ OmniPost API     │
                 └──────┬───────────┘
                        │
        ┌───────────────┼───────────────┐
        ▼               ▼               ▼

   Authentication    Publishing      Analytics
      Service         Service          Service

        ▼               ▼               ▼

   PostgreSQL       Redis Queue      Providers

                            ▼

         X • LinkedIn • Instagram • Facebook
```

---

# 📦 Tech Stack

### Frontend

* React 19
* Vite
* Tailwind CSS 4
* React Router 7

### Backend

* Node.js
* TypeScript
* Prisma ORM
* PostgreSQL
* Redis
* OAuth 2.0

### DevOps (Planned)

* Docker
* GitHub Actions
* Automated CI/CD
* Containerized Development

---

# 📂 Project Structure

```text
omnipost/
│
├── apps/
│   ├── web/
│   └── api/
│
├── packages/
│   ├── sdk/
│   ├── provider-core/
│   ├── uniauth/
│   └── shared/
│
├── docs/
│
├── docker/
│
├── .github/
│   └── workflows/
│
└── README.md
```

---

# ⚡ Getting Started

### Clone Repository

```bash
git clone https://github.com/Debanjan2007/Omnipost.git

cd Omnipost
```

### Install Dependencies

```bash
npm install
```

### Start Development Server

```bash
npm run dev
```

---

# 🛠️ Available Commands

| Command         | Description                  |
| --------------- | ---------------------------- |
| npm run dev     | Start development server     |
| npm run build   | Build production application |
| npm run preview | Preview production build     |
| npm run lint    | Run ESLint                   |
| npm run test    | Run tests                    |

---

# 🤝 Contributing

Contributions are welcome.

You can help by:

* Fixing bugs
* Improving documentation
* Creating provider integrations
* Improving UI/UX
* Writing tests
* Suggesting new features

### Contribution Flow

```bash
Fork Repository
      ↓
Create Branch
      ↓
Make Changes
      ↓
Open Pull Request
```

---

# 🗺️ Roadmap

### Phase 1

* [x] UI Development
* [x] Responsive Dashboard
* [x] Post Editor
* [x] Database Setup
* [ ] Authentication

### Phase 2

* [ ] OAuth Providers
* [ ] Publishing Engine
* [ ] Queue Workers
* [ ] Scheduling System

### Phase 3

* [ ] Analytics
* [ ] Team Collaboration
* [ ] Public API
* [ ] SDK Releases

---

# 🌟 Why Open Source?

OmniPost is being built in public.

Goals:

* Encourage community contributions
* Help developers learn system design
* Provide a free alternative to expensive publishing tools
* Build a transparent and developer-friendly ecosystem

---

# 📄 License

Licensed under the MIT License.

Feel free to use, modify, and distribute the project.

---

# 👨‍💻 Author

**Debanjan**

GitHub: https://github.com/Debanjan2007

---

<p align="center">
  <strong>⭐ Star the repository if you find OmniPost useful.</strong>
</p>

<p align="center">
  Built with ❤️ by developers, for developers.
</p>
