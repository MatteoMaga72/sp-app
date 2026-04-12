---
stepsCompleted: ["step-01-init", "step-02-discovery", "step-02b-vision", "step-02c-executive-summary", "step-03-success", "step-04-journeys", "step-05-domain", "step-06-innovation", "step-07-project-type", "step-08-scoping", "step-09-functional", "step-10-nonfunctional", "step-11-polish", "step-12-complete"]
classification:
  projectType: "Multi-channel managed digital platform"
  domain: "Energy / Utilities"
  complexity: "High"
  projectContext: "Brownfield integration, greenfield delivery"
  deliveryModel: "Build-free, 5-year managed service with outcome-linked SLA"
  commercialModel: "Zero build cost + fixed monthly run fee + performance-linked component"
  northStarMetric: "Total cost of digital operations"
  softKPIs: ["Call deflection rate", "App store rating", "Digital adoption", "Uptime"]
  competitiveContext: "Monopoly — efficiency and CX play"
  phaseStrategy: "Single pitch, phased delivery"
workflowType: 'prd'
inputDocuments:
  - "docs/prfaq-sp-digital.md"
  - "docs/functional-specs.md"
  - "docs/technical-specs.md"
  - "docs/technical-architecture.md"
  - "docs/epics-and-stories.md"
  - "docs/security-assessment.md"
  - "docs/user-guide.md"
documentCounts:
  briefs: 1
  research: 1
  projectDocs: 5
---

# Product Requirements Document - SP Digital Experience Platform

**Author:** Matteo Maga
**Date:** 2026-04-11

## Executive Summary

SP Group's consumer digital channels — mobile app and website — are functionally adequate but operationally expensive and strategically stalled. The current app (v15.6.0) relies on WebView-embedded pages that frequently fail, provides passive consumption data without actionable intelligence, and requires a quarterly release cycle with extensive manual QA. SP Group's digital roadmap is frozen because traditional delivery costs make incremental improvement uneconomical.

This platform replaces all consumer-facing digital channels — mobile app, website, and customer portal — with a unified, AI-native experience built and operated by Accenture under a 5-year managed service agreement. The build is delivered at zero cost to SP Group. Accenture's compensation comes exclusively from the run phase, priced at 50% or less of SP Group's current digital operations spend. This commercial model is viable because Accenture's generative engineering methodology reduces build and maintenance effort by 5-10x compared to traditional delivery.

The platform serves 1.4 million Singapore households with three priority objectives: (P0) reduce contact center costs through digital self-service and AI-powered bill explanation, (P1) increase app store ratings and digital adoption through a consumer-grade experience, and (P2) guarantee 99.9%+ uptime with zero-downtime weekly releases.

### What Makes This Special

**The cost curve has broken, and most enterprises haven't noticed.** Agentic software engineering has reduced the cost of building and maintaining software by an order of magnitude. Accenture is the first systems integrator to operationalize this at enterprise scale. SP Group benefits from first-mover pricing: the build is free because the build is cheap, and the 5-year run is profitable for Accenture at half SP Group's current spend.

**The platform is already built.** This is not a slide deck proposal. SP Group's Head of Digital can interact with a full-stack working platform today — 25 pages across mobile app and website, backed by a real API layer, PostgreSQL database, and AWS infrastructure. Integration points with SP Group's backend systems (billing, metering, CRM, payments) are stubbed with realistic simulators, meaning the platform works end-to-end and goes live by swapping stubs for real connections. The platform was built in a single engineering sprint, demonstrating the velocity that will sustain the 5-year managed service.

**Digital and contact center are one play.** Accenture is a leading bidder on SP Group's contact center RFP. The digital platform and contact center share an AI engine (SPBuddy), a knowledge base, and a customer context layer. Every digital improvement reduces call volume. This is a unified customer experience transformation, not two separate projects.

## Project Classification

