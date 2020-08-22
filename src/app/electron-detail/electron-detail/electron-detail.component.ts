import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CardService } from 'src/app/services/card.service';
import { Observable, observable } from 'rxjs';
import { ElectronCard } from '@interfaces/electron-card';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-electron-detail',
  templateUrl: './electron-detail.component.html',
  styleUrls: ['./electron-detail.component.scss'],
})
export class ElectronDetailComponent implements OnInit {
  cardId: string;
  searchQuery: string;
  electronCard$: Observable<ElectronCard> = this.route.paramMap.pipe(
    switchMap((map) => {
      this.cardId = map.get('id');
      this.cardService.countUpElectronCard(this.cardId);
      return this.cardService.getElectronCard(this.cardId);
    })
  );
  constructor(
    private route: ActivatedRoute,
    private cardService: CardService,
    private router: Router
  ) {
    this.route.queryParamMap.subscribe((param) => {
      this.searchQuery = param.get('searchQuery');
      if (this.searchQuery) {
        this.router.navigate(['electron-card'], {
          queryParams: {
            searchQuery: this.searchQuery,
          },
        });
      }
    });
  }

  ngOnInit(): void {}
}
