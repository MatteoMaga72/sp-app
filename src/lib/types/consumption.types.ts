export type UtilityType = 'electricity' | 'water' | 'gas';
export type PeriodType = 'today' | 'week' | 'month' | 'year';

export interface ConsumptionReading {
  id: string;
  premiseId: string;
  utilityType: UtilityType;
  readingValue: number;
  periodType: PeriodType;
  periodStart: string;
  periodEnd: string;
}

export interface ConsumptionDataPoint {
  label: string;
  value: number;
}

export interface ConsumptionData {
  utilityType: UtilityType;
  period: PeriodType;
  unit: string;
  data: ConsumptionDataPoint[];
  lastUpdated: string;
}
