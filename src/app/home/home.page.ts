import { AutheticaService } from './../authetica.service';
import { Incidencias } from './../models/interfaces';
import { Component,OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit  {

  userId: string | null = null;
  userRole: string | null = null;
  pressIdInci = '';
  nameUser: string | null = null;;
  incidencias: Incidencias[] = [];
  constructor(private AutheticaService: AutheticaService,private router: Router) {}

  ngOnInit() {
    this.getIncidencias();

    this.userId = this.AutheticaService.getCurrentUserId();
    console.log('Current User ID:', this.userId);

    this.userId = this.AutheticaService.getCurrentUserId();
    this.userRole = this.AutheticaService.getCurrentUserRole();
    this.AutheticaService.getUserName(this.userId).subscribe(userName => {
      this.nameUser = userName;

    });
  
    this.redirectUsuer();
    
    console.log('Current User ID:', this.userId);
    console.log('Current User Role:', this.userRole);
// investigar implementar local storage y guardas
  }
  
  //optiene las incidencias de la colleccion
  getIncidencias(){
    const enlace = 't_Incidencias';
    this.AutheticaService.getCollectionChanges<Incidencias>(enlace).subscribe(
      res => {
        console.log(res);
        this.incidencias = res;
      }
    )
  }
  redirectUsuer( ){
if (this.userId == "") {
  this.router.navigate(['/login']);
  //console.log("sexo");
}
  
  }

 public  getIncideniciaId(incidenicia : Incidencias){
   this.AutheticaService.pressid =incidenicia.idIncidencia;
   console.log("el id del item es",this.AutheticaService.pressid);

  }
}
