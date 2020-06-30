import { Component, OnInit } from '@angular/core';
import { DrawerService } from '../services/drawer.service';
import { FormControl } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { Observable } from 'rxjs';
import { UserData } from '@interfaces/user';
import { MatSnackBar } from '@angular/material/snack-bar';
import { startWith, debounceTime } from 'rxjs/operators';
import { SearchService } from '../services/search.service';
import { SearchIndex } from 'algoliasearch/lite';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  searchControl: FormControl = new FormControl('');
  user$: Observable<UserData> = this.authservice.user$;
  isProcessing: boolean;

  saerchOptions = [];
  index: SearchIndex = this.searchService.index.popularStore;

  constructor(
    private drawerService: DrawerService,
    private authservice: AuthService,
    private snackBar: MatSnackBar,
    private searchService: SearchService,
    private router: Router
  ) {
    this.searchControl.valueChanges
      .pipe(startWith(''), debounceTime(500))
      .subscribe((key) => {
        this.index
          .search(key)
          .then((result) => (this.saerchOptions = result.hits));
      });
  }

  ngOnInit(): void {}

  setSearchQuery(value: string) {
    this.searchControl.setValue(value, {
      emitEvent: false,
    });
  }

  routeSearch(searchQuery: string) {
    this.router.navigate([], {
      queryParamsHandling: 'merge',
      queryParams: {
        searchQuery,
      },
    });
  }

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
