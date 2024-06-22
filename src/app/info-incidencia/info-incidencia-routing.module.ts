import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { InfoIncidenciaPage } from './info-incidencia.page';

const routes: Routes = [
  {
    path: '',
    component: InfoIncidenciaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class InfoIncidenciaPageRoutingModule {}
