import { NotificationRepository } from '@/lib/repositories/notification.repository';

export class NotificationService {
  static async listNotifications() {
    const [notifications, unreadCount] = await Promise.all([
      NotificationRepository.findAll(),
      NotificationRepository.countUnread(),
    ]);
    return { notifications, unreadCount };
  }

  static async markAsRead(id: string) {
    const notification = await NotificationRepository.markRead(id);
    if (!notification) throw new Error('Notification not found');
    return notification;
  }
}
