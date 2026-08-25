# College ERP → ERP-Level SaaS Product — Implementation Plan

## Background & Current State

The existing **College-ERP** project is a **frontend-only** React (Vite + TailwindCSS v4) website built from a Figma design. It has 9 public-facing pages (Home, About, Courses, Faculty, Admissions, Events, News, Contact, Login) with a rich **shadcn/ui** component library (48 components). There is **no backend, no database, no authentication, and no real data layer**—all content is hardcoded.

### What We're Preserving
All existing public-facing pages and their visual design will be kept as the **"Public Website"** module—the marketing/informational face of the college. The Login page with its role selector (Student / Faculty / Admin) will become the gateway to the authenticated ERP dashboards.

---

## Resolved Decisions

> [!NOTE]
> **Monorepo Structure**: Using a **monorepo** with `frontend/` and `backend/` at the root. Shared types live in `shared/`.

> [!NOTE]
> **Tech Stack**: **Node.js + Express + PostgreSQL + Prisma** for the backend. **Firebase** for push notifications, cloud messaging, and real-time features.

> [!IMPORTANT]
> **True Multi-Tenancy**: All database tables include a `tenantId` column. A single deployment serves **many colleges**. Tenant resolution happens via subdomain (`collegename.eduplatform.com`) or a tenant header. A `Tenant` table stores college profiles, branding, and enabled modules.

> [!NOTE]
> **Hosting**: **Docker-based self-hosting** using `docker-compose.yml` (PostgreSQL, Redis, backend, frontend Nginx, Firebase Admin SDK). Production-ready with `Dockerfile` per service.

> [!NOTE]
> **Payment Gateway**: Deferred to a **future phase** (post Phase 6). The Finance module will track fees, invoices, and manual payments first. Razorpay/Stripe integration will be added as a pluggable adapter when ready.

> [!NOTE]
> **Firebase Integration**: Using Firebase for:
> - **Firebase Cloud Messaging (FCM)** — Push notifications to web and mobile
> - **Firebase Admin SDK** — Server-side notification dispatch
> - **Firestore (optional)** — Real-time features like chat, live attendance feeds
> - **Firebase Auth (optional complement)** — Can coexist with JWT for OAuth social logins

## Open Questions (Remaining)

1. **Mobile App**: Is a React Native mobile app on the roadmap, or is a responsive PWA sufficient?
2. **Branding**: Should the product remain "EduPlatform" or do you have a new name in mind?

---

## Proposed Changes

### Phase 0: Project Restructuring (Foundation)

> Restructure the codebase into a clean monorepo with separated frontend and backend.

#### [NEW] Root-level monorepo configuration

```
College-ERP/
├── frontend/                    # React app (moved from current root)
│   ├── src/
│   │   ├── app/
│   │   │   ├── components/      # Shared components (existing UI library)
│   │   │   │   ├── ui/          # shadcn/ui components (preserved)
│   │   │   │   ├── figma/       # Figma components (preserved)
│   │   │   │   ├── layout/      # Navbar, Footer, RootLayout, Sidebar
│   │   │   │   └── shared/      # Reusable business components
│   │   │   ├── modules/         # Feature modules (pluggable architecture)
│   │   │   │   ├── public/      # Public website (existing pages moved here)
│   │   │   │   │   └── pages/   # Home, About, Courses, Faculty, etc.
│   │   │   │   ├── auth/        # Authentication module
│   │   │   │   │   ├── pages/   # Login, ForgotPassword, ResetPassword
│   │   │   │   │   ├── hooks/   # useAuth, usePermissions
│   │   │   │   │   ├── context/ # AuthProvider
│   │   │   │   │   └── guards/  # ProtectedRoute, RoleGuard
│   │   │   │   ├── dashboard/   # Dashboard shells for each role
│   │   │   │   ├── students/    # Student management module
│   │   │   │   ├── faculty/     # Faculty management module
│   │   │   │   ├── academics/   # Courses, Timetable, Exams
│   │   │   │   ├── attendance/  # Attendance tracking
│   │   │   │   ├── finance/     # Fee management, payments
│   │   │   │   ├── library/     # Library management
│   │   │   │   ├── hostel/      # Hostel management
│   │   │   │   ├── placement/   # Placement cell
│   │   │   │   ├── hr/          # Staff HR & payroll
│   │   │   │   └── settings/    # System settings & config
│   │   │   ├── hooks/           # Global custom hooks
│   │   │   ├── services/        # API service layer
│   │   │   │   ├── api.ts       # Axios instance + interceptors
│   │   │   │   └── endpoints/   # Per-module API functions
│   │   │   ├── stores/          # Global state (Zustand)
│   │   │   ├── types/           # TypeScript types & interfaces
│   │   │   ├── utils/           # Utility functions
│   │   │   ├── constants/       # App-wide constants
│   │   │   ├── App.tsx
│   │   │   └── routes.tsx       # Centralized route config
│   │   ├── styles/              # Existing styles (preserved)
│   │   └── main.tsx
│   ├── public/
│   ├── index.html
│   ├── package.json
│   ├── vite.config.ts
│   └── tsconfig.json
│
├── backend/                     # Node.js + Express API server
│   ├── src/
│   │   ├── config/              # App configuration
│   │   │   ├── database.ts
│   │   │   ├── auth.ts
│   │   │   ├── cors.ts
│   │   │   ├── firebase.ts      # Firebase Admin SDK init
│   │   │   ├── tenant.ts        # Tenant resolution config
│   │   │   └── env.ts
│   │   ├── modules/             # Feature modules (mirrors frontend)
│   │   │   ├── auth/
│   │   │   │   ├── auth.controller.ts
│   │   │   │   ├── auth.service.ts
│   │   │   │   ├── auth.middleware.ts
│   │   │   │   ├── auth.routes.ts
│   │   │   │   └── auth.validation.ts
│   │   │   ├── tenants/         # Multi-tenancy (college management)
│   │   │   │   ├── tenant.controller.ts
│   │   │   │   ├── tenant.service.ts
│   │   │   │   ├── tenant.middleware.ts  # Tenant resolution middleware
│   │   │   │   ├── tenant.routes.ts
│   │   │   │   └── tenant.validation.ts
│   │   │   ├── users/
│   │   │   ├── students/
│   │   │   ├── faculty/
│   │   │   ├── academics/
│   │   │   ├── attendance/
│   │   │   ├── finance/
│   │   │   ├── library/
│   │   │   ├── hostel/
│   │   │   ├── placement/
│   │   │   ├── hr/
│   │   │   └── notifications/   # Firebase FCM integration
│   │   ├── middleware/           # Global middleware
│   │   │   ├── errorHandler.ts
│   │   │   ├── rateLimiter.ts
│   │   │   ├── requestLogger.ts
│   │   │   ├── tenantResolver.ts # Resolves tenant from subdomain/header
│   │   │   └── validator.ts
│   │   ├── shared/              # Shared utilities
│   │   │   ├── prisma.ts        # Prisma client instance
│   │   │   ├── logger.ts
│   │   │   ├── firebase.ts      # Firebase Admin helpers
│   │   │   ├── mailer.ts        # Email via Firebase or Nodemailer
│   │   │   ├── fileUpload.ts
│   │   │   └── pagination.ts
│   │   ├── types/               # Shared TypeScript types
│   │   └── server.ts            # Express app entry point
│   ├── prisma/
│   │   ├── schema.prisma        # Database schema (with tenantId)
│   │   ├── migrations/          # Auto-generated migrations
│   │   └── seed.ts              # Seed data (demo tenant)
│   ├── Dockerfile               # Backend Docker image
│   ├── package.json
│   ├── tsconfig.json
│   └── .env.example
│
├── shared/                      # Shared types between frontend & backend
│   ├── types/
│   │   ├── user.types.ts
│   │   ├── api.types.ts
│   │   └── module.types.ts
│   └── constants/
│       ├── roles.ts
│       └── permissions.ts
│
├── docs/                        # Project documentation
│   ├── architecture.md
│   ├── knowledge-base.md
│   ├── api-reference.md
│   └── module-guide.md
│
├── docker/                      # Docker configuration
│   ├── nginx/
│   │   └── nginx.conf           # Reverse proxy + frontend serving
│   └── postgres/
│       └── init.sql             # Initial DB setup
│
├── docker-compose.yml           # Full stack: PG + Redis + Backend + Frontend
├── docker-compose.dev.yml       # Dev overrides (hot reload, volumes)
├── .env.example
├── .gitignore
├── firebase.json                # Firebase project config
├── package.json                 # Root workspace package.json
└── README.md
```

---

### Phase 1: Authentication, Authorization & Multi-Tenancy Foundation

> Build the complete auth layer with tenant-aware RBAC that powers the ERP.

#### [NEW] `backend/src/modules/auth/`

- **JWT-based authentication** with access + refresh token pair
- **Role-based access control (RBAC)** with hierarchical permissions:
  - `super_admin` → Full system control (cross-tenant, platform-level)
  - `admin` → College administration (tenant-scoped)
  - `hod` → Head of Department
  - `faculty` → Teaching staff
  - `student` → Enrolled students
  - `parent` → Student guardians (future)
  - `staff` → Non-teaching staff
