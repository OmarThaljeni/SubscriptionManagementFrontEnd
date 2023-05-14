import { Component } from '@angular/core';
import { LoginService } from './Services/AuthService/login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  public sidebarShow: boolean = true;
  isCollapsed = true;

  constructor(public loginService : LoginService, private router: Router) { }

  ngOnInit(): void {
  }

logout() {
  this.loginService.logout();
  const link = ['SubscriptionManagement/login'];
  this.router.navigate(link)
}


goToHome(){
  const link = ['/SubscriptionManagement/cni-presentation'];
  this.router.navigate(link)
}

goToListCustomer(){
  const link = ['/SubscriptionManagement/list-customer'];
  this.router.navigate(link)
}

goToListResponsable(){
  const link = ['/SubscriptionManagement/list-responsable'];
  this.router.navigate(link)
}

goToListSubscription(){
  const link = ['/SubscriptionManagement/list-subscription'];
  this.router.navigate(link)
}

goToListClaim(){
  const link = ['/SubscriptionManagement/list-claim'];
  this.router.navigate(link)
}

goToListServiceCni(){
  const link = ['/SubscriptionManagement/list-service-cni'];
  this.router.navigate(link)
}

goToListPaiements(){
  const link = ['/SubscriptionManagement/liste-paiements'];
  this.router.navigate(link)
}

}
