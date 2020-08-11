import { stripe } from './client';
import { db } from './../db';
import * as functions from 'firebase-functions';
import Stripe from 'stripe';
import { Customer } from '../interfaces/customer';

export const createStripeSetupIntent = functions
  .region('asia-northeast1')
  .https.onCall(
    async (_, context): Promise<Stripe.SetupIntent> => {
      if (!context.auth) {
        throw new functions.https.HttpsError(
          'permission-denied',
          '認証エラーが発生しました。'
        );
      }
      const customer: Customer = (
        await db.doc(`customers/${context.auth.uid}`).get()
      ).data() as Customer;
      if (!customer) {
        throw new functions.https.HttpsError(
          'permission-denied',
          'プラットフォームにカスタマーが存在しません。'
        );
      }
      return stripe.setupIntents.create({
        payment_method_types: ['card'],
        customer: customer.customerId,
      });
    }
  );