- **Permission matrix** — granular permissions per module per role, scoped to tenant
- **Password hashing** with bcrypt, password policy enforcement
- **OAuth2 integration** (Google, Microsoft) via Firebase Auth — connects to existing Login UI buttons
- **Firebase Auth** as optional complement for social login flows

#### [NEW] `backend/src/modules/tenants/`

- **Tenant model**: `Tenant` table with `id`, `name`, `slug`, `domain`, `logo`, `themeConfig`, `enabledModules`, `subscriptionTier`
- **Tenant resolution middleware**: Extracts tenant from subdomain (`slug.eduplatform.com`) or `X-Tenant-ID` header
- **Tenant context**: All Prisma queries automatically scoped by `tenantId` using Prisma middleware
- **Tenant onboarding**: Super admin can create new tenants with seed data
- **Tenant isolation**: Row-level security — every data table has `tenantId` foreign key

#### [MODIFY] `frontend/src/app/modules/auth/`

- Upgrade existing [Login.tsx](file:///c:/Users/hp/Documents/OneDrive/Desktop/College/College-ERP/src/app/pages/Login.tsx) to connect to real backend
- Add `AuthContext` / `AuthProvider` wrapping the app (tenant-aware)
- Add `TenantContext` / `TenantProvider` for tenant-scoped theming and branding
- Add `ProtectedRoute` component for dashboard access
- Add Forgot Password / Reset Password flows
- Integrate Firebase Auth SDK for social login buttons

---

### Phase 2: Database Schema Design (Multi-Tenant)

> Design the core PostgreSQL schema using Prisma ORM with `tenantId` on all domain tables.

#### [NEW] `backend/prisma/schema.prisma`

**Multi-tenancy approach**: Every domain table includes a `tenantId` column with a foreign key to the `Tenant` table. A Prisma middleware automatically injects `tenantId` into all queries based on the authenticated user's tenant context. This ensures complete data isolation between colleges.

```prisma
// Example: Every model gets this pattern
model Student {
  id        String   @id @default(uuid())
  tenantId  String
  tenant    Tenant   @relation(fields: [tenantId], references: [id])
  // ... domain fields
  @@index([tenantId])  // Performance index
}
```

**Core entities to model:**

| Domain | Tables |
|--------|--------|
| **Multi-Tenancy** | `Tenant`, `TenantConfig`, `TenantBranding`, `Subscription` |
| **Users & Auth** | `User`, `Role`, `Permission`, `RolePermission`, `Session`, `PasswordReset` |
| **Students** | `Student`, `StudentProfile`, `Guardian`, `StudentDocument` |
| **Faculty** | `FacultyMember`, `FacultyProfile`, `Qualification` |
| **Academics** | `Department`, `Program`, `Course`, `Section`, `Semester`, `AcademicYear`, `Syllabus` |
| **Scheduling** | `Timetable`, `TimetableSlot`, `ClassRoom`, `TimeSlot` |
| **Attendance** | `AttendanceRecord`, `AttendanceSession`, `LeaveRequest` |
| **Exams** | `Exam`, `ExamSchedule`, `ExamResult`, `GradeScale`, `InternalMarks` |
| **Finance** | `FeeStructure`, `FeeCategory`, `Payment`, `Invoice`, `Scholarship`, `FinancialAid` |
| **Library** | `Book`, `BookIssue`, `BookReturn`, `LibraryCard`, `Fine` |
| **Hostel** | `Hostel`, `HostelRoom`, `HostelAllocation`, `MessMenu` |
| **Placement** | `Company`, `PlacementDrive`, `PlacementOffer`, `StudentApplication` |
| **HR** | `Employee`, `Payroll`, `LeavePolicy`, `EmployeeLeave` |
| **Communication** | `Notification`, `Announcement`, `Message`, `NotificationPreference`, `FCMToken` |
| **Settings** | `AcademicCalendar`, `SystemConfig` |

---

### Phase 3: Role-Based Dashboards

> Build the authenticated dashboard experience for each role.

#### [NEW] `frontend/src/app/modules/dashboard/`

Each role gets a dedicated dashboard with a **sidebar navigation layout** (using the existing `sidebar.tsx` component):

**Admin Dashboard:**
- Overview cards (total students, faculty, revenue, attendance %)
- Quick actions (Add Student, Create Notice, Generate Report)
- Recent activity feed
- Academic calendar widget
- Charts: Enrollment trends, Fee collection, Department-wise stats

**Faculty Dashboard:**
- My classes today
- Attendance summary
- Pending assignments to grade
- Student performance analytics
- Timetable view
- Leave requests

**Student Dashboard:**
- Current semester courses
- Attendance percentage (with warnings)
- Upcoming exams & assignments
- Fee payment status
- Timetable
- Grades & CGPA tracker
- Notifications

---

### Phase 4: Core ERP Modules (Implement Incrementally)

Each module follows the same **pluggable architecture pattern**:

```
modules/<module-name>/
├── pages/           # Route-level page components
├── components/      # Module-specific components
├── hooks/           # Module-specific hooks
├── services/        # API calls for this module
├── types/           # Module-specific types
└── index.ts         # Module exports & route config
```

#### Module 4.1: Student Management
- Student enrollment & registration
- Profile management (personal, academic, guardian info)
- Document upload & verification
- Student directory with search & filters
- Bulk import/export (CSV/Excel)

#### Module 4.2: Academic Management
- Department & program configuration
- Course catalog management
- Semester & academic year setup
- Syllabus management
- Timetable builder (drag-and-drop)
- Section allocation

#### Module 4.3: Attendance System
- Faculty marks attendance per class
- QR code / manual attendance
- Real-time attendance dashboard
- Low attendance alerts (configurable threshold)
- Attendance reports (daily, weekly, monthly, per-subject)
- Leave request & approval workflow

#### Module 4.4: Examination & Grading
- Exam schedule creation
- Hall ticket generation
- Internal marks entry
- Result processing & grade calculation
- Transcript generation (PDF)
- Grade analytics & distribution

#### Module 4.5: Fee & Finance Management
- Fee structure configuration per program/year (tenant-scoped)
- Invoice generation
- **Manual payment recording** (cash, bank transfer, cheque)
- Payment history & receipts (PDF)
- Scholarship management
- Outstanding fee reports
- Bulk fee reminders (via Firebase push notifications)
- 🔮 *Future*: Online payment gateway integration (Razorpay/Stripe) — pluggable adapter pattern

#### Module 4.6: Library Management
- Book catalog with search & filters
- Issue / return workflow
- Fine calculation
- Digital resource management
- Book availability tracking
- Student borrowing history

#### Module 4.7: Hostel Management
- Room allocation & management
- Hostel fee integration
- Mess menu management
- Complaint system
- Visitor log

#### Module 4.8: Placement Cell
- Company database
- Drive scheduling & management
- Student eligibility filters
- Application tracking
- Offer letter management
- Placement statistics & reports

#### Module 4.9: HR & Payroll
- Employee profiles & records
- Leave policy configuration
- Leave application & approval
- Payroll processing
- Salary slip generation

#### Module 4.10: Communication & Notifications (Firebase-Powered)
- In-app notification center
- **Firebase Cloud Messaging (FCM)** — push notifications to browser & mobile
- Email notifications (via Nodemailer / Firebase Extension with SendGrid)
- SMS alerts (optional, via Twilio — future)
- Announcements (college-wide, department, class) — tenant-scoped
- Notice board (digital)
- Real-time notification badges via Firebase Firestore listeners

---

### Phase 5: Reporting & Analytics Engine

#### [NEW] `frontend/src/app/modules/reports/`

- Custom report builder (select filters → generate)
- Pre-built report templates:
  - Enrollment report, Attendance summary, Fee collection, Exam results, Placement stats
- Export to PDF, Excel, CSV
- Data visualization dashboards using **Recharts** (already installed)
- Scheduled report generation

---

### Phase 6: SaaS Features, Docker & Infrastructure

#### Multi-College Support (SaaS Layer — True Multi-Tenancy)
- **Super Admin Panel**: Platform-level dashboard to manage all tenants
- **College onboarding wizard**: Create tenant → seed default data → configure branding
- **Subdomain-based routing**: `collegename.eduplatform.com` → resolves `tenantId`
- **Per-college customization**: Logo, colors, enabled modules, academic config
- **Subscription tiers**: Control which modules each tenant can access
- **Tenant data export**: Full data export per tenant for compliance/portability

#### Docker Infrastructure
- **`docker-compose.yml`** — Full production stack:
  ```yaml
  services:
    postgres:     # PostgreSQL 16 with persistent volume
    redis:        # Redis 7 for caching & sessions
    backend:      # Node.js Express API (multi-stage Dockerfile)
    frontend:     # Nginx serving Vite build + reverse proxy
  ```
- **`docker-compose.dev.yml`** — Dev overrides with hot-reload volumes
- **Nginx config**: Serves frontend, proxies `/api` to backend, handles subdomain routing
- **Health checks**: Container health monitoring
- **Volume persistence**: PostgreSQL data, uploaded files

#### System Administration
- Role & permission management UI (tenant-scoped)
- System configuration (academic year, grading scale, etc.)
- Audit logs (who did what, when, in which tenant)
- Data backup & restore (per-tenant)
- User activity monitoring

#### API Design Principles
- **RESTful API** with consistent naming: `/api/v1/<resource>`
- **Versioned API** — all endpoints prefixed with `/api/v1/`
- **Tenant-scoped** — all responses filtered by authenticated tenant
- **Standardized response format:**
  ```json
  {
    "success": true,
    "data": {},
    "message": "...",
    "meta": { "page": 1, "totalPages": 10, "totalItems": 100, "tenantId": "..." }
  }
  ```
- **Pagination, filtering, sorting** on all list endpoints
- **Request validation** using Zod
- **Rate limiting** per user/role/tenant

---

## Implementation Phases & Timeline

| Phase | Scope | Estimated Effort |
|-------|-------|-----------------|
| **Phase 0** | Project restructuring, monorepo + Docker setup | 1-2 days |
| **Phase 1** | Auth + Multi-tenancy foundation + Firebase setup | 4-6 days |
| **Phase 2** | Database schema (multi-tenant) + Prisma setup | 3-4 days |
| **Phase 3** | Role-based dashboards (tenant-aware UI shells) | 3-5 days |
| **Phase 4.1** | Student Management | 4-6 days |
| **Phase 4.2** | Academic Management | 4-6 days |
| **Phase 4.3** | Attendance System | 3-5 days |
| **Phase 4.4** | Examination & Grading | 4-6 days |
| **Phase 4.5** | Fee & Finance (manual payments, no gateway yet) | 3-5 days |
| **Phase 4.6** | Library Management | 3-4 days |
| **Phase 4.7** | Hostel Management | 2-3 days |
| **Phase 4.8** | Placement Cell | 3-4 days |
| **Phase 4.9** | HR & Payroll | 3-5 days |
| **Phase 4.10** | Communications (Firebase FCM) | 3-4 days |
| **Phase 5** | Reports & Analytics | 4-6 days |
| **Phase 6** | SaaS admin panel, Docker prod config, tenant mgmt | 5-8 days |
| **Future** | Payment gateway (Razorpay/Stripe), Mobile app, SMS | TBD |

---

## Tech Stack Summary

| Layer | Technology | Purpose |
|-------|-----------|---------|
| **Frontend** | React 18 + TypeScript | UI framework |
| **Bundler** | Vite 6 | Fast dev/build |
| **Styling** | TailwindCSS v4 + shadcn/ui | Design system |
| **State Mgmt** | Zustand + React Query | Client state + server state |
| **Routing** | React Router v7 | Client-side routing |
| **Charts** | Recharts | Data visualization |
| **Forms** | React Hook Form + Zod | Form handling + validation |
| **Backend** | Node.js + Express + TypeScript | REST API |
| **ORM** | Prisma (with tenant middleware) | Database access (multi-tenant) |
| **Database** | PostgreSQL 16 | Primary data store |
| **Cache** | Redis 7 | Session cache, rate limiting |
| **Auth** | JWT + bcrypt + Firebase Auth | Authentication + social login |
| **Push Notifications** | Firebase Cloud Messaging (FCM) | Web & mobile push notifications |
| **Real-time** | Firebase Firestore (optional) | Live updates, notification badges |
| **File Storage** | Docker volumes / MinIO | Document uploads (self-hosted) |
| **Email** | Nodemailer (SMTP) / Firebase Extensions | Transactional emails |
| **PDF** | PDFKit / Puppeteer | Report/transcript generation |
| **Testing** | Vitest (frontend) + Jest (backend) | Automated tests |
| **Containerization** | Docker + Docker Compose | Full-stack self-hosted deployment |
| **Reverse Proxy** | Nginx | Frontend serving + API proxy + subdomain routing |

---

## Verification Plan

### Automated Tests
- `npm run test` in both `frontend/` and `backend/` directories
- API integration tests for each module endpoint
- Frontend component tests for critical flows (login, attendance, fee payment)
- E2E tests with Playwright for key user journeys

### Manual Verification
- Each phase concludes with a visual review of the UI
- Auth flows tested with all 3 roles (admin, faculty, student)
- API endpoints tested via Postman/Thunder Client
- Database integrity verified via Prisma Studio
- Responsive design checked on mobile/tablet/desktop breakpoints
