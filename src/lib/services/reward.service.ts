import { RewardRepository } from '@/lib/repositories/reward.repository';

export class RewardService {
  static async listRewards() {
    return RewardRepository.findAll();
  }

  static async getUserRewards() {
    return RewardRepository.findUserRewards();
  }

  static async claimReward(rewardId: string) {
    return RewardRepository.claimReward(rewardId);
  }
}
