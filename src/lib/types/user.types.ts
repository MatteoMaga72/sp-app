export interface User {
  id: string;
  fullName: string;
  email: string;
  phone: string;
  avatarInitials: string;
  rewardPoints: number;
  darkMode: boolean;
  notificationsEnabled: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface UserPreferences {
  darkMode: boolean;
  notificationsEnabled: boolean;
  language: string;
  communicationChannels: string[];
}
