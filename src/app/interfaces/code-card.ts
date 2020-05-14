import { Card } from './card';

export interface CodeCard extends Card {
  charge: string;
  autoCharge: string;
  availableCredit: string;
  pushMoney: string;
  pullMoney: string;
}
