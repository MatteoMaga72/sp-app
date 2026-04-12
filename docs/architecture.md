---
stepsCompleted: ["step-01-init", "step-02-context", "step-03-starter", "step-04-decisions", "step-05-patterns", "step-06-structure", "step-07-validation", "step-08-complete"]
inputDocuments:
  - "docs/prd.md"
  - "docs/technical-architecture.md"
  - "docs/technical-specs.md"
  - "docs/security-assessment.md"
  - "docs/epics-and-stories.md"
workflowType: 'architecture'
project_name: 'SP Digital Experience Platform'
user_name: 'Matteo Maga'
date: '2026-04-11'
---

# Architecture Decision Document

_This document builds collaboratively through step-by-step discovery. Sections are appended as we work through each architectural decision together._

## Project Context Analysis

### Requirements Overview

**Functional Requirements:** 46 FRs across 9 categories — the heaviest concentration in bill understanding/payment (10 FRs) and AI assistant (7 FRs), both directly tied to the P0 call deflection objective. Self-service operations (7 FRs) are the second-highest call deflection driver.

**Non-Functional Requirements:** 25 NFRs with the most architecturally significant being: 99.9% uptime (NFR-R1), 50K concurrent sessions at peak (NFR-P5), sub-200ms API p95 (NFR-P2), 100% business logic test coverage (NFR-T1), and zero critical security vulnerabilities (NFR-S3).

**External Integrations:** 8 systems — SAP IS-U (billing, very high complexity), AMI head-end (metering, high), CRM (medium), payment gateways (high), Singpass/MyInfo (high), EMA demand response (medium), SP Charging Network (medium), Anthropic Claude API (low).

**Scale & Complexity:** Enterprise-grade. 1.4M households, regulated utility, government authentication, financial transactions, real-time metering data, AI orchestration. This is not a startup app — architectural decisions have 5-year consequences under a managed service SLA.

### Critical Architecture Gaps (from Party Mode Review)

| Gap | Description | Risk if Unaddressed |
|-----|-------------|-------------------|
| **Monolithic compute** | API + frontend + async work in a single 512 CPU Fargate task | Billing cycle peaks crash the entire platform |
| **Database undersized** | t3.micro, single-AZ, no pooling, no replicas, no partitioning | 99.9% uptime impossible; meter data fills storage in months |
| **No integration abstraction** | Service layer talks directly to stubs with no formal contracts | Swapping stubs for real APIs breaks everything |
| **AI orchestration missing** | Zero code for Claude integration, no fallback, no token budgets | SPBuddy demo works; production SPBuddy crashes |
| **Deployment theater** | force-new-deployment claimed as blue-green; no canary, no rollback | Bad deploy = manual recovery at 2 AM |
| **Observability gap** | CloudWatch logs only, 2-week retention, no alarms, no tracing | Can't diagnose issues, can't prove SLA compliance |
| **Security holes** | HTTP-only ALB, no WAF, S3 CORS allows *, no HTTPS | Fails SP Group security review on day one |

### Cross-Cutting Concerns

- **Authentication:** Singpass/MyInfo for production, JWT with email/OTP fallback for demo — must be abstracted at middleware level
- **Data Anonymisation:** PDPA requires PII protection; Claude API integration requires anonymisation; audit logging requires redaction — needs a centralized anonymisation service
- **Caching:** Consumption data (30-min intervals), bill data (monthly), EV station availability (real-time) — three different cache strategies needed
- **Error Handling:** Graceful degradation is an NFR (NFR-R5) — every component must define its fallback behaviour
- **Audit Logging:** PDPA compliance requires complete access trails — architectural decision on where and how to log

## Technology Stack (Established)

### Frontend
| Technology | Version | Purpose |
|-----------|---------|---------|
| Next.js | 16.1.7 | App Router, server/client components, SSR |
| React | 19.2.3 | UI framework with client components |
| TypeScript | 5.x | Type safety across entire codebase |
| Tailwind CSS | 4.x | Utility-first styling with custom design tokens |
| Recharts | 3.8.x | Data visualization (bar, pie, area charts) |
| Lucide React | 0.577.x | Icon library |

### Backend
| Technology | Version | Purpose |
|-----------|---------|---------|
| Next.js API Routes | 16.x | REST API layer (service-repository pattern) |
| Prisma ORM | 7.5.x | Database access, migrations, type-safe queries |
| PostgreSQL | 16 | Primary database |

### AI Layer
| Technology | Purpose |
|-----------|---------|
| Anthropic Claude API (Sonnet/Haiku) | SPBuddy agentic intelligence — tool use, RAG, conversational Q&A |
| Amazon Bedrock | Claude hosting for AWS Connect integration |
| Amazon Lex V2 | Speech-to-text / text-to-speech for Connect IVR |
| Amazon Polly | Voice synthesis for IVR responses |

### Contact Center
| Technology | Purpose |
|-----------|---------|
| AWS Connect | Cloud contact center — IVR, routing, agent desktop |
| Salesforce Service Cloud | CRM, case management, customer 360, agent workspace |
| Amazon Lex V2 | Chatbot deployed in Connect, powered by SPBuddy brain |

### Infrastructure (AWS)
| Technology | Purpose |
|-----------|---------|
| ECS Fargate | Container compute (API + frontend) with auto-scaling |
| RDS PostgreSQL | Managed database (Multi-AZ for production) |
| CloudFront | CDN for static assets and API caching |
| S3 | Bill PDFs, user uploads, digital assets |
| Secrets Manager | Database credentials, API keys |
| WAF | Web application firewall |
| X-Ray | Distributed tracing |
| CloudWatch | Logs, metrics, alarms, dashboards |
| CDK (TypeScript) | Infrastructure-as-code |
| SQS | Async job queues (meter data processing, notification dispatch) |
| EventBridge | Event routing for integration triggers |

### CI/CD
| Technology | Purpose |
|-----------|---------|
| GitHub Actions | Pipeline orchestration |
| ESLint + TypeScript | Code quality gates |
| Vitest | Unit testing (100% business logic coverage) |
| Playwright | E2E testing |
| Lighthouse CI | Performance budget enforcement |

### No Technology Changes Planned
The stack is production-capable. Architecture decisions focus on topology, scaling, and operational maturity — not technology replacement.

## Core Architectural Decisions

### Decision 1: Compute Architecture — Service Separation

**Decision:** Split the monolith into 4 ECS Fargate services.

| Service | Responsibility | Scaling Policy | Min/Max Tasks |
|---------|---------------|---------------|---------------|
| **Frontend** | Next.js SSR + static serving | Request count | 1-4 |
| **API** | REST endpoints, business logic | CPU target 70% | 2-8 |
| **Worker** | Async jobs: meter ingestion, SAP sync, notification dispatch, report generation | SQS queue depth | 1-4 |
| **AI** | SPBuddy orchestration: prompt construction, Claude/Bedrock calls, tool execution, response caching | Concurrent requests | 1-4 |

**Rationale:** SAP batch sync must not crash API latency. Claude API latency (2-5s) must not affect bill loading (target <200ms). Billing cycle peaks need independent API scaling.

**Communication between services:**
- Frontend → API: HTTP (via internal ALB)
- API → Worker: SQS queues (async, decoupled)
- API → AI: HTTP (synchronous for chat, async for batch insights)
- Worker → Database: Direct Prisma connection via pgBouncer
- All services → EventBridge: Event routing for cross-service triggers

### Decision 2: Database Architecture — Production Topology

**Decision:** Aurora PostgreSQL with read replica, pgBouncer, and time-based partitioning.

| Component | Specification | Purpose |
|-----------|--------------|---------|
| **Aurora PostgreSQL 16** | db.r6g.large (4 vCPU, 32GB) | Primary — writes, transactions |
| **Read Replica** | db.r6g.large, same region | Reads — consumption queries, dashboard, leaderboard, analytics |
| **pgBouncer** | Sidecar on each ECS task | Connection pooling — Prisma opens connection per query |
| **Table Partitioning** | `consumption_readings` by month | Meter data: ~2B rows/year, partition pruning for queries |
| **Backup** | 30-day retention, point-in-time recovery | Compliance + disaster recovery |
| **Region** | ap-southeast-1 (Singapore) | PDPA data residency |
| **Multi-AZ** | Automatic failover | 99.9% uptime SLA |

**Estimated cost:** ~$800/month (vs. $15 demo). This is the price of 99.9%.

**Query routing:** Prisma middleware routes read queries to replica, write queries to primary. Consumption and analytics queries always hit the replica.

### Decision 3: Integration Architecture — Ports & Adapters with Contract Testing

**Decision:** Every external system gets a Port interface, Stub Adapter, and Real Adapter. Contract tested with Pact.

**Pattern:**
```
Domain Service → Port (TypeScript interface)
                        |
                +-------+-------+
                |               |
          Stub Adapter    Real Adapter
          (seed data)    (SAP/AMI/CRM)
```

**Swapping:** Dependency injection at service construction time, driven by environment config. Not env var string matching — typed DI container.

**Integration Matrix (Updated with Party Mode feedback):**

| Port | Stub Adapter | Real Adapter | Contract Tests | Notes |
|------|-------------|-------------|----------------|-------|
| BillingPort | Seed data from DB | SAP IS-U BAPI/RFC via middleware | Pact | Includes reconciliation loop |
| MeteringPort | Generated half-hourly data | AMI MDM API | Pact | 780K inserts/hour at scale |
| CustomerPort | Prisma queries | Salesforce REST API | Pact | Shared with Connect CRM |
| PaymentPort | Always-succeed mock with delays | PayNow/GIRO/Card APIs | Pact | Idempotency keys mandatory |
| AuthPort | Mock JWT + Singpass flow | GovTech NDI API | Pact | Fallback to email/OTP |
| DemandResponsePort | Scheduled mock events | EMA REST API | Pact | Event-driven via EventBridge |
| ChargingPort | Static station data | SP Mobility API | Pact | Real-time availability |
| AIPort | Regex fallback + cached responses | Anthropic Claude API / Bedrock | Integration test | Token budgets enforced |
| ReconciliationPort | Noop (log only) | SAP GL reconciliation batch | Pact | Daily bill-to-ledger check |
| FieldOpsPort | Mock work-order creation | SP Field Ops work-order system | Pact | Meter dispute routing |
| NotificationPort | Console.log | SNS + SES + Push (FCM/APNs) | Integration test | Multi-channel dispatch |
| AuditPort | Write to DB table | Immutable audit log (S3 + Athena) | Integration test | PDPA compliance evidence |