| Dimension | Value |
|-----------|-------|
| **Project Type** | Multi-channel managed digital platform (web app + mobile app + API + AI assistant) |
| **Domain** | Energy / Utilities |
| **Complexity** | High — regulated utility, 1.4M users, government compliance (PDPA, EMA, Singpass), real-time metering data |
| **Project Context** | Brownfield integration (SP Group's existing SAP billing, AMI metering, CRM, payment systems) with greenfield delivery (entirely new frontend, middleware, and AI layer) |
| **Delivery Model** | Build-free, 5-year managed service with outcome-linked SLA |
| **Commercial Model** | Zero build cost + fixed monthly run fee + performance-linked component (app store rating, call deflection rate) |
| **North Star Metric** | Total cost of digital operations — SP Group's current spend vs. Accenture's run cost |
| **Competitive Context** | SP Group is a monopoly — this is an efficiency and CX modernization play, not competitive defense |

## Success Criteria

### User Success

- A customer understands their bill breakdown in under 30 seconds without calling the hotline — the interactive bill explainer answers "why is my bill higher?" before they think to ask
- A customer completes any service request (GIRO setup, fee waiver, refund, meter reading) entirely in-app in under 2 minutes — zero WebView redirects, zero failed page loads
- A customer asks SPBuddy a billing question in natural language and receives a data-backed, personalized answer within 3 seconds
- An EV-curious customer sees their specific petrol-to-electric savings calculation and has the data to make a purchase decision
- A customer checks their daily energy spend as effortlessly as checking their bank balance — the live cost ticker makes consumption visible and controllable

### Business Success

| Metric | Baseline | Year 1 Target | Measurement |
|--------|----------|---------------|-------------|
| Call deflection rate | 0% (no digital deflection today) | 25-30% reduction in billing and service-related calls | Monthly call volume vs. pre-launch baseline |
| App store rating | 4.6 (iOS, 11.3K ratings) | Maintain 4.6+ while increasing rating volume | App Store Connect / Play Console |
| Digital adoption rate | TBD (due diligence) | 15% increase in MAU | Analytics dashboard |
| Digital ops cost | TBD (due diligence) | ≤50% of SP Group's current digital spend | Contractual — Accenture's run fee vs. SP's current cost |
| Release velocity | Quarterly (~4/year) | Weekly (52/year) — 13x improvement | CI/CD pipeline metrics |
| Service completion rate (in-app) | ~34% (WebView-based GIRO setup) | >90% for all native service flows | Funnel analytics |

### Technical Success

| Metric | Target | Enforcement |
|--------|--------|-------------|
| Uptime | 99.9%+ (≤8.7 hrs downtime/year) | SLA with financial penalties |
| Page load (4G) | <2 seconds LCP | Lighthouse CI budget, blocks deploy if >2s |
| API p95 latency | <200ms | APM alerting, auto-scale trigger |
| Test coverage (business logic) | 100% | CI gate — merge blocked below threshold |
| Test coverage (overall) | 90%+ | CI gate — tracked and reported |
| Security vulnerabilities (critical/high) | Zero | Automated SAST/DAST in CI, blocks deploy |
| Deployment success rate | 100% (with auto-rollback) | Blue-green deployment, health check gates |
| PDPA compliance | Full | Annual audit, data encryption at rest/transit |

### Measurable Outcomes

**3-month milestone (Launch):** Full platform live — consumer app (10 screens), website (15 pages), EV Calculator, executive dashboard, SPBuddy AI, native service flows, demand response, predictive outage alerts, smart notifications, contact center integration. All delivered in a single 12-week launch wave. First call deflection data available. App rating stable at 4.6+.

**6-month milestone:** Call deflection at 15%+. Weekly release cadence proven with zero-downtime track record. Digital ops cost verified at ≤50% of baseline. Feature velocity demonstrated with 12+ post-launch releases shipped.

**12-month milestone:** Call deflection at 25-30%. Household energy audit live. Multi-language support deployed. React Native mobile app in production. Platform stability proven across billing cycles, outage events, and peak loads.

## Product Scope

### Launch Wave (Weeks 1-12): Full Platform Delivery

All consumer and enterprise features delivered in parallel:

**Consumer Mobile App:**
- Redesigned Home dashboard with live cost ticker and AI insights
- Interactive Bill Explainer with guided wizard, AI chat, category breakdown
- Native in-app service flows: GIRO setup, fee waiver, refund request, payment arrangement, meter reading, address update — all replacing WebViews
- SPBuddy AI assistant powered by Claude API with contextual bill Q&A
- Consumption monitoring with electricity/water toggle, multi-period views, neighbour comparison
- GreenUP rewards with tier progression, challenges, leaderboard
- EV Charging station finder with map, filters, real-time availability
- EV Petrol vs. Electric Calculator with live Singapore fuel prices
- Green Goals tracking (home/district/Singapore views)
- Profile with multi-premise management, household members, dark mode
- Demand response integration (EMA pilot, peak-shifting alerts)
- Predictive outage alerts with live outage map
- Smart notifications engine (bill anomaly detection, bill prediction, rate change alerts)

**SP Group Website:**
- Landing page, 6 service sub-pages (electricity, water, EV, solar, district cooling, smart home)
- Customer login with Singpass mock, customer portal dashboard, web bill detail
- Corporate pages (About, Sustainability, Careers, Contact)

**Enterprise:**
- Executive Dashboard (Head of Digital command center with KPIs, call deflection, platform health, release velocity)
- Contact center integration (SPBuddy powers live chat, shared knowledge base, seamless escalation)

**Platform Engineering:**
- Full API layer connected to SP Group backend systems (billing, metering, CRM, payments)
- CI/CD pipeline with automated testing gates and weekly releases
- Zero-downtime deployment on AWS (ECS Fargate, RDS, CloudFront)
- Observability stack with APM, structured logging, business metrics dashboard
- 100% test coverage on business logic, 90%+ overall

### Continuous Evolution (Months 4-60): Managed Service

Weekly feature releases driven by SP Group's roadmap:
- Household energy audit (appliance-level disaggregation from smart meter data)
- Solar/Green Credits marketplace (improved My Green Credits UX)
- Smart home integration (IoT device control, automation rules)
- Multi-language support (English, Mandarin, Malay, Tamil)
- React Native mobile app (native iOS/Android with biometric auth, push notifications)
- Offline-capable service flows with optimistic UI
- Open API for third-party energy retailers and service providers

## User Journeys

### Journey 1: Auntie Mei Ling — "Why is my bill so high?"

**Mei Ling**, 58, lives in a 4-room HDB flat in Toa Payoh with her husband. She checks the SP app once a month when the bill notification arrives. Last quarter she called the hotline three times — once because her bill jumped $40 and nobody could explain why quickly, once because GIRO setup failed on the WebView, and once because she couldn't find where to request a refund for an overpayment. Each call took 15 minutes of waiting.

**Opening Scene:** It's April 2nd. Mei Ling gets a push notification: "Your April bill is ready — $130.20 (down $23.88 from March)." She taps it.

**Rising Action:** The app opens to the Bill Explainer. An animated donut chart builds up segment by segment — electricity, water, gas, GST. The total counts up to $130.20. A green badge bounces in: "You saved $23.88!" She taps the electricity segment and sees: "324 kWh × $0.2691/kWh = $87.16. That's 19% less than last month." Below, SPBuddy says: "The cooler weather in March reduced your AC usage. Your washing machine also ran 3 fewer cycles." She nods — makes sense.

**Climax:** She remembers she never set up GIRO. She taps "Pay Now" → "Set up eGIRO" → selects DBS → authorizes in-app. Done in 90 seconds. No WebView. No crash. No callback needed.

**Resolution:** Mei Ling closes the app. She did not call the hotline. She understood her bill, saved $23, and set up auto-payment — all in under 3 minutes. She rates the app 5 stars on the App Store.

**Requirements revealed:** Interactive bill explainer, AI bill Q&A, native GIRO setup, push notifications, bill comparison, plain-language explanations.

### Journey 2: Ryan — "Should I switch to electric?"

**Ryan**, 32, just moved into a condo at Marina Bay. He bought a BYD Atto 3 last month but still keeps his Honda Civic. His wife thinks the EV was a waste of money. He wants to prove her wrong with numbers.

**Opening Scene:** Ryan opens the SP app during lunch. He sees the EV Calculator link in the promo carousel: "Your EV could save you $180/month."

**Rising Action:** He taps through. Selects "Honda Civic" as his current car. Enters 1,800 km/month driving distance. The calculator pulls live petrol prices — Shell 95 at $2.72/L. His monthly petrol cost: $326. He then sees the EV comparison: BYD Atto 3 charging cost at SP's tariff: $72.70/month. Monthly savings: $253.30. Annual: $3,039. CO2 reduction: 3,180 kg/year.

**Climax:** He screenshots the comparison and sends it to his wife. "I told you." He taps "Find nearby chargers" and sees 3 available DC 50kW chargers at his condo, 0.2 km away.

**Resolution:** Ryan checks the GreenUP leaderboard — he's #47 in his district. He completes two energy challenges to climb the rankings. He shares his sustainability stats on LinkedIn. He opens the app 4 times this week.

**Requirements revealed:** EV Calculator with live fuel prices, charger finder with real-time availability, GreenUP gamification with social sharing, district leaderboard, promo carousel targeting.

### Journey 3: David — "Can I trust this platform?"

**David**, 45, is SP Group's Head of Digital. He's been pitched by 6 vendors this year. He's sceptical of demos. He opens the platform on his laptop and immediately right-clicks → Inspect.

**Opening Scene:** David receives a link from Matteo at Accenture. He opens the Executive Dashboard at `/dashboard`. He sees: Digital Adoption 67.3%, Call Deflection 34.8%, App Store Rating 4.6, DAU/MAU 42.1%. All with sparkline trends. He nods — "this is what I need to see."

**Rising Action:** He checks platform health: 99.97% uptime, API p95 at 142ms, 0.02% error rate, last deployment 2 hours ago. He opens DevTools. Network tab shows API calls returning real JSON from `/api/premises/1/consumption`. Response times under 150ms. No console errors. He switches to the mobile app view (430px). Taps through Home → Bills → Bill Explainer. The wizard launches. He goes through all 5 steps. Everything loads. Nothing breaks.

**Climax:** He opens the call center impact panel. "18,420 calls deflected this month. Estimated savings: $184,200." He does the math — that's $2.2M/year. Against a managed service fee that's less than half his current digital spend. The business case writes itself.

**Resolution:** David messages his CTO: "I want to fast-track this. Set up a technical deep-dive with the Accenture team next week." He asks Matteo for the security assessment. He reads it on the train home.

**Requirements revealed:** Executive dashboard with real-time KPIs, platform health monitoring, call deflection metrics with dollar impact, API performance visible in DevTools, security posture documentation, mobile responsiveness.

### Journey 4: Priya — "I can't keep up with these calls"

**Priya**, 38, leads a 40-person contact center team handling SP Group customer inquiries. Her team answers 2,400 calls/day. 42% are billing questions ("why is my bill higher?"), 18% are service requests (GIRO, refunds), and 15% are outage inquiries. She's under pressure to reduce headcount by 20% without hurting CSAT.

**Opening Scene:** It's 10 AM on bill delivery day. Call volume is spiking. Priya opens the digital platform's contact center dashboard. She sees real-time call volume trending 28% below the same day last month. The bill explainer went live 6 weeks ago.

**Rising Action:** An agent escalates a call — a customer is confused about a carbon tax line item on their bill. Priya checks the SPBuddy knowledge base. The answer is there: "Carbon tax increased from $25 to $28 per tonne CO2e effective January 2026, adding approximately $1.40 to the average monthly bill." She pastes it to the agent. 30-second resolution.

**Climax:** She pulls the weekly report. Self-service bill views up 340%. GIRO setup completion rate: 92% (was 34% via WebView). "Why is my bill higher?" calls down 38%. She has the data to present to her director: the digital platform is doing what 15 agents used to do.

**Resolution:** Priya recommends redeploying 8 agents from billing queries to complex cases (moving house, disputes). CSAT goes up because complex cases get more attention. Cost goes down because simple cases self-serve. She books a meeting with David to discuss Phase 2 — adding live chat escalation from SPBuddy directly to her team.

**Requirements revealed:** Contact center dashboard, real-time call volume analytics, SPBuddy knowledge base shared with agents, self-service completion rate tracking, live chat escalation path, deflection reporting.

### Journey 5: Wei Ming — "Don't page me at 3 AM"

**Wei Ming**, 29, is an IT Operations engineer at SP Group. He's responsible for the uptime of customer-facing digital services. The current app runs on legacy infrastructure with manual deployments every quarter. Last quarter, a deployment broke GIRO payments for 6 hours on a Friday night. He got paged at 2 AM. His girlfriend was not impressed.

**Opening Scene:** It's Tuesday at 3 PM. Accenture's CI/CD pipeline has flagged a new release ready for production. Wei Ming opens the deployment dashboard. He sees: build passed (lint, type check, 847 unit tests, 42 E2E tests), Lighthouse score 94, no security vulnerabilities detected, staging health checks green for 4 hours.

**Rising Action:** He clicks "Promote to Production." The blue-green deployment starts. New containers spin up alongside the existing ones. Health checks run. Traffic shifts 10% → 25% → 50% → 100% over 8 minutes. He watches the APM dashboard — p95 latency stable at 138ms, error rate 0.00%, no anomalies.

**Climax:** His phone buzzes at 3 AM. But it's not a page — it's a notification from the observability stack: "Weekly performance report: 99.99% uptime, 4 deployments, 0 incidents, 0 rollbacks." He rolls over and goes back to sleep.

**Resolution:** Wei Ming presents at the monthly ops review. Deployments went from quarterly with manual QA (and 6-hour outages) to weekly with zero downtime. He shows the structured logging dashboard — every API call traceable end-to-end with correlation IDs. His director asks: "Can we get this for the B2B portal too?"

**Requirements revealed:** CI/CD pipeline with automated gates, blue-green deployment, health check-based traffic shifting, APM with real-time alerting, structured logging with correlation IDs, automated rollback, deployment approval workflow, zero-downtime guarantee.

### Journey Requirements Summary

| Journey | Primary Capabilities Required |
|---------|------------------------------|
| **Mei Ling** (consumer, bill-focused) | Bill explainer, AI Q&A, native GIRO setup, push notifications |
| **Ryan** (consumer, EV/engagement) | EV calculator, charger finder, GreenUP gamification, social sharing |
| **David** (executive, evaluation) | Executive dashboard, KPI tracking, call deflection metrics, security posture |
| **Priya** (contact center, operations) | CC dashboard, SPBuddy knowledge base, escalation path, deflection analytics |
| **Wei Ming** (IT ops, reliability) | CI/CD pipeline, blue-green deploy, APM, structured logging, auto-rollback |

## Domain-Specific Requirements

### Compliance & Regulatory

| Regulation | Requirement | Impact on Platform |
|-----------|-------------|-------------------|
| **PDPA (Personal Data Protection Act)** | All personal data (consumption, billing, contact) must be collected, used, and disclosed only with consent. Data breach notification within 3 days. | Consent management, data encryption at rest/transit, audit logging, breach notification workflow |
| **EMA (Energy Market Authority)** | SP Group operates under EMA licence. Consumer data sharing governed by Open Electricity Market framework. Demand response programs require EMA coordination. | Data sharing consent layer for OEM retailers, demand response API must align with EMA pilot specifications |
| **Singpass / MyInfo** | Singapore government mandates Singpass for utility account authentication. MyInfo provides pre-filled personal data with user consent. | GovTech Singpass integration (NDI sandbox for development, production certification required), MyInfo API for onboarding |
| **IMDA (Infocomm Media Development Authority)** | Accessibility requirements for government-linked services. Digital service standards. | WCAG 2.1 AA compliance, multi-language support |
| **Payment Services Act** | eGIRO and payment processing must comply with MAS payment regulations. | PCI DSS for card payments, bank API integration for eGIRO, PayNow QR standards |

### Technical Constraints

**Data Sensitivity:**
- Consumption data reveals household occupancy patterns — security classification as personal data under PDPA
- Billing data contains financial information — encrypted storage, access-controlled APIs
- Location data (EV charging) — minimise retention, anonymise for analytics

**Real-Time Operations:**
- Smart meter data arrives at 30-minute intervals via AMI head-end systems
- Outage detection and notification must propagate within minutes, not hours
- Demand response events require near-real-time push to opted-in consumers
- Billing cycle processing creates predictable traffic spikes (all 1.4M households on similar cycles)

**Data Residency:**
- All customer data must reside in Singapore or approved jurisdictions
- AWS ap-southeast-1 (Singapore) region mandatory for production deployment
- AI processing (Claude API for SPBuddy) — data must not leave SG or must be anonymised before external API calls

### Integration Requirements

| System | Integration Type | Complexity | Notes |
|--------|-----------------|------------|-------|
| **SAP IS-U / CCS** | Billing data read, payment write | Very High | SP Group's core billing system. BAPI/RFC or middleware required. Batch reconciliation for payments. |
| **AMI Head-End (smart meters)** | Consumption data read | High | 30-min interval data from ~1.4M meters. MDM validation layer. Large data volumes. |
| **CRM** | Customer data read/write | Medium | Account management, service requests, case tracking |
| **Payment Gateways** | PayNow, eGIRO, credit card | High | Real-time payment processing. Bank API integration for eGIRO. MAS compliance. |
| **Singpass / MyInfo** | Authentication, identity | High | GovTech NDI certification process. Sandbox → staging → production. |
| **EMA Demand Response** | Event subscription, consumer notification | Medium | REST API (per EMA pilot spec). Push notification trigger. |
| **SP Charging Network** | Station data, session management | Medium | Real-time availability. Session start/stop/billing. |
| **Anthropic Claude API** | SPBuddy AI responses | Low | API integration. Data anonymisation before sending. Response caching for common queries. |

### Risk Mitigations

| Risk | Likelihood | Impact | Mitigation |
|------|-----------|--------|------------|
| **SAP integration delays** | High | Critical | API stubber layer simulates SAP responses. Platform works end-to-end with stubs. Swap to real integration incrementally. |
| **Singpass certification timeline** | Medium | High | Mock Singpass flow for demo/UAT. Begin GovTech certification in parallel with build. Fallback to email/OTP auth if delayed. |
| **Billing cycle traffic spike** | High | High | Auto-scaling ECS tasks. CloudFront CDN for static assets. Database read replicas for billing queries. Load testing at 3x peak. |
| **Smart meter data quality** | Medium | Medium | Validation layer in middleware. Graceful degradation — show "data unavailable" rather than wrong data. Gap-filling algorithms for missing readings. |
| **PDPA data breach** | Low | Critical | Encryption at rest (AES-256) and transit (TLS 1.3). No PII in logs. Access audit trail. Breach notification workflow automated. |
| **AI hallucination in SPBuddy** | Medium | High | Ground all responses in actual bill/consumption data. No speculative advice. Confidence thresholds — escalate to human if uncertain. Response review for first 1000 conversations. |

## Innovation & Novel Patterns

### Detected Innovation Areas

**1. Agentic Engineering as Enterprise Delivery Model**
The primary innovation is not the product — it's how it's built and continuously evolved. Using AI-native software engineering to deliver enterprise-grade software at 5-10x the velocity of traditional SI teams. This enables:
- **Build phase:** Full platform delivered in a single 12-week sprint — what traditionally takes 12-18 months
- **Run phase:** 1-2 releases per week across both app and web — 50-100 releases/year vs. SP Group's current 4/year. Every release is automatically tested (100% business logic coverage), security-scanned, and deployed with zero downtime via blue-green deployment.
- **Commercial model:** Build-free, outcome-linked run — impossible with conventional delivery economics

The release velocity isn't aspirational — it's the operating model. The CI/CD pipeline enforces it: merge → lint → test → build → stage → promote → deploy, every week, automatically. This is what "managed service" actually means — not a team on standby waiting for change requests, but a continuously shipping engineering operation.

**2. AI-Grounded Bill Intelligence**
SPBuddy isn't a generic chatbot — it's an AI assistant grounded in the customer's actual consumption and billing data. Every response references specific kWh readings, dollar amounts, and time periods. This is meaningfully different from the keyword-matching FAQ bots currently deployed by utilities (including SP Group's current FlexAnswer-based chatbot). The innovation is grounding, not generation.

