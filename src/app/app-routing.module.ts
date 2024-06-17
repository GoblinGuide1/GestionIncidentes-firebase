import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AutheticaService } from 'src/app/authetica.service';


const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)

  },
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'signup',
    loadChildren: () => import('./signup/signup.module').then( m => m.SignupPageModule)
  },
  {
    path: 'landing',
    loadChildren: () => import('./landing/landing.module').then( m => m.LandingPageModule)
  },
  {
    path: 'reset-password',
    loadChildren: () => import('./reset-password/reset-password.module').then( m => m.ResetPasswordPageModule)
  },
  {
    path: 'create-incidencia',
    loadChildren: () => import('./create-incidencia/create-incidencia.module').then( m => m.CreateIncidenciaPageModule)
  },
  {
    path: 'diagnos-incidencia',
    loadChildren: () => import('./diagnos-incidencia/diagnos-incidencia.module').then( m => m.DiagnosIncidenciaPageModule)
  },
  {
    path: 'create-user',
    loadChildren: () => import('./create-user/create-user.module').then( m => m.CreateUserPageModule)
  },
  {
    path: 'asig-incidencia',
    loadChildren: () => import('./asig-incidencia/asig-incidencia.module').then( m => m.AsigIncidenciaPageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
