import { SEED_PREMISES, SEED_PREMISE_MEMBERS } from '@/lib/db/seed-data';
import type { Premise, PremiseMember } from '@/lib/types';

export class PremiseRepository {
  static async findAll(): Promise<Premise[]> {
    return SEED_PREMISES;
  }

  static async findById(id: string): Promise<Premise | null> {
    return SEED_PREMISES.find((p) => p.id === id) ?? null;
  }

  static async findMembers(premiseId: string): Promise<PremiseMember[]> {
    return SEED_PREMISE_MEMBERS.filter((m) => m.premiseId === premiseId);
  }
}
