import { Component, OnInit } from '@angular/core';
import { AutheticaService } from '../authetica.service';
import { Router } from '@angular/router';
import { FirestorageService } from '../services/firestorage.service';
import { BitacoraIncidencia, Incidencias } from '../models/interfaces';
import { Location } from '@angular/common'; // Importar Location

@Component({
  selector: 'app-create-incidencia',
  templateUrl: './create-incidencia.page.html',
  styleUrls: ['./create-incidencia.page.scss'],
})
export class CreateIncidenciaPage implements OnInit {
  newImage = '';
// array de referencia para las incidencias
  incidencias: Incidencias[] = [];
  newFIle = '';
  isFormValid: boolean = false;
  // referencia a la estructura del objeto de incidencias
  newIncidencias: Incidencias = {
    titulo: '',
    fecha: this.getFormattedDate(), // asignacion de valor de fecha
    hora: this.getFormattedTime(), // asignacion de valor hora
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

// contructor donde se declaran las bibliotecas a utilizar
  constructor(public AutheticaService: AutheticaService,
     private router: Router,
      public firestorageService: FirestorageService,
      private location: Location
    
    ) { }

    // esejecuta metodos o variables al iniciar
  ngOnInit() {
    this.newIncidencias.idUsuario = this.AutheticaService.getCurrentUserId();

  }

 // metodo que guarda la incidencia
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
      // valida que los datos hancido ingresado en elformularo
      if (this.isFormValid) {
        const path ='Incidencias';// ejemplo de ruta, no tiene utilidad
        const name =this.newIncidencias.titulo; // asigna el valor del titulo
        const res= await this.firestorageService.uploadImage(this.newFIle, path, name); // actualiza y sube la imagen
        this.newIncidencias.imagen = res;
        this.newIncidencias.idUsuario = this.newIncidencias.idUsuario;
        this.newIncidencias.idIncidencia = newIncidenceId;
        //crea el documento segun los datos asignados
        this.AutheticaService.createDoc(this.newIncidencias, 't_Incidencias', newIncidenceId).then(() => {
          console.log('Incidencia creada con ID:', newIncidenceId);
          this.router.navigate(['/home']);
        }).catch(error => {
          console.error('Error creando incidencia:', error);
        });
      }

    });
  }

// recibe el id estado para devolver su nombre
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
  // obtiene la fecha actual
  getFormattedDate(): string {
    const date = new Date();
    return date.toISOString().slice(0, 10);
  }


  // obtiene la hora actual
  getFormattedTime(): string {
    const date = new Date();
    return date.toTimeString().slice(0, 5);
  }


  // metodo que recibe un evento para actuzalizar la imagen
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
  
  // metodo que valorda que los datos se han ingresado
  checkFormValidity() {
    this.isFormValid = this.newIncidencias.titulo.trim() !== '' &&
                       this.newIncidencias.descripcion.trim() !== '' &&
                       this.newIncidencias.lugar.trim() !== '' &&
                       this.newIncidencias.imagen !== '';
  }

  // devuelve a la ultima interface visitada
  goBack() {
    this.location.back();
  }


}
