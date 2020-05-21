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
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { MatChipInputEvent } from '@angular/material/chips';

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
  type;
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
    this.route.queryParamMap.subscribe((map) => {
      this.type = map.get('type');
      this.buildForm(this.type);
    });
    this.filteredStores$ = this.storeIdsControl.valueChanges.pipe(
      startWith(null),
      map((store: string | null) => {
        return store ? this._filter(store) : this.allStores.slice();
      })
    );
  }

  ngOnInit(): void {}

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
      iamge: formData.image,
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
  }
}
