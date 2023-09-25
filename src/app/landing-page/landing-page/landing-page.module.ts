import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LandingHeaderComponent } from '../landing-header/landing-header.component';
import { WhyUsComponent } from '../why-us/why-us.component';

const components = [
  LandingHeaderComponent,
  WhyUsComponent
];

@NgModule({
  declarations: [
    ...components
  ],
  imports: [
    CommonModule
  ],
  exports:[
    ...components
  ]
})
export class LandingPageModule { }
