import { SEED_TRANSACTIONS } from '@/lib/db/seed-data';
import type { Transaction } from '@/lib/types';

export class TransactionRepository {
  static async findAll(): Promise<Transaction[]> {
    return SEED_TRANSACTIONS;
  }

  static async create(data: Omit<Transaction, 'id'>): Promise<Transaction> {
    const transaction: Transaction = {
      ...data,
      id: `txn-${Date.now()}`,
    };
    return transaction;
  }
}
