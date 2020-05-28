import { Component } from '@angular/core';
import { Observable, of } from 'rxjs';
import { DrawerService } from './services/drawer.service';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  isOpened$: Observable<boolean> = this.drawerService.isOpened$;
  isMobile$: Observable<boolean> = of(false);
  title = 'qr-comparison';

  constructor(
    private drawerService: DrawerService,
    private breakpointObserver: BreakpointObserver
  ) {
    this.isMobile$ = this.breakpointObserver
      .observe(Breakpoints.XSmall)
      .pipe(map((result) => result.matches));
  }
}
