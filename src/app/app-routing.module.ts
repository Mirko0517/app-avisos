import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListaAvisosComponent } from './lista-avisos/lista-avisos.component';
import { CrearAvisosComponent } from './crear-avisos/crear-avisos.component';

const routes: Routes = [
  { path: '', redirectTo: '/lista-avisos', pathMatch: 'full' }, // Update the redirectTo value
  { path: 'lista-avisos', component: ListaAvisosComponent }, // Update the path here
  { path: 'crear-aviso', component: CrearAvisosComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
