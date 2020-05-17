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

  invoice: Store[] = [
    {
      id: 'tepco',
      name: '東京電力',
    },
    {
      id: 'belluna',
      name: 'ベルーナ',
    },
    {
      id: 'chojyunosato',
      name: '長寿の里',
    },
    {
      id: 'chugokudenryoku',
      name: '中国電力',
    },
    {
      id: 'egao',
      name: 'えがお',
    },
    {
      id: 'fancl',
      name: 'ファンケル',
    },
    {
      id: 'hiroshimagas',
      name: '広島ガス',
    },
    {
      id: 'hokkaidougas',
      name: '北海道ガス',
    },
    {
      id: 'kansaidenryoku',
      name: '関西電力',
    },
    {
      id: 'keiyogas',
      name: '京葉ガス',
    },
    {
      id: 'kenkoukazoku',
      name: '健康家族',
    },
    {
      id: 'kitakyusyushisuidou',
      name: '北九州市上下水道局',
    },
    {
      id: 'kumamotoshisuidou',
      name: '熊本市上下水道局',
    },
    {
      id: 'kyusyudenryoku',
      name: '九州電力',
    },
    {
      id: 'okayamashisuidou',
      name: '岡山市水道局',
    },
    {
      id: 'okinawadenryoku',
      name: '沖縄電力',
    },
    {
      id: 'osakagas',
      name: '大阪ガス',
    },
    {
      id: 'qsai',
      name: 'キューサイ',
    },
    {
      id: 'saitamashisuidou',
      name: 'さいたま市水道局',
    },
    {
      id: 'sakaishisuidou',
      name: '堺市上下水道局',
    },
    {
      id: 'sakuranomori',
      name: 'さくらの森',
    },
    {
      id: 'tokyogas',
      name: '東京ガス',
    },
    {
      id: 'tokyotosuidou',
      name: '東京都水道局',
    },
    {
      id: 'wakasaseikatsu',
      name: 'わかさ生活',
    },
    {
      id: 'yazuya',
      name: 'やずや',
    },
  ];
  constructor() {}
}
