import { Component, OnInit } from '@angular/core';
import { BitacoraCambioEstado, Diagnosticos } from '../models/interfaces';
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

  // array que guarda los diagnosticos
  incidencias: Diagnosticos[] = [];
  isFormValid: boolean = false;
  idEstado = 3;// metodo que guarda un numero para fijar el estado
  
  //declaracion de bibliotecas a utilizar 
  constructor(public AutheticaService: AutheticaService,
     private router: Router,
      public firestorageService: FirestorageService,
      private location: Location
    ) { }

    // referencia interface con asignacion de valores 
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


    // referencia interface con asignacion de valores 
  newBitacora: BitacoraCambioEstado = {
    cn_idBitacora: NaN,
    ct_idIncidencia: "",
    cf_fecha: this.getFormattedDate(),
    ch_hora: this.getFormattedTime(),
    ct_EstadoActual: "",
    ct_EstadoNuevo: "",
    ct_idUsuario: ""
  
  }

  // valida que se han ingresado datos
  checkFormValidity() {
    this.isFormValid = this.newDiagnos.detalles.trim() !== '' &&
                       this.newDiagnos.comprar.trim() !== ''&&
                       this.newDiagnos.tiempoS > -1;
  }

  // metodo que ejecuta los datos o otros metodos al iniciarlizar esta page
  ngOnInit() {
    this.newDiagnos.idUsuario = this.AutheticaService.getCurrentUserId();
    this.newBitacora.ct_idUsuario= this.AutheticaService.getCurrentUserId();
  }


  // metodo encargado de crear los diagnosticos 
 async createDIagnos() {

  // genera el id de aidgnostico mediante un metodo y lo guarda en una variable
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
        this.editarIncidencia(this.AutheticaService.pressid);
        this.router.navigate(['/home']);
      }).catch(error => {
        console.error('Error creando el diagnostico:', error);
      });
    }
  });
 }
 editarIncidencia(incidenciaId: string) {
  // Aquí deberías tener los nuevos datos a actualizar
  const newData = {
    idEstado: this.idEstado
  
  };
  this.AutheticaService.updateIncidencia(incidenciaId, newData).subscribe(
    () => {
      console.log('Incidencia actualizada correctamente');
      // Aquí puedes realizar cualquier acción adicional después de la actualización
    },
    error => {
      console.error('Error al actualizar incidencia:', error);
      // Manejo de errores
    }
  );
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

  async guardarBitacora(){
    const date = new Date();
    this.AutheticaService.generateBitacoraId().subscribe(async newBitacora=>{
      this.newBitacora.ct_EstadoActual = "Asignado"
      this.newBitacora.ct_EstadoNuevo = "En revision"
      this.newBitacora.ct_idIncidencia = this.AutheticaService.pressid
      this.newBitacora.cn_idBitacora = parseInt(newBitacora);
        this.AutheticaService.createDoc(this.newBitacora, 't_bitacorasEstados', newBitacora).then(() => {
          console.log('asignacion creada con ID:', newBitacora);
        }).catch(error => {
          console.error('Error creando incidencia:', error);
        });
    })
  }


}
