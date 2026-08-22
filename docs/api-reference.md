# API Reference

The backend exposes a versioned REST API under `/api/v1`.

- `GET /health` — service health and resolved tenant summary
- `GET /api/v1` — API welcome response
- `/api/v1/auth` — authentication endpoints
- `/api/v1/tenants` — tenant management endpoints

All new endpoints must use the standard `{ success, data, message, meta }` response envelope and be tenant scoped when they handle tenant data.