import { SEED_GREEN_GOALS, SEED_DISTRICT_DATA } from '@/lib/db/seed-data';
import type { GreenGoal, DistrictData } from '@/lib/types';

export class GreenGoalRepository {
  static async findByPremise(premiseId: string): Promise<GreenGoal[]> {
    return SEED_GREEN_GOALS.filter((g) => g.premiseId === premiseId);
  }

  static async findDistrictData(): Promise<DistrictData[]> {
    return SEED_DISTRICT_DATA;
  }
}
