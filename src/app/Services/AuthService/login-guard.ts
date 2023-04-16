import { Injectable } from '@angular/core';
import { CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class LoginGuard implements CanActivate {

  canActivate(): boolean {
    const token = localStorage.getItem('token');
    if (!token) {
      return true
    }
    else {
      return false
    }

  }

}
