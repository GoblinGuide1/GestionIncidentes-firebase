import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { InfoIncidenciaPageRoutingModule } from './info-incidencia-routing.module';

import { InfoIncidenciaPage } from './info-incidencia.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    InfoIncidenciaPageRoutingModule
  ],
  declarations: [InfoIncidenciaPage]
})
export class InfoIncidenciaPageModule {}
