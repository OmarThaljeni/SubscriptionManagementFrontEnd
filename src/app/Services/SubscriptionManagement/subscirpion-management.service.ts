import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

const get_list_sub_url = 'http://localhost:8090/SubscriptionManagement/all-list-subscriptions'

const add_subscription_url = 'http://localhost:8090/SubscriptionManagement/add-subscription'


@Injectable({
  providedIn: 'root'
})
export class SubscirpionManagementService {

  constructor(private http : HttpClient) { }

  getAllSubscriptions(){
    return this.http.get(get_list_sub_url);
  }


  addSubscription(id,credentials): Observable<any> {
    return this.http.post(`${add_subscription_url}/${id}`,credentials);
  }

}