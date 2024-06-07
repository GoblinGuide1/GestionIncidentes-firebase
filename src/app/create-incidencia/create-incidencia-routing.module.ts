import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CreateIncidenciaPage } from './create-incidencia.page';

const routes: Routes = [
  {
    path: '',
    component: CreateIncidenciaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CreateIncidenciaPageRoutingModule {}
