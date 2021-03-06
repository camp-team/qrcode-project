import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { auth, User } from 'firebase';
import { Observable, of } from 'rxjs';

import { AngularFirestore } from '@angular/fire/firestore';
import { UserData } from '@interfaces/user';
import { switchMap, shareReplay } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  uid: string;
  user$: Observable<UserData> = this.afAuth.authState.pipe(
    switchMap((afUser) => {
      if (afUser) {
        this.uid = afUser?.uid;
        return this.db.doc<UserData>(`users/${afUser.uid}`).valueChanges();
      } else {
        return of(null);
      }
    }),
    shareReplay(1)
  );

  constructor(private afAuth: AngularFireAuth, private db: AngularFirestore) {}

  login(): Promise<auth.UserCredential> {
    const provider = new auth.GoogleAuthProvider();
    provider.setCustomParameters({ prompt: 'select_account' });
    return this.afAuth.signInWithPopup(provider);
  }

  logout(): Promise<void> {
    return this.afAuth.signOut();
  }
}
