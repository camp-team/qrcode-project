import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CodeCard } from '@interfaces/code-card';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { CardService } from 'src/app/services/card.service';
import { SearchService } from 'src/app/services/search.service';

@Component({
  selector: 'app-code-card',
  templateUrl: './code-card.component.html',
  styleUrls: ['./code-card.component.scss'],
})
export class CodeCardComponent implements OnInit, OnDestroy {
  codeCards$: Observable<CodeCard[]> = this.cardService.getCodeCards();
  searchQuery: string;
  result: any[];
  filteredCards$: Observable<CodeCard[]>;

  form: FormGroup = this.fb.group({
    firstSelect: [''],
    lastSelect: [''],
  });

  get firstSelectControl() {
    return this.form.get('firstSelect') as FormControl;
  }
  get lastSelectControl() {
    return this.form.get('lastSelect') as FormControl;
  }

  constructor(
    private cardService: CardService,
    private searchService: SearchService,
    private route: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder
  ) {
    this.route.queryParamMap.subscribe((param) => {
      console.log('check');
      this.searchQuery = param.get('searchQuery');
      this.searchService.index.store.search(this.searchQuery).then((result) => {
        const hits: any = result.hits;
        const paramHitsStore = hits.find(
          (hitsStore) => hitsStore.name === this.searchQuery
        );
        if (paramHitsStore) {
          return (this.filteredCards$ = this.codeCards$.pipe(
            map((codeCards) => {
              return codeCards.filter((codeCard) => {
                return codeCard.storeIds.find((id) => id === paramHitsStore.id);
              });
            })
          ));
        } else if (this.searchQuery && !paramHitsStore) {
          return (this.filteredCards$ = of([]));
        } else {
          console.log('ababababababa');
          this.filteredCards$ = this.codeCards$;
          this.searchService.searchControl.setValue('');
        }
      });
    });
  }

  navigate() {
    const formData = this.form.value;
    this.router.navigate(['/compare', 'モバイル決済'], {
      queryParams: {
        cardIds: [formData.firstSelect, formData.lastSelect].join(','),
      },
    });
  }

  ngOnDestroy(): void {
    this.searchService.searchControl.setValue('');
  }

  ngOnInit(): void {}
}
