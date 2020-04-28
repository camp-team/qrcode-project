import { Component, OnInit } from '@angular/core';
import { DrawerService } from '../services/drawer.service';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  constructor(private drawerService: DrawerService) {}

  search = new FormControl('');

  ngOnInit(): void {}

  toggle() {
    this.drawerService.toggle();
  }
}
