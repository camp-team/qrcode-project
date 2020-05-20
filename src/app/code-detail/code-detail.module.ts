import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CodeDetailRoutingModule } from './code-detail-routing.module';
import { CodeDetailComponent } from './code-detail/code-detail.component';
import { SharedModule } from '../shared/shared.module';
import { IdToStorePipe } from '../pipes/id-to-store.pipe';

@NgModule({
  declarations: [CodeDetailComponent, IdToStorePipe],
  imports: [CommonModule, CodeDetailRoutingModule, SharedModule],
})
export class CodeDetailModule {}
