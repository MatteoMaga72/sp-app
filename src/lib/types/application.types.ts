export interface Application {
  id: string;
  userId: string;
  premiseId?: string;
  type: 'moving' | 'open' | 'close';
  status: 'applied' | 'reviewing' | 'approved' | 'active';
  formData: Record<string, unknown>;
  submittedAt: string;
  estimatedCompletion: string;
}

export interface MovingFormData {
  currentAddress: string;
  lastDay: string;
  newAddress: string;
  propertyType: string;
  moveInDate: string;
  sameUtilities: boolean;
  transferGiro: boolean;
}
