import { Component, OnInit } from '@angular/core';
import { DrawerService } from '../services/drawer.service';
import { AuthService } from '../services/auth.service';
import { Observable } from 'rxjs';
import { UserData } from '@interfaces/user';
import { MatSnackBar } from '@angular/material/snack-bar';
import { startWith, debounceTime } from 'rxjs/operators';
import { SearchService } from '../services/search.service';
import { SearchIndex } from 'algoliasearch/lite';
import { Router } from '@angular/router';
import { StoreService } from '../services/store.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  user$: Observable<UserData> = this.authservice.user$;
  isProcessing: boolean;

  saerchOptions = [];
  index: SearchIndex = this.searchService.index.popularStore;

  constructor(
    public drawerService: DrawerService,
    public searchService: SearchService,
    private authservice: AuthService,
    private snackBar: MatSnackBar,
    private router: Router,
    private storeService: StoreService
  ) {
    this.searchService.searchControl.valueChanges
      .pipe(startWith(''), debounceTime(500))
      .subscribe((key) => {
        this.index
          .search(key)
          .then((result) => (this.saerchOptions = result.hits));
      });
  }

  ngOnInit(): void {}

  setSearchQuery(value: string) {
    this.searchService.searchControl.setValue(value, {
      emitEvent: false,
    });
  }

  routeSearch(searchQuery: string) {
    if (searchQuery) {
      this.index.search(searchQuery).then(async (searchResult) => {
        const hits: any = searchResult.hits;
        const hitStore = hits.find((hit) => hit.name === searchQuery);
        console.log(hitStore);
        if (hitStore) {
          await this.storeService.incrementViewCount(hitStore);
        }
      });
      this.router.navigate([], {
        queryParamsHandling: 'merge',
        queryParams: {
          searchQuery,
        },
      });
    }
  }

  login() {
    this.isProcessing = true;
    this.authservice
      .login()
      .finally(() => {
        this.isProcessing = false;
      })
      .then(() => {
        this.snackBar.open('ログインしました🥳');
      });
  }

  logout() {
    this.authservice.logout().then(() => {
      this.snackBar.open('ログアウトしました');
    });
  }
}
