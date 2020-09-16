import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';

import { CardListRoutingModule } from './card-list-routing.module';
import { CardListComponent } from './card-list/card-list.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [CardListComponent],
  imports: [CommonModule, CardListRoutingModule, MatCardModule, SharedModule],
})
export class CardListModule {}
