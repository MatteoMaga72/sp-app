import { GiroRepository } from '@/lib/repositories/giro.repository';
import type { GiroArrangement } from '@/lib/types';

export class GiroService {
  static async getArrangements() {
    return GiroRepository.findByUser();
  }

  static async createArrangement(
    data: Omit<GiroArrangement, 'id'>
  ) {
    return GiroRepository.create(data);
  }
}
