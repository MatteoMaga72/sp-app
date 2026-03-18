import { NotificationService } from '@/lib/services/notification.service';
import { successResponse, errorResponse } from '@/lib/utils/api-response';

export async function GET() {
  try {
    const result = await NotificationService.listNotifications();
    return successResponse(result);
  } catch (error) {
    return errorResponse('Failed to fetch notifications');
  }
}
