import { Component, OnInit } from '@angular/core';
import Stripe from 'stripe';
import { PaymentService } from '../services/payment.service';
import { MatDialog } from '@angular/material/dialog';
import { RegisterCardDialogComponent } from '../shared/register-card-dialog/register-card-dialog.component';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.scss'],
})
export class PaymentComponent implements OnInit {
  paidAds: boolean;
  paymentCard: Stripe.PaymentMethod;
  constructor(
    private paymentService: PaymentService,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.paymentService.getPaymentMethod().then((cards) => {
      this.paymentCard = cards.data[0];
    });
  }

  openRegisterCardDialog() {
    this.dialog.open(RegisterCardDialogComponent);
  }

  charge() {
    this.paymentService.charge();
  }
}
