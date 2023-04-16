import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { LoginService } from './login.service';

@Injectable({
  providedIn: 'root'
})
export class AuthentificationGuard implements CanActivate {

  constructor(private loginService: LoginService, private router: Router) {}



  canActivate(): boolean { 
      if(this.loginService.isLoggedIn()) {return true;}
        else{ 
      this.router.navigate(['/SubscriptionManagement/login']);
      return false;
    }
    }

  
}
