# SP App Functional Specifications

---

## 1. Home Dashboard & Consumption

### Description

The home dashboard serves as the primary entry point, providing an overview of consumption data, quick navigation, alerts, and personalized promotions.

### User Stories

- As a user, I want to see my energy and water consumption at a glance so I can monitor my usage patterns.
- As a user, I want to switch between electricity and water views to compare different utility types.
- As a user, I want to view consumption across different time periods (today, week, month, year) to identify trends.
- As a user, I want to see important alerts so I am aware of maintenance schedules or security notices.
- As a user, I want quick access to frequently used features from the home screen.

### Acceptance Criteria

1. The dashboard displays a personalized greeting with the user's name and avatar initials.
2. A notification bell shows the count of unread notifications.
3. The quick actions grid provides 4 shortcut buttons: Scan QR, Utilities Services, Green Goals, More.
4. The consumption chart defaults to "Electricity" utility and "This Week" period.
5. Tapping the utility toggle switches the chart data and accent color (teal for electricity, blue for water).
6. The period selector cycles through Today, This Week, This Month, and This Year.
7. The bar chart shows data points appropriate to the selected period (hours for today, days for week, weeks for month, months for year).
8. Bars with zero values appear gray with reduced opacity.
9. Hovering/tapping a bar shows a tooltip with the exact date and value.
10. The promotional carousel is horizontally scrollable with dot indicators.
11. Alert banners display with an orange left border and are tappable.

### Data Requirements

- User profile (name, initials)
- Consumption readings per premise, utility type, and period
- Notification count
- Promotional content (static or API-driven)

### UI/UX Behavior

- Page uses gradient background with floating gradient orbs for depth
- Cards animate in with staggered fade-in-up animations
- Alert banner slides in from the right
- Chart bars animate from zero height to their value

### Edge Cases

- If no consumption data exists for a period, all bars should display as gray with zero values
- If the user has no premises, show an onboarding prompt
- If notifications fail to load, the badge should not display rather than showing an error

---

## 2. Bills & Payment Management

### Description

The bills page provides a comprehensive view of billing history, outstanding amounts, and payment options.

### User Stories

- As a user, I want to see my outstanding balance so I know how much I owe.
- As a user, I want to view my transaction history to track past bills and payments.
- As a user, I want to navigate to a bill breakdown to understand my charges.
- As a user, I want to pay my bill via PayNow QR code.
- As a user, I want to filter transactions by premise.

### Acceptance Criteria

1. The outstanding amount card displays the current balance for the selected premise.
2. A "RECURRING" badge appears if GIRO auto-payment is active.
3. Transaction history shows bills and payments in reverse chronological order.
4. Bill entries display a "View breakdown" link that navigates to the bill detail page.
5. Payment entries show a green "SUCCESS" badge.
6. Each transaction shows date, label, and amount.
7. The PayNow banner provides a QR payment promotion.
8. Address filter allows switching between premises.

### Data Requirements

- Bills with amounts, dates, and statuses
- Transactions with types (bill/payment), methods, and statuses
- Premise addresses

### UI/UX Behavior

- Timeline-style layout with teal dots and connecting lines
- Bill rows are wrapped in `<Link>` components for navigation
- Staggered fade-in animations for transaction list items
- Press effect on all tappable items

### Edge Cases

- If no bills exist, display an empty state with guidance
- If a payment is pending, show a "PENDING" badge instead of "SUCCESS"
- Overdue bills should display with visual distinction (e.g., red accent)

---

## 3. Interactive Bill Explainer

### Description

The bill detail page provides an animated, visual breakdown of a specific monthly bill with interactive charts, comparisons, and AI-generated insights.

### User Stories

- As a user, I want to see my bill total animate into view so the experience feels engaging.
- As a user, I want an interactive donut chart so I can explore each cost category.
- As a user, I want to compare this month to last month to understand changes.
- As a user, I want AI-powered insights explaining why my bill changed.
- As a user, I want to see daily usage patterns across the billing period.
- As a user, I want to pay, download, or share my bill from this page.

### Acceptance Criteria

