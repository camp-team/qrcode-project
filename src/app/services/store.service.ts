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
      id: 'abab',
      name: 'ABAB',
      type: 'real',
    },
    {
      id: 'aichintai',
      name: 'ai賃貸',
      type: 'real',
    },
    {
      id: 'aimegane',
      name: 'アイメガネ',
      type: 'real',
    },
    {
      id: 'ains',
      name: 'アインズ',
      type: 'real',
    },
    {
      id: 'ainztulpe',
      name: 'アインズ＆トルペ',
      type: 'real',
    },
    {
      id: 'akachan',
      name: 'アカチャンホンポ',
      type: 'real',
    },
    {
      id: 'akafudado',
      name: '赤札堂',
      type: 'real',
    },
    {
      id: 'akamaruya',
      name: 'アカマル屋',
      type: 'real',
    },
    {
      id: 'alohatable',
      name: 'ALOHATABLE',
      type: 'real',
    },
    {
      id: 'alook',
      name: 'ALOOK',
      type: 'real',
    },
    {
      id: 'anan',
      name: '安安',
      type: 'real',
    },
    {
      id: 'animate',
      name: 'animate',
      type: 'real',
    },
    {
      id: 'aoki',
      name: 'クスリのアオキ',
      type: 'real',
    },
    {
      id: 'arisan',
      name: 'アリさんマークの引越社',
      type: 'real',
    },
    {
      id: 'arthikkoshi',
      name: 'アート引越センター',
      type: 'real',
    },
    {
      id: 'ash',
      name: 'Ash',
      type: 'real',
    },
    {
      id: 'autobacs',
      name: 'AUTOBACS',
      type: 'real',
    },
    {
      id: 'ayumibooks',
      name: 'あゆみBOOKS',
      type: 'real',
    },
    {
      id: 'babydoll',
      name: 'BABYDOLL',
      type: 'real',
    },
    {
      id: 'bamiyan',
      name: 'バーミヤン',
      type: 'real',
    },
    {
      id: 'baribaridori',
      name: 'バリバリ鶏',
      type: 'real',
    },
    {
      id: 'bbon',
      name: 'B.B.ON',
      type: 'real',
    },
    {
      id: 'beishia',
      name: 'ベイシア電機',
      type: 'real',
    },
    {
      id: 'beisia',
      name: 'ベイシア',
      type: 'real',
    },
    {
      id: 'belc',
      name: 'ベルク',
      type: 'real',
    },
    {
      id: 'best',
      name: 'BEST',
      type: 'real',
    },
    {
      id: 'biccamera',
      name: 'ビックカメラ',
      type: 'real',
    },
    {
      id: 'biga',
      name: 'Big-A',
      type: 'real',
    },
    {
      id: 'bigboy',
      name: 'BigBoy',
      type: 'real',
    },
    {
      id: 'bigdrug',
      name: 'ビックドラッグ',
      type: 'real',
    },
    {
      id: 'bigecho',
      name: 'BIG ECHO',
      type: 'real',
    },
    {
      id: 'bigyosan',
      name: 'ビッグヨーサン',
      type: 'real',
    },
    {
      id: 'bikeou',
      name: 'バイク王',
      type: 'real',
    },
    {
      id: 'bonvisage',
      name: 'Bonvisage',
      type: 'real',
    },
    {
      id: 'book1st',
      name: 'ブックファースト',
      type: 'real',
    },
    {
      id: 'bricksquare',
      name: 'BRICK SQUARE',
      type: 'real',
    },
    {
      id: 'bunkitsu',
      name: '文喫',
      type: 'real',
    },
    {
      id: 'bunrokudou',
      name: '文禄堂',
      type: 'real',
    },
    {
      id: 'casting',
      name: 'キャスティング',
      type: 'real',
    },
    {
      id: 'cb-asahi',
      name: 'asahi',
      type: 'real',
    },
    {
      id: 'chiyoda',
      name: 'Chiyoda',
      type: 'real',
    },
    {
      id: 'cinecitta',
      name: 'CINECITTA',
      type: 'real',
    },
    {
      id: 'cocokarafine',
      name: 'ココカラファイン',
      type: 'real',
    },
    {
      id: 'cotedazur',
      name: 'コート•ダジュール',
      type: 'real',
    },
    {
      id: 'crokkeclub',
      name: 'コロッケクラブ',
      type: 'real',
    },
    {
      id: 'cycle-spot-le',
      name: 'Cycle Spot & le.cyc',
      type: 'real',
    },
    {
      id: 'cyclespot',
      name: 'CycleSpot',
      type: 'real',
    },
    {
      id: 'cyuoucontact',
      name: '中央コンタクト',
      type: 'real',
    },
    {
      id: 'daikokudrug',
      name: 'ダイコクドラッグ',
      type: 'real',
    },
    {
      id: 'daikokuya',
      name: '大黒屋',
      type: 'real',
    },
    {
      id: 'dailyyamazaki',
      name: 'Daily YAMAZAKI',
      type: 'real',
    },
    {
      id: 'daiso',
      name: 'DAISO',
      type: 'real',
    },
    {
      id: 'daiyu',
      name: 'Daiyu',
      type: 'real',
    },
    {
      id: 'dartsshoptito',
      name: 'Darts Shop TiTO',
      type: 'real',
    },
    {
      id: 'delis',
      name: 'DELIS',
      type: 'real',
    },
    {
      id: 'deliveryskylark',
      name: 'すかいらーくグループの宅配',
      type: 'real',
    },
    {
      id: 'denkichi',
      name: 'デンキチ',
      type: 'real',
    },
    {
      id: 'denmaru',
      name: '伝丸',
      type: 'real',
    },
    {
      id: 'dennys',
      name: 'デニーズ',
      type: 'real',
    },
    {
      id: 'dennysdiner',
      name: 'デニーズDiner',
      type: 'real',
    },
    {
      id: 'diamondeyes',
      name: 'DIAMONDEYES',
      type: 'real',
    },
    {
      id: 'diesel',
      name: 'DIESEL',
      type: 'real',
    },
    {
      id: 'drag11',
      name: 'ドラッグイレブン',
      type: 'real',
    },
    {
      id: 'dream',
      name: '手芸センター ドリーム',
      type: 'real',
    },
    {
      id: 'dulton',
      name: 'DULTON',
      type: 'real',
    },
    {
      id: 'dutyfree',
      name: 'DUTYFREE',
      type: 'real',
    },
    {
      id: 'ebisufoodhall',
      name: 'EBISUFOODHALL',
      type: 'real',
    },
    {
      id: 'edon',
      name: 'エディオン',
      type: 'real',
    },
    {
      id: 'elexstay',
      name: 'FLEXSTAY INN',
      type: 'real',
    },
    {
      id: 'empire',
      name: 'エンパイアー',
      type: 'real',
    },
    {
      id: 'enoshima',
      name: '江ノ島タクシー',
      type: 'real',
    },
    {
      id: 'es-tajima',
      name: 'エネルギースーパー　たじま',
      type: 'real',
    },
    {
      id: 'familymart',
      name: 'ファミリーマート',
      type: 'real',
    },
    {
      id: 'firstkichen_01',
      name: 'FirstKichen',
      type: 'real',
    },
    {
      id: 'firstkichen',
      name: 'Wendys FirstKichen',
      type: 'real',
    },
    {
      id: 'fithouse',
      name: 'FITHOUSE',
      type: 'real',
    },
    {
      id: 'freshness',
      name: 'FRESHNESS BURGER',
      type: 'real',
    },
    {
      id: 'fridays',
      name: 'FRYDAYS',
      type: 'real',
    },
    {
      id: 'fuji',
      name: 'Fuji',
      type: 'real',
    },
    {
      id: 'fukufukuya',
      name: '福福屋',
      type: 'real',
    },
    {
      id: 'fukutaro',
      name: 'くすりの福太郎',
      type: 'real',
    },
    {
      id: 'furuhonichiba',
      name: '古本市場',
      type: 'real',
    },
    {
      id: 'fuziyamasakaya',
      name: 'フジヤマ桜',
      type: 'real',
    },
    {
      id: 'gamers',
      name: 'GAMERS',
      type: 'real',
    },
    {
      id: 'geo',
      name: 'GEO',
      type: 'real',
    },
    {
      id: 'geomobile',
      name: 'GEOmobile',
      type: 'real',
    },
    {
      id: 'giga-mart',
      name: 'ギガマート',
      type: 'real',
    },
    {
      id: 'giga-pearl',
      name: 'ギガパール',
      type: 'real',
    },
    {
      id: 'gindako',
      name: '銀だこ',
      type: 'real',
    },
    {
      id: 'gohan',
      name: 'ITALIAN GOHAN',
      type: 'real',
    },
    {
      id: 'golftsuruya',
      name: 'ゴルフつるや',
      type: 'real',
    },
    {
      id: 'grandback',
      name: 'GRAND-BACK',
      type: 'real',
    },
    {
      id: 'grandberrypark',
      name: 'Grandberry Park',
      type: 'real',
    },
    {
      id: 'grandiner',
      name: 'granDiner',
      type: 'real',
    },
    {
      id: 'grazie',
      name: 'グラッチェ',
      type: 'real',
    },
    {
      id: 'gusto',
      name: 'ガスト',
      type: 'real',
    },
    {
      id: 'gyukaku',
      name: '牛角',
      type: 'real',
    },
    {
      id: 'gyushige',
      name: '牛繁',
      type: 'real',
    },
    {
      id: 'hacdrug',
      name: 'ハックドラッグ',
      type: 'real',
    },
    {
      id: 'hello-mart',
      name: 'ハローマート',
      type: 'real',
    },
    {
      id: 'hamazushi',
      name: 'はま寿司',
      type: 'real',
    },
    {
      id: 'hanamaruudon',
      name: 'はなまるうどん',
      type: 'real',
    },
    {
      id: 'hananomai-01',
      name: 'はなの舞',
      type: 'real',
    },
    {
      id: 'hanayayohei',
      name: '華屋与兵衛',
      type: 'real',
    },
    {
      id: 'hanbey',
      name: '薄利多売半兵エ',
      type: 'real',
    },
    {
      id: 'haruya',
      name: '明屋書店',
      type: 'real',
    },
    {
      id: 'haruyama',
      name: 'はるやま',
      type: 'real',
    },
    {
      id: 'headlight',
      name: 'HEADLIGHT',
      type: 'real',
    },
    {
      id: 'heartup',
      name: 'ハートアップ',
      type: 'real',
    },
    {
      id: 'hidakaya_hiday',
      name: '日高屋',
      type: 'real',
    },
    {
      id: 'his',
      name: 'H.I.S',
      type: 'real',
    },
    {
      id: 'hobbyzone',
      name: 'HobbyZone',
      type: 'real',
    },
    {
      id: 'hondanacoffer',
      name: '本棚珈琲',
      type: 'real',
    },
    {
      id: 'hotelmystays',
      name: 'HOTEL MYSTAYS',
      type: 'real',
    },
    {
      id: 'hotelmystayspremiem',
      name: 'HOTEL MYSTAYS PREMIER',
      type: 'real',
    },
    {
      id: 'ichibachi',
      name: 'イシバシ楽器',
      type: 'real',
    },
    {
      id: 'ichigorou',
      name: '餃子いち五郎',
      type: 'real',
    },
    {
      id: 'ichikokudou',
      name: '壱鵠堂',
      type: 'real',
    },
    {
      id: 'ichinisan',
      name: 'Ichinisan',
      type: 'real',
    },
    {
      id: 'iiyo',
      name: 'iiyo!!',
      type: 'real',
    },
    {
      id: 'ikea',
      name: 'IKEA',
      type: 'real',
    },
    {
      id: 'isomaru',
      name: '磯丸水産',
      type: 'real',
    },
    {
      id: 'itagakiglasses',
      name: 'メガネのイタガキ',
      type: 'real',
    },
    {
      id: 'japan',
      name: 'ジャパン',
      type: 'real',
    },
    {
      id: 'japanpremiumtokyo',
      name: 'JAPAN PREMIUM TOKYO',
      type: 'real',
    },
    {
      id: 'jeans',
      name: 'JEANS',
      type: 'real',
    },
    {
      id: 'jins',
      name: 'JINS',
      type: 'real',
    },
    {
      id: 'jonathan',
      name: 'ジョナサン',
      type: 'real',
    },
    {
      id: 'joyfood',
      name: 'JOY',
      type: 'real',
    },
    {
      id: 'joysound',
      name: 'JOYSOUND',
      type: 'real',
    },
    {
      id: 'junkudo',
      name: 'ジュンク堂書店',
      type: 'real',
    },
    {
      id: 'juraku',
      name: 'Hotel Juraku',
      type: 'real',
    },
    {
      id: 'kaikatsuclub',
      name: '快活CLUB',
      type: 'real',
    },
    {
      id: 'kakiyazushi',
      name: '柿屋鮨',
      type: 'real',
    },
    {
      id: 'kameyatsurigu',
      name: 'KAMEYA',
      type: 'real',
    },
    {
      id: 'kanteki',
      name: 'かんてきや',
      type: 'real',
    },
    {
      id: 'kappa',
      name: 'かっぱ寿司',
      type: 'real',
    },
    {
      id: 'karaokekan',
      name: 'カラオケ館',
      type: 'real',
    },
    {
      id: 'katsuan',
      name: 'かつ庵',
      type: 'real',
    },
    {
      id: 'kawachi',
      name: 'カワチ薬品',
      type: 'real',
    },
    {
      id: 'keyscafe',
      name: 'KEYS CAFE',
      type: 'real',
    },
    {
      id: 'kids-usland',
      name: 'kids US.LAND',
      type: 'real',
    },
    {
      id: 'kimuraya',
      name: 'キムラヤ',
      type: 'real',
    },
    {
      id: 'kinnokura',
      name: '金の蔵',
      type: 'real',
    },
    {
      id: 'kirindo',
      name: 'Kirindo',
      type: 'real',
    },
    {
      id: 'kitamura',
      name: 'カメラのキタムラ',
      type: 'real',
    },
    {
      id: 'kojimachi',
      name: 'KOJIMACHI',
      type: 'real',
    },
    {
      id: 'kokuimin',
      name: 'コクミン',
      type: 'real',
    },
    {
      id: 'kozima',
      name: 'コジマ',
      type: 'real',
    },
    {
      id: 'kozimadrug',
      name: 'コジマドラッグ',
      type: 'real',
    },
    {
      id: 'ksdenki',
      name: 'ケーズデンキ',
      type: 'real',
    },
    {
      id: 'kurazushi',
      name: 'くら寿司',
      type: 'real',
    },
    {
      id: 'kuroda',
      name: '俺の串かつ 黒田',
      type: 'real',
    },
    {
      id: 'kuromaru',
      name: '黒○',
      type: 'real',
    },
    {
      id: 'kyotokatsugyu',
      name: '京都勝牛',
      type: 'real',
    },
    {
      id: 'lacittadella',
      name: 'LACITTADELLA',
      type: 'real',
    },
    {
      id: 'lawson',
      name: 'LAWSON',
      type: 'real',
    },
    {
      id: 'lawson100',
      name: 'LAWSON100',
      type: 'real',
    },
    {
      id: 'libro',
      name: 'LIBRO',
      type: 'real',
    },
    {
      id: 'life',
      name: 'ライフ',
      type: 'real',
    },
    {
      id: 'likaman',
      name: 'リカーマウンテン',
      type: 'real',
    },
    {
      id: 'lipsandhips',
      name: 'LIPS and HIPS',
      type: 'real',
    },
    {
      id: 'machouse',
      name: 'Mac-House',
      type: 'real',
    },
    {
      id: 'maguro',
      name: 'ニッポンまぐろ',
      type: 'real',
    },
    {
      id: 'marubiru',
      name: '丸ビル',
      type: 'real',
    },
    {
      id: 'maruedrug',
      name: 'マルエドラッグ',
      type: 'real',
    },
    {
      id: 'maruya',
      name: 'マルヤ',
      type: 'real',
    },
    {
      id: 'maruzen',
      name: 'MARUZEN',
      type: 'real',
    },
    {
      id: 'matsumoto_kiyosi',
      name: 'マツモトキヨシ',
      type: 'real',
    },
    {
      id: 'matsuya',
      name: '松屋',
      type: 'real',
    },
    {
      id: 'matsuyadenki',
      name: 'マツヤデンキ',
      type: 'real',
    },
    {
      id: 'medetaya',
      name: 'めでた家',
      type: 'real',
    },
    {
      id: 'meganedrug',
      name: 'メガネドラッグ',
      type: 'real',
    },
    {
      id: 'meganeichiba',
      name: '眼鏡市場',
      type: 'real',
    },
    {
      id: 'meganesuper',
      name: 'メガネスーパー',
      type: 'real',
    },
    {
      id: 'mekiki',
      name: '目利きの銀次',
      type: 'real',
    },
    {
      id: 'ministop',
      name: 'MINISTOP',
      type: 'real',
    },
    {
      id: 'miomio',
      name: 'miomio',
      type: 'real',
    },
    {
      id: 'miraizaka',
      name: 'ミライザカ',
      type: 'real',
    },
    {
      id: 'mitsuecyan',
      name: 'みつえちゃん',
      type: 'real',
    },
    {
      id: 'mom',
      name: 'Mom',
      type: 'real',
    },
    {
      id: 'monterey-akasaka',
      name: 'ホテルモントレ赤坂',
      type: 'real',
    },
    {
      id: 'monterey-ginza',
      name: 'ホテルモントレ銀座',
      type: 'real',
    },
    {
      id: 'monterey-hanzomon',
      name: 'ホテルモントレ半蔵門',
      type: 'real',
    },
    {
      id: 'monterey-lasoeurginza',
      name: 'ホテルモントレラスール銀座',
      type: 'real',
    },
    {
      id: 'monterey-yokohama',
      name: 'ホテルモントレ横浜',
      type: 'real',
    },
    {
      id: 'monthlyresistays',
      name: 'MONTHLY RESI STAYS',
      type: 'real',
    },
    {
      id: 'morivacoffee',
      name: 'MORIVA COFFEE',
      type: 'real',
    },
    {
      id: 'mrmax_1',
      name: 'MrMax',
      type: 'real',
    },
    {
      id: 'nabekura',
      name: 'なべくら',
      type: 'real',
    },
    {
      id: 'nakamuraya',
      name: 'nakamuraya',
      type: 'real',
    },
    {
      id: 'nakau',
      name: 'なか卯',
      type: 'real',
    },
    {
      id: 'napolinokama',
      name: 'ナポリの窯',
      type: 'real',
    },
    {
      id: 'naturallawson',
      name: 'NATURAL LAWSON',
      type: 'real',
    },
    {
      id: 'niatori',
      name: '鶏のGeorge',
      type: 'real',
    },
    {
      id: 'nihonchuou',
      name: '日本中央',
      type: 'real',
    },
    {
      id: 'nihoncyusyajokaihatsu',
      name: 'CNPD',
      type: 'real',
    },
    {
      id: 'nihonkukobuilding',
      name: 'JAPAN AREPORT TERMINAL',
      type: 'real',
    },
    {
      id: 'nijubashisquare',
      name: '二重橋スクエア',
      type: 'real',
    },
    {
      id: 'nikkoniigata',
      name: 'hotel nikko niigata',
      type: 'real',
    },
    {
      id: 'nikusuta',
      name: 'にくスタ',
      type: 'real',
    },
    {
      id: 'nojima',
      name: 'Nojima',
      type: 'real',
    },
    {
      id: 'oazo',
      name: 'oazo',
      type: 'real',
    },
    {
      id: 'odakyu',
      name: 'ODAKYU',
      type: 'real',
    },
    {
      id: 'oideyo',
      name: 'おいで屋ホルモン',
      type: 'real',
    },
    {
      id: 'okkasan',
      name: 'おっ母さん',
      type: 'real',
    },
    {
      id: 'onyasai',
      name: '温野菜しゃぶしゃぶ',
      type: 'real',
    },
    {
      id: 'orientaltaxi',
      name: 'ORIENTAL TAXI',
      type: 'real',
    },
    {
      id: 'origin',
      name: 'KICHEN ORIGIN',
      type: 'real',
    },
    {
      id: 'orion',
      name: 'オリオン書房',
      type: 'real',
    },
    {
      id: 'otani',
      name: 'オータニ',
      type: 'real',
    },
    {
      id: 'outdoor',
      name: 'OUTDOOR',
      type: 'real',
    },
    {
      id: 'owndays',
      name: 'OWNDAYS',
      type: 'real',
    },
    {
      id: 'parcobook',
      name: 'パルコ　ブックセンター',
      type: 'real',
    },
    {
      id: 'parimiki',
      name: 'PARIS MIKI',
      type: 'real',
    },
    {
      id: 'pasocon',
      name: 'パソコン工房',
      type: 'real',
    },
    {
      id: 'pcdepo',
      name: 'PC DEPOT',
      type: 'real',
    },
    {
      id: 'perfectsuitfactory',
      name: 'P.S.FA',
      type: 'real',
    },
    {
      id: 'pizza_pockets',
      name: 'ピサポケット',
      type: 'real',
    },
    {
      id: 'pizzala',
      name: 'PIZZA-LA',
      type: 'real',
    },
    {
      id: 'point',
      name: 'point',
      type: 'real',
    },
    {
      id: 'popla',
      name: 'ポプラ',
      type: 'real',
    },
    {
      id: 'randbotel',
      name: 'R&B HOTEL',
      type: 'real',
    },
    {
      id: 'randmarkplaza',
      name: 'RANDMARK PLAZA',
      type: 'real',
    },
    {
      id: 'rashinban',
      name: 'らしんばん',
      type: 'real',
    },
    {
      id: 'relxle',
      name: 'リラクル',
      type: 'real',
    },
    {
      id: 'renge',
      name: 'れんげ食堂',
      type: 'real',
    },
    {
      id: 'ricoland',
      name: 'RICOLAND',
      type: 'real',
    },
    {
      id: 'righton',
      name: 'Right-on',
      type: 'real',
    },
    {
      id: 'robokichi',
      name: 'ROBOKICHI',
      type: 'real',
    },
    {
      id: 'round1',
      name: 'ROUND1',
      type: 'real',
    },
    {
      id: 'royallimousine',
      name: 'Royal Limousine',
      type: 'real',
    },
    {
      id: 'saintmarccafe',
      name: 'サンマルクカフェ',
      type: 'real',
    },
    {
      id: 'sanyoyakuhin',
      name: '三洋薬品HBC',
      type: 'real',
    },
    {
      id: 'satsudora',
      name: 'サツドラ',
      type: 'real',
    },
    {
      id: 'seicomart',
      name: 'Seicomart',
      type: 'real',
    },
    {
      id: 'seims',
      name: 'SEIMS',
      type: 'real',
    },
    {
      id: 'seiyu',
      name: 'SEIYU',
      type: 'real',
    },
    {
      id: 'sekichu',
      name: 'セキチュー',
      type: 'real',
    },
    {
      id: 'sekiyakuhin',
      name: 'ドラッグストアSEKI',
      type: 'real',
    },
    {
      id: 'sennen',
      name: '千年の宴',
      type: 'real',
    },
    {
      id: 'setoudon',
      name: '瀬戸うどん',
      type: 'real',
    },
    {
      id: 'seven-eleven',
      name: 'セブンイレブン',
      type: 'real',
    },
    {
      id: 'shimachu',
      name: 'Shimachu',
      type: 'real',
    },
    {
      id: 'shimamura',
      name: '島村楽器',
      type: 'real',
    },
    {
      id: 'shinmarubiru',
      name: '新丸ビル',
      type: 'real',
    },
    {
      id: 'shiroyagi',
      name: '白ヤギ珈琲店',
      type: 'real',
    },
    {
      id: 'shitokuya',
      name: '白木屋',
      type: 'real',
    },
    {
      id: 'shoeplaza',
      name: 'SHOE•PLAZA',
      type: 'real',
    },
    {
      id: 'shonanmonorail',
      name: '湘南モノレール',
      type: 'real',
    },
    {
      id: 'sofmap',
      name: 'ソフマップ',
      type: 'real',
    },
    {
      id: 'sonystore',
      name: 'SONYストア',
      type: 'real',
    },
    {
      id: 'sotetsurosen',
      name: 'そうてつローゼン',
      type: 'real',
    },
    {
      id: 'stepsports',
      name: 'Step',
      type: 'real',
    },
    {
      id: 'strawberrycones',
      name: 'STRAWBERRY CONES',
      type: 'real',
    },
    {
      id: 'sugiyakkyoku',
      name: 'スギ薬局',
      type: 'real',
    },
    {
      id: 'sukiya',
      name: 'すき家',
      type: 'real',
    },
    {
      id: 'sumibiizaykayaen',
      name: '炭火居酒屋　炎',
      type: 'real',
    },
    {
      id: 'sunbelx',
      name: 'スーパーベルクス',
      type: 'real',
    },
    {
      id: 'sundrug',
      name: 'サンドラッグ',
      type: 'real',
    },
    {
      id: 'superalps',
      name: 'スーパーアルプス',
      type: 'real',
    },
    {
      id: 'surugaya',
      name: '駿河屋',
      type: 'real',
    },
    {
      id: 'sushiuogin',
      name: 'すし魚銀',
      type: 'real',
    },
    {
      id: 'suteki',
      name: 'ステーキ宮',
      type: 'real',
    },
    {
      id: 'syabuyo2',
      name: 'しゃぶ葉',
      type: 'real',
    },
    {
      id: 'tabix',
      name: 'TABIX',
      type: 'real',
    },
    {
      id: 'tackleberry',
      name: 'タックルベリー',
      type: 'real',
    },
    {
      id: 'taiyounogrill',
      name: '太陽のグリル',
      type: 'real',
    },
    {
      id: 'takadatori',
      name: '高田どり酒場',
      type: 'real',
    },
    {
      id: 'takaq',
      name: 'TAKAQ',
      type: 'real',
    },
    {
      id: 'takashimaya',
      name: 'Takashimaya',
      type: 'real',
    },
    {
      id: 'takeya',
      name: '多慶屋',
      type: 'real',
    },
    {
      id: 'tamonan',
      name: 'たもん庵',
      type: 'real',
    },
    {
      id: 'tenkaichi',
      name: '天下一',
      type: 'real',
    },
    {
      id: 'texmix',
      name: 'TEXMEX FACTORY',
      type: 'real',
    },
    {
      id: 'tobustore',
      name: '東武ストア',
      type: 'real',
    },
    {
      id: 'tohokenbunroku',
      name: '東方見聞録',
      type: 'real',
    },
    {
      id: 'tokia',
      name: 'TOKIA',
      type: 'real',
    },
    {
      id: 'tokyoshoesretaillingcenter',
      name: '東京流通センター',
      type: 'real',
    },
    {
      id: 'tokyuhands',
      name: 'TOKYU HANDS',
      type: 'real',
    },
    {
      id: 'tokyustore',
      name: 'TokyuStore',
      type: 'real',
    },
    {
      id: 'tometeba',
      name: 'とめ手羽',
      type: 'real',
    },
    {
      id: 'tomods',
      name: 'Tomods',
      type: 'real',
    },
    {
      id: 'tonkatsumatsunoya',
      name: '松のや',
      type: 'real',
    },
    {
      id: 'torimero',
      name: '鳥メロ',
      type: 'real',
    },
    {
      id: 'torisen_02',
      name: 'とりせん',
      type: 'real',
    },
    {
      id: 'toriyoshi',
      name: '鳥良',
      type: 'real',
    },
    {
      id: 'toriyoshisyoten',
      name: '鳥良商店',
      type: 'real',
    },
    {
      id: 'toyoko-inn',
      name: '東横イン',
      type: 'real',
    },
    {
      id: 'toysrus',
      name: 'ToysRus',
      type: 'real',
    },
    {
      id: 'tranoana',
      name: 'とらのあな',
      type: 'real',
    },
    {
      id: 'tsukinoutage',
      name: '月の宴',
      type: 'real',
    },
    {
      id: 'tsukumo',
      name: 'TSUKUMO',
      type: 'real',
    },
    {
      id: 'tsuruhadrug',
      name: 'ツルハドラッグ',
      type: 'real',
    },
    {
      id: 'tsutaya',
      name: 'TSUTAYA',
      type: 'real',
    },
    {
      id: 'uchikuru',
      name: 'うちくる',
      type: 'real',
    },
    {
      id: 'ueshima',
      name: '上島珈琲店',
      type: 'real',
    },
    {
      id: 'uoman',
      name: '魚萬',
      type: 'real',
    },
    {
      id: 'uoman01',
      name: '北海道　魚萬',
      type: 'real',
    },
    {
      id: 'uoman02',
      name: '横浜　魚萬',
      type: 'real',
    },
    {
      id: 'uotami',
      name: '魚民',
      type: 'real',
    },
    {
      id: 'usachan2',
      name: 'うさちゃんクリーニング',
      type: 'real',
    },
    {
      id: 'utanosuke',
      name: 'カラオケ歌之助',
      type: 'real',
    },
    {
      id: 'wai',
      name: '輪囲',
      type: 'real',
    },
    {
      id: 'wandergoo',
      name: 'WonderGOO',
      type: 'real',
    },
    {
      id: 'warawara',
      name: '笑笑',
      type: 'real',
    },
    {
      id: 'washington-hotel-plaza',
      name: 'ワシントンホテルプラザ',
      type: 'real',
    },
    {
      id: 'wasyokuyohei',
      name: '和食よへい',
      type: 'real',
    },
    {
      id: 'watahan',
      name: '綿半',
      type: 'real',
    },
    {
      id: 'watami01',
      name: '坐•和民',
      type: 'real',
    },
    {
      id: 'watami02',
      name: '和民',
      type: 'real',
    },
    {
      id: 'welcia',
      name: 'welcia',
      type: 'real',
    },
    {
      id: 'windsor',
      name: 'WINDSOR',
      type: 'real',
    },
    {
      id: 'ws',
      name: 'Ws',
      type: 'real',
    },
    {
      id: 'yakinikubanri',
      name: '焼肉万里',
      type: 'real',
    },
    {
      id: 'yamada',
      name: 'ヤマダ電機',
      type: 'real',
    },
    {
      id: 'yamadadrug',
      name: 'yamadadrug',
      type: 'real',
    },
    {
      id: 'yamaguchi',
      name: 'ヤマグチ',
      type: 'real',
    },
    {
      id: 'yamaichi',
      name: 'ヤマイチ',
      type: 'real',
    },
    {
      id: 'yamauchi',
      name: '山内牧場',
      type: 'real',
    },
    {
      id: 'yamaya',
      name: 'やまや',
      type: 'real',
    },
    {
      id: 'yaoyoshi',
      name: 'スーパーマーケットyaoyoshi',
      type: 'real',
    },
    {
      id: 'yomiuri',
      name: 'よみうりランド',
      type: 'real',
    },
    {
      id: 'yomuyomu',
      name: 'よむよむ',
      type: 'real',
    },
    {
      id: 'yorkmart',
      name: 'ヨークマート',
      type: 'real',
    },
    {
      id: 'yoshinoya',
      name: '吉野家',
      type: 'real',
    },
    {
      id: 'ysmart',
      name: 'ワイズmart',
      type: 'real',
    },
    {
      id: 'yucoop',
      name: 'coop',
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
