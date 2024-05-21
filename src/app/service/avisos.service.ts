import { Injectable } from '@angular/core';
import { Aviso } from '../models/aviso.model';

@Injectable({
  providedIn: 'root'
})
export class AvisosService {
  private avisos: Aviso[] = [];

  constructor() { }

  agregarAviso(aviso: Aviso) {
    this.avisos.push(aviso);
  }

  obtenerAvisos(): Aviso[] {
    return this.avisos;
  }

  eliminarAviso(aviso: Aviso) {
    this.avisos = this.avisos.filter(a => a !== aviso);
  }

  actualizarAviso(aviso: Aviso, index: number) {
    this.avisos[index] = aviso;
  }
}
