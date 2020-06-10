import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ElectronDetailRoutingModule } from './electron-detail-routing.module';
import { ElectronDetailComponent } from './electron-detail/electron-detail.component';

@NgModule({
  declarations: [ElectronDetailComponent],
  imports: [CommonModule, ElectronDetailRoutingModule],
})
export class ElectronDetailModule {}
