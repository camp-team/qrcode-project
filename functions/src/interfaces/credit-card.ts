import { firestore } from 'firebase-admin';

export interface CreditCard {
  cardId: string;
  imageURL: string;
  name: string;
  point: number;
  pointName?: string;
  viewCount?: firestore.FieldValue;
  annualFee: string;
  brands: string[];
  miles?: string[];
  additionCards: string[];
  insurances: string;
  electron?: string[];
  mobile?: string[];
}
