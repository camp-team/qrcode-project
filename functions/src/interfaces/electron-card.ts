import { BasicCard } from './card';

export interface ElectronCard extends BasicCard {
  payment: string[];
  charge: string[];
  autoCharge: string;
  availableCredit: string[];
}
