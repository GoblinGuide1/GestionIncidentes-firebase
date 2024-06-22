import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UserDiagnogPage } from './user-diagnog.page';

const routes: Routes = [
  {
    path: '',
    component: UserDiagnogPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UserDiagnogPageRoutingModule {}