1. The total amount counts up from zero with an eased animation over 1.4 seconds.
2. A progress ring fills simultaneously around the total.
3. On count-up completion, a savings/increase badge bounces in.
4. If savings are positive, a confetti animation triggers.
5. The donut chart animates segments and responds to hover with glow effects.
6. Hovering a donut segment updates the center text to show that category.
7. Horizontal percentage bars animate sequentially with sparkle effects at completion.
8. Waterfall breakdown cards slide in from the right with staggered delays.
9. Month-over-month bars animate in a "bar race" sequence: previous bars first, then current bars, then percentage badges.
10. AI insights reveal with a typewriter animation, staggered 400ms apart.
11. The daily sparkline shows average and target reference lines with a pulsing dot on the current day.
12. Three action buttons (Pay, Download PDF, Share) are accessible at the bottom.

### Data Requirements

- Bill total and previous month total
- Line items with categories, amounts, percentages, and details
- Month-over-month comparison data per category
- AI insight strings with icons and border colors
- Daily usage array (31 data points)

### UI/UX Behavior

- Floating background particles for ambient motion
- Multiple coordinated animation sequences with precise timing
- Count-up hook with cubic easing
- Intersection-observer could be added for scroll-triggered animations

### Edge Cases

- If the bill is higher than last month, the savings badge shows red with an up-arrow
- If daily usage data is incomplete, the sparkline should gracefully handle missing days
- If the previous month's bill is unavailable, hide the comparison section

---

## 4. Bill Simulator (What-If)

### Description

The bill simulator allows users to predict their next bill by adjusting six lifestyle parameters, with instant feedback on cost impact.

### User Stories

- As a user, I want to see a predicted bill based on my current habits.
- As a user, I want to adjust individual parameters and see the bill change in real time.
- As a user, I want preset scenarios so I can quickly see different lifestyles.
- As a user, I want to know how much I could save by optimizing.
- As a user, I want to share my savings plan with family.

### Acceptance Criteria

1. The crystal ball displays the predicted amount with an animated counter.
2. A comparison badge shows the difference from the current actual bill.
3. Four preset buttons (Current, Eco Mode, Max Comfort, Vacation) set all sliders simultaneously.
4. Each of the six sliders has a unique color gradient, floating value bubble, and cost impact indicator.
5. Cost impact shows green for savings, red for increases, gray for no change.
6. The predicted total updates instantly as sliders are moved.
7. The savings summary shows the optimal bill (Eco Mode), potential monthly savings, yearly savings, and a hawker meal equivalence.
8. If the user is already at optimal settings, a confirmation message appears instead of savings.

### Data Requirements

- Current bill amount (baseline for comparison)
- Calculation formula:
  - Base electricity: $45
  - AC temperature: (25 - temp) * $8 per degree below 25
  - AC hours: hours * $0.65
  - Water (showers): count * $1.80 * 30 days
  - Laundry: loads * $1.20 * 4.3 weeks
  - Lights: hours * $0.50 * 30 days
  - Entertainment: hours * $0.80 * 30 days
  - GST: 9% on subtotal

### UI/UX Behavior

- Spinning gradient ring around the crystal ball
- Smooth animated number transitions (400ms cubic easing)
- Sliders use custom CSS for cross-browser styling with no default appearance
- Each slider card fades in with staggered delays on mount

### Edge Cases

- All sliders at minimum should produce the lowest possible bill (base + GST only)
- All sliders at maximum should produce a realistic high-end bill
- Negative cost impact (savings) should never show for AC temperature below the default

---

## 5. Utilities Self-Service Portal

### Description

A centralized service hub for managing utilities accounts, including moving house, opening/closing accounts, payments, and application tracking.

### User Stories

- As a user, I want a clear overview of all available utilities services.
- As a user, I want to start the moving house process from a prominent card.
- As a user, I want to track the status of my pending applications.
- As a user, I want to access additional services like GIRO setup and retailer switching.

### Acceptance Criteria

1. The Moving House card is prominently displayed at the top with a "Most Used" badge.
2. Four quick action cards are arranged in a 2x2 grid: Open Account, Close Account, Pay Bill, Check Status.
3. The application tracker shows a 4-step progress indicator with the current step highlighted.
4. A progress bar animates to the current completion percentage.
5. More services are organized in collapsible accordion sections.
6. Expanding a section reveals service items with icons and labels.
7. A smart suggestion card appears based on user context.

