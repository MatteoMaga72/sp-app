import { SEED_LEADERBOARD } from '@/lib/db/seed-data';
import type { LeaderboardEntry } from '@/lib/types';

export class LeaderboardRepository {
  static async findByDistrict(_district?: string): Promise<LeaderboardEntry[]> {
    // Seed data is not keyed by district — return all entries
    return SEED_LEADERBOARD;
  }
}
