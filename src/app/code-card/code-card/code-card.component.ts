import { Component, OnInit, OnDestroy } from '@angular/core';
import { CardService } from 'src/app/services/card.service';
import { Observable } from 'rxjs';
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
        const paramHitsStore = this.result.find(
          (hitsStore) => hitsStore.name === this.searchQuery
        );
        if (this.routerService.previousUrl) {
          this.previousFound = this.routerService.previousUrl.match(
            /code-detail/gm
          );
        }
        if (paramHitsStore && !this.previousFound) {
          this.storeService.incrementViewCount(paramHitsStore);
        }
        const resultIds = this.result.map((store) => store.id);
        return (this.filteredCards$ = this.codeCards$.pipe(
          map((codeCards) => {
            return codeCards.filter((codeCard) => {
              return codeCard.storeIds.find((id) =>
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
