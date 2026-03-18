import { NextRequest } from 'next/server';
import { UserService } from '@/lib/services/user.service';
import { successResponse, errorResponse } from '@/lib/utils/api-response';

export async function GET() {
  try {
    const user = await UserService.getCurrentUser();
    return successResponse(user);
  } catch (error) {
    return errorResponse('Failed to fetch user');
  }
}

export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();
    const updated = await UserService.updateUser(body);
    return successResponse(updated);
  } catch (error) {
    return errorResponse('Failed to update user');
  }
}
