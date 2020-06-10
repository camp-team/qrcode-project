import { Component, OnInit } from '@angular/core';
import { CardService } from 'src/app/services/card.service';
import { Observable } from 'rxjs';
import { ElectronCard } from '@interfaces/electron-card';

@Component({
  selector: 'app-electron-card',
  templateUrl: './electron-card.component.html',
  styleUrls: ['./electron-card.component.scss'],
})
export class ElectronCardComponent implements OnInit {
  electronCards$: Observable<
    ElectronCard[]
  > = this.cardService.getElectronCards();

  constructor(private cardService: CardService) {}

  ngOnInit(): void {}
}
