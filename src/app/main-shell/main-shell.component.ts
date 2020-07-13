import { Component, OnInit } from '@angular/core';
import { DrawerService } from '../services/drawer.service';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { RouterService } from '../services/router.service';

@Component({
  selector: 'app-main-shell',
  templateUrl: './main-shell.component.html',
  styleUrls: ['./main-shell.component.scss'],
})
export class MainShellComponent implements OnInit {
  isOpened$: Observable<boolean> = this.drawerService.isOpened$;
  isMobile$: Observable<boolean>;
  isSticky$: Observable<boolean> = this.routerService.isSticky$;

  constructor(
    private drawerService: DrawerService,
    private breakpointObserver: BreakpointObserver,
    private routerService: RouterService
  ) {
    this.isMobile$ = this.breakpointObserver
      .observe(Breakpoints.XSmall)
      .pipe(map((result) => result.matches));
  }

  ngOnInit(): void {}
}
