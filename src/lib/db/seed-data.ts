import type {
  User,
  UserPreferences,
  Premise,
  PremiseMember,
  Bill,
  BillLineItem,
  BillDetail,
  BillComparison,
  BillInsight,
  DailyUsage,
  ConsumptionData,
  Transaction,
  Appliance,
  GreenGoal,
  GreenupProfile,
  DistrictData,
  Challenge,
  UserChallenge,
  Reward,
  UserReward,
  EVStation,
  Application,
  Notification,
  GiroAccount,
  GiroArrangement,
  LeaderboardEntry,
  SimulatorPreset,
  SimulatorInput,
} from '@/lib/types';

// ──────────────────────────────────────────────────────────────────────
//  1. USER (from profile/page.tsx)
// ──────────────────────────────────────────────────────────────────────

export const SEED_USER: User = {
  id: 'usr-001',
  fullName: 'MAGA MATTEO LUCA',
  email: 'matteolmaga@gmail.com',
  phone: '+65 8972 7679',
  avatarInitials: 'ML',
  rewardPoints: 851,
  darkMode: false,
  notificationsEnabled: true,
  createdAt: '2024-01-15T00:00:00Z',
  updatedAt: '2026-03-18T00:00:00Z',
};

export const SEED_USER_PREFERENCES: UserPreferences = {
  darkMode: SEED_USER.darkMode,
  notificationsEnabled: SEED_USER.notificationsEnabled,
  language: 'en',
  communicationChannels: ['email', 'push'],
};

// ──────────────────────────────────────────────────────────────────────
//  2. PREMISES & MEMBERS (from profile/page.tsx and home page)
// ──────────────────────────────────────────────────────────────────────

export const SEED_PREMISES: Premise[] = [
  {
    id: 'prm-001',
    addressLine1: '18 Everton Rd',
    addressLine2: 'Singapore 089374',
    postalCode: '089374',
    district: 'D2 (Anson, Tanjong Pagar)',
    propertyType: 'Landed',
    hasElectricity: true,
    hasWater: true,
    hasGas: true,
  },
];

export const SEED_PREMISE_MEMBERS: PremiseMember[] = [
  {
    id: 'mbr-001',
    premiseId: 'prm-001',
    userId: 'usr-001',
    role: 'owner',
    initials: 'MM',
    joinedAt: '2024-01-15T00:00:00Z',
  },
  {
    id: 'mbr-002',
    premiseId: 'prm-001',
    userId: 'usr-002',
    role: 'member',
    initials: 'AL',
    joinedAt: '2024-03-01T00:00:00Z',
  },
  {
    id: 'mbr-003',
    premiseId: 'prm-001',
    userId: 'usr-003',
    role: 'member',
    initials: 'JT',
    joinedAt: '2024-03-01T00:00:00Z',
  },
  {
    id: 'mbr-004',
    premiseId: 'prm-001',
    userId: 'usr-004',
    role: 'member',
    initials: 'KW',
    joinedAt: '2024-06-15T00:00:00Z',
  },
  {
    id: 'mbr-005',
    premiseId: 'prm-001',
    userId: 'usr-005',
    role: 'member',
    initials: 'SL',
    joinedAt: '2024-06-15T00:00:00Z',
  },
];

// ──────────────────────────────────────────────────────────────────────
//  3. CONSUMPTION DATA (from page.tsx - home page)
// ──────────────────────────────────────────────────────────────────────

