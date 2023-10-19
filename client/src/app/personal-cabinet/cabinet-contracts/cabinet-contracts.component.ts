import { Component } from '@angular/core';
import { ContractsService } from 'src/app/shared/services/contracts/contracts.service';

@Component({
  selector: 'app-cabinet-contracts',
  templateUrl: './cabinet-contracts.component.html',
  styleUrls: ['./cabinet-contracts.component.scss']
})
export class CabinetContractsComponent {


  constructor(contractService: ContractsService){}

}
