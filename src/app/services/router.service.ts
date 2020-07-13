import { Injectable } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { ReplaySubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class RouterService {
  previousUrl: string;
  currentUrl: string;

  stickySource = new ReplaySubject<boolean>(1);
  isSticky: boolean;
  isSticky$: Observable<boolean> = this.stickySource.asObservable();

  constructor(private router: Router) {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.previousUrl = this.currentUrl;
        this.currentUrl = event.url;
      }
    });
  }

  toggleSticky() {
    this.isSticky = !this.isSticky;
    this.stickySource.next(this.isSticky);
  }
}
