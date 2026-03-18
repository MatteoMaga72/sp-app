import { NextRequest } from 'next/server';
import { GreenUpService } from '@/lib/services/greenup.service';
import { successResponse, errorResponse } from '@/lib/utils/api-response';

export async function GET() {
  try {
    const profile = await GreenUpService.getProfile();
    return successResponse(profile);
  } catch (error) {
    return errorResponse('Failed to fetch GreenUp profile');
  }
}

export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();
    const updated = await GreenUpService.updateProfile(body);
    return successResponse(updated);
  } catch (error) {
    return errorResponse('Failed to update GreenUp profile');
  }
}
