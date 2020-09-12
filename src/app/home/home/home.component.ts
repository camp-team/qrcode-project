import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  readonly genreLists = [
    { id: 'code', name: 'モバイル決済' },
    { id: 'electron', name: '電子マネー' },
    { id: 'credit', name: 'クレジットカード' },
    { id: 'point', name: 'ポイントカード' },
  ];

  constructor() {}

  ngOnInit(): void {}
}
