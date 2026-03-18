import { NextRequest } from 'next/server';
import { BillService } from '@/lib/services/bill.service';
import { successResponse, errorResponse, notFoundResponse } from '@/lib/utils/api-response';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const bill = await BillService.getBillDetail(id);
    return successResponse(bill);
  } catch (error) {
    if (error instanceof Error && error.message === 'Bill not found') {
      return notFoundResponse('Bill');
    }
    return errorResponse('Failed to fetch bill');
  }
}
