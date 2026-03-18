import { SEED_APPLICATIONS } from '@/lib/db/seed-data';
import type { Application } from '@/lib/types';

export class ApplicationRepository {
  static async findAll(): Promise<Application[]> {
    return SEED_APPLICATIONS;
  }

  static async findById(id: string): Promise<Application | null> {
    return SEED_APPLICATIONS.find((a) => a.id === id) ?? null;
  }

  static async create(
    data: Omit<Application, 'id' | 'status' | 'submittedAt' | 'estimatedCompletion'>
  ): Promise<Application> {
    const now = new Date();
    const estimated = new Date(now.getTime() + 5 * 24 * 60 * 60 * 1000); // +5 days
    return {
      ...data,
      id: `app-${Date.now()}`,
      status: 'applied',
      submittedAt: now.toISOString(),
      estimatedCompletion: estimated.toISOString(),
    };
  }

  static async updateStatus(
    id: string,
    status: Application['status']
  ): Promise<Application | null> {
    const app = SEED_APPLICATIONS.find((a) => a.id === id);
    if (!app) return null;
    return { ...app, status };
  }
}
