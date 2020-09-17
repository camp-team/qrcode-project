import { Component, OnInit } from '@angular/core';
import { CardService } from 'src/app/services/card.service';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap, map, take } from 'rxjs/operators';
import { Observable } from 'rxjs';

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
  genreList: { id: string; name: string };

  constructor(
    private cardService: CardService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.getCardGenreList();
  }

  private getCardGenreList() {
    this.cardType$.subscribe((cardType) => {
      this.genreList = this.cardService.genreLists.find(
        (list) => list.id === cardType
      );
    });
  }
}
