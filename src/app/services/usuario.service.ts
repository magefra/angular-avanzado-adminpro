import { HttpClient } from '@angular/common/http';
import { Injectable, NgZone } from '@angular/core';
import { RegisterForm } from '../interfaces/register-form.interface';
import { environment } from '../../environments/environment.prod';
import { LoginForm } from '../interfaces/login-form.interface';

import { tap, map, catchError } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { Router } from '@angular/router';

const base_url = environment.base_url;
declare const gapi : any;

@Injectable({
  providedIn: 'root',
})
export class UsuarioService {

  public auth2 : any;

  constructor(private http: HttpClient,
              private router: Router,
              private ngZone: NgZone) {
                this.googleInit();
              }

  validarToken(): Observable<boolean> {
    const token = localStorage.getItem('token') || '';

    return this.http.get(`${base_url}/login/renew`, {
      headers: {
        'x-token': token,
      },
    })
    .pipe(
      tap((resp: any) =>{
        localStorage.setItem('token', resp.token);
      }),
      map(resp => true),
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
    return this.http.post(`${base_url}/usuarios`, formData).pipe(
      tap((resp: any) => {
        localStorage.setItem('token', resp.token);
      })
    );
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
