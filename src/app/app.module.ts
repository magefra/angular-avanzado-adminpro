import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { NopagefoundComponent } from './nopagefound/nopagefound.component';
import { AppRoutingModule } from './app-routing.module';
import { PagesModule } from './pages/pages.module';





@NgModule({
  declarations: [
    AppComponent,

    NopagefoundComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    PagesModule,


  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
