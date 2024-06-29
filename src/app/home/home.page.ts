import { NavController } from '@ionic/angular';
import { AutheticaService } from './../authetica.service';
import { Asignacion, Incidencias } from './../models/interfaces';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

  userId= '';
  userRoles: string[] = [];
  pressIdInci = '';
  nameUser: string | null = null;
  incidencias: Incidencias[] = [];
  typeRol = "";
  incidenciasAsig: Incidencias[] = [];
  incidenciasT: Incidencias[] = [];
  incidenciasUser: Incidencias[] = [];


  

  constructor(private autheticaService: AutheticaService,
     private router: Router,
      private navController: NavController,
    ) {}

  ngOnInit() {
    this.getIncidenciasUsuario();
    this.getIncidenciasAsig();
    this.getIncidenciasTerminadas();
    this.getIncidencias();
    // Recuperar datos de localStorage
    this.userId = this.autheticaService.getCurrentUserId();
    
    this.nameUser = localStorage.getItem('userName');

    this.autheticaService.asigRoles(parseInt(this.userId)).subscribe(roles => {
      this.userRoles = roles;
    });
  
    
    if (this.userId) {
      this.autheticaService.getUserName(this.userId).subscribe(userName => {
        this.nameUser = userName;
      });
    }

    this.redirectUser();
    //this.autheticaService.asigRoles(parseInt(this.userId))
    //this.asigRoles(this.userRole)
    console.log('Current User ID:', this.userId);
    console.log('Current User Role:', this.userRoles);
  }

    irpagina(){
      this.navController.navigateBack("login")
    }
  getIncidencias() { //optiene todas las incidencias
    const enlace = 't_Incidencias';
    this.autheticaService.getCollectionChanges<Incidencias>(enlace).subscribe(
      res => {
        console.log(res);
        this.incidencias = res;
      }
    );
  }

  getIncidenciasAsig() { //optiene todas las incidencias asignadas a un tecnico
    const enlaceIncidencias = 't_Incidencias';
    const enlaceAsignacion = 't_Asignacion';
    const userId = this.userId; // Asumiendo que tienes un método para obtener el ID del usuario logueado
  
    // Obtener todas las asignaciones para el usuario logueado
    this.autheticaService.getCollectionChanges<Asignacion>(enlaceAsignacion).subscribe(
      asignaciones => {
        const assignedIncidenciasIds = asignaciones
          .filter(asignacion => asignacion.cn_idUsuarioTce == parseInt(this.userId) )
          .map(asignacion => asignacion.ct_idIncidencia);
  
        // Obtener todas las incidencias
        this.autheticaService.getCollectionChanges<Incidencias>(enlaceIncidencias).subscribe(
          incidencias => {
            // Filtrar las incidencias basadas en las asignaciones
            this.incidenciasAsig = incidencias.filter(incidencia => assignedIncidenciasIds.includes(incidencia.idIncidencia));
            console.log(this.incidenciasAsig);
          }
        );
      }
    );
  }

  redirectUser() { // metodo para redirigir al login 
    if (!this.userId) {
      this.router.navigate(['/login']);
    }
  }

  public getIncidenciaId(incidencia: Incidencias) { //optiene el id de la incidencia seleccionada
    this.autheticaService.pressid = incidencia.idIncidencia;
    console.log("El ID del item es", this.autheticaService.pressid);
  }

  hasRole(roles: string[]): boolean {
    return roles.some(role => this.userRoles.includes(role));
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

   

  getIncidenciasTerminadas() {
    const enlace = 't_Incidencias';
    const estadoTerminado = 6; // Suponiendo que el estado de "Terminado" es 6
  
    this.autheticaService.getCollectionChanges<Incidencias>(enlace).subscribe(
      res => {
        // Filtrar las incidencias que tienen el estado de "Terminado"
        this.incidenciasT = res.filter(incidencia => incidencia.idEstado === estadoTerminado);
        console.log(this.incidenciasT);
      }
    );
  }

  getIncidenciasUsuario() { //optiene las incidencias registradas por un usuario
    const enlace = 't_Incidencias';
  
    this.autheticaService.getCollectionChanges<Incidencias>(enlace).subscribe(
      res => {
        console.log("el suario es "+this.userId)
        // Filtrar las incidencias que tienen el estado de "Terminado"
        this.incidenciasUser = res.filter(incidencia => incidencia.idUsuario === this.userId);
          console.log(this.incidenciasUser);
      }
    );
  }

  verDetalles(incidencia: Incidencias) {
    this.navController.navigateForward('/incidencia-detalle', {
      queryParams: { incidencia: JSON.stringify(incidencia) }
    });
  }
  isIncidenciaCerrada(incidencia: Incidencias): boolean {
    return incidencia.idEstado === 9 ; // 9 es cerrado
  }
}
