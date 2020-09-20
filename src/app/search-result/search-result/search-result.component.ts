import { Component, OnInit, OnDestroy } from '@angular/core';
import { CardService } from 'src/app/services/card.service';
import { SearchService } from 'src/app/services/search.service';
import { ActivatedRoute } from '@angular/router';
import { take } from 'rxjs/operators';
import { BasicCard } from '@interfaces/card';
import { CodeCard } from '@interfaces/code-card';
import { ElectronCard } from '@interfaces/electron-card';
import { CreditCard } from '@interfaces/credit-card';

@Component({
  selector: 'app-search-result',
  templateUrl: './search-result.component.html',
  styleUrls: ['./search-result.component.scss'],
})
export class SearchResultComponent implements OnInit, OnDestroy {
  cardCategory: { type: string; name: string };
  searchQuery: string;
  hitCards: Partial<CodeCard & ElectronCard & CreditCard & BasicCard>[];

  constructor(
    private cardService: CardService,
    private searchService: SearchService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      this.cardCategory = this.cardService.getCardCategory(params.get('type'));
    });
    this.getHitCards(this.cardCategory.type);
  }

  ngOnDestroy(): void {
    this.searchService.searchControl.setValue('');
  }

  private getHitCards(type: string) {
    this.route.queryParamMap.subscribe((params) => {
      this.searchQuery = params.get('searchQuery');
      this.searchService.index.store
        .search(this.searchQuery)
        .then(async (result) => {
          const hits: any[] = result.hits;
          const hitStore = hits.find((hit) => hit.name === this.searchQuery);
          if (hitStore) {
            const allCards = await this.cardService
              .getCardsByType(type)
              .pipe(take(1))
              .toPromise();
            this.hitCards = allCards.filter((card) => {
              return card.storeIds.find((storeId) => storeId === hitStore.id);
            });
            return this.hitCards;
          } else if (this.searchQuery && !hitStore) {
            this.hitCards = [];
          }
        });
    });
  }
}
