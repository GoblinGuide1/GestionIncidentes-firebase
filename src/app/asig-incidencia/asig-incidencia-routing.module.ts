import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AsigIncidenciaPage } from './asig-incidencia.page';

const routes: Routes = [
  {
    path: '',
    component: AsigIncidenciaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AsigIncidenciaPageRoutingModule {}
