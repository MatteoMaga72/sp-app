import { ChallengeRepository } from '@/lib/repositories/challenge.repository';

export class ChallengeService {
  static async listChallenges() {
    return ChallengeRepository.findAll();
  }

  static async getUserChallenges() {
    return ChallengeRepository.findUserChallenges();
  }

  static async updateProgress(challengeId: string, progress: number) {
    if (progress < 0 || progress > 100) {
      throw new Error('Progress must be between 0 and 100');
    }
    const updated = await ChallengeRepository.updateProgress(challengeId, progress);
    if (!updated) throw new Error('Challenge not found');
    return updated;
  }
}
