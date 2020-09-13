import { Component, OnInit } from '@angular/core';
import { CardService } from 'src/app/services/card.service';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  genreLists = [
    { id: 'code', name: 'モバイル決済' },
    { id: 'electron', name: '電子マネー' },
    { id: 'credit', name: 'クレジットカード' },
    { id: 'point', name: 'ポイントカード' },
  ];

  cardsGroup;

  constructor(private cardService: CardService) {}

  ngOnInit(): void {
    Promise.all(
      this.genreLists.map((list) => {
        return this.cardService
          .getCardsByType(list.id)
          .pipe(take(1))
          .toPromise();
      })
    ).then((cardsGroup) => {
      this.cardsGroup = cardsGroup;
    });
  }
}
