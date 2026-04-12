---
stepsCompleted: ["step-01-validate-prerequisites"]
inputDocuments:
  - "docs/prfaq-sp-digital.md"
  - "SP Group app v15.6.0 screen recording (55 frames)"
  - "v0 prototype codebase (10 redesigned screens)"
  - "Smart meter / EMA research findings"
  - "sp-app codebase (Next.js 16 / React 19 / Prisma / AWS CDK)"
---

# SP Digital Experience Platform - Epic Breakdown

## Overview

This document provides the complete epic and story breakdown for the SP Group Digital Experience Platform redesign — an Accenture-led initiative to rebuild and run SP Group's consumer mobile app and web portal. Epics are organized into four tiers: As-Is (current app capabilities), Rebuilt (redesigned in prototype), New Features (innovation), and Technical (engineering platform).

**Priority Framework:**
- **P0:** Call center cost deflection — does this feature stop a phone call?
- **P1:** App store ratings, digital adoption, customer engagement
- **P2:** Stability, reliability, performance — zero downtime, bulletproof ops

## Requirements Inventory

### Functional Requirements

FR1: Users shall view electricity consumption data at half-hourly, daily, weekly, monthly, and yearly granularity with cost projections
FR2: Users shall view water consumption data at the same granularities as electricity
FR3: Users shall compare their consumption to neighbour averages and district/national benchmarks
FR4: Users shall receive AI-generated personalized energy insights based on smart meter pattern analysis
FR5: Users shall view an interactive bill breakdown showing each category (electricity, water, gas, GST) with visual charts, month-over-month comparison, and plain-language explanations
FR6: Users shall ask natural-language questions about their bill and receive data-backed answers (SPBuddy)
FR7: Users shall complete all utility service requests natively in-app (GIRO setup, fee waiver, refund, payment arrangement, meter reading, address update) without WebView redirects
FR8: Users shall view EV charging station locations on a map with real-time availability, charger type (AC/DC), power rating, and pricing
FR9: Users shall calculate petrol vs. EV total cost of ownership using live petrol prices and current electricity tariffs
FR10: Users shall participate in GreenUP sustainability challenges verified against actual meter data
FR11: Users shall earn bill credits (not just points) for reducing consumption by defined thresholds
FR12: Users shall view district-level leaderboards comparing household sustainability performance
FR13: Users shall set and track Green Goals (e.g., 15% less electricity) with progress visualization and estimated savings
FR14: Users shall view a live energy flow dashboard showing real-time household consumption patterns
FR15: Users shall manage multiple premises from a single account with per-premise consumption and billing
FR16: Users shall receive proactive alerts for bill anomalies, outage predictions, and rate changes
FR17: Users shall purchase Renewable Energy Certificates (My Green Credits) to offset carbon footprint
FR18: Users shall share sustainability achievements and invite household members
FR19: Users shall pay bills via PayNow QR, credit card, GIRO, or direct payment within the app
FR20: Users shall view and download PDF bills with full transaction history
FR21: Users shall receive a guided bill explainer wizard on first visit that walks through bill composition, neighbour comparison, usage heatmap, and personalized savings plan
FR22: Users shall opt into demand response programs and receive peak-shifting alerts
FR23: Users shall view a household energy audit showing estimated per-appliance consumption derived from smart meter data patterns

### Non-Functional Requirements

NFR1: App shall maintain 99.9%+ uptime SLA with zero-downtime deployments
NFR2: Page load time shall be under 2 seconds on 4G connections (Lighthouse performance score > 90)
NFR3: All user data processing shall comply with Singapore PDPA
NFR4: AI-powered insights shall be generated within SP Group's secure infrastructure; no data shared with third parties without explicit consent
NFR5: Platform shall support weekly release cycles with automated regression testing
NFR6: App shall support offline-capable service flows for critical actions
NFR7: Platform shall be architected to support higher-frequency meter data (down to 5-minute intervals) without code changes
NFR8: All native service flows shall complete in under 3 taps from the home screen
NFR9: App shall support dark mode and light mode with consistent design language
NFR10: Platform shall support 1.4 million concurrent users at peak load
NFR11: API response times shall be under 200ms for p95 latency
NFR12: Automated test coverage shall achieve 100% for business logic and 90%+ overall, enforced in CI pipeline
NFR13: Security: OWASP Top 10 compliance, API authentication via JWT/OAuth2, encrypted data at rest and in transit
NFR14: Accessibility: WCAG 2.1 AA compliance for all screens

### Additional Requirements (Architecture/Technical)

- Next.js 16 with React 19 server and client components
- Prisma ORM v7 with PostgreSQL database
- AWS CDK for infrastructure-as-code deployment
- Tailwind CSS 4 with custom design token system (energy-emerald/teal/cyan palette)
- Recharts for data visualization with gradient fills and glow effects
- Glassmorphic design system with backdrop blur, consistent across all screens
- Mobile-first responsive design (430px max width for app, responsive for web)
- RESTful API layer with 25+ endpoints covering all domain entities
- Integration points: SP smart meter data API, billing system, CRM, payment gateways (PayNow, GIRO, credit card processors), EMA demand response API, petrol price data feeds
- CI/CD pipeline supporting weekly releases with automated testing gates
- Observability stack: structured logging, APM, error tracking, real-time dashboards
- Feature flag system for progressive rollouts

