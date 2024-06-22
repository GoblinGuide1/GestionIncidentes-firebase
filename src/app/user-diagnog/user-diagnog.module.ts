import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { UserDiagnogPageRoutingModule } from './user-diagnog-routing.module';

import { UserDiagnogPage } from './user-diagnog.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    UserDiagnogPageRoutingModule
  ],
  declarations: [UserDiagnogPage]
})
export class UserDiagnogPageModule {}
