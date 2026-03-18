import { LeaderboardRepository } from '@/lib/repositories/leaderboard.repository';

export class LeaderboardService {
  static async getLeaderboard(district?: string) {
    return LeaderboardRepository.findByDistrict(district);
  }
}
