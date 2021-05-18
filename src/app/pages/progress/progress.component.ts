import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-progress',
  templateUrl: './progress.component.html',
  styleUrls: ['./progress.component.css']
})
export class ProgressComponent  {





  progreso1: number = 25;
  progreso2: number = 50;


  get getProgreso1(){
    let i = `${this.progreso1}%`;

    console.log(i);
    return i;
  }

  get getProgreso2(){
    return `${this.progreso2}%`;
  }



  cambioValorHijo(valor: number){
   this.progreso1 = valor;
  }

}
