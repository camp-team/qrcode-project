import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { CardListRoutingModule } from './card-list-routing.module';
import { CardListComponent } from './card-list/card-list.component';

@NgModule({
  declarations: [CardListComponent],
  imports: [CommonModule, CardListRoutingModule, SharedModule],
})
export class CardListModule {}
