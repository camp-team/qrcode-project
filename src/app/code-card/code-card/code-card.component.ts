import { Component, OnInit, OnDestroy } from '@angular/core';
import { CardService } from 'src/app/services/card.service';
import { Observable, of } from 'rxjs';
import { CodeCard } from '@interfaces/code-card';
import { SearchService } from 'src/app/services/search.service';
import { ActivatedRoute, Router } from '@angular/router';
import { map, take, switchMap } from 'rxjs/operators';
import { FormControl, FormBuilder, FormGroup } from '@angular/forms';

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
  selectableCards$: Observable<
    CodeCard[]
  > = this.cardService.getCodeCards().pipe(
    map((codeCards) => {
      const formData = this.form.value;
      if (formData.firstSelect) {
        return codeCards.filter(
          (codeCard) => codeCard.cardId !== formData.firstSelect
        );
      } else if (formData.lastSelect) {
        return codeCards.filter(
          (codeCard) => codeCard.cardId !== formData.lastSelect
        );
      }
    })
  );
  firstCards$: Observable<CodeCard[]>;
  lastCards$: Observable<CodeCard[]> = null;

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
      this.searchQuery = param.get('searchQuery');
      this.searchService.index.store.search(this.searchQuery).then((result) => {
        this.result = result.hits;
        const paramHitsStore = this.result.find(
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
          this.filteredCards$ = this.codeCards$;
          this.searchService.searchControl.setValue('');
        }
      });
    });
  }

  navigate() {
    const formData = this.form.value;
    // this.cardService
    //   .getCodeCards()
    //   .pipe(
    //     map((codeCards) => {
    //       if (formData.firstSelect) {
    //         return codeCards.filter(
    //           (codeCard) => codeCard.cardId !== formData.firstSelect
    //         );
    //       } else if (formData.lastSelect) {
    //         return codeCards.filter(
    //           (codeCard) => codeCard.cardId !== formData.lastSelect
    //         );
    //       }
    //     })
    //   )
    //   .subscribe((res) => {
    //     console.log(res);
    //   });

    this.router.navigate(['/compare', 'モバイル決済'], {
      queryParams: {
        cardIds: [formData.firstSelect, formData.lastSelect].join(','),
      },
    });
  }

  ngOnDestroy(): void {
    this.searchService.searchControl.setValue('');
  }

  ngOnInit(): void {
    // this.lastCards$ = this.firstSelectControl.valueChanges.pipe(
    //   switchMap((id) => {
    //     console.log(id);
    //     if (id) {
    //       return this.codeCards$.pipe(
    //         map((codeCards) => {
    //           return codeCards.filter((codeCard) => codeCard.cardId !== id);
    //         })
    //       );
    //     } else {
    //       return null;
    //     }
    //   })
    // );
    this.firstSelectControl.valueChanges.subscribe((id) => {
      this.lastCards$ = this.codeCards$.pipe(
        map((codeCards) => {
          return codeCards.filter((codeCard) => codeCard.cardId !== id);
        })
      );
    });
  }
}
