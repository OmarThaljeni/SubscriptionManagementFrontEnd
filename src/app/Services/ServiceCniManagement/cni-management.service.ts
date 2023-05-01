import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

const get_list_service_url = 'http://localhost:8090/SubscriptionManagement/list-services-cni'

const add_service_url = 'http://localhost:8090/SubscriptionManagement/add-service-cni'


@Injectable({
  providedIn: 'root'
})
export class CniManagementService {

  constructor(private http: HttpClient) { }

  getListServices() {
    return this.http.get(get_list_service_url);
  }


  addServiceCni(credentials: any) {
    return this.http.post(`${add_service_url}`, credentials);
  }






}
