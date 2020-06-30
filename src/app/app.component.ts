import { Component, Inject } from '@angular/core';
import { Observable, of } from 'rxjs';
import { DrawerService } from './services/drawer.service';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { map } from 'rxjs/operators';
import { DOCUMENT } from '@angular/common';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  isOpened$: Observable<boolean> = this.drawerService.isOpened$;
  isMobile$: Observable<boolean>;
  title = 'qr-comparison';

  constructor(
    @Inject(DOCUMENT) private rootDocument: HTMLDocument,
    private drawerService: DrawerService,
    private breakpointObserver: BreakpointObserver
  ) {
    if (!environment.production) {
      this.rootDocument
        .querySelector('[rel=icon]')
        .setAttribute('href', 'favicon-dev.svg');
    }
  }
}
