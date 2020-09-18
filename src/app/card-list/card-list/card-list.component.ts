import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { map, switchMap, take } from 'rxjs/operators';
import { CardService } from 'src/app/services/card.service';

@Component({
  selector: 'app-card-list',
  templateUrl: './card-list.component.html',
  styleUrls: ['./card-list.component.scss'],
})
export class CardListComponent implements OnInit {
  private cardType$: Observable<string> = this.route.paramMap.pipe(
    map((params) => params.get('type'))
  );

  cards$ = this.cardType$.pipe(
    switchMap((type) => {
      return this.cardService.getCardsByType(type).pipe(take(1));
    })
  );
  cardCategory: { type: string; name: string };

  constructor(
    private cardService: CardService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      this.cardCategory = this.cardService.getCardCategory(params.get('type'));
    });
  }
}
