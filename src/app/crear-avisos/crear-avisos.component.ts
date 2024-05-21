import { Component, OnInit } from '@angular/core';
import { AvisosService } from '../service/avisos.service';
import { Aviso } from '../models/aviso.model';
import { CameraResultType, Camera } from "@capacitor/camera";
import { IonicModule } from "@ionic/angular";
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import { NgIf, NgOptimizedImage } from "@angular/common";
import { Router } from "@angular/router";

@Component({
  selector: 'app-crear-avisos',
  templateUrl: './crear-avisos.component.html',
  styleUrls: ['./crear-avisos.component.scss'],
  imports: [
    IonicModule,
    FormsModule,
    NgIf,
    NgOptimizedImage,
    ReactiveFormsModule
  ],
  standalone: true,
})
export class CrearAvisosComponent implements OnInit {
  avisoForm: FormGroup;

  constructor(private avisosService: AvisosService, private router: Router, private formBuilder: FormBuilder) {
    this.avisoForm = this.formBuilder.group({
      titulo: ['', [Validators.required, Validators.minLength(5)]],
      descripcion: ['', [Validators.required, Validators.minLength(20)]],
      fecha: ['', Validators.required],
      foto: ['', Validators.required]
    });
    // Inicializa aviso aquí si es necesario para otros propósitos, pero no es necesario para el manejo de la foto
  }

  ngOnInit() {}

  crearAviso() {
    if (this.avisoForm.valid) {
      const avisoValue = this.avisoForm.value;
      avisoValue.fecha = new Date(avisoValue.fecha); // Asegurar que la fecha es un objeto Date
      this.avisosService.agregarAviso(avisoValue);
      this.router.navigate(['./lista-avisos']);
    } else {
      console.error('El formulario no es válido');
    }
  }

  async tomarFoto() {
    try {
      const image = await Camera.getPhoto({
        quality: 90,
        allowEditing: false,
        resultType: CameraResultType.Uri
      });
      this.avisoForm.patchValue({ foto: image.webPath });
    } catch (error) {
      console.error('Error al tomar la foto:', error);
    }
  }
}
