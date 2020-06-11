import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ElectronDetailRoutingModule } from './electron-detail-routing.module';
import { ElectronDetailComponent } from './electron-detail/electron-detail.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [ElectronDetailComponent],
  imports: [CommonModule, ElectronDetailRoutingModule, SharedModule],
})
export class ElectronDetailModule {}
