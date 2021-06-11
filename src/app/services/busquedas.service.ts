import { Usuario } from './../models/usuario.model';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment.prod';
import { map } from 'rxjs/operators';
import { Hospital } from '../models/hospital.model';

const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class BusquedasService {

  constructor(private http: HttpClient) { }

  get token(): string{
    return localStorage.getItem('token') || '';
  }

  get headers(){
    return {
      headers: {
        'x-token': this.token,
      },
    };
  }

  private transformarUsuarios( resultados: any[] ): Usuario[] {


    return resultados.map(
      user => new Usuario(user.nombre, user.email, '', user.img, user.google, user.role, user.uuid )
    );
  }

  private transformarHospital( resultados: any[] ): Hospital[] {


    return resultados;
  }





  buscar(tipo: 'usuarios' | 'medicos' | 'hospitales', termino: string){
    const ulr = `${base_url}/todo/coleccion/${tipo}/${termino}`;

    return this.http.get<any[]>(ulr,this.headers)
    .pipe(
      map((resp: any) =>{
        switch(tipo){
          case 'usuarios':
          return this.transformarUsuarios(resp.resultados);

          case 'hospitales':
            return this.transformarHospital(resp.resultados);

          default:
            return [];
        }
      })
    )
  }
}