### UX Design Requirements

UX-DR1: Implement glassmorphic card component system with glass-bg, glass-border, backdrop-blur tokens across all screens
UX-DR2: Implement energy color token system (energy-emerald, energy-teal, energy-cyan) with dark mode variants
UX-DR3: Build animated cost ticker component with real-time count-up effect and daily budget progress bar
UX-DR4: Build interactive donut/ring chart component for bill breakdown with segment-by-segment animation
UX-DR5: Build gradient bar chart component for consumption data with glow effects, neighbour reference lines, and rich tooltips showing both kWh and cost
UX-DR6: Build category breakdown card component with expandable detail view (sparklines, unit rate, daily average)
UX-DR7: Build AI insight card component with sparkle icon, dismissible, rotating insights with dot indicators
UX-DR8: Build promotional carousel component with gradient cards, shine-on-hover effect
UX-DR9: Build bill explainer wizard overlay with 5-step guided flow, animated transitions, and progress dots
UX-DR10: Build tier progress component for GreenUP with animated XP bar, level indicators, and reward unlock animations
UX-DR11: Build EV station card component with availability indicators (green/red), charger type badges, and distance
UX-DR12: Build floating bottom navigation bar with active state indicators, glassmorphic background
UX-DR13: Implement staggered entrance animations (fade-in-up, slide-in-right, bounce-in) for all screen content
UX-DR14: Build heatmap visualization component for daily usage patterns (7-day × 24-hour grid)

### FR Coverage Map

*(To be populated in step 2 — maps each FR to its epic and stories)*

## Epic List

### Tier 1: As-Is Capabilities (Current SP App)

| # | Epic | Priority | Call Deflection Impact |
|---|------|----------|----------------------|
| E1 | Account & Premise Management | P0 | High — "how do I update my address?" calls |
| E2 | Consumption Monitoring | P1 | Medium — "how much did I use?" calls |
| E3 | Billing & Payments | P0 | Very High — billing is #1 call driver |
| E4 | Utility Service Requests | P0 | Very High — GIRO, refunds, fee waivers |
| E5 | GreenUP Rewards Program | P1 | Low — engagement, not call deflection |
| E6 | EV Charging Network | P1 | Low — mostly EV owner engagement |
| E7 | Green Goals & Sustainability | P1 | Low — engagement and Green Plan 2030 |

### Tier 2: Rebuilt (Redesigned in Prototype)

| # | Epic | Priority | Status |
|---|------|----------|--------|
| E8 | Home Dashboard Redesign | P1 | ✅ Prototype complete |
| E9 | Bills Page Redesign | P0 | ✅ Prototype complete |
| E10 | Interactive Bill Explainer | P0 | ✅ Prototype complete |
| E11 | GreenUP Redesign | P1 | ✅ Prototype complete |
| E12 | EV Charging Redesign | P1 | ✅ Prototype complete |
| E13 | Green Goals Redesign | P1 | ✅ Prototype complete |
| E14 | Profile Redesign | P1 | ✅ Prototype complete |
| E15 | Energy Flow Dashboard | P1 | ✅ Prototype complete |

### Tier 3: New Features (Innovation)

| # | Epic | Priority | Wow Factor |
|---|------|----------|------------|
| E16 | SPBuddy AI Energy Coach | P0 | 🔥🔥🔥 — conversational AI for bill questions & energy advice |
| E17 | Petrol vs. EV Calculator | P1 | 🔥🔥 — timely with Singapore EV push |
| E18 | Demand Response Integration | P1 | 🔥🔥 — EMA pilot alignment, forward-looking |
| E19 | Predictive Outage Alerts | P0 | 🔥🔥🔥 — proactive > reactive, major call deflector |
| E20 | Household Energy Audit | P1 | 🔥🔥 — appliance-level insights from smart meter |
| E21 | Smart Notifications Engine | P0 | 🔥🔥 — anomaly alerts, bill predictions, rate changes |
| E22 | Digital Contact Center Integration | P0 | 🔥🔥🔥 — unified CX layer, shared AI engine |

### Tier 4: Technical Platform (For the Techie Head of Digital)

| # | Epic | Priority | Why It Matters |
|---|------|----------|----------------|
| E23 | CI/CD Pipeline & Release Automation | P2 | Weekly releases vs. current quarterly cycle |
| E24 | Observability & Monitoring Stack | P2 | Real-time dashboards, alerting, APM |
| E25 | Performance Engineering | P2 | Lighthouse 90+, sub-2s loads, p95 < 200ms |
| E26 | Automated Testing Framework | P2 | 100% business logic, 90%+ overall, E2E regression |
| E27 | Zero-Downtime Deployment | P2 | Blue-green/canary deployments on AWS |
| E28 | Security & PDPA Compliance | P2 | OWASP Top 10, encryption, audit logging |
| E29 | API Architecture & Integration Layer | P2 | Middleware to SP backend systems |
| E30 | Feature Flag & Progressive Rollout | P2 | Risk-free releases to 1.4M users |

