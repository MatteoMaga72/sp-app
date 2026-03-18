import { UserRepository } from '@/lib/repositories/user.repository';
import type { User, UserPreferences } from '@/lib/types';

export class UserService {
  static async getCurrentUser() {
    return UserRepository.findCurrent();
  }

  static async updateUser(data: Partial<User>) {
    return UserRepository.update(data);
  }

  static async getPreferences() {
    return UserRepository.findPreferences();
  }

  static async updatePreferences(data: Partial<UserPreferences>) {
    return UserRepository.updatePreferences(data);
  }
}
