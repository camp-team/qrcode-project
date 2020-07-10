import { Component, OnInit, OnDestroy } from '@angular/core';
import { CardService } from 'src/app/services/card.service';
import { Observable, of } from 'rxjs';
import { ElectronCard } from '@interfaces/electron-card';
import { SearchService } from 'src/app/services/search.service';
import { ActivatedRoute } from '@angular/router';
import { map } from 'rxjs/operators';
import { StoreService } from 'src/app/services/store.service';

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
  constructor(
    private cardService: CardService,
    private searchService: SearchService,
    private router: ActivatedRoute
  ) {
    this.router.queryParamMap.subscribe((param) => {
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
  ngOnDestroy(): void {
    this.searchService.searchControl.setValue('');
  }

  ngOnInit(): void {}
}
