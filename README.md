# College ERP

Multi-tenant college ERP SaaS platform built as an npm-workspace monorepo.

## Workspaces

- `frontend/` — React + Vite public website and ERP UI
- `backend/` — Express REST API
- `shared/` — shared TypeScript types and role constants

## Run locally

1. Copy `.env.example` to `.env` and set secure local secrets.
2. Install dependencies with `npm install`.
3. Start both applications with `npm run dev`.

The frontend runs on port 5173 and the API runs on port 3001. For the container stack, run `docker-compose up --build` (add `-f docker-compose.dev.yml` for hot reload overrides).

See `docs/architecture.md`, `docs/api-reference.md`, and `docs/module-guide.md` for project conventions.