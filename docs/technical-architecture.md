# SP App Technical Architecture

## 1. System Overview

The SP App is a full-stack web application deployed on AWS, built with Next.js and PostgreSQL. The architecture follows a containerized serverless pattern using ECS Fargate behind an Application Load Balancer.

```
                         Internet
                            |
                     +------+------+
                     |    ALB      |
                     | (Port 80)   |
                     +------+------+
                            |
                   Public Subnet (10.99.1.0/24, 10.99.2.0/24)
                            |
              +-------------+-------------+
              |                           |
     +--------+--------+        +--------+--------+
     | ECS Fargate      |        | NAT Gateway     |
     | sp-app-service   |        | (Egress)        |
     | 512 CPU / 1024MB |        +-----------------+
     | Port 3000        |
     +--------+---------+
              |
     Private Subnet (10.99.3.0/24, 10.99.4.0/24)
              |
     +--------+---------+
     | RDS PostgreSQL 16 |
     | t3.micro          |
     | sp-app-db         |
     +-------------------+

     +-------------------+     +-------------------+
     | ECR               |     | S3                |
     | sp-app repo       |     | sp-app-assets-*   |
     +-------------------+     +-------------------+

     +-------------------+     +-------------------+
     | CloudWatch Logs   |     | Secrets Manager   |
     | /sp-app/ecs       |     | sp-app/db-creds   |
     +-------------------+     +-------------------+

     +-------------------------------------------+
     | GitHub Actions CI/CD                       |
     | lint -> build -> push ECR -> deploy ECS    |
     +-------------------------------------------+
```

### Key Design Decisions

- **Standalone Next.js output** for minimal container size
- **Single-region deployment** (us-east-1) for simplicity
- **Fully isolated VPC** with no shared resources
- **CDK-managed infrastructure** for reproducible deployments
- **Service-repository pattern** for clean separation of concerns

---

## 2. Frontend Architecture

### Framework

- **Next.js 16.1.7** with App Router
- **React 19.2.3** with client components (`"use client"` directives)
- **TypeScript 5.x** throughout the codebase

### Styling

- **Tailwind CSS v4** with PostCSS integration
- Custom CSS theme variables defined in `globals.css`
- Dark mode support via `.dark` class on the `<html>` element

### Charting

- **recharts 3.8.0** for all data visualizations:
  - BarChart (home consumption, district data)
  - PieChart / donut (bill breakdown)
  - AreaChart (daily usage sparkline)

### Icons

- **lucide-react 0.577.0** for all UI icons

### Design System: Glassmorphism

The app uses a custom glassmorphism design language with three tiers:

| Utility Class | Background Opacity | Blur | Use Case |
|--------------|-------------------|------|----------|
| `.glass` | 70% | 20px | Standard cards, containers |
| `.glass-strong` | 85% | 30px | Headers, important panels, bottom nav |
| `.glass-subtle` | 40% | 12px | Secondary elements, backgrounds |

Each tier has dark mode variants that shift to dark gray backgrounds with subtle white borders.

### Micro-Animations

The app includes a comprehensive set of CSS animation utilities:

| Animation | Class | Description |
|-----------|-------|-------------|
| Fade In Up | `.animate-fade-in-up` | Cards appearing from below |
| Fade In Scale | `.animate-fade-in-scale` | Modals and panels |
| Slide In Right | `.animate-slide-in-right` | List items, card entries |
| Bounce In | `.animate-bounce-in` | Badges, success indicators |
| Pulse Glow | `.animate-pulse-glow` | Call-to-action buttons |
| Float | `.animate-float` | Decorative background elements |
| Shimmer | `.animate-shimmer` | Loading states, golden highlights |

Staggered delay utilities (`.delay-100` through `.delay-700`) enable sequenced entry animations.

Interactive feedback classes include `.press-effect` (scale to 0.96 on active), `.hover-lift` (translate up 2px on hover), and `.spring-button` (spring-physics scale with cubic-bezier timing).

### Canvas Rendering

The Energy Flow page uses the HTML5 Canvas API directly for real-time particle animation, bypassing React's rendering cycle via `requestAnimationFrame`. Features include:
- HiDPI/Retina support via device pixel ratio scaling
- Bezier curve-based particle paths
- Trail rendering with opacity decay
- Shadow-based particle glow effects

