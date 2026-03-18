import { PremiseService } from '@/lib/services/premise.service';
import { successResponse, errorResponse } from '@/lib/utils/api-response';

export async function GET() {
  try {
    const premises = await PremiseService.listPremises();
    return successResponse(premises);
  } catch (error) {
    return errorResponse('Failed to fetch premises');
  }
}
