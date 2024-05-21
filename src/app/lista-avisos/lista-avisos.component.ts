import { Component, OnInit } from '@angular/core';
import { AvisosService } from '../service/avisos.service';
import { Aviso } from '../models/aviso.model';
import { IonicModule } from "@ionic/angular";
import { FormatoFechaPipe} from "../pipes/formato-fecha.pipe";
import { CommonModule} from "@angular/common";
import { Router } from '@angular/router';
import { DatabaseService } from '../service/database.service';

@Component({
  selector: 'app-lista-avisos',
  templateUrl: './lista-avisos.component.html',
  styleUrls: ['./lista-avisos.component.scss'],
  imports: [
    IonicModule, FormatoFechaPipe, CommonModule
  ],
  standalone: true,
})
export class ListaAvisosComponent  implements OnInit {
  [x: string]: any;
  avisos: Aviso[] = [];
  constructor(private avisosService: AvisosService, private router: Router, private databaseService: DatabaseService) { }

  ngOnInit() {
    this.avisos = this.avisosService.obtenerAvisos();
  }

  navegarACrearAviso() {
    this.router.navigate(['/crear-aviso']);
  }
  async borrarAviso(id: number) {
  await this.databaseService.eliminarAviso(id);
  this.avisos = await this.databaseService.obtenerAvisos();
}

}
