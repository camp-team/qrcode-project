import { Component, OnInit } from '@angular/core';
import { DrawerService } from '../services/drawer.service';
import { Observable } from 'rxjs';
import { MobileService } from '../services/mobile.service';

@Component({
  selector: 'app-main-shell',
  templateUrl: './main-shell.component.html',
  styleUrls: ['./main-shell.component.scss'],
})
export class MainShellComponent implements OnInit {
  isOpened$: Observable<boolean> = this.drawerService.isOpened$;

  constructor(
    private drawerService: DrawerService,
    public mobileService: MobileService
  ) {}

  ngOnInit(): void {}
}
