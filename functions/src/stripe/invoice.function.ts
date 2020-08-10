import { db } from './../db';
import { stripe } from './client';
import Stripe from 'stripe';
import * as functions from 'firebase-functions';
import { Customer } from '../interfaces/customer';

export const getStripeInvoices = functions
  .region('asia-northeast1')
  .https.onCall(
    async (_, context): Promise<Stripe.ApiList<Stripe.Charge> | null> => {
      if (!context.auth) {
        throw new functions.https.HttpsError(
          'permission-denied',
          '認証が必要です'
        );
      }
      const customer: Customer = (
        await db.doc(`customers/${context.auth.uid}`).get()
      ).data() as Customer;

      if (customer) {
        const params: Stripe.ChargeListParams = {
          customer: customer.customerId,
          limit: 10,
          expand: ['data.invoice'],
        };
        return stripe.charges.list(params);
      } else {
        return null;
      }
    }
  );
