---
stepsCompleted: ["step-01-init", "step-02-audit", "step-03-design-system", "step-04-screens", "step-05-interactions", "step-06-accessibility", "step-07-complete"]
inputDocuments:
  - "docs/prd.md"
  - "docs/architecture.md"
  - "SP Group app v15.6.0 screen recording (55 frames)"
  - "v0.dev generated components"
  - "Party mode UX reviews (Sally, John, Amelia)"
workflowType: 'ux-design'
project_name: 'SP Digital Experience Platform'
---

# UX Design Specification

## Design Philosophy

The SP Digital Experience Platform replaces a functionally adequate but visually dated utility app with a consumer-grade experience that makes energy management as intuitive as checking a bank balance. The design must serve two audiences simultaneously: Auntie Mei Ling (58, checks her bill monthly, needs clarity) and David (45, Head of Digital, evaluates with DevTools).

**Core principles:**
1. **Clarity over decoration** — Every visual element must answer a question or enable an action. No decorative-only elements.
2. **Data-grounded intelligence** — AI insights reference specific kWh readings, dollar amounts, and dates. Never generic.
3. **Progressive disclosure** — Simple overview first, detail on demand. The bill total is visible; the kWh breakdown is one tap away.
4. **Graceful degradation** — Every component defines three states: loading (skeleton), error (fallback + retry), and empty (explanation + guidance).
5. **Accessibility by default** — WCAG 2.1 AA compliance. Minimum 14px body text. ARIA labels on all interactive elements. Keyboard navigable.

## Design System

### Color Tokens

**Primary Palette (Light Mode — default):**

| Token | Value | Usage |
|-------|-------|-------|
| `--background` | #f8fafc | Page background |
| `--foreground` | #1e293b | Primary text |
| `--primary` | #10b981 | Primary actions, active states, energy-positive indicators |
| `--accent` | #14b8a6 | Secondary accent, chart elements |
| `--destructive` | #ef4444 | Errors, negative trends, urgent alerts |
| `--muted` | #f1f5f9 | Subtle backgrounds, disabled states |
| `--muted-foreground` | #64748b | Secondary text, labels |

**Energy-Specific Tokens:**

| Token | Light | Dark | Usage |
|-------|-------|------|-------|
| `--energy-emerald` | #10b981 | #34d399 | Electricity, positive savings, on-track goals |
| `--energy-teal` | #14b8a6 | #2dd4bf | Water, secondary energy accent |
| `--energy-cyan` | #06b6d4 | #22d3ee | EV charging, tertiary accent |

**Glassmorphism Tokens:**

| Token | Light | Dark | Usage |
|-------|-------|------|-------|
| `--glass-bg` | rgba(255,255,255,0.85) | rgba(30,41,59,0.7) | Card backgrounds |
| `--glass-border` | rgba(226,232,240,0.6) | rgba(71,85,105,0.4) | Card borders |

