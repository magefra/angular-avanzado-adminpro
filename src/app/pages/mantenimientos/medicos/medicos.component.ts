import { Component, OnInit, OnDestroy } from '@angular/core';
import { Medico } from '../../../models/medico.mode';
import { MedicoService } from '../../../services/medico.service';
import { ModalImagenService } from '../../../services/modal-imagen.service';
import { BusquedasService } from '../../../services/busquedas.service';
import { Subscription } from 'rxjs';
import { delay } from 'rxjs/operators';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-medicos',
  templateUrl: './medicos.component.html',
  styleUrls: ['./medicos.component.css']
})
export class MedicosComponent implements OnInit, OnDestroy {


  public medicos: Medico[] = [];
  public cargando: boolean = true;
  public imgSubs: Subscription;

  constructor(private medicoService: MedicoService,
              private modalImagenService: ModalImagenService,
              private busquedasService: BusquedasService ) { }




  ngOnDestroy(): void {
    this.imgSubs.unsubscribe();
  }

  ngOnInit(): void {

    this.cargandoMedicos();


    this.imgSubs = this.modalImagenService.nuevaImagen
        .pipe(
          delay(100)
        )
        .subscribe(img => this.cargandoMedicos())
  }




  cargandoMedicos(){
    this.cargando = true;

    this.medicoService.cargarMedicos()
    .subscribe(medicos =>{
      this.cargando = false;

      console.log(medicos);
      this.medicos = medicos;
    });
  }

  abrirModal(medico: Medico){

    this.modalImagenService.abrirModal('medicos',medico._id,medico.img);
  }

  buscar(termino: string) {


    if (termino.length === 0) {
      return this.cargandoMedicos;
    }

    this.busquedasService.buscar('medicos', termino).subscribe((resp) => {
      this.medicos = resp as Medico[];
    });
  }



  borrarMedico(medico: Medico){

    Swal.fire({
      title: '¿Deseas borrar el médico',
      text: 'Está apunto de borrar el médico',
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Si, borrarlo',
    }).then((result) => {
      if (result.isConfirmed) {
        this.medicoService.eliminarMedico(medico._id).subscribe((resp) => {
          this.cargandoMedicos();
          Swal.fire(
            'Médico eliminado',
            `${medico.nombre} fue eliminado correctamente`,
            'success'
          );
        });
      }
    });
  }
}