export const SEED_CONSUMPTION_DATA: ConsumptionData[] = [
  // ── Electricity ──
  {
    utilityType: 'electricity',
    period: 'today',
    unit: 'kWh',
    lastUpdated: '2026-03-18T22:45:00+08:00',
    data: [
      { label: '12am', value: 0.3 },
      { label: '4am', value: 0.2 },
      { label: '8am', value: 1.8 },
      { label: '12pm', value: 2.5 },
      { label: '4pm', value: 3.1 },
      { label: '8pm', value: 2.2 },
      { label: 'Now', value: 0.95 },
    ],
  },
  {
    utilityType: 'electricity',
    period: 'week',
    unit: 'kWh',
    lastUpdated: '2026-03-18T22:45:00+08:00',
    data: [
      { label: 'Mon', value: 22 },
      { label: 'Tue', value: 15 },
      { label: 'Wed', value: 0.95 },
      { label: 'Thu', value: 0 },
      { label: 'Fri', value: 0 },
      { label: 'Sat', value: 0 },
      { label: 'Sun', value: 0 },
    ],
  },
  {
    utilityType: 'electricity',
    period: 'month',
    unit: 'kWh',
    lastUpdated: '2026-03-18T22:45:00+08:00',
    data: [
      { label: 'W1', value: 95 },
      { label: 'W2', value: 88 },
      { label: 'W3', value: 37.95 },
      { label: 'W4', value: 0 },
      { label: 'W5', value: 0 },
    ],
  },
  {
    utilityType: 'electricity',
    period: 'year',
    unit: 'kWh',
    lastUpdated: '2026-03-18T22:45:00+08:00',
    data: [
      { label: 'J*', value: 8.2 },
      { label: 'F*', value: 7.3 },
      { label: 'M*', value: 3.8 },
      { label: 'A', value: 0 },
      { label: 'M', value: 0 },
      { label: 'J', value: 0 },
      { label: 'J', value: 0 },
      { label: 'A', value: 0 },
      { label: 'S', value: 0 },
      { label: 'O', value: 0 },
      { label: 'N', value: 0 },
      { label: 'D', value: 0 },
    ],
  },
  // ── Water ──
  {
    utilityType: 'water',
    period: 'today',
    unit: 'm\u00B3',
    lastUpdated: '2026-03-18T22:45:00+08:00',
    data: [
      { label: '12am', value: 0 },
      { label: '4am', value: 0 },
      { label: '8am', value: 0.3 },
      { label: '12pm', value: 0.15 },
      { label: '4pm', value: 0.1 },
      { label: '8pm', value: 0.25 },
      { label: 'Now', value: 0.05 },
    ],
  },
  {
    utilityType: 'water',
    period: 'week',
    unit: 'm\u00B3',
    lastUpdated: '2026-03-18T22:45:00+08:00',
    data: [
      { label: 'Mon', value: 0.85 },
      { label: 'Tue', value: 1.2 },
      { label: 'Wed', value: 0.65 },
      { label: 'Thu', value: 0 },
      { label: 'Fri', value: 0 },
      { label: 'Sat', value: 0 },
      { label: 'Sun', value: 0 },
    ],
  },
  {
    utilityType: 'water',
    period: 'month',
    unit: 'm\u00B3',
    lastUpdated: '2026-03-18T22:45:00+08:00',
    data: [
      { label: 'W1', value: 5.2 },
      { label: 'W2', value: 4.8 },
      { label: 'W3', value: 2.7 },
      { label: 'W4', value: 0 },
      { label: 'W5', value: 0 },
    ],
  },
  {
    utilityType: 'water',
    period: 'year',
    unit: 'm\u00B3',
    lastUpdated: '2026-03-18T22:45:00+08:00',
    data: [
      { label: 'J*', value: 7.5 },
      { label: 'F*', value: 7.3 },
      { label: 'M*', value: 3.2 },
      { label: 'A', value: 0 },
      { label: 'M', value: 0 },
      { label: 'J', value: 0 },
      { label: 'J', value: 0 },
      { label: 'A', value: 0 },
      { label: 'S', value: 0 },
      { label: 'O', value: 0 },
      { label: 'N', value: 0 },
      { label: 'D', value: 0 },
    ],
  },
];

// ──────────────────────────────────────────────────────────────────────
//  4. BILLS & LINE ITEMS (from bills/page.tsx and bills/[id]/page.tsx)
// ──────────────────────────────────────────────────────────────────────

export const SEED_BILLS: Bill[] = [
  {
    id: 'bil-001',
    premiseId: 'prm-001',
    billMonth: '2026-03-01',
    totalAmount: 154.08,
    status: 'unpaid',
    dueDate: '2026-03-25',
  },
  {
    id: 'bil-002',
    premiseId: 'prm-001',
    billMonth: '2026-02-01',
    totalAmount: 177.55,
    status: 'paid',
    dueDate: '2026-02-25',
  },
  {
    id: 'bil-003',
    premiseId: 'prm-001',
    billMonth: '2026-01-01',
    totalAmount: 163.09,
    status: 'paid',
    dueDate: '2026-01-25',
  },
];

export const SEED_BILL_LINE_ITEMS: BillLineItem[] = [
  // Mar 2026 bill (bil-001) - from bills/[id]/page.tsx breakdownData
  {
    id: 'bli-001',
    billId: 'bil-001',
    category: 'electricity',
    label: 'Electricity',
    amount: 98.5,
    detail: '412 kWh \u00D7 $0.2391/kWh',
    percentage: 64,
    sortOrder: 1,
  },
  {
    id: 'bli-002',
    billId: 'bil-001',
    category: 'water',
    label: 'Water',
    amount: 32.2,
    detail: '7.3 Cu M \u00D7 various tariff tiers',
    percentage: 21,
    sortOrder: 2,
  },
  {
    id: 'bli-003',
    billId: 'bil-001',
    category: 'gas',
    label: 'Gas',
    amount: 12.8,
    detail: 'Piped gas usage',
    percentage: 8,
    sortOrder: 3,
  },
  {
    id: 'bli-004',
    billId: 'bil-001',
    category: 'gst',
    label: 'GST (9%)',
    amount: 10.58,
    detail: '9% Goods & Services Tax',
    percentage: 7,
    sortOrder: 4,
  },
];

export const SEED_BILL_COMPARISONS: BillComparison[] = [
  { label: 'Electricity', previous: 121.3, current: 98.5, changePercent: -18.8, color: '#00BFA5' },
  { label: 'Water', previous: 38.9, current: 32.2, changePercent: -17.2, color: '#2196F3' },
  { label: 'Gas', previous: 17.35, current: 12.8, changePercent: -26.2, color: '#FF9800' },
];

export const SEED_BILL_INSIGHTS: BillInsight[] = [
  {
    icon: '\uD83C\uDF21\uFE0F',
    text: 'Cooler weather in March reduced AC usage by ~18%, saving you about $15',
    borderColor: '#4CAF50',
  },
  {
    icon: '\uD83D\uDCC9',
    text: 'Your washing machine ran 3 fewer cycles this month compared to February',
    borderColor: '#2196F3',
  },
  {
    icon: '\uD83D\uDCA1',
    text: 'Tip: Your standby power consumption is ~$4.20/month. Smart power strips could save you $3.50/month',
    borderColor: '#FF9800',
  },
  {
    icon: '\uD83C\uDFAF',
    text: "At this rate, you'll save ~$180 this year compared to 2025!",
    borderColor: '#4CAF50',
  },
];

// Daily usage data for the bill detail page (generated with the same formula as the page)
export const SEED_DAILY_USAGE: DailyUsage[] = Array.from({ length: 31 }, (_, i) => ({
  day: i + 1,
  kWh: +(10 + Math.random() * 8 + (i > 5 && i < 15 ? 3 : 0)).toFixed(1),
}));

// Assembled bill detail for Mar 2026
export const SEED_BILL_DETAIL_MAR2026: BillDetail = {
  ...SEED_BILLS[0],
  lineItems: SEED_BILL_LINE_ITEMS.filter((li) => li.billId === 'bil-001'),
  previousTotal: 177.55,
  savings: 177.55 - 154.08,
  comparison: SEED_BILL_COMPARISONS,
  insights: SEED_BILL_INSIGHTS,
  dailyUsage: SEED_DAILY_USAGE,
};

// ──────────────────────────────────────────────────────────────────────
//  5. TRANSACTIONS (from bills/page.tsx)
// ──────────────────────────────────────────────────────────────────────

