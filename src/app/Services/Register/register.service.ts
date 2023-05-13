import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


const register_url = 'http://localhost:8090/SubscriptionManagement/register'

@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  constructor(private http : HttpClient) { }

  register(credentials : any) {
    return this.http.post(register_url,credentials);
  }



}
