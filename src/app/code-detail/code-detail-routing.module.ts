import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CodeDetailComponent } from './code-detail/code-detail.component';

const routes: Routes = [
  {
    path: '',
    component: CodeDetailComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CodeDetailRoutingModule {}
