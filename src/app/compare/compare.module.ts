import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CompareRoutingModule } from './compare-routing.module';
import { CompareComponent } from './compare/compare.component';
import { SharedModule } from '../shared/shared.module';
import { MatSelectModule } from '@angular/material/select';

@NgModule({
  declarations: [CompareComponent],
  imports: [CommonModule, CompareRoutingModule, SharedModule, MatSelectModule],
})
export class CompareModule {}
