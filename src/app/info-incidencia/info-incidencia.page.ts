import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common'; // Importar Location
import { Diagnosticos, Incidencias } from '../models/interfaces';
import { AutheticaService } from '../authetica.service';

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
      private location: Location) { }

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
  getEstadoDescriptivo(idEstado: number): string {
    switch (idEstado) {
      case 1:
        return 'Registrado';
      case 2:
        return 'Asignado';
      default:
        return 'Desconocido';
    }
  }

  
  selectIncidencia(incidencia: Incidencias): void {
    this.selectedIncidencia = incidencia;
  }

  closeDetalle(): void {
    this.selectedIncidencia = null;
  }










  goBack() {
    this.location.back();
  }
}
