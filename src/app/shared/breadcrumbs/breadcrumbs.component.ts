import { Component, OnDestroy } from '@angular/core';
import { ActivationEnd, Router } from '@angular/router';
import { filter, map } from 'rxjs/operators';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-breadcrumbs',
  templateUrl: './breadcrumbs.component.html',
  styleUrls: ['./breadcrumbs.component.css'],
})
export class BreadcrumbsComponent implements OnDestroy{
  public titulo: string = '';
  public tituloSub$: Subscription;

  constructor(private router: Router) {
    this.tituloSub$ = this.getArgumentosRuta().subscribe((data) => {
      this.titulo = data.titulo;
      document.title = data.titulo;
    });
  }
  ngOnDestroy(): void {
    this.tituloSub$.unsubscribe();
  }

  getArgumentosRuta() {
    return this.router.events.pipe(
      filter((event) => event instanceof ActivationEnd),
      filter((event: ActivationEnd) => event.snapshot.firstChild === null),
      map((event: ActivationEnd) => event.snapshot.data)
    );
  }
}
