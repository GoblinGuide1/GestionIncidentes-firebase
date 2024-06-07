// src/app/pages/login/login.page.ts
import { Component } from '@angular/core';
import { AutheticaService } from '../authetica.service';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage {
  email: string = '';
  password: string = '';

  constructor(private AutheticaService: AutheticaService, private router: Router, private alertController: AlertController) {}

 async login() {
    this.AutheticaService.login(this.email, this.password).subscribe(async result => {
      if (result.success) {
        console.log('Login successful:', result.data);
        console.log('User ID:', this.AutheticaService.getCurrentUserId());

        const userId = this.AutheticaService.getCurrentUserId();
        if (userId) {
          this.AutheticaService.getUserRole(userId).subscribe(cn_idRol => {
            console.log('User role:', cn_idRol);
            // Navegar a la página de inicio
            this.router.navigate(['/home']);
          });
        }
      } else {
        console.log('Login failed:', result.message);
        console.log('Login failed:', result.message);
        
        const alert = await this.alertController.create({
          header: 'Error',
          message: 'Contraseña o correo inválido',
          buttons: ['OK'],
        });

        await alert.present();
      }
      
    });
  }

  getAllUsers() {
    this.AutheticaService.getAllUsers().subscribe(users => {
      console.log('All users:', users);
    });
  }
}