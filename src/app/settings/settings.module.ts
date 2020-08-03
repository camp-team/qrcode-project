import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SettingsRoutingModule } from './settings-routing.module';
import { SettingsComponent } from './settings/settings.component';
import { SharedModule } from '../shared/shared.module';
import { MatInputModule } from '@angular/material/input';
import { ImageCropperModule } from 'ngx-image-cropper';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { DeleteUserDialogComponent } from './delete-user-dialog/delete-user-dialog.component';
import { MatDialogModule } from '@angular/material/dialog';

@NgModule({
  declarations: [SettingsComponent, DeleteUserDialogComponent],
  imports: [
    CommonModule,
    SettingsRoutingModule,
    SharedModule,
    MatInputModule,
    ImageCropperModule,
    MatSnackBarModule,
    MatDialogModule,
  ],
})
export class SettingsModule {}
