import {
  Component,
  OnInit,
  Input,
  ViewChild,
  ElementRef,
  Output,
  EventEmitter,
} from '@angular/core';
import { CodeCard } from '@interfaces/code-card';
import { FormGroup, FormControl } from '@angular/forms';
import { Store } from 'src/app/interfaces/store';
import { Observable } from 'rxjs';
import { startWith, map } from 'rxjs/operators';
import { StoreService } from 'src/app/services/store.service';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { CardService } from 'src/app/services/card.service';

@Component({
  selector: 'app-shared-form-section',
  templateUrl: './shared-form-section.component.html',
  styleUrls: ['./shared-form-section.component.scss'],
})
export class SharedFormSectionComponent implements OnInit {
  @Input() card: CodeCard;
  @Input() cardId: string;
  @Input() form: FormGroup;
  @ViewChild('storeInput') private storeInput: ElementRef;
  @Output() fileChange = new EventEmitter();

  filteredStores$: Observable<Store[]>;
  imageURL: string | ArrayBuffer;
  file: File;
  stores = [];
  allStores: Store[] = this.storeService.store;

  get storeIdsControl() {
    return this.form?.get('storeIds') as FormControl;
  }

  get expirationControl() {
    return this.form?.get('expiration') as FormControl;
  }

  get pointControl() {
    return this.form?.get('point') as FormControl;
  }

  get addPointControl() {
    return this.form?.get('addPoint') as FormControl;
  }

  get campaignControl() {
    return this.form?.get('campaign') as FormControl;
  }

  private _filter(value: string): Store[] {
    return this.allStores.filter((store) => store.name.indexOf(value) === 0);
  }

  constructor(
    private storeService: StoreService,
    private cardService: CardService
  ) {}

  get nameControl() {
    return this.form.get('name') as FormControl;
  }

  ngOnInit(): void {
    this.imageURL = this.card?.imageURL;

    this.filteredStores$ = this.storeIdsControl.valueChanges.pipe(
      startWith(''),
      map((store: string | null) => {
        return store ? this._filter(store) : this.allStores.slice();
      })
    );
  }

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
      this.fileChange.emit(this.file);
    }
    this.convertImage(this.file);
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
}
