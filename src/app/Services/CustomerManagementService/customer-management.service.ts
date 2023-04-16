import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';



const get_list_customer_url = 'http://localhost:8090/SubscriptionManagement/list-users'

@Injectable({
  providedIn: 'root'
})
export class CustomerManagementService {

  constructor(private http : HttpClient) { }

  getListCustomers(){
    return this.http.get(get_list_customer_url);
  }

}
