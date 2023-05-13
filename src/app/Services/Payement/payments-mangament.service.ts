import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

const add_payement_url = 'http://localhost:8090/SubscriptionManagement/add-paiement'

@Injectable({
  providedIn: 'root'
})
export class PaymentsMangamentService {

  constructor(private http : HttpClient) { }

  addPayement(id, credentials) :Observable<any>{
    return this.http.post(`${add_payement_url}/${id}`,credentials);
  }

}



