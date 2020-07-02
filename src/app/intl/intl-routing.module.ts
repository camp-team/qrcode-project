import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HelpComponent } from './help/help.component';
import { TermsComponent } from './terms/terms.component';
import { LegalComponent } from './legal/legal.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'help',
  },
  {
    path: 'help',
    component: HelpComponent,
  },
  {
    path: 'terms',
    component: TermsComponent,
  },
  {
    path: 'legal',
    component: LegalComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class IntlRoutingModule {}
