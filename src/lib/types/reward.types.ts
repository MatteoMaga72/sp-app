export interface Reward {
  id: string;
  title: string;
  merchant: string;
  color: string;
  iconType: string;
  requiredLevel?: string;
  isLocked: boolean;
}

export interface UserReward {
  id: string;
  userId: string;
  rewardId: string;
  status: 'available' | 'claimed' | 'expired';
  claimedAt?: string;
  reward: Reward;
}
