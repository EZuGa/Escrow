import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PersonalCabinetRoutingModule } from './personal-cabinet-routing.module';
import { PersonalCabinetViewComponent } from './personal-cabinet-view/personal-cabinet-view.component';
import { PersonalCabinetMyProfileComponent } from './personal-cabinet-my-profile/personal-cabinet-my-profile.component';
import { CabinetMessagesComponent } from './cabinet-messages/cabinet-messages.component';
import { CabinetContractsComponent } from './cabinet-contracts/cabinet-contracts.component';
import { CabinetBalanceComponent } from './cabinet-balance/cabinet-balance.component';


@NgModule({
  declarations: [
    PersonalCabinetViewComponent,
    PersonalCabinetMyProfileComponent,
    CabinetMessagesComponent,
    CabinetContractsComponent,
    CabinetBalanceComponent
  ],
  imports: [
    CommonModule,
    PersonalCabinetRoutingModule
  ]
})
export class PersonalCabinetModule { }
