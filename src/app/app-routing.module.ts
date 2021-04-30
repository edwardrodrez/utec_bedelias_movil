import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { BienvenidaComponent } from './bienvenida/bienvenida.component';
import { LoginComponent } from './login/login.component';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },
  {
    path: '',
    redirectTo: 'bienvenid-estudiante',
    pathMatch: 'full'
  },
  {
    path: 'carreras',
    loadChildren: () => import('./pages/carreras/carreras.module').then( m => m.CarrerasPageModule)
  },
  {
    path: 'escolaridad',
    loadChildren: () => import('./pages/escolaridad/escolaridad.module').then( m => m.EscolaridadPageModule)
  },
  {
    path: 'logout',
    loadChildren: () => import('./pages/logout/logout.module').then( m => m.LogoutPageModule)
  },
  {
    path: 'bienvenid-estudiante',
    loadChildren: () => import('./pages/bienvenid-estudiante/bienvenid-estudiante.module').then( m => m.BienvenidEstudiantePageModule)
  },
  {
    path: 'login-estudiante',
    loadChildren: () => import('./pages/login-estudiante/login-estudiante.module').then( m => m.LoginEstudiantePageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
