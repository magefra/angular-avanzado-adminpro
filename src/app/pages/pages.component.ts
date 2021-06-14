import { Component, OnInit } from '@angular/core';
import { SettingsService } from '../services/settings.service';
import { SidebarService } from '../services/sidebar.service';


declare function customInitFuncions();


@Component({
  selector: 'app-pages',
  templateUrl: './pages.component.html',
  styles: [
  ]
})
export class PagesComponent implements OnInit {

  public linkTheme = document.querySelector('#theme');


  constructor(private settingsService: SettingsService,
              private  sidebaService: SidebarService) {
              }

  ngOnInit(): void {


    customInitFuncions();
    this.sidebaService.cargarMenu();


  }

}