**3. Stubbed Integration Architecture**
The API stubber pattern — where realistic simulators stand in for enterprise backend systems (SAP, AMI, CRM) — allows the platform to function end-to-end without waiting for integration. Stubs are swapped for real connections incrementally. This inverts the traditional SI delivery model where integration is the gate for everything. The platform ships first, integrates second.

### Market Context & Competitive Landscape

- **Octopus Energy (UK)** built their own "Kraken" platform using engineering-first culture, enabling rapid feature delivery. But they built it over 6+ years with a large internal team — not in a single sprint.
- **No SI has publicly demonstrated agentic delivery** at this scale for a utility client. Accenture, TCS, Infosys, Cognizant all still pitch traditional waterfall/agile delivery models.
- **SP Group's current vendor** (unknown, possibly in-house SP Digital) delivers on quarterly cycles. The gap between quarterly and weekly is the pitch.

### Validation Approach

| Innovation | How to Validate | Timeline |
|-----------|----------------|----------|
| Agentic delivery velocity | The platform already exists — 25 pages, 15K lines, full-stack. Velocity is proven. | Validated |
| Continuous release cadence | 1-2 releases/week sustained across app and web with zero-downtime deployment | Weeks 1-12 of launch wave |
| AI-grounded bill responses | Connect SPBuddy to Claude API with real bill data. Measure: does it answer "why is my bill higher?" correctly 95%+ of the time? | Week 1-2 of launch wave |
| Stubbed integration | Swap one stub (e.g., billing) for real SAP connection during due diligence. Measure: does the platform work identically? | Due diligence phase |
| Cost model viability | Track actual engineering hours for the 5-year run. Compare to traditional headcount model. Break-even analysis at 12 months. | Months 1-12 |

