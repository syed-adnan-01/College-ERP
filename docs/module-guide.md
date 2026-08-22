# Module Guide

Frontend modules live in `frontend/src/app/modules/<module>`. Each production module should contain route-level pages, components, hooks, services, types, and an `index.ts` route/export entry point.

Backend modules live in `backend/src/modules/<module>`. Each production module should provide routes, controller, service, validation, and module-specific types. Cross-cutting code belongs in `backend/src/middleware`, `backend/src/shared`, or `shared/`.