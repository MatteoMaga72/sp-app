# SP App Technical Specifications

---

## 1. API Contracts

All endpoints return JSON with a consistent envelope format. Successful responses use HTTP 200 unless otherwise noted. Error responses include the appropriate HTTP status code and an error message.

### Response Envelope

```json
// Success
{ "success": true, "data": <payload> }

// Error
{ "success": false, "error": "<message>" }
```

---

### Health

#### GET /api/health

Returns application health status.

**Response (200)**:
```json
{
  "success": true,
  "data": {
    "status": "ok",
    "timestamp": "2026-03-18T10:30:00.000Z",
    "version": "1.0.0"
  }
}
```

---

### User

#### GET /api/users/me

Returns the current authenticated user's profile.

**Response (200)**:
```json
{
  "success": true,
  "data": {
    "id": "uuid",
    "fullName": "MAGA MATTEO LUCA",
    "email": "matteolmaga@gmail.com",
    "phone": "+65 8972 7679",
    "avatarInitials": "MM",
    "rewardPoints": 50,
    "darkMode": false,
    "notificationsEnabled": true,
    "createdAt": "2026-01-01T00:00:00.000Z",
    "updatedAt": "2026-03-18T00:00:00.000Z"
  }
}
```

#### PUT /api/users/me

Updates the current user's profile.

**Request Body**:
```json
{
  "fullName": "MAGA MATTEO LUCA",
  "phone": "+65 8972 7679",
  "darkMode": true,
  "notificationsEnabled": false
}
```

**Response (200)**: Updated user object (same shape as GET).

**Error (500)**: `{ "success": false, "error": "Failed to update user" }`

#### GET /api/users/me/preferences

Returns user preferences.

**Response (200)**:
```json
{
  "success": true,
  "data": {
    "darkMode": false,
    "notificationsEnabled": true,
    "language": "en",
    "communicationChannels": ["push", "email"]
  }
}
```

#### PUT /api/users/me/preferences

Updates user preferences.

**Request Body**:
```json
{
  "darkMode": true,
  "notificationsEnabled": false,
  "language": "en",
  "communicationChannels": ["push"]
}
```

**Response (200)**: Updated preferences object.

---

### Premises

#### GET /api/premises

Lists all premises associated with the current user.

**Response (200)**:
```json
{
  "success": true,
  "data": [
    {
      "id": "uuid",
      "addressLine1": "18 Everton Rd",
      "addressLine2": "Singapore 089374",
      "postalCode": "089374",
      "district": "D2",
      "propertyType": "HDB",
      "hasElectricity": true,
      "hasWater": true,
      "hasGas": true
    }
  ]
}
```

#### GET /api/premises/:id

Returns a single premise by ID.

**Path Parameters**: `id` (string, UUID)

**Response (200)**: Single premise object.

**Error (404)**: `{ "success": false, "error": "Premise not found" }`

#### GET /api/premises/:id/consumption

Returns consumption data for a premise.

**Path Parameters**: `id` (string, UUID)

**Query Parameters**:
| Parameter | Type | Required | Values |
|-----------|------|----------|--------|
| utilityType | string | No | `electricity`, `water`, `gas` |
| period | string | No | `today`, `week`, `month`, `year` |

**Response (200)**:
```json
{
  "success": true,
  "data": {
    "utilityType": "electricity",
    "period": "week",
    "unit": "kWh",
    "data": [
      { "label": "Mon", "value": 22 },
      { "label": "Tue", "value": 15 },
      { "label": "Wed", "value": 0.95 },
      { "label": "Thu", "value": 0 },
      { "label": "Fri", "value": 0 },
      { "label": "Sat", "value": 0 },
      { "label": "Sun", "value": 0 }
    ],
    "lastUpdated": "2026-03-18T22:45:00.000Z"
  }
}
```

#### GET /api/premises/:id/appliances

Returns appliances for the energy flow visualization.

**Path Parameters**: `id` (string, UUID)

**Response (200)**:
```json
{
  "success": true,
  "data": [
    {
      "id": "uuid",
      "premiseId": "uuid",
      "name": "Air Conditioning",
      "emoji": "🌡️",
      "kwhPerDay": 8.5,
      "color": "#FF8A65",
      "glowColor": "rgba(255,138,101,0.4)",
      "sortOrder": 0
    }
  ]
}
```

---

### Bills

#### GET /api/bills

Lists bills with optional premise filter.

**Query Parameters**:
| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| premiseId | string | No | Filter by premise UUID |

**Response (200)**:
```json
{
  "success": true,
  "data": [
    {
      "id": "uuid",
      "premiseId": "uuid",
      "billMonth": "2026-03-01",
      "totalAmount": 154.08,
      "status": "unpaid",
      "dueDate": "2026-03-20",
      "pdfUrl": null
    }
  ]
}
```

#### GET /api/bills/:id

Returns full bill detail with line items, comparison, insights, and daily usage.

**Path Parameters**: `id` (string, UUID or slug like "mar-2026")

**Response (200)**:
```json
{
  "success": true,
  "data": {
    "id": "uuid",
    "premiseId": "uuid",
    "billMonth": "2026-03-01",
    "totalAmount": 154.08,
    "status": "unpaid",
    "dueDate": "2026-03-20",
    "pdfUrl": null,
    "lineItems": [
      {
        "id": "uuid",
        "billId": "uuid",
        "category": "electricity",
        "label": "Electricity",
        "amount": 98.50,
        "detail": "412 kWh x $0.2391/kWh",
        "percentage": 64,
        "sortOrder": 0
      },
      {
        "id": "uuid",
        "billId": "uuid",
        "category": "water",
        "label": "Water",
        "amount": 32.20,
        "detail": "7.3 Cu M x various tariff tiers",
        "percentage": 21,
        "sortOrder": 1
      },
      {
        "id": "uuid",
        "billId": "uuid",
        "category": "gas",
        "label": "Gas",
        "amount": 12.80,
        "detail": "Piped gas usage",
        "percentage": 8,
        "sortOrder": 2
      },
      {
        "id": "uuid",
        "billId": "uuid",
        "category": "gst",
        "label": "GST (9%)",
        "amount": 10.58,
        "detail": "9% Goods & Services Tax",
        "percentage": 7,
        "sortOrder": 3
      }
    ],
    "previousTotal": 177.55,
    "savings": 23.47,
    "comparison": [
      {
        "label": "Electricity",
        "previous": 121.30,
        "current": 98.50,
        "changePercent": -18.8,
        "color": "#00BFA5"
      },
      {
        "label": "Water",
        "previous": 38.90,
        "current": 32.20,
        "changePercent": -17.2,
        "color": "#2196F3"
      },
      {
        "label": "Gas",
        "previous": 17.35,
        "current": 12.80,
        "changePercent": -26.2,
        "color": "#FF9800"
      }
    ],
    "insights": [
      {
        "icon": "🌡️",
        "text": "Cooler weather in March reduced AC usage by ~18%, saving you about $15",
        "borderColor": "#4CAF50"
      }
    ],
    "dailyUsage": [
      { "day": 1, "kWh": 14.2 },
      { "day": 2, "kWh": 12.8 }
    ]
  }
}
```

**Error (404)**: `{ "success": false, "error": "Bill not found" }`

---

### Green Goals (Planned Endpoints)

#### GET /api/premises/:id/green-goals

Returns green goals for a premise.

#### GET /api/greenup/profile

Returns the current user's GreenUP gamification profile.

#### GET /api/greenup/challenges

Returns available and active challenges.

#### POST /api/greenup/challenges/:id/progress

Updates progress on a challenge.

#### GET /api/greenup/rewards

Returns available and locked rewards.

#### POST /api/greenup/rewards/:id/claim

Claims an available reward.

#### GET /api/greenup/leaderboard

Returns district leaderboard entries.

---

### EV Charging (Planned Endpoints)

#### GET /api/ev-stations

Returns all EV charging stations with optional location-based filtering.

#### GET /api/ev-stations/:id

Returns a single station with detailed charger information.

---

### Applications (Planned Endpoints)

#### GET /api/applications

Lists the current user's applications.

#### POST /api/applications

Submits a new application (moving, open, close).

#### GET /api/applications/:id

Returns a single application with status timeline.

---

### Notifications (Planned Endpoints)

#### GET /api/notifications

Lists notifications for the current user.

#### PUT /api/notifications/:id/read

Marks a notification as read.

---

### Simulator (Planned Endpoint)

#### POST /api/simulator/calculate

Calculates a predicted bill based on input parameters.

**Request Body**:
```json
{
  "acTemp": 24,
  "acHours": 10,
  "showers": 4,
  "laundryLoads": 4,
  "lightsWasted": 2,
  "entertainment": 5
}
```

**Response (200)**:
```json
{
  "success": true,
  "data": {
    "predictedTotal": 168.23,
    "breakdown": {
      "baseElectricity": 45.00,
      "acCost": 14.50,
      "waterCost": 216.00,
      "laundryCost": 20.64,
      "lightsCost": 30.00,
      "entertainmentCost": 120.00,
      "gst": 40.15
    },
    "comparedToCurrent": -14.15,
    "savingsPerYear": 169.80
  }
}
```

---

### GIRO (Planned Endpoints)

#### GET /api/giro

Lists GIRO accounts for the current user.

#### POST /api/giro

Sets up a new GIRO account.

---

### Transactions (Planned Endpoints)

#### GET /api/transactions

Lists transactions with optional premise filter.

---

## 2. Database Schema

### Complete Table Definitions

#### users
```sql
CREATE TABLE users (
  id            UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  full_name     VARCHAR NOT NULL,
  email         VARCHAR NOT NULL UNIQUE,
  phone         VARCHAR,
  avatar_initials VARCHAR,
  reward_points INTEGER NOT NULL DEFAULT 0,
  dark_mode     BOOLEAN NOT NULL DEFAULT false,
  notifications_enabled BOOLEAN NOT NULL DEFAULT true,
  created_at    TIMESTAMP NOT NULL DEFAULT now(),
  updated_at    TIMESTAMP NOT NULL DEFAULT now()
);
```

#### premises
```sql
CREATE TABLE premises (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  address_line1   VARCHAR NOT NULL,
  address_line2   VARCHAR,
  postal_code     VARCHAR,
  district        VARCHAR,
  property_type   VARCHAR,
  has_electricity BOOLEAN NOT NULL DEFAULT true,
  has_water       BOOLEAN NOT NULL DEFAULT true,
  has_gas         BOOLEAN NOT NULL DEFAULT true,
  created_at      TIMESTAMP NOT NULL DEFAULT now(),
  updated_at      TIMESTAMP NOT NULL DEFAULT now()
);
```

#### premise_members
```sql
CREATE TABLE premise_members (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  premise_id  UUID NOT NULL REFERENCES premises(id) ON DELETE CASCADE,
  user_id     UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  role        VARCHAR NOT NULL DEFAULT 'member',
  initials    VARCHAR,
  joined_at   TIMESTAMP NOT NULL DEFAULT now(),
  UNIQUE(premise_id, user_id)
);
```

#### consumption_readings
```sql
CREATE TABLE consumption_readings (
  id             UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  premise_id     UUID NOT NULL REFERENCES premises(id) ON DELETE CASCADE,
  utility_type   VARCHAR NOT NULL,
  reading_value  DECIMAL(12,4) NOT NULL,
  period_type    VARCHAR NOT NULL,
  period_start   TIMESTAMP NOT NULL,
  period_end     TIMESTAMP NOT NULL,
  created_at     TIMESTAMP NOT NULL DEFAULT now()
);
CREATE INDEX idx_consumption_premise_utility ON consumption_readings(premise_id, utility_type);
CREATE INDEX idx_consumption_period ON consumption_readings(period_type);
```

#### bills
```sql
CREATE TABLE bills (
  id           UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  premise_id   UUID NOT NULL REFERENCES premises(id) ON DELETE CASCADE,
  bill_month   TIMESTAMP NOT NULL,
  total_amount DECIMAL(10,2) NOT NULL,
  status       VARCHAR NOT NULL DEFAULT 'unpaid',
  due_date     TIMESTAMP,
  pdf_url      VARCHAR,
  created_at   TIMESTAMP NOT NULL DEFAULT now(),
  updated_at   TIMESTAMP NOT NULL DEFAULT now()
);
CREATE INDEX idx_bills_premise ON bills(premise_id);
CREATE INDEX idx_bills_month ON bills(bill_month);
```

#### bill_line_items
```sql
CREATE TABLE bill_line_items (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  bill_id     UUID NOT NULL REFERENCES bills(id) ON DELETE CASCADE,
  category    VARCHAR NOT NULL,
  label       VARCHAR NOT NULL,
  amount      DECIMAL(10,2) NOT NULL,
  detail      VARCHAR,
  percentage  DECIMAL(5,2),
  sort_order  INTEGER NOT NULL DEFAULT 0
);
CREATE INDEX idx_line_items_bill ON bill_line_items(bill_id);
```

#### transactions
```sql
CREATE TABLE transactions (
  id               UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  premise_id       UUID NOT NULL REFERENCES premises(id),
  bill_id          UUID REFERENCES bills(id),
  type             VARCHAR NOT NULL,
  payment_method   VARCHAR,
  amount           DECIMAL(10,2) NOT NULL,
  label            VARCHAR NOT NULL,
  status           VARCHAR NOT NULL DEFAULT 'pending',
  transaction_date TIMESTAMP NOT NULL,
  created_at       TIMESTAMP NOT NULL DEFAULT now()
);
CREATE INDEX idx_transactions_premise ON transactions(premise_id);
CREATE INDEX idx_transactions_date ON transactions(transaction_date);
```

#### appliances
```sql
CREATE TABLE appliances (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  premise_id  UUID NOT NULL REFERENCES premises(id) ON DELETE CASCADE,
  name        VARCHAR NOT NULL,
  emoji       VARCHAR,
  kwh_per_day DECIMAL(6,2) NOT NULL,
  color       VARCHAR,
  glow_color  VARCHAR,
  sort_order  INTEGER NOT NULL DEFAULT 0
);
CREATE INDEX idx_appliances_premise ON appliances(premise_id);
```

#### green_goals
```sql
CREATE TABLE green_goals (
  id                    UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  premise_id            UUID NOT NULL REFERENCES premises(id),
  utility_type          VARCHAR NOT NULL,
  target_reduction_pct  DECIMAL(5,2) NOT NULL,
  baseline_year         INTEGER NOT NULL,
  target_year           INTEGER NOT NULL,
  current_reduction_pct DECIMAL(5,2),
  status                VARCHAR NOT NULL DEFAULT 'on_track',
  created_at            TIMESTAMP NOT NULL DEFAULT now(),
  updated_at            TIMESTAMP NOT NULL DEFAULT now()
);
```

#### greenup_profiles
```sql
CREATE TABLE greenup_profiles (
  id             UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id        UUID NOT NULL UNIQUE REFERENCES users(id),
  level_name     VARCHAR NOT NULL DEFAULT 'Seed',
  level_number   INTEGER NOT NULL DEFAULT 1,
  xp_current     INTEGER NOT NULL DEFAULT 0,
  xp_required    INTEGER NOT NULL DEFAULT 1000,
  streak_days    INTEGER NOT NULL DEFAULT 0,
  kwh_saved      DECIMAL(10,2) NOT NULL DEFAULT 0,
  district_rank  INTEGER NOT NULL DEFAULT 0,
  cycle_end_date TIMESTAMP,
  created_at     TIMESTAMP NOT NULL DEFAULT now(),
  updated_at     TIMESTAMP NOT NULL DEFAULT now()
);
```

#### challenges
```sql
CREATE TABLE challenges (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title       VARCHAR NOT NULL,
  description VARCHAR,
  xp_reward   INTEGER NOT NULL,
  difficulty  INTEGER NOT NULL DEFAULT 1,
  category    VARCHAR NOT NULL DEFAULT 'active',
  days_left   INTEGER,
  total_steps INTEGER NOT NULL DEFAULT 1,
  created_at  TIMESTAMP NOT NULL DEFAULT now()
);
```

#### user_challenges
```sql
CREATE TABLE user_challenges (
  id           UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id      UUID NOT NULL REFERENCES users(id),
  challenge_id UUID NOT NULL REFERENCES challenges(id),
  progress     INTEGER NOT NULL DEFAULT 0,
  completed    BOOLEAN NOT NULL DEFAULT false,
  completed_at TIMESTAMP,
  UNIQUE(user_id, challenge_id)
);
```

#### rewards
```sql
CREATE TABLE rewards (
  id             UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title          VARCHAR NOT NULL,
  merchant       VARCHAR NOT NULL,
  color          VARCHAR,
  icon_type      VARCHAR,
  required_level VARCHAR,
  is_locked      BOOLEAN NOT NULL DEFAULT false,
  created_at     TIMESTAMP NOT NULL DEFAULT now()
);
```

#### user_rewards
```sql
CREATE TABLE user_rewards (
  id         UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id    UUID NOT NULL REFERENCES users(id),
  reward_id  UUID NOT NULL REFERENCES rewards(id),
  status     VARCHAR NOT NULL DEFAULT 'available',
  claimed_at TIMESTAMP,
  UNIQUE(user_id, reward_id)
);
```

#### ev_stations
```sql
CREATE TABLE ev_stations (
  id            UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name          VARCHAR NOT NULL,
  address       VARCHAR NOT NULL,
  latitude      DECIMAL(10,8),
  longitude     DECIMAL(11,8),
  available     INTEGER NOT NULL DEFAULT 0,
  total         INTEGER NOT NULL,
  charger_types TEXT[] NOT NULL,
  created_at    TIMESTAMP NOT NULL DEFAULT now(),
  updated_at    TIMESTAMP NOT NULL DEFAULT now()
);
```

#### applications
```sql
CREATE TABLE applications (
  id                   UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id              UUID NOT NULL REFERENCES users(id),
  premise_id           UUID REFERENCES premises(id),
  type                 VARCHAR NOT NULL,
  status               VARCHAR NOT NULL DEFAULT 'applied',
  form_data            JSONB,
  submitted_at         TIMESTAMP NOT NULL DEFAULT now(),
  estimated_completion TIMESTAMP,
  updated_at           TIMESTAMP NOT NULL DEFAULT now()
);
CREATE INDEX idx_applications_user ON applications(user_id);
```

#### notifications
```sql
CREATE TABLE notifications (
  id         UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id    UUID NOT NULL REFERENCES users(id),
  title      VARCHAR NOT NULL,
  body       VARCHAR,
  type       VARCHAR,
  is_read    BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMP NOT NULL DEFAULT now()
);
CREATE INDEX idx_notifications_user ON notifications(user_id);
CREATE INDEX idx_notifications_user_read ON notifications(user_id, is_read);
```

#### giro_accounts
```sql
CREATE TABLE giro_accounts (
  id           UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id      UUID NOT NULL REFERENCES users(id),
  premise_id   UUID NOT NULL REFERENCES premises(id),
  bank_name    VARCHAR NOT NULL,
  account_mask VARCHAR NOT NULL,
  is_active    BOOLEAN NOT NULL DEFAULT true,
  created_at   TIMESTAMP NOT NULL DEFAULT now()
);
```

#### leaderboard_entries
```sql
CREATE TABLE leaderboard_entries (
  id       UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  rank     INTEGER NOT NULL,
  name     VARCHAR NOT NULL,
  points   INTEGER NOT NULL,
  level    VARCHAR NOT NULL,
  district VARCHAR,
  week_of  TIMESTAMP NOT NULL
);
CREATE INDEX idx_leaderboard_week ON leaderboard_entries(week_of);
```

---

## 3. TypeScript Interfaces

All type definitions are in `src/lib/types/` and re-exported from `src/lib/types/index.ts`.

### Core Types

```typescript
// user.types.ts
interface User {
  id: string;
  fullName: string;
  email: string;
  phone: string;
  avatarInitials: string;
  rewardPoints: number;
  darkMode: boolean;
  notificationsEnabled: boolean;
  createdAt: string;
  updatedAt: string;
}

interface UserPreferences {
  darkMode: boolean;
  notificationsEnabled: boolean;
  language: string;
  communicationChannels: string[];
}

// premise.types.ts
interface Premise {
  id: string;
  addressLine1: string;
  addressLine2: string;
  postalCode: string;
  district: string;
  propertyType: 'HDB' | 'Condo' | 'Landed' | 'Commercial';
  hasElectricity: boolean;
  hasWater: boolean;
  hasGas: boolean;
}

interface PremiseMember {
  id: string;
  premiseId: string;
  userId: string;
  role: 'owner' | 'member';
  initials: string;
  joinedAt: string;
}

// consumption.types.ts
type UtilityType = 'electricity' | 'water' | 'gas';
type PeriodType = 'today' | 'week' | 'month' | 'year';

interface ConsumptionReading {
  id: string;
  premiseId: string;
  utilityType: UtilityType;
  readingValue: number;
  periodType: PeriodType;
  periodStart: string;
  periodEnd: string;
}

interface ConsumptionData {
  utilityType: UtilityType;
  period: PeriodType;
  unit: string;
  data: ConsumptionDataPoint[];
  lastUpdated: string;
}

interface ConsumptionDataPoint {
  label: string;
  value: number;
}

// bill.types.ts
interface Bill {
  id: string;
  premiseId: string;
  billMonth: string;
  totalAmount: number;
  status: 'unpaid' | 'paid' | 'overdue';
  dueDate: string;
  pdfUrl?: string;
}

interface BillLineItem {
  id: string;
  billId: string;
  category: 'electricity' | 'water' | 'gas' | 'gst';
  label: string;
  amount: number;
  detail: string;
  percentage: number;
  sortOrder: number;
}

interface BillDetail extends Bill {
  lineItems: BillLineItem[];
  previousTotal: number;
  savings: number;
  comparison: BillComparison[];
  insights: BillInsight[];
  dailyUsage: DailyUsage[];
}

interface BillComparison {
  label: string;
  previous: number;
  current: number;
  changePercent: number;
  color: string;
}

interface BillInsight {
  icon: string;
  text: string;
  borderColor: string;
}

interface DailyUsage {
  day: number;
  kWh: number;
}

// transaction.types.ts
interface Transaction {
  id: string;
  premiseId: string;
  billId?: string;
  type: 'bill' | 'payment';
  paymentMethod?: 'giro' | 'paynow' | 'card';
  amount: number;
  label: string;
  status: 'pending' | 'success' | 'failed';
  transactionDate: string;
  slug?: string;
}

// appliance.types.ts
interface Appliance {
  id: string;
  premiseId: string;
  name: string;
  emoji: string;
  kwhPerDay: number;
  color: string;
  glowColor: string;
  sortOrder: number;
}

// green.types.ts
interface GreenGoal {
  id: string;
  premiseId: string;
  utilityType: 'electricity' | 'water';
  targetReductionPct: number;
  baselineYear: number;
  targetYear: number;
  currentReductionPct: number;
  status: 'on_track' | 'off_track';
}

interface GreenupProfile {
  id: string;
  userId: string;
  levelName: string;
  levelNumber: number;
  xpCurrent: number;
  xpRequired: number;
  streakDays: number;
  kwhSaved: number;
  districtRank: number;
  cycleEndDate: string;
}

interface Challenge {
  id: string;
  title: string;
  description: string;
  xpReward: number;
  difficulty: number;
  category: 'limited_time' | 'active';
  daysLeft?: number;
  totalSteps: number;
}

interface UserChallenge {
  id: string;
  userId: string;
  challengeId: string;
  progress: number;
  completed: boolean;
  completedAt?: string;
  challenge: Challenge;
}

// reward.types.ts
interface Reward {
  id: string;
  title: string;
  merchant: string;
  color: string;
  iconType: string;
  requiredLevel?: string;
  isLocked: boolean;
}

interface UserReward {
  id: string;
  userId: string;
  rewardId: string;
  status: 'available' | 'claimed' | 'expired';
  claimedAt?: string;
  reward: Reward;
}

// ev.types.ts
interface EVStation {
  id: string;
  name: string;
  address: string;
  latitude: number;
  longitude: number;
  available: number;
  total: number;
  chargerTypes: string[];
  distance: number;
}

// application.types.ts
interface Application {
  id: string;
  userId: string;
  premiseId?: string;
  type: 'moving' | 'open' | 'close';
  status: 'applied' | 'reviewing' | 'approved' | 'active';
  formData: Record<string, unknown>;
  submittedAt: string;
  estimatedCompletion: string;
}

interface MovingFormData {
  currentAddress: string;
  lastDay: string;
  newAddress: string;
  propertyType: string;
  moveInDate: string;
  sameUtilities: boolean;
  transferGiro: boolean;
}

// notification.types.ts
interface Notification {
  id: string;
  userId: string;
  title: string;
  body: string;
  type: 'maintenance' | 'scam_alert' | 'billing' | 'general';
  isRead: boolean;
  createdAt: string;
}

// giro.types.ts
interface GiroAccount {
  id: string;
  userId: string;
  premiseId: string;
  bankName: string;
  accountMask: string;
  isActive: boolean;
}

// simulator.types.ts
interface SimulatorInput {
  acTemp: number;
  acHours: number;
  showers: number;
  laundryLoads: number;
  lightsWasted: number;
  entertainment: number;
}

interface SimulatorResult {
  predictedTotal: number;
  breakdown: {
    baseElectricity: number;
    acCost: number;
    waterCost: number;
    laundryCost: number;
    lightsCost: number;
    entertainmentCost: number;
    gst: number;
  };
  comparedToCurrent: number;
  savingsPerYear: number;
}

interface SimulatorPreset {
  id: string;
  name: string;
  emoji: string;
  values: SimulatorInput;
}

// leaderboard.types.ts
interface LeaderboardEntry {
  rank: number;
  name: string;
  points: number;
  level: string;
  isCurrentUser: boolean;
}
```

---

## 4. Environment Variables

### Development

```env
DATABASE_URL=postgresql://spapp:spapp_dev@localhost:5432/spapp
NODE_ENV=development
```

### Production

```env
DATABASE_URL=postgresql://<username>:<password>@<rds-endpoint>:5432/spapp
NODE_ENV=production
NEXT_TELEMETRY_DISABLED=1
PORT=3000
```

The `DATABASE_URL` in production is constructed from AWS Secrets Manager values and injected into the ECS task definition.

---

## 5. Docker Configuration

### Dockerfile (Multi-Stage Build)

**Stage 1: deps** (node:22-alpine)
- Copies `package*.json`
- Runs `npm ci` for reproducible installs

**Stage 2: builder** (node:22-alpine)
- Copies `node_modules` from deps stage
- Copies all source files
- Runs `npx prisma generate` to generate the Prisma client
- Runs `npm run build` (Next.js build with standalone output)

**Stage 3: runner** (node:22-alpine)
- Sets `NODE_ENV=production`, `NEXT_TELEMETRY_DISABLED=1`, `PORT=3000`
- Creates non-root user `nextjs` (UID 1001) in group `nodejs` (GID 1001)
- Copies from builder:
  - `public/` directory
  - `.next/standalone/` (the standalone server)
  - `.next/static/` (static assets)
  - `node_modules/.prisma/` (generated Prisma client)
  - `node_modules/@prisma/` (Prisma engine binaries)
- Runs as user `nextjs`
- Exposes port 3000
- Entry point: `node server.js`

### docker-compose.yml

Two services:

**db** (postgres:16-alpine):
- Credentials: spapp / spapp_dev
- Database: spapp
- Port: 5432
- Volume: pgdata for persistent storage
- Health check: `pg_isready` every 10s

**app** (built from Dockerfile):
- Port: 3000
- DATABASE_URL pointing to the db service
- Depends on db with health check condition

---

## 6. Deployment Runbook

### Prerequisites

- AWS CLI configured with appropriate credentials
- Node.js 22+ and npm installed
- Docker installed
- AWS CDK CLI installed (`npm install -g aws-cdk`)

### Step-by-Step Deployment

1. **Install CDK dependencies**:
   ```bash
   cd infra/cdk
   npm install
   ```

2. **Bootstrap CDK** (first time only):
   ```bash
   cdk bootstrap aws://ACCOUNT_ID/us-east-1
   ```

3. **Deploy infrastructure**:
   ```bash
   cdk deploy SpAppStack
   ```
   This creates: VPC, ECS cluster, RDS instance, ALB, ECR repository, S3 bucket, security groups, and secrets.

4. **Note the outputs**:
   - `AlbDnsName` -- The load balancer URL
   - `EcrRepositoryUri` -- Where to push Docker images
   - `RdsEndpoint` -- Database endpoint
   - `AssetsBucketName` -- S3 bucket name

5. **Build and push Docker image**:
   ```bash
   # Authenticate Docker to ECR
   aws ecr get-login-password --region us-east-1 | docker login --username AWS --password-stdin ACCOUNT_ID.dkr.ecr.us-east-1.amazonaws.com

   # Build the image
   docker build -t sp-app .

   # Tag the image
   docker tag sp-app:latest ACCOUNT_ID.dkr.ecr.us-east-1.amazonaws.com/sp-app:latest

   # Push the image
   docker push ACCOUNT_ID.dkr.ecr.us-east-1.amazonaws.com/sp-app:latest
   ```

6. **Run database migrations**:
   ```bash
   # Connect to the RDS instance via a bastion or ECS exec
   npx prisma migrate deploy
   ```

7. **Seed the database**:
   ```bash
   npx prisma db seed
   ```

8. **Force ECS service update** (if the image tag is `latest`):
   ```bash
   aws ecs update-service --cluster sp-app-cluster --service sp-app-service --force-new-deployment
   ```

9. **Verify deployment**:
   ```bash
   curl http://<AlbDnsName>/api/health
   # Expected: {"success":true,"data":{"status":"ok","timestamp":"...","version":"1.0.0"}}
   ```

### Local Development

```bash
# Start the database
docker compose up db -d

# Install dependencies
npm install

# Generate Prisma client
npx prisma generate

# Run migrations
npx prisma migrate dev

# Seed the database
npx prisma db seed

# Start the development server
npm run dev
```

---

## 7. Seed Data

The application seeds the following entities for development and demonstration:

### User
- Full name: MAGA MATTEO LUCA
- Email: matteolmaga@gmail.com
- Phone: +65 8972 7679
- Avatar initials: MM
- Reward points: 50

### Premise
- Address: 18 Everton Rd, Singapore 089374
- District: D2
- Property type: HDB
- Utilities: Electricity, Water, Gas all enabled

### Premise Members
- Owner: the demo user (MM)
- Additional members: AL, JT, KW, SL

### Consumption Readings
- Electricity and water readings for four period types (today, week, month, year)
- Today: hourly readings (7 data points)
- Week: daily readings (7 data points)
- Month: weekly readings (5 data points)
- Year: monthly readings (12 data points, partially populated)

### Bills
- January 2026: $163.09
- February 2026: $177.55
- March 2026: $154.08

Each bill has 4 line items: electricity, water, gas, and GST.

### Transactions
- Bill records and corresponding payment records for each month
- Payment method: GIRO (recurring)

### Appliances
- Air Conditioning: 8.5 kWh/day
- Lighting: 2.1 kWh/day
- Refrigerator: 3.2 kWh/day
- Water Heater: 4.8 kWh/day
- Electronics: 1.4 kWh/day

### Green Goals
- Electricity: 15% reduction target from 2018, currently on track
- Water: 18% reduction target from 2018, currently off track

### GreenUP Profile
- Level: Seed (Level 1)
- XP: 851 / 1000
- Streak: 3 days
- kWh Saved: 37.95
- District Rank: #142
- Cycle end: March 31, 2026

### Challenges
- Limited time: 2 challenges (food waste, waste-less lifestyle)
- Active: 2 challenges (link account -- completed, fan savings -- in progress)

### Rewards
- Claimable: 2 (restaurant voucher, coffee deal)
- Locked: 6 (various merchants, requiring Seedling, Sprout, or Bloom levels)

### EV Stations
- 6 stations in the D2 area with varying charger types and availability

### Leaderboard
- Top 5 entries with masked names
- User's entry at rank #142

### Notifications
- Scheduled maintenance notice
- Scam alert

### GIRO Account
- Bank: DBS, mask: ****1234, active

### Application
- Type: Utilities Opening
- Status: Reviewing
- Premise: 18 Everton Rd
- Submitted: March 15, 2026
- Estimated completion: March 20, 2026

---

## 8. Error Handling

### API Error Response Format

All errors follow the envelope pattern:

```json
{
  "success": false,
  "error": "Human-readable error message"
}
```

### HTTP Status Codes

| Status | Usage |
|--------|-------|
| 200 | Successful GET/PUT requests |
| 400 | Bad request (missing or invalid parameters) |
| 404 | Resource not found |
| 500 | Internal server error (catch-all) |

### Error Handling Pattern

Route handlers use try/catch blocks. Known error conditions (e.g., "Bill not found") are matched by error message and mapped to specific status codes. Unknown errors default to 500.

```typescript
try {
  const result = await Service.method(params);
  return successResponse(result);
} catch (error) {
  if (error instanceof Error && error.message === 'Resource not found') {
    return notFoundResponse('Resource');
  }
  return errorResponse('Failed to perform action');
}
```

### Client-Side Error Handling

The frontend pages currently use static/hardcoded data and do not make API calls in the initial implementation. When API integration is added, the following patterns should be used:
- Loading states with shimmer animations
- Error boundaries for component-level failures
- Toast notifications for action failures
- Retry logic for transient network errors

---

## 9. Performance Considerations

### Build Optimization

- **Standalone output**: `next.config.ts` sets `output: 'standalone'` which produces a minimal Node.js server without `node_modules`, reducing container image size significantly.
- **Image optimization**: Configured for AVIF and WebP formats with remote patterns for S3 assets.

### Frontend Performance

- **Client components**: All pages use `"use client"` directive, rendering entirely on the client. This simplifies the initial architecture but means no server-side rendering benefits.
- **Animation performance**: CSS animations use `transform` and `opacity` properties that trigger compositor-only changes (no layout/paint).
- **Canvas rendering**: The Energy Flow page uses `requestAnimationFrame` with delta-time limiting (max 50ms frame) to maintain consistent animation speed.
- **Scroll performance**: Custom scrollbar is hidden (`width: 0, display: none`) and `scrollbar-width: none` is set on carousels to prevent layout shifts.

### Database Performance

- **Indexes**: Strategic indexes on foreign keys and frequently queried columns (see schema section).
- **Composite indexes**: `consumption_readings(premise_id, utility_type)` and `notifications(user_id, is_read)` optimize the most common query patterns.
- **Cascade deletes**: Most child tables use `ON DELETE CASCADE` to prevent orphaned records.

### Container Performance

- **Alpine base**: All Docker stages use Alpine Linux for minimal image size.
- **Multi-stage build**: Only production artifacts are copied to the final stage.
- **Non-root user**: Running as a non-root user is a security practice that also prevents accidental file permission issues.
- **Health check startup period**: 60-second grace period allows the container to fully initialize before health checks begin failing.

---

## 10. Mobile App Technical Specifications

### Project Setup

The mobile app was bootstrapped with `npx create-expo-app` using the `blank-typescript` template. It uses Expo SDK 54 with React Native 0.79 and the managed workflow, meaning no native code ejection is required for building or development.

### npm Dependencies

Key dependencies installed in the mobile project:

| Package | Purpose |
|---------|---------|
| `expo` (~54.x) | Core Expo SDK and managed workflow |
| `react-native` (0.79.x) | Cross-platform native UI framework |
| `@react-navigation/native` | Navigation container and core |
| `@react-navigation/bottom-tabs` | Bottom tab navigator |
| `@react-navigation/native-stack` | Native stack navigator |
| `expo-linear-gradient` | Gradient backgrounds |
| `expo-blur` | Native blur for glassmorphism on iOS |
| `expo-haptics` | Haptic feedback |
| `@expo/vector-icons` | Ionicons icon set |
| `react-native-safe-area-context` | Safe area insets |
| `react-native-screens` | Native screen containers |
| `typescript` (~5.x) | Type safety |

### Shared Code Strategy

TypeScript type definitions, seed data, constants, and API client logic are shared between the web (`sp-app`) and mobile (`sp-app-mobile`) projects. In the current setup, these files are copied from the web project into the mobile project's `src/lib/` directory. The 15 shared type files are:

```
user.types.ts         premise.types.ts      consumption.types.ts
bill.types.ts         transaction.types.ts   appliance.types.ts
green.types.ts        reward.types.ts        ev.types.ts
application.types.ts  notification.types.ts  giro.types.ts
simulator.types.ts    leaderboard.types.ts   index.ts
```

Additional shared files: `seed-data.ts`, `constants.ts`, `api.ts`.

For production, migrating to a monorepo (Turborepo or Nx) with a shared `packages/types` workspace is recommended to eliminate duplication and keep types in sync automatically.

### Screen Components

