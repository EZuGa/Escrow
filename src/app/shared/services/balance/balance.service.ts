import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class BalanceService {

  constructor(private http: HttpClient) { }


  getBalances(){
    console.log("BALANCE1")
    return this.http.get(`${environment.baseUrl}api/v1/user/balances/`)
  }
}
