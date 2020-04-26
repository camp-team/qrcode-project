import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { DrawerService } from './services/drawer.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  isOpened$: Observable<boolean> = this.drawerService.isOpened$;
  title = 'qr-comparison';

  constructor(private drawerService: DrawerService) {}
}
