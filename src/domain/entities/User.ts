export type Role = 'SUPER_ADMIN' | 'ADMIN' | 'USER';
export type VerifyStatus = 'UNVERIFIED' | 'VERIFIED';

export interface User {
  id: string;
  username: string;
  email: string;
  phoneWA: string;
  role: Role;
  balance: number;
  status: VerifyStatus;
  isBlocked: boolean;
  createdAt: string;
  telegramId?: string;
}
