import { SEED_REWARDS, SEED_USER_REWARDS } from '@/lib/db/seed-data';
import type { Reward, UserReward } from '@/lib/types';

export class RewardRepository {
  static async findAll(): Promise<Reward[]> {
    return SEED_REWARDS;
  }

  static async findUserRewards(): Promise<UserReward[]> {
    return SEED_USER_REWARDS;
  }

  static async claimReward(rewardId: string): Promise<UserReward> {
    const reward = SEED_REWARDS.find((r) => r.id === rewardId) ?? SEED_REWARDS[0];
    return {
      id: `ur-${Date.now()}`,
      rewardId,
      userId: 'usr-001',
      claimedAt: new Date().toISOString(),
      status: 'claimed',
      reward,
    };
  }
}
