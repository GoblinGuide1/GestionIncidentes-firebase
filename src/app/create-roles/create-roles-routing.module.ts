import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CreateRolesPage } from './create-roles.page';

const routes: Routes = [
  {
    path: '',
    component: CreateRolesPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CreateRolesPageRoutingModule {}