### Risk Mitigation

| Risk | Mitigation |
|------|-----------|
| "Anyone can do this with AI" — moat erosion | Accenture's moat is not the tools — it's the enterprise delivery wrapper: SLAs, compliance, Singpass certification, SAP integration expertise. AI makes the code cheap; Accenture makes it enterprise-safe. |
| AI-grounded responses are wrong or harmful | Confidence scoring on every SPBuddy response. Below threshold → "I'm not sure — let me connect you to an agent." Human review loop for first 1000 conversations. Never speculate. |
| Client discovers platform was AI-generated | Don't hide it — lead with it. "This is how we'll deliver 50-100 releases/year at half the cost. The AI is the method, not a secret." |
| Stubs don't reflect real system behaviour | Build stubs from SP Group's actual API documentation during due diligence. Include error cases, edge cases, and realistic latency. |

## Platform-Specific Requirements

### Web Application (Consumer App)

- **Framework:** Next.js 16 with React 19, App Router, server and client components
- **Rendering:** Client-side rendering for interactive screens, server components for static content
- **Styling:** Tailwind CSS 4 with custom design token system (energy-emerald/teal/cyan)
- **Design System:** Glassmorphic dark mode with three tiers (glass, glass-strong, glass-subtle), backdrop blur, gradient accents
- **Charts:** Recharts 3.x with gradient fills, glow effects, custom tooltips
- **Icons:** Lucide React for all UI icons
- **Mobile Constraint:** 430px max-width for app simulation; full-width for website pages
- **Browser Support:** Chrome 90+, Safari 15+, Firefox 90+, Edge 90+
- **Offline:** Graceful degradation — show cached data with "last updated" timestamps when API unavailable

