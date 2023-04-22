import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';



const get_list_sub_url = 'http://localhost:8090/SubscriptionManagement/all-list-subscriptions'


@Injectable({
  providedIn: 'root'
})
export class SubscirpionManagementService {

  constructor(private http : HttpClient) { }

  getAllSubscriptions(){
    return this.http.get(get_list_sub_url);
  }

}