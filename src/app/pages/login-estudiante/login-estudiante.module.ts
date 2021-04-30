import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { LoginEstudiantePageRoutingModule } from './login-estudiante-routing.module';

import { LoginEstudiantePage } from './login-estudiante.page';
import { ReactiveFormsModule } from '@angular/forms';
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    LoginEstudiantePageRoutingModule
  ],
  declarations: [LoginEstudiantePage]
})
export class LoginEstudiantePageModule {}
