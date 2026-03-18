export interface Bill {
  id: string;
  premiseId: string;
  billMonth: string; // '2026-03-01'
  totalAmount: number;
  status: 'unpaid' | 'paid' | 'overdue';
  dueDate: string;
  pdfUrl?: string;
}

export interface BillLineItem {
  id: string;
  billId: string;
  category: 'electricity' | 'water' | 'gas' | 'gst';
  label: string;
  amount: number;
  detail: string;
  percentage: number;
  sortOrder: number;
}

export interface BillDetail extends Bill {
  lineItems: BillLineItem[];
  previousTotal: number;
  savings: number;
  comparison: BillComparison[];
  insights: BillInsight[];
  dailyUsage: DailyUsage[];
}

export interface BillComparison {
  label: string;
  previous: number;
  current: number;
  changePercent: number;
  color: string;
}

export interface BillInsight {
  icon: string;
  text: string;
  borderColor: string;
}

export interface DailyUsage {
  day: number;
  kWh: number;
}
