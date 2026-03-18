'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import {
  ChevronLeft,
  HelpCircle,
  Sprout,
  ArrowRight,
  Clock,
  Gift,
  Zap,
  Leaf,
  Flame,
  Recycle,
  Star,
  Lock,
  Swords,
  Trophy,
  Shield,
  VolumeX,
  Volume2,
  ChevronUp,
  Timer,
  Sparkles,
} from 'lucide-react';

// ── Data ──────────────────────────────────────────────

const claimableRewards = [
  {
    id: 1,
    title: '$10 Voucher for South Indian Cuisine',
    merchant: 'MANAM',
    color: 'bg-amber-500',
    icon: <Flame className="w-5 h-5 text-white" />,
  },
  {
    id: 2,
    title: '$2.50 Lava Muffin UP $6.50',
    merchant: 'KINGS CART COFFEE',
    color: 'bg-yellow-700',
    icon: <Star className="w-5 h-5 text-white" />,
  },
];

const levelUpRewards = [
  {
    id: 3,
    title: '50% OFF 2nd wrap (UP $6.50)',
    merchant: 'KINGS CART COFFEE',
    color: 'bg-yellow-700',
    icon: <Star className="w-5 h-5 text-white" />,
    requiredLevel: 'Seedling',
  },
  {
    id: 4,
    title: '$150 OFF Achates Yacht Rental',
    merchant: 'THE YACHT CLUB',
    color: 'bg-blue-600',
    icon: <Zap className="w-5 h-5 text-white" />,
    requiredLevel: 'Seedling',
  },
  {
    id: 5,
    title: '$10 Voucher Korean Hotpot',
    merchant: 'SEOUL GARDEN HOTPOT',
    color: 'bg-red-500',
    icon: <Flame className="w-5 h-5 text-white" />,
    requiredLevel: 'Sprout',
  },
  {
    id: 6,
    title: '$20 Hotpot Lunch Voucher',
    merchant: 'WU WANG GUO',
    color: 'bg-orange-600',
    icon: <Flame className="w-5 h-5 text-white" />,
    requiredLevel: 'Sprout',
  },
  {
    id: 7,
    title: '$3.80 Voucher TW Street Food',
    merchant: 'I LOVE TAIMEI',
    color: 'bg-pink-500',
    icon: <Gift className="w-5 h-5 text-white" />,
    requiredLevel: 'Bloom',
  },
  {
    id: 8,
    title: '20% OFF Any 3 Regular-Priced Items',
    merchant: 'WHITTARD SG',
    color: 'bg-emerald-700',
    icon: <Leaf className="w-5 h-5 text-white" />,
    requiredLevel: 'Bloom',
  },
];

const limitedTimeChallenges = [
  {
    id: 1,
    title: "There's a Price to Waste",
    description: 'Learn about food waste impact',
    points: '+10',
    xp: 10,
    color: 'bg-green-100 dark:bg-green-900/30',
    icon: <Recycle className="w-6 h-6 text-sp-green" />,
    difficulty: 1,
    daysLeft: 5,
    progress: 0,
    total: 1,
  },
  {
    id: 2,
    title: 'Adopt a Waste-less Lifestyle Today!',
    description: 'Complete 3 zero-waste actions',
    points: '+10',
    xp: 10,
    color: 'bg-teal-100 dark:bg-teal-900/30',
    icon: <Leaf className="w-6 h-6 text-sp-teal" />,
    difficulty: 2,
    daysLeft: 5,
    progress: 0,
    total: 3,
  },
];

