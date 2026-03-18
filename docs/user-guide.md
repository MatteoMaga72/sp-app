# SP App User Guide

## 1. Getting Started

The SP App is a mobile-first utilities management application for Singapore Power customers. It provides a unified interface for monitoring energy and water consumption, managing bills, tracking sustainability goals, and accessing a range of self-service utilities operations.

### Navigation

The app uses a five-tab bottom navigation bar that persists across all screens:

| Tab | Label | Destination |
|-----|-------|-------------|
| 1 | Home | Main dashboard with consumption chart, quick actions, alerts, and promotions |
| 2 | Bills | Bills list, outstanding amounts, payment options, and transaction history |
| 3 | GreenUP | Gamified sustainability program with rewards, quests, and leaderboards |
| 4 | EV Charging | Electric vehicle charging station finder with availability data |
| 5 | Profile | Account information, premises management, and app settings |

Additional pages accessible via links from the dashboard include Green Goals, Utilities Services, Moving House wizard, Bill Simulator, Energy Flow Dashboard, and individual Bill Detail views.

The SP Buddy chatbot is available globally as a floating action button in the bottom-right corner on every screen.

---

## 2. Home Dashboard

### Greeting Header

The top of the home screen displays a personalized greeting with the user's avatar initials and name. A notification bell icon in the top-right corner shows an unread count badge. Below the greeting is a prompt to share the utilities account with family members.

### Energy Flow Banner

A gradient banner labeled "NEW: Live Energy Flow Dashboard" links to the real-time energy visualization. Tapping it navigates to the Energy Flow page.

### Quick Actions

A four-column grid of circular icon buttons provides shortcuts to:

- **Scan QR** -- Opens the QR scanner for PayNow payments
- **Utilities Services** -- Navigates to the self-service portal
- **Green Goals** -- Navigates to sustainability tracking
- **More** -- Additional actions menu

### Alert Banner

An orange-bordered alert card displays important notices such as scheduled maintenance dates or scam alerts. Tapping the banner navigates to the relevant detail.

### Consumption Chart

The consumption chart is the centerpiece of the home dashboard. It consists of:

- **Address Selector**: A dropdown at the top to switch between registered premises (defaults to the primary address).
- **Utility Toggle**: Two pill buttons to switch between Electricity (teal accent) and Water (blue accent). The active utility determines chart colors and data units (kWh vs cubic meters).
- **Period Selector**: Chevron arrows and a dropdown to cycle through four time periods -- Today, This Week, This Month, and This Year. You can tap the period label for a dropdown menu or use the left/right arrows to cycle.
- **Bar Chart**: An interactive bar chart rendered with recharts. Each bar represents a time interval within the selected period. Bars with data use the accent color; future/empty bars appear gray. Hovering or tapping a bar shows a tooltip with the exact date and reading value.
- **Legend**: Below the chart, a legend shows the unit label and the date the data was last updated.

### Energy Insights Banner

A teal call-to-action banner encourages users to explore energy optimization insights.

### Promotional Carousel

A horizontally scrollable carousel labeled "For You" displays promotional cards. Each card has a title, subtitle, and colored background. Navigation arrows and dot indicators allow browsing. Cards cover topics such as the GreenUP program, cashback offers, and referral rewards.

---

## 3. Bills & Payments

### Bills Page Header

The bills page displays a bold "Bills" title and a "Help" link in the top-right corner.

### PayNow Banner

A card at the top promotes paying bills via PayNow QR code, with a "Learn more" link and carousel dots indicating multiple promotional slides.

### Outstanding Amount Card

This card shows:
- The address of the active premise
- The utility types (Electricity & Water)
- A "RECURRING" badge if auto-payment is configured
- The current outstanding amount displayed prominently
- A link to "Understanding Your Bill"

### Address and Filter Bar

Below the outstanding card, users can:
- Select a different premise address via a dropdown
- Toggle between residential (home icon) and vehicle (car icon) accounts
- Access filter options

### Transaction History

