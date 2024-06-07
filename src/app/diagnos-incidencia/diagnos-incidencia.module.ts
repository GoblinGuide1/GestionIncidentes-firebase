import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DiagnosIncidenciaPageRoutingModule } from './diagnos-incidencia-routing.module';

import { DiagnosIncidenciaPage } from './diagnos-incidencia.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DiagnosIncidenciaPageRoutingModule
  ],
  declarations: [DiagnosIncidenciaPage]
})
export class DiagnosIncidenciaPageModule {}
