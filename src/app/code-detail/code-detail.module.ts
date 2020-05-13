import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CodeDetailRoutingModule } from './code-detail-routing.module';
import { CodeDetailComponent } from './code-detail/code-detail.component';

@NgModule({
  declarations: [CodeDetailComponent],
  imports: [CommonModule, CodeDetailRoutingModule],
})
export class CodeDetailModule {}
