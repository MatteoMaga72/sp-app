export interface GreenGoal {
  id: string;
  premiseId: string;
  utilityType: 'electricity' | 'water';
  targetReductionPct: number;
  baselineYear: number;
  targetYear: number;
  currentReductionPct: number;
  status: 'on_track' | 'off_track';
}

export interface GreenupProfile {
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

export interface Challenge {
  id: string;
  title: string;
  description: string;
  xpReward: number;
  difficulty: number;
  category: 'limited_time' | 'active';
  daysLeft?: number;
  totalSteps: number;
}

export interface UserChallenge {
  id: string;
  userId: string;
  challengeId: string;
  progress: number;
  completed: boolean;
  completedAt?: string;
  challenge: Challenge;
}

/** Alias for repositories that use the PascalCase "GreenUp" spelling */
export type GreenUpProfile = GreenupProfile;

export interface DistrictData {
  month: string;
  value: number;
}
