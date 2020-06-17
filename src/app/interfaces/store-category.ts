import { Store } from './store';

export interface StoreCategory {
  title: string;
  id: string;
  type: string;
  items: Store[];
}
