import { SEED_GREENUP_PROFILE } from '@/lib/db/seed-data';
import type { GreenUpProfile } from '@/lib/types';

export class GreenUpRepository {
  static async findProfile(): Promise<GreenUpProfile> {
    return SEED_GREENUP_PROFILE;
  }

  static async updateProfile(data: Partial<GreenUpProfile>): Promise<GreenUpProfile> {
    return { ...SEED_GREENUP_PROFILE, ...data };
  }
}
