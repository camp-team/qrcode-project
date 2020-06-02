import { Component, OnInit } from '@angular/core';
import { DrawerService } from '../services/drawer.service';
import { FormControl } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { Observable } from 'rxjs';
import { UserData } from '@interfaces/user';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  constructor(
    private drawerService: DrawerService,
    private authservice: AuthService,
    private snackBar: MatSnackBar
  ) {}

  search = new FormControl('');
  user$: Observable<UserData> = this.authservice.user$;
  isProcessing: boolean;

  ngOnInit(): void {}

  toggle() {
    this.drawerService.toggle();
  }

  login() {
    this.isProcessing = true;
    this.authservice
      .login()
      .finally(() => {
        this.isProcessing = false;
      })
      .then(() => {
        this.snackBar.open('ログインしました🥳', null, {
          duration: 2000,
        });
      });
  }

  logout() {
    this.authservice.logout().then(() => {
      this.snackBar.open('ログアウトしました', null, {
        duration: 2000,
      });
    });
  }
}
