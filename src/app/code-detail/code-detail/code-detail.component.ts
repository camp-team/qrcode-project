import { Component, OnInit } from '@angular/core';
import { CardService } from 'src/app/services/card.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { CodeCard } from '@interfaces/code-card';
import { StoreService } from 'src/app/services/store.service';

@Component({
  selector: 'app-code-detail',
  templateUrl: './code-detail.component.html',
  styleUrls: ['./code-detail.component.scss'],
})
export class CodeDetailComponent implements OnInit {
  cardId: string;
  searchQuery: string;

  codeCard$: Observable<CodeCard> = this.route.paramMap.pipe(
    switchMap((map) => {
      this.cardId = map.get('id');
      return this.cardService.getCodeCard(this.cardId);
    })
  );

  constructor(
    private cardService: CardService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.route.queryParamMap.subscribe((param) => {
      this.searchQuery = param.get('searchQuery');
      if (this.searchQuery) {
        this.router.navigate(['/code-card'], {
          queryParams: { searchQuery: this.searchQuery },
        });
      }
    });
  }

  ngOnInit(): void {}
}
