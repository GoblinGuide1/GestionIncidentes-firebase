import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common'; // Importar Location
import { Asignacion, BitacoraCambioEstado, Incidencias } from '../models/interfaces';
import { AutheticaService } from '../authetica.service';
import { Router } from '@angular/router';
import { FirestorageService } from '../services/firestorage.service';
import { Observable } from 'rxjs';


@Component({
  selector: 'app-asig-incidencia',
  templateUrl: './asig-incidencia.page.html',
  styleUrls: ['./asig-incidencia.page.scss'],
})
export class AsigIncidenciaPage implements OnInit {
  incidencias: Incidencias[] = [];
  isFormValid: boolean = false;
  pressIdInci = '';
  idRiesgo: number = 0; 
  idAfectacion: number = 0; 
  idPrioridad: number = 0; 
  idCategoria: number = 0; 
  idEstado: number = 2; 
  users$: Observable<any[]>; // Observable para los usuarios
 idTecnico: number = 0;


 // se aplica referencia del objetivo
 newAsignacion: Asignacion = {

  ct_idAsigancion : "",
  ct_idIncidencia: "",
  cn_idUsuarioTce: NaN

}


// referencia al objeto  o interface
newBitacora: BitacoraCambioEstado = {
  cn_idBitacora: NaN,
  ct_idIncidencia: "",
  cf_fecha: this.getFormattedDate(),
  ch_hora: this.getFormattedTime(),
  ct_EstadoActual: "",
  ct_EstadoNuevo: "",
  ct_idUsuario: this.AutheticaService.currentUserId

}
//contructor, se declara la estructura de las bibliotecas a utilizar
  constructor( public AutheticaService: AutheticaService,
    private router: Router,
     public firestorageService: FirestorageService, private location: Location) { 
      this.users$ = new Observable<any[]>(); 
     }


     // metodos y variables que se inicializan al iniciarlizar este apartado
  ngOnInit() {
    this.users$ = this.AutheticaService.getUsersWithRole(4);
    this.AutheticaService.getTecnicoAsignacionesCount();
    this.newBitacora.ct_idUsuario= this.AutheticaService.getCurrentUserId();

  }
  // metodo que al ser llamada en el html devolvera al usuario a la ultima interface que entro
  goBack() {
    console.log("estoy volviendo")
    this.location.back();
    
  }
  
  // obtiene el valor del evento que recibe 
  handleChangeAfectacion(e :any) {
    this.idAfectacion = e.detail.value
    console.log('ionChange fired with value: ' + e.detail.value);
  }

  // obtiene el valor del evento que recibe 
  handleChangeRiesgo(e :any) {
    this.idRiesgo = e.detail.value
    console.log('ionChange fired with value: ' + e.detail.value);
  }

  // obtiene el valor del evento que recibe 
  handleChangePrioridad(e :any) {
    this.idRiesgo = e.detail.value
    console.log('ionChange fired with value: ' + e.detail.value);
  }

  // obtiene el valor del evento que recibe 
  handleChangeCaregoria(e : any){
    this.idCategoria = e.detail.value
    console.log('ionChange fired with value: ' + e.detail.value);

  }

  // obtiene el valor del evento que recibe 
  handleChangeEstado(e : any){
    this.idCategoria = e.detail.value
    console.log('ionChange fired with value: ' + e.detail.value);

  }

  // obtiene el valor del evento que recibe 
  handleChangeUsuario(e : any){
    this.idTecnico = e.detail.value
    console.log('ionChange fired with value: ' + e.detail.value);

  }

  // imprime un mensaje al recharzar la interaccion 
  handleCancel() {
    console.log('ionCancel fired');
  }

  // obtiene el valor del evento que recibe 
  handleDismiss() {
    console.log('ionDismiss fired');
  }


  // optiene la incidencia precionada
  public getIncidenciaId(incidencia: Incidencias) {
    this.AutheticaService.pressid = incidencia.idIncidencia;

    console.log("El ID del item es", this.AutheticaService.pressid);
  }
    // Método para editar incidencia
    editarIncidencia(incidenciaId: string) {
      // Aquí deberías tener los nuevos datos a actualizar
      const newData = {
        idAfectacion:  this.idAfectacion, 
        idCategoria: this.idAfectacion, 
        idEstado: this.idEstado, 
        idPrioridad: this.idPrioridad, 
        idRiesgo: this.idRiesgo
      
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

    // guarda la asignacion
    async guardarAsign(){
      this.AutheticaService.generateAsig().subscribe(async newAsigId=>{
        // se llaman los componentes del newAsignacion y se declaran los valores que se le asignaran
          this.newAsignacion.cn_idUsuarioTce = this.idTecnico;
          this.newAsignacion.ct_idAsigancion = newAsigId;
        //pressid variable que guarda el id de la incidencia presionado 
          this.newAsignacion.ct_idIncidencia = this.AutheticaService.pressid
          
          this.AutheticaService.createDoc(this.newAsignacion, 't_Asignacion', newAsigId).then(() => {
            console.log('asignacion creada con ID:', newAsigId);
            this.location.back();
          }).catch(error => {
            console.error('Error creando incidencia:', error);
          });
      })
    }

    //crea la bitacora
    async guardarBitacora(){
      const date = new Date();
      //llama el metodo para generar el id de la bitacora y los guarda en una variable
      this.AutheticaService.generateBitacoraId().subscribe(async newBitacora=>{
        // asignacion de valores a los coponentes de newBitacoras
        this.newBitacora.ct_EstadoActual = "Registrado"
        this.newBitacora.ct_EstadoNuevo = "Asignado"
        this.newBitacora.ct_idIncidencia = this.AutheticaService.pressid
        this.newBitacora.cn_idBitacora = parseInt(newBitacora);
          
          this.AutheticaService.createDoc(this.newBitacora, 't_bitacorasEstados', newBitacora).then(() => {
            console.log('asignacion creada con ID:', newBitacora);
          }).catch(error => {
            console.error('Error creando incidencia:', error);
          });
      })
    }

    // metodo que obtiene la fecha y le da un formato
  getFormattedDate(): string {
    const date = new Date();
    return date.toISOString().slice(0, 10);
  }
    // metrodo que obtiene la hora y le da un formato
  getFormattedTime(): string {
    const date = new Date();
    return date.toTimeString().slice(0, 5);
  }
}