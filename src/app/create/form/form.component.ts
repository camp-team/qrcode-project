import { COMMA, ENTER } from '@angular/cdk/keycodes';
import {
  Component,
  HostListener,
  OnInit,
  ViewChild,
  OnDestroy,
} from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { MatChipInputEvent } from '@angular/material/chips';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { CodeCard } from '@interfaces/code-card';
import { ElectronCard } from '@interfaces/electron-card';
import { Observable, of, Subscription } from 'rxjs';
import { map, switchMap, tap } from 'rxjs/operators';
import { CardService } from 'src/app/services/card.service';
import { StoreService } from 'src/app/services/store.service';
import { DeleteCardDialogComponent } from '../delete-card-dialog/delete-card-dialog.component';
import { SharedFormSectionComponent } from '../shared-form-section/shared-form-section.component';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss'],
})
export class FormComponent implements OnInit, OnDestroy {
  @ViewChild(SharedFormSectionComponent)
  private sharedFormComponent: SharedFormSectionComponent;
  subscription: Subscription;
  isComplete: boolean;
  isInit: boolean;
  maxLength = 1000;

  file;
  stores = [];

  form: FormGroup;
  type: string;
  cardId: string;
  customForm = {
    qrCode: {
      payment: [[''], Validators.required],
      charge: [''],
      autoCharge: ['', Validators.required],
      availableCredit: [[''], Validators.required],
      pushMoney: ['', Validators.required],
      pullMoney: ['', Validators.required],
    },
    electron: {
      payment: [[''], Validators.required],
      charge: [''],
      autoCharge: ['', Validators.required],
      availableCredit: [[''], Validators.required],
    },
  };

  cardId$: Observable<string> = this.route.queryParamMap.pipe(
    map((params) => params.get('id'))
  );
  card$: Observable<CodeCard | ElectronCard> = this.cardId$.pipe(
    switchMap((cardId) => {
      switch (this.type) {
        case 'qrCode':
          return this.cardService.getCodeCard(cardId);
        case 'electron':
          return this.cardService.getElectronCard(cardId);
        default:
          return of(null);
      }
    })
  );
  chargePatterns = ['銀行口座', 'セブン銀行ATM'];
  readonly separatorKeysCodes: number[] = [ENTER, COMMA];

  paymentList = ['前払い', '後払い', '即時払い'];
  creditList = ['VISA', 'MasterCard', 'JCB', 'American Express', 'Diners Club'];
  autoChargePatterns = ['1000円から可能', '1000円単位で可能', '不可'];
  simplePatterns = ['可能', '不可能'];

