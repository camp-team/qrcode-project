import { BasicCard } from './card';

export interface CodeCard extends BasicCard {
  payment: string[];
  charge: string[];
  autoCharge: string;
  availableCredit: string[];
  pushMoney: string;
  pullMoney: string;
}
