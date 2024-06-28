import { Component, OnInit } from '@angular/core';
import { AutheticaService } from '../authetica.service';
import { Router } from '@angular/router';
import { Roles } from '../models/interfaces';
import { Location } from '@angular/common'; // Importar Location


@Component({
  selector: 'app-create-roles',
  templateUrl: './create-roles.page.html',
  styleUrls: ['./create-roles.page.scss'],
})
export class CreateRolesPage implements OnInit {
  isFormValid: boolean = false;
  newRoles: Roles = {
    cn_idRol: 0,
    ct_tipoRol :''
  }
  constructor(public AutheticaService: AutheticaService,
    private router: Router,
    private location: Location
  ) { }

  ngOnInit() {

  }

  async GurardarRoles() {
    this.AutheticaService.generateRolesId().subscribe(async lastdiagnosceId => {
      if (this.isFormValid) {
        const path ='t_roles';
        const name =this.newRoles.ct_tipoRol;
        this.newRoles.cn_idRol = parseInt(lastdiagnosceId)
        this.AutheticaService.createDoc(this.newRoles, 't_roles', lastdiagnosceId).then(() => {
          console.log('Estado creado con ID:', lastdiagnosceId);
          this.router.navigate(['/home']);
        }).catch(error => {
          console.error('Error creando incidencia:', error);
        });
      }

    });
  }

  checkFormValidity() {
    this.isFormValid = this.newRoles.ct_tipoRol.trim() !== '';

  }
  goBack() {
    this.location.back();
  }

}
