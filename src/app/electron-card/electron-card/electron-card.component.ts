import { Component, OnInit, OnDestroy } from '@angular/core';
import { CardService } from 'src/app/services/card.service';
import { Observable } from 'rxjs';
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
    private router: ActivatedRoute,
    private storeSerice: StoreService
  ) {
    this.router.queryParamMap.subscribe((param) => {
      this.searchQuery = param.get('searchQuery');
      this.searchService.index.store.search(this.searchQuery).then((result) => {
        this.result = result.hits;
        const paramHitsStore = this.result.find(
          (hitsStore) => hitsStore.name === this.searchQuery
        );
        if (paramHitsStore) {
          // this.storeSerice.incrementViewCount(paramHitsStore);
        }
        const resultIds: string[] = this.result.map((store) => store.id);
        return (this.filteredCards$ = this.electronCards$.pipe(
          map((electronCards) => {
            return electronCards.filter((electronCard) => {
              return electronCard.storeIds.find((id) =>
                resultIds.find((resultId) => resultId === id)
              );
            });
          })
        ));
      });
    });
  }
  ngOnDestroy(): void {
    this.searchService.searchControl.setValue('');
  }

  ngOnInit(): void {}
}
