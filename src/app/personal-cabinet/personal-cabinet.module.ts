import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PersonalCabinetRoutingModule } from './personal-cabinet-routing.module';
import { PersonalCabinetViewComponent } from './personal-cabinet-view/personal-cabinet-view.component';


@NgModule({
  declarations: [
    PersonalCabinetViewComponent
  ],
  imports: [
    CommonModule,
    PersonalCabinetRoutingModule
  ]
})
export class PersonalCabinetModule { }
