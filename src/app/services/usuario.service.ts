
import { HttpClient } from '@angular/common/http';
import { Injectable, NgZone } from '@angular/core';
import { RegisterForm } from '../interfaces/register-form.interface';
import { environment } from '../../environments/environment.prod';
import { LoginForm } from '../interfaces/login-form.interface';

import { tap, map, catchError, delay } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { Router } from '@angular/router';
import { Usuario } from '../models/usuario.model';
import { CargarUsuario } from '../interfaces/cargar-usuarios.interface';


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

  get headers(){
    return {
      headers: {
        'x-token': this.token,
      },
    };
  }


  get role(): 'ADMIN_ROLE' | 'USER_ROLE'{
    return this.usuario.role;
  }
  guardarLocalStorage(token: string, menu: any){

    localStorage.setItem('token',token);
    localStorage.setItem('menu', JSON.stringify(menu));
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

      this.guardarLocalStorage(resp.token, resp.menu)



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
    localStorage.removeItem('menu');

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
        this.guardarLocalStorage(resp.token, resp.menu)

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
        this.guardarLocalStorage(resp.token, resp.menu)

      })
    );
  }

  loginGoogle(token: string) {
    return this.http.post(`${base_url}/login/google`, { token }).pipe(
      tap((resp: any) => {
        this.guardarLocalStorage(resp.token, resp.menu)

      })
    );
  }

  cargarUsuarios(desde: number = 0){

    const ulr = `${base_url}/usuarios?desde=${desde}`;

    return this.http.get<CargarUsuario>(ulr,this.headers)
    .pipe(
      delay(1000),
      map(resp =>{
        const usuarios = resp.usuarios.map(user =>
          new Usuario(user.nombre, user.email, '', user.img, user.google, user.role, user.uuid))
        return {
          total : resp.total,
          usuarios
        };
      })
    )
  }


  eliminarUsuario(usuario: Usuario){

    const url = `${base_url}/usuarios/${usuario.uuid}`;


    return this.http.delete(url,this.headers);

  }



  guardarUsuario(usuario: Usuario){

    return this.http.put(`${base_url}/usuarios/${usuario.uuid}`, usuario,{
      headers: {
        'x-token': this.token,
      },
    })
  }




}
