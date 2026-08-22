# Architecture

College ERP is an npm-workspace monorepo with a React/Vite frontend, an Express API, and a shared TypeScript package. The frontend is organized by feature module. The public marketing pages live in `frontend/src/app/modules/public`; authenticated ERP functionality is added in the remaining modules.

The API is versioned under `/api/v1`. PostgreSQL is the system of record, Redis is reserved for caching and sessions, and Firebase supports notifications and optional social authentication. Docker Compose provides the local full-stack runtime.

Tenant isolation is designed around a `tenantId` on every domain record. The Phase 1 tenant resolver establishes the current tenant; Phase 2 introduces the Prisma schema and migrations.