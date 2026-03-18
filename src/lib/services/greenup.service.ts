import { GreenUpRepository } from '@/lib/repositories/greenup.repository';
import type { GreenUpProfile } from '@/lib/types';

export class GreenUpService {
  static async getProfile() {
    return GreenUpRepository.findProfile();
  }

  static async updateProfile(data: Partial<GreenUpProfile>) {
    return GreenUpRepository.updateProfile(data);
  }
}