A timeline-style list shows all transactions for the selected year, ordered by date. Each entry displays:
- A teal timeline dot with a connecting line
- The date, label (e.g., "Mar 2026 PDF Bill" or "Bill Payment (Recurring)"), and amount
- For payments: a green "SUCCESS" badge
- For bills: a "View breakdown" link that navigates to the Bill Detail page

Tapping a bill entry navigates to `/bills/{slug}` to see the full breakdown.

---

## 4. Bill Details

The Bill Detail page provides a comprehensive visual breakdown of a specific monthly bill.

### Hero Amount

At the top, a circular progress ring animation fills as the total amount counts up from zero. The center displays "Total Due" with the animated dollar figure and the bill month. When the count-up completes, a confetti burst animation triggers, and a savings badge bounces in showing how much less (or more) the bill is compared to the previous month.

### Interactive Donut Chart

A donut (pie) chart breaks the bill into four categories:
- **Electricity** (teal) -- e.g., 412 kWh at the prevailing rate
- **Water** (blue) -- tiered tariff charges
- **Gas** (orange) -- piped gas usage
- **GST** (gray) -- 9% Goods and Services Tax

Hovering or tapping a segment highlights it with a glow effect and updates the center text to show that category's label and amount. A color-coded legend appears below the chart. Animated horizontal percentage bars fill in sequentially beneath the donut, each ending with a sparkle effect.

### Waterfall Breakdown Cards

Each cost category has its own card with:
- A pulsing emoji icon
- The category name and animated dollar amount
- A descriptive detail line (e.g., "412 kWh x $0.2391/kWh")
- An animated progress bar showing the percentage share

Cards slide in from the right with staggered delays.

### Month-over-Month Comparison

A "bar race" visualization compares the previous month and current month side by side for Electricity, Water, and Gas. Previous-month bars appear first, followed by current-month bars, then percentage-change badges bounce in. Decreases show green badges with a down-trend icon; increases show red.

### AI Insights

A section titled "What Changed This Month?" shows four insight cards that reveal with a typewriter animation:
- Weather impact on AC usage and estimated savings
- Appliance usage changes (e.g., fewer washing machine cycles)
- Optimization tips (e.g., standby power savings with smart strips)
- Projected annual savings at the current trajectory

Each insight has a colored left border and emoji icon.

### Daily Usage Sparkline

An area chart shows daily electricity usage for the entire month. Two reference lines indicate:
- The monthly average (dashed orange)
- The target usage level (dashed green)

The current day's data point pulses with a glowing dot. A tooltip shows the exact kWh value for any day.

### Action Buttons

Three buttons at the bottom:
- **Pay This Bill** -- Primary teal button with a glow effect
- **Download PDF** -- Outlined button with a download icon
- **Share Bill Summary** -- Text link with a share icon

---

## 5. Bill Simulator

The Bill Simulator lets users predict their next bill based on adjustable lifestyle parameters.

### Crystal Ball Hero

A spinning gradient ring displays the predicted monthly bill amount with an animated counter. Below it, a badge shows whether the prediction is higher or lower than the current bill.

### Scenario Presets

Four preset buttons allow quick configuration:
- **Current** -- Matches existing usage patterns
- **Eco Mode** -- Optimized for energy savings (higher AC temp, fewer hours, reduced usage)
- **Max Comfort** -- Maximum usage settings
- **Vacation** -- Minimal usage for away-from-home periods

### Interactive Sliders

Six slider controls adjust individual parameters:

| Slider | Range | Impact |
|--------|-------|--------|
| AC Temperature | 18-30 degrees C | Each 1 degree lower adds approximately $8/month |
| AC Hours/Day | 0-24 hours | Based on current average of 10 hrs/day |
| Showers/Day | 0-10 | Per household, average 8 minutes each |
| Laundry Loads/Week | 0-14 | Front-loader vs top-loader noted |
| Lights Left On | 0-12 hours | LED vs incandescent impact noted |
| Entertainment | 0-16 hours | TV, gaming, etc. at $0.80/hour |

Each slider features:
- A color-gradient track unique to that category
- A floating bubble above the thumb showing the current value
- A real-time cost impact indicator (green for savings, red for increases)
- A helpful hint below

As sliders move, the crystal ball prediction updates instantly with smooth animation.

### Savings Summary

