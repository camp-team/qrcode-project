import { firestore } from 'firebase-admin';

export interface CreditCard {
  cardId: string;
  imageURL: string;
  name: string;
  point: number;
  pointName?: string;
  viewCount?: firestore.FieldValue;
  annualFee: string;
  brand: string[];
  miles?: string[];
  additionCard: string[];
  insurance: string;
  electron?: string[];
  mobile?: string[];
}