**Agentic Transaction Pattern (from Amelia's feedback):**

Every write operation through a port follows this pattern:

```
1. Generate idempotency key
2. Persist action request to DB (status: PENDING)
3. Call external system via adapter
4. On success: update status to COMPLETED
5. On failure: update status to FAILED, trigger compensating transaction
6. On timeout: update status to TIMEOUT, schedule retry via Worker queue
```

**State machine for agentic actions:**
```
PENDING → EXTERNAL_PROCESSING → COMPLETED
                               → FAILED → COMPENSATING → ROLLED_BACK
                               → TIMEOUT → RETRY (max 3) → ESCALATE
```

All state transitions are logged to AuditPort with: request ID, user ID, tool name, parameters, adapter response, timestamp.

**Circuit Breakers:**
Every real adapter wraps calls in a circuit breaker (closed → open → half-open). When open, adapter returns cached data or graceful error. Breaker state visible in observability dashboard.

**Contract Testing Infrastructure:**
- Pact Broker deployed as a container in ECS
- Consumer tests run in CI on every PR (frontend/API defines expectations)
- Provider tests run against stub adapters AND real adapters (during integration phase)
- Contract changes require explicit version bump and approval

### Decision 4: AI Architecture — SPBuddy Agentic Platform

**Decision:** SPBuddy is a multi-channel agentic AI platform, not a chatbot.

**AI Service Internal Components:**

| Component | Responsibility | Technology |
|-----------|---------------|-----------|
| **Context Builder** | Fetch user premise, bills, consumption via internal API. Build grounded prompt with real data. | TypeScript, internal HTTP |
| **PII Anonymiser** | Strip names, addresses, phone numbers, NRIC before Claude calls. Replace with tokens. De-anonymise responses. | Regex + NER rules, TypeScript |
| **Model Router** | Simple queries → Haiku ($0.001/query). Complex analysis → Sonnet ($0.01/query). Fallback → regex matcher. | Configuration-driven routing |
| **Tool Executor** | Agentic actions via Claude tool use: initiate_giro, submit_refund, request_fee_waiver, schedule_appointment, submit_meter_reading, check_outage_status | Claude tool_use, routed through Ports |
| **Response Cache** | Cache anonymised prompt hash → response. TTL: 1hr for bill queries, 5min for live data. Target 40%+ hit rate. | ElastiCache Redis |
| **RAG Pipeline** | SP Group knowledge base: FAQs, tariff tables, meter guides, known issues (18 years). Top-5 chunk retrieval injected into prompt. | pgvector in Aurora PostgreSQL |
| **Token Budget Manager** | Max input: 4K tokens. Max output: 1K. Session: 20K. Monthly per user: 100K. | Enforced in orchestrator |
| **Confidence Scorer** | Score 0-100. Below 70: suggest agent escalation. Below 40: auto-escalate. | Heuristic + Claude self-assessment |

**Agentic Guardrails:**
- Financial actions require explicit user confirmation ("I'll set up GIRO with DBS — confirm?")
- Max 1 action per turn (no chaining without user approval)
- Idempotency key per action, persisted before external call
- Full audit trail via AuditPort (request ID, tool name, params, response, user, timestamp)
- Compensating transactions for failed actions (state machine: PENDING → COMPLETED/FAILED → ROLLED_BACK)

**AWS Connect Integration:**
- SPBuddy deployed as Amazon Bedrock Agent accessible via Lex V2
- Voice: Connect IVR → Lex (speech-to-text) → Bedrock Agent → Polly (text-to-speech)
- Chat: Same Bedrock Agent, text mode
- Agent Assist: On escalation, Salesforce agent desktop shows full conversation context + suggested response
- Call recordings: S3 with 90-day retention
- CDK: Lex V2 bot, Bedrock agent, Connect contact flows, Lambda orchestration, IAM roles

**Cost Estimate:** ~$2,000/month for 1.4M households at 10% MAU, 40% cache hit rate.

### Decision 5: Security Architecture — CII-Grade

**Decision:** Security posture designed for Critical Information Infrastructure (CII) compliance under Singapore's Cybersecurity Act, not just basic enterprise security.

**Network Security:**

| Layer | Decision | Specification |
|-------|---------|---------------|
| **DDoS** | AWS Shield Advanced + WAF | Managed DDoS protection with cost protection guarantee |
| **WAF** | AWS WAF with OWASP managed rules | Rate limiting (100 req/min/user), geo-blocking, SQL injection/XSS prevention |
| **TLS** | TLS 1.3 only, OV certificate | Organisation Validation cert via ACM (not DV/Let's Encrypt) |
| **CSP** | Strict, nonce-based | Zero `unsafe-inline`/`unsafe-eval`. All scripts nonce-tagged. |
| **Headers** | Full security header suite | Strip X-Powered-By, Via, X-Served-By. Add Permissions-Policy, Referrer-Policy, X-Content-Type-Options |
| **Network** | Micro-segmented VPC | PrivateLink for all AWS service access. Explicit security group rules per service pair. No broad allow rules. |

**Authentication & Authorisation:**

| Decision | Specification |
|---------|---------------|
| **Primary auth** | Singpass/MyInfo via GovTech NDI (production). AuthPort abstraction for swappable adapters. |
| **Fallback auth** | Email + OTP via SES. Used for demo and Singpass-unavailable scenarios. |
| **Session** | JWT access tokens (15-min expiry) + refresh tokens (7-day). 30-min inactivity timeout. |
| **RBAC** | Owner (full premise access), Member (read + limited write), Admin (SP Group ops, read-all) |
| **API auth** | JWT validation middleware on all endpoints. Rate limiting per user and per IP. |

**Data Protection:**

| Decision | Specification |
|---------|---------------|
| **Encryption at rest** | KMS with customer-managed CMKs (not default RDS encryption). S3 SSE-KMS. |
| **Encryption in transit** | TLS 1.3 on all connections — frontend↔API, API↔DB, API↔Claude, service↔service |
| **PII in logs** | Zero PII. Structured logging with correlation IDs only. PII Anonymiser strips before logging. |
| **PII to Claude** | Mandatory anonymisation. Names, NRIC, addresses, phone numbers replaced with tokens before API call. |
| **Data classification** | Public / Internal / Confidential / Restricted. Consumption data = Confidential. PII = Restricted. |
| **Data residency** | All customer data in ap-southeast-1 (Singapore). Cross-region backup encrypted. |

**Compliance Framework:**

| Standard | Scope | Evidence |
|----------|-------|---------|
| **PDPA** | All personal data handling | Consent management, breach notification (3-day), audit trails, 7-year retention |
| **CSA Cybersecurity Act** | CII obligations for SP Group digital channels | Mandatory risk assessment, incident reporting to CSA, annual audit |
| **SOC 2 Type II** | Accenture managed service platform | Org-level SOC 2 + platform-specific scope |
| **OWASP Top 10** | All web-facing surfaces | Automated SAST/DAST in CI. Quarterly manual pentest. |
| **PCI DSS** | Payment processing flows | Tokenisation via payment gateway. No card data stored. |

**Incident Response:**

| Severity | Response Time | Escalation | Resolution Target |
|----------|-------------|-----------|-------------------|
| P1 — Platform down | 15 minutes | Accenture on-call → SP Group SOC | 1 hour |
| P2 — Feature broken | 1 hour | Accenture engineering lead | 4 hours |
| P3 — Cosmetic / minor | Next business day | Accenture sprint backlog | Next release |
| Security incident | 15 minutes | Accenture CISO + SP Group SOC + CSA (if CII) | Contain within 4 hours |

**IR workflow:** Detect → Contain → Eradicate → Recover → Lessons Learned. Integrated with SP Group SOC. Annual red team exercise.

**Disaster Recovery:**

| Metric | Target | Implementation |
|--------|--------|---------------|
| **RTO** (Recovery Time Objective) | 1 hour | Aurora Multi-AZ auto-failover + ECS auto-scaling + CloudFront origin failover |
| **RPO** (Recovery Point Objective) | 5 minutes | Aurora continuous backup + point-in-time recovery |
| **DR drill** | Annual | Full failover simulation with SP Group ops team |
| **Cross-region backup** | Daily | Encrypted Aurora snapshot to ap-southeast-2 (Sydney) |

**Vulnerability Management SLA:**

| Severity | Remediation Timeline | Process |
|----------|---------------------|---------|
| Critical | 24 hours | Emergency patch, off-cycle release |
| High | 72 hours | Priority fix, next release |
| Medium | 30 days | Scheduled fix, sprint backlog |
| Low | 90 days | Best-effort, tracked |

**Third-Party Vendor Risk:**
- Anthropic (Claude API): Data processing agreement, SCC, annual vendor risk assessment. Anonymised data only.
- AWS: Shared responsibility model. SP Group retains data ownership.
- Salesforce: Existing SP Group relationship. Data flows via CustomerPort with PDPA consent.

**SIEM Integration:**
- CloudWatch logs → Kinesis Data Firehose → SP Group SIEM (Splunk/QRadar)
- Security events, access logs, audit trails forwarded in real-time
- Alerting rules co-managed with SP Group SOC

### Decision 6: Deployment & CI/CD — Weekly Release Machine

**Decision:** 1-2 releases per week with fully automated pipeline and real blue-green deployment.

**Pipeline Stages:**

```
PR Merge → Lint → Type Check → Unit Tests (100% business logic)
  → Integration Tests → Build → SAST Scan → Docker Image
  → Push to ECR → Deploy to Staging → Lighthouse Audit (score >90)
  → Playwright E2E → Pact Contract Verify
  → Manual Approval Gate → Blue-Green Deploy to Production
  → Health Check (5 min) → Traffic Shift (10%→25%→50%→100%)
  → Auto-rollback if error rate >0.1% or p95 >500ms
```

**Blue-Green Deployment (real, not force-deploy):**
- New version deploys to "green" target group behind ALB
- ALB weighted routing shifts traffic incrementally: 10% → 25% → 50% → 100%
- Health checks validate at each increment (latency, error rate, custom metrics)
- Full rollback = switch ALB back to "blue" (instant, <30 seconds)
- Old version stays warm for 1 hour post-deploy
- Rollback triggered automatically if: error rate >0.1%, p95 >500ms, or health check fails

**Environment Promotion:** `dev` → `staging` → `production`. Feature flags gate incomplete features in production.

**CI Gates That Block Deployment:**

| Gate | Threshold | Consequence |
|------|-----------|-------------|
| TypeScript | Zero errors | PR blocked |
| ESLint | Zero errors | PR blocked |
| Unit test coverage (business logic) | 100% | Merge blocked |
| Unit test coverage (overall) | 90%+ | Warning, tracked |
| Lighthouse performance | Score >90 | Deploy blocked |
| SAST security scan | Zero critical/high | Deploy blocked |
| Pact contract tests | All pass | Deploy blocked |
| E2E tests | All critical flows pass | Deploy blocked |

### Decision 7: Observability — Full-Stack Monitoring

**Decision:** Observability is a first-class architectural concern, not an afterthought.

| Layer | Tool | Purpose |
|-------|------|---------|
| **Distributed Tracing** | AWS X-Ray | Trace every request across all 4 services end-to-end. Correlation IDs propagated in headers. |
| **APM Metrics** | CloudWatch Metrics + custom dashboards | API latency (p50/p95/p99), error rate, throughput, apdex per endpoint |
| **Structured Logging** | CloudWatch Logs (JSON format) | Correlation IDs, service name, request path, duration, status. Zero PII. |
| **Business KPIs** | Custom CloudWatch dashboard | Digital adoption, call deflection, app store rating, feature usage, SPBuddy conversations |
| **Alerting** | CloudWatch Alarms → SNS → PagerDuty | P95 >200ms (5 min), error rate >0.1% (5 min), uptime drop, queue depth >1000, DB connections >80% |
| **Database** | RDS Performance Insights | Top queries by wait time, connection pool utilisation, storage growth trends |
| **AI Monitoring** | Custom metrics | Token usage per session, cache hit rate, confidence score distribution, escalation rate, response latency |
| **SIEM** | Kinesis Data Firehose → SP Group Splunk/QRadar | Security events, audit trails, compliance evidence. Real-time forwarding. |
| **Log Retention** | 90 days CloudWatch, 7 years S3 (immutable audit) | Operational debugging + PDPA compliance evidence |

**Executive Dashboard (what David sees at /dashboard):**
- Real-time: active users, API latency, error rate, uptime
- Daily: call deflection count + dollar savings, feature adoption rates
- Weekly: release count, test coverage, deployment success rate
- Monthly: app store rating trend, digital adoption %, cost vs. baseline

### Decision 8: AMS Operating Model — 5-Year Managed Service

**Decision:** Accenture operates the full stack (infrastructure + application + contact center + AI) with ITIL-aligned processes and outcome-linked SLAs.

**Team Structure (Agentic Engineering):**

| Role | Count | Responsibility |
|------|-------|---------------|
| Engineering Lead | 1 | Architecture decisions, code review, escalation point |
| Full-Stack Engineers | 3-4 | Feature development, bug fixes, 1-2 releases/week |
| SRE / DevOps | 1 | Infrastructure, CI/CD, monitoring, on-call rotation |
| AI Engineer | 1 | SPBuddy, RAG pipeline, model tuning, knowledge base updates |
| QA Automation | 1 | Test suite maintenance, E2E coverage, performance testing |
| **Total** | **7-8** | **Traditional equivalent: 30-40 engineers (agentic 5x multiplier)** |

**ITIL-Aligned Processes:**

| Process | Implementation |
|---------|---------------|
| **Incident Management** | PagerDuty alert → on-call SRE → triage (P1/P2/P3) → resolve → post-mortem → RCA published within 48 hours |
| **Change Management** | Feature request (SP Group) → sprint backlog → PR → CI gates → staging → approval → production |
| **Release Management** | 1-2 releases/week. Auto-generated release notes. Rollback runbook per release. Change advisory board for major changes. |
| **Problem Management** | Recurring incidents → root cause analysis → architectural fix → tracked to closure in Jira/Linear |
| **Capacity Planning** | Monthly compute/storage/API trend review. Auto-scaling handles peaks; manual intervention for step changes (e.g., new premise type). |
| **Knowledge Management** | Runbooks in Confluence. SPBuddy knowledge base versioned quarterly. Incident learnings feed back into runbooks. |
| **Security Patching** | Critical: 24-hour emergency patch. Dependencies: weekly Dependabot + manual review. OS patches: monthly. |

**Governance Cadence:**

| Cadence | Meeting | Attendees | Purpose |
|---------|---------|-----------|---------|
| Weekly | Sprint Review | Accenture team + SP Product Owner | Demo shipped features, review sprint metrics |
| Monthly | Ops Review | Accenture Lead + SP Head of Digital | KPIs, SLA compliance, roadmap priorities, cost tracking |
| Quarterly | Strategic Review | Accenture SMD (Matteo) + SP Leadership | Business case review, cost vs. baseline, strategic roadmap |
| Annual | Contract Review | Accenture + SP Procurement + Legal | SLA performance, commercial terms, renewal/extension |

**SLA Tracking Dashboard:**

| Metric | Target | Measurement | Penalty |
|--------|--------|-------------|---------|
| Uptime | 99.9% | External synthetic monitoring | Service credits |
| P1 response time | 15 minutes | PagerDuty timestamps | Service credits |
| Release cadence | ≥1/week | CI/CD pipeline metrics | None (advisory) |
| Call deflection | 25-30% by month 12 | SP Group call center data | Performance-linked fee adjustment |
| App store rating | ≥4.6 | App Store Connect / Play Console | Performance-linked fee adjustment |

## Implementation Patterns & Consistency Rules

These patterns ensure all AI agents and engineers write compatible, consistent code.

### Naming Conventions

| Element | Convention | Example |
|---------|-----------|---------|
| **Database tables** | snake_case, plural | `consumption_readings`, `bill_line_items` |
| **Database columns** | snake_case | `premise_id`, `utility_type`, `created_at` |
| **API endpoints** | kebab-case, plural nouns | `/api/v1/premises/:id/consumption` |
| **TypeScript files** | kebab-case | `bill.service.ts`, `billing-port.ts` |
| **React components** | PascalCase files and exports | `BillHeroChart.tsx`, `export function BillHeroChart()` |
| **TypeScript interfaces** | PascalCase, no `I` prefix | `Bill`, `ConsumptionReading`, `BillingPort` |
| **Environment variables** | SCREAMING_SNAKE_CASE | `DATABASE_URL`, `CLAUDE_API_KEY` |
| **CSS classes** | Tailwind utilities + custom tokens | `bg-energy-emerald`, `glass-strong` |

### Code Patterns

**Service-Repository-Port Pattern (all domain logic):**
```
Route Handler → validates input, returns HTTP response
  → Service → orchestrates business logic, no DB/external calls
    → Repository → Prisma database queries (internal data)
    → Port → external system calls via adapter (billing, metering, etc.)
```

**Error Handling Pattern:**
```typescript
// Every async function in services/repositories/adapters:
try {
  const result = await operation();
  return result;
} catch (error) {
  logger.error({ correlationId, operation: 'operationName', error });
  throw new DomainError('OPERATION_FAILED', 'Human-readable message', error);
}
```

**API Response Pattern:**
```typescript
// Success
return NextResponse.json({ success: true, data: result });

// Error
return NextResponse.json({ success: false, error: message }, { status: code });
```

**Port Adapter Pattern:**
```typescript
// Port (interface)
interface BillingPort {
  getBills(premiseId: string): Promise<Bill[]>;
}

// Stub Adapter
class StubBillingAdapter implements BillingPort {
  async getBills(premiseId: string): Promise<Bill[]> {
    return this.repository.findByPremise(premiseId);
  }
}

// Real Adapter (same interface, different implementation)
class SapBillingAdapter implements BillingPort {
  async getBills(premiseId: string): Promise<Bill[]> {
    const sapResponse = await this.sapClient.call('BAPI_BILL_LIST', { premiseId });
    return this.mapper.toBills(sapResponse);
  }
}
```

**Frontend Data Fetching Pattern:**
```typescript
// All components use useApi hook with fallback data
const { data, loading, error } = useApi<Bill[]>('/api/v1/premises/1/bills', DEFAULT_BILLS);
// loading → show Skeleton component
// error → show fallback data with subtle ErrorState warning
// data → render normally
```

**Agentic Action Pattern:**
```typescript
// Every SPBuddy tool execution:
1. Generate idempotencyKey = uuid()
2. await actionRepo.create({ idempotencyKey, status: 'PENDING', tool, params, userId })
3. const result = await port.execute(params)
4. await actionRepo.update(idempotencyKey, { status: result.success ? 'COMPLETED' : 'FAILED' })
5. await auditPort.log({ idempotencyKey, tool, params, result, userId, timestamp })
```

### Testing Patterns

| Type | Tool | Location | Coverage Target |
|------|------|----------|----------------|
| **Unit** | Vitest | `src/**/*.test.ts` co-located | 100% business logic, 90% overall |
| **Integration** | Vitest | `src/**/*.integration.test.ts` | All API routes |
| **Contract** | Pact | `contracts/` | All port adapters |
| **E2E** | Playwright | `e2e/` | All critical user flows |
| **Performance** | Lighthouse CI | CI pipeline | Score >90 on all pages |

### Logging Pattern

```typescript
// Structured JSON log — every log line includes:
{
  "timestamp": "2026-04-11T10:30:00.000Z",
  "level": "info",
  "service": "api",
  "correlationId": "abc-123",
  "operation": "getBillDetail",
  "premiseId": "premise_1",  // OK — not PII
  "userId": "user_1",        // Internal ID, not PII
  "duration_ms": 45,
  "status": "success"
  // NEVER: name, email, phone, NRIC, address
}
```

## Project Structure

```
sp-app/
├── src/
│   ├── app/                          # Next.js App Router
│   │   ├── page.tsx                  # Home dashboard
│   │   ├── layout.tsx                # Root layout (BottomNav, SPBuddy)
│   │   ├── globals.css               # Design tokens, animations
│   │   ├── bills/
│   │   │   ├── page.tsx              # Bills list
│   │   │   └── [id]/page.tsx         # Bill explainer
│   │   ├── greenup/page.tsx          # GreenUP rewards
│   │   ├── ev-charging/page.tsx      # EV station finder
│   │   ├── ev-calculator/page.tsx    # Petrol vs EV calculator
│   │   ├── green-goals/page.tsx      # Green Goals tracking
│   │   ├── profile/page.tsx          # Profile & settings
│   │   ├── energy-flow/page.tsx      # Live energy flow
│   │   ├── dashboard/page.tsx        # Executive dashboard
│   │   ├── simulator/page.tsx        # Bill simulator
│   │   ├── utilities/
│   │   │   ├── page.tsx              # Services portal
│   │   │   └── moving/page.tsx       # Move house wizard
│   │   ├── website/                  # Desktop website (full-width)
│   │   │   ├── page.tsx              # Landing page
│   │   │   ├── layout.tsx            # Website layout (overrides 430px)
│   │   │   ├── services/             # 6 service sub-pages
│   │   │   ├── login/page.tsx        # Customer login
│   │   │   ├── portal/              # Authenticated portal
│   │   │   ├── about/               # Corporate pages
│   │   │   └── contact/page.tsx     # Contact page
│   │   └── api/                      # API route handlers
│   │       └── v1/
│   │           ├── health/route.ts
│   │           ├── users/route.ts
│   │           ├── premises/[id]/
│   │           │   ├── consumption/route.ts
│   │           │   ├── bills/route.ts
│   │           │   └── appliances/route.ts
│   │           ├── bills/[id]/route.ts
│   │           ├── ev-stations/route.ts
│   │           ├── greenup/route.ts
│   │           ├── green-goals/route.ts
│   │           ├── notifications/route.ts
│   │           ├── ai/chat/route.ts           # SPBuddy endpoint
│   │           └── ai/actions/route.ts        # Agentic action endpoint
│   │
│   ├── components/
│   │   ├── energy/                   # Home dashboard components
│   │   ├── bills/                    # Bills page components
│   │   ├── bill-explainer/           # Bill detail components
│   │   ├── ev-calculator/            # EV calculator components
│   │   ├── dashboard/                # Executive dashboard components
│   │   ├── greenup/                  # GreenUP components
│   │   ├── goals/                    # Green Goals components
│   │   ├── ev/                       # EV Charging components
│   │   ├── energy-flow/              # Energy flow components
│   │   ├── profile/                  # Profile components
│   │   ├── website/                  # Website components
│   │   ├── ui/                       # Shared UI (Skeleton, ErrorState)
│   │   ├── BottomNav.tsx
│   │   ├── SPBuddy.tsx
│   │   └── ThemeToggle.tsx
│   │
│   ├── lib/
│   │   ├── services/                 # Business logic layer
│   │   │   ├── bill.service.ts
│   │   │   ├── consumption.service.ts
│   │   │   ├── greenup.service.ts
│   │   │   ├── ev.service.ts
│   │   │   ├── notification.service.ts
│   │   │   └── ai.service.ts         # SPBuddy orchestration
│   │   │
│   │   ├── repositories/             # Database access (Prisma)
│   │   │   ├── bill.repository.ts
│   │   │   ├── consumption.repository.ts
│   │   │   ├── user.repository.ts
│   │   │   └── ... (16 repositories)
│   │   │
│   │   ├── ports/                    # Integration interfaces
│   │   │   ├── billing.port.ts
│   │   │   ├── metering.port.ts
│   │   │   ├── customer.port.ts
│   │   │   ├── payment.port.ts
│   │   │   ├── auth.port.ts
│   │   │   ├── ai.port.ts
│   │   │   ├── notification.port.ts
│   │   │   ├── audit.port.ts
│   │   │   ├── reconciliation.port.ts
│   │   │   └── field-ops.port.ts
│   │   │
│   │   ├── adapters/
│   │   │   ├── stub/                 # Stub adapters (seed data)
│   │   │   │   ├── stub-billing.adapter.ts
│   │   │   │   ├── stub-metering.adapter.ts
│   │   │   │   └── ...
│   │   │   ├── real/                 # Real adapters (production)
│   │   │   │   ├── sap-billing.adapter.ts
│   │   │   │   ├── ami-metering.adapter.ts
│   │   │   │   ├── salesforce-customer.adapter.ts
│   │   │   │   ├── claude-ai.adapter.ts
│   │   │   │   └── ...
│   │   │   └── adapter-factory.ts    # DI container, env-driven selection
│   │   │
│   │   ├── ai/                       # AI-specific modules
│   │   │   ├── orchestrator.ts       # Main AI orchestration logic
│   │   │   ├── context-builder.ts    # Build grounded prompts from user data
│   │   │   ├── pii-anonymiser.ts     # Strip/restore PII for Claude calls
│   │   │   ├── model-router.ts       # Haiku vs Sonnet routing
│   │   │   ├── tool-executor.ts      # Agentic tool execution with guardrails
│   │   │   ├── confidence-scorer.ts  # Response confidence assessment
│   │   │   ├── token-budget.ts       # Token usage tracking and limits
│   │   │   ├── response-cache.ts     # Redis cache for common queries
│   │   │   └── tools/                # Individual tool definitions
│   │   │       ├── initiate-giro.tool.ts
│   │   │       ├── submit-refund.tool.ts
│   │   │       ├── check-outage.tool.ts
│   │   │       └── ...
│   │   │
│   │   ├── db/
│   │   │   └── client.ts             # Prisma client singleton
│   │   │
│   │   ├── utils/
│   │   │   ├── api-response.ts       # Response envelope helpers
│   │   │   ├── logger.ts             # Structured JSON logger
│   │   │   ├── circuit-breaker.ts    # Circuit breaker implementation
│   │   │   ├── correlation-id.ts     # Request correlation ID middleware
│   │   │   └── auth-middleware.ts    # JWT validation + Singpass
│   │   │
│   │   └── types/                    # Shared TypeScript types
│   │       ├── bill.types.ts
│   │       ├── consumption.types.ts
│   │       ├── user.types.ts
│   │       └── ... (15 type files)
│   │
│   └── hooks/
│       ├── use-api.ts                # Data fetching hook with fallback
│       └── use-api.test.ts
│
├── prisma/
│   ├── schema.prisma                 # 16 tables
│   ├── seed.ts                       # Comprehensive Singapore-realistic seed
│   └── migrations/
│
├── contracts/                        # Pact contract tests
│   ├── billing.contract.test.ts
│   ├── metering.contract.test.ts
│   └── ...
│
├── e2e/                              # Playwright E2E tests
│   ├── app-mobile.spec.ts
│   └── website-desktop.spec.ts
│
├── infra/
│   └── cdk/
│       ├── bin/app.ts
│       ├── lib/
│       │   ├── sp-app-stack.ts       # Main infrastructure
│       │   ├── sp-connect-stack.ts   # AWS Connect + Lex V2
│       │   ├── sp-monitoring-stack.ts # CloudWatch, X-Ray, alarms
│       │   └── sp-security-stack.ts  # WAF, Shield, KMS
│       └── cdk.json
│
├── docs/
│   ├── prd.md                        # Product Requirements Document
│   ├── architecture.md               # This document
│   ├── epics-and-stories.md          # 30 epics, 60+ stories
│   ├── security-assessment.md        # SP Group website findings
│   ├── technical-architecture.md     # Legacy (v1, superseded)
│   ├── technical-specs.md            # API contracts
│   ├── functional-specs.md           # Legacy (pre-v0, superseded)
│   └── prfaq-sp-digital.md          # Product vision
│
├── playwright.config.ts
├── vitest.config.ts
├── tsconfig.json
├── tailwind.config.ts
├── package.json
└── Dockerfile

```

### Component-to-Epic Mapping

| Directory | Epics Covered | PRD Features |
|-----------|--------------|--------------|
| `components/energy/` | E8 (Home Dashboard) | F7, F8 |
| `components/bills/` + `components/bill-explainer/` | E9, E10 (Bills, Bill Explainer) | F1, F2, F6 |
| `components/greenup/` + `components/goals/` | E5, E7, E11, E13 (GreenUP, Goals) | F11, F12 |
| `components/ev/` + `components/ev-calculator/` | E6, E12 (EV Charging, Calculator) | F9, F10 |
| `components/dashboard/` | E24 (Observability) | F16 |
| `components/website/` | E15 (Website) | F15 |
| `lib/services/` + `lib/repositories/` | E1-E4 (Core domain) | F1-F14 |
| `lib/ports/` + `lib/adapters/` | E29 (API Integration) | All integration features |
| `lib/ai/` | E16 (SPBuddy), E22 (Contact Center) | F4, F17 |
| `infra/cdk/` | E23, E27, E28 (CI/CD, Deployment, Security) | F19, F20, F21 |

## Architecture Validation

### PRD Coverage Check

| PRD Section | Architecture Coverage | Status |
|-------------|---------------------|--------|
| 46 Functional Requirements | All mapped to services/ports/components | ✅ Covered |
| 25 Non-Functional Requirements | Performance (compute scaling), Reliability (Multi-AZ, circuit breakers), Security (CII-grade), Testing (CI gates), Observability (X-Ray, CloudWatch) | ✅ Covered |
| 5 User Journeys | Mei Ling (bill explainer + GIRO), Ryan (EV calc + GreenUP), David (exec dashboard), Priya (CC integration), Wei Ming (CI/CD + observability) | ✅ Covered |
| Domain Requirements (PDPA, CSA, Singpass, EMA) | Security architecture + AuthPort + AuditPort + SIEM integration | ✅ Covered |
| Innovation (agentic delivery, AI grounding, stubbed integration) | AI architecture + Ports & Adapters + CI/CD pipeline | ✅ Covered |
| AMS Operating Model | Team structure, ITIL processes, governance cadence, SLA dashboard | ✅ Covered |

### Decision Coherence Check

| Decision Pair | Compatible? | Notes |
|--------------|-------------|-------|
| 4 ECS services + Aurora PostgreSQL | ✅ | pgBouncer handles connection pooling across services |
| Ports & Adapters + Pact + CI/CD | ✅ | Contract tests run in pipeline before deploy |
| Claude API + PII Anonymiser + PDPA | ✅ | Anonymisation enforced before external AI calls |
| Blue-green deploy + auto-rollback | ✅ | ALB weighted routing + health checks |
| AWS Connect + Bedrock + Lex V2 | ✅ | Same AI brain (SPBuddy) accessible via Bedrock agent |
| Salesforce CRM + CustomerPort | ✅ | Shared customer context across app and contact center |
| ElastiCache + AI response caching | ✅ | Reduces Claude API costs and latency |
| pgvector RAG + Aurora PostgreSQL | ✅ | Embeddings co-located with domain data, no separate vector DB needed |

### Known Gaps & Deferred Decisions

| Gap | Deferred To | Rationale |
|-----|-------------|-----------|
| React Native mobile app | Continuous Evolution (month 4+) | Web app with 430px constraint is MVP; native app is Phase 2 |
| Multi-language support | Continuous Evolution (month 6+) | English-first; i18n framework selected but translations deferred |
| Smart home IoT integration | Continuous Evolution (month 12+) | Depends on SP Group's IoT strategy; Matter/Zigbee protocol TBD |
| Appliance disaggregation ML model | Continuous Evolution (month 6+) | Requires training data from real smart meter patterns |
| Open API for third-party retailers | Continuous Evolution (month 12+) | OEM ecosystem integration; API gateway and developer portal needed |
| SAP IS-U real adapter | Due diligence phase | Requires SP Group API documentation and sandbox access |
| Singpass NDI certification | Parallel with build (12 weeks) | GovTech certification process runs alongside development |

### Cost Estimate (Production)

| Component | Monthly Cost | Notes |
|-----------|-------------|-------|
| ECS Fargate (4 services, auto-scaling) | ~$400 | 2-20 tasks total depending on load |
| Aurora PostgreSQL (Multi-AZ + replica) | ~$800 | db.r6g.large primary + replica |
| ElastiCache Redis | ~$150 | Response caching for SPBuddy |
| CloudFront CDN | ~$100 | Static assets + API caching |
| S3 (bills, recordings, assets) | ~$50 | Storage + transfer |
| WAF + Shield Advanced | ~$3,050 | Shield Advanced is $3K/month flat |
| CloudWatch + X-Ray | ~$200 | Logs, metrics, traces, alarms |
| Secrets Manager + KMS | ~$50 | Managed keys and secrets |
| AWS Connect | ~$500 | Contact center (usage-based) |
| Claude API (Anthropic) | ~$2,000 | SPBuddy at 10% MAU, 40% cache hit |
| SQS + EventBridge | ~$50 | Async messaging |
| **Total** | **~$7,350/month** | **~$88K/year** |

This is the infrastructure cost for serving 1.4M households with CII-grade security, 99.9% uptime, and AI-powered features. Accenture's managed service fee (team of 7-8) sits on top of this.
