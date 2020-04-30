import { Component, OnInit } from '@angular/core';
import { DrawerService } from '../services/drawer.service';
import { FormControl } from '@angular/forms';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  constructor(
    private drawerService: DrawerService,
    private authservice: AuthService
  ) {}

  search = new FormControl('');

  ngOnInit(): void {}

  toggle() {
    this.drawerService.toggle();
  }

  login() {
    this.authservice.login();
  }
}
