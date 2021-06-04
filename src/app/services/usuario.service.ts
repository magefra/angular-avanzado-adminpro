import { HttpClient } from '@angular/common/http';
import { Injectable, NgZone } from '@angular/core';
import { RegisterForm } from '../interfaces/register-form.interface';
import { environment } from '../../environments/environment.prod';
import { LoginForm } from '../interfaces/login-form.interface';

import { tap, map, catchError } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { Router } from '@angular/router';
import { Usuario } from '../models/usuario.model';

const base_url = environment.base_url;
declare const gapi : any;

@Injectable({
  providedIn: 'root',
})
export class UsuarioService {

  public auth2 : any;
  public usuario: Usuario;

  constructor(private http: HttpClient,
              private router: Router,
              private ngZone: NgZone) {
                this.googleInit();
              }


  get token(): string{
    return localStorage.getItem('token') || '';
  }

  get uuid(): string{
    return this.usuario.uuid || '';
  }





  validarToken(): Observable<boolean> {
    const token = this.token;

    return this.http.get(`${base_url}/login/renew`, {
      headers: {
        'x-token': token,
      },
    })
    .pipe(
      map((resp: any) =>{


        const {email, google, nombre,role,img = '', uuid} = resp.usuarioDB;
        console.log(resp);

      this.usuario = new Usuario(nombre,email,'',img,google, role, uuid);


      localStorage.setItem('token', resp.token);
      return true;
      }),
      catchError(err => of(false))
    );
  }



  googleInit()
  {

    return new Promise<void>(resolve => {

      gapi.load('auth2', () =>{
        // Retrieve the singleton for the GoogleAuth library and set up the client.
        this.auth2 = gapi.auth2.init({
          client_id: '1062420627625-tp8dig3onmal5nuko49t9fsoe9kejqae.apps.googleusercontent.com',
          cookiepolicy: 'single_host_origin',
        });

        resolve();

      });


    });

  }



  logout(){
    localStorage.removeItem('token');

    this.auth2.signOut().then( () => {
      this.ngZone.run(() => {
        this.router.navigateByUrl('/login');
      })

    });


  }

  crearUsuario(formData: RegisterForm) {
    return this.http.post(`${base_url}/usuarios`, formData)
    .pipe(
      tap((resp: any) => {
        localStorage.setItem('token', resp.token);
      })
    );
  }



  actualizarUsuario(data: {email: string, nombre: string, role:string}){
    data = {
      ... data,
      role: this.usuario.role
    }

    return this.http.put(`${base_url}/usuarios/${this.uuid}`, data,{
      headers: {
        'x-token': this.token,
      },
    })
  }

  loginUsuario(formData: LoginForm) {
    return this.http.post(`${base_url}/login`, formData).pipe(
      tap((resp: any) => {
        localStorage.setItem('token', resp.token);
      })
    );
  }

  loginGoogle(token: string) {
    return this.http.post(`${base_url}/login/google`, { token }).pipe(
      tap((resp: any) => {
        localStorage.setItem('token', resp.token);
      })
    );
  }





}