export const SEED_TRANSACTIONS: Transaction[] = [
  {
    id: 'txn-001',
    premiseId: 'prm-001',
    billId: 'bil-001',
    type: 'bill',
    amount: 154.08,
    label: 'Mar 2026 PDF Bill',
    status: 'pending',
    transactionDate: '2026-03-06',
    slug: 'mar-2026',
  },
  {
    id: 'txn-002',
    premiseId: 'prm-001',
    billId: 'bil-002',
    type: 'payment',
    paymentMethod: 'giro',
    amount: 177.55,
    label: 'Bill Payment (Recurring)',
    status: 'success',
    transactionDate: '2026-02-25',
  },
  {
    id: 'txn-003',
    premiseId: 'prm-001',
    billId: 'bil-002',
    type: 'bill',
    amount: 177.55,
    label: 'Feb 2026 PDF Bill',
    status: 'pending',
    transactionDate: '2026-02-11',
    slug: 'feb-2026',
  },
  {
    id: 'txn-004',
    premiseId: 'prm-001',
    billId: 'bil-003',
    type: 'payment',
    paymentMethod: 'giro',
    amount: 163.09,
    label: 'Bill Payment (Recurring)',
    status: 'success',
    transactionDate: '2026-01-20',
  },
  {
    id: 'txn-005',
    premiseId: 'prm-001',
    billId: 'bil-003',
    type: 'bill',
    amount: 163.09,
    label: 'Jan 2026 PDF Bill',
    status: 'pending',
    transactionDate: '2026-01-06',
    slug: 'jan-2026',
  },
];

// ──────────────────────────────────────────────────────────────────────
//  6. APPLIANCES (from energy-flow/page.tsx)
// ──────────────────────────────────────────────────────────────────────

export const SEED_APPLIANCES: Appliance[] = [
  {
    id: 'apl-001',
    premiseId: 'prm-001',
    name: 'Air Conditioning',
    emoji: '\uD83C\uDF21\uFE0F',
    kwhPerDay: 8.5,
    color: '#FF8A65',
    glowColor: 'rgba(255,138,101,0.4)',
    sortOrder: 1,
  },
  {
    id: 'apl-002',
    premiseId: 'prm-001',
    name: 'Lighting',
    emoji: '\uD83D\uDCA1',
    kwhPerDay: 2.1,
    color: '#FFD54F',
    glowColor: 'rgba(255,213,79,0.4)',
    sortOrder: 2,
  },
  {
    id: 'apl-003',
    premiseId: 'prm-001',
    name: 'Refrigerator',
    emoji: '\uD83E\uDDCA',
    kwhPerDay: 3.2,
    color: '#4FC3F7',
    glowColor: 'rgba(79,195,247,0.4)',
    sortOrder: 3,
  },
  {
    id: 'apl-004',
    premiseId: 'prm-001',
    name: 'Water Heater',
    emoji: '\uD83D\uDEBF',
    kwhPerDay: 4.8,
    color: '#FF7043',
    glowColor: 'rgba(255,112,67,0.4)',
    sortOrder: 4,
  },
  {
    id: 'apl-005',
    premiseId: 'prm-001',
    name: 'Electronics',
    emoji: '\uD83D\uDCFA',
    kwhPerDay: 1.4,
    color: '#BA68C8',
    glowColor: 'rgba(186,104,200,0.4)',
    sortOrder: 5,
  },
];

// ──────────────────────────────────────────────────────────────────────
//  7. GREEN GOALS (from green-goals/page.tsx)
// ──────────────────────────────────────────────────────────────────────

export const SEED_GREEN_GOALS: GreenGoal[] = [
  {
    id: 'gg-001',
    premiseId: 'prm-001',
    utilityType: 'electricity',
    targetReductionPct: 15,
    baselineYear: 2018,
    targetYear: 2030,
    currentReductionPct: 15,
    status: 'on_track',
  },
  {
    id: 'gg-002',
    premiseId: 'prm-001',
    utilityType: 'water',
    targetReductionPct: 18,
    baselineYear: 2018,
    targetYear: 2030,
    currentReductionPct: 18,
    status: 'off_track',
  },
];

// ──────────────────────────────────────────────────────────────────────
//  8. GREENUP PROFILE (from greenup/page.tsx)
// ──────────────────────────────────────────────────────────────────────

export const SEED_GREENUP_PROFILE: GreenupProfile = {
  id: 'gup-001',
  userId: 'usr-001',
  levelName: 'Seed',
  levelNumber: 1,
  xpCurrent: 851,
  xpRequired: 1000,
  streakDays: 3,
  kwhSaved: 37.95,
  districtRank: 142,
  cycleEndDate: '2026-03-31',
};

