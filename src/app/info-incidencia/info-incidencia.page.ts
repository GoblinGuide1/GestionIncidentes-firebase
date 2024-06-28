import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common'; // Importar Location
import { Diagnosticos, Incidencias } from '../models/interfaces';
import { AutheticaService } from '../authetica.service';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-info-incidencia',
  templateUrl: './info-incidencia.page.html',
  styleUrls: ['./info-incidencia.page.scss'],
})
export class InfoIncidenciaPage implements OnInit {
  incidencias: Incidencias[] = [];
 diagnosticos: Diagnosticos[] = [];

  selectedIncidencia: Incidencias | null = null;

  constructor( private autheticaService: AutheticaService,  
      private location: Location,
      private alertController: AlertController) { }

  ngOnInit() {
    this.getIncidencias();
    this.getIncidenciasDiagnos();
  }


  getIncidencias() {
    const enlace = 't_Incidencias';
    const idIncidencia = this.autheticaService.pressid; // Suponiendo que el estado de "Terminado" es 3
    console.log(idIncidencia);

    this.autheticaService.getCollectionChanges<Incidencias>(enlace).subscribe(
      res => {
        // Filtrar las incidencias que tienen el estado de "Terminado"
        this.incidencias = res.filter(incidencia =>
           incidencia.idIncidencia === idIncidencia);
        console.log(this.incidencias);
      }
    );
  }
  getIncidenciasDiagnos() {
    const enlace = 't_Diagnosticos';
  
    this.autheticaService.getCollectionChanges<Diagnosticos>(enlace).subscribe(
      res => {
        console.log("el diagnostico es"+this.autheticaService.pressid)
        // Filtrar las incidencias que tienen el estado de "Terminado"
        this.diagnosticos = res.filter(diagnostico => diagnostico.idIncidencia === this.autheticaService.pressid);
          console.log(this.diagnosticos);
      }
    );
  }


  
  selectIncidencia(incidencia: Incidencias): void {
    this.selectedIncidencia = incidencia;
  }

  closeDetalle(): void {
    this.selectedIncidencia = null;
  }





  updateEstado(idIncidencia: string, estado: number) {
    this.autheticaService.updateIncidenciaEstado(idIncidencia, estado).subscribe(() => {
      console.log(`Incidencia ${idIncidencia} actualizada a estado ${estado}`);
      this.getIncidencias(); // Vuelve a cargar las incidencias después de la actualización
    }, error => {
      console.error('Error al actualizar el estado de la incidencia:', error);
    });
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
  // Métodos para manejar los clics de los botones
  cerrarIncidencia(incidencia: Incidencias, justificacion: string) {
    incidencia.justificacionCirre = justificacion;
    incidencia.idEstado = 9; // Suponiendo que 7 es el estado de "Cerrado"
    this.autheticaService.updateIncidencia(incidencia.idIncidencia, { justificacionCirre: justificacion, idEstado: 7 }).subscribe(() => {
      console.log(`Incidencia ${incidencia.idIncidencia} cerrada con justificación: ${justificacion}`);
      this.getIncidencias(); // Vuelve a cargar las incidencias después de la actualización
    }, error => {
      console.error('Error al cerrar la incidencia:', error);
    });
  }


  async presentCerrarIncidenciaAlert(incidencia: Incidencias) {
    const alert = await this.alertController.create({
      header: 'Cerrar Incidencia',
      inputs: [
        {
          name: 'justificacion',
          type: 'text',
          placeholder: 'Justificación de cierre'
        }
      ],
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            console.log('Cierre cancelado');
          }
        },
        {
          text: 'Aceptar',
          handler: (data) => {
            this.cerrarIncidencia(incidencia, data.justificacion);
            this.goBack();
          }
        }
      ]
    });

    await alert.present();
  }

  async presentRechazarIncidenciaAlert(incidencia: Incidencias) {
    const alert = await this.alertController.create({
      header: 'Confirmar rechazo',
      message: '¿Estás seguro de que deseas rechazar esta incidencia?',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            console.log('Rechazo cancelado');
          }
        },
        {
          text: 'Aceptar',
          handler: () => {
            this.rechazarIncidencia(incidencia);
          }
        }
      ]
    });

    await alert.present();
  }
  rechazarIncidencia(incidencia: Incidencias) {
    this.updateEstado(incidencia.idIncidencia, 8); // Suponiendo que 8 es el estado de "Rechazado"
  }

  isIncidenciaCerrada(incidencia: Incidencias): boolean {
    return incidencia.idEstado === 9 || incidencia.idEstado === 8; // 9 es cerrado, 8 es rechazado
  }

  goBack() {
    this.location.back();
  }
}
