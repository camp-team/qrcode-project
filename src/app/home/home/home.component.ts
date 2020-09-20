import { Component, OnInit } from '@angular/core';
import { CardService } from 'src/app/services/card.service';
import { take } from 'rxjs/operators';
import { CodeCard } from '@interfaces/code-card';
import { BasicCard } from '@interfaces/card';
import { ElectronCard } from '@interfaces/electron-card';
import { CreditCard } from '@interfaces/credit-card';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  cardCategories: { type: string; name: string }[] = this.cardService
    .cardCategories;
  cardsGroup: Partial<CodeCard & ElectronCard & CreditCard & BasicCard>[][];

  constructor(private cardService: CardService) {}

  ngOnInit(): void {
    Promise.all(
      this.cardCategories.map((list) => {
        return this.cardService
          .getCardsByType(list.type)
          .pipe(take(1))
          .toPromise();
      })
    ).then((cardsGroup) => {
      this.cardsGroup = cardsGroup;
    });
  }
}
