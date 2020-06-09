import { Card } from './card';

export interface ElectronCard extends Card {
  payment: string[];
  charge: string[];
  autoCharge: string;
  availableCredit: string[];
}
