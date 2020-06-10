import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ElectronCardRoutingModule } from './electron-card-routing.module';
import { ElectronCardComponent } from './electron-card/electron-card.component';

@NgModule({
  declarations: [ElectronCardComponent],
  imports: [CommonModule, ElectronCardRoutingModule],
})
export class ElectronCardModule {}
