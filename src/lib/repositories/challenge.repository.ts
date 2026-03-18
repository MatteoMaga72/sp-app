import { SEED_CHALLENGES, SEED_USER_CHALLENGES } from '@/lib/db/seed-data';
import type { Challenge, UserChallenge } from '@/lib/types';

export class ChallengeRepository {
  static async findAll(): Promise<Challenge[]> {
    return SEED_CHALLENGES;
  }

  static async findUserChallenges(): Promise<UserChallenge[]> {
    return SEED_USER_CHALLENGES;
  }

  static async updateProgress(
    challengeId: string,
    progress: number
  ): Promise<UserChallenge | null> {
    const challenge = SEED_USER_CHALLENGES.find(
      (c) => c.challengeId === challengeId
    );
    if (!challenge) return null;
    return { ...challenge, progress };
  }
}
