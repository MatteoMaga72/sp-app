import { SEED_SIMULATOR_PRESETS } from '@/lib/db/seed-data';
import type { SimulatorPreset } from '@/lib/types';

export class SimulatorRepository {
  static async getPresets(): Promise<SimulatorPreset[]> {
    return SEED_SIMULATOR_PRESETS;
  }
}
