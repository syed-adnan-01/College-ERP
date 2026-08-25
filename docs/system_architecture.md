# College ERP — System Architecture Document

## 1. High-Level Architecture (Multi-Tenant & Docker Self-Hosted)

```mermaid
graph TB
    subgraph Client["Client Layer"]
        Browser["🌐 Browser (collegename.domain.com)"]
        Mobile["📱 Mobile PWA / App"]
    end

    subgraph ReverseProxy["Nginx Reverse Proxy & SSL (Docker Container)"]
        Nginx["Nginx (Subdomain Router & Static Files)"]
    end

    subgraph Frontend["Frontend (React SPA Container)"]
        PublicSite["Public Website Module"]
        AuthModule["Auth Module (Firebase + JWT)"]
        TenantContext["Tenant Context Provider"]
        AdminDash["Admin Dashboard"]
        FacultyDash["Faculty Dashboard"]
        StudentDash["Student Dashboard"]
        ERPModules["Tenant-Scoped ERP Modules"]
    end

    subgraph API["Backend API Layer (Express.js Container)"]
        Gateway["API Gateway / Router"]
        TenantMW["Tenant Resolver Middleware"]
        AuthMW["Auth Middleware (JWT/Firebase)"]
        RBAC["Tenant-Scoped RBAC"]
        Controllers["Module Controllers"]
        Services["Business Logic Services"]
        PrismaMW["Prisma Tenant Isolation Middleware"]
    end

    subgraph FirebaseServices["Firebase Cloud Infrastructure"]
        FCM["Firebase Cloud Messaging (Push Notifications)"]
        FBAuth["Firebase Auth (OAuth Social Login)"]
        Firestore["Firestore (Realtime Badges & Chat)"]
    end

    subgraph Data["Self-Hosted Data Layer (Docker Containers)"]
        PG[("PostgreSQL 16 (Multi-Tenant DB)")]
        Redis[("Redis 7 (Session & Rate Limit Cache)")]
        LocalStore["Local Volume / MinIO (Document Storage)"]
    end

    Browser --> Nginx
    Mobile --> Nginx
    Nginx -->|Static Frontend| Frontend
    Nginx -->|Proxy /api| Gateway
    Gateway --> TenantMW --> AuthMW --> RBAC --> Controllers --> Services --> PrismaMW
    PrismaMW --> PG
    Services --> Redis
    Services --> LocalStore
    Services --> FCM
    Services --> Firestore
    Frontend --> FBAuth
```

---

## 2. Multi-Tenancy Architecture

### 2.1 Tenant Resolution & Data Isolation Model

We enforce a **Pooled Database with Discriminator Column (`tenantId`)** model. This provides cost-effective multi-tenancy, rapid onboarding, and unified schema migrations while maintaining strict logical isolation.

```mermaid
sequenceDiagram
    participant Client as Client Browser
    participant Nginx as Nginx Proxy
    participant Backend as Express API
    participant Middleware as Tenant Resolver
    participant Prisma as Prisma Client
    participant DB as PostgreSQL

    Client->>Nginx: GET https://demo.eduplatform.com/api/v1/students
    Nginx->>Backend: Forward Request (Host: demo.eduplatform.com)
    Backend->>Middleware: Extract tenant slug ('demo')
    Middleware->>DB: Query Tenant by slug='demo'
    DB-->>Middleware: Return tenantId: "tenant_uuid_123"
    Middleware->>Backend: Attach req.tenantId = "tenant_uuid_123"
    Backend->>Prisma: student.findMany()
    Note over Prisma: Prisma Middleware automatically appends<br/>WHERE tenantId = 'tenant_uuid_123'
    Prisma->>DB: SELECT * FROM "Student" WHERE tenantId = 'tenant_uuid_123'
    DB-->>Backend: Isolated Student Records
    Backend-->>Client: 200 OK (Tenant Data)
```

### 2.2 Prisma Multi-Tenant Isolation Middleware

