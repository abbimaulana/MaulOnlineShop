export type PaymentMethod = 'MIDTRANS_QRIS' | 'MIDTRANS_VA' | 'MANUAL_TRANSFER' | 'BALANCE';
export type TrxStatus = 'PENDING' | 'PAID' | 'PROCESSING' | 'SUCCESS' | 'FAILED' | 'REFUNDED';

export interface Transaction {
  id: string;
  userId: string;
  sku: string;
  targetId: string;
  zoneId?: string;
  amount: number;
  paymentMethod: PaymentMethod;
  status: TrxStatus;
  proofReceiptUrl?: string;
  providerTrxId?: string;
  createdAt: string;
  updatedAt: string;
}
