import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CodeCardRoutingModule } from './code-card-routing.module';
import { CodeCardComponent } from './code-card/code-card.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [CodeCardComponent],
  imports: [CommonModule, CodeCardRoutingModule, SharedModule],
})
export class CodeCardModule {}
