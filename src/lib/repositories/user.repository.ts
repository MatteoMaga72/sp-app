import { SEED_USER, SEED_USER_PREFERENCES } from '@/lib/db/seed-data';
import type { User, UserPreferences } from '@/lib/types';

export class UserRepository {
  static async findCurrent(): Promise<User> {
    return SEED_USER;
  }

  static async update(data: Partial<User>): Promise<User> {
    return { ...SEED_USER, ...data, updatedAt: new Date().toISOString() };
  }

  static async findPreferences(): Promise<UserPreferences> {
    return SEED_USER_PREFERENCES;
  }

  static async updatePreferences(data: Partial<UserPreferences>): Promise<UserPreferences> {
    return { ...SEED_USER_PREFERENCES, ...data };
  }
}
