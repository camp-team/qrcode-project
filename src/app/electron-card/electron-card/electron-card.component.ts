import { Component, OnInit } from '@angular/core';
import { CardService } from 'src/app/services/card.service';
import { Observable } from 'rxjs';
import { ElectronCard } from '@interfaces/electron-card';
import { SearchService } from 'src/app/services/search.service';
import { ActivatedRoute } from '@angular/router';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-electron-card',
  templateUrl: './electron-card.component.html',
  styleUrls: ['./electron-card.component.scss'],
})
export class ElectronCardComponent implements OnInit {
  electronCards$: Observable<
    ElectronCard[]
  > = this.cardService.getElectronCards();
  result: any;
  filteredCards$: Observable<ElectronCard[]>;

  constructor(
    private cardService: CardService,
    private searchService: SearchService,
    private router: ActivatedRoute
  ) {
    this.router.queryParamMap.subscribe((param) => {
      const searchQuery: string = param.get('searchQuery');
      this.searchService.index.store.search(searchQuery).then((result) => {
        this.result = result.hits;
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

  ngOnInit(): void {}
}
