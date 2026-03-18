import { ApplicationRepository } from '@/lib/repositories/application.repository';
import type { Application } from '@/lib/types';

export class ApplicationService {
  static async listApplications() {
    return ApplicationRepository.findAll();
  }

  static async getApplication(id: string) {
    const app = await ApplicationRepository.findById(id);
    if (!app) throw new Error('Application not found');
    return app;
  }

  static async createApplication(
    data: Omit<Application, 'id' | 'status' | 'submittedAt' | 'estimatedCompletion'>
  ) {
    return ApplicationRepository.create(data);
  }

  static async updateApplicationStatus(id: string, status: Application['status']) {
    const updated = await ApplicationRepository.updateStatus(id, status);
    if (!updated) throw new Error('Application not found');
    return updated;
  }
}
