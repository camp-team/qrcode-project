import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NotFoundComponent } from './not-found/not-found.component';
import { AdminGuard } from './guards/admin.guard';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    loadChildren: () => import('./home/home.module').then((m) => m.HomeModule),
  },
  {
    path: 'create',
    loadChildren: () =>
      import('./create/create.module').then((m) => m.CreateModule),
    canActivate: [AdminGuard],
    canLoad: [AdminGuard],
  },
  {
    path: 'code-card',
    loadChildren: () =>
      import('./code-card/code-card.module').then((m) => m.CodeCardModule),
  },
  {
    path: 'electron-card',
    loadChildren: () =>
      import('./electron-card/electron-card.module').then(
        (m) => m.ElectronCardModule
      ),
  },
  {
    path: 'code-detail/:id',
    loadChildren: () =>
      import('./code-detail/code-detail.module').then(
        (m) => m.CodeDetailModule
      ),
  },
  {
    path: '**',
    component: NotFoundComponent,
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      scrollPositionRestoration: 'enabled',
      anchorScrolling: 'enabled',
      scrollOffset: [0, 50],
    }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
