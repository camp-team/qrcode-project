import {
  Component,
  OnInit,
  Input,
  ViewChild,
  ElementRef,
  Output,
  EventEmitter,
  OnDestroy,
} from '@angular/core';
import { CodeCard } from '@interfaces/code-card';
import { FormGroup, FormControl } from '@angular/forms';
import { Store } from 'src/app/interfaces/store';
import { Observable, Subscription } from 'rxjs';
import { startWith, map } from 'rxjs/operators';
import { StoreService } from 'src/app/services/store.service';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { ElectronCard } from '@interfaces/electron-card';

@Component({
  selector: 'app-shared-form-section',
  templateUrl: './shared-form-section.component.html',
  styleUrls: ['./shared-form-section.component.scss'],
})
export class SharedFormSectionComponent implements OnInit, OnDestroy {
  @Input() card: Observable<CodeCard | ElectronCard>;
  @Input() length: number;
  @Input() form: FormGroup;
  @ViewChild('storeInput') private storeInput: ElementRef;
  @Output() fileChange = new EventEmitter();

  filteredStores$: Observable<Store[]>;
  imageURL: string | ArrayBuffer;
  file: File;
  stores = [];
  allStores: Store[] = this.storeService.store;
  subscription: Subscription;
  chipsInvalid = true;
  fileInvalid = true;

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

  constructor(private storeService: StoreService) {}

  get nameControl() {
    return this.form.get('name') as FormControl;
  }

  ngOnInit(): void {
    this.subscription = this.card?.subscribe((card) => {
      if (card) {
        this.imageURL = card.imageURL;
        this.fileInvalid = false;
      }
    });

    this.filteredStores$ = this.storeIdsControl.valueChanges.pipe(
      startWith(''),
      map((store: string | null) => {
        return store ? this._filter(store) : this.allStores.slice();
      })
    );
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
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
      this.fileInvalid = false;
      this.fileChange.emit(this.file);
    }
    this.convertImage(this.file);
  }

  selected(event: MatAutocompleteSelectedEvent): void {
    this.stores.push(event.option.value);
    this.storeInput.nativeElement.value = '';
    this.storeIdsControl.setValue(null);
    this.chipsInvalid = false;
  }

  removeStore(store: string): void {
    const index = this.stores.indexOf(store);

    if (index >= 0) {
      this.stores.splice(index, 1);
    }
    if (!this.stores.length) {
      this.chipsInvalid = true;
    }
  }
}
