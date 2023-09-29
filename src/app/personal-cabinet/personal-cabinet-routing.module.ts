import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PersonalCabinetViewComponent } from './personal-cabinet-view/personal-cabinet-view.component';
import { PersonalCabinetMyProfileComponent } from './personal-cabinet-my-profile/personal-cabinet-my-profile.component';
import { CabinetMessagesComponent } from './cabinet-messages/cabinet-messages.component';
import { CabinetContractsComponent } from './cabinet-contracts/cabinet-contracts.component';
import { CabinetBalanceComponent } from './cabinet-balance/cabinet-balance.component';

const routes: Routes = [
  {path:'', component: PersonalCabinetViewComponent, children : [
    {path: 'my-profile', component:PersonalCabinetMyProfileComponent},
    {path: 'messages', component: CabinetMessagesComponent},
    {path: 'contracts', component: CabinetContractsComponent},
    {path: 'balance', component: CabinetBalanceComponent}
  ]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PersonalCabinetRoutingModule { }
