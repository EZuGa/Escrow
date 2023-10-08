import { Component, Inject, OnInit } from '@angular/core';
import { BalanceService } from 'src/app/shared/services/balance/balance.service';

@Component({
  selector: 'app-cabinet-balance',
  templateUrl: './cabinet-balance.component.html',
  styleUrls: ['./cabinet-balance.component.scss']
})
export class CabinetBalanceComponent implements OnInit{

  constructor(private balanceService: BalanceService){}


  ngOnInit(): void {
    this.balanceService.getBalances().subscribe(val=>{})
  }

}
