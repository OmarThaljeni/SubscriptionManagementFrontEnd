import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';



const login_url = 'http://localhost:8090/SubscriptionManagement/authenticate'

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http : HttpClient) { }
  isLoggedIn(){
    let token = localStorage.getItem('token') || sessionStorage.getItem("token");
    if(token){
      return true
    }else{
      return false
    }
  }

  login(credentials : any) {
    return this.http.post(login_url,credentials);
  }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('id');
    localStorage.removeItem('roles');
  }

  getToken() {
    return localStorage.getItem('token');
  }

}