### Web Application (Corporate Website)

- **Layout:** Desktop-first, max-w-7xl content containers, responsive down to 768px
- **Pages:** 15 pages across landing, services (6), portal (3), corporate (4), contact
- **Portal:** Authenticated customer dashboard mirroring mobile app data with desktop-optimised multi-column layout
- **SEO:** Server-rendered pages with meta tags, Open Graph, structured data for service pages
- **Shared Design System:** Same glassmorphic tokens and component patterns as mobile app

### API Platform

- **Architecture:** Service-repository pattern — route handlers → services → repositories → Prisma
- **Response Envelope:** `{ success: true, data: <payload> }` / `{ success: false, error: "<message>" }`
- **Endpoints:** 25+ REST endpoints covering users, premises, consumption, bills, EV stations, GreenUP, green goals, notifications, GIRO, applications, simulator, leaderboard
- **Authentication:** JWT-based with Singpass/MyInfo integration (stubbed for demo, real for production)
- **Rate Limiting:** 100 requests/minute per user, 1000 requests/minute per IP
- **Versioning:** URL-based (`/api/v1/`) for future breaking changes
- **CORS:** Restricted to app and website domains

### AI Assistant (SPBuddy)

- **Engine:** Anthropic Claude API for natural language understanding and response generation
- **Grounding:** Every response references actual user data (bill amounts, kWh readings, dates, tariff rates)
- **Context:** Receives user's premise ID, current bill, consumption history, and active goals as context
- **Fallback:** Regex-based pattern matching for offline/API-unavailable scenarios
- **Escalation:** Confidence threshold — below 70% → "Let me connect you to an agent"
- **Channels:** Available in mobile app (floating FAB), website portal (embedded chat), contact center (agent assist)
- **Privacy:** User data anonymised before sending to Claude API; no PII in prompts; responses cached for common queries

### Database

- **ORM:** Prisma 7.5 with PostgreSQL 16
- **Schema:** 16 tables covering users, premises, consumption, bills, transactions, appliances, goals, challenges, rewards, EV stations, notifications, leaderboard, GIRO, applications
- **Indexes:** Composite indexes on high-frequency query paths (consumption by premise+utility, bills by premise, notifications by user+read-status)
- **Seed Data:** Comprehensive Singapore-realistic seed covering 12 months of half-hourly consumption, 6 months of bills with line items, EV stations, GreenUP progression

### Infrastructure (AWS)

- **Compute:** ECS Fargate (auto-scaling 1-10 tasks based on CPU/memory)
- **Database:** RDS PostgreSQL 16 Multi-AZ (production), db.t3.micro (demo)
- **CDN:** CloudFront for static assets and API caching
- **Storage:** S3 for bill PDFs, user uploads, digital assets
- **Secrets:** AWS Secrets Manager for DB credentials, API keys
- **IaC:** AWS CDK (TypeScript) for all infrastructure
- **Region:** ap-southeast-1 (Singapore) for production; us-east-1 for demo
- **Monitoring:** CloudWatch Logs + Container Insights + custom dashboards

### CI/CD Pipeline

- **Source:** GitHub (main branch protected, PR-based workflow)
- **Pipeline stages:** Lint → Type Check → Unit Tests (100% business logic) → Integration Tests → Build → Security Scan (SAST) → Lighthouse Audit → Deploy to Staging → E2E Tests → Promote to Production
- **Release Cadence:** 1-2 releases per week for both app and web
- **Deployment:** Blue-green on ECS with health-check-based traffic shifting
- **Rollback:** Automatic rollback if health checks fail within 5 minutes
- **Feature Flags:** Progressive rollout by user segment, percentage, or premise

## Feature Scope & Priority Matrix

### Launch Wave Features (Weeks 1-12)

| # | Feature | Priority | Call Deflection | Journey |
|---|---------|----------|----------------|---------|
| F1 | Interactive Bill Explainer with AI chat | P0 | Very High — #1 call reason | Mei Ling |
| F2 | Native GIRO Setup (no WebView) | P0 | Very High — #2 call reason | Mei Ling |
| F3 | Native Service Flows (fee waiver, refund, payment arrangement, meter reading) | P0 | High | Mei Ling |
| F4 | SPBuddy AI Assistant (Claude-powered) | P0 | Very High — deflects across all categories | Mei Ling, Priya |
| F5 | Predictive Outage Alerts + Outage Map | P0 | High — #3 call reason | Mei Ling |
| F6 | Smart Notifications (bill anomaly, bill prediction, rate changes) | P0 | High — preemptive deflection | Mei Ling |
| F7 | Home Dashboard with live cost ticker | P1 | Low | Ryan |
| F8 | Consumption Monitoring (multi-period, electricity/water, neighbour comparison) | P1 | Medium | Ryan |
| F9 | EV Charging Station Finder (map, filters, availability) | P1 | Low | Ryan |
| F10 | EV Petrol vs Electric Calculator | P1 | Low | Ryan |
| F11 | GreenUP Rewards (tiers, challenges, leaderboard) | P1 | Low | Ryan |
| F12 | Green Goals Tracking (home/district/Singapore) | P1 | Low | Ryan |
| F13 | Energy Flow Dashboard | P1 | Low | Ryan |
| F14 | Profile & Multi-Premise Management | P1 | Medium | Mei Ling |
| F15 | SP Group Website (landing, 6 services, portal, corporate, contact) | P1 | Medium | David |
| F16 | Executive Dashboard (KPIs, platform health, call deflection, release velocity) | P1 | N/A — internal | David |
| F17 | Contact Center Integration (SPBuddy → live chat escalation, shared knowledge base) | P0 | Very High — unified CX | Priya |
| F18 | Demand Response Integration (EMA pilot, peak-shifting alerts) | P1 | Low | Ryan |
| F19 | CI/CD Pipeline (weekly releases, automated gates, zero-downtime deploy) | P2 | N/A — operational | Wei Ming |
| F20 | Observability Stack (APM, structured logging, business metrics dashboard) | P2 | N/A — operational | Wei Ming |
| F21 | Security Hardening (strict CSP, OWASP Top 10, PDPA compliance, encryption) | P2 | N/A — operational | Wei Ming |

### Continuous Evolution Features (Months 4-60)

| # | Feature | Priority | Notes |
|---|---------|----------|-------|
| F22 | Household Energy Audit (appliance disaggregation from smart meter data) | P1 | Requires ML model training on consumption patterns |
| F23 | Solar/Green Credits Marketplace (improved My Green Credits UX) | P1 | Depends on SP Group's REC partnerships |
| F24 | Smart Home Integration (IoT device control, automation rules) | P2 | Requires IoT protocol support (Matter, Zigbee) |
| F25 | Multi-Language Support (English, Mandarin, Malay, Tamil) | P1 | Singapore's 4 official languages |
| F26 | React Native Mobile App (native iOS/Android, biometric auth, push notifications) | P1 | Replaces web-based mobile app |
| F27 | Offline-Capable Service Flows (optimistic UI, sync on reconnect) | P2 | Critical for areas with poor connectivity |
| F28 | Open API for Third-Party Retailers | P2 | Enables OEM ecosystem integration |

## Functional Requirements

### FR Category 1: Bill Understanding & Payment (Call Deflection: Very High)