```typescript
// backend/src/shared/prisma.ts
import { PrismaClient } from '@prisma/client';

export const prisma = new PrismaClient();

// Automatic Tenant ID injection for query isolation
export function getTenantPrisma(tenantId: string) {
  return prisma.$extends({
    query: {
      $allModels: {
        async $allOperations({ model, operation, args, query }) {
          if (['findUnique', 'findFirst', 'findMany', 'count', 'update', 'delete'].includes(operation)) {
            args.where = { ...args.where, tenantId };
          }
          if (['create', 'createMany'].includes(operation)) {
            if (Array.isArray(args.data)) {
              args.data = args.data.map(item => ({ ...item, tenantId }));
            } else {
              args.data = { ...args.data, tenantId };
            }
          }
          return query(args);
        },
      },
    },
  });
}
```

---

## 3. Frontend Architecture

### 3.1 Module-Based Structure & Tenant Context

```mermaid
graph LR
    subgraph Shell["App Shell"]
        Router["Route Registry"]
        AuthCtx["Auth Context"]
        TenantCtx["Tenant Context (Logo, Theme, Features)"]
        FCMProvider["Firebase FCM Provider"]
    end

    subgraph Modules["Feature Modules"]
        M1["public/ (Marketing site)"]
        M2["auth/ (Tenant-aware login)"]
        M3["dashboard/ (Role + Tenant Dashboard)"]
        M4["students/"]
        M5["academics/"]
        M6["attendance/"]
        M7["finance/ (Manual Payments)"]
        M8["communications/ (Firebase FCM)"]
    end

    Shell --> Modules
```

### 3.2 State Management & Firebase Integration

| State Type | Solution | Example |
|-----------|----------|---------|
| **Server State** | React Query (TanStack Query) | API data (students, courses, fees) |
| **Auth State** | React Context + Firebase Auth | User session, JWT tokens, Tenant ID |
| **Tenant Config** | Zustand | Active tenant branding, custom theme, enabled modules |
| **Push Notifications** | Firebase Cloud Messaging | Web push token registration, toast listener |
| **Form State** | React Hook Form + Zod | Data entry & validation |

---

## 4. Backend Architecture & Firebase Services

### 4.1 Modular Structure with Firebase Services

```
backend/src/
├── config/
│   ├── database.ts
│   ├── firebase.ts          # Firebase Admin SDK initialization
│   ├── tenant.ts            # Subdomain & tenant resolution rules
│   └── env.ts
├── middleware/
│   ├── tenantResolver.ts    # Extracts & verifies tenant from host/headers
│   ├── auth.ts              # JWT + Firebase ID token verification
│   └── rbac.ts              # Checks role & permissions within tenant
├── shared/
│   ├── firebaseAdmin.ts     # FCM message dispatcher & Firestore triggers
│   └── prisma.ts            # Multi-tenant Prisma client
```

### 4.2 Firebase Push Notification Flow

```mermaid
sequenceDiagram
    participant Admin as Admin User
    participant API as Express Backend
    participant FCM as Firebase Cloud Messaging
    participant Student as Student Browser/Phone

    Student->>FCM: Request FCM Token
    FCM-->>Student: Return FCM Token ("token_abc123")
    Student->>API: POST /api/v1/notifications/register-token {token_abc123}
    API->>API: Store Token in DB (associated with userId & tenantId)

    Admin->>API: POST /api/v1/notifications/send {title, body, targetRole: 'student'}
    API->>FCM: firebaseAdmin.messaging().sendEachForMulticast()
    FCM-->>Student: Push Notification Delivered (Web / Mobile)
```

---

## 5. Multi-Tenant Database Architecture

### 5.1 ER Diagram with Tenant Isolation

```mermaid
erDiagram
    Tenant ||--o{ User : "has many"
    Tenant ||--o{ Department : "has many"
    Tenant ||--o{ Program : "has many"
    Tenant ||--o{ Student : "has many"
    Tenant ||--o{ FeeStructure : "has many"

    User }o--|| Role : "has"
    User ||--o| Student : "is a"
    User ||--o| FacultyMember : "is a"

    Student }o--|| Tenant : "belongs to"
    Student }o--|| Department : "belongs to"
    Student }o--|| Program : "enrolled in"
    Student ||--o{ AttendanceRecord : "has"
    Student ||--o{ Payment : "makes (manual)"

    Department }o--|| Tenant : "belongs to"
    Program }o--|| Tenant : "belongs to"
    Course }o--|| Tenant : "belongs to"
    AttendanceRecord }o--|| Tenant : "belongs to"
    Payment }o--|| Tenant : "belongs to"
```