A card at the bottom compares the current slider settings against the Eco Mode optimal values. It shows:
- The optimal bill amount
- A progress bar from optimal to current
- Monthly and yearly potential savings
- A relatable comparison (e.g., equivalent hawker centre meals)

A "Share your savings plan" button allows sharing the configuration.

---

## 6. Utilities Services

### Smart Service Portal

The Services page provides a centralized hub for all utilities self-service operations.

### Moving House Card

A prominent gradient card at the top promotes the Moving House flow. It features a house and package icon with the tagline "We'll handle everything" and a "Start Moving Flow" call-to-action that navigates to the Moving House wizard.

### Quick Actions Grid

Four cards arranged in a 2x2 grid:
- **Open Account** -- Set up utilities at a new address (3-minute setup)
- **Close Account** -- Close utilities when moving out
- **Pay Bill** -- Access PayNow, GIRO, and card payment options
- **Check Status** -- Track pending applications

Each card has a colored left border accent, an icon, title, and subtitle.

### Application Tracker

If applications are pending, a tracker card shows:
- The application type and count badge
- A 4-step progress indicator (Applied, Reviewing, Approved, Active) with the current step pulsing
- An animated progress bar
- Submission date and estimated completion date

### More Services

Collapsible accordion sections organize additional services:
- **Account Management**: Reschedule Appointment, Grid Connection, Update Mailing Address
- **Billing**: View Past Transactions, Switch to Regulated Tariff, Set up GIRO
- **Electricity Market**: Compare plans, Switch retailer

### Smart Suggestion

A contextual suggestion card appears when the system detects relevant user patterns (e.g., suggesting EV home charging setup).

---

## 7. Moving House Wizard

The Moving House wizard is a 4-step guided flow accessible from the Utilities Services page.

### Step Indicator

A horizontal stepper at the top shows four steps: Current Home, New Home, GIRO Transfer, and Confirm. Completed steps display green checkmarks, the active step has a teal ring, and future steps are gray.

### Step 1: Current Home

- Displays the current registered address with active utility indicators (Electricity, Water)
- Date pickers for selecting the last day at the current address (month, day, year dropdowns)
- Optional meter reading photo upload via camera

### Step 2: New Home

- Text input for the new address with search functionality
- Property type selector (HDB, Condo, Landed, Commercial) as a 2x2 button grid -- the selected type highlights in teal
- Date pickers for the move-in date
- Toggle switch for keeping the same utility types

### Step 3: GIRO Transfer

- Option to automatically transfer the existing GIRO arrangement (e.g., DBS ****1234) to the new address
- Toggle switch to enable/disable transfer
- Informational note about seamless transfer when enabled
- Alternative "Set up new GIRO instead" link when disabled

### Step 4: Confirm

A summary card displays all entered information:
- Close account details (address and last day)
- Open account details (new address, move-in date, property type)
- GIRO transfer status
- Estimated processing time (1-2 business days)

### Submission

The bottom button changes from "Continue" (steps 1-3) to "Submit Application" (step 4). On submission, a success screen appears with:
- An animated green checkmark
- Confetti falling animation
- A summary card of all details
- A "Back to Services" navigation button

---

## 8. Green Goals

### National Sustainability Targets

The Green Goals page opens with an illustrated header showing a cityscape with buildings and trees, promoting the goal to "Achieve our Green Goals by 2030!"

### Goal Cards Carousel

Two navigable goal cards present national sustainability targets:
1. **Use 15% less electricity** -- Reduce electricity consumption by 15% compared to 2018 levels. Status: ON TRACK (green badge).
2. **Use 18% less water** -- Reduce water consumption by 18% compared to 2018 levels. Status: OFF TRACK (orange badge).

Chevron arrows and dot indicators allow switching between goals. Each card shows the goal icon, status badge, title, description, and a "View Details" link.

### Consumption Details Tabs

Three tabs provide different scope views:

**Your Home Tab**:
- Address selector dropdown
- Total monthly usage in kWh
- Month-over-month comparison with trend indicator (red for increase, green for decrease) and estimated additional costs
- Progress bar showing current usage against the monthly target

