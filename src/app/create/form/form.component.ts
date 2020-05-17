import { Store } from './../../interfaces/store';
import { StoreService } from './../../services/store.service';
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
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { MatChipInputEvent } from '@angular/material/chips';
import { startWith, map } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss'],
})
export class FormComponent implements OnInit {
  @ViewChild('storeInput') private storeInput: ElementRef;

  allStores = this.storeService.realStore;
  filterdStores$: Observable<Store[]>;
  form: FormGroup;
  selectedStores = [];
  type;
  customForm = {
    qrCode: {
      charge: ['', Validators.required],
      autoCharge: ['', Validators.required],
      availableCredit: ['', Validators.required],
      pushMoney: ['', Validators.required],
      pullMoney: ['', Validators.required],
    },
  };

  chargePatterns = ['1000円から可能', '1000円単位で可能', '不可'];
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

    this.filterdStores$ = this.storeIdsControl.valueChanges.pipe(
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
      storeImage: [''],
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
      storeIds: this.selectedStores.map((store) => store.id),
      charge: formData.charge,
      autoCharge: formData.autoCharge,
      availableCredit: formData.availableCredit,
      pushMoney: formData.pushMoney,
      pullMoney: formData.pullMoney,
    });
  }

  remove(store) {
    const index = this.selectedStores.indexOf(store);

    if (index >= 0) {
      this.selectedStores.splice(index, 1);
    }
  }

  selected(event: MatAutocompleteSelectedEvent): void {
    this.selectedStores.push(event.option.value);
    this.storeIdsControl.setValue(null);
    this.storeInput.nativeElement.value = '';
  }

  private _filter(value: string): Store[] {
    return this.allStores.filter((store) => store.name.indexOf(value) === 0);
  }
}
