import { TransactionRepository } from '@/lib/repositories/transaction.repository';
import type { Transaction } from '@/lib/types';

export class TransactionService {
  static async listTransactions() {
    return TransactionRepository.findAll();
  }

  static async createTransaction(data: Omit<Transaction, 'id'>) {
    return TransactionRepository.create(data);
  }
}
