# Sena

Monorepo project built with Turbo, containing a web app, admin panel, API, and shared packages.

## 📦 Projects

| Project | Description | Tech Stack |
|---------|-------------|------------|
| `apps/web` | Web application | Next.js 16, React 19, Tailwind CSS v4 |
| `apps/admin` | Admin panel | Next.js 16, React 19, Tailwind CSS v4 |
| `apps/api` | REST API | NestJS, TypeScript, Prisma |
| `packages/config` | Configuration utilities | - |
| `packages/database` | SQL schemas | PostgreSQL |
| `packages/services` | Business services | Analyzer, Prediction |

## 🛠️ Prerequisites

- Node.js 20+
- npm or bun
- PostgreSQL (for API)

## 🚀 Getting Started

### Development (all apps)

```bash
npm run dev
```

### Individual apps

```bash
# Web app (port 3000)
npm run dev:web

# Admin panel
npm run dev:admin

# API server
npm run dev:api
```

### Build

```bash
npm run build
# Or build individually:
npm run build:web
npm run build:admin
npm run build:api
```

### Lint

```bash
npm run lint
```

## 🗄️ Database

The project uses PostgreSQL. The schema is located in `packages/database/sena.sql`. 

To run migrations (if using Prisma):

```bash
npm run db:migrate
```

## 📁 Project Structure

```
sena/
├── apps/          # Next.js & NestJS applications
├── packages/      # Shared config, database, services
├── turbo.json     # Turbo build pipeline config
├── package.json   # Root package.json with workspaces
└── README.md      # This file
```