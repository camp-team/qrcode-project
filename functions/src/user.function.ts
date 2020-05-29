import * as functions from 'firebase-functions';
import * as adimin from 'firebase-admin';
import { UserData } from './interfaces/user';

adimin.initializeApp();

const db = adimin.firestore();

export const createUser = functions
  .region('asia-northeast1')
  .auth.user()
  .onCreate((user) => {
    const userData: UserData = {
      name: user.displayName || '',
      avatarURL: user.photoURL?.replace('_nomal', '') || '',
      email: user.email || '',
      uid: user.uid,
      createdAt: new Date(),
    };
    return db.doc(`users/${user.uid}`).set(userData);
  });
