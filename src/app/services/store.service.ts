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
    {
      id: 'cokeon',
      name: 'CokeOn',
      type: 'online',
    },
    {
      id: 'didi',
      name: 'DiDi',
      type: 'online',
    },
    {
      id: 'ebooks',
      name: 'ebookjapan',
      type: 'online',
    },
    {
      id: 'gyaostore',
      name: 'GYAO!ストア',
      type: 'online',
    },
    {
      id: 'lohaco',
      name: 'LOHACO',
      type: 'online',
    },
    {
      id: 'okusuri02',
      name: '通販できるみんなのお薬',
      type: 'online',
    },
    {
      id: 'oyolife',
      name: 'OYO LIFE',
      type: 'online',
    },
    {
      id: 'paypay_freemarket',
      name: 'PayPayフリマ',
      type: 'online',
    },
    {
      id: 'paypay_mall',
      name: 'PayPayモール',
      type: 'online',
    },
    {
      id: 'paypaydome02',
      name: 'PayPayドームツアー',
      type: 'online',
    },
    {
      id: 'ubereats',
      name: 'UberEATS',
      type: 'online',
    },
    {
      id: 'winticket',
      name: 'WINTICKET',
      type: 'online',
    },
    {
      id: 'yahoo_game',
      name: 'Yahoo!ゲーム',
      type: 'online',
    },
    {
      id: 'yahoo_news',
      name: 'Yahoo!ニュース',
      type: 'online',
    },
    {
      id: 'yahoo_shopping',
      name: 'Yahoo!ショッピング',
      type: 'online',
    },
    {
      id: 'yahoo_travel',
      name: 'Yahoo!トラベル',
      type: 'online',
    },
    {
      id: 'yahoo_uranai',
      name: 'Yahoo!占い',
      type: 'online',
    },
    {
      id: 'yahuoku',
      name: 'ヤフオク',
      type: 'online',
    },
    {
      id: 'tepco',
      name: '東京電力',
      type: 'invoice',
    },
    {
      id: 'belluna',
      name: 'ベルーナ',
      type: 'invoice',
    },
    {
      id: 'chojyunosato',
      name: '長寿の里',
      type: 'invoice',
    },
    {
      id: 'chugokudenryoku',
      name: '中国電力',
      type: 'invoice',
    },
    {
      id: 'egao',
      name: 'えがお',
      type: 'invoice',
    },
    {
      id: 'fancl',
      name: 'ファンケル',
      type: 'invoice',
    },
    {
      id: 'hiroshimagas',
      name: '広島ガス',
      type: 'invoice',
    },
    {
      id: 'hokkaidougas',
      name: '北海道ガス',
      type: 'invoice',
    },
    {
      id: 'kansaidenryoku',
      name: '関西電力',
      type: 'invoice',
    },
    {
      id: 'keiyogas',
      name: '京葉ガス',
      type: 'invoice',
    },
    {
      id: 'kenkoukazoku',
      name: '健康家族',
      type: 'invoice',
    },
    {
      id: 'kitakyusyushisuidou',
      name: '北九州市上下水道局',
      type: 'invoice',
    },
    {
      id: 'kumamotoshisuidou',
      name: '熊本市上下水道局',
      type: 'invoice',
    },
    {
      id: 'kyusyudenryoku',
      name: '九州電力',
      type: 'invoice',
    },
    {
      id: 'okayamashisuidou',
      name: '岡山市水道局',
      type: 'invoice',
    },
    {
      id: 'okinawadenryoku',
      name: '沖縄電力',
      type: 'invoice',
    },
    {
      id: 'osakagas',
      name: '大阪ガス',
      type: 'invoice',
    },
    {
      id: 'qsai',
      name: 'キューサイ',
      type: 'invoice',
    },
    {
      id: 'saitamashisuidou',
      name: 'さいたま市水道局',
      type: 'invoice',
    },
    {
      id: 'sakaishisuidou',
      name: '堺市上下水道局',
      type: 'invoice',
    },
    {
      id: 'sakuranomori',
      name: 'さくらの森',
      type: 'invoice',
    },
    {
      id: 'tokyogas',
      name: '東京ガス',
      type: 'invoice',
    },
    {
      id: 'tokyotosuidou',
      name: '東京都水道局',
      type: 'invoice',
    },
    {
      id: 'wakasaseikatsu',
      name: 'わかさ生活',
      type: 'invoice',
    },
    {
      id: 'yazuya',
      name: 'やずや',
      type: 'invoice',
    },
  ];

  constructor() {}
}
