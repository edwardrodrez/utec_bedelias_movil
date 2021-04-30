import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EscolaridadPageRoutingModule } from './escolaridad-routing.module';

import { EscolaridadPage } from './escolaridad.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EscolaridadPageRoutingModule
  ],
  declarations: [EscolaridadPage]
})
export class EscolaridadPageModule {}
