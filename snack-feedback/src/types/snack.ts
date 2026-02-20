export interface Snack {
  id: string;
  name: string;
  category: string;
  imageUrl: string;
  yearsOffered: number[];
  createdAt: Date;
}

export type SnackCategory = 
  | 'ramen'
  | 'chips'
  | 'sweets'
  | 'fruits'
  | 'chocolate'
  | 'other';

export interface SnacksByCategory {
  [category: string]: Snack[];
}