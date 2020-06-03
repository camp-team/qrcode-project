import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
import { UserData } from './interfaces/user';

admin.initializeApp();

const db = admin.firestore();

export const createUser = functions
  .region('asia-northeast1')
  .auth.user()
  .onCreate((user) => {
    const userData: UserData = {
      name: user.displayName || '',
      avatarURL: user.photoURL?.replace('_nomal', '') || '',
      email: user.email || '',
      uid: user.uid,
      admin: user.email === 'hiroponpoko07@gmail.com' ? true : false,
      createdAt: new Date(),
    };
    return db.doc(`users/${user.uid}`).set(userData);
  });
