import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CreateRoutingModule } from './create-routing.module';
import { QrCodeComponent } from './qr-code/qr-code.component';
import { FormComponent } from './form/form.component';

@NgModule({
  declarations: [QrCodeComponent, FormComponent],
  imports: [CommonModule, CreateRoutingModule],
})
export class CreateModule {}
