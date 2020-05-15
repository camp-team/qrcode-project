import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    loadChildren: () => import('./home/home.module').then((m) => m.HomeModule),
  },
  {
    path: 'code-card',
    loadChildren: () =>
      import('./code-card/code-card.module').then((m) => m.CodeCardModule),
  },
  {
    path: 'create',
    loadChildren: () =>
      import('./create/create.module').then((m) => m.CreateModule),
  },
  {
    path: 'code-detail/:id',
    loadChildren: () =>
      import('./code-detail/code-detail.module').then(
        (m) => m.CodeDetailModule
      ),
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
