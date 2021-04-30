import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BienvenidEstudiantePage } from './bienvenid-estudiante.page';

const routes: Routes = [
  {
    path: '',
    component: BienvenidEstudiantePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BienvenidEstudiantePageRoutingModule {}