FR1.1: Users can view an interactive visual breakdown of any monthly bill showing electricity, water, gas, and GST as animated chart segments with dollar amounts and percentages
FR1.2: Users can tap any bill category to see unit-rate calculations (e.g., "324 kWh × $0.2691/kWh = $87.16"), daily average cost, and a sparkline showing daily usage for that category
FR1.3: Users can ask SPBuddy natural-language questions about their bill ("why is my bill higher?") and receive answers grounded in their actual consumption data with specific kWh values, dollar amounts, and time comparisons
FR1.4: Users can view month-over-month comparison for each bill category showing previous amount, current amount, and percentage change with visual indicators
FR1.5: Users completing the bill explainer for the first time are guided through a 5-step wizard showing bill composition, category deep-dive, neighbour comparison, usage heatmap, and personalised savings plan
FR1.6: Users can pay outstanding bills via PayNow QR, credit/debit card, or eGIRO — all natively in-app without WebView redirects
FR1.7: Users can set up eGIRO auto-payment by selecting their bank (DBS, OCBC, UOB, Maybank, ICBC, BOC, MariBank, Citibank, HSBC, Standard Chartered) and completing bank authorisation in-app
FR1.8: Users can view a chronological timeline of all bills and payments with status indicators (SUCCESS/PENDING/FAILED)
FR1.9: Users can download or share PDF bills from the bill detail screen via native device share sheet
FR1.10: Users receive a push notification when a new bill is available, including the amount and comparison to the previous month

### FR Category 2: Consumption Intelligence (Call Deflection: Medium)

FR2.1: Users can view electricity consumption at 4 granularities: half-hourly (today), daily (this week), weekly (this month), and monthly (this year) with bar charts showing kWh and cost
FR2.2: Users can toggle between electricity and water consumption views with distinct visual styling (teal for electricity, blue for water)
FR2.3: Users can see a live cost ticker on the home dashboard showing today's cumulative energy spend with animated counter, daily budget progress bar, and comparison to yesterday
FR2.4: Users can see their consumption compared to neighbour averages (district-level) via a reference line on the consumption chart
FR2.5: Users can tap any time period on the chart to see a detailed tooltip with exact kWh reading and dollar cost
FR2.6: Users can view a half-hourly consumption heatmap for any day with AI-identified peak labels (e.g., "Likely AC usage 2-5 PM")
FR2.7: Users receive proactive AI-generated insights (e.g., "Your AC usage spiked between 2-5 PM yesterday. Raising thermostat 1°C could save ~$8/month") displayed as dismissible cards on the home dashboard

### FR Category 3: Self-Service Operations (Call Deflection: Very High)

FR3.1: Users can request a fee waiver for late payment charges entirely in-app with confirmation and expected processing time
FR3.2: Users can set up a payment arrangement (installment plan) for outstanding balances with available options, amounts, and dates displayed in-app
FR3.3: Users can request a refund for credit balances by selecting utility type and refund method in-app
FR3.4: Users can submit meter readings via manual entry or photo upload during the meter reading window
FR3.5: Users can update their mailing address in-app without navigating to a separate website
FR3.6: Users can close their current utilities account and open a new one at a different address in a single guided move-house flow (4-step wizard) with optional GIRO transfer
FR3.7: Users can reschedule maintenance appointments in-app without calling

### FR Category 4: EV & Mobility (Call Deflection: Low)

FR4.1: Users can view nearby EV charging stations on a map and list view with real-time availability (available/total chargers), charger types (AC 7kW, AC 22kW, DC 50kW, DC 120kW), and distance
FR4.2: Users can filter stations by charger type, power rating range (0-120+ kW), availability, and SP-operated only
FR4.3: Users can calculate petrol vs. EV total cost of ownership by entering their current car model, monthly driving distance, and fuel type — using live Singapore petrol prices (Shell, SPC, Esso) and SP electricity tariff
FR4.4: The EV calculator displays monthly savings, annual savings, 5-year savings, and CO2 reduction in kg/year comparing the user's current petrol vehicle to available EV models
FR4.5: Users can view 6+ EV models available in Singapore with price, range, efficiency (kWh/100km), and calculated monthly running cost
FR4.6: Users can scan a charger QR code to start an EV charging session and pay in-app

### FR Category 5: Sustainability & Gamification (Call Deflection: Low)

FR5.1: Users can set and track Green Goals (e.g., "Use 15% less electricity") with on-track/off-track status, progress percentage, and estimated savings
FR5.2: Users can compare their consumption at three levels: their home, their district (e.g., D2 Anson, Tanjong Pagar), and Singapore national averages
FR5.3: Users can progress through 4 GreenUP tiers (Seed → Seedling → Sprout → Bloom) by earning XP from sustainability challenges
FR5.4: Users can complete challenges categorised by Energy, Food, and 3Rs with XP rewards, difficulty ratings, and time limits — where energy challenges are verified against actual smart meter data
FR5.5: Users can claim monthly reward vouchers (merchant discounts) based on their current tier level
FR5.6: Users can view a district leaderboard showing their rank against anonymised neighbours with weekly resets
FR5.7: Users can purchase Renewable Energy Certificates (My Green Credits) to offset their carbon footprint, priced in 25kWh blocks at $0.14 per block
FR5.8: Users can share sustainability achievements via native device share sheet

### FR Category 6: Proactive Alerts & Notifications (Call Deflection: High)

FR6.1: Users receive push notifications for bill anomalies when current-period consumption exceeds their 3-month rolling average by >20%
FR6.2: Users can see a projected end-of-month bill on the home dashboard based on current usage trajectory
FR6.3: Users receive notifications when electricity or water tariffs change, showing old rate, new rate, and estimated impact on their monthly bill
FR6.4: Users receive proactive outage alerts with affected area, estimated restoration time, and cause — before or during the outage
FR6.5: Users can view a live outage map showing affected areas with restoration progress
FR6.6: Users enrolled in demand response receive peak-event alerts with start time, duration, and reward amount

### FR Category 7: AI Assistant — SPBuddy (Call Deflection: Very High)

FR7.1: SPBuddy is accessible via a floating action button on every screen in the mobile app and as an embedded chat in the website portal
FR7.2: SPBuddy answers billing questions by referencing the user's actual bill line items, kWh readings, tariff rates, and month-over-month changes
FR7.3: SPBuddy provides personalised energy-saving recommendations citing specific data (time period, kWh delta, estimated dollar savings)
FR7.4: SPBuddy offers 5 quick-action chips on first open: "My bill", "Usage this week", "Green goals", "EV charging nearby", "Report outage"
FR7.5: SPBuddy suggests proactive follow-ups after answering a question (e.g., "Would you like to see how you compare to your neighbours?")
FR7.6: SPBuddy escalates to a live agent when confidence is below threshold, passing full conversation context so the user does not repeat their issue
FR7.7: SPBuddy's knowledge base is shared with the contact center — agents can search the same answers SPBuddy provides to customers

