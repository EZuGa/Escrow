import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PersonalCabinetRoutingModule } from './personal-cabinet-routing.module';
import { PersonalCabinetViewComponent } from './personal-cabinet-view/personal-cabinet-view.component';
import { PersonalCabinetMyProfileComponent } from './personal-cabinet-my-profile/personal-cabinet-my-profile.component';
import { CabinetMessagesComponent } from './cabinet-messages/cabinet-messages.component';
import { CabinetContractsComponent } from './cabinet-contracts/cabinet-contracts.component';
import { CabinetBalanceComponent } from './cabinet-balance/cabinet-balance.component';
import { InputWithLabelComponent } from './personal-cabinet-my-profile/input-with-label/input-with-label.component';
import { ContractsCellComponent } from './cabinet-contracts/contracts-cell/contracts-cell.component';


@NgModule({
  declarations: [
    PersonalCabinetViewComponent,
    PersonalCabinetMyProfileComponent,
    CabinetMessagesComponent,
    CabinetContractsComponent,
    CabinetBalanceComponent,
    InputWithLabelComponent,
    ContractsCellComponent
  ],
  imports: [
    CommonModule,
    PersonalCabinetRoutingModule
  ]
})
export class PersonalCabinetModule { }
