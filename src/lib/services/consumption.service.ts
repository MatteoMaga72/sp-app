import { ConsumptionRepository } from '@/lib/repositories/consumption.repository';
import type { UtilityType, PeriodType } from '@/lib/types';

export class ConsumptionService {
  static async getConsumption(
    premiseId: string,
    utilityType?: UtilityType,
    period?: PeriodType
  ) {
    return ConsumptionRepository.findByPremise(premiseId, utilityType, period);
  }
}
