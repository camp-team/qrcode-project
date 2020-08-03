import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CreateRoutingModule } from './create-routing.module';
import { FormComponent } from './form/form.component';
import { SharedModule } from '../shared/shared.module';
import { MatInputModule } from '@angular/material/input';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatRadioModule } from '@angular/material/radio';
import { MatChipsModule } from '@angular/material/chips';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatDialogModule } from '@angular/material/dialog';
import { DeleteCardDialogComponent } from './delete-card-dialog/delete-card-dialog.component';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatSelectModule } from '@angular/material/select';

@NgModule({
  declarations: [FormComponent, DeleteCardDialogComponent],
  imports: [
    CommonModule,
    CreateRoutingModule,
    SharedModule,
    MatInputModule,
    MatCheckboxModule,
    MatRadioModule,
    MatChipsModule,
    MatAutocompleteModule,
    MatDialogModule,
    MatSnackBarModule,
    MatSelectModule,
  ],
  entryComponents: [DeleteCardDialogComponent],
})
export class CreateModule {}
