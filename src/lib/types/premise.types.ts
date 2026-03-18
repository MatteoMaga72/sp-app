export interface Premise {
  id: string;
  addressLine1: string;
  addressLine2: string;
  postalCode: string;
  district: string;
  propertyType: 'HDB' | 'Condo' | 'Landed' | 'Commercial';
  hasElectricity: boolean;
  hasWater: boolean;
  hasGas: boolean;
}

export interface PremiseMember {
  id: string;
  premiseId: string;
  userId: string;
  role: 'owner' | 'member';
  initials: string;
  joinedAt: string;
}
