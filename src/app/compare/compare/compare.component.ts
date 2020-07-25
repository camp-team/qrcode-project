import { Component, OnInit } from '@angular/core';
import { CardService } from 'src/app/services/card.service';
import { Observable, combineLatest } from 'rxjs';
import { CodeCard } from '@interfaces/code-card';
import { Router, ActivatedRoute } from '@angular/router';
import { ElectronCard } from '@interfaces/electron-card';
import { MobileService } from 'src/app/services/mobile.service';
import { map, tap, switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-compare',
  templateUrl: './compare.component.html',
  styleUrls: ['./compare.component.scss'],
})
export class CompareComponent implements OnInit {
  codeCards$: Observable<CodeCard[]>;
  selectedCard$: Observable<CodeCard>;
  comparedCards$: Observable<CodeCard[]>;
  selectedCardIds: string[] = [];

  constructor(
    private cardService: CardService,
    private router: Router,
    private route: ActivatedRoute,
    public mobileService: MobileService
  ) {
    this.codeCards$ = this.route.queryParamMap.pipe(
      switchMap((param) => {
        const cardIds = param.get('cardIds')?.split(',');
        return this.cardService.getCodeCards();
      })
    );

    this.route.queryParamMap.subscribe((param) => {
      const cardIds = param.get('cardIds')?.split(',');
      this.selectedCardIds = cardIds;

      if (cardIds) {
        this.comparedCards$ = combineLatest(
          cardIds.map((id) => this.cardService.getCodeCard(id))
        );
      }
    });
  }

  ngOnInit(): void {}

  navigate(cardId: string, index: number) {
    const sameIdsIndex = this.selectedCardIds.indexOf(cardId);
    if (sameIdsIndex > -1) {
      console.log(sameIdsIndex, 'switcvh');
      const oldCard = this.selectedCardIds[index];
      console.log(index);
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
