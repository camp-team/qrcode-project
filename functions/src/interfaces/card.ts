export interface BasicCard {
  cardId: string;
  imageURL: string;
  name: string;
  point: number;
  addPoint: string;
  expiration: string;
  storeIds: string[];
  campaign: string;
  viewCount?: number;
}
