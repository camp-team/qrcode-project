import { Component, OnInit } from '@angular/core';
import { CardService } from 'src/app/services/card.service';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { CodeCard } from 'src/app/interfaces/code-card';

@Component({
  selector: 'app-code-detail',
  templateUrl: './code-detail.component.html',
  styleUrls: ['./code-detail.component.scss'],
})
export class CodeDetailComponent implements OnInit {
  cardId: string;
  codeCard$: Observable<CodeCard> = this.route.paramMap.pipe(
    switchMap((map) => {
      this.cardId = map.get('id');
      return this.cardService.getCodeCard(this.cardId);
    })
  );

  constructor(
    private cardService: CardService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {}
}
