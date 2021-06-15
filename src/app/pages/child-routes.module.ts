import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

import { DashboardComponent } from './dashboard/dashboard.component';

import { ProgressComponent } from './progress/progress.component';
import { Grafica1Component } from './grafica1/grafica1.component';
import { AccountSettingsComponent } from './account-settings/account-settings.component';
import { PromesasComponent } from './promesas/promesas.component';
import { RxjsComponent } from './rxjs/rxjs.component';

import { PerfilComponent } from './perfil/perfil.component';

import { UsuariosComponent } from './mantenimientos/usuarios/usuarios.component';
import { MedicosComponent } from './mantenimientos/medicos/medicos.component';
import { HospitalesComponent } from './mantenimientos/hospitales/hospitales.component';
import { MedicoComponent } from './mantenimientos/medicos/medico/medico.component';
import { BusquedasComponent } from './busquedas/busquedas.component';
import { AdminGuard } from '../guard/admin.guard';


const childRoutes: Routes = [
  {
    path: '',
    component: DashboardComponent,
    data: {titulo: 'Dashboard'}
  },
  {
    path: 'progress',
    component: ProgressComponent,
    data: {titulo: 'Progress bar'}
  },
  {
    path: 'grafica1',
    component: Grafica1Component,
    data: {titulo: 'Grafica 1'}
  },
  {
    path: 'account-settings',
    component: AccountSettingsComponent,
    data: {titulo: 'Account settings'}
  },
  {
    path: 'promesas',
    component: PromesasComponent,
    data: {titulo: 'Promesas'}
  },
  {
    path: 'rxjs',
    component: RxjsComponent,
    data: {titulo: 'Rxjs'}
  },
  {
    path: 'perfil',
    component: PerfilComponent,
    data: {titulo: 'Perfil'}
  },

  //Mantenimientos
  {
    path: 'usuarios',
    canActivate: [AdminGuard],
    component: UsuariosComponent,
    data: {titulo: 'Usuario de aplicación'}
  },
  {
    path: 'medicos',
    component: MedicosComponent,
    data: {titulo: 'Medicos de aplicación'}
  },
  {
    path: 'medico/:id',
    component: MedicoComponent,
    data: {titulo: 'Medico de aplicación'}
  },
  {
    path: 'hospitales',
    component: HospitalesComponent,
    data: {titulo: 'Hospitales de aplicación'}
  },
  {
    path: 'buscar/:termino',
    component: BusquedasComponent,
    data: {titulo: 'Busquedas'}
  },

]


@NgModule({
  imports: [RouterModule.forChild(childRoutes)],
  exports: [RouterModule]
})
export class ChildRoutesModule { }
