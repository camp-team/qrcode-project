import { Component, OnInit } from '@angular/core';
import { CardService } from 'src/app/services/card.service';
import { Observable } from 'rxjs';
import { CodeCard } from '@interfaces/code-card';
import { Router, ActivatedRoute } from '@angular/router';
import { ElectronCard } from '@interfaces/electron-card';
import { MobileService } from 'src/app/services/mobile.service';

@Component({
  selector: 'app-compare',
  templateUrl: './compare.component.html',
  styleUrls: ['./compare.component.scss'],
})
export class CompareComponent implements OnInit {
  cardId1: string;
  cardId2: string;
  cardId3: string;
  codeCards$: Observable<CodeCard[]> = this.cardService.getCodeCards();
  selectedCard$: Observable<CodeCard>;
  selectedCards$: Observable<CodeCard>[] = [];
  isMobile$: Observable<boolean> = this.mobileService.isMobile$;

  indexes: number[];

  constructor(
    private cardService: CardService,
    private router: Router,
    private route: ActivatedRoute,
    private mobileService: MobileService
  ) {
    this.isMobile$.subscribe((isMobile) => {
      if (isMobile) {
        this.indexes = [...Array(2)].map((_, i) => i);
      } else {
        this.indexes = [...Array(3)].map((_, i) => i);
      }
    });

    this.route.queryParamMap.subscribe((param) => {
      this.cardId1 = param.get('cardId1');
      this.cardId2 = param.get('cardId2');
      this.cardId3 = param.get('cardId3');
      this.selectedCards$[0] = this.cardService.getCodeCard(this.cardId1);
      this.selectedCards$[1] = this.cardService.getCodeCard(this.cardId2);
      this.selectedCards$[2] = this.cardService.getCodeCard(this.cardId3);
    });
  }

  ngOnInit(): void {}

  navigate(cardId: string, index: number) {
    console.log(index);
    switch (index) {
      case 0:
        this.cardId1 = cardId;
        break;
      case 1:
        this.cardId2 = cardId;
        break;
      case 2:
        this.cardId3 = cardId;
        break;
    }
    this.router.navigate([], {
      queryParamsHandling: 'merge',
      queryParams: {
        cardId1: this.cardId1,
        cardId2: this.cardId2,
        cardId3: this.cardId3,
      },
    });
  }
}
