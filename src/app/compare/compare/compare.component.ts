import { Component, OnInit } from '@angular/core';
import { CardService } from 'src/app/services/card.service';
import { Observable } from 'rxjs';
import { CodeCard } from '@interfaces/code-card';
import { Router } from '@angular/router';

@Component({
  selector: 'app-compare',
  templateUrl: './compare.component.html',
  styleUrls: ['./compare.component.scss'],
})
export class CompareComponent implements OnInit {
  codeCards$: Observable<CodeCard[]> = this.cardService.getCodeCards();

  constructor(private cardService: CardService, private router: Router) {}

  ngOnInit(): void {}

  navigate(cardId: string) {
    this.router.navigate([], {
      queryParamsHandling: 'merge',
      queryParams: {
        cardId,
      },
    });
  }
}
