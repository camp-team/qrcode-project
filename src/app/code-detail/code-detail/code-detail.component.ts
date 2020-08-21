import { Component, OnInit, OnDestroy } from '@angular/core';
import { CardService } from 'src/app/services/card.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { switchMap, tap } from 'rxjs/operators';
import { CodeCard } from '@interfaces/code-card';
import { RouterService } from 'src/app/services/router.service';

@Component({
  selector: 'app-code-detail',
  templateUrl: './code-detail.component.html',
  styleUrls: ['./code-detail.component.scss'],
})
export class CodeDetailComponent implements OnInit, OnDestroy {
  cardId: string;
  searchQuery: string;

  codeCard$: Observable<CodeCard> = this.route.paramMap.pipe(
    switchMap((map) => {
      this.cardId = map.get('id');
      this.cardService.countUpCodeCard(this.cardId);
      return this.cardService.getCodeCard(this.cardId);
    })
    // tap((card) => this.cardService.countUpCodeCard(card.cardId))
  );

  constructor(
    private cardService: CardService,
    private route: ActivatedRoute,
    private router: Router,
    private routerService: RouterService
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
  ngOnDestroy(): void {
    this.routerService.toggleSticky();
  }

  ngOnInit(): void {}
}
