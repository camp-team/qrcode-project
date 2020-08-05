import { Customer } from './../interfaces/customer';
import { stripe } from './client';
import { db } from './../db';
import * as functions from 'firebase-functions';
// import Stripe from 'stripe';
import admin = require('firebase-admin');

export const setStripePaymentMethod = functions
  .region('asia-northeast1')
  .https.onCall(
    async (data: { paymentMethod: string }, context): Promise<void> => {
      if (!data) {
        throw new functions.https.HttpsError(
          'data-loss',
          'データが存在しません。'
        );
      }
      if (!context.auth) {
        throw new functions.https.HttpsError(
          'permission-denied',
          '認証エラーが発生しました。'
        );
      }

      const customerDoc = await db.doc(`customers/${context.auth.uid}`);
      const customer = (await customerDoc.get()).data() as Customer;

      if (!customer) {
        throw new functions.https.HttpsError(
          'permission-denied',
          'プラットフォームにカスタマーが存在しません。'
        );
      }
      if (!customer.paymentMethods?.length) {
        await stripe.customers.update(customer.customerId, {
          invoice_settings: {
            default_payment_method: data.paymentMethod,
          },
        });
      }
      await customerDoc.update({
        paymentMethods: admin.firestore.FieldValue.arrayUnion(
          data.paymentMethod
        ),
        defaultPaymentMethod:
          customer.paymentMethods?.length > 0
            ? customer.defaultPaymentMethod
            : data.paymentMethod,
      });
    }
  );
