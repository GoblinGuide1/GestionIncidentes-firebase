import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common'; // Importar Location
import { Incidencias } from '../models/interfaces';
import { AutheticaService } from '../authetica.service';
import { Router } from '@angular/router';
import { FirestorageService } from '../services/firestorage.service';


@Component({
  selector: 'app-asig-incidencia',
  templateUrl: './asig-incidencia.page.html',
  styleUrls: ['./asig-incidencia.page.scss'],
})
export class AsigIncidenciaPage implements OnInit {
  incidencias: Incidencias[] = [];
  isFormValid: boolean = false;
  pressIdInci = '';

  constructor( public AutheticaService: AutheticaService,
    private router: Router,
     public firestorageService: FirestorageService, private location: Location) { }

  ngOnInit() {
  }
  goBack() {
    this.location.back();
  }

  public getIncidenciaId(incidencia: Incidencias) {
    this.AutheticaService.pressid = incidencia.idIncidencia;
    console.log("El ID del item es", this.AutheticaService.pressid);
  }
    // Método para editar incidencia
    editarIncidencia(incidenciaId: string) {
      // Aquí deberías tener los nuevos datos a actualizar
      const newData = {
        idAfectacion: 1, // Ejemplo de nuevo valor
        idCategoria: 1, // Ejemplo de nuevo valor
        idEstado: 1, // Ejemplo de nuevo valor
        idPrioridad: 1, // Ejemplo de nuevo valor
        idRiesgo: 1// Ejemplo de nuevo valor
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
}