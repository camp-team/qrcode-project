import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BasicCard } from '@interfaces/card';
import { CodeCard } from '@interfaces/code-card';
import { CreditCard } from '@interfaces/credit-card';
import { ElectronCard } from '@interfaces/electron-card';
import { combineLatest, Observable } from 'rxjs';
import { map, switchMap, take } from 'rxjs/operators';
import { CardService } from 'src/app/services/card.service';
import { MobileService } from 'src/app/services/mobile.service';

@Component({
  selector: 'app-compare',
  templateUrl: './compare.component.html',
  styleUrls: ['./compare.component.scss'],
})
export class CompareComponent implements OnInit {
  private cardType$: Observable<string> = this.route.paramMap.pipe(
    map((params) => params.get('type'))
  );
  cardsOption$: Observable<
    Partial<CodeCard & ElectronCard & CreditCard & BasicCard>[]
  > = this.cardType$.pipe(
    switchMap((type) => {
      return this.cardService.getCardsByType(type).pipe(take(1));
    })
  );
  selectedCardIds: string[] = [];

  genreList: { id: string; name: string };
  selectedCards$: Observable<
    Partial<CodeCard & ElectronCard & CreditCard & BasicCard>[]
  >;

  constructor(
    private cardService: CardService,
    private router: Router,
    private route: ActivatedRoute,
    public mobileService: MobileService
  ) {}

  ngOnInit(): void {
    this.getCardGenreList();
    this.initCards();
  }

  private getCardGenreList() {
    this.cardType$.subscribe((cardType) => {
      this.genreList = this.cardService.genreLists.find(
        (list) => list.id === cardType
      );
    });
  }

  private initCards() {
    this.route.queryParamMap.subscribe((param) => {
      const cardIds = param.get('cardIds')?.split(',');
      if (this.mobileService.isMobile) {
        cardIds.splice(2, 1);
      }
      this.selectedCardIds = cardIds;

      if (cardIds) {
        this.selectedCards$ = combineLatest(
          cardIds.map((cardId) => {
            return this.cardService.getCard(this.genreList.id, cardId);
          })
        );
      }
    });
  }

  compareCards(cardId: string, index: number) {
    const sameIdsIndex = this.selectedCardIds.indexOf(cardId);
    if (sameIdsIndex > -1) {
      const oldCard = this.selectedCardIds[index];
      this.selectedCardIds[sameIdsIndex] = oldCard;
      this.selectedCardIds[index] = cardId;
    } else {
      this.selectedCardIds[index] = cardId;
    }

    this.router.navigate([], {
      queryParamsHandling: 'merge',
      queryParams: {
        cardIds: this.selectedCardIds.join(','),
      },
    });
  }
}
