import { Injectable } from '@angular/core';
import { Store } from '../interfaces/store';

@Injectable({
  providedIn: 'root',
})
export class StoreService {
  store: Store[] = [
    {
      id: 'itoyokado',
      name: 'イトーヨーカドー',
      type: 'real',
    },
    {
      id: 'zoff',
      name: 'zoff',
      type: 'real',
    },
    {
      id: '2ndstreet',
      name: '2ndstreet',
      type: 'real',
    },
    {
      id: '31ice_cream',
      name: 'サーティーワンアイスクリーム',
      type: 'real',
    },
    {
      id: '669',
      name: '669',
      type: 'real',
    },
  ];

  onlineStore: Store[] = [
    {
      id: 'cokeon',
      name: 'CokeOn',
      type: '',
    },
    {
      id: 'didi',
      name: 'DiDi',
      type: '',
    },
    {
      id: 'ebooks',
      name: 'ebookjapan',
      type: '',
    },
    {
      id: 'gyaostore',
      name: 'GYAO!ストア',
      type: '',
    },
    {
      id: 'lohaco',
      name: 'LOHACO',
      type: '',
    },
    {
      id: 'okusuri02',
      name: '通販できるみんなのお薬',
      type: '',
    },
    {
      id: 'oyolife',
      name: 'OYO LIFE',
      type: '',
    },
    {
      id: 'paypay_freemarket',
      name: 'PayPayフリマ',
      type: '',
    },
    {
      id: 'paypay_mall',
      name: 'PayPayモール',
      type: '',
    },
    {
      id: 'paypaydome02',
      name: 'PayPayドームツアー',
      type: '',
    },
    {
      id: 'ubereats',
      name: 'UberEATS',
      type: '',
    },
    {
      id: 'winticket',
      name: 'WINTICKET',
      type: '',
    },
    {
      id: 'yahoo_game',
      name: 'Yahoo!ゲーム',
      type: '',
    },
    {
      id: 'yahoo_news',
      name: 'Yahoo!ニュース',
      type: '',
    },
    {
      id: 'yahoo_shopping',
      name: 'Yahoo!ショッピング',
      type: '',
    },
    {
      id: 'yahoo_travel',
      name: 'Yahoo!トラベル',
      type: '',
    },
    {
      id: 'yahoo_uranai',
      name: 'Yahoo!占い',
      type: '',
    },
    {
      id: 'yahuoku',
      name: 'ヤフオク',
      type: '',
    },
  ];

  invoice: Store[] = [
    {
      id: 'tepco',
      name: '東京電力',
      type: '',
    },
    {
      id: 'belluna',
      name: 'ベルーナ',
      type: '',
    },
    {
      id: 'chojyunosato',
      name: '長寿の里',
      type: '',
    },
    {
      id: 'chugokudenryoku',
      name: '中国電力',
      type: '',
    },
    {
      id: 'egao',
      name: 'えがお',
      type: '',
    },
    {
      id: 'fancl',
      name: 'ファンケル',
      type: '',
    },
    {
      id: 'hiroshimagas',
      name: '広島ガス',
      type: '',
    },
    {
      id: 'hokkaidougas',
      name: '北海道ガス',
      type: '',
    },
    {
      id: 'kansaidenryoku',
      name: '関西電力',
      type: '',
    },
    {
      id: 'keiyogas',
      name: '京葉ガス',
      type: '',
    },
    {
      id: 'kenkoukazoku',
      name: '健康家族',
      type: '',
    },
    {
      id: 'kitakyusyushisuidou',
      name: '北九州市上下水道局',
      type: '',
    },
    {
      id: 'kumamotoshisuidou',
      name: '熊本市上下水道局',
      type: '',
    },
    {
      id: 'kyusyudenryoku',
      name: '九州電力',
      type: '',
    },
    {
      id: 'okayamashisuidou',
      name: '岡山市水道局',
      type: '',
    },
    {
      id: 'okinawadenryoku',
      name: '沖縄電力',
      type: '',
    },
    {
      id: 'osakagas',
      name: '大阪ガス',
      type: '',
    },
    {
      id: 'qsai',
      name: 'キューサイ',
      type: '',
    },
    {
      id: 'saitamashisuidou',
      name: 'さいたま市水道局',
      type: '',
    },
    {
      id: 'sakaishisuidou',
      name: '堺市上下水道局',
      type: '',
    },
    {
      id: 'sakuranomori',
      name: 'さくらの森',
      type: '',
    },
    {
      id: 'tokyogas',
      name: '東京ガス',
      type: '',
    },
    {
      id: 'tokyotosuidou',
      name: '東京都水道局',
      type: '',
    },
    {
      id: 'wakasaseikatsu',
      name: 'わかさ生活',
      type: '',
    },
    {
      id: 'yazuya',
      name: 'やずや',
      type: '',
    },
  ];
  constructor() {}
}