---

## Epic E1: Account & Premise Management

**Goal:** Enable users to manage their SP Group account, personal information, premises, and household members entirely in-app, eliminating calls related to account administration.

### Story E1.1: User Authentication & Login

As a **SP Group customer**,
I want to **log in securely using my existing SP credentials (Singpass/email)**,
So that **I can access my utilities account without creating a new account**.

**Acceptance Criteria:**

**Given** a registered SP Group customer
**When** they open the app and enter their credentials
**Then** they are authenticated and see their personalized dashboard
**And** session persists securely across app restarts

### Story E1.2: View & Edit Personal Information

As a **SP Group customer**,
I want to **view and update my display name, email, and phone number**,
So that **SP Group can reach me through correct contact details without me calling to update**.

**Acceptance Criteria:**

**Given** an authenticated user on the Profile screen
**When** they tap on Personal Information
**Then** they see their current name, email, and phone number
**And** they can edit each field and save changes with confirmation

### Story E1.3: Multi-Premise Management

As a **SP Group customer with multiple properties**,
I want to **switch between premises and view per-premise consumption and billing**,
So that **I can manage all my utility accounts in one place**.

**Acceptance Criteria:**

**Given** a user with 2+ registered premises
**When** they tap the property selector dropdown
**Then** they see all their premises listed
**And** selecting a premise updates all dashboard data to that premise

### Story E1.4: Household Member Management

As a **premise owner**,
I want to **invite household members to view and manage our utilities account**,
So that **my family can monitor consumption without calling SP**.

**Acceptance Criteria:**

**Given** a premise owner on the Profile screen
**When** they tap the "+" button in the Members section
**Then** they can invite members via email or phone number
**And** invited members receive access with appropriate permissions

---

## Epic E2: Consumption Monitoring

**Goal:** Provide users with clear, actionable consumption data at multiple granularities, replacing passive bar charts with intelligent visualizations that answer "how much?" and "why?".

### Story E2.1: Electricity Consumption Dashboard

As a **SP Group customer**,
I want to **view my electricity consumption across today, this week, this month, and this year**,
So that **I understand my usage patterns without calling SP**.

**Acceptance Criteria:**

**Given** a user on the Home dashboard
**When** they select a time period (today/week/month/year)
**Then** they see a bar chart with gradient-filled bars showing consumption in kWh
**And** each bar shows cost on tap via tooltip
**And** a neighbour average reference line is displayed for comparison

### Story E2.2: Water Consumption Dashboard

As a **SP Group customer**,
I want to **toggle between electricity and water consumption views**,
So that **I can monitor both utilities in one place**.

**Acceptance Criteria:**

**Given** a user viewing the consumption chart
**When** they tap the Water toggle pill
**Then** the chart updates to show water consumption in m³ with blue gradient bars
**And** cost and period selectors work identically to electricity view

### Story E2.3: Live Cost Ticker

As a **SP Group customer**,
I want to **see my energy spend today as an animated live counter with budget tracking**,
So that **I'm aware of my daily energy cost in real time, like checking a taxi meter**.

**Acceptance Criteria:**

**Given** a user on the Home dashboard
**When** the page loads
**Then** they see "Spent today: $X.XX" with an animated count-up
**And** a progress bar shows % of daily budget used
**And** a badge shows "X% less vs yesterday" comparison

### Story E2.4: Half-Hourly Consumption Heatmap

As a **SP Group customer**,
I want to **tap any day to see a half-hourly consumption heatmap**,
So that **I can identify exactly when my usage peaks**.

**Acceptance Criteria:**

**Given** a user viewing daily consumption data
**When** they tap a specific day
**Then** they see a 24-hour heatmap with 30-min intervals
**And** peak periods are highlighted with AI-identified labels (e.g., "Likely AC usage")

---

## Epic E3: Billing & Payments

**Goal:** Transform billing from a PDF download into an interactive, self-service experience that answers every billing question before the customer thinks to call.

### Story E3.1: Outstanding Amount Display

As a **SP Group customer**,
I want to **see my current outstanding balance prominently on the Bills page**,
So that **I know what I owe without calling the hotline**.

**Acceptance Criteria:**

**Given** a user navigating to the Bills tab
**When** the page loads
**Then** they see the outstanding amount, address, utility type, and payment status
**And** a "Pay Now" CTA is immediately available

### Story E3.2: Transaction History Timeline

As a **SP Group customer**,
I want to **see a chronological timeline of all bills and payments**,
So that **I can track my payment history without calling SP**.

**Acceptance Criteria:**

**Given** a user on the Bills page
**When** they scroll past the outstanding amount
**Then** they see a timeline with date, description, amount, and status for each transaction
**And** bills link to the interactive bill explainer
**And** payments show SUCCESS/PENDING/FAILED status

### Story E3.3: Multi-Channel Payment

As a **SP Group customer**,
I want to **pay my bill via PayNow QR, credit card, or GIRO setup — all in-app**,
So that **I never need to call or visit a website to pay**.

**Acceptance Criteria:**

