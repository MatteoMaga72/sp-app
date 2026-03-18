import { NextRequest } from 'next/server';
import { ApplicationService } from '@/lib/services/application.service';
import { successResponse, errorResponse, badRequestResponse } from '@/lib/utils/api-response';

export async function GET() {
  try {
    const applications = await ApplicationService.listApplications();
    return successResponse(applications);
  } catch (error) {
    return errorResponse('Failed to fetch applications');
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    if (!body.type) {
      return badRequestResponse('type is required');
    }
    const application = await ApplicationService.createApplication(body);
    return successResponse(application, 201);
  } catch (error) {
    return errorResponse('Failed to create application');
  }
}
