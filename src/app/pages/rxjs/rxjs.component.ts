import { Component, OnDestroy, OnInit } from '@angular/core';
import { interval, Observable, Subscription } from 'rxjs';
import { filter, map, retry, take } from 'rxjs/operators';

@Component({
  selector: 'app-rxjs',
  templateUrl: './rxjs.component.html',
  styleUrls: ['./rxjs.component.css'],
})
export class RxjsComponent implements OnInit, OnDestroy {

  intervalSubs : Subscription;


  constructor() {
    this.intervalSubs = this.retornaIntervalo()
    .subscribe(
      (valor) => console.log(valor)
    );
  }
  ngOnDestroy(): void {
    this.intervalSubs.unsubscribe();
  }

  ngOnInit(): void {}

  retornaIntervalo(): Observable<number>  {
    return  interval(100)
        .pipe(

          map(valor => {
            return valor + 1
          }),
          filter(valor => (valor % 2 == 0) ? true: false ),

        );


  }

  retornaObservavle(): Observable<number> {
    let i = -1;

    const obs$ = new Observable<number>((observer) => {
      const intervalo = setInterval(() => {
        i++;
        observer.next(i);

        if (i === 4) {
          clearInterval(intervalo);
          observer.complete();
        }

        if (i === 2) {
          i = 0;
          observer.error('i llego al valor de 2');
        }
      }, 1000);
    });

    this.retornaObservavle()
      .pipe(retry(2))
      .subscribe(
        (valor) => console.log('Subs:', valor),
        (err) => console.warn('Error', err),
        () => console.info('Obs terminado')
      );

    return obs$;
  }
}
