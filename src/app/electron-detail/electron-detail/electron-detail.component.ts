import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
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
  electronCard$: Observable<ElectronCard> = this.route.paramMap.pipe(
    switchMap((param) => {
      this.cardId = param.get('id');
      return this.cardService.getElectronCard(this.cardId);
    })
  );
  constructor(
    private route: ActivatedRoute,
    private cardService: CardService
  ) {}

  ngOnInit(): void {}
}
