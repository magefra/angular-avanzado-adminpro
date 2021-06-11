import { Component, OnInit, OnDestroy } from '@angular/core';
import { HospitalService } from '../../../services/hospital.service';
import { Hospital } from '../../../models/hospital.model';
import Swal from 'sweetalert2';
import { ModalImagenService } from '../../../services/modal-imagen.service';
import { Subscription } from 'rxjs';
import { delay } from 'rxjs/operators';
import { BusquedasService } from '../../../services/busquedas.service';

@Component({
  selector: 'app-hospitales',
  templateUrl: './hospitales.component.html',
  styleUrls: ['./hospitales.component.css']
})
export class HospitalesComponent implements OnInit,OnDestroy {


  public hospitales: Hospital[] = [];
  public cargando: boolean = true;
  public imgSubs: Subscription;


  constructor(private hospitalService: HospitalService,
              private modalImagenService: ModalImagenService,
              private busquedasService: BusquedasService) { }



  ngOnDestroy(): void {
    this.imgSubs.unsubscribe();
  }



  ngOnInit(): void {

    this.cargandoHospital();
    this.imgSubs = this.modalImagenService.nuevaImagen
        .pipe(
          delay(100)
        )
        .subscribe(img => this.cargandoHospital())

  }





  cargandoHospital(){
    this.cargando = true;

    this.hospitalService.cargarHospitales()
    .subscribe(hospitales =>{
      this.cargando = false;
      this.hospitales = hospitales;
    });
  }


  guardarCambios(hospital: Hospital){

    this.hospitalService.actualizarHospital(hospital._id, hospital.nombre)
    .subscribe(resp =>{
      Swal.fire('Actualizado', hospital.nombre,'success');
    })
  }


  eliminarCambios(hospital: Hospital){

    this.hospitalService.eliminarHospital(hospital._id)
    .subscribe(resp =>{
      this.cargandoHospital();
      Swal.fire('Borrado', hospital.nombre,'success');
    })
  }


 async abrirSweetAler(){
  const {value = ''} = await Swal.fire<string>({
    title: 'Crear hospital',
    text: 'Ingrese el nuevo hospital',
    input: 'text',
    inputPlaceholder: 'Nombre del hospital',
    showCancelButton: true,
  })

  if(value.trim().length > 0){
    this.hospitalService.crearHospital(value)
    .subscribe((resp: any) =>{
     this.hospitales.push(resp.hospital);
    })
  }


  }


  abrirModal(hospital: Hospital){

    this.modalImagenService.abrirModal('hospitales',hospital._id,hospital.img);
  }


  buscar(termino: string) {


    if (termino.length === 0) {
      return this.cargandoHospital;
    }

    this.busquedasService.buscar('hospitales', termino).subscribe((resp) => {
      this.hospitales = resp as Hospital[];
    });
  }
}
