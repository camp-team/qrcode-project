import { Component, OnInit } from '@angular/core';
import { CardService } from 'src/app/services/card.service';
import { Observable } from 'rxjs';
import { CodeCard } from '@interfaces/code-card';
import { SearchService } from 'src/app/services/search.service';
import { ActivatedRoute } from '@angular/router';
import { map, tap } from 'rxjs/operators';

@Component({
  selector: 'app-code-card',
  templateUrl: './code-card.component.html',
  styleUrls: ['./code-card.component.scss'],
})
export class CodeCardComponent implements OnInit {
  codeCards$: Observable<CodeCard[]> = this.cardService.getCodeCards();
  result: any;
  filterCards$: Observable<CodeCard[]>;

  constructor(
    private cardService: CardService,
    private searchService: SearchService,
    private route: ActivatedRoute
  ) {
    this.route.queryParamMap.subscribe((param) => {
      const searchQuery: string = param.get('searchQuery');
      this.searchService.index.store.search(searchQuery).then((result) => {
        this.result = result.hits;
        const resultIds = this.result.map((store) => store.id);
        return (this.filterCards$ = this.codeCards$.pipe(
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

  ngOnInit(): void {}
}
