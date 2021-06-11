import { DashboardComponent } from './dashboard/dashboard.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PagesComponent } from './pages.component';
import { ProgressComponent } from './progress/progress.component';
import { Grafica1Component } from './grafica1/grafica1.component';
import { AccountSettingsComponent } from './account-settings/account-settings.component';
import { PromesasComponent } from './promesas/promesas.component';
import { RxjsComponent } from './rxjs/rxjs.component';
import { AuthGuard } from '../guard/auth.guard';
import { PerfilComponent } from './perfil/perfil.component';
import { Usuario } from '../models/usuario.model';
import { UsuariosComponent } from './mantenimientos/usuarios/usuarios.component';
import { MedicosComponent } from './mantenimientos/medicos/medicos.component';
import { HospitalesComponent } from './mantenimientos/hospitales/hospitales.component';
import { MedicoComponent } from './mantenimientos/medicos/medico/medico.component';


const routes: Routes = [
  {
    path: 'dashboard',
    component: PagesComponent,
    canActivate: [AuthGuard],
    children: [
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
    ],
  },
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class PagesRoutingModule{}
