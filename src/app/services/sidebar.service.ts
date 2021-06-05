import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SidebarService {

  menu: any[] = [

    {
      titulo: 'Dashboard!!',
      icono :'mdi mdi-gauge',
      subMenu: [
        {
          titulo: 'Main',
          url: '/'
        },
        {
          titulo: 'Progressbard',
          url: 'progress'
        },
        {
          titulo: 'Graficas',
          url: 'grafica1'
        },
        {
          titulo: 'Promesas',
          url: 'promesas'
        },
        {
          titulo: 'Rxjs',
          url: 'rxjs'
        },
        {
          titulo: 'Perfil',
          url: 'perfil'
        },
      ]
    },
    {
      titulo: 'Mantenimiento',
      icono :'mdi mdi-folder-lock-open',
      subMenu: [
        {
          titulo: 'Usuarios',
          url: 'usuarios'
        },
        {
          titulo: 'Hospitales',
          url: 'hospitales'
        },
        {
          titulo: 'Médicos',
          url: 'medicos'
        },
      ]
    }
  ];


  constructor() { }
}