const moreChallenges = [
  {
    id: 3,
    title: 'Link Utilities Account with us',
    description: 'Connect your SP Utilities account',
    points: 'CLAIM',
    xp: 25,
    color: 'bg-blue-100 dark:bg-blue-900/30',
    icon: <Zap className="w-6 h-6 text-blue-500" />,
    difficulty: 1,
    progress: 1,
    total: 1,
    completed: true,
  },
  {
    id: 4,
    title: 'Fan-tastic Savings!',
    description: 'Reduce fan usage by 10%',
    points: '+2',
    xp: 2,
    color: 'bg-amber-100 dark:bg-amber-900/30',
    icon: <Sprout className="w-6 h-6 text-amber-600" />,
    difficulty: 3,
    progress: 0,
    total: 7,
  },
];

const leaderboardData = [
  { rank: 1, name: 'S***a', points: 2340, level: 'Bloom' },
  { rank: 2, name: 'J***n', points: 2105, level: 'Bloom' },
  { rank: 3, name: 'L***i', points: 1987, level: 'Sprout' },
  { rank: 4, name: 'R***l', points: 1820, level: 'Sprout' },
  { rank: 5, name: 'T***a', points: 1756, level: 'Sprout' },
];

const myRank = { rank: 142, name: 'MAGA MATTEO LUCA', points: 851, level: 'Seed' };

// ── Hooks ──────────────────────────────────────────────

function useCountUp(target: number, duration = 1200) {
  const [value, setValue] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const counted = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !counted.current) {
          counted.current = true;
          const start = performance.now();
          const animate = (now: number) => {
            const elapsed = now - start;
            const progress = Math.min(elapsed / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            setValue(Math.round(eased * target));
            if (progress < 1) requestAnimationFrame(animate);
          };
          requestAnimationFrame(animate);
        }
      },
      { threshold: 0.3 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [target, duration]);

  return { value, ref };
}

// ── Sparkle Particles ──────────────────────────────────

function SparkleParticles() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {Array.from({ length: 12 }).map((_, i) => (
        <div
          key={i}
          className="absolute w-1 h-1 rounded-full bg-white/40"
          style={{
            left: `${10 + (i * 17) % 80}%`,
            top: `${5 + (i * 23) % 70}%`,
            animation: `sparkleFloat ${3 + (i % 3)}s ease-in-out ${i * 0.4}s infinite`,
          }}
        />
      ))}
      <style>{`
        @keyframes sparkleFloat {
          0%, 100% { opacity: 0; transform: translateY(0) scale(0.5); }
          50% { opacity: 1; transform: translateY(-15px) scale(1.2); }
        }
      `}</style>
    </div>
  );
}

// ── XP Bar with shimmer ────────────────────────────────

function XPBar({ progress }: { progress: number }) {
  const [width, setWidth] = useState(0);
  useEffect(() => {
    const t = setTimeout(() => setWidth(progress), 300);
    return () => clearTimeout(t);
  }, [progress]);

  return (
    <div className="w-full h-4 bg-black/30 rounded-full overflow-hidden relative">
      <div
        className="h-full rounded-full relative transition-all duration-1000 ease-out"
        style={{
          width: `${width}%`,
          background: 'linear-gradient(90deg, #00BFA5, #4CAF50, #CDDC39)',
        }}
      >
        <div
          className="absolute inset-0 rounded-full"
          style={{
            background:
              'linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.4) 50%, transparent 100%)',
            backgroundSize: '200% 100%',
            animation: 'shimmerBar 2s ease-in-out infinite',
          }}
        />
      </div>
      <style>{`
        @keyframes shimmerBar {
          0% { background-position: -200% 0; }
          100% { background-position: 200% 0; }
        }
      `}</style>
    </div>
  );
}

// ── Circular Progress Ring ─────────────────────────────

function ProgressRing({
  progress,
  total,
  size = 48,
  strokeWidth = 4,
  color = '#00BFA5',
}: {
  progress: number;
  total: number;
  size?: number;
  strokeWidth?: number;
  color?: string;
}) {
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const pct = total > 0 ? progress / total : 0;
  const offset = circumference * (1 - pct);

  return (
    <div className="relative flex items-center justify-center" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="-rotate-90">
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="currentColor"
          strokeWidth={strokeWidth}
          className="text-gray-200 dark:text-gray-700"
        />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke={color}
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
          className="transition-all duration-700 ease-out"
        />
      </svg>
      <span className="absolute text-[10px] font-bold text-sp-dark">
        {progress}/{total}
      </span>
    </div>
  );
}

