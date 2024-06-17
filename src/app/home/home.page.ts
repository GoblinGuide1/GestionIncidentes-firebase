import { NavController } from '@ionic/angular';
import { AutheticaService } from './../authetica.service';
import { Incidencias } from './../models/interfaces';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

  userId: string | null = null;
  userRoles: string[] = [];
  pressIdInci = '';
  nameUser: string | null = null;
  incidencias: Incidencias[] = [];
  typeRol = "";
  

  constructor(private autheticaService: AutheticaService,
     private router: Router,
      private navController: NavController) {}

  ngOnInit() {
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
    this.autheticaService.asigRoles(parseInt(this.userId))
    //this.asigRoles(this.userRole)
    console.log('Current User ID:', this.userId);
    console.log('Current User Role:', this.userRoles);
  }

    irpagina(){
      this.navController.navigateBack("login")
    }
  getIncidencias() {
    const enlace = 't_Incidencias';
    this.autheticaService.getCollectionChanges<Incidencias>(enlace).subscribe(
      res => {
        console.log(res);
        this.incidencias = res;
      }
    );
  }

  redirectUser() {
    if (!this.userId) {
      this.router.navigate(['/login']);
    }
  }

  public getIncidenciaId(incidencia: Incidencias) {
    this.autheticaService.pressid = incidencia.idIncidencia;
    console.log("El ID del item es", this.autheticaService.pressid);
  }

  hasRole(roles: string[]): boolean {
    return roles.some(role => this.userRoles.includes(role));
  }
   
}
