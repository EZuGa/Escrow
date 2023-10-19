import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class BalanceService {

  private balanceSubject:BehaviorSubject<any> = new BehaviorSubject(null);
  balances = this.balanceSubject.asObservable();


  constructor(private http: HttpClient) { 
    this.getBalances();
  }


  private getBalances(){
    return this.http.get(`api/v1/user/balances/`)
    .subscribe(val=>{
      this.balanceSubject.next(val);
    });
  }
}
