import { PremiseRepository } from '@/lib/repositories/premise.repository';

export class PremiseService {
  static async listPremises() {
    return PremiseRepository.findAll();
  }

  static async getPremise(id: string) {
    const premise = await PremiseRepository.findById(id);
    if (!premise) throw new Error('Premise not found');
    const members = await PremiseRepository.findMembers(id);
    return { ...premise, members };
  }
}
