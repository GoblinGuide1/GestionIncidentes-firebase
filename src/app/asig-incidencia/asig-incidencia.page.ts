import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common'; // Importar Location
import { Asignacion, Incidencias } from '../models/interfaces';
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

 newAsignacion: Asignacion = {

  ct_idAsigancion : "",
  ct_idIncidencia: "",
  cn_idUsuarioTce: NaN

}

  constructor( public AutheticaService: AutheticaService,
    private router: Router,
     public firestorageService: FirestorageService, private location: Location) { 
      this.users$ = new Observable<any[]>(); 
     }

  ngOnInit() {
    this.users$ = this.AutheticaService.getUsersWithRole(4);
    this.AutheticaService.getTecnicoAsignacionesCount();
  }
  goBack() {
    this.location.back();
  }
  
  handleChangeAfectacion(e :any) {
    this.idAfectacion = e.detail.value
    console.log('ionChange fired with value: ' + e.detail.value);
  }
  handleChangeRiesgo(e :any) {
    this.idRiesgo = e.detail.value
    console.log('ionChange fired with value: ' + e.detail.value);
  }
  handleChangePrioridad(e :any) {
    this.idRiesgo = e.detail.value
    console.log('ionChange fired with value: ' + e.detail.value);
  }
  handleChangeCaregoria(e : any){
    this.idCategoria = e.detail.value
    console.log('ionChange fired with value: ' + e.detail.value);

  }
  handleChangeEstado(e : any){
    this.idCategoria = e.detail.value
    console.log('ionChange fired with value: ' + e.detail.value);

  }
  handleChangeUsuario(e : any){
    this.idTecnico = e.detail.value
    console.log('ionChange fired with value: ' + e.detail.value);

  }
  handleCancel() {
    console.log('ionCancel fired');
  }

  handleDismiss() {
    console.log('ionDismiss fired');
  }

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

    async guardarAsign(){
      this.AutheticaService.generateAsig().subscribe(async newAsigId=>{
          this.newAsignacion.cn_idUsuarioTce = this.idTecnico;
          this.newAsignacion.ct_idAsigancion = newAsigId;
          this.newAsignacion.ct_idIncidencia = this.AutheticaService.pressid
          
          this.AutheticaService.createDoc(this.newAsignacion, 't_Asignacion', newAsigId).then(() => {
            console.log('asignacion creada con ID:', newAsigId);
            this.location.back();
          }).catch(error => {
            console.error('Error creando incidencia:', error);
          });
      })
    }
}