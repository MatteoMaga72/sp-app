export interface Appliance {
  id: string;
  premiseId: string;
  name: string;
  emoji: string;
  kwhPerDay: number;
  color: string;
  glowColor: string;
  sortOrder: number;
}