// ──────────────────────────────────────────────────────────────────────
//  9. CHALLENGES & USER CHALLENGES (from greenup/page.tsx)
// ──────────────────────────────────────────────────────────────────────

export const SEED_CHALLENGES: Challenge[] = [
  // Limited time challenges
  {
    id: 'chl-001',
    title: "There's a Price to Waste",
    description: 'Learn about food waste impact',
    xpReward: 10,
    difficulty: 1,
    category: 'limited_time',
    daysLeft: 5,
    totalSteps: 1,
  },
  {
    id: 'chl-002',
    title: 'Adopt a Waste-less Lifestyle Today!',
    description: 'Complete 3 zero-waste actions',
    xpReward: 10,
    difficulty: 2,
    category: 'limited_time',
    daysLeft: 5,
    totalSteps: 3,
  },
  // Active challenges
  {
    id: 'chl-003',
    title: 'Link Utilities Account with us',
    description: 'Connect your SP Utilities account',
    xpReward: 25,
    difficulty: 1,
    category: 'active',
    totalSteps: 1,
  },
  {
    id: 'chl-004',
    title: 'Fan-tastic Savings!',
    description: 'Reduce fan usage by 10%',
    xpReward: 2,
    difficulty: 3,
    category: 'active',
    totalSteps: 7,
  },
];

export const SEED_USER_CHALLENGES: UserChallenge[] = [
  {
    id: 'uch-001',
    userId: 'usr-001',
    challengeId: 'chl-001',
    progress: 0,
    completed: false,
    challenge: SEED_CHALLENGES[0],
  },
  {
    id: 'uch-002',
    userId: 'usr-001',
    challengeId: 'chl-002',
    progress: 0,
    completed: false,
    challenge: SEED_CHALLENGES[1],
  },
  {
    id: 'uch-003',
    userId: 'usr-001',
    challengeId: 'chl-003',
    progress: 1,
    completed: true,
    completedAt: '2026-03-10T00:00:00Z',
    challenge: SEED_CHALLENGES[2],
  },
  {
    id: 'uch-004',
    userId: 'usr-001',
    challengeId: 'chl-004',
    progress: 0,
    completed: false,
    challenge: SEED_CHALLENGES[3],
  },
];

// ──────────────────────────────────────────────────────────────────────
// 10. REWARDS (from greenup/page.tsx - claimable and locked)
// ──────────────────────────────────────────────────────────────────────

export const SEED_REWARDS: Reward[] = [
  // Claimable rewards
  {
    id: 'rwd-001',
    title: '$10 Voucher for South Indian Cuisine',
    merchant: 'MANAM',
    color: 'bg-amber-500',
    iconType: 'flame',
    isLocked: false,
  },
  {
    id: 'rwd-002',
    title: '$2.50 Lava Muffin UP $6.50',
    merchant: 'KINGS CART COFFEE',
    color: 'bg-yellow-700',
    iconType: 'star',
    isLocked: false,
  },
  // Locked rewards (require level-up)
  {
    id: 'rwd-003',
    title: '50% OFF 2nd wrap (UP $6.50)',
    merchant: 'KINGS CART COFFEE',
    color: 'bg-yellow-700',
    iconType: 'star',
    requiredLevel: 'Seedling',
    isLocked: true,
  },
  {
    id: 'rwd-004',
    title: '$150 OFF Achates Yacht Rental',
    merchant: 'THE YACHT CLUB',
    color: 'bg-blue-600',
    iconType: 'zap',
    requiredLevel: 'Seedling',
    isLocked: true,
  },
  {
    id: 'rwd-005',
    title: '$10 Voucher Korean Hotpot',
    merchant: 'SEOUL GARDEN HOTPOT',
    color: 'bg-red-500',
    iconType: 'flame',
    requiredLevel: 'Sprout',
    isLocked: true,
  },
  {
    id: 'rwd-006',
    title: '$20 Hotpot Lunch Voucher',
    merchant: 'WU WANG GUO',
    color: 'bg-orange-600',
    iconType: 'flame',
    requiredLevel: 'Sprout',
    isLocked: true,
  },
  {
    id: 'rwd-007',
    title: '$3.80 Voucher TW Street Food',
    merchant: 'I LOVE TAIMEI',
    color: 'bg-pink-500',
    iconType: 'gift',
    requiredLevel: 'Bloom',
    isLocked: true,
  },
  {
    id: 'rwd-008',
    title: '20% OFF Any 3 Regular-Priced Items',
    merchant: 'WHITTARD SG',
    color: 'bg-emerald-700',
    iconType: 'leaf',
    requiredLevel: 'Bloom',
    isLocked: true,
  },
];