### FR Category 8: Executive & Operations (Internal)

FR8.1: The Head of Digital can view a real-time executive dashboard showing: digital adoption rate, call deflection rate, app store rating trend, DAU/MAU, with sparkline trend charts
FR8.2: The dashboard shows platform health: uptime percentage, API p95 latency, error rate, active users, and last deployment details
FR8.3: The dashboard shows feature adoption rates for key features (bill explainer, SPBuddy, EV calculator, GIRO setup) with completion funnels
FR8.4: The dashboard shows call center impact: calls deflected this month, estimated savings at $10/call, declining call volume trend, and top deflected call reasons
FR8.5: The dashboard shows engineering metrics: releases this month, test coverage, build time, deployment success rate, and release calendar
FR8.6: IT Operations can view deployment status, approve production promotions, and access structured logs with correlation IDs for end-to-end request tracing
FR8.7: IT Operations receives automated alerts when p95 latency exceeds 200ms, error rate exceeds 0.1%, or health checks fail

### FR Category 9: Account & Premise Management

FR9.1: Users can authenticate via Singpass (production) or email/OTP (fallback) to access their SP Group account
FR9.2: Users can view and edit their display name, email address, and phone number
FR9.3: Users can switch between multiple registered premises with per-premise consumption, billing, and service data
FR9.4: Users can invite household members to view and manage the utilities account via email or phone invitation
FR9.5: Users can toggle between dark mode and light mode with preference persisted across sessions

## Non-Functional Requirements

### Performance

NFR-P1: All pages load with Largest Contentful Paint (LCP) under 2 seconds on a 4G connection as measured by Lighthouse CI in the deployment pipeline
NFR-P2: API p95 latency is under 200ms for all endpoints as measured by APM monitoring, with auto-scaling triggered at p95 > 150ms
NFR-P3: SPBuddy AI responses return within 3 seconds including Claude API round-trip
NFR-P4: Interactive bill explainer animations render at 60fps on devices released after 2020
NFR-P5: The platform supports 1.4 million registered users with 50,000 concurrent sessions during billing cycle peaks

### Reliability

NFR-R1: Platform maintains 99.9%+ uptime (≤8.7 hours downtime/year) as measured by external synthetic monitoring, with SLA-backed financial penalties
NFR-R2: Zero-downtime deployments via blue-green deployment with automatic rollback if health checks fail within 5 minutes
NFR-R3: Database backups run daily with 7-day retention and point-in-time recovery capability
NFR-R4: All API endpoints implement circuit breakers for downstream service calls, returning cached/fallback data rather than errors
NFR-R5: Frontend components gracefully degrade when APIs are unavailable — showing cached data with "last updated" indicators rather than error screens

### Security

NFR-S1: All data encrypted at rest (AES-256) and in transit (TLS 1.3)
NFR-S2: Strict Content Security Policy with nonce-based script loading — no `unsafe-inline` or `unsafe-eval`
NFR-S3: Zero critical or high security vulnerabilities as validated by automated SAST/DAST scans in the CI pipeline; deployment blocked on violation
NFR-S4: OWASP Top 10 compliance validated quarterly via automated and manual penetration testing
NFR-S5: All API endpoints require JWT authentication with token refresh; session timeout at 30 minutes of inactivity
NFR-S6: Complete audit trail for all data access and modifications — user, action, resource, timestamp — queryable for PDPA compliance
NFR-S7: No PII in application logs; structured logging uses correlation IDs for request tracing without exposing personal data
NFR-S8: SPBuddy anonymises user data before sending to Claude API; no premise addresses, account numbers, or phone numbers in AI prompts

### Accessibility

NFR-A1: WCAG 2.1 AA compliance across all consumer-facing screens as validated by automated axe-core scans and manual audit
NFR-A2: All interactive elements have ARIA labels and support keyboard navigation
NFR-A3: Minimum text size of 14px (0.875rem) for body content; no text below 12px except for legal/copyright notices
NFR-A4: Colour contrast ratios meet WCAG AA standards (4.5:1 for normal text, 3:1 for large text) in both light and dark modes

### Testing

NFR-T1: 100% test coverage on business logic modules (services, repositories, calculation functions) enforced as CI gate — merge blocked below threshold
NFR-T2: 90%+ overall test coverage tracked and reported in CI dashboard
NFR-T3: End-to-end test suite covering all critical user flows (login, view consumption, pay bill, set up GIRO, use SPBuddy, view EV stations) executing in under 10 minutes with screenshot capture on failure
NFR-T4: Lighthouse performance audit runs on every deployment; score below 90 blocks promotion to production
NFR-T5: All API endpoints have integration tests validating request/response contracts against documented schemas

### Scalability

NFR-SC1: ECS auto-scaling from 1 to 10 tasks based on CPU utilisation (target: 70%) and memory utilisation (target: 80%)
NFR-SC2: Database supports read replicas for billing queries during peak billing cycle load
NFR-SC3: Platform architecture supports upgrade to higher-frequency meter data (5-minute intervals) without application code changes
NFR-SC4: Static assets served via CloudFront CDN with cache-control headers; API responses use stale-while-revalidate for consumption data

### Observability

NFR-O1: Structured JSON logging with correlation IDs across all API requests, enabling end-to-end request tracing from API gateway through backend to database
NFR-O2: Real-time APM dashboard showing latency, throughput, error rate, and apdex score per endpoint with automated alerting
NFR-O3: Business metrics dashboard (for Head of Digital) updating in real-time with digital adoption, call deflection, feature usage, and app store rating trends
NFR-O4: Alert notification via PagerDuty/OpsGenie when: uptime drops below 99.9%, p95 > 200ms for 5 minutes, error rate > 0.1%, or deployment health check fails
