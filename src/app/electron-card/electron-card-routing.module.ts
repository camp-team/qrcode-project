import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ElectronCardComponent } from './electron-card/electron-card.component';

const routes: Routes = [
  {
    path: '',
    component: ElectronCardComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ElectronCardRoutingModule {}