**Given** a user with an outstanding balance
**When** they tap "Pay Now"
**Then** they can choose PayNow QR, credit/debit card, or set up eGIRO
**And** payment confirmation is shown in-app with receipt

### Story E3.4: PDF Bill Download & Share

As a **SP Group customer**,
I want to **download or share my PDF bill from the bill detail screen**,
So that **I have records for tax/expense purposes**.

**Acceptance Criteria:**

**Given** a user viewing a bill detail
**When** they tap Download PDF or Share
**Then** the PDF is downloaded to device or shared via native share sheet

---

## Epic E4: Utility Service Requests (Native In-App)

**Goal:** Replace all WebView-based service flows with native, instant, in-app experiences. This epic is the single biggest call deflection opportunity — every broken WebView today equals a phone call.

### Story E4.1: eGIRO Setup (Native)

As a **SP Group customer**,
I want to **set up eGIRO auto-payment entirely within the app**,
So that **I don't need to navigate to a separate website that may fail to load**.

**Acceptance Criteria:**

**Given** a user without GIRO set up
**When** they navigate to GIRO setup (via Bills or Utilities Services)
**Then** they see supported banks (DBS, OCBC, UOB, Maybank, etc.)
**And** they can complete the setup with bank authorization in-app
**And** no WebView is used at any point

### Story E4.2: Fee Waiver Request (Native)

As a **SP Group customer with a late payment charge**,
I want to **request a fee waiver in-app**,
So that **I don't need to call the hotline for a simple request**.

**Acceptance Criteria:**

**Given** a user with an eligible late payment charge
**When** they navigate to Fee Waiver
**Then** they see eligible charges and can submit a waiver request
**And** they receive confirmation with expected processing time

### Story E4.3: Payment Arrangement Request (Native)

As a **SP Group customer who needs to arrange installment payments**,
I want to **set up a payment plan in-app**,
So that **I can manage financial difficulties without an embarrassing phone call**.

**Acceptance Criteria:**

**Given** a user with an outstanding balance
**When** they request a payment arrangement
**Then** they see available installment options with amounts and dates
**And** they can select and confirm a plan

### Story E4.4: Refund Request (Native)

As a **SP Group customer with a credit balance**,
I want to **request a refund in-app**,
So that **I don't have to call and wait on hold**.

**Acceptance Criteria:**

**Given** a user with a refundable credit
**When** they submit a refund request
**Then** they select the utility type and refund method
**And** they receive confirmation with expected processing time

### Story E4.5: Meter Reading Submission

As a **SP Group customer**,
I want to **submit my meter reading via the app (including photo upload)**,
So that **my bill is based on actual usage, not estimates**.

**Acceptance Criteria:**

**Given** a user during the meter reading window
**When** they navigate to Meter Reading
**Then** they can enter readings manually or take a photo of the meter
**And** submission is confirmed with next steps

### Story E4.6: Move House Flow (Open/Close/Transfer)

As a **SP Group customer moving house**,
I want to **close my current account and open a new one at my new address in a single flow**,
So that **I don't have to make multiple calls to manage the transition**.

**Acceptance Criteria:**

**Given** a user planning to move
**When** they initiate the Move House flow
**Then** they enter their move-out date, new address, and move-in date
**And** the system handles close + open as a single transaction

---

## Epic E5: GreenUP Rewards Program

**Goal:** Transform GreenUP from disconnected gamification (random F&B vouchers for quizzes) into a behaviour-driven engagement platform tied to real energy actions.

### Story E5.1: Tier Progress & Level System

As a **GreenUP member**,
I want to **see my current tier (Seed/Seedling/Sprout/Bloom), XP progress, and rewards I can unlock**,
So that **I'm motivated to engage with sustainability actions**.

**Acceptance Criteria:**

**Given** a user on the GreenUP tab
**When** the page loads
**Then** they see their tier with animated progress bar, XP needed for next level
**And** tier benefits and available rewards are clearly shown

### Story E5.2: Claimable Rewards

As a **GreenUP member**,
I want to **claim monthly reward vouchers based on my tier**,
So that **I get tangible value from my sustainability efforts**.

**Acceptance Criteria:**

**Given** a user with unclaimed rewards
**When** they view the Rewards section
**Then** they see available vouchers with merchant details, value, and claim button
**And** claiming shows redemption instructions and location

### Story E5.3: Sustainability Challenges

As a **GreenUP member**,
I want to **complete energy, food, and 3Rs challenges to earn points**,
So that **I'm guided toward specific sustainable behaviours**.

**Acceptance Criteria:**

**Given** a user viewing Challenges
**When** they browse available challenges (categorized by Energy, Food, 3Rs, Others)
**Then** each challenge shows points value, difficulty, progress, and time remaining
**And** challenges tied to meter data are auto-verified

### Story E5.4: District Leaderboard

As a **GreenUP member**,
I want to **see how my household ranks against others in my district**,
So that **I'm motivated by friendly competition to reduce consumption**.

**Acceptance Criteria:**

**Given** a user viewing the Leaderboard tab
**When** the page loads
**Then** they see the top 5 households (anonymized) with points and tier
**And** their own rank is highlighted with position and gap to next rank

---

## Epic E6: EV Charging Network

**Goal:** Reimagine the EV charging experience from a basic station list to an intelligent mobility assistant.

### Story E6.1: Station Finder with Map & List Views

As an **EV owner**,
I want to **find nearby charging stations on a map or list, with real-time availability**,
So that **I can plan my charging efficiently**.

**Acceptance Criteria:**

**Given** a user on the EV Charging tab
**When** the page loads
**Then** they see a toggleable map/list view of nearby stations
**And** each station shows name, distance, available/total chargers, and charger types (AC/DC with power rating)

### Story E6.2: Charger Filters

As an **EV owner**,
I want to **filter stations by charger type (AC/DC), power rating, availability, and operator**,
So that **I find compatible chargers quickly**.

**Acceptance Criteria:**

**Given** a user on the EV Charging page
**When** they open filters
**Then** they can select charger types, power range slider, and availability toggle
**And** results update instantly

### Story E6.3: Scan & Charge Flow

As an **EV owner at a charging station**,
I want to **scan the charger QR code to start a session and pay in-app**,
So that **charging is seamless**.

**Acceptance Criteria:**

**Given** a user at a compatible SP charger
**When** they tap Scan and scan the QR code
**Then** the charging session starts with live progress (kWh, cost, time)
**And** payment is processed automatically via linked payment method

---

## Epic E7: Green Goals & Sustainability

**Goal:** Enable users to set, track, and achieve energy reduction goals aligned with Singapore Green Plan 2030.

### Story E7.1: Goal Carousel & Progress Tracking

As a **SP Group customer**,
I want to **view my Green Goals with on-track/off-track status and progress visualization**,
So that **I know whether I'm meeting my sustainability targets**.

**Acceptance Criteria:**

**Given** a user on the Green Goals page
**When** the page loads
**Then** they see a carousel of goals (electricity reduction, water reduction)
**And** each goal shows status badge (ON TRACK/OFF TRACK), progress %, and estimated savings

### Story E7.2: Multi-Level Consumption Comparison

As a **SP Group customer**,
I want to **compare my consumption at home, district, and national levels**,
So that **I understand my impact in context**.

**Acceptance Criteria:**

**Given** a user on the Green Goals page
**When** they switch between "Your Home" / "Your District" / "Singapore" tabs
**Then** they see relevant consumption data, charts, and comparisons for each level

---

## Epic E8-E15: Rebuilt Screens (Prototype Complete)

*(These epics represent the v0 redesign work already completed in the prototype. Each contains stories for the specific UI components and interactions built.)*

**E8: Home Dashboard** — Header, cost ticker, quick actions, energy flow banner, consumption chart, AI insight card, promo carousel
**E9: Bills Page** — Header, PayNow banner, outstanding amount, property selector, transaction timeline
**E10: Interactive Bill Explainer** — Hero donut chart, category breakdown cards, AI chat explanation, month-over-month comparison, daily usage timeline, smart tips, bill actions, bill explainer wizard (5-step guided flow)
**E11: GreenUP** — Tier progress card, tab navigation, rewards list, challenges grid, leaderboard
**E12: EV Charging** — Header, search bar, station list, map view, charger filters, cost comparison card, scan button
**E13: Green Goals** — Header, goal carousel, consumption tabs, home/district/Singapore views, share button
**E14: Profile** — User card, premises section, settings list, app footer
**E15: Energy Flow Dashboard** — Energy flow diagram, power stats, device breakdown, flow timeline

---

## Epic E16: SPBuddy AI Energy Coach

**Goal:** Build a conversational AI assistant that answers billing questions, provides personalized energy advice, and deflects call center inquiries — the single most impactful feature for P0 (call deflection).

### Story E16.1: Conversational Bill Q&A

As a **SP Group customer**,
I want to **ask SPBuddy "Why is my bill higher this month?" and get a data-backed answer**,
So that **I don't need to call the hotline for billing inquiries**.

**Acceptance Criteria:**

**Given** a user with SPBuddy open
**When** they ask a billing question
**Then** SPBuddy analyzes their consumption data and bill line items
**And** responds with specific reasons (e.g., "Your electricity was 18% higher due to 3 more AC hours/day")
**And** suggests actionable ways to reduce next month

### Story E16.2: Personalized Energy Recommendations

As a **SP Group customer**,
I want to **receive specific, actionable energy-saving recommendations based on MY data**,
So that **I can reduce my bill with minimal effort**.

**Acceptance Criteria:**

**Given** a user viewing AI insights
**When** SPBuddy generates recommendations
**Then** each recommendation cites specific data (time, kWh, $)
**And** shows estimated monthly savings if adopted
**And** is not generic — references the user's actual patterns

### Story E16.3: Quick Chip Suggestions

As a **SP Group customer**,
I want to **tap predefined questions (quick chips) to get instant answers**,
So that **I can explore common queries without typing**.

**Acceptance Criteria:**

**Given** a user with SPBuddy open
**When** they see the quick chips
**Then** chips include: "My bill", "Usage this week", "Green goals", "EV charging nearby", "Report outage"
**And** tapping a chip sends the query and returns an instant response

