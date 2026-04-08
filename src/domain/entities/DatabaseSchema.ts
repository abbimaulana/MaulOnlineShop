import { User } from './User.js';
import { Product } from './Product.js';
import { Transaction } from './Transaction.js';

export interface ActivityLog {
  id: string;
  userId: string;
  action: string;
  details: unknown;
  timestamp: string;
}

export interface AppSettings {
  isStoreOpen: boolean;
  maintenanceMode: boolean;
}

export interface DatabaseSchema {
  users: User[];
  products: Product[];
  transactions: Transaction[];
  activityLogs: ActivityLog[];
  settings: AppSettings;
}
