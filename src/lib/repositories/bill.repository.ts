import { SEED_BILLS, SEED_BILL_LINE_ITEMS } from '@/lib/db/seed-data';
import type { Bill, BillLineItem } from '@/lib/types';

export class BillRepository {
  static async findAll(premiseId?: string): Promise<Bill[]> {
    if (premiseId) return SEED_BILLS.filter((b) => b.premiseId === premiseId);
    return SEED_BILLS;
  }

  static async findById(id: string): Promise<Bill | null> {
    return SEED_BILLS.find((b) => b.id === id) ?? null;
  }

  static async findLineItems(billId: string): Promise<BillLineItem[]> {
    return SEED_BILL_LINE_ITEMS.filter((li) => li.billId === billId);
  }
}
