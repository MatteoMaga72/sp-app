import { SEED_APPLIANCES } from '@/lib/db/seed-data';
import type { Appliance } from '@/lib/types';

export class ApplianceRepository {
  static async findByPremise(premiseId: string): Promise<Appliance[]> {
    return SEED_APPLIANCES.filter((a) => a.premiseId === premiseId);
  }
}
