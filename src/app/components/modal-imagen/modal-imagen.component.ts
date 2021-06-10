import { Component, OnInit } from '@angular/core';
import { ModalImagenService } from '../../services/modal-imagen.service';
import { FileUploadService } from '../../services/file-upload.service';

import Swal from 'sweetalert2';


@Component({
  selector: 'app-modal-imagen',
  templateUrl: './modal-imagen.component.html',
  styleUrls: ['./modal-imagen.component.css']
})
export class ModalImagenComponent implements OnInit {


  public imagenSubir: File;
  public imgTeam: any = null;

  constructor(public modalImagenService: ModalImagenService,
              public fileUploadService: FileUploadService) { }

  ngOnInit(): void {
  }


  cerrarModal(){
    this.imgTeam = null;
    this.modalImagenService.cerrarModal();
  }


  cambiarImagen(file: File){
    this.imagenSubir = file;

    if(!file){
      return this.imgTeam = null;
    }

    const reader = new FileReader();
     reader.readAsDataURL(file);

    reader.onloadend = () =>{
      this.imgTeam = reader.result;
      console.log(reader.result);
    }
  }


  subirImagen(){

    const uuid = this.modalImagenService.id;
    const tipo = this.modalImagenService.tipo;


    this.fileUploadService
    .actualizarFoto(this.imagenSubir,tipo, uuid)
    .then(img =>{

      Swal.fire('Guardado', 'Imagen de usuario actualizada', 'success');

this.modalImagenService.nuevaImagen.emit(img);

      this.cerrarModal();
    }).catch(err =>{
      Swal.fire('Error', err.error.msg, 'error');
    })
  }



}
