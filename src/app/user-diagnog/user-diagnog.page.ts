import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { AutheticaService } from './../authetica.service';
import {  BitacoraCambioEstado, Diagnosticos, Incidencias } from './../models/interfaces';
import { Router } from '@angular/router';
import { Location } from '@angular/common'; // Importar Location

@Component({
  selector: 'app-user-diagnog',
  templateUrl: './user-diagnog.page.html',
  styleUrls: ['./user-diagnog.page.scss'],
})
export class UserDiagnogPage implements OnInit {
  diagnosticos: Diagnosticos[] = [];
  incidencias: Incidencias[] = [];
  Estados: string[] = [];

  userId = this.autheticaService.getCurrentUserId;
 

  newBitacora: BitacoraCambioEstado = {
    cn_idBitacora: NaN,
    ct_idIncidencia: "",
    cf_fecha: this.getFormattedDate(),
    ch_hora: this.getFormattedTime(),
    ct_EstadoActual: "",
    ct_EstadoNuevo: "",
    ct_idUsuario : this.autheticaService.currentUserId
  }
  
  constructor(private autheticaService: AutheticaService,
    private router: Router,
     private navController: NavController,
     private location: Location) { }

  ngOnInit() {
      this.getDiagnosticos();
    this.getIncidencias();
    this.newBitacora.ct_idUsuario= this.autheticaService.getCurrentUserId();

  }
  irpagina(){
    this.navController.navigateBack("login")
  }
  getDiagnosticos() {
    const enlace = 't_Diagnosticos';
    const userId = this.autheticaService.getCurrentUserId(); // Asumiendo que tienes un método para obtener el ID del usuario logueado
  
    this.autheticaService.getCollectionChanges<Diagnosticos>(enlace).subscribe(
      res => {
        // Filtrar diagnosticos creadas por el usuario logueado
        this.diagnosticos = res.filter(diagnostico => diagnostico.idUsuario === userId);
        console.log(this.diagnosticos);
      }
    );
  }

  getIncidencias() {
    const enlaceIncidencias = 't_Incidencias';
    const enlaceDiagnosticos = 't_Diagnosticos';
    
    // Obtener todas las incidencias
    this.autheticaService.getCollectionChanges<Incidencias>(enlaceIncidencias).subscribe(
      incidencias => {
        // Obtener todos los diagnósticos
        this.autheticaService.getCollectionChanges<Diagnosticos>(enlaceDiagnosticos).subscribe(
          diagnosticos => {
            const diagnosedIncidenciasIds = diagnosticos.map(diagnostico => diagnostico.idIncidencia);
            
            // Filtrar incidencias que tienen un diagnóstico
            this.incidencias = incidencias.filter(incidencia => diagnosedIncidenciasIds.includes(incidencia.idIncidencia));
            console.log(this.incidencias);
          }
        );
      }
    );
  }
  

  getEstadoDescriptivo(idEstado: number): string {
    switch (idEstado) {
      case 1:
        return 'Registrado';
      case 2:
        return 'Asignado';
        case 3:
          return 'En revision';
          case 4:
            return 'En reparacion';
            case 5:
              return 'Pendiente de compra';
                case 6:
                  return 'Terminado';
                  case 7:
                    return 'Aprobado';
                    case 8:
                      return 'Rechazado';
                      case 9:
                        return 'Cerrado';

      default:
        return 'Desconocido';
    }
  }


 handleChangeEstados(e :any, idIncidencia : string) {
  const selectedValue = e.detail.value;
  const newData = {

    idEstado: parseInt(selectedValue)
    
  };
  this.newBitacora.ct_idIncidencia = idIncidencia
  console.log(`idIncidencia: ${idIncidencia}, selectedValue: ${selectedValue}`);

  this.autheticaService.updateIncidencia(idIncidencia, newData).subscribe(
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

  async guardarBitacora(e : any, idEstado:number){
    const date = new Date();
    const selectedValue = e.detail.value;

    this.autheticaService.generateBitacoraId().subscribe(async newBitacora=>{
      this.newBitacora.ct_EstadoActual =   this.getEstadoDescriptivo(idEstado)
      this.newBitacora.ct_EstadoNuevo =  this.getEstadoDescriptivo(parseInt(selectedValue)) 
      this.newBitacora.cn_idBitacora = parseInt(newBitacora);
        
        this.autheticaService.createDoc(this.newBitacora, 't_bitacorasEstados', newBitacora).then(() => {
          console.log('asignacion creada con ID:', newBitacora);
        }).catch(error => {
          console.error('Error creando incidencia:', error);
        });
    })
  }

  goBack() {
    this.location.back();
  }



  // optiene la fecha y la hora le dan un formato y lo devulvel con un string
  getFormattedDate(): string {
    const date = new Date();
    return date.toISOString().slice(0, 10);
  }

  getFormattedTime(): string {
    const date = new Date();
    return date.toTimeString().slice(0, 5);
  }

}
