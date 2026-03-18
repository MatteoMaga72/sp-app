import { NextRequest } from 'next/server';
import { UserService } from '@/lib/services/user.service';
import { successResponse, errorResponse } from '@/lib/utils/api-response';

export async function GET() {
  try {
    const preferences = await UserService.getPreferences();
    return successResponse(preferences);
  } catch (error) {
    return errorResponse('Failed to fetch preferences');
  }
}

export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();
    const updated = await UserService.updatePreferences(body);
    return successResponse(updated);
  } catch (error) {
    return errorResponse('Failed to update preferences');
  }
}
