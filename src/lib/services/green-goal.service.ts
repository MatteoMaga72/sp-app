import { GreenGoalRepository } from '@/lib/repositories/green-goal.repository';

export class GreenGoalService {
  static async getGoals(premiseId: string) {
    return GreenGoalRepository.findByPremise(premiseId);
  }

  static async getDistrictData() {
    return GreenGoalRepository.findDistrictData();
  }
}
