export interface Notification {
  id: string;
  userId: string;
  title: string;
  body: string;
  type: 'maintenance' | 'scam_alert' | 'billing' | 'general';
  isRead: boolean;
  createdAt: string;
}
