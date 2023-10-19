import { Component, Inject, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { BalanceService } from 'src/app/shared/services/balance/balance.service';

@Component({
  selector: 'app-cabinet-balance',
  templateUrl: './cabinet-balance.component.html',
  styleUrls: ['./cabinet-balance.component.scss']
})
export class CabinetBalanceComponent implements OnInit{

  balances!: Observable<any>;

  constructor(private balanceService: BalanceService){}


  ngOnInit(): void {
   this.balances = this.balanceService.balances;
  }

}
