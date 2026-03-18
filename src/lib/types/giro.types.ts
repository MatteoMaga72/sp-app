export interface GiroAccount {
  id: string;
  userId: string;
  premiseId: string;
  bankName: string;
  accountMask: string;
  isActive: boolean;
}

/** Alias used by giro.repository — same shape as GiroAccount */
export type GiroArrangement = GiroAccount;
