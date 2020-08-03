import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import {
  loadStripe,
  Stripe as StripeClient,
  StripeCardElement,
} from '@stripe/stripe-js';
import Stripe from 'stripe';

@Injectable({
  providedIn: 'root',
})
export class PaymentService {
  constructor() {}

  getStripeClient(): Promise<StripeClient> {
    return loadStripe(environment.stripe.publicKey);
  }
}