export const SEED_USER_REWARDS: UserReward[] = [
  {
    id: 'urw-001',
    userId: 'usr-001',
    rewardId: 'rwd-001',
    status: 'available',
    reward: SEED_REWARDS[0],
  },
  {
    id: 'urw-002',
    userId: 'usr-001',
    rewardId: 'rwd-002',
    status: 'available',
    reward: SEED_REWARDS[1],
  },
];

// ──────────────────────────────────────────────────────────────────────
// 11. EV STATIONS (from ev-charging/page.tsx)
// ──────────────────────────────────────────────────────────────────────

export const SEED_EV_STATIONS: EVStation[] = [
  {
    id: 'evs-001',
    name: 'Blk 18 Everton Rd',
    address: 'Everton Road, Singapore 081018',
    latitude: 1.2788,
    longitude: 103.8420,
    available: 3,
    total: 5,
    chargerTypes: ['AC 22'],
    distance: 0.2,
  },
  {
    id: 'evs-002',
    name: 'VivoCity',
    address: '1 HarbourFront Walk, Singapore 098585',
    latitude: 1.2644,
    longitude: 103.8223,
    available: 8,
    total: 12,
    chargerTypes: ['AC 22', 'DC 50'],
    distance: 1.5,
  },
  {
    id: 'evs-003',
    name: 'Tanjong Pagar Plaza',
    address: '1 Tanjong Pagar Plaza, Singapore 082001',
    latitude: 1.2755,
    longitude: 103.8435,
    available: 2,
    total: 4,
    chargerTypes: ['AC 22'],
    distance: 0.8,
  },
  {
    id: 'evs-004',
    name: 'Icon Village',
    address: '12 Gopeng Street, Singapore 078877',
    latitude: 1.2729,
    longitude: 103.8411,
    available: 5,
    total: 6,
    chargerTypes: ['DC 50'],
    distance: 1.1,
  },
  {
    id: 'evs-005',
    name: 'Mapletree Business City',
    address: '20 Pasir Panjang Rd, Singapore 117439',
    latitude: 1.2651,
    longitude: 103.8016,
    available: 0,
    total: 8,
    chargerTypes: ['AC 22', 'DC 50'],
    distance: 3.2,
  },
  {
    id: 'evs-006',
    name: 'HarbourFront Centre',
    address: '1 Maritime Square, Singapore 099253',
    latitude: 1.2652,
    longitude: 103.8209,
    available: 4,
    total: 10,
    chargerTypes: ['AC 22'],
    distance: 1.7,
  },
];

// ──────────────────────────────────────────────────────────────────────
// 12. APPLICATIONS (from utilities/page.tsx)
// ──────────────────────────────────────────────────────────────────────

export const SEED_APPLICATIONS: Application[] = [
  {
    id: 'app-001',
    userId: 'usr-001',
    premiseId: 'prm-001',
    type: 'open',
    status: 'reviewing',
    formData: {
      address: '18 Everton Rd',
      utilities: ['electricity', 'water'],
    },
    submittedAt: '2026-03-15T00:00:00+08:00',
    estimatedCompletion: '2026-03-20T00:00:00+08:00',
  },
];

// ──────────────────────────────────────────────────────────────────────
// 13. NOTIFICATIONS (inferred from home page alert banner)
// ──────────────────────────────────────────────────────────────────────

