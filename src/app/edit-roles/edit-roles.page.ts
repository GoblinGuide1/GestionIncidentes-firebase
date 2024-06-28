import { Component, OnInit } from '@angular/core';
import { Roles } from '../models/interfaces';
import { AutheticaService } from '../authetica.service';
import { Router } from '@angular/router';
import { FirestorageService } from '../services/firestorage.service';
import { Location } from '@angular/common'; // Importar Location

@Component({
  selector: 'app-edit-roles',
  templateUrl: './edit-roles.page.html',
  styleUrls: ['./edit-roles.page.scss'],
})
export class EditRolesPage implements OnInit {
  Roles: Roles[] = [];
  ct_tipoRol = "";
  constructor( public AutheticaService: AutheticaService,
    private router: Router,
     public firestorageService: FirestorageService,
     private location: Location
     ) { }

  ngOnInit() {
    this.getRoles();
  }

  editarRoles(idRol: number) {
    // Aquí deberías tener los nuevos datos a actualizar
    const newData = {
      ct_tipoRol : this.ct_tipoRol
    
    };
    this.AutheticaService.updateRoles(idRol, newData).subscribe(
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

  getRoles() {
    const enlace = 't_roles';
    this.AutheticaService.getCollectionChanges<Roles>(enlace).subscribe(
      res => {
        console.log(res);
        this.Roles = res.filter(roles => roles.cn_idRol == this.AutheticaService.pressidRol);
      }
    );
  }
  goBack() {
    this.location.back();
  }
}