### Story E16.4: SPBuddy Context in Bill Explainer

As a **SP Group customer viewing their bill breakdown**,
I want to **ask SPBuddy questions directly within the bill explainer**,
So that **I get contextual answers without navigating away**.

**Acceptance Criteria:**

**Given** a user on the bill explainer page
**When** they type in the AI Explanation input field
**Then** SPBuddy responds with bill-specific context
**And** quick chips are contextually relevant ("Why is water higher?", "Compare to neighbours")

---

## Epic E17: Petrol vs. EV Calculator

**Goal:** Provide a compelling, data-driven tool that shows EV ownership savings using live Singapore fuel prices — timed perfectly with Singapore's EV adoption push.

### Story E17.1: Petrol Cost Input

As a **car owner considering an EV**,
I want to **enter my current car model/fuel type and monthly driving distance**,
So that **I see my actual monthly petrol spend**.

**Acceptance Criteria:**

**Given** a user on the EV Calculator
**When** they enter their car details and driving distance
**Then** the app calculates monthly petrol cost using live prices from Shell, SPC, and Esso
**And** shows cost breakdown by fuel type and distance

### Story E17.2: EV Savings Comparison

As a **car owner considering an EV**,
I want to **see side-by-side comparison of petrol vs. electric costs**,
So that **I understand the financial benefit of switching**.

**Acceptance Criteria:**

**Given** a user has entered their driving profile
**When** they view the comparison
**Then** they see monthly savings in dollars, annual savings, CO2 reduction in kg
**And** comparison uses current SP electricity tariff for EV charging costs
**And** accounts for charging efficiency losses

### Story E17.3: EV Model Recommendations

As a **car owner considering an EV**,
I want to **see which EV models are available in Singapore with their specs and costs**,
So that **I can make an informed purchase decision**.

**Acceptance Criteria:**

**Given** a user viewing savings comparison
**When** they explore EV models
**Then** they see available models with range, battery capacity, price, and running cost per km

---

## Epic E18: Demand Response Integration

**Goal:** Integrate with EMA's demand response framework to enable consumers to participate in peak-shifting programs — forward-looking and aligns with regulatory direction.

### Story E18.1: Demand Response Opt-In

As a **SP Group customer**,
I want to **opt into demand response programs from the app**,
So that **I can earn incentives for shifting my usage during peak periods**.

**Acceptance Criteria:**

**Given** a user on the Green Goals or Profile page
**When** they enable demand response participation
**Then** they see program details, incentives, and obligations
**And** they can opt in with a single tap

### Story E18.2: Peak-Shifting Alerts

As a **demand response participant**,
I want to **receive push notifications and in-app alerts before peak periods**,
So that **I can reduce consumption and earn rewards**.

**Acceptance Criteria:**

**Given** a user enrolled in demand response
**When** a peak event is declared by EMA
**Then** they receive an alert with start time, duration, and reward amount
**And** the home dashboard shows a peak event banner

---

## Epic E19: Predictive Outage Alerts

**Goal:** Move from reactive ("my power is out, let me call") to proactive ("we see a potential issue in your area, here's what we're doing") — massive call deflection potential.

### Story E19.1: Proactive Outage Notifications

As a **SP Group customer**,
I want to **receive alerts before or during outages with estimated restoration time**,
So that **I don't need to call to report or inquire about outages**.

**Acceptance Criteria:**

**Given** an outage detected or predicted in the user's area
**When** the system detects the event
**Then** the user receives a push notification with area, expected duration, and cause
**And** the app home screen shows an outage banner with live updates

### Story E19.2: Outage Map & Status

As a **SP Group customer during an outage**,
I want to **see a live map of affected areas with restoration progress**,
So that **I know what's happening without calling**.

**Acceptance Criteria:**

**Given** an active outage in the user's area
**When** they open the app
**Then** they see a map overlay showing affected areas
**And** estimated restoration time updates in real-time

---

## Epic E20: Household Energy Audit

**Goal:** Provide appliance-level consumption estimates derived from smart meter data patterns — giving users actionable insights into where their energy goes.

### Story E20.1: Appliance-Level Disaggregation

As a **SP Group customer**,
I want to **see estimated consumption breakdown by appliance category (AC, water heater, refrigerator, etc.)**,
So that **I know which appliances cost me the most**.

**Acceptance Criteria:**

**Given** a user with smart meter data
**When** they view the Energy Audit
**Then** they see a pie/bar chart showing estimated consumption by appliance category
**And** each category shows monthly cost and % of total
**And** a disclaimer notes these are estimates based on consumption patterns

### Story E20.2: Appliance Savings Recommendations

As a **SP Group customer**,
I want to **see specific recommendations for each high-consumption appliance**,
So that **I can take targeted action to reduce my bill**.

**Acceptance Criteria:**

**Given** a user viewing appliance breakdown
**When** they tap on a high-consumption appliance (e.g., AC)
**Then** they see usage patterns, cost, and actionable tips
**And** estimated savings if they follow the recommendation

---

## Epic E21: Smart Notifications Engine

