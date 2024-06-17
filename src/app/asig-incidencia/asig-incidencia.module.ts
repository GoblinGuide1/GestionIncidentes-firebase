import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AsigIncidenciaPageRoutingModule } from './asig-incidencia-routing.module';

import { AsigIncidenciaPage } from './asig-incidencia.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AsigIncidenciaPageRoutingModule
  ],
  declarations: [AsigIncidenciaPage]
})
export class AsigIncidenciaPageModule {}
