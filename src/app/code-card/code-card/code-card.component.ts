import { Component, OnInit } from '@angular/core';
import { CardService } from 'src/app/services/card.service';

@Component({
  selector: 'app-code-card',
  templateUrl: './code-card.component.html',
  styleUrls: ['./code-card.component.scss'],
})
export class CodeCardComponent implements OnInit {
  codeCards$ = this.cardService.getCodeCards();

  constructor(private cardService: CardService) {}

  ngOnInit(): void {}
}
