import { Injectable } from '@angular/core';
import { Store } from '../interfaces/store';

@Injectable({
  providedIn: 'root',
})
export class StoreService {
  realStore: Store[] = [
    {
      id: 'itoyokado',
      name: 'イトーヨーカドー',
    },
    {
      id: 'zoff',
      name: 'zoff',
    },
    {
      id: '2ndstreet',
      name: '2ndstreet',
    },
    {
      id: '31ice_cream',
      name: 'サーティーワンアイスクリーム',
    },
    {
      id: '669',
      name: '669',
    },
  ];

  onlineStore;

  constructor() {}
}
