import { Component, OnInit } from '@angular/core';
import { AutheticaService } from '../authetica.service';
import { Router } from '@angular/router';
import { FirestorageService } from '../services/firestorage.service';
import { Incidencias } from '../models/interfaces';
import { Location } from '@angular/common'; // Importar Location

@Component({
  selector: 'app-create-incidencia',
  templateUrl: './create-incidencia.page.html',
  styleUrls: ['./create-incidencia.page.scss'],
})
export class CreateIncidenciaPage implements OnInit {
  newImage = '';

  incidencias: Incidencias[] = [];
  newFIle = '';
  isFormValid: boolean = false;
  newIncidencias: Incidencias = {
    titulo: '',
    fecha: this.getFormattedDate(),
    hora: this.getFormattedTime(),
    idUsuario: '',
    descripcion: '',
    lugar: '',
    imagen: '',
    idIncidencia: '',
    idEstado: 1,
    justificacionCirre: '',
    idPrioridad: NaN,
    idRiesgo: NaN,
    idAfectacion: NaN,
    idCategoria: NaN,
    obsevaciones: '',
    idBitacora: NaN,
  }
  constructor(public AutheticaService: AutheticaService,
     private router: Router,
      public firestorageService: FirestorageService,
      private location: Location
    
    ) { }

  ngOnInit() {
    this.newIncidencias.idUsuario = this.AutheticaService.getCurrentUserId();
  }

 async GuardarIncidencia() {
    this.AutheticaService.generateIncidenceId().subscribe(async newIncidenceId => {
      /*const data = {
        titulo: this.titulo,
        fecha: this.getFormattedDate(),
        hora: this.getFormattedTime(),
        idUsuario: this.userId,
        descripcion: this.descripcion,
        lugar: this.lugar,
        imagen: this.imagen,
        idIncidencia: newIncidenceId,
      };*/
      if (this.isFormValid) {
        const path ='Incidencias';
        const name =this.newIncidencias.titulo;
        const res= await this.firestorageService.uploadImage(this.newFIle, path, name);
        this.newIncidencias.imagen = res;
        this.newIncidencias.idUsuario = this.newIncidencias.idUsuario;
        this.newIncidencias.idIncidencia = newIncidenceId;
        this.AutheticaService.createDoc(this.newIncidencias, 't_Incidencias', newIncidenceId).then(() => {
          console.log('Incidencia creada con ID:', newIncidenceId);
          this.router.navigate(['/home']);
        }).catch(error => {
          console.error('Error creando incidencia:', error);
        });
      }

    });
  }


  getFormattedDate(): string {
    const date = new Date();
    return date.toISOString().slice(0, 10);
  }

  getFormattedTime(): string {
    const date = new Date();
    return date.toTimeString().slice(0, 5);
  }

  async newImagenesUpload(event: any) {
    if (event.target.files && event.target.files[0]) {
      this.newFIle = event.target.files[0];
      const reader = new FileReader();
      reader.onload = (event: ProgressEvent<FileReader>) => {
        if (event.target) {
          this.newImage = event.target.result as string;
          this.checkFormValidity();
        }
      };
      reader.readAsDataURL(event.target.files[0]);
    }

  }
  
  checkFormValidity() {
    this.isFormValid = this.newIncidencias.titulo.trim() !== '' &&
                       this.newIncidencias.descripcion.trim() !== '' &&
                       this.newIncidencias.lugar.trim() !== '' &&
                       this.newIncidencias.imagen !== '';
  }
  goBack() {
    this.location.back();
  }
}
