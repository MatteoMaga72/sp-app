import { SEED_GIRO_ARRANGEMENTS } from '@/lib/db/seed-data';
import type { GiroArrangement } from '@/lib/types';

export class GiroRepository {
  static async findByUser(): Promise<GiroArrangement[]> {
    return SEED_GIRO_ARRANGEMENTS;
  }

  static async create(
    data: Omit<GiroArrangement, 'id'>
  ): Promise<GiroArrangement> {
    return {
      ...data,
      id: `gro-${Date.now()}`,
    };
  }
}
