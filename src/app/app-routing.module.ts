import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './Components/Login/Auth/login.component';
import { RegisterComponent } from './Components/Login/register/register.component';
import { HomeComponent } from './Components/home/home.component';
import { CustomerListComponent } from './Components/CustomerManagement/customer-list/customer-list.component';
import { PresentationComponent } from './Components/home/CniPresentation/presentation/presentation.component';
import { LoginGuard } from './Services/AuthService/login-guard';
import { LogoutGuard } from './Services/AuthService/logout-guard';
import { AuthentificationGuard } from './Services/AuthService/auth-guard';

const routes: Routes = [

  { path: '', redirectTo: '/SubscriptionManagement/login',pathMatch:'full'},

  {path:'SubscriptionManagement' ,
    children:[
      { path: 'login', component:LoginComponent, canActivate:[LoginGuard]},
      { path: 'register', component:RegisterComponent,canActivate:[LoginGuard]},
      { path: 'home', component:HomeComponent,canActivate:[AuthentificationGuard]},
      { path: 'list-customer', component:CustomerListComponent,canActivate:[AuthentificationGuard]},
      { path: 'cni-presentation', component:PresentationComponent,canActivate:[AuthentificationGuard]},
  ]},
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
