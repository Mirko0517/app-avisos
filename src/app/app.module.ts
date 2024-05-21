import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms'; // Importa ReactiveFormsModule
import { AppComponent } from './app.component';
import { CrearAvisosComponent } from './crear-avisos/crear-avisos.component';
import { IonicModule } from "@ionic/angular";
import { AppRoutingModule } from './app-routing.module';

@NgModule({
  declarations: [
    AppComponent,

  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    CrearAvisosComponent

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
