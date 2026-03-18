import { BillRepository } from '@/lib/repositories/bill.repository';

export class BillService {
  static async listBills(premiseId?: string) {
    return BillRepository.findAll(premiseId);
  }

  static async getBillDetail(id: string) {
    const bill = await BillRepository.findById(id);
    if (!bill) throw new Error('Bill not found');
    const lineItems = await BillRepository.findLineItems(id);
    return { ...bill, lineItems };
  }
}
