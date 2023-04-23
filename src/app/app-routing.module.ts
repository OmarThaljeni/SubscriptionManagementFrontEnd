import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './Components/Login/Auth/login.component';
import { RegisterComponent } from './Components/Login/register/register.component';
import { CustomerListComponent } from './Components/CustomerManagement/customer-list/customer-list.component';
import { LoginGuard } from './Services/AuthService/login-guard';
import { AuthentificationGuard } from './Services/AuthService/auth-guard';
import { PresentationComponent } from './Components/Home/presentation.component';
import { ResponsableListComponent } from './Components/ResponsableManagement/responsable-list/responsable-list.component';
import { ListSubscriptionComponent } from './Components/SubscriptionManagement/list-subscription/list-subscription.component';
import { ClaimListComponent } from './Components/ClaimsManagement/claim-list/claim-list.component';

const routes: Routes = [

  { path: '', redirectTo: '/SubscriptionManagement/login',pathMatch:'full'},

  {path:'SubscriptionManagement' ,
    children:[
      { path: 'login', component:LoginComponent,canActivate:[LoginGuard]},
      { path: 'register', component:RegisterComponent, canActivate:[LoginGuard]},
      { path: 'list-customer', component:CustomerListComponent,canActivate:[AuthentificationGuard]},
      { path: 'list-responsable', component:ResponsableListComponent,canActivate:[AuthentificationGuard]},
      { path: 'list-subscription', component:ListSubscriptionComponent,canActivate:[AuthentificationGuard]},
      { path: 'cni-presentation', component:PresentationComponent,canActivate:[AuthentificationGuard]},
      { path: 'list-claim', component:ClaimListComponent,canActivate:[AuthentificationGuard]},
  ]},
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
