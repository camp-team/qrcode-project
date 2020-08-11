import { Injectable } from '@angular/core';
import { AngularFireFunctions } from '@angular/fire/functions';
import Stripe from 'stripe';
import { ChargeWithInvoice } from '@interfaces/charge';

@Injectable({
  providedIn: 'root',
})
export class CustomerService {
  constructor(private fns: AngularFireFunctions) {}

  getInvoice(): Promise<Stripe.ApiList<ChargeWithInvoice>> {
    const callable = this.fns.httpsCallable('getStripeInvoices');
    return callable({}).toPromise();
  }
}
