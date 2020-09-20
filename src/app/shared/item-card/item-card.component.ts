import { Component, Input, OnInit } from '@angular/core';
import { BasicCard } from '@interfaces/card';
import { CodeCard } from '@interfaces/code-card';
import { CreditCard } from '@interfaces/credit-card';
import { ElectronCard } from '@interfaces/electron-card';
import { CardService } from 'src/app/services/card.service';

@Component({
  selector: 'app-item-card',
  templateUrl: './item-card.component.html',
  styleUrls: ['./item-card.component.scss'],
})
export class ItemCardComponent implements OnInit {
  @Input() card: CodeCard | ElectronCard | CreditCard | BasicCard;
  @Input() cardType: string;

  constructor(public cardService: CardService) {}

  ngOnInit(): void {}
}
