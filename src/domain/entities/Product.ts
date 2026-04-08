export interface Product {
  sku: string;
  category: string;
  brand: string;
  name: string;
  price: number;
  providerPrice: number;
  status: 'AVAILABLE' | 'EMPTY';
  updatedAt: string;
}
