import { SP_ELECTRICITY_RATE, GST_RATE } from '@/lib/utils/constants';
import { SimulatorRepository } from '@/lib/repositories/simulator.repository';
import type { SimulatorInput, SimulatorResult } from '@/lib/types';

export class SimulatorService {
  static calculate(input: SimulatorInput): SimulatorResult {
    const baseElectricity = 45;
    const acTempCost = Math.max(0, (25 - input.acTemp) * 8);
    const acHoursCost = input.acHours * 0.65;
    const acCost = acTempCost + acHoursCost;
    const waterCost = input.showers * 1.8 * 30;
    const laundryCost = input.laundryLoads * 1.2 * 4.3;
    const lightsCost = input.lightsWasted * 0.5 * 30;
    const entertainmentCost = input.entertainment * 0.8 * 30;
    const subtotal =
      baseElectricity +
      acCost +
      waterCost +
      laundryCost +
      lightsCost +
      entertainmentCost;
    const gst = subtotal * GST_RATE;
    const total = subtotal + gst;

    return {
      predictedTotal: Math.round(total * 100) / 100,
      breakdown: {
        baseElectricity,
        acCost,
        waterCost,
        laundryCost,
        lightsCost,
        entertainmentCost,
        gst,
      },
      comparedToCurrent: Math.round((total - 154.08) * 100) / 100,
      savingsPerYear: 0,
    };
  }

  static async getPresets() {
    return SimulatorRepository.getPresets();
  }
}
