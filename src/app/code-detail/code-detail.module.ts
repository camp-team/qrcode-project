import { IdToStorePipe } from './../pipes/id-to-store.pipe';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CodeDetailRoutingModule } from './code-detail-routing.module';
import { CodeDetailComponent } from './code-detail/code-detail.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [CodeDetailComponent, IdToStorePipe],
  imports: [CommonModule, CodeDetailRoutingModule, SharedModule],
})
export class CodeDetailModule {}
