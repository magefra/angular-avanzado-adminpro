import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';


@Component({
  selector: 'app-incrementador',
  templateUrl: './incrementador.component.html',
  styleUrls: ['./incrementador.component.css']
})
export class IncrementadorComponent  implements OnInit {


  ngOnInit(): void {
   this.btnClass = `btn ${this.btnClass}`;
  }

  @Input() progreso: number = 40;
  @Input() btnClass: string = 'btn btn-primary';


  @Output() valorSalida : EventEmitter<number> = new EventEmitter();

  cambiarValor(valor :  number){

    if(this.progreso >= 100 && valor >= 0){
      this.valorSalida.emit(100);
      this.progreso = 100;
      return;
    }

    if(this.progreso <= 0 && valor < 0){
      this.valorSalida.emit(0);
      this.progreso = 0;
      return;
    }


    this.progreso = this.progreso + valor;

    this.valorSalida.emit(this.progreso );
  }

  onChange(nuevoValor: number){


    if(nuevoValor >= 100){
      this.progreso = 100;
    }
    else if(nuevoValor <= 0){
      this.progreso = 0;
    }else{
      this.progreso = nuevoValor;
    }



    this.valorSalida.emit(this.progreso );
  }

}
