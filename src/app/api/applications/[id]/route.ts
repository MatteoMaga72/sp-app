import { NextRequest } from 'next/server';
import { ApplicationService } from '@/lib/services/application.service';
import {
  successResponse,
  errorResponse,
  notFoundResponse,
} from '@/lib/utils/api-response';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const application = await ApplicationService.getApplication(id);
    return successResponse(application);
  } catch (error) {
    if (error instanceof Error && error.message === 'Application not found') {
      return notFoundResponse('Application');
    }
    return errorResponse('Failed to fetch application');
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await request.json();
    const updated = await ApplicationService.updateApplicationStatus(id, body.status);
    return successResponse(updated);
  } catch (error) {
    if (error instanceof Error && error.message === 'Application not found') {
      return notFoundResponse('Application');
    }
    return errorResponse('Failed to update application');
  }
}
