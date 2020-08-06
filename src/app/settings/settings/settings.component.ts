import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Observable } from 'rxjs';
import { UserData } from '@interfaces/user';
import { FormControl, Validators } from '@angular/forms';
import { UserService } from 'src/app/services/user.service';
import { ImageCroppedEvent } from 'ngx-image-cropper';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AngularFireStorage } from '@angular/fire/storage';
import { MatDialog } from '@angular/material/dialog';
import { DeleteUserDialogComponent } from '../delete-user-dialog/delete-user-dialog.component';
import { Router } from '@angular/router';
import { AngularFireFunctions } from '@angular/fire/functions';
import { RegisterCardDialogComponent } from 'src/app/shared/register-card-dialog/register-card-dialog.component';
import { PaymentService } from 'src/app/services/payment.service';
import Stripe from 'stripe';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss'],
})
export class SettingsComponent implements OnInit {
  user$: Observable<UserData> = this.authService.user$;
  uid: string = this.authService.uid;
  userControl: FormControl = new FormControl('', [
    Validators.required,
    Validators.maxLength(20),
  ]);
  file: File;
  imageURL: string;
  imageChangedEvent: any = '';
  croppedImage: any = '';
  paymentCard: Stripe.PaymentMethod;

  constructor(
    private authService: AuthService,
    private userService: UserService,
    private storage: AngularFireStorage,
    private snackBar: MatSnackBar,
    public dialog: MatDialog,
    private router: Router,
    private fns: AngularFireFunctions,
    private paymentService: PaymentService
  ) {
    this.userService.getUser(this.uid).subscribe((user) => {
      if (user) {
        this.imageURL = user.avatarURL;
        this.userControl.patchValue(user.name);
      }
    });
  }

  ngOnInit(): void {
    this.paymentService.getPaymentMethod().then((cards) => {
      this.paymentCard = cards.data[0];
    });
  }

  fileChangeEvent(event: any): void {
    this.imageChangedEvent = event;
  }
  imageCropped(event: ImageCroppedEvent) {
    this.croppedImage = event.base64;
    this.imageURL = this.croppedImage;
  }
  imageLoaded() {
    // show cropper
  }
  cropperReady() {
    // cropper ready
  }
  loadImageFailed() {
    alert('画像の読み込みに失敗しました');
  }

  async uploadImage(uid: string, imageURL: string) {
    const result = await this.storage
      .ref(`users/${uid}`)
      .putString(imageURL, 'data_url');
    return result.ref.getDownloadURL();
  }

  async submit() {
    this.imageURL = await this.uploadImage(this.uid, this.imageURL);
    this.userService
      .updateUser({
        name: this.userControl.value,
        avatarURL: this.imageURL,
        uid: this.uid,
      })
      .then(() => {
        this.snackBar.open('アカウントを更新しました', null, {
          duration: 2000,
        });
        this.imageChangedEvent = '';
      });
  }

  deleteUser(uid: string) {
    const callable = this.fns.httpsCallable('deleteUser');
    return callable(uid).toPromise();
  }

  openDeleteUserDialog() {
    this.dialog
      .open(DeleteUserDialogComponent)
      .afterClosed()
      .subscribe((result) => {
        if (result) {
          this.deleteUser(this.uid).then(() => {
            this.snackBar.open('アカウントを削除しました', null, {
              duration: 5000,
            });
            this.router.navigateByUrl('/');
          });
        }
      });
  }

  openRegisterCardDialog() {
    this.dialog.open(RegisterCardDialogComponent);
  }
}
