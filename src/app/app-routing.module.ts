import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './Components/Login/Auth/login.component';
import { RegisterComponent } from './Components/Login/register/register.component';
import { HomeComponent } from './Components/home/home.component';
import { CustomerListComponent } from './Components/CustomerManagement/customer-list/customer-list.component';
import { PresentationComponent } from './Components/home/CniPresentation/presentation/presentation.component';

const routes: Routes = [

  { path: '', redirectTo: '/SubscriptionManagement/login',pathMatch:'full'},

  {path:'SubscriptionManagement' ,
    children:[
      { path: 'login', component:LoginComponent},
      { path: 'register', component:RegisterComponent},
      { path: 'home', component:HomeComponent},
      { path: 'list-customer', component:CustomerListComponent},
      { path: 'cni-presentation', component:PresentationComponent},
  ]},
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
