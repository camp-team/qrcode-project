import { Injectable } from '@angular/core';
import { ReplaySubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DrawerService {
  drawerSource = new ReplaySubject<boolean>(1);
  isOpened$ = this.drawerSource.asObservable();
  isOpend: boolean;

  constructor() {}

  toggle() {
    this.isOpend = !this.isOpend;
    this.drawerSource.next(this.isOpend);
  }
}
