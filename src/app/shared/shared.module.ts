import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatTabsModule } from '@angular/material/tabs';
import { IdToStorePipe } from '../pipes/id-to-store.pipe';
import { MatSelectModule } from '@angular/material/select';
import { RegisterCardDialogComponent } from './register-card-dialog/register-card-dialog.component';

@NgModule({
  declarations: [IdToStorePipe, RegisterCardDialogComponent],
  imports: [CommonModule],
  exports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatButtonModule,
    MatMenuModule,
    MatIconModule,
    MatCardModule,
    MatTabsModule,
    IdToStorePipe,
    MatSelectModule,
    RegisterCardDialogComponent,
  ],
})
export class SharedModule {}
