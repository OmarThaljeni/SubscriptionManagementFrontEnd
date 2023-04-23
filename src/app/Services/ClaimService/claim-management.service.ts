import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


const get_list_claims_url = 'http://localhost:8090/SubscriptionManagement/list-claims'

const add_claim_url = 'http://localhost:8090/SubscriptionManagement/add-claim'

const update_claim_url = 'http://localhost:8090/SubscriptionManagement/update-claim'

const delete_claim_url = 'http://localhost:8090/SubscriptionManagement/delete-claim'


@Injectable({
  providedIn: 'root'
})
export class ClaimManagementService {

  constructor(private http: HttpClient) { }

  getListClaims() {
    return this.http.get(get_list_claims_url);
  }

  deleteClaim(id): Observable<any> {
    return this.http.delete(`${delete_claim_url}/${id}`);
  }

  addClaim(id,credentials: any) {
    return this.http.post(`${add_claim_url}/${id}`, credentials);
  }

  updateClaim(id, credentials): Observable<any> {
    return this.http.put(`${update_claim_url}/${id}`, credentials);
  }



}
