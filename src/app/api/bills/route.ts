import { NextRequest } from 'next/server';
import { BillService } from '@/lib/services/bill.service';
import { successResponse, errorResponse } from '@/lib/utils/api-response';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const premiseId = searchParams.get('premiseId') ?? undefined;
    const bills = await BillService.listBills(premiseId);
    return successResponse(bills);
  } catch (error) {
    return errorResponse('Failed to fetch bills');
  }
}
