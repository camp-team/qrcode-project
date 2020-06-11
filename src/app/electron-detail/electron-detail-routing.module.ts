import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ElectronDetailComponent } from './electron-detail/electron-detail.component';

const routes: Routes = [
  {
    path: '',
    component: ElectronDetailComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ElectronDetailRoutingModule {}
