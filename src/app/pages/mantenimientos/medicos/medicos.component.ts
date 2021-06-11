import { Component, OnInit } from '@angular/core';
import { Medico } from '../../../models/medico.mode';
import { MedicoService } from '../../../services/medico.service';
import { ModalImagenService } from '../../../services/modal-imagen.service';

@Component({
  selector: 'app-medicos',
  templateUrl: './medicos.component.html',
  styleUrls: ['./medicos.component.css']
})
export class MedicosComponent implements OnInit {


  public medicos: Medico[] = [];
  public cargando: boolean = true;


  constructor(private medicoService: MedicoService,
              private modalImagenService: ModalImagenService ) { }

  ngOnInit(): void {

    this.cargandoMedicos();
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
}
