# College ERP — Project Knowledge Base

> Living technical reference for the multi-tenant, Docker self-hosted College ERP SaaS platform.

---

## 1. Existing Codebase Inventory

### 1.1 Current Project Overview

| Property | Value |
|----------|-------|
| **Project Name** | College-ERP (originally `@figma/my-make-file`) |
| **Brand Name** | EduPlatform SaaS |
| **Architecture** | Multi-Tenant Monorepo (Frontend + Backend + Shared) |
| **Hosting Mode** | Docker Self-Hosted (`docker-compose`) |
| **Push / Messaging** | Firebase Cloud Messaging (FCM) |
| **Framework** | React 18 + TypeScript |
| **Bundler** | Vite 6.3.5 |
| **Styling** | TailwindCSS v4.1.12 + shadcn/ui |
| **Routing** | React Router v7 (`react-router` 7.13.0) |

### 1.2 Monorepo Directory Map

```
College-ERP/
├── frontend/                          # React SPA app
│   ├── src/
│   │   ├── app/
│   │   │   ├── components/            # 48 shadcn/ui components + layouts
│   │   │   ├── modules/               # Pluggable feature modules
│   │   │   │   ├── public/            # Public marketing site
│   │   │   │   ├── auth/              # Tenant-aware Auth + Firebase
│   │   │   │   ├── dashboard/         # Role-based dashboards
│   │   │   │   ├── students/          # Student management
│   │   │   │   ├── academics/         # Courses, programs, timetable
│   │   │   │   ├── attendance/        # Attendance tracking
│   │   │   │   ├── finance/           # Fee structures & manual payments
│   │   │   │   └── communications/    # Firebase FCM notifications
│   │   │   ├── context/               # AuthContext, TenantContext
│   │   │   └── routes.tsx
│   │   └── styles/
│   ├── Dockerfile
│   └── vite.config.ts
│
├── backend/                           # Node.js + Express API
│   ├── src/
│   │   ├── config/
│   │   │   ├── firebase.ts            # Firebase Admin SDK init
│   │   │   ├── database.ts
│   │   │   └── tenant.ts              # Subdomain resolution config
│   │   ├── middleware/
│   │   │   ├── tenantResolver.ts      # Multi-tenancy resolver
│   │   │   ├── auth.ts
│   │   │   └── rbac.ts
│   │   ├── modules/                   # Feature backend modules
│   │   │   ├── tenants/               # Tenant onboarding & settings
│   │   │   ├── auth/
│   │   │   ├── students/
│   │   │   ├── finance/               # Manual payment handling
│   │   │   └── notifications/         # Firebase FCM endpoints
│   │   └── server.ts
│   ├── prisma/
│   │   ├── schema.prisma              # Multi-tenant PostgreSQL schema
│   │   └── seed.ts                    # Tenant seed data
│   └── Dockerfile
│
├── docker/                            # Docker infrastructure configuration
│   ├── nginx/
│   │   └── nginx.conf                 # Subdomain proxy & frontend static server
│   └── postgres/
│       └── init.sql
│
├── shared/                            # Cross-end TypeScript interfaces
│   ├── types/
│   └── constants/
│
├── docker-compose.yml                 # Production stack (Nginx, API, DB, Redis)
├── docker-compose.dev.yml             # Hot-reload development stack
├── firebase.json                      # Firebase project configuration
└── README.md
```

---

## 2. Multi-Tenancy & Tenant Model

### 2.1 Database Schema (Prisma)

```prisma
model Tenant {
  id              String   @id @default(uuid())
  name            String   // e.g., "Apex Institute of Technology"
  slug            String   @unique // e.g., "apex" -> apex.eduplatform.com
  customDomain    String?  @unique // e.g., "erp.apex.edu"
  logoUrl         String?
  themeConfig     Json?    // Custom primary/secondary colors
  enabledModules  String[] // Active modules for this college
  subscription    SubscriptionTier @default(PRO)
  isActive        Boolean  @default(true)
  createdAt       DateTime @default(now())
  updatedAt       DateTime @updatedAt

  users           User[]
  students        Student[]
  departments     Department[]
  feeStructures   FeeStructure[]
  payments        Payment[]
  notifications   Notification[]
}

enum SubscriptionTier {
  BASIC
  PRO
  ENTERPRISE
}
```

### 2.2 Domain Table Isolation Pattern

Every table that belongs to a college **must** include:

```prisma
model Student {
  id        String   @id @default(uuid())
  tenantId  String
  tenant    Tenant   @relation(fields: [tenantId], references: [id])
  // ...other fields
  @@index([tenantId])
}
```

---

## 3. Firebase Services Reference

### 3.1 Push Notifications (FCM)

- **Frontend Token Registration**: Web app uses Firebase JS SDK to prompt for permission and retrieve FCM token.
- **Backend Dispatch**: Express backend uses `firebase-admin` to send push notifications targeted by `tenantId`, `role`, or `userId`.
- **FCM Token Schema**:
  ```prisma
  model FCMToken {
    id        String   @id @default(uuid())
    tenantId  String
    userId    String
    token     String   @unique
    device    String?  // 'web', 'android', 'ios'
    createdAt DateTime @default(now())
  }
  ```

---

## 4. Docker Self-Hosting Guide

### 4.1 Running Locally with Docker Compose

```bash
# Start full multi-tenant stack (PostgreSQL, Redis, Backend, Frontend, Nginx)
docker-compose up --build -d

# View logs
docker-compose logs -f backend

# Run Prisma migrations inside backend container
docker-compose exec backend npx prisma migrate dev

# Seed demo college tenant data
docker-compose exec backend npx prisma db seed
```

---

## 5. Development Recipes

### 5.1 Onboarding a New College Tenant

1. Super Admin navigates to `/admin/tenants/new`
2. Enter College Name (e.g., "City College"), Subdomain Slug (`city`), and Select Enabled Modules.
3. System creates a `Tenant` record with `slug: "city"`.
4. Admin receives welcome credentials for `city.eduplatform.com` or header-based routing.

### 5.2 Recording Manual Fee Payments

1. Accountant logs in to `/dashboard/finance`.
2. Selects Student by Enrollment Number.
3. Selects Fee Component (e.g., Semester 1 Tuition Fee).
4. Chooses Payment Mode: `CASH`, `BANK_TRANSFER`, or `CHEQUE`.
5. Enters Reference/Transaction ID & uploads receipt image.
6. System issues printable PDF Receipt & sends FCM Push Notification to student/parent.

---

## 6. Environment Variables Reference

### 6.1 Backend (`backend/.env`)

```env
NODE_ENV=production
PORT=3001
DATABASE_URL=postgresql://erp_user:secret@postgres:5432/college_erp_db
REDIS_URL=redis://redis:6379

# Firebase Admin SDK
FIREBASE_PROJECT_ID=your-firebase-project-id
FIREBASE_CLIENT_EMAIL=firebase-adminsdk-xxx@your-project.iam.gserviceaccount.com
FIREBASE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\n...\n-----END PRIVATE KEY-----\n"

# Multi-Tenancy Base Domain
BASE_DOMAIN=eduplatform.com
```

### 6.2 Frontend (`frontend/.env`)

```env
VITE_API_URL=/api/v1
VITE_FIREBASE_API_KEY=your-api-key
VITE_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your-project-id
VITE_FIREBASE_MESSAGING_SENDER_ID=your-sender-id
VITE_FIREBASE_APP_ID=your-app-id
VITE_FIREBASE_VAPID_KEY=your-fcm-vapid-key
```
