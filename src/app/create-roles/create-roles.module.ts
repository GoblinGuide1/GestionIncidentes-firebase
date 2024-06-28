import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CreateRolesPageRoutingModule } from './create-roles-routing.module';

import { CreateRolesPage } from './create-roles.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CreateRolesPageRoutingModule
  ],
  declarations: [CreateRolesPage]
})
export class CreateRolesPageModule {}
