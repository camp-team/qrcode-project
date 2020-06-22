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
        console.log(resultIds);
        console.log(resultIds.find((resultId) => resultId === 'naturallawson'));
        return this.codeCards$
          .pipe(
            tap((cards) => {
              const ids = cards.map((card) => card.storeIds);
              console.log(ids[2]);
              const naturallawson = ids[2].find(
                (storeId) => storeId === 'naturallawson'
              );
              console.log(naturallawson);
            }),
            map((codeCards) => {
              return codeCards.filter((codeCard) => {
                return codeCard.storeIds.find((id) =>
                  resultIds.find((resultId) => resultId === id)
                );
              });
            })
          )
          .subscribe((data) => console.log(data));
      });
    });
  }

  ngOnInit(): void {}
}
