import { SEED_NOTIFICATIONS } from '@/lib/db/seed-data';
import type { Notification } from '@/lib/types';

export class NotificationRepository {
  static async findAll(): Promise<Notification[]> {
    return SEED_NOTIFICATIONS;
  }

  static async markRead(id: string): Promise<Notification | null> {
    const notification = SEED_NOTIFICATIONS.find((n) => n.id === id);
    if (!notification) return null;
    return { ...notification, isRead: true };
  }

  static async countUnread(): Promise<number> {
    return SEED_NOTIFICATIONS.filter((n) => !n.isRead).length;
  }
}
