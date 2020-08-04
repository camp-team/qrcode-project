import { stripe } from './client';
import { db } from './../db';
import * as functions from 'firebase-functions';
import Stripe from 'stripe';
import { Customer } from '../interfaces/customer';

export const createStripeSetupIntent = functions
  .region('asia-northeast1')
  .https.onCall(async (_, context) => {
    if (!context.auth) {
      throw new functions.https.HttpsError(
        'permission-denied',
        '認証エラーが発生しました。'
      );
    }
    const cusomer: Customer = (
      await db.doc(`customer/${context.auth.uid}`).get()
    ).data() as Customer;
    if (!cusomer) {
      throw new functions.https.HttpsError(
        'permission-denied',
        'プラットフォームにカスタマーが存在しません。'
      );
    }
    return stripe.setupIntents.create({
      payment_method_types: ['card'],
      customer: cusomer.customerId,
    });
  });
