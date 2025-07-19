# 🟩 Wordy Fullstack App

A monorepo-based fullstack game inspired by the NYT Wordle, built with modern web tools: **Turborepo**, **Vite + React**, and **Hono** for the backend.

---

## 🧱 Project Structure

This project uses [Turborepo](https://turbo.build/repo) to manage multiple packages in a monorepo setup.

```
/apps
    /ui # Vite + React frontend
    /api # Hono

/packages
    /types # Shared TypeScript types
```

## ⚡ Tech Stack

| Layer    | Technology   | Description                         |
| -------- | ------------ | ----------------------------------- |
| Monorepo | Turborepo    | Fast builds, caching, dev pipelines |
| Frontend | React + Vite | Fast dev server, modern React       |
| Backend  | HONO         | REST or API routes (TODO)           |
| Language | TypeScript   | End-to-end type safety              |
| Hosting  | TBD          |

---

## 🚧 Setup Instructions

### 1. Install Dependencies

```cmd
pnpm install
# or
yarn install
# or
npm install
```

### 2. Start Dev Servers

Start all apps and watch shared packages

```cmd
pnpm dev
```

Or run individual apps:

### Frontend

```cmd
cd apps/web
pnpm dev
```

### Backend (once created)

```cmd
cd apps/api
pnpm dev
```

### Database

starting the postgress docker image

```cmd
docker compose -f docker/docker-compose.yml up -d
```

stop the docker image

```cmd
docker compose -f docker/docker-compose.yml down      # stop only
docker compose -f docker/docker-compose.yml down -v   # stop and remove volume/data
```
