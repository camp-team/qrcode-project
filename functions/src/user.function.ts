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
      admin: false,
      createdAt: new Date(),
    };
    return db.doc(`users/${user.uid}`).set(userData);
  });

export const deleteUser = functions
  .region('asia-northeast1')
  .https.onCall((data, context) => {
    return admin.auth().deleteUser(data);
  });

export const deleteUserData = functions
  .region('asia-northeast1')
  .auth.user()
  .onDelete((user) => {
    return db.doc(`users/${user.uid}`).delete();
  });
