import { Injectable } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class MobileService {
  isMobile: boolean;

  constructor(private breakpointObserver: BreakpointObserver) {
    this.breakpointObserver
      .observe(Breakpoints.XSmall)
      .pipe(map((result) => result.matches))
      .subscribe((isMobile) => {
        this.isMobile = isMobile;
      });
  }
}