### Page Structure

```
src/app/
  layout.tsx          -- Root layout with BottomNav and SPBuddy
  page.tsx            -- Home dashboard
  globals.css         -- Theme, glassmorphism, animations
  bills/
    page.tsx          -- Bills list and transactions
    [id]/page.tsx     -- Bill detail with breakdown
  simulator/page.tsx  -- Bill prediction simulator
  utilities/
    page.tsx          -- Services portal
    moving/page.tsx   -- Moving house wizard
  green-goals/page.tsx -- Sustainability tracking
  greenup/page.tsx    -- Gamification system
  ev-charging/page.tsx -- EV station finder
  energy-flow/page.tsx -- Real-time canvas animation
  profile/page.tsx    -- Account and settings
  api/                -- Route handlers (see API Layer)

src/components/
  BottomNav.tsx       -- 5-tab navigation bar
  SPBuddy.tsx         -- AI chatbot component
  ThemeToggle.tsx     -- Dark mode toggle
```

---

## 3. API Layer

### Architecture Pattern

The API follows a **service-repository pattern** with three layers:

1. **Route Handlers** (`src/app/api/**/route.ts`) -- HTTP request/response handling
2. **Services** (`src/lib/services/*.service.ts`) -- Business logic
3. **Repositories** (`src/lib/repositories/*.repository.ts`) -- Data access via Prisma

### Response Format

All API responses use a consistent envelope:

```
Success: { success: true, data: <payload> }
Error:   { success: false, error: "<message>" }
```

Helper functions in `src/lib/utils/api-response.ts`:
- `successResponse(data, status)` -- 200 by default
- `errorResponse(message, status)` -- 500 by default
- `notFoundResponse(resource)` -- 404
- `badRequestResponse(message)` -- 400

### API Endpoints

| # | Method | Path | Description |
|---|--------|------|-------------|
| 1 | GET | `/api/health` | Health check (returns status, timestamp, version) |
| 2 | GET | `/api/users/me` | Get current user profile |
| 3 | PUT | `/api/users/me` | Update user profile |
| 4 | GET | `/api/users/me/preferences` | Get user preferences |
| 5 | PUT | `/api/users/me/preferences` | Update user preferences |
| 6 | GET | `/api/premises` | List all premises for current user |
| 7 | GET | `/api/premises/:id` | Get a specific premise by ID |
| 8 | GET | `/api/premises/:id/consumption` | Get consumption data (query: utilityType, period) |
| 9 | GET | `/api/premises/:id/appliances` | List appliances for a premise |
| 10 | GET | `/api/bills` | List bills (query: premiseId) |
| 11 | GET | `/api/bills/:id` | Get bill detail with line items and insights |

Additional endpoints planned for the full 26-endpoint target include green goals, greenup profiles, challenges, rewards, EV stations, applications, notifications, GIRO accounts, simulator calculations, and leaderboard data. The service and repository layers for all 16 domains are already implemented.

---

## 4. Database Layer

### ORM

- **Prisma 7.5.0** as the TypeScript ORM
- Schema defined in `prisma/schema.prisma`
- PostgreSQL 16 as the database engine

### Schema Overview (16 Tables)

```
users
  |-- 1:N --> premise_members
  |-- 1:1 --> greenup_profiles
  |-- 1:N --> user_challenges
  |-- 1:N --> user_rewards
  |-- 1:N --> applications
  |-- 1:N --> notifications
  |-- 1:N --> giro_accounts

premises
  |-- 1:N --> premise_members
  |-- 1:N --> consumption_readings
  |-- 1:N --> bills
  |-- 1:N --> appliances
  |-- 1:N --> green_goals
  |-- 1:N --> applications
  |-- 1:N --> giro_accounts
  |-- 1:N --> transactions

bills
  |-- 1:N --> bill_line_items
  |-- 1:N --> transactions

challenges
  |-- 1:N --> user_challenges

rewards
  |-- 1:N --> user_rewards

ev_stations (standalone)
leaderboard_entries (standalone)
```

### Key Relationships

