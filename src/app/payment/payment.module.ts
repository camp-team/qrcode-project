import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PaymentRoutingModule } from './payment-routing.module';
import { PaymentComponent } from './payment.component';
import { MatStepperModule } from '@angular/material/stepper';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [PaymentComponent],
  imports: [CommonModule, PaymentRoutingModule, MatStepperModule, SharedModule],
})
export class PaymentModule {}
