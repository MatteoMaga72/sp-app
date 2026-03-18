import { ApplianceRepository } from '@/lib/repositories/appliance.repository';

export class ApplianceService {
  static async getAppliances(premiseId: string) {
    return ApplianceRepository.findByPremise(premiseId);
  }
}
