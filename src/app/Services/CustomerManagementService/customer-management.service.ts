import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';



const get_list_customer_url = 'http://localhost:8090/SubscriptionManagement/list-users'

const delete_user_utl = 'http://localhost:8090/SubscriptionManagement/delete-user'



@Injectable({
  providedIn: 'root'
})
export class CustomerManagementService {

  constructor(private http : HttpClient) { }

  getListUsers(){
    return this.http.get(get_list_customer_url);
  }

  deleteUser(id): Observable<any> {
    return this.http.delete(`${delete_user_utl}/${id}`);
  }



}
