import { Component, OnInit, Input, HostListener } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  Validators,
  FormControl,
} from '@angular/forms';
import { CreditCard } from '@interfaces/credit-card';
import { CardService } from 'src/app/services/card.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { DeleteCardDialogComponent } from '../delete-card-dialog/delete-card-dialog.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-credit-form',
  templateUrl: './credit-form.component.html',
  styleUrls: ['./credit-form.component.scss'],
})
export class CreditFormComponent implements OnInit {
  @Input() cardId: string;
  isComplete: boolean;
  maxLength = 20;
  processing: boolean;

  form: FormGroup = this.fb.group({
    name: ['', [Validators.required, Validators.maxLength(this.maxLength)]],
    point: ['', [Validators.required]],
    pointName: [
      '',
      [Validators.required, Validators.maxLength(this.maxLength)],
    ],
    annualFee: [
      '',
      [Validators.required, Validators.maxLength(this.maxLength)],
    ],
    brands: ['', [Validators.required]],
    miles: [''],
    additionCards: ['', [Validators.required]],
    insurances: [''],
    electron: [''],
    mobile: [''],
  });

  file: File;
  imageURL: string | ArrayBuffer;

  readonly miles = ['ANAマイル', 'スカイマイル', 'JALマイル'];
  readonly additionCards = ['ETCカード', '家族カード'];
  readonly insurances = ['海外旅行', '国内旅行', 'ショッピング'];
  readonly mobileSettlements = ['ApplePay', 'GooglePay', '楽天ペイ', 'auPAY'];
  readonly creditBrands = [
    {
      name: 'VISA',
      id: 'visa',
    },
    {
      name: 'MasterCard',
      id: 'masterCard',
    },
    {
      name: 'JCB',
      id: 'jcb',
    },
    {
      name: 'American Express',
      id: 'amex',
    },
    {
      name: 'Diners Club',
      id: 'dinerClub',
    },
  ];

  get nameControl() {
    return this.form.get('name') as FormControl;
  }
  get pointControl() {
    return this.form.get('point') as FormControl;
  }
  get pointNameControl() {
    return this.form.get('pointName') as FormControl;
  }
  get annualFeeControl() {
    return this.form.get('annualFee') as FormControl;
  }
  get additonCardControl() {
    return this.form.get('additionCards') as FormControl;
  }
  get electronControl() {
    return this.form.get('electron') as FormControl;
  }

  constructor(
    private fb: FormBuilder,
    private cardService: CardService,
    private snackBar: MatSnackBar,
    private router: Router,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {}

  private convertImage(file: File) {
    const reader = new FileReader();
    reader.onload = (e) => {
      this.imageURL = e.target.result;
    };
    reader.readAsDataURL(file);
  }

  uploadImage({ target }: { target: HTMLInputElement }) {
    if (target.files.length) {
      this.file = target.files[0];
    }
    this.convertImage(this.file);
  }

  async submit(cardId?: string) {
    this.processing = true;
    const formData = this.form.value;
    const cardData: Omit<CreditCard, 'cardId' | 'imageURL'> = {
      name: formData.name,
      point: formData.point,
      pointName: formData.pointName,
      annualFee: formData.annualFee,
      brands: formData.brands,
      miles: formData.miles,
      additionCards: formData.additionCards,
      insurances: formData.insurances,
      electron: formData.electron,
      mobile: formData.mobile,
    };
    const snackBarMessage = cardId ? '編集' : '作成';
    if (cardId) {
      await this.cardService.updateCreditCard(
        {
          ...cardData,
          cardId,
        },
        this.file
      );
    } else {
      await this.cardService.createCreditCard(cardData, this.file);
    }
    this.isComplete = true;
    this.router.navigateByUrl(
      cardId ? `/credit-detail/${cardId}` : '/credit-card'
    );
    this.snackBar.open(`カードを${snackBarMessage}しました`);
    this.processing = false;
  }

  openDeleteCardDialog() {
    this.dialog
      .open(DeleteCardDialogComponent)
      .afterClosed()
      .subscribe((result) => {
        if (result) {
          this.cardService.deletePointCard(this.cardId).then(() => {
            this.router.navigateByUrl(`/credit-card`);
            this.snackBar.open('カードを削除しました');
          });
        } else {
          return;
        }
      });
  }

  @HostListener('window:beforeunload', ['$event'])
  unloadNotification($event: any) {
    if (this.form.dirty) {
      $event.preventDefault();
      $event.returnValue = '作業中の内容が失われますがよろしいですか？';
    }
  }
}
