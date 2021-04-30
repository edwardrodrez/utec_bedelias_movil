import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EscolaridadPage } from './escolaridad.page';

const routes: Routes = [
  {
    path: '',
    component: EscolaridadPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EscolaridadPageRoutingModule {}
