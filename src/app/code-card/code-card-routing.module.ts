import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CodeCardComponent } from './code-card/code-card.component';

const routes: Routes = [
  {
    path: '',
    component: CodeCardComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CodeCardRoutingModule {}