### 5.2 Tenant Data Schema Pattern

Every single business table includes `tenantId`:

```prisma
model Tenant {
  id              String   @id @default(uuid())
  name            String   // e.g., "Stanford University"
  slug            String   @unique // e.g., "stanford"
  customDomain    String?  @unique // e.g., "erp.stanford.edu"
  logoUrl         String?
  primaryColor    String   @default("#030213")
  accentColor     String   @default("#06b6d4")
  enabledModules  String[] // ["STUDENTS", "ACADEMICS", "ATTENDANCE", "FINANCE", "HOSTEL"]
  isActive        Boolean  @default(true)
  createdAt       DateTime @default(now())
  updatedAt       DateTime @updatedAt

  users           User[]
  students        Student[]
  departments     Department[]
  feeStructures   FeeStructure[]
  payments        Payment[]
}
```

---

## 6. Self-Hosted Docker Deployment Topology

### 6.1 Docker Compose Infrastructure (`docker-compose.yml`)

```yaml
version: '3.8'

services:
  nginx:
    image: nginx:alpine
    ports:
      - "80:80"
      - "443:443"
    volumes:
      - ./docker/nginx/nginx.conf:/etc/nginx/nginx.conf:ro
      - ./docker/nginx/certs:/etc/nginx/certs:ro
    depends_on:
      - frontend
      - backend

  frontend:
    build:
      context: ./frontend
      dockerfile: Dockerfile
    environment:
      - VITE_API_URL=/api/v1

  backend:
    build:
      context: ./backend
      dockerfile: Dockerfile
    environment:
      - DATABASE_URL=postgresql://erp_user:secret@postgres:5432/college_erp_db
      - REDIS_URL=redis://redis:6379
      - FIREBASE_CREDENTIALS=/app/config/firebase-service-account.json
    depends_on:
      - postgres
      - redis
    volumes:
      - uploads_data:/app/uploads

  postgres:
    image: postgres:16-alpine
    environment:
      POSTGRES_USER: erp_user
      POSTGRES_PASSWORD: secretpassword
      POSTGRES_DB: college_erp_db
    volumes:
      - pg_data:/var/lib/postgresql/data
    ports:
      - "5432:5432"

  redis:
    image: redis:7-alpine
    ports:
      - "6379:6379"
    volumes:
      - redis_data:/data

volumes:
  pg_data:
  redis_data:
  uploads_data:
```

---

## 7. Deferred Payment & Pluggable Adapter Pattern

The Finance module is designed with an **Adapter Interface** for payments:

```typescript
// backend/src/modules/finance/paymentAdapter.ts
export interface IPaymentAdapter {
  createInvoice(amount: number, metadata: Record<string, any>): Promise<any>;
  recordPayment(paymentData: ManualPaymentDTO): Promise<PaymentRecord>;
}

// Phase 4.5 Implementation: Manual Payment Adapter (Cash, Bank Transfer, Cheque)
export class ManualPaymentAdapter implements IPaymentAdapter {
  async createInvoice(amount: number, metadata: Record<string, any>) {
    // Generate manual invoice PDF/record
  }
  async recordPayment(paymentData: ManualPaymentDTO) {
    // Create DB entry for verified manual payment
  }
}

// Future Gateway Adapter (Razorpay/Stripe - Ready to drop in later)
export class RazorpayPaymentAdapter implements IPaymentAdapter {
  // Plug in when payment gateway is required
}
```

---

## 8. Security Architecture

| Security Layer | Implementation |
|----------------|----------------|
| **Multi-Tenant Isolation** | Prisma Query Middleware injecting `tenantId` into every DB call |
| **Authentication** | Dual mode: JWT access tokens + Firebase Auth ID Tokens |
| **Container Security** | Docker non-root users, minimal Alpine Linux base images |
| **Host Network Proxy** | Nginx handling SSL termination, rate limiting, and request routing |
| **Data Protection** | PostgreSQL automated backups, local volume persistent storage |
