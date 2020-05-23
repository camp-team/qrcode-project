import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import {
  FormBuilder,
  Validators,
  FormControl,
  FormGroup,
} from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { CardService } from 'src/app/services/card.service';
import { CodeCard } from 'src/app/interfaces/code-card';
import { Store } from 'src/app/interfaces/store';
import { StoreService } from 'src/app/services/store.service';
import { Observable, of } from 'rxjs';
import { map, startWith, switchMap, tap } from 'rxjs/operators';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { MatChipInputEvent } from '@angular/material/chips';
import { Card } from 'src/app/interfaces/card';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss'],
})
export class FormComponent implements OnInit {
  stores = [];
  allStores: Store[] = this.storeService.store;
  filteredStores$: Observable<Store[]>;

  form: FormGroup;
  type: string;
  cardId: string;
  customForm = {
    qrCode: {
      charge: [''],
      autoCharge: ['', Validators.required],
      availableCredit: ['', Validators.required],
      pushMoney: ['', Validators.required],
      pullMoney: ['', Validators.required],
    },
  };

  chargePatterns = ['銀行口座', 'セブン銀行ATM'];
  readonly separatorKeysCodes: number[] = [ENTER, COMMA];

  autoChargePatterns = ['1000円から可能', '1000円単位で可能', '不可'];
  simplePatterns = ['可能', '不可能'];

  get nameControl() {
    return this.form.get('name') as FormControl;
  }

  get imageControl() {
    return this.form.get('image') as FormControl;
  }

  get storeIdsControl() {
    return this.form.get('storeIds') as FormControl;
  }

  @ViewChild('storeInput') private storeInput: ElementRef;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private cardService: CardService,
    private storeService: StoreService
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
            return this.cardService.getCodeCard(this.cardId);
          } else {
            return of(null);
          }
        })
      )
      .subscribe((card) => {
        this.initForm(card);
      });

    this.filteredStores$ = this.storeIdsControl.valueChanges.pipe(
      startWith(''),
      map((store: string | null) => {
        return store ? this._filter(store) : this.allStores.slice();
      })
    );
  }

  ngOnInit(): void {
    console.log(this.cardId);
  }

  private initForm(card: CodeCard) {
    this.chargePatterns = card.charge;
    this.stores = card.storeIds;
    this.form.patchValue({
      ...card,
      charge: null,
    });
  }

  buildForm(type) {
    this.form = this.fb.group({
      name: ['', [Validators.required, Validators.maxLength(20)]],
      image: ['', Validators.required],
      point: ['', Validators.maxLength(5)],
      addPoint: [''],
      expiration: ['', Validators.required],
      storeIds: [''],
      ...this.customForm[type],
    });
  }

  submit() {
    const formData = this.form.value;
    this.cardService.createCodeCard({
      name: formData.name,
      image: formData.image,
      point: formData.point,
      addPoint: formData.addPoint,
      expiration: formData.expiration,
      storeIds: this.stores.map((store) => store.id),
      charge: this.chargePatterns,
      autoCharge: formData.autoCharge,
      availableCredit: formData.availableCredit,
      pushMoney: formData.pushMoney,
      pullMoney: formData.pullMoney,
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