**Your District Tab**:
- District selector (e.g., D2 Anson, Tanjong Pagar)
- Total district usage in MWh
- Month-over-month comparison with trend indicator
- Bar chart showing 6 months of consumption data with a 2030 target reference line

**Singapore Tab**:
- Placeholder for national consumption data (coming soon)

### Share Button

A teal "Share and Spread Sustainability" button allows sharing green goals progress.

---

## 9. GreenUP Gamification

GreenUP is the gamified sustainability engagement system with an RPG-inspired dark theme.

### Hero Section

The hero area features a dark gradient background with floating sparkle particles and displays:
- A hexagonal shield badge showing the current level number
- The level name (e.g., "SEED") with a shimmer text effect
- An XP progress bar with a shimmer animation showing current XP, XP needed for next level, and cycle end date

### Level Progression

Four RPG-themed levels with increasing XP thresholds:

| Level | Name | XP Required |
|-------|------|-------------|
| 1 | Seed | 1,000 |
| 2 | Seedling | 2,500 |
| 3 | Sprout | 5,000 |
| 4 | Bloom | 10,000 |

### Stats Dashboard

Three stat cards in a row display:
- **Day Streak** -- Consecutive active days with a fire emoji animation
- **kWh Saved** -- Cumulative energy savings with count-up animation
- **District Rank** -- Position in the district leaderboard

### Tab Navigation

A game-menu-style tab bar with a sliding indicator switches between three sections: Rewards, Quests, and Leaderboard.

### Rewards Tab

**Available Loot**: Claimable rewards with golden shimmer borders and pulsing "CLAIM" buttons. Rewards include merchant vouchers (e.g., restaurant discounts, coffee deals).

**Locked Rewards**: Grayed-out reward cards showing what becomes available at higher levels. Each displays a lock icon and the required level name.

### Quests Tab

**Limited Time Quests**: Time-sensitive challenges with countdown badges (e.g., "5d left"), circular progress rings, difficulty stars (1-3), and XP reward values.

**Active Quests**: Ongoing challenges including completed ones (showing a checkmark) and in-progress ones with step-based progress rings. Difficulty is indicated by colored left borders (green=easy, yellow=medium, red=hard).

### Leaderboard Tab

- **My Rank**: A special highlighted card with a gradient border showing the user's position, name, points, and level
- **Motivational Text**: Shows how many places to climb to reach the next milestone
- **Top 5 Rankings**: Each entry shows medal emoji (gold/silver/bronze for top 3), masked name, points, level badge, and a proportional progress bar
- **Reset Timer**: A countdown showing when the weekly leaderboard resets

---

## 10. EV Charging

### Station Finder

The EV Charging page helps locate nearby electric vehicle charging stations.

### Header and Promo

A teal header with the page title, followed by a promotional banner showing current offers (e.g., cashback at selected properties).

### Stats and View Toggle

- **Bolt Points**: A badge showing accumulated EV charging reward points
- **Map/News Toggle**: Buttons to switch between map view and news
- **Search Bar**: Text input with a location search and filter controls
- **List/Map Toggle**: A segmented control to switch between list view and map view

### Station List

Each station card displays:
- Station name with a map pin icon
- Full address
- Charger type badges:
  - **AC 22** (teal badge) -- 22kW alternating current charger
  - **DC 50** (orange badge) -- 50kW direct current fast charger
- Distance from the user's location
- Availability count (available/total) in green if chargers are free, red if none available

### Map View

When the map view is selected, a placeholder map container appears (map integration to be completed).

---

## 11. Energy Flow Dashboard

### Real-Time Canvas Animation

The Energy Flow page displays a live animated visualization of electricity flowing through the home.

### Header

A header with a back button, "Live Energy Flow" title, and a pulsing green "Live" indicator dot.

### Canvas Visualization

A full-width canvas renders in real-time:
- **Power Grid**: A pylon icon on the left with a "POWER GRID" label, representing the electricity source
- **House**: A detailed house illustration in the center with glowing windows that pulse
- **Appliances**: Five circular nodes positioned around the house, each showing an emoji icon and daily kWh consumption:
  - Air Conditioning (8.5 kWh/day, orange)
  - Lighting (2.1 kWh/day, yellow)
  - Refrigerator (3.2 kWh/day, light blue)
  - Water Heater (4.8 kWh/day, red-orange)
  - Electronics (1.4 kWh/day, purple)

