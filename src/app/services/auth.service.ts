import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { auth, User } from 'firebase';
import { Observable } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  afUser$: Observable<User> = this.afAuth.user;

  constructor(private afAuth: AngularFireAuth, private snackBar: MatSnackBar) {
    this.afUser$.subscribe((user) => console.log(user));
  }

  login() {
    this.afAuth.signInWithPopup(new auth.GoogleAuthProvider()).then(() => {
      this.snackBar.open('ログインしました🥳', null, {
        duration: 2000,
      });
    });
  }
}
