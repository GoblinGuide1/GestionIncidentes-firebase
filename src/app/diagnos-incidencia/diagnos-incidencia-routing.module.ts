import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DiagnosIncidenciaPage } from './diagnos-incidencia.page';

const routes: Routes = [
  {
    path: '',
    component: DiagnosIncidenciaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DiagnosIncidenciaPageRoutingModule {}
