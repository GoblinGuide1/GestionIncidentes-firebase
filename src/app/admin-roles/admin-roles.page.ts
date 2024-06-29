import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { Roles } from '../models/interfaces';
import { AutheticaService } from '../authetica.service';

@Component({
  selector: 'app-admin-roles',
  templateUrl: './admin-roles.page.html',
  styleUrls: ['./admin-roles.page.scss'],
})
export class AdminRolesPage implements OnInit {


  Roles: Roles[] = [];

  constructor(private alertController: AlertController,
    private autheticaService: AutheticaService
  ) { }

  ngOnInit() {
  this.getRoles();
  }
  // este metodo sirve para confirmar la eliminacion del rol 
  async presentAlertConfirm() {
    const alert = await this.alertController.create({
      header: 'Confirmar eliminación',
      message: '¿Estás seguro de que deseas eliminar este Rol?',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            console.log('Eliminar cancelado');
          }
        }, {
          text: 'Confirmar',
          handler: () => {
            console.log('Rol eliminado');
            this.deleteRole(this.autheticaService.pressidRol);
          }
        }
      ]
    });

    await alert.present();
  }
  // busca el rol por el id y  lo elimina
  deleteRole(id: number) {
    this.autheticaService.deleteRole(id).subscribe(() => {
      console.log('Rol eliminado de la base de datos');
      // Aquí puedes agregar lógica adicional para actualizar la vista, si es necesario
    }, error => {
      console.error('Error al eliminar el rol:', error);
    });
  }

  // obtiene todod los roles
  getRoles() {
    const enlace = 't_roles';
    this.autheticaService.getCollectionChanges<Roles>(enlace).subscribe(
      res => {
        console.log(res);
        this.Roles = res;
      }
    );
  }

// obtiene el rol seleccionado
  public getRolId(roles: Roles) {
    this.autheticaService.pressidRol = roles.cn_idRol;
    console.log("El ID del item es", this.autheticaService.pressidRol);
  }

}
