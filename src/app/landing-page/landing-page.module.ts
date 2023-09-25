import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LandingPageRoutingModule } from './landing-page-routing.module';
import { LandingHeaderComponent } from './landing-header/landing-header.component';
import { WhyUsComponent } from './why-us/why-us.component';

const components = [
  LandingHeaderComponent,
  WhyUsComponent
];

@NgModule({
  declarations: [
    ...components
  ],
  imports: [
    CommonModule,
    LandingPageRoutingModule
  ],
  exports:[
    ...components
  ]
})
export class LandingPageModule { }
