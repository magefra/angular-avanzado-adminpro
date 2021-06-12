import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.prod';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Hospital } from '../models/hospital.model';


const base_url = environment.base_url;


@Injectable({
  providedIn: 'root'
})
export class HospitalService {

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

  cargarHospitales() {

    const url = `${ base_url }/hospitales`;
    return this.http.get( url, this.headers )
              .pipe(
                map( (resp: {ok: boolean, hospitales: Hospital[] }) => resp.hospitales )
              );
  }



  crearHospital(nombre: string){
    const ulr = `${base_url}/hospitales`;

    return this.http.post(ulr,{nombre},this.headers);
  }



  actualizarHospital(_id: string,nombre: string ){
    const ulr = `${base_url}/hospitales/${_id}`;

    return this.http.put(ulr,{nombre},this.headers);
  }


  eliminarHospital(_id: string ){
    const ulr = `${base_url}/hospitales/${_id}`;

    return this.http.delete(ulr,this.headers);
  }




}
