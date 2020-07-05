import { Component, OnInit, OnDestroy } from '@angular/core';
import { CardService } from 'src/app/services/card.service';
import { Observable, of } from 'rxjs';
import { CodeCard } from '@interfaces/code-card';
import { SearchService } from 'src/app/services/search.service';
import { ActivatedRoute } from '@angular/router';
import { map, tap } from 'rxjs/operators';
import { StoreService } from 'src/app/services/store.service';
import { RouterService } from 'src/app/services/router.service';

@Component({
  selector: 'app-code-card',
  templateUrl: './code-card.component.html',
  styleUrls: ['./code-card.component.scss'],
})
export class CodeCardComponent implements OnInit, OnDestroy {
  codeCards$: Observable<CodeCard[]> = this.cardService.getCodeCards();
  searchQuery: string;
  result: any[];
  paramHitsStore: any;
  filteredCards$: Observable<CodeCard[]>;
  previousFound: RegExpMatchArray;

  constructor(
    private cardService: CardService,
    private searchService: SearchService,
    private route: ActivatedRoute,
    private storeService: StoreService,
    private routerService: RouterService
  ) {
    this.route.queryParamMap.subscribe((param) => {
      this.searchQuery = param.get('searchQuery');
      this.searchService.index.store.search(this.searchQuery).then((result) => {
        this.result = result.hits;
        this.paramHitsStore = this.result.find(
          (hitsStore) => hitsStore.name === this.searchQuery
        );
        // if (this.routerService.previousUrl) {
        //   this.previousFound = this.routerService.previousUrl.match(
        //     /code-detail/gm
        //   );
        // }
        // if (this.paramHitsStore && !this.previousFound) {
        //   this.storeService.incrementViewCount(this.paramHitsStore);
        // }
        if (this.paramHitsStore) {
          return (this.filteredCards$ = this.codeCards$.pipe(
            map((codeCards) => {
              return codeCards.filter((codeCard) => {
                return codeCard.storeIds.find(
                  (id) => id === this.paramHitsStore.id
                );
              });
            })
          ));
        } else if (this.searchQuery && !this.paramHitsStore) {
          return (this.filteredCards$ = of([]));
        } else {
          this.filteredCards$ = this.codeCards$;
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