**Goal:** Build an intelligent notification system that alerts users to anomalies, predictions, and opportunities — turning the app from "I go check" to "it comes to me".

### Story E21.1: Bill Anomaly Detection

As a **SP Group customer**,
I want to **be alerted if my current usage is tracking significantly above my typical pattern**,
So that **I can investigate early and avoid a surprise bill**.

**Acceptance Criteria:**

**Given** a user's current period consumption exceeds their rolling average by > 20%
**When** the anomaly is detected
**Then** the user receives a push notification: "Your electricity usage is 25% above normal this week"
**And** tapping opens the consumption view with the anomaly highlighted

### Story E21.2: Bill Prediction

As a **SP Group customer**,
I want to **see a projected end-of-month bill based on my current usage trajectory**,
So that **I can adjust behaviour before the bill arrives**.

**Acceptance Criteria:**

**Given** mid-month consumption data
**When** the user views the home dashboard
**Then** they see "Projected bill: $XX — $Y more/less than last month"

### Story E21.3: Rate Change Notifications

As a **SP Group customer**,
I want to **be notified when electricity or water tariffs change**,
So that **I understand why my next bill may differ**.

**Acceptance Criteria:**

**Given** a tariff change is announced
**When** the effective date approaches
**Then** the user receives a notification with old rate, new rate, and estimated impact on their bill

---

## Epic E22: Digital Contact Center Integration

**Goal:** Unify the app and contact center into a single customer experience layer — SPBuddy powers both channels, shared knowledge base, seamless escalation.

### Story E22.1: In-App Live Chat Escalation

As a **SP Group customer who can't resolve their issue via SPBuddy**,
I want to **escalate to a live agent within the app without calling**,
So that **I get human help without leaving the digital channel**.

**Acceptance Criteria:**

**Given** a user in SPBuddy chat
**When** they request a human agent or SPBuddy detects it can't resolve the query
**Then** the chat seamlessly transfers to a live agent with full conversation context
**And** the user doesn't need to repeat their issue

### Story E22.2: Case Tracking

As a **SP Group customer with an open service request**,
I want to **see the status of my request in the app Notifications section**,
So that **I don't need to call to ask "what's happening with my request?"**.

**Acceptance Criteria:**

**Given** a user with an open service request
**When** they check Notifications > Tasks
**Then** they see each request with status (Submitted/In Progress/Resolved) and timeline

---

## Epic E23: CI/CD Pipeline & Release Automation

**Goal:** Demonstrate to the Head of Digital that Accenture can ship weekly releases with confidence — vs. the current quarterly cycle.

### Story E23.1: Automated Build & Deploy Pipeline

As a **development team member**,
I want to **merge code to main and have it automatically built, tested, and deployed to staging**,
So that **we maintain weekly release velocity**.

**Acceptance Criteria:**

**Given** a PR is merged to main
**When** the CI pipeline runs
**Then** it executes lint, type check, unit tests, integration tests, and build
**And** on success, deploys to staging automatically
**And** on failure, blocks deployment and notifies the team

### Story E23.2: Production Release with Approval Gate

As a **release manager**,
I want to **promote a staging build to production with a single approval**,
So that **releases are controlled but not bottlenecked**.

**Acceptance Criteria:**

**Given** a staging build has passed all automated checks
**When** a release manager approves the promotion
**Then** the build deploys to production via blue-green deployment
**And** automatic rollback triggers if health checks fail within 5 minutes

---

## Epic E24: Observability & Monitoring Stack

**Goal:** Show the Head of Digital that we'll have better visibility into app health than they've ever had — real-time dashboards, proactive alerting, and root cause analysis.

### Story E24.1: Application Performance Monitoring

As an **operations engineer**,
I want to **see real-time dashboards showing API latency, error rates, throughput, and apdex score**,
So that **I detect issues before users do**.

**Acceptance Criteria:**

**Given** the monitoring stack is deployed
**When** I open the APM dashboard
**Then** I see real-time metrics for every API endpoint
**And** alerts fire automatically when p95 latency exceeds 200ms or error rate exceeds 0.1%

### Story E24.2: Structured Logging & Error Tracking

As a **developer debugging a production issue**,
I want to **search structured logs with correlation IDs across all services**,
So that **I can trace any user request end-to-end**.

**Acceptance Criteria:**

**Given** a reported user issue
**When** I search by correlation ID
**Then** I see the full request lifecycle: API gateway → backend → database → response
**And** errors include stack traces, user context, and affected premise

### Story E24.3: Business Metrics Dashboard

As the **Head of Digital at SP Group**,
I want to **see a real-time dashboard with digital adoption rate, DAU/MAU, feature usage, call deflection rate, and app store rating trends**,
So that **I can measure the ROI of the platform investment**.

**Acceptance Criteria:**

**Given** the business metrics dashboard is live
**When** the Head of Digital opens it
**Then** they see KPIs updating in real-time with trend lines and targets
**And** they can filter by time period, premise type, and user segment

---

## Epic E25: Performance Engineering

**Goal:** Guarantee sub-2-second page loads and Lighthouse scores above 90 — making the app feel instant.

### Story E25.1: Performance Budget Enforcement

