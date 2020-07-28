import { Component, OnInit, OnDestroy } from '@angular/core';
import { CardService } from 'src/app/services/card.service';
import { Observable, of } from 'rxjs';
import { ElectronCard } from '@interfaces/electron-card';
import { SearchService } from 'src/app/services/search.service';
import { ActivatedRoute, Router } from '@angular/router';
import { map, switchMap } from 'rxjs/operators';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';

@Component({
  selector: 'app-electron-card',
  templateUrl: './electron-card.component.html',
  styleUrls: ['./electron-card.component.scss'],
})
export class ElectronCardComponent implements OnInit, OnDestroy {
  electronCards$: Observable<
    ElectronCard[]
  > = this.cardService.getElectronCards();
  result: any[];
  filteredCards$: Observable<ElectronCard[]>;
  searchQuery: string;
  form: FormGroup = this.fb.group({
    firstSelect: [''],
    lastSelect: [''],
  });
  firstChoices$: Observable<ElectronCard[]>;
  lastChoices$: Observable<ElectronCard[]>;

  get firstSelectControl() {
    return this.form.get('firstSelect') as FormControl;
  }
  get lastSelectControl() {
    return this.form.get('lastSelect') as FormControl;
  }

  constructor(
    private cardService: CardService,
    private searchService: SearchService,
    private route: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder
  ) {
    this.route.queryParamMap.subscribe((param) => {
      this.searchQuery = param.get('searchQuery');
      this.searchService.index.store.search(this.searchQuery).then((result) => {
        this.result = result.hits;
        const paramHitsStore = this.result.find(
          (hitsStore) => hitsStore.name === this.searchQuery
        );
        if (paramHitsStore) {
          return (this.filteredCards$ = this.electronCards$.pipe(
            map((electronCards) => {
              return electronCards.filter((electronCard) => {
                return electronCard.storeIds.find(
                  (id) => id === paramHitsStore.id
                );
              });
            })
          ));
        } else if (this.searchQuery && !paramHitsStore) {
          return (this.filteredCards$ = of([]));
        } else {
          this.filteredCards$ = this.electronCards$;
          this.searchService.searchControl.setValue('');
        }
      });
    });
  }

  navigate() {
    const formData = this.form.value;
    this.router.navigate(['/compare', '電子マネー'], {
      queryParams: {
        cardIds: [formData.firstSelect, formData.lastSelect].join(','),
      },
    });
  }

  ngOnDestroy(): void {
    this.searchService.searchControl.setValue('');
  }

  ngOnInit(): void {
    this.lastSelectControl.valueChanges.subscribe((id) => {
      this.firstChoices$ = this.electronCards$.pipe(
        map((electronCards) => {
          return electronCards.filter(
            (electronCard) => electronCard.cardId !== id
          );
        })
      );
    });
    this.firstSelectControl.valueChanges.subscribe((id) => {
      this.lastChoices$ = this.electronCards$.pipe(
        map((electronCards) => {
          return electronCards.filter(
            (electronCard) => electronCard.cardId !== id
          );
        })
      );
    });
  }
}
