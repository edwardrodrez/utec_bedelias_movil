import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { BienvenidEstudiantePageRoutingModule } from './bienvenid-estudiante-routing.module';

import { BienvenidEstudiantePage } from './bienvenid-estudiante.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    BienvenidEstudiantePageRoutingModule
  ],
  declarations: [BienvenidEstudiantePage]
})
export class BienvenidEstudiantePageModule {}
