import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatTabsModule } from '@angular/material/tabs';
import { IdToStorePipe } from '../pipes/id-to-store.pipe';
import { MatSelectModule } from '@angular/material/select';

@NgModule({
  declarations: [IdToStorePipe],
  imports: [CommonModule],
  exports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatMenuModule,
    MatIconModule,
    MatCardModule,
    MatTabsModule,
    IdToStorePipe,
    MatSelectModule,
  ],
})
export class SharedModule {}
