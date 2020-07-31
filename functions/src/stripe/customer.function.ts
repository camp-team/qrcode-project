import * as functions from 'firebase-functions';
import { auth } from 'firebase-admin';
import Stripe from 'stripe';
import { db } from './db';
import { stripe } from './client';

export const createStripeCustomer = functions
  .region('asia-northeast1')
  .auth.user()
  .onCreate(async (user: auth.UserRecord) => {
    const customer: Stripe.Customer = await stripe.customers.create({
      name: user.displayName,
      email: user.email,
    });
    return db.doc(`customers/${user.uid}`).set({
      userId: user.uid,
      customerId: customer.id,
    });
  });

export const getStripeCustomer = functions
  .region('asia-northeast1')
  .https.onCall(async (data, context) => {
    if (!context.auth) {
      throw new functions.https.HttpsError('permission-denied', 'not user');
    }
    const customer = (
      await db.doc(`customer/${context.auth.uid}`).get()
    ).data();
    if (!customer) {
      throw new functions.https.HttpsError(
        'permission-denied',
        'there is no customer'
      );
    }
    return stripe.customers.retrieve(customer.customerId);
  });