export const SEED_NOTIFICATIONS: Notification[] = [
  {
    id: 'ntf-001',
    userId: 'usr-001',
    title: 'Scheduled Maintenance',
    body: 'Scheduled Maintenance for 21-22 March. Some services may be temporarily unavailable.',
    type: 'maintenance',
    isRead: false,
    createdAt: '2026-03-16T09:00:00+08:00',
  },
  {
    id: 'ntf-002',
    userId: 'usr-001',
    title: 'Scam Alert',
    body: 'Be aware of scam calls impersonating SP Group. SP will never ask for your personal banking details over the phone.',
    type: 'scam_alert',
    isRead: false,
    createdAt: '2026-03-16T09:00:00+08:00',
  },
];

// ──────────────────────────────────────────────────────────────────────
// 14. GIRO ACCOUNTS (from utilities/moving/page.tsx)
// ──────────────────────────────────────────────────────────────────────

export const SEED_GIRO_ACCOUNTS: GiroAccount[] = [
  {
    id: 'gro-001',
    userId: 'usr-001',
    premiseId: 'prm-001',
    bankName: 'DBS',
    accountMask: '****1234',
    isActive: true,
  },
];

// ──────────────────────────────────────────────────────────────────────
// 15. LEADERBOARD (from greenup/page.tsx)
// ──────────────────────────────────────────────────────────────────────

export const SEED_LEADERBOARD: LeaderboardEntry[] = [
  { rank: 1, name: 'S***a', points: 2340, level: 'Bloom', isCurrentUser: false },
  { rank: 2, name: 'J***n', points: 2105, level: 'Bloom', isCurrentUser: false },
  { rank: 3, name: 'L***i', points: 1987, level: 'Sprout', isCurrentUser: false },
  { rank: 4, name: 'R***l', points: 1820, level: 'Sprout', isCurrentUser: false },
  { rank: 5, name: 'T***a', points: 1756, level: 'Sprout', isCurrentUser: false },
  { rank: 142, name: 'MAGA MATTEO LUCA', points: 851, level: 'Seed', isCurrentUser: true },
];

// ──────────────────────────────────────────────────────────────────────
// 16. SIMULATOR PRESETS (from simulator/page.tsx)
// ──────────────────────────────────────────────────────────────────────

const SIMULATOR_DEFAULTS: SimulatorInput = {
  acTemp: 24,
  acHours: 10,
  showers: 4,
  laundryLoads: 4,
  lightsWasted: 2,
  entertainment: 5,
};

export const SEED_SIMULATOR_PRESETS: SimulatorPreset[] = [
  {
    id: 'sim-001',
    name: 'Current',
    emoji: '\uD83C\uDFE0',
    values: { ...SIMULATOR_DEFAULTS },
  },
  {
    id: 'sim-002',
    name: 'Eco Mode',
    emoji: '\uD83C\uDF3F',
    values: { acTemp: 26, acHours: 6, showers: 3, laundryLoads: 3, lightsWasted: 0, entertainment: 3 },
  },
  {
    id: 'sim-003',
    name: 'Max Comfort',
    emoji: '\uD83E\uDD76',
    values: { acTemp: 20, acHours: 18, showers: 6, laundryLoads: 7, lightsWasted: 6, entertainment: 12 },
  },
  {
    id: 'sim-004',
    name: 'Vacation',
    emoji: '\uD83C\uDFD6\uFE0F',
    values: { acTemp: 28, acHours: 0, showers: 1, laundryLoads: 0, lightsWasted: 0, entertainment: 1 },
  },
];

// ──────────────────────────────────────────────────────────────────────
// DISTRICT MONTHLY DATA (from green-goals/page.tsx)
// ──────────────────────────────────────────────────────────────────────

export const SEED_DISTRICT_MONTHLY_DATA: DistrictData[] = [
  { month: 'Sep', value: 3450 },
  { month: 'Oct', value: 3280 },
  { month: 'Nov', value: 3520 },
  { month: 'Dec', value: 3690 },
  { month: 'Jan', value: 3930 },
  { month: 'Feb', value: 3170 },
];

/** Alias for green-goal.repository.ts which imports SEED_DISTRICT_DATA */
export const SEED_DISTRICT_DATA: DistrictData[] = SEED_DISTRICT_MONTHLY_DATA;

/** Alias for giro.repository.ts which imports SEED_GIRO_ARRANGEMENTS */
export const SEED_GIRO_ARRANGEMENTS: GiroArrangement[] = SEED_GIRO_ACCOUNTS;
