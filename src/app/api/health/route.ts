import { APP_VERSION } from '@/lib/utils/constants';
import { successResponse } from '@/lib/utils/api-response';

export async function GET() {
  return successResponse({
    status: 'ok',
    timestamp: new Date().toISOString(),
    version: APP_VERSION,
  });
}
