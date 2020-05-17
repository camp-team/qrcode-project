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

  onlineStore: Store[] = [
    {
      id: 'cokeon',
      name: 'CokeOn',
    },
    {
      id: 'didi',
      name: 'DiDi',
    },
    {
      id: 'ebooks',
      name: 'ebookjapan',
    },
    {
      id: 'gyaostore',
      name: 'GYAO!ストア',
    },
    {
      id: 'lohaco',
      name: 'LOHACO',
    },
    {
      id: 'okusuri02',
      name: '通販できるみんなのお薬',
    },
    {
      id: 'oyolife',
      name: 'OYO LIFE',
    },
    {
      id: 'paypay_freemarket',
      name: 'PayPayフリマ',
    },
    {
      id: 'paypay_mall',
      name: 'PayPayモール',
    },
    {
      id: 'paypaydome02',
      name: 'PayPayドームツアー',
    },
    {
      id: 'ubereats',
      name: 'UberEATS',
    },
    {
      id: 'winticket',
      name: 'WINTICKET',
    },
    {
      id: 'yahoo_game',
      name: 'Yahoo!ゲーム',
    },
    {
      id: 'yahoo_news',
      name: 'Yahoo!ニュース',
    },
    {
      id: 'yahoo_shopping',
      name: 'Yahoo!ショッピング',
    },
    {
      id: 'yahoo_travel',
      name: 'Yahoo!トラベル',
    },
    {
      id: 'yahoo_uranai',
      name: 'Yahoo!占い',
    },
    {
      id: 'yahuoku',
      name: 'ヤフオク',
    },
  ];

  constructor() {}
}
