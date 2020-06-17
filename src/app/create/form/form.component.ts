import {
  Component,
  OnInit,
  ViewChild,
  ElementRef,
  HostListener,
} from '@angular/core';
import {
  FormBuilder,
  Validators,
  FormControl,
  FormGroup,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CardService } from 'src/app/services/card.service';
import { CodeCard } from '@interfaces/code-card';
import { Store } from 'src/app/interfaces/store';
import { StoreService } from 'src/app/services/store.service';
import { Observable, of } from 'rxjs';
import { map, startWith, switchMap, tap } from 'rxjs/operators';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { MatChipInputEvent } from '@angular/material/chips';
import { MatDialog } from '@angular/material/dialog';
import { DeleteCardDialogComponent } from '../delete-card-dialog/delete-card-dialog.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ElectronCard } from '@interfaces/electron-card';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss'],
})
export class FormComponent implements OnInit {
  isComplete: boolean;

  stores = [];
  allStores: Store[] = this.storeService.store;
  filteredStores$: Observable<Store[]>;

  file: File;
  imageURL: string | ArrayBuffer;

  form: FormGroup;
  type: string;
  cardId: string;
  codeCard: CodeCard;
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

  chargePatterns = ['銀行口座', 'セブン銀行ATM'];
  readonly separatorKeysCodes: number[] = [ENTER, COMMA];

  paymentList = ['前払い', '後払い', '即時払い'];
  creditList = ['VISA', 'MasterCard', 'JCB', 'American Express', 'Diners Club'];
  autoChargePatterns = ['1000円から可能', '1000円単位で可能', '不可'];
  simplePatterns = ['可能', '不可能'];

  get nameControl() {
    return this.form.get('name') as FormControl;
  }
  get pointControl() {
    return this.form.get('point') as FormControl;
  }
  get addPointControl() {
    return this.form.get('addPoint') as FormControl;
  }
  get expirationControl() {
    return this.form.get('expiration') as FormControl;
  }
  get storeIdsControl() {
    return this.form.get('storeIds') as FormControl;
  }
  get paymentControl() {
    return this.form.get('payment') as FormControl;
  }
  get creditControl() {
    return this.form.get('availableCredit') as FormControl;
  }

  @ViewChild('storeInput') private storeInput: ElementRef;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private cardService: CardService,
    private storeService: StoreService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar,
    private router: Router
  ) {
    this.route.queryParamMap
      .pipe(
        tap((params) => {
          this.type = params.get('type');
          this.buildForm(this.type);
        }),
        switchMap((params) => {
          this.cardId = params.get('id');
          if (this.cardId) {
            switch (this.type) {
              case 'qrCode':
                return this.cardService.getCodeCard(this.cardId);
              case 'electron':
                return this.cardService.getElectronCard(this.cardId);
            }
          } else {
            return of(null);
          }
        })
      )
      .subscribe((card) => {
        if (card) {
          this.initForm(card);
        } else {
          return;
        }
      });

    this.filteredStores$ = this.storeIdsControl.valueChanges.pipe(
      startWith(''),
      map((store: string | null) => {
        return store ? this._filter(store) : this.allStores.slice();
      })
    );
  }

  ngOnInit(): void {}

  @HostListener('window:beforeunload', ['$event'])
  unloadNotification($event: any) {
    if (this.form.dirty) {
      $event.preventDefault();
      $event.returnValue = '作業中の内容が失われますがよろしいですか？';
    }
  }

  uploadImage(event) {
    if (event.target.files.length) {
      this.file = event.target.files[0];
    }
    this.convertImage(this.file);
  }

  convertImage(file: File) {
    const reader = new FileReader();
    reader.onload = (e) => {
      this.imageURL = e.target.result;
    };
    reader.readAsDataURL(file);
  }

  private initForm(card: CodeCard | ElectronCard) {
    this.imageURL = card.imageURL;
    this.chargePatterns = card.charge;
    this.stores = card.storeIds.map((id) => {
      return this.storeService.store.find((store) => {
        return store.id === id;
      });
    });
    this.form.patchValue({
      ...card,
      charge: null,
    });
  }

  buildForm(type) {
    this.form = this.fb.group({
      name: ['', [Validators.required, Validators.maxLength(20)]],
      point: ['', Validators.maxLength(5)],
      addPoint: ['', Validators.maxLength(1000)],
      expiration: ['', [Validators.required, Validators.maxLength(1000)]],
      storeIds: [''],
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
              storeIds: this.stores.map((store) => store.id),
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
              storeIds: this.stores.map((store) => store.id),
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

  private _filter(value: string): Store[] {
    return this.allStores.filter((store) => store.name.indexOf(value) === 0);
  }

  selected(event: MatAutocompleteSelectedEvent): void {
    this.stores.push(event.option.value);
    this.storeInput.nativeElement.value = '';
    this.storeIdsControl.setValue(null);
  }

  removeStore(store: string): void {
    const index = this.stores.indexOf(store);

    if (index >= 0) {
      this.stores.splice(index, 1);
    }
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
