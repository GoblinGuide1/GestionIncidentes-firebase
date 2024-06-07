import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CreateIncidenciaPageRoutingModule } from './create-incidencia-routing.module';

import { CreateIncidenciaPage } from './create-incidencia.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CreateIncidenciaPageRoutingModule
  ],
  declarations: [CreateIncidenciaPage]
})
export class CreateIncidenciaPageModule {}
