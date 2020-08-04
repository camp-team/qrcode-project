import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { PaymentService } from 'src/app/services/payment.service';
import { StripeCardElement, Stripe as StripeClient } from '@stripe/stripe-js';
import Stripe from 'stripe';

@Component({
  selector: 'app-register-card-dialog',
  templateUrl: './register-card-dialog.component.html',
  styleUrls: ['./register-card-dialog.component.scss'],
})
export class RegisterCardDialogComponent implements OnInit {
  @ViewChild('cardElement') private cardElementRef: ElementRef;

  form: FormGroup = this.fb.group({
    name: '',
    email: '',
  });
  cardElement: StripeCardElement;
  stripeClient: StripeClient;
  isComplete: boolean;

  constructor(private fb: FormBuilder, public paymentService: PaymentService) {}

  ngOnInit(): void {
    this.buildForm();
  }

  async buildForm() {
    this.stripeClient = await this.paymentService.getStripeClient();
    const element = this.stripeClient.elements();
    this.cardElement = element.create('card');
    this.cardElement.mount(this.cardElementRef.nativeElement);
    this.cardElement.on(
      'change',
      (event) => (this.isComplete = event.complete)
    );
  }

  createCard() {
    if (this.form.valid) {
      this.paymentService.setPaymentMethod(
        this.stripeClient,
        this.cardElement,
        this.form.value.name,
        this.form.value.email
      );
    }
  }
}
