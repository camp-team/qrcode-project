import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { UserData } from '@interfaces/user';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private db: AngularFirestore) {}

  getUser(uid: string): Observable<UserData> {
    return this.db.doc<UserData>(`users/${uid}`).valueChanges();
  }

  updateUser(
    user: Omit<UserData, 'admin' | 'createdAt' | 'email'>
  ): Promise<void> {
    return this.db.doc(`users/${user.uid}`).set(
      {
        ...user,
      },
      { merge: true }
    );
  }
}