  get paymentControl() {
    return this.form.get('payment') as FormControl;
  }
  get creditControl() {
    return this.form.get('availableCredit') as FormControl;
  }

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private cardService: CardService,
    private storeService: StoreService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar,
    private router: Router
  ) {
    this.route.queryParamMap.subscribe((params) => {
      this.type = params.get('type');
      this.buildForm(this.type);
    });
  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  ngOnInit(): void {
    this.subscription = this.card$.subscribe((card) => {
      if (card) {
        this.initForm(card);
      }
    });
    this.cardId$.subscribe((cardId) => (this.cardId = cardId));
  }

  @HostListener('window:beforeunload', ['$event'])
  unloadNotification($event: any) {
    if (this.form.dirty) {
      $event.preventDefault();
      $event.returnValue = '作業中の内容が失われますがよろしいですか？';
    }
  }

  private initForm(card: CodeCard | ElectronCard) {
    this.chargePatterns = card.charge;
    this.sharedFormComponent.stores = card.storeIds.map((id) => {
      return this.storeService.store.find((store) => {
        return store.id === id;
      });
    });
    this.form.patchValue({
      ...card,
      charge: null,
    });
  }

  private buildForm(type: string) {
    this.form = this.fb.group({
      name: ['', [Validators.required, Validators.maxLength(20)]],
      point: ['', Validators.maxLength(5)],
      addPoint: ['', Validators.maxLength(this.maxLength)],
      expiration: [
        '',
        [Validators.required, Validators.maxLength(this.maxLength)],
      ],
      storeIds: [''],
      campaign: ['', [Validators.required]],
      ...this.customForm[type],
    });
  }

  submit(type: string) {
    const formData = this.form.value;
    switch (type) {
      case 'qrCode':
        this.cardService
          .createCodeCard(
            {
              name: formData.name,
              point: formData.point,
              addPoint: formData.addPoint,
              expiration: formData.expiration,
              storeIds: this.sharedFormComponent.stores.map(
                (store) => store.id
              ),
              campaign: formData.campaign,
              payment: formData.payment,
              charge: this.chargePatterns,
              autoCharge: formData.autoCharge,
              availableCredit: formData.availableCredit,
              pushMoney: formData.pushMoney,
              pullMoney: formData.pullMoney,
            },
            this.file
          )
          .then(() => {
            this.isComplete = true;
            this.router.navigateByUrl('/code-card');
            this.snackBar.open('カードを作成しました', null, {
              duration: 2000,
            });
          });
        break;
      case 'electron':
        this.cardService
          .createElectornCard(
            {
              name: formData.name,
              point: formData.point,
              addPoint: formData.addPoint,
              expiration: formData.expiration,
              storeIds: this.stores.map((store) => store.id),
              campaign: formData.campaign,
              payment: formData.payment,
              charge: this.chargePatterns,
              autoCharge: formData.autoCharge,
              availableCredit: formData.availableCredit,
            },
            this.file
          )
          .then(() => {
            this.isComplete = true;
            this.router.navigateByUrl('/electron-card');
            this.snackBar.open('カードを作成しました', null, {
              duration: 2000,
            });
          });
        break;
    }
  }

  updateCard(type: string) {
    const formData = this.form.value;
    switch (type) {
      case 'qrCode':
        this.cardService
          .updateCodeCard(
            {
              name: formData.name,
              point: formData.point,
              addPoint: formData.addPoint,
              expiration: formData.expiration,
              storeIds: this.sharedFormComponent.stores.map(
                (store) => store.id
              ),
              campaign: formData.campaign,
              payment: formData.payment,
              charge: this.chargePatterns,
              autoCharge: formData.autoCharge,
              availableCredit: formData.availableCredit,
              pushMoney: formData.pushMoney,
              pullMoney: formData.pullMoney,
              cardId: this.cardId,
            },
            this.file
          )
          .then(() => {
            this.isComplete = true;
            this.router.navigateByUrl(`/code-detail/${this.cardId}`);
            this.snackBar.open('カードを編集しました', null, {
              duration: 2000,
            });
          });
        break;
      case 'electron':
        this.cardService
          .updateElectronCard(
            {
              name: formData.name,
              point: formData.point,
              addPoint: formData.addPoint,
              expiration: formData.expiration,
              storeIds: this.stores.map((store) => store.id),
              campaign: formData.campaign,
              payment: formData.payment,
              charge: this.chargePatterns,
              autoCharge: formData.autoCharge,
              availableCredit: formData.availableCredit,
              cardId: this.cardId,
            },
            this.file
          )
          .then(() => {
            this.isComplete = true;
            this.router.navigateByUrl(`/electron-detail/${this.cardId}`);
            this.snackBar.open(`カードを編集しました`, null, {
              duration: 2000,
            });
          });
        break;
    }
  }

  deleteCard(type: string) {
    switch (type) {
      case 'qrCode':
        return this.cardService.deleteCodeCard(this.cardId);
      case 'electron':
        return this.cardService.deleteElectronCard(this.cardId);
    }
  }

  openDeleteCardDialog() {
    this.dialog
      .open(DeleteCardDialogComponent)
      .afterClosed()
      .subscribe((result) => {
        if (result) {
          this.deleteCard(this.type).then(() => {
            this.router.navigateByUrl('/code-card');
            this.snackBar.open('カードを削除しました', null, {
              duration: 2000,
            });
          });
        } else {
          return;
        }
      });
  }

  add(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;

    if ((value || '').trim()) {
      this.chargePatterns.push(value.trim());
    }

    if (input) {
      input.value = '';
    }
  }

  remove(chargePattern: string): void {
    const index = this.chargePatterns.indexOf(chargePattern);

    if (index >= 0) {
      this.chargePatterns.splice(index, 1);
    }

    if (this.chargePatterns.length) {
      this.form.get('charge').setErrors({
        required: true,
      });
    }
  }
}