### Data Requirements

- Application list with types, statuses, dates
- Premise information for the tracker
- Service catalog (static data)

### UI/UX Behavior

- Moving house card uses a gradient background with press-scale animation
- Quick action cards have colored left borders matching their function
- Application tracker step indicator animates the current step with a pulse
- Accordion sections animate open/close with max-height transitions

### Edge Cases

- If no applications are pending, the tracker section should be hidden
- If all services are unavailable, display a maintenance message
- Long addresses should truncate gracefully

---

## 6. Moving House Wizard

### Description

A 4-step guided wizard that handles closing a utilities account at the old address, opening one at the new address, and transferring GIRO arrangements.

### User Stories

- As a user, I want to close my old account and open a new one in a single flow.
- As a user, I want to select my move-out and move-in dates.
- As a user, I want to transfer my GIRO arrangement automatically.
- As a user, I want to review all details before submitting.

### Acceptance Criteria

1. Step indicator shows 4 steps with visual state (completed, active, pending).
2. Step 1 displays the current address with active utility indicators and date pickers.
3. Step 2 requires a new address (text input) and property type selection (HDB/Condo/Landed/Commercial).
4. Step 2 validates that both new address and property type are filled before allowing progression.
5. Step 3 offers GIRO transfer toggle with bank details preview.
6. Step 4 shows a read-only confirmation summary of all entered data.
7. The Continue button is disabled when validation fails (grayed out, non-interactive).
8. On submission, a success screen appears with confetti animation and a summary card.
9. Slide transitions animate content left or right based on navigation direction.

### Data Requirements

- Current premise address and utility types
- GIRO account details (bank name, masked account number)
- Form data: addresses, dates, property type, utility preferences, GIRO transfer preference

### UI/UX Behavior

- Step content slides left when advancing and right when going back
- 200ms transition with opacity fade
- Property type buttons highlight in teal when selected
- Toggle switches use custom styling with smooth translate animations
- Confetti particles (40 pieces) fall with random colors, sizes, and delays

### Edge Cases

- If the user has no GIRO account, Step 3 should offer setup instead of transfer
- If the new address is the same as the current address, show a validation warning
- The back button on Step 1 navigates to the Services page, not a previous wizard step

---

## 7. Green Goals Tracking

### Description

Displays national sustainability targets for electricity and water reduction, with progress tracking at home, district, and national levels.

### User Stories

- As a user, I want to see Singapore's 2030 green goals so I understand the national targets.
- As a user, I want to track my home's contribution toward these goals.
- As a user, I want to compare my district's performance.
- As a user, I want to share my sustainability progress.

### Acceptance Criteria

1. Two goal cards are navigable via left/right arrows and dot indicators.
2. Each goal shows an icon, status badge (ON TRACK/OFF TRACK), title, and description.
3. Three consumption tabs (Your Home, Your District, Singapore) provide different scope views.
4. Your Home tab shows total usage, month-over-month comparison with trend indicator, and a progress bar against the target.
5. Your District tab shows aggregate MWh usage, comparison, and a 6-month bar chart with a 2030 target reference line.
6. Singapore tab shows a placeholder for coming-soon national data.
7. A "Share and Spread Sustainability" button is available.

### Data Requirements

- Green goals with target percentages, baseline years, current reduction percentages
- Premise consumption data for home tab
- District aggregate data for district tab
- National data (future)

### UI/UX Behavior

- Illustrated cityscape header with CSS-drawn buildings and trees
- Goal card overlaps the illustration header with negative margin
- Bar chart in district tab highlights the most recent month in teal
- Trend indicators use red for increases and green for decreases

### Edge Cases

- If a goal has no current data, display as "No data available"
- If the user has multiple premises, Your Home tab should allow premise selection
- If district data is unavailable, show a loading or empty state

---

## 8. GreenUP Gamification

### Description

An RPG-themed sustainability engagement system where users earn XP by completing eco-challenges, level up through four tiers, claim rewards, and compete on district leaderboards.

### User Stories

- As a user, I want to see my current level and XP progress.
- As a user, I want to complete challenges to earn XP.
- As a user, I want to claim rewards when they become available.
- As a user, I want to see how I rank against others in my district.
- As a user, I want to track my streak and energy savings.

