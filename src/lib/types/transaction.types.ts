export interface Transaction {
  id: string;
  premiseId: string;
  billId?: string;
  type: 'bill' | 'payment';
  paymentMethod?: 'giro' | 'paynow' | 'card';
  amount: number;
  label: string;
  status: 'pending' | 'success' | 'failed';
  transactionDate: string;
  slug?: string;
}
