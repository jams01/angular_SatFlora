import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {AuthGuard, canActivate, redirectLoggedInTo, redirectUnauthorizedTo } from '@angular/fire/auth-guard';

const redirectUnauthorizedToLogin = () => redirectUnauthorizedTo(['login']);
const redirectLoggedInToHome = () => redirectLoggedInTo(['index']);

const routes: Routes = [
  { 
    path: 'login', 
    loadChildren: () => import('./views/login/login.module').then(m => m.LoginModule),
    canActivate: [AuthGuard],
    data: { authGuardPipe: redirectLoggedInToHome } 
  },
  // Add more routes as needed
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { 
    path: 'index', 
    loadChildren: () => import('./views/index/index.module').then(m => m.IndexModule),
    canActivate: [AuthGuard],
    data: { authGuardPipe: redirectUnauthorizedToLogin } 
  },
    

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}