import { NextRequest } from 'next/server';
import { NotificationService } from '@/lib/services/notification.service';
import { successResponse, errorResponse, notFoundResponse } from '@/lib/utils/api-response';

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const notification = await NotificationService.markAsRead(id);
    return successResponse(notification);
  } catch (error) {
    if (error instanceof Error && error.message === 'Notification not found') {
      return notFoundResponse('Notification');
    }
    return errorResponse('Failed to mark notification as read');
  }
}