### Acceptance Criteria

1. The hero section shows a hexagonal shield badge with the level number, level name with shimmer, and XP bar.
2. The XP bar shows current/required XP, XP needed for next level, cycle end date, and next level name.
3. Three stat cards display day streak, kWh saved, and district rank with count-up animations.
4. The tab bar switches between Rewards, Quests, and Leaderboard with a sliding indicator.
5. Available rewards have golden shimmer borders and pulsing CLAIM buttons.
6. Locked rewards are grayed out with lock icons and show the required level.
7. Quests show circular progress rings, difficulty stars (1-3), XP rewards, and time limits for limited quests.
8. Completed quests show a checkmark instead of a progress ring.
9. The leaderboard shows the user's rank in a highlighted card, top 5 players with medals, and a weekly reset countdown.

### Data Requirements

- GreenUP profile: level, XP, streak, kWh saved, rank, cycle end date
- Challenges: title, description, XP reward, difficulty, category, steps, days left
- User challenges: progress, completion status
- Rewards: title, merchant, icon, required level, locked status
- User rewards: claim status
- Leaderboard entries: rank, name (masked), points, level

### UI/UX Behavior

- Dark theme hero with sparkle particle animations
- XP bar has a shimmer overlay animation
- Level name uses background-clip text with an animated gradient
- Reward cards have animated golden border gradients
- Quest cards have colored left borders indicating difficulty
- Leaderboard entries have proportional progress bars relative to the top score
- Count-up animations trigger via IntersectionObserver when cards scroll into view

### Edge Cases

- If XP reaches the threshold, trigger a level-up celebration (not yet implemented)
- If no rewards are available, show a message encouraging quest completion
- If the leaderboard is empty, show a participation prompt
- Streak should reset to 0 if the user misses a day

---

## 9. EV Charging Station Finder

### Description

Helps users locate nearby EV charging stations with real-time availability, charger type filtering, and distance information.

### User Stories

- As an EV owner, I want to find charging stations near me.
- As a user, I want to see which stations have available chargers.
- As a user, I want to filter by charger type (AC vs DC).
- As a user, I want to search for stations by name or location.

### Acceptance Criteria

1. A promotional banner at the top shows current EV charging offers.
2. A bolt points badge shows the user's accumulated EV reward points.
3. A search bar allows filtering stations by name or address.
4. A list/map toggle switches between views.
5. Each station card shows: name, address, charger types (AC 22kW or DC 50kW badges), distance, and availability (available/total).
6. Available count is green when chargers are free, red when all are occupied.
7. Charger type badges are color-coded: teal for AC, orange for DC.

### Data Requirements

- EV station list: name, address, latitude, longitude, charger types, available count, total count
- User location for distance calculation

### UI/UX Behavior

- Gradient background for the page
- Station cards use glass-subtle styling with hover effects
- Map view shows a placeholder container (map integration pending)
- Search filters the list in real-time as the user types

### Edge Cases

- If no stations match the search query, display an empty state message
- If a station has 0 available chargers, it should still appear but with a red availability indicator
- If location services are unavailable, distances should be hidden or show "N/A"

---

## 10. Energy Flow Visualization

### Description

A real-time Canvas-based animation showing electricity flowing from the power grid through the home to individual appliances, with interactive selection and live cost readings.

### User Stories

- As a user, I want to see a visual representation of energy flowing through my home.
- As a user, I want to tap an appliance to see its consumption highlighted.
- As a user, I want to see real-time cost information.
- As a user, I want energy-saving tips based on my consumption.

### Acceptance Criteria

1. The canvas renders a power grid pylon, a house, and 5 appliance nodes.
2. Particles continuously flow from the grid to the house and from the house to appliances.
3. Particle flow rate to each appliance is proportional to its kWh consumption.
4. Tapping an appliance on the canvas or its card highlights it with a dashed rotating ring.
5. Selecting an appliance increases its particle density by 2.5x.
6. Real-time readings (kW and $/hr) are displayed at the top of the canvas.
7. The kW reading oscillates naturally to simulate live data.
8. Appliance cards below the canvas show emoji, name, daily kWh, percentage share, and cost per hour.
9. A daily total, current rate, and projected monthly cost summary appears below the cards.
10. An energy-saving tip card provides contextual advice.

### Data Requirements

- Appliance list: name, emoji, kWh/day, color, glow color
- Electricity rate: $0.2391/kWh
- Total daily kWh for projected cost calculation

### UI/UX Behavior

- HiDPI canvas rendering via devicePixelRatio
- Bezier curve paths for organic particle movement
- Particle trails with 5-point opacity decay
- Shadow-based glow on particles
- House windows pulse with a sinusoidal glow
- A live indicator dot pulses in the header

### Edge Cases

- If the browser does not support Canvas, show a fallback static image
- If the window resizes, the canvas should be re-initialized
- Dark mode should change background gradients and element colors

---

## 11. SP Buddy AI Assistant

### Description

A chatbot assistant accessible from any screen that helps users with billing, usage, account management, outage reporting, green goals, and EV charging queries.

### User Stories

- As a user, I want to ask questions about my bill in natural language.
- As a user, I want quick chips for common actions so I do not have to type.
- As a user, I want to check my usage or report an outage through the chatbot.
- As a user, I want the chatbot available on every page.

### Acceptance Criteria

1. A floating action button with a pulse ring animation appears in the bottom-right on all pages.
2. Tapping the button slides up a chat panel covering 75% of the viewport.
3. An initial greeting message lists the bot's capabilities.
4. Five quick action chips are displayed on first open: My bill, Usage this week, Green goals, EV charging nearby, Report outage.
5. Tapping a chip sends it as a user message and triggers a response.
6. The bot responds to 7 topic categories: billing, usage, outage, account, GIRO, green goals, EV.
7. A typing indicator with bouncing dots appears during the response delay (500-1000ms).
8. Messages auto-scroll to the latest entry.
9. Closing and reopening the chat resets the conversation.
10. The input field auto-focuses when the panel opens.

### Data Requirements

- Current bill amount and month
- Weekly consumption summary
- Area outage status
- GIRO bank support list
- Green goals progress
- Nearby EV station availability

### UI/UX Behavior

- Chat panel slides up with a cubic-bezier transition
- Backdrop blur overlay behind the panel
- User messages in teal bubbles (right-aligned), bot messages in glass bubbles (left-aligned)
- Bot and user avatar icons next to messages
- Quick action chips use glass styling with teal border accent

### Edge Cases

- If the input is empty, the send button should be disabled
- For unrecognized queries, provide a helpful fallback with contact information
- The chat panel should not interfere with the bottom navigation
- On small screens, the 75vh panel should still leave room for the keyboard

---

## 12. User Profile & Preferences

### Description

The profile page displays account information, manages premises and family members, and provides app-level settings including theme toggling.

### User Stories

- As a user, I want to see my account details (name, email, phone).
- As a user, I want to manage my premises and see family members.
- As a user, I want to toggle dark mode.
- As a user, I want to access privacy, payment, rewards, and notification settings.

### Acceptance Criteria

1. The profile card shows avatar initials, full name, email, and phone number.
2. A "My QR Code" link is available for sharing.
3. The premises section shows the primary address with an owner badge.
4. Family members are displayed as overlapping avatar circles.
5. A reward points indicator appears next to the member list.
6. An "Add member" button is available.
7. The dark mode toggle immediately applies the theme change.
8. Theme preference persists in localStorage under the key `sp-theme`.
9. Settings menu items: Invite a Friend (+10 pts badge), Privacy and Security, Payment Methods, Rewards, Communication Preferences.
10. Each settings item has a chevron indicating navigation.

### Data Requirements

- User profile: name, email, phone, avatar initials
- Premises with member lists and roles
- Theme preference (localStorage)

### UI/UX Behavior

- Teal gradient header with the profile card overlapping via negative margin
- Dark mode toggle shows sun icon in dark mode, moon icon in light mode
- The toggle switch animates its position with a 300ms translate
- Theme is applied by toggling the `.dark` class on `document.documentElement`
- The dark mode toggle is only rendered after mount to avoid hydration mismatch

### Edge Cases

- If the user has no premises, show an "Add premise" flow
- If localStorage is unavailable (e.g., incognito mode), default to light mode without errors
- Long names should truncate with ellipsis
- The profile page should not flash between themes on initial load
