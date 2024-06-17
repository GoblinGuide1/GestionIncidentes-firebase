import { Component, OnInit } from '@angular/core';
import { Diagnosticos } from '../models/interfaces';
import { AutheticaService } from '../authetica.service';
import { Router } from '@angular/router';
import { FirestorageService } from '../services/firestorage.service';
import { Location } from '@angular/common'; // Importar Location

@Component({
  selector: 'app-diagnos-incidencia',
  templateUrl: './diagnos-incidencia.page.html',
  styleUrls: ['./diagnos-incidencia.page.scss'],
})
export class DiagnosIncidenciaPage implements OnInit {

  incidencias: Diagnosticos[] = [];
  isFormValid: boolean = false;
  constructor(public AutheticaService: AutheticaService,
     private router: Router,
      public firestorageService: FirestorageService,
      private location: Location
    ) { }
  newDiagnos: Diagnosticos = {
    idUsuario: '',
    fecha: this.getFormattedDate(),
    hora: this.getFormattedTime(),
    detalles: '',
    comprar: '',
    tiempoS: 0,
    idIncidencia: '',
    idDiagnostico: '',

  }
  checkFormValidity() {
    this.isFormValid = this.newDiagnos.detalles.trim() !== '' &&
                       this.newDiagnos.comprar.trim() !== ''&&
                       this.newDiagnos.tiempoS > -1;
  }
  ngOnInit() {
    this.newDiagnos.idUsuario = this.AutheticaService.getCurrentUserId();

  }

 async createDIagnos() {

    this.AutheticaService.generateDiagnosId().subscribe(async newdiagnosId => {

      const path ='Diagnosticos';
      const name1 =this.newDiagnos.detalles;
      const name2 =this.newDiagnos.comprar;
      const name3 =this.newDiagnos.tiempoS;
      this.newDiagnos.idUsuario = this.newDiagnos.idUsuario;
      this.newDiagnos.idDiagnostico = newdiagnosId;
      this.newDiagnos.idIncidencia = this.AutheticaService.pressid;
      if (this.isFormValid) {
      this.AutheticaService.createDoc(this.newDiagnos, 't_Diagnosticos', newdiagnosId).then(() => {
        console.log('diagnostico creado con ID:', newdiagnosId);
        this.router.navigate(['/home']);
      }).catch(error => {
        console.error('Error creando el diagnostico:', error);
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
  goBack() {
    this.location.back();
  }

}