### Particle Flow

Glowing particles continuously stream along bezier curve paths:
- From the power grid to the house (teal particles)
- From the house to each appliance (color-matched particles)

Particle spawn rate is proportional to each appliance's consumption. When particles arrive at their destination, a flash effect occurs. Selecting an appliance increases its particle density.

### Interactive Selection

Tapping an appliance node on the canvas or the corresponding card below highlights it with a dashed rotating selection ring and boosts particle flow to that appliance.

### Real-Time Readings

The top of the canvas displays the current power draw (oscillating around 2.1 kW) and the cost per hour based on the prevailing electricity rate.

### Appliance Cards

A horizontally scrollable row of cards below the canvas shows each appliance with:
- Emoji, name, daily kWh usage
- Percentage share of total consumption
- Cost per hour

### Summary Section

- **Daily Total**: Combined daily consumption across all appliances
- **Current Rate**: Real-time cost per hour
- **Projected Monthly Cost**: Estimated monthly bill based on current usage

### Energy Saving Tip

A contextual tip card provides actionable advice (e.g., raising AC temperature by 2 degrees to save a specific dollar amount per month).

---

## 12. SP Buddy Chatbot

### Overview

SP Buddy is an AI-powered chat assistant accessible via a floating action button on every screen. The button pulses with a ring animation to draw attention.

### Opening the Chat

Tapping the button slides up a chat panel covering 75% of the screen height. The panel has a teal header showing "SP Buddy - Your utilities assistant" with a close button.

### Quick Action Chips

On first open, five quick-action chips appear:
- My bill
- Usage this week
- Green goals
- EV charging nearby
- Report outage

Tapping a chip sends it as a message and triggers a response.

### Supported Topics

SP Buddy responds to the following topic areas:

| Topic | Example Queries | Response Behavior |
|-------|----------------|-------------------|
| Billing | "my bill", "payment", "expensive" | Shows latest bill amount, comparison, offers GIRO setup |
| Usage | "usage", "electricity", "kwh" | Reports weekly consumption with comparison and tips |
| Outage | "outage", "power cut", "blackout" | Checks for area outages, offers to report or check maintenance |
| Account | "open", "close", "moving" | Guides through account operations with numbered options |
| GIRO | "giro", "autopay" | Lists supported banks and offers setup navigation |
| Green Goals | "green", "save", "sustainable" | Reports progress on both electricity and water goals |
| EV Charging | "ev", "charging", "electric vehicle" | Lists nearby stations with availability and distance |

### Chat Behavior

- Messages appear in chat bubbles: teal for the user, glass-effect for the bot
- Bot and user messages show small avatar icons
- A typing indicator (bouncing dots) appears while the bot generates a response
- The response delay varies randomly between 500ms and 1000ms for a natural feel
- The chat auto-scrolls to the latest message
- Closing the chat resets the conversation to the initial greeting

### Fallback Response

For unrecognized queries, SP Buddy acknowledges the limitation and provides contact information (web and phone).

---

## 13. Profile & Settings

### Profile Header

A teal header with the user's avatar circle (showing initials), full name, email address, and phone number. A "My QR Code" link provides a personal QR code.

### Premises Section

The premises card shows:
- The primary premise address with an avatar and "Owner" badge
- A list of family members shown as overlapping avatar circles with initials
- Reward points earned from the premise
- An "Add member" button

### Settings Menu

A glass-effect card contains the following options:

- **Dark Mode / Light Mode Toggle**: A sun/moon icon with a toggle switch that immediately applies the selected theme by adding or removing the `dark` class on the document root. The preference is saved to localStorage.
- **Invite a Friend**: With a "+10" reward points badge
- **Privacy and Security**: Access privacy controls
- **Payment Methods**: Manage payment options
- **Rewards**: View earned rewards
- **Communication Preferences**: Manage notification settings

Each item shows an icon, label, optional badge, and a chevron indicating it can be tapped for more options.
