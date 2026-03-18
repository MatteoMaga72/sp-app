import { SEED_CONSUMPTION_DATA } from '@/lib/db/seed-data';
import type { ConsumptionData, UtilityType, PeriodType } from '@/lib/types';

export class ConsumptionRepository {
  static async findByPremise(
    _premiseId: string,
    utilityType?: UtilityType,
    period?: PeriodType
  ): Promise<ConsumptionData[]> {
    // Seed data is not keyed by premiseId — return all and filter by type/period
    let results: ConsumptionData[] = [...SEED_CONSUMPTION_DATA];

    if (utilityType) {
      results = results.filter((c) => c.utilityType === utilityType);
    }

    if (period) {
      results = results.filter((c) => c.period === period);
    }

    return results;
  }
}
