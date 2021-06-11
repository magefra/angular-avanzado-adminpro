import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { environment } from '../../environments/environment.prod';
import { HttpClient } from '@angular/common/http';
import { Medico } from '../models/medico.mode';

const base_url = environment.base_url;



@Injectable({
  providedIn: 'root'
})
export class MedicoService {

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


  cargarMedicos(){

    const ulr = `${base_url}/medicos`;

    return this.http.get(ulr,this.headers)
    .pipe(
      map((resp:{ok: boolean, medicos: Medico[]}) => resp.medicos)
    );
  }



  crearMedico(medico: Medico){
    const ulr = `${base_url}/medicos`;

    return this.http.post(ulr,medico,this.headers);
  }


  actualizarMedico(medico: Medico){
    const ulr = `${base_url}/medicos/${medico._id}`;

    return this.http.put(ulr,{medico},this.headers);
  }


  eliminarMedico(_id: string ){
    const ulr = `${base_url}/medicos/${_id}`;

    return this.http.delete(ulr,this.headers);
  }



}
