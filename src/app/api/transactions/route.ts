import { NextRequest } from 'next/server';
import { TransactionService } from '@/lib/services/transaction.service';
import { successResponse, errorResponse, badRequestResponse } from '@/lib/utils/api-response';

export async function GET() {
  try {
    const transactions = await TransactionService.listTransactions();
    return successResponse(transactions);
  } catch (error) {
    return errorResponse('Failed to fetch transactions');
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    if (!body.amount || !body.type) {
      return badRequestResponse('amount and type are required');
    }
    const transaction = await TransactionService.createTransaction(body);
    return successResponse(transaction, 201);
  } catch (error) {
    return errorResponse('Failed to create transaction');
  }
}
