export interface SimulatorInput {
  acTemp: number;
  acHours: number;
  showers: number;
  laundryLoads: number;
  lightsWasted: number;
  entertainment: number;
}

export interface SimulatorResult {
  predictedTotal: number;
  breakdown: {
    baseElectricity: number;
    acCost: number;
    waterCost: number;
    laundryCost: number;
    lightsCost: number;
    entertainmentCost: number;
    gst: number;
  };
  comparedToCurrent: number;
  savingsPerYear: number;
}

export interface SimulatorPreset {
  id: string;
  name: string;
  emoji: string;
  values: SimulatorInput;
}