**SP Group Brand Integration:**
- SP Group's brand red (#CC0000) should be introduced as an accent for official SP branding elements (logo placement, official notices, "Powered by SP Group" badges)
- The energy-emerald palette remains primary for the consumer experience — green = energy = sustainability
- Brand red is NOT used for errors (that's `--destructive`), only for brand identity

### Typography

| Level | Size | Weight | Line Height | Usage |
|-------|------|--------|-------------|-------|
| H1 | 24px (1.5rem) | Bold (700) | 1.3 | Page titles |
| H2 | 20px (1.25rem) | Semibold (600) | 1.35 | Section headers |
| H3 | 18px (1.125rem) | Semibold (600) | 1.4 | Card titles |
| Body | 16px (1rem) | Regular (400) | 1.5 | Body text |
| Body Small | 14px (0.875rem) | Regular (400) | 1.5 | Secondary text, labels |
| Caption | 12px (0.75rem) | Medium (500) | 1.4 | Timestamps, badges, metadata |
| **Minimum** | **12px** | — | — | **Nothing smaller. WCAG AA requirement.** |

**Font:** Inter (variable weight, loaded via next/font/google)

### Glassmorphism Tiers

| Tier | Opacity | Blur | Border | Usage |
|------|---------|------|--------|-------|
| `glass` | 70% white / 70% dark | 20px | 1px white 30% / white 10% | Standard cards, containers |
| `glass-strong` | 85% / 85% | 30px | 1px white 40% / white 15% | Headers, important panels, bottom nav |
| `glass-subtle` | 40% / 40% | 12px | 1px white 20% / white 8% | Secondary elements, hover states |

### Animation Library

| Animation | Class | Duration | Easing | Usage |
|-----------|-------|----------|--------|-------|
| Fade In Up | `animate-fade-in-up` | 500ms | ease-out | Cards appearing on page load |
| Slide In Right | `animate-slide-in-right` | 400ms | ease-out | Alert banners, list items |
| Bounce In | `animate-bounce-in` | 600ms | spring | Success badges, notifications |
| Pulse Glow | `animate-pulse-glow` | 2s loop | ease-in-out | Live indicators, CTAs |
| Shimmer | `animate-shimmer` | 2s loop | ease-in-out | Loading skeletons, golden highlights |
| Float | `animate-float` | 6s loop | ease-in-out | Background decorative elements |

**Stagger delays:** 100ms increments (`delay-100` through `delay-700`) for sequenced card entry.

**Interaction feedback:**
- `press-effect` — scale to 0.96 on press (mobile tap feedback)
- `hover-lift` — translate up 2px on hover (desktop hover feedback)
- `spring-button` — spring-physics scale with cubic-bezier timing

### Component States

Every data-dependent component MUST define three states:

**Loading State:**
- Skeleton shimmer placeholder matching the component's layout
- No text, no data, just gray animated shapes
- Uses `Skeleton` component with appropriate dimensions

**Error State:**
- Fallback to last-known-good data if available
- Subtle amber banner: "Data may be outdated. Last updated [timestamp]." with retry button
- Never show a blank screen or raw error message

**Empty State:**
- Friendly illustration or icon (muted, not attention-grabbing)
- Explanation: "No bills yet — your first bill will appear after your first billing cycle."
- Action if applicable: "Set up your account →"

## Screen Inventory

### Mobile App (430px max-width)

| Screen | Route | Purpose | Key Components |
|--------|-------|---------|---------------|
| Home Dashboard | `/` | Energy overview, quick actions, AI insights | Header, CostTicker, QuickActions, LiveEnergyBanner, PropertySelector, EnergyChart, AIInsightCard, PromoCarousel |
| Bills | `/bills` | Billing history, outstanding amounts | BillsHeader, PayNowBanner, OutstandingAmount, PropertySelector, TransactionTimeline |
| Bill Explainer | `/bills/[id]` | Interactive bill breakdown with AI chat | BillDetailHeader, BillHeroChart, CategoryBreakdown, AIExplanation (with working chat), MonthComparison, DailyUsageTimeline, SmartTips, BillActions, BillExplainerWizard |
| GreenUP | `/greenup` | Sustainability gamification | TierProgressCard, TabNavigation, RewardsList, ChallengesGrid, Leaderboard |
| EV Charging | `/ev-charging` | Station finder | EVHeader, SearchBar, StationList, MapView, ChargerFilters, ViewToggle |
| EV Calculator | `/ev-calculator` | Petrol vs EV savings | VehicleInput, CostComparison, EVRecommendations, SavingsSummary |
| Green Goals | `/green-goals` | Sustainability targets | GoalsHeader, GoalCarousel, ConsumptionTabs, YourHomeView, DistrictView, SingaporeView |
| Profile | `/profile` | Account, settings, dark mode | ProfileHeader, UserCard, PremisesSection, SettingsList |
| Energy Flow | `/energy-flow` | Live energy visualization | EnergyFlowDiagram, PowerStats, DeviceBreakdown, FlowTimeline |
| Dashboard | `/dashboard` | Executive KPIs (Head of Digital) | KPICards, PlatformHealth, FeatureUsage, CallCenterImpact, ReleaseVelocity |
| Simulator | `/simulator` | Bill prediction calculator | CrystalBall, PresetButtons, SliderControls, SavingsSummary |
| Utilities | `/utilities` | Service portal | MovingHouseCard, QuickActionGrid, ApplicationTracker, ServiceAccordions |
| Moving House | `/utilities/moving` | 4-step move wizard | StepIndicator, AddressInput, PropertyTypeSelector, GIROTransfer, ConfirmationSummary |

### Website (Desktop, full-width)

| Screen | Route | Purpose |
|--------|-------|---------|
| Landing | `/website` | Corporate homepage with hero, services, app showcase |
| Services Hub | `/website/services` | 6 service cards with audience filter |
| Electricity | `/website/services/electricity` | Tariffs, how it works, OEM explainer |
| Water | `/website/services/water` | Tariff tiers, conservation tips |
| EV Charging | `/website/services/ev-charging` | Network stats, map, pricing plans |
| Solar | `/website/services/solar` | Solar PPA, Green Credits |
| District Cooling | `/website/services/district-cooling` | Tengah, efficiency stats |
| Smart Home | `/website/services/smart-home` | Smart meter, automation, SPBuddy |
| Login | `/website/login` | Singpass + email/OTP login |
| Portal Dashboard | `/website/portal` | Desktop customer dashboard (3-column) |
| Portal Bills | `/website/portal/bills` | Desktop bill detail (2-column) |
| About | `/website/about` | Company info, leadership, timeline |
| Sustainability | `/website/about/sustainability` | Green Plan 2030, impact stats |
| Careers | `/website/about/careers` | Job listings, culture |
| Contact | `/website/contact` | Contact form, FAQ accordion, emergency numbers |

## Interaction Patterns

### Navigation

**Mobile:** 5-tab bottom navigation (Home, Bills, GreenUP, EV, Profile) with floating glassmorphic bar. Active tab has emerald highlight + dot indicator. SPBuddy FAB in bottom-right on all screens.

**Website:** Fixed top nav with logo, nav links, user menu. Portal has secondary horizontal nav (Dashboard, Bills, Consumption, Services, GreenUP, EV, Profile).

### Data Fetching & Display

1. Page loads → skeleton placeholders appear immediately
2. API call fires → data arrives → skeleton replaced with real content (fade transition)
3. If API fails → fallback to cached/default data with amber "Data may be outdated" banner
4. If no data exists → empty state with explanation and guidance

### Bill Explainer Flow

1. User taps a bill in the transaction timeline → navigates to `/bills/[id]`
2. First visit: wizard overlay launches automatically (5 steps, skippable)
3. Bill detail shows: hero donut chart → category cards → AI chat → comparison → timeline → tips → actions
4. AI chat is interactive: user types question → typing indicator → grounded response with specific data
5. Quick chips provide common questions: "Why is water higher?", "Compare to neighbours", "How to save more?"

### SPBuddy Interaction

1. User taps FAB → chat panel slides up (75vh)
2. Greeting message + 5 quick chips displayed
3. User types or taps chip → message appears in chat → typing indicator (600-1200ms) → bot response
4. Bot responses reference actual bill amounts, kWh values, and dates
5. After each response, bot suggests a follow-up question
6. Close button resets conversation

### Agentic Actions (SPBuddy)

1. User asks SPBuddy to take an action (e.g., "Set up GIRO")
2. SPBuddy confirms: "I'll set up GIRO auto-payment with DBS for 18 Everton Rd. Confirm?"
3. User confirms → action executes through Port → success/failure displayed
4. All actions logged to audit trail

## Accessibility Requirements

### WCAG 2.1 AA Compliance

| Requirement | Implementation |
|------------|---------------|
| **Text contrast** | 4.5:1 for normal text, 3:1 for large text. Verified in both light and dark modes. |
| **Minimum text size** | 12px (0.75rem) absolute minimum. 14px (0.875rem) for body text. |
| **Focus indicators** | 2px ring in energy-emerald on all focusable elements. Visible in both themes. |
| **ARIA labels** | All icon-only buttons, chart elements, and interactive cards have descriptive aria-labels. |
| **Keyboard navigation** | All features accessible via keyboard. Tab order follows visual order. |
| **Skip navigation** | "Skip to main content" link as first focusable element. |
| **Screen reader** | Tested with VoiceOver (iOS) and NVDA (Windows). Charts have text alternatives. |
| **Motion** | `prefers-reduced-motion` media query disables all non-essential animations. |
| **Color independence** | No information conveyed by color alone. Icons/labels/patterns accompany all color-coded data. |

### Multi-Language (Future)

- i18n framework selected: `next-intl`
- Four languages: English (default), Mandarin (简体中文), Malay (Bahasa Melayu), Tamil (தமிழ்)
- RTL not required (none of the four languages are RTL)
- Translation keys extracted from all static text
- Dynamic content (AI responses, bill data) served in English initially

## UX Issues Tracker (from Party Mode Review)

| # | Issue | Severity | Status | Fix |
|---|-------|----------|--------|-----|
| 1 | Bill Explainer AI chat send button does nothing | Critical | 🔧 Fixing | Wire to response logic with bill-specific answers |
| 2 | Dead quick action buttons (Scan QR, More) | Critical | 🔧 Fixing | Add coming-soon modal overlay |
| 3 | Dark mode hardcoded, no light mode | High | 🔧 Fixing | Remove hardcoded dark class, wire theme toggle |
| 4 | Notification count "22" unrealistic | High | 🔧 Fixing | Change to 3 |
| 5 | Chart shows 8 months of zeros | High | 🔧 Fixing | Truncate to current month |
| 6 | text-[10px] fails WCAG AA (63 occurrences) | High | 🔧 Fixing | Global replace to text-xs (12px) |
| 7 | No ARIA labels on interactive elements | Medium | 🔧 Fixing | Add to BottomNav, QuickActions, Header, SPBuddy |
| 8 | No loading/skeleton states | Medium | 🔧 Fixing | Skeleton component + useApi hook |
| 9 | No SP Group branding (red accent) | Medium | Deferred | Requires SP brand guide; add after meeting |
| 10 | No outage map | Medium | Deferred | New feature — add to sprint backlog |
| 11 | No Singpass mock flow | Low | Deferred | Login page exists; mock Singpass button present |
| 12 | No multi-language support | Low | Deferred | i18n framework planned for Continuous Evolution phase |
