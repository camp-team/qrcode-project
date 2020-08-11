import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PaymentService } from 'src/app/services/payment.service';
import { StripeCardElement, Stripe as StripeClient } from '@stripe/stripe-js';
import Stripe from 'stripe';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-register-card-dialog',
  templateUrl: './register-card-dialog.component.html',
  styleUrls: ['./register-card-dialog.component.scss'],
})
export class RegisterCardDialogComponent implements OnInit {
  @ViewChild('cardElement') private cardElementRef: ElementRef;

  form: FormGroup = this.fb.group({
    name: ['', [Validators.required, Validators.maxLength(60)]],
    email: [
      '',
      [Validators.required, Validators.email, Validators.maxLength(254)],
    ],
  });
  cardElement: StripeCardElement;
  stripeClient: StripeClient;
  isComplete: boolean;

  constructor(
    private fb: FormBuilder,
    public paymentService: PaymentService,
    private snackBar: MatSnackBar
  ) {}

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
      this.snackBar.open('カードを登録しています。', null, {
        duration: null,
      });
      this.paymentService
        .setPaymentMethod(
          this.stripeClient,
          this.cardElement,
          this.form.value.name,
          this.form.value.email
        )
        .then(() => {
          this.snackBar.open('カードを登録しました。');
        })
        .catch((error: Error) => {
          console.error(error.message);
          switch (error.message) {
            case 'expired_card':
              this.snackBar.open('カードの有効期限が切れています。');
              break;
            default:
              this.snackBar.open('カードの登録に失敗しました。');
          }
        })
        .finally(() => {
          this.cardElement.clear();
        });
    }
  }
}
