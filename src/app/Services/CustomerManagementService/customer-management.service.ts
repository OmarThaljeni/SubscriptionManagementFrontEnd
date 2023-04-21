import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';



const get_list_customer_url = 'http://localhost:8090/SubscriptionManagement/list-customers'

const get_list_responsable_url = 'http://localhost:8090/SubscriptionManagement/list-responsables'


const delete_user_utl = 'http://localhost:8090/SubscriptionManagement/delete-user'

const add_customer_url = 'http://localhost:8090/SubscriptionManagement/add-customer'

const update_customer_url = 'http://localhost:8090/SubscriptionManagement/update-customer'

const add_responsable_url = 'http://localhost:8090/SubscriptionManagement/add-responsable'

const update_responsable_url = 'http://localhost:8090/SubscriptionManagement/update-responsable'



@Injectable({
  providedIn: 'root'
})
export class CustomerManagementService {

  constructor(private http : HttpClient) { }

  getListCustomers(){
    return this.http.get(get_list_customer_url);
  }

  getListResponsables(){
    return this.http.get(get_list_responsable_url);
  }


  deleteUser(id): Observable<any> {
    return this.http.delete(`${delete_user_utl}/${id}`);
  }

  addCustomer(credentials : any) {
    return this.http.post(add_customer_url,credentials);
  }

  updateCustomer(id,credentials): Observable<any> {
    return this.http.put(`${update_customer_url}/${id}`,credentials);
  }

  addResponsable(credentials : any) {
    return this.http.post(add_responsable_url,credentials);
  }

  updateResponsable(id,credentials): Observable<any> {
    return this.http.put(`${update_responsable_url}/${id}`,credentials);
  }



}