// ── Header ─────────────────────────────────────────────

function Header() {
  const [soundOn, setSoundOn] = useState(false);
  return (
    <div className="relative flex items-center justify-between px-4 pt-4 pb-2 z-10">
      <div className="flex items-center gap-2">
        <ChevronLeft className="w-6 h-6 text-white/70" />
        <h1 className="text-xl font-bold tracking-tight">
          <span className="text-teal-300">Green</span>
          <span className="bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent">
            UP
          </span>
        </h1>
      </div>
      <div className="flex items-center gap-3">
        <button
          onClick={() => setSoundOn(!soundOn)}
          className="press-effect text-white/50 hover:text-white/80"
        >
          {soundOn ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
        </button>
        <button className="flex items-center gap-1 text-sm text-teal-300 font-medium press-effect">
          <HelpCircle className="w-4 h-4" />
          <span className="hidden min-[380px]:inline">How it works</span>
        </button>
      </div>
    </div>
  );
}

// ── Hero: Level & XP ───────────────────────────────────

function HeroSection() {
  return (
    <div className="relative px-4 pt-2 pb-6">
      <SparkleParticles />

      {/* Level Badge */}
      <div className="relative flex flex-col items-center mb-4 z-10">
        <div className="animate-bounce-in">
          {/* Hexagonal shield container */}
          <div
            className="relative w-24 h-28 flex items-center justify-center"
            style={{
              filter: 'drop-shadow(0 0 20px rgba(0,191,165,0.5))',
            }}
          >
            <svg viewBox="0 0 100 115" className="absolute inset-0 w-full h-full">
              <polygon
                points="50,2 95,28 95,87 50,113 5,87 5,28"
                fill="none"
                stroke="url(#shieldGrad)"
                strokeWidth="3"
              />
              <polygon
                points="50,8 89,31 89,84 50,107 11,84 11,31"
                fill="url(#shieldFill)"
              />
              <defs>
                <linearGradient id="shieldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#00BFA5" />
                  <stop offset="100%" stopColor="#CDDC39" />
                </linearGradient>
                <linearGradient id="shieldFill" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="rgba(0,191,165,0.25)" />
                  <stop offset="100%" stopColor="rgba(0,191,165,0.05)" />
                </linearGradient>
              </defs>
            </svg>
            <div className="relative text-center z-10">
              <p className="text-[10px] font-bold text-teal-300/80 tracking-widest">LVL</p>
              <p className="text-3xl font-black text-white leading-none">1</p>
            </div>
          </div>
        </div>

        {/* Level name with shimmer */}
        <div className="mt-1 animate-fade-in-up delay-200" style={{ opacity: 0 }}>
          <span
            className="text-lg font-black tracking-[0.3em] text-transparent bg-clip-text"
            style={{
              backgroundImage:
                'linear-gradient(90deg, #00BFA5, #4CAF50, #CDDC39, #00BFA5)',
              backgroundSize: '200% 100%',
              animation: 'shimmerText 3s linear infinite',
            }}
          >
            SEED
          </span>
        </div>

        <style>{`
          @keyframes shimmerText {
            0% { background-position: 0% 50%; }
            100% { background-position: 200% 50%; }
          }
        `}</style>
      </div>

      {/* XP Bar */}
      <div className="relative z-10 animate-fade-in-up delay-300" style={{ opacity: 0 }}>
        <div className="flex items-center justify-between mb-1.5">
          <span className="text-xs font-bold text-white/60">851 / 1000 XP</span>
          <span className="text-xs text-white/40 flex items-center gap-1">
            <Clock className="w-3 h-3" />
            Cycle ends 31 Mar
          </span>
        </div>
        <XPBar progress={51} />
        <div className="flex items-center justify-between mt-1.5">
          <div className="flex items-center gap-1">
            <span
              className="text-sm font-black text-teal-300"
              style={{ animation: 'pulse 2s ease-in-out infinite' }}
            >
              149
            </span>
            <span className="text-xs text-white/50">XP to next level</span>
          </div>
          <div className="flex items-center gap-1 text-white/30 text-xs">
            <ArrowRight className="w-3 h-3" />
            <span className="font-semibold tracking-wider">SEEDLING</span>
          </div>
        </div>
      </div>
    </div>
  );
}

// ── Stats Dashboard ────────────────────────────────────

function StatsDashboard() {
  const streak = useCountUp(3, 800);
  const kwh = useCountUp(3795, 1200);
  const rank = useCountUp(142, 1000);

  return (
    <div
      ref={streak.ref}
      className="px-4 mb-3 grid grid-cols-3 gap-2 relative z-10 animate-fade-in-up delay-400"
      style={{ opacity: 0 }}
    >
      {/* Streak */}
      <div className="glass-strong rounded-2xl p-3 text-center hover-lift relative overflow-hidden">
        <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-orange-500 to-red-500" />
        <div className="text-xl mb-0.5">
          <span style={{ animation: 'flicker 1.5s ease-in-out infinite' }}>🔥</span>
        </div>
        <p className="text-lg font-black text-sp-dark">{streak.value}</p>
        <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Day Streak</p>
        <style>{`
          @keyframes flicker {
            0%, 100% { transform: scale(1); }
            50% { transform: scale(1.15) rotate(-5deg); }
          }
        `}</style>
      </div>

      {/* kWh Saved */}
      <div ref={kwh.ref} className="glass-strong rounded-2xl p-3 text-center hover-lift relative overflow-hidden">
        <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-teal-400 to-emerald-500" />
        <div className="text-xl mb-0.5">⚡</div>
        <p className="text-lg font-black text-sp-dark">{(kwh.value / 100).toFixed(2)}</p>
        <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">kWh Saved</p>
      </div>

      {/* Rank */}
      <div ref={rank.ref} className="glass-strong rounded-2xl p-3 text-center hover-lift relative overflow-hidden">
        <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-yellow-400 to-amber-500" />
        <div className="text-xl mb-0.5">🏆</div>
        <p className="text-lg font-black text-sp-dark">#{rank.value}</p>
        <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">District</p>
      </div>
    </div>
  );
}

// ── Tab Bar (Game Menu Style) ──────────────────────────

function TabBar({
  activeTab,
  onTabChange,
}: {
  activeTab: string;
  onTabChange: (tab: string) => void;
}) {
  const tabs = ['Rewards', 'Quests', 'Leaderboard'];
  const tabIcons: Record<string, React.ReactNode> = {
    Rewards: <Gift className="w-3.5 h-3.5" />,
    Quests: <Swords className="w-3.5 h-3.5" />,
    Leaderboard: <Trophy className="w-3.5 h-3.5" />,
  };

  const activeIndex = tabs.indexOf(activeTab);

  return (
    <div className="mx-4 mb-2 relative z-10 animate-fade-in-up delay-500" style={{ opacity: 0 }}>
      <div className="glass-strong rounded-2xl p-1 relative">
        {/* Sliding indicator */}
        <div
          className="absolute top-1 bottom-1 rounded-xl transition-all duration-300 ease-out animate-pulse-glow"
          style={{
            width: `${100 / tabs.length}%`,
            left: `${(activeIndex * 100) / tabs.length}%`,
            background: 'rgba(0, 191, 165, 0.15)',
            borderBottom: '2px solid #00BFA5',
          }}
        />
        <div className="relative flex">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => onTabChange(tab)}
              className={`flex-1 flex items-center justify-center gap-1.5 py-2.5 text-xs font-bold rounded-xl transition-colors duration-200 press-effect ${
                activeTab === tab ? 'text-sp-teal' : 'text-gray-400'
              }`}
            >
              {tabIcons[tab]}
              {tab}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

// ── Rewards Tab ────────────────────────────────────────

function ClaimableRewardCard({
  reward,
  index,
}: {
  reward: (typeof claimableRewards)[number];
  index: number;
}) {
  return (
    <div
      className="relative flex items-center gap-3 glass-strong rounded-2xl p-3 hover-lift animate-slide-in-right overflow-hidden"
      style={{
        animationDelay: `${(index + 1) * 100}ms`,
        opacity: 0,
      }}
    >
      {/* Golden shimmer border */}
      <div
        className="absolute inset-0 rounded-2xl pointer-events-none"
        style={{
          border: '2px solid',
          borderImage: 'linear-gradient(135deg, #FFD700, #FFA500, #FFD700) 1',
          borderRadius: 'inherit',
          maskImage: 'linear-gradient(#fff 0 0)',
          WebkitMaskImage: 'linear-gradient(#fff 0 0)',
        }}
      />
      {/* Shimmer overlay */}
      <div className="absolute inset-0 animate-shimmer rounded-2xl pointer-events-none" style={{ background: 'linear-gradient(90deg, transparent 0%, rgba(255,215,0,0.15) 50%, transparent 100%)', backgroundSize: '200% 100%' }} />
      <div className={`w-11 h-11 rounded-xl ${reward.color} flex items-center justify-center shrink-0`}>
        {reward.icon}
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-sm font-semibold text-sp-dark leading-tight truncate">{reward.title}</p>
        <p className="text-xs text-gray-400 mt-0.5">{reward.merchant}</p>
      </div>
      <button
        className="px-4 py-1.5 text-xs font-bold rounded-full shrink-0 spring-button text-white"
        style={{
          background: 'linear-gradient(135deg, #FFD700, #FFA500)',
          animation: 'pulseGlow 2s ease-in-out infinite',
          boxShadow: '0 0 15px rgba(255,165,0,0.4)',
        }}
      >
        CLAIM
      </button>
      <style>{`
        @keyframes rotateBorder {
          0% { filter: hue-rotate(0deg); }
          100% { filter: hue-rotate(30deg); }
        }
      `}</style>
    </div>
  );
}

function LockedRewardCard({
  reward,
  index,
}: {
  reward: (typeof levelUpRewards)[number];
  index: number;
}) {
  return (
    <div
      className={`relative flex items-center gap-3 glass-subtle rounded-2xl p-3 opacity-60 animate-fade-in-up delay-${Math.min((index + 3) * 100, 700)}`}
      style={{ opacity: 0 }}
    >
      {/* Lock overlay */}
      <div className="absolute inset-0 rounded-2xl flex items-center justify-end pr-3 pointer-events-none z-10">
        <Lock className="w-4 h-4 text-gray-400" />
      </div>
      <div className={`w-11 h-11 rounded-xl bg-gray-300 dark:bg-gray-600 flex items-center justify-center shrink-0 grayscale`}>
        {reward.icon}
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-sm font-semibold text-gray-400 leading-tight truncate">{reward.title}</p>
        <p className="text-[10px] text-gray-400/60 mt-0.5">{reward.merchant}</p>
        <div className="flex items-center gap-1 mt-1">
          <Shield className="w-3 h-3 text-gray-400/60" />
          <span className="text-[10px] font-bold text-gray-400/60 uppercase tracking-wider">
            Reach {reward.requiredLevel} to unlock
          </span>
        </div>
      </div>
    </div>
  );
}

function RewardsTab() {
  return (
    <div className="px-4 mt-4 space-y-5 pb-6">
      {/* Available Loot */}
      <div>
        <div className="flex items-center gap-2 mb-3">
          <span className="text-lg">🎁</span>
          <h2 className="text-sm font-black text-sp-dark uppercase tracking-wider">
            Available Loot
          </h2>
          <span className="ml-auto bg-gradient-to-r from-yellow-400 to-orange-500 text-white text-xs font-black px-2.5 py-0.5 rounded-full animate-bounce-in">
            {claimableRewards.length}
          </span>
        </div>
        <div className="space-y-2">
          {claimableRewards.map((reward, i) => (
            <ClaimableRewardCard key={reward.id} reward={reward} index={i} />
          ))}
        </div>
      </div>

      {/* Locked Rewards */}
      <div>
        <div className="flex items-center gap-2 mb-3">
          <Lock className="w-4 h-4 text-gray-400" />
          <h2 className="text-sm font-black text-gray-400 uppercase tracking-wider">
            Locked Rewards
          </h2>
        </div>
        <div className="space-y-2">
          {levelUpRewards.map((reward, i) => (
            <LockedRewardCard key={reward.id} reward={reward} index={i} />
          ))}
        </div>
      </div>
    </div>
  );
}

// ── Quests Tab ─────────────────────────────────────────

function QuestCard({
  quest,
  index,
  limited,
}: {
  quest: (typeof limitedTimeChallenges)[number] & {
    completed?: boolean;
    description?: string;
    xp?: number;
    difficulty?: number;
    daysLeft?: number;
    progress?: number;
    total?: number;
  };
  index: number;
  limited?: boolean;
}) {
  const difficultyColors = ['border-green-400', 'border-yellow-400', 'border-red-400'];
  const borderColor = difficultyColors[(quest.difficulty ?? 1) - 1] || 'border-green-400';
  const isCompleted = quest.completed;

  return (
    <div
      className={`relative flex items-center gap-3 glass rounded-2xl p-3 hover-lift animate-slide-in-right border-l-4 ${borderColor} delay-${Math.min((index + 1) * 100, 700)}`}
      style={{ opacity: 0 }}
    >
      {/* Progress Ring */}
      <div className="shrink-0">
        {isCompleted ? (
          <div className="w-12 h-12 rounded-full bg-green-500/20 flex items-center justify-center">
            <span className="text-xl">✅</span>
          </div>
        ) : (
          <ProgressRing
            progress={quest.progress ?? 0}
            total={quest.total ?? 1}
            color={
              (quest.difficulty ?? 1) === 1
                ? '#4CAF50'
                : (quest.difficulty ?? 1) === 2
                  ? '#CDDC39'
                  : '#FF5722'
            }
          />
        )}
      </div>

      {/* Quest Info */}
      <div className="flex-1 min-w-0">
        <p className="text-sm font-bold text-sp-dark leading-tight">{quest.title}</p>
        {quest.description && (
          <p className="text-[11px] text-gray-400 mt-0.5">{quest.description}</p>
        )}
        <div className="flex items-center gap-2 mt-1.5">
          <span className="text-[10px] font-black bg-sp-teal/10 text-sp-teal px-2 py-0.5 rounded-full">
            +{quest.xp ?? 10} XP
          </span>
          {limited && quest.daysLeft && (
            <span
              className="text-[10px] font-bold bg-red-500/10 text-red-400 px-2 py-0.5 rounded-full flex items-center gap-0.5"
              style={{ animation: 'pulse 2s ease-in-out infinite' }}
            >
              <Timer className="w-2.5 h-2.5" />
              {quest.daysLeft}d left
            </span>
          )}
        </div>
      </div>

      {/* Difficulty Stars */}
      <div className="shrink-0 flex flex-col items-center gap-1">
        <div className="flex gap-0.5">
          {Array.from({ length: 3 }).map((_, i) => (
            <Star
              key={i}
              className={`w-3 h-3 ${
                i < (quest.difficulty ?? 1) ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300 dark:text-gray-600'
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

function QuestsTab() {
  return (
    <div className="px-4 mt-4 space-y-5 pb-6">
      {/* Limited Time Quests */}
      <div>
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            <span className="text-lg">⏳</span>
            <h2 className="text-sm font-black text-sp-dark uppercase tracking-wider">
              Limited Time
            </h2>
            <span
              className="text-[10px] font-bold bg-red-500/10 text-red-400 px-2 py-0.5 rounded-full"
              style={{ animation: 'pulse 2s ease-in-out infinite' }}
            >
              5d left
            </span>
          </div>
          <span className="text-xs text-gray-400 font-bold">0/21</span>
        </div>
        <div className="flex items-center gap-2 mb-3">
          <div className="flex-1 h-2 bg-gray-100 dark:bg-gray-700 rounded-full overflow-hidden">
            <div className="h-full w-0 bg-gradient-to-r from-orange-500 to-red-500 rounded-full" />
          </div>
        </div>
        <div className="space-y-2">
          {limitedTimeChallenges.map((quest, i) => (
            <QuestCard key={quest.id} quest={quest} index={i} limited />
          ))}
        </div>
      </div>

      {/* More Quests */}
      <div>
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            <span className="text-lg">⚔️</span>
            <h2 className="text-sm font-black text-sp-dark uppercase tracking-wider">
              Active Quests
            </h2>
          </div>
          <span className="text-xs text-gray-400 font-bold">1/26</span>
        </div>
        <div className="flex items-center gap-2 mb-3">
          <div className="flex-1 h-2 bg-gray-100 dark:bg-gray-700 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-teal-400 to-emerald-500 rounded-full"
              style={{ width: `${(1 / 26) * 100}%` }}
            />
          </div>
        </div>
        <div className="space-y-2">
          {moreChallenges.map((quest, i) => (
            <QuestCard key={quest.id} quest={quest} index={i} />
          ))}
        </div>
      </div>
    </div>
  );
}

// ── Leaderboard Tab ────────────────────────────────────

function LeaderboardTab() {
  const maxPoints = leaderboardData[0].points;
  const medals = ['🥇', '🥈', '🥉'];

  // Weekly reset countdown
  const getTimeUntilMonday = useCallback(() => {
    const now = new Date();
    const daysUntilMonday = (8 - now.getDay()) % 7 || 7;
    const nextMonday = new Date(now);
    nextMonday.setDate(now.getDate() + daysUntilMonday);
    nextMonday.setHours(0, 0, 0, 0);
    const diff = nextMonday.getTime() - now.getTime();
    const d = Math.floor(diff / 86400000);
    const h = Math.floor((diff % 86400000) / 3600000);
    return `${d}d ${h}h`;
  }, []);

  const [countdown, setCountdown] = useState('');
  useEffect(() => {
    setCountdown(getTimeUntilMonday());
    const interval = setInterval(() => setCountdown(getTimeUntilMonday()), 60000);
    return () => clearInterval(interval);
  }, [getTimeUntilMonday]);

  return (
    <div className="px-4 mt-4 space-y-4 pb-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="text-lg">🏅</span>
          <h2 className="text-sm font-black text-sp-dark uppercase tracking-wider">
            District Rankings
          </h2>
        </div>
        <div className="flex items-center gap-1 text-[10px] text-gray-400 font-bold">
          <Clock className="w-3 h-3" />
          Resets in {countdown}
        </div>
      </div>

      {/* My Rank - special card */}
      <div
        className="glass-strong rounded-2xl p-3 relative overflow-hidden animate-fade-in-up hover-lift"
        style={{
          borderImage: 'linear-gradient(135deg, #FFD700, #00BFA5) 1',
        }}
      >
        <div
          className="absolute inset-0 rounded-2xl pointer-events-none"
          style={{
            border: '1.5px solid transparent',
            backgroundImage:
              'linear-gradient(rgba(0,0,0,0), rgba(0,0,0,0)), linear-gradient(135deg, #FFD700, #00BFA5)',
            backgroundOrigin: 'border-box',
            backgroundClip: 'padding-box, border-box',
          }}
        />
        <div className="flex items-center gap-3 relative z-10">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-yellow-400 to-amber-500 flex items-center justify-center shrink-0">
            <span className="text-sm font-black text-white">#{myRank.rank}</span>
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-black text-sp-dark truncate">{myRank.name}</p>
            <div className="flex items-center gap-2 mt-0.5">
              <span className="text-xs text-gray-400 font-bold">{myRank.points} pts</span>
              <span className="text-[10px] font-bold bg-sp-teal/10 text-sp-teal px-2 py-0.5 rounded-full">
                {myRank.level}
              </span>
            </div>
          </div>
          <Sparkles className="w-5 h-5 text-yellow-400" />
        </div>
      </div>

      {/* Motivational text */}
      <div className="flex items-center gap-1.5 justify-center">
        <ChevronUp className="w-4 h-4 text-sp-teal" />
        <p className="text-xs text-gray-400 font-semibold text-center">
          Move up <span className="text-sp-teal font-black">12 places</span> to enter Top 130!
        </p>
      </div>

      {/* Top 5 */}
      <div className="space-y-2">
        {leaderboardData.map((player, i) => (
          <div
            key={player.rank}
            className={`flex items-center gap-3 glass rounded-2xl p-3 animate-slide-in-right delay-${Math.min((i + 1) * 100, 700)}`}
            style={{ opacity: 0 }}
          >
            <div className="w-8 text-center shrink-0">
              {i < 3 ? (
                <span className="text-lg">{medals[i]}</span>
              ) : (
                <span className="text-sm font-black text-gray-400">#{player.rank}</span>
              )}
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between mb-1">
                <p className="text-sm font-bold text-sp-dark">{player.name}</p>
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-bold bg-sp-teal/10 text-sp-teal px-1.5 py-0.5 rounded-full">
                    {player.level}
                  </span>
                  <span className="text-xs font-black text-gray-400">{player.points}</span>
                </div>
              </div>
              {/* Relative bar */}
              <div className="w-full h-1.5 bg-gray-100 dark:bg-gray-700 rounded-full overflow-hidden">
                <div
                  className="h-full rounded-full transition-all duration-700 ease-out"
                  style={{
                    width: `${(player.points / maxPoints) * 100}%`,
                    background:
                      i === 0
                        ? 'linear-gradient(90deg, #FFD700, #FFA500)'
                        : i === 1
                          ? 'linear-gradient(90deg, #C0C0C0, #A0A0A0)'
                          : i === 2
                            ? 'linear-gradient(90deg, #CD7F32, #B8860B)'
                            : 'linear-gradient(90deg, #00BFA5, #4CAF50)',
                  }}
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ── Main Page ──────────────────────────────────────────

export default function GreenUPPage() {
  const [activeTab, setActiveTab] = useState('Rewards');

  return (
    <div className="min-h-screen bg-gray-900 dark:bg-gray-900">
      {/* Hero gradient background */}
      <div
        className="pb-2"
        style={{
          background:
            'linear-gradient(180deg, #042f2e 0%, #064e3b 40%, #0f172a 70%, #ffffff 100%)',
        }}
      >
        <div
          className="dark:!bg-none"
          style={{
            background:
              'linear-gradient(180deg, #042f2e 0%, #064e3b 40%, #0f172a 70%, #f8fafc 100%)',
          }}
        >
          <Header />
          <HeroSection />
          <StatsDashboard />
          <TabBar activeTab={activeTab} onTabChange={setActiveTab} />
        </div>
      </div>

      {/* Tab Content */}
      <div className="bg-white dark:bg-gray-900 min-h-[50vh]">
        {activeTab === 'Rewards' && <RewardsTab />}
        {activeTab === 'Quests' && <QuestsTab />}
        {activeTab === 'Leaderboard' && <LeaderboardTab />}
      </div>
    </div>
  );
}