| Screen | File Path | Description |
|--------|-----------|-------------|
| Home | `src/screens/HomeScreen.tsx` | Dashboard with consumption chart, quick actions, alerts |
| Bills | `src/screens/BillsScreen.tsx` | Bills list, outstanding amount, transaction timeline |
| Bill Detail | `src/screens/BillDetailScreen.tsx` | Interactive donut chart, waterfall cards, AI insights |
| GreenUP | `src/screens/GreenUpScreen.tsx` | RPG gamification: XP bar, rewards, quests, leaderboard |
| EV Charging | `src/screens/EVChargingScreen.tsx` | Station finder with charger type badges |
| Profile | `src/screens/ProfileScreen.tsx` | Account info, premises, dark mode settings |
| Simulator | `src/screens/SimulatorScreen.tsx` | Bill prediction with custom touch-based sliders |
| Energy Flow | `src/screens/EnergyFlowScreen.tsx` | Animated particle energy visualization |
| Utilities | `src/screens/UtilitiesScreen.tsx` | Self-service portal with quick actions |
| Moving | `src/screens/MovingScreen.tsx` | 4-step moving house wizard |

### Custom Components

| Component | File Path | Description |
|-----------|-----------|-------------|
| GlassCard | `src/components/GlassCard.tsx` | Glassmorphism card using `expo-blur` (`BlurView`) on iOS for native backdrop blur; falls back to semi-transparent `rgba` backgrounds on Android |
| GradientBackground | `src/components/GradientBackground.tsx` | Reusable gradient wrapper built on `expo-linear-gradient` for consistent page backgrounds |
| SPBuddy | `src/components/SPBuddy.tsx` | Floating chatbot button and animated modal chat panel using `Animated.timing` for slide-up/slide-down transitions |

### ThemeContext

Dark mode is managed via a `ThemeContext` React context provider that wraps the entire application. It exposes:

- `isDark` (boolean): Current theme state
- `toggleDark` (function): Toggles between light and dark mode
- Light palette: white backgrounds, dark text, teal accents
- Dark palette: dark gray backgrounds (#1a1a2e, #16213e), light text, teal accents

All screens and components consume `useContext(ThemeContext)` to apply the appropriate colors.

### Navigation Structure

Navigation is managed by React Navigation 7.x with a combination of bottom tabs and native stack:

```
TabNavigator (Bottom Tabs - 5 tabs)
  |-- Home Tab        -> HomeScreen
  |-- Bills Tab       -> BillsScreen
  |-- GreenUP Tab     -> GreenUpScreen
  |-- EV Charging Tab -> EVChargingScreen
  |-- Profile Tab     -> ProfileScreen

Stack Navigator (pushed on top of tabs)
  |-- BillDetailScreen   (from Bills tab)
  |-- SimulatorScreen    (from Home tab)
  |-- EnergyFlowScreen   (from Home tab)
  |-- UtilitiesScreen    (from Home tab)
  |-- MovingScreen       (from Utilities screen)
```

The `TabNavigator.tsx` file defines both the tab navigator and the wrapping native stack navigator. Stack screens slide in from the right with the default native transition.

### API Client

The API base URL is configured in `src/lib/api.ts` and switches based on the build environment:

```
__DEV__ === true  -> http://localhost:3000    (development)
__DEV__ === false -> http://sp-app-alb-*.elb.amazonaws.com  (production ALB)
```

The `__DEV__` flag is automatically set by React Native based on whether the app is running in development mode or as a production build. For production, this should be updated to point to the HTTPS domain once SSL is configured on the ALB.

### Animation Approach

All animations use React Native's built-in `Animated` API (not Reanimated) for maximum compatibility with the Expo managed workflow:

- **Animated.timing**: Fade-ins, slide-ins, progress bars with easing functions
- **Animated.spring**: Bounce effects on badges and buttons
- **Animated.stagger**: Sequenced card entry animations
- **Animated.loop**: Continuous animations (shimmer effects, particle flow)

The Energy Flow screen uses `Animated.loop` with interpolated `translateX` and `translateY` values to animate particles along paths from the power grid to the house and from the house to individual appliances.

### Bar Charts

Consumption bar charts on the Home and Bill Detail screens are implemented using plain `View` components with percentage-based heights rather than an external chart library. This avoids heavy dependencies and gives full control over styling and animation.

### Build Commands

**Development**:
```bash
# Start Expo development server (LAN mode for device testing)
npx expo start --lan

# Open on iOS Simulator
npx expo start --ios

# Open on Android Emulator
npx expo start --android
```

**Production builds** (using Expo Application Services):
```bash
# Build for iOS (generates .ipa)
eas build --platform ios

# Build for Android (generates .apk or .aab)
eas build --platform android

# Build for both platforms
eas build --platform all
```

### Deployment

**Testing**: Use Expo Go for rapid development testing on physical devices. Connect via `exp://[IP]:8081` on the same WiFi network.

**iOS Production**: Build with `eas build --platform ios`, then distribute via TestFlight for beta testing and the App Store for public release. Submit using `eas submit --platform ios`. Requires an Apple Developer account.

**Android Production**: Build with `eas build --platform android`, then distribute via Play Console for internal testing and the Play Store for public release. Submit using `eas submit --platform android`. Requires a Google Play Developer account.

**Over-the-air updates**: Expo supports OTA updates via `eas update`, allowing JavaScript bundle updates to be pushed to users without going through app store review cycles.
