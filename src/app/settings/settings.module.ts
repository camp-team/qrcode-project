import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatDialogModule } from '@angular/material/dialog';
import { MatListModule } from '@angular/material/list';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTabsModule } from '@angular/material/tabs';
import { ImageCropperModule } from 'ngx-image-cropper';
import { SharedModule } from '../shared/shared.module';
import { DeleteUserDialogComponent } from './delete-user-dialog/delete-user-dialog.component';
import { SettingsRoutingModule } from './settings-routing.module';
import { SettingsComponent } from './settings/settings.component';

@NgModule({
  declarations: [SettingsComponent, DeleteUserDialogComponent],
  imports: [
    CommonModule,
    SettingsRoutingModule,
    SharedModule,
    ImageCropperModule,
    MatSnackBarModule,
    MatDialogModule,
    MatListModule,
    MatTabsModule,
  ],
})
export class SettingsModule {}