As a **developer**,
I want to **have automated performance budgets that block deployments exceeding thresholds**,
So that **performance never regresses**.

**Acceptance Criteria:**

**Given** a build in the CI pipeline
**When** Lighthouse audit runs against key pages
**Then** deployment blocks if performance score < 90, LCP > 2s, or bundle size increases > 5%

### Story E25.2: Edge Caching & CDN Optimization

As an **end user**,
I want to **the app to load instantly even on 4G connections**,
So that **the experience is snappy regardless of network**.

**Acceptance Criteria:**

**Given** the app is deployed with CDN
**When** a user loads any page
**Then** static assets are served from edge with cache-control headers
**And** API responses use stale-while-revalidate for consumption data

---

## Epic E26: Automated Testing Framework

**Goal:** Build confidence that weekly releases won't break anything — comprehensive test coverage is the foundation of release velocity.

### Story E26.1: Unit Test Suite

As a **developer**,
I want to **run unit tests with 100% coverage on business logic and 90%+ overall**,
So that **every line of logic is verified and regressions are impossible to miss**.

**Acceptance Criteria:**

**Given** the test suite
**When** `npm test` runs
**Then** all unit tests pass with 100% coverage on business logic modules
**And** overall project coverage is 90%+
**And** CI pipeline blocks merges that drop below thresholds
**And** coverage reports are generated, tracked over time, and visible in the business metrics dashboard

### Story E26.2: E2E Regression Suite

As a **QA engineer**,
I want to **run end-to-end tests covering all critical user flows**,
So that **every release is validated against real user journeys**.

**Acceptance Criteria:**

**Given** the E2E test suite
**When** tests run against staging
**Then** critical flows are tested: login, view consumption, pay bill, set up GIRO, view EV stations, SPBuddy chat
**And** tests run in under 10 minutes with screenshot capture on failure

---

## Epic E27: Zero-Downtime Deployment

**Goal:** Guarantee that releases never cause user-visible downtime — critical for P2 (reliability).

### Story E27.1: Blue-Green Deployment Strategy

As an **operations engineer**,
I want to **deploy new versions alongside the current version and switch traffic atomically**,
So that **users never see downtime during releases**.

**Acceptance Criteria:**

**Given** a new version ready for production
**When** it's deployed
**Then** the new version runs on a separate environment
**And** traffic switches only after health checks pass
**And** instant rollback is available if issues are detected

---

## Epic E28: Security & PDPA Compliance

**Goal:** Ensure the platform meets enterprise security standards and Singapore's data protection requirements.

### Story E28.1: OWASP Top 10 Hardening

As a **security engineer**,
I want to **validate the platform against OWASP Top 10 vulnerabilities**,
So that **we pass SP Group's security review**.

**Acceptance Criteria:**

**Given** the production deployment
**When** security scans run
**Then** no critical or high vulnerabilities are found
**And** all API endpoints require authentication
**And** input validation prevents injection attacks

### Story E28.2: Data Encryption & Audit Logging

As the **SP Group compliance team**,
I want to **all personal data encrypted at rest and in transit, with complete audit trails**,
So that **we comply with PDPA requirements**.

**Acceptance Criteria:**

**Given** the platform handles customer PII
**When** data is stored or transmitted
**Then** all data is encrypted (AES-256 at rest, TLS 1.3 in transit)
**And** all data access is logged with timestamp, user, action, and resource

---

## Epic E29: API Architecture & Integration Layer

**Goal:** Build a robust middleware layer that connects the new frontend to SP Group's existing backend systems — billing, metering, CRM, payments.

### Story E29.1: API Gateway & Authentication

As a **developer**,
I want to **a unified API gateway with JWT authentication, rate limiting, and request routing**,
So that **all frontend-to-backend communication is secure and performant**.

**Acceptance Criteria:**

**Given** the API gateway is deployed
**When** the app makes API requests
**Then** requests are authenticated via JWT, rate-limited, and routed to appropriate backend services
**And** p95 latency < 200ms through the gateway

### Story E29.2: SP Backend Integration Adapters

As a **integration engineer**,
I want to **adapters that translate between our API contracts and SP Group's existing systems**,
So that **we can connect to billing, metering, and CRM without modifying SP's backends**.

**Acceptance Criteria:**

**Given** SP Group's existing API documentation
**When** adapters are built
**Then** the platform reads consumption data, billing data, and customer data from SP systems
**And** writes service requests, payment transactions, and preferences back
**And** adapters handle SP API versioning and error responses gracefully

---

## Epic E30: Feature Flag & Progressive Rollout

**Goal:** Ship features to 1.4M users safely — progressive rollouts protect against blast radius.

### Story E30.1: Feature Flag Infrastructure

As a **product manager**,
I want to **enable/disable features for specific user segments without code deployment**,
So that **we can progressively roll out features and instantly kill problematic ones**.

**Acceptance Criteria:**

**Given** the feature flag system is deployed
**When** a flag is toggled
**Then** targeted users see/don't see the feature within 30 seconds
**And** flags support: percentage rollout, user segment targeting, premise-based targeting
**And** flag state changes are logged for audit
