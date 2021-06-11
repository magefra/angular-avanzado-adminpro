import { Usuario } from './../../../models/usuario.model';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { UsuarioService } from '../../../services/usuario.service';
import { BusquedasService } from '../../../services/busquedas.service';
import Swal from 'sweetalert2';
import { ModalImagenService } from '../../../services/modal-imagen.service';
import { delay } from 'rxjs/operators';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.css'],
})
export class UsuariosComponent implements OnInit, OnDestroy {
  public totalUsuarios: number = 0;
  public usuarios: Usuario[] = [];
  public usuariosTemp: Usuario[] = [];
  public desde: number = 0;
  public cargando: boolean = true;
  public imgSubs: Subscription;

  constructor(
    private usuarioService: UsuarioService,
    private busquedasService: BusquedasService,
    private modalImagenService: ModalImagenService
  ) {}
  ngOnDestroy(): void {
    this.imgSubs.unsubscribe();
  }

  ngOnInit(): void {
    this.cargarUsuarios();

    this.imgSubs = this.modalImagenService.nuevaImagen
        .pipe(
          delay(100)
        )
        .subscribe(img => this.cargarUsuarios())
  }

  cargarUsuarios() {
    this.cargando = true;
    this.usuarioService
      .cargarUsuarios(this.desde)
      .subscribe(({ total, usuarios }) => {
        this.totalUsuarios = total;

        this.usuarios = usuarios;
        this.usuariosTemp = usuarios;

        this.cargando = false;
      });
  }

  cambiarPagina(valor: number) {
    this.desde += valor;

    if (this.desde < 0) {
      this.desde = 0;
    } else if (this.desde >= this.totalUsuarios) {
      this.desde -= valor;
    }

    this.cargarUsuarios();
  }

  buscar(termino: string) {
    if (termino.length === 0) {
      return (this.usuarios = [...this.usuariosTemp]);
    }

    this.busquedasService.buscar('usuarios', termino).subscribe((resp) => {
      this.usuarios = resp as Usuario[];
    });
  }

  eliminarUsuario(usuario: Usuario) {

    if(usuario.uuid === this.usuarioService.uuid){
      return Swal.fire('Error', 'No se puede borrar este usuario', 'error');
    }


    Swal.fire({
      title: '¿Deseas borrar el usuario',
      text: 'Está apunto de borrar el usuario',
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Si, borrarlo',
    }).then((result) => {
      if (result.isConfirmed) {
        this.usuarioService.eliminarUsuario(usuario).subscribe((resp) => {
          this.cargarUsuarios();
          Swal.fire(
            'Usuario eliminado',
            `${usuario.nombre} fue eliminado correctamente`,
            'success'
          );
        });
      }
    });
  }


  cambiarRole(usuario: Usuario){

    this.usuarioService.guardarUsuario(usuario)
    .subscribe(resp =>{
      console.log('Usuario actualizado');
    })
  }


  abrirModal(usuario: Usuario){


    this.modalImagenService.abrirModal('usuarios',usuario.uuid,usuario.img);
  }

}