- **Users <-> Premises**: Many-to-many via `premise_members` with role-based access (owner/member)
- **Bills -> BillLineItems**: One-to-many for bill breakdown categories
- **Users -> GreenupProfile**: One-to-one for gamification state
- **Challenges -> UserChallenges**: Many-to-many tracking user progress per challenge
- **Rewards -> UserRewards**: Many-to-many tracking claim status

### Indexes

Indexes are defined on frequently queried columns:
- `consumption_readings`: composite on (premise_id, utility_type) and on (period_type)
- `bills`: on (premise_id) and on (bill_month)
- `bill_line_items`: on (bill_id)
- `transactions`: on (premise_id) and on (transaction_date)
- `appliances`: on (premise_id)
- `applications`: on (user_id)
- `notifications`: on (user_id) and composite on (user_id, is_read)
- `leaderboard_entries`: on (week_of)

### Seed Data Strategy

The application uses Prisma seed scripts to populate development data including:
- A demo user with profile and preferences
- One or more premises with addresses in Singapore
- Multiple months of consumption readings across utility types and periods
- Historical bills with line items
- Transaction records for payments
- Appliance configurations for the energy flow visualization
- Green goals with progress tracking
- GreenUP profile, challenges, and rewards
- EV charging station locations
- Sample notifications and applications

---

## 5. AWS Infrastructure

### VPC Configuration

- **CIDR**: 10.99.0.0/16
- **Availability Zones**: 2
- **Subnets**:
  - Public (10.99.1.0/24, 10.99.2.0/24) -- ALB
  - Private with egress (10.99.3.0/24, 10.99.4.0/24) -- ECS, RDS
- **NAT Gateways**: 1 (for outbound internet access from private subnets)

### ECS Fargate

- **Cluster**: sp-app-cluster with Container Insights enabled
- **Task Definition**: sp-app-task
  - CPU: 512 units (0.5 vCPU)
  - Memory: 1024 MiB
  - Container: sp-app (image from ECR)
  - Port mapping: 3000/TCP
  - Health check: `wget` to `/api/health` every 30s with 60s startup grace
- **Service**: sp-app-service
  - Desired count: 1
  - Deployed in private subnets
  - No public IP assignment

### RDS PostgreSQL

- **Instance**: sp-app-db
- **Engine**: PostgreSQL 16
- **Instance type**: db.t3.micro
- **Storage**: 20 GB initial, auto-scaling to 50 GB
- **Multi-AZ**: No (single-instance for cost savings)
- **Backup retention**: 7 days
- **Deployed in**: Private subnets
- **Credentials**: Managed via AWS Secrets Manager

### Application Load Balancer

- **Name**: sp-app-alb
- **Type**: Internet-facing
- **Listener**: Port 80 (HTTP)
- **Target**: ECS Fargate service on port 3000
- **Health check**: `/api/health` every 30s, 2 healthy / 3 unhealthy threshold
- **Deployed in**: Public subnets

### ECR Repository

- **Name**: sp-app
- **Lifecycle**: Retains last 10 images
- **Removal policy**: DESTROY (for non-production)

### S3 Bucket

- **Name**: sp-app-assets-{account_id}
- **Purpose**: Digital asset management (bill PDFs, user uploads)
- **CORS**: Enabled for GET and PUT from all origins

### Security Groups

```
sp-app-alb-sg
  Inbound:  0.0.0.0/0 -> TCP/80 (HTTP from internet)
  Outbound: All allowed

sp-app-ecs-sg
  Inbound:  sp-app-alb-sg -> TCP/3000 (ALB to container)
  Outbound: All allowed

sp-app-db-sg
  Inbound:  sp-app-ecs-sg -> TCP/5432 (ECS to database)
  Outbound: None (restricted)
```

---

## 6. CI/CD Pipeline

### GitHub Actions Workflow

The deployment pipeline runs on push to the main branch:

1. **Lint**: Run ESLint to check code quality
2. **Build**: Run `next build` with standalone output
3. **Push to ECR**: Build Docker image and push to the ECR repository
4. **Deploy to ECS**: Update the ECS service to pull the latest image

### Docker Build

The Dockerfile uses a multi-stage build:

| Stage | Base Image | Purpose |
|-------|-----------|---------|
| deps | node:22-alpine | Install npm dependencies with `npm ci` |
| builder | node:22-alpine | Generate Prisma client and build Next.js |
| runner | node:22-alpine | Production runtime with minimal footprint |

The runner stage:
- Creates a non-root `nextjs` user (UID 1001)
- Copies only the standalone output, static files, public assets, and Prisma client
- Exposes port 3000
- Runs `node server.js` directly

---

## 7. Security Model

### Network Isolation

- All application and database resources reside in private subnets
- Only the ALB is in public subnets and exposed to the internet
- The RDS security group allows inbound connections only from the ECS security group
- No direct SSH or database access from the internet

### Secrets Management

- Database credentials are generated and stored in AWS Secrets Manager
- The `sp-app/db-credentials` secret auto-generates a 32-character password without punctuation
- ECS tasks access the database URL via Secrets Manager integration
- No credentials are hardcoded in the codebase or Docker image

### Container Security

- The container runs as a non-root user (`nextjs`, UID 1001)
- The Docker image is based on Alpine Linux for a minimal attack surface
- No public IP is assigned to ECS tasks

---

## 8. Monitoring

### CloudWatch

- **Log Group**: `/sp-app/ecs` with 14-day retention
- **Stream Prefix**: `sp-app` for container logs
- **Container Insights**: Enabled on the ECS cluster for CPU, memory, and network metrics

### Health Checks

- **ECS Container**: `wget` to `localhost:3000/api/health` every 30 seconds
- **ALB Target Group**: HTTP GET to `/api/health` every 30 seconds
- Health endpoint returns `{ success: true, data: { status: "ok", timestamp: "...", version: "1.0.0" } }`

---

## 9. Design System

### Color Palette

| Token | Value | Usage |
|-------|-------|-------|
| sp-teal | #00BFA5 | Primary brand, buttons, active states |
| sp-teal-dark | #009688 | Pressed states, header backgrounds |
| sp-teal-light | #E0F7FA (light) / #0d3d38 (dark) | Subtle backgrounds, icon containers |
| sp-orange | #FF6D00 | Alerts, warnings, accent |
| sp-green | #4CAF50 | Success states, positive trends |
| sp-red | #F44336 | Errors, negative trends, badges |
| sp-gray | #F5F5F5 (light) / #1f2937 (dark) | Page backgrounds |
| sp-dark | #333333 (light) / #f3f4f6 (dark) | Primary text |

### Gradients

Each page has a unique background gradient defined in CSS:
- Home: teal to white
- Bills: green to white
- Profile: teal-green to white
- Utilities: teal-cyan to white
- EV Charging: teal-blue to white
- Bill Detail: green-teal to white

All gradients have corresponding dark mode variants.

### Typography

- **Font**: Geist Sans (loaded via `next/font/google`)
- **Fallback**: Arial, Helvetica, sans-serif
- **Max width**: 430px (mobile-first constraint)

### Glow Effects

The `.glow-teal` utility adds a layered box-shadow with teal tinting, intensified in dark mode, used on primary CTAs and featured elements.

---

## 10. Cost Estimate

Monthly cost breakdown for the production deployment:

| Resource | Specification | Estimated Cost |
|----------|--------------|----------------|
| ECS Fargate | 0.5 vCPU, 1 GB, 24/7 | ~$15/month |
| RDS PostgreSQL | db.t3.micro, 20GB | ~$15/month (free tier eligible) |
| Application Load Balancer | Internet-facing, HTTP | ~$16/month |
| NAT Gateway | 1 gateway + data processing | ~$32/month |
| ECR | Image storage (<1 GB) | ~$0.10/month |
| S3 | Asset storage (<5 GB) | ~$0.12/month |
| CloudWatch | Logs + Container Insights | ~$2/month |
| Secrets Manager | 1 secret | ~$0.40/month |
| **Total** | | **~$81/month** |

Notes:
- NAT Gateway is the largest fixed cost; could be eliminated with VPC endpoints for ECR and Secrets Manager
- RDS may qualify for AWS Free Tier for the first 12 months
- Costs assume us-east-1 pricing and minimal traffic
- No HTTPS/certificate costs included (would add ~$0 with ACM)
