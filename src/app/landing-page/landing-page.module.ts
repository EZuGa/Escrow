import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LandingPageRoutingModule } from './landing-page-routing.module';
import { LandingHeaderComponent } from './landing-header/landing-header.component';
import { WhyUsComponent } from './why-us/why-us.component';
import { MobileNavigationComponent } from './mobile-components/mobile-navigation/mobile-navigation.component';
import { MobileLoginComponent } from './mobile-components/mobile-login/mobile-login.component';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { AboutUsComponent } from './about-us/about-us.component';
import { OutBenefitsComponent } from './out-benefits/out-benefits.component';

const components = [
  LandingHeaderComponent,
  WhyUsComponent,
  LandingPageComponent,
  MobileNavigationComponent,
  MobileLoginComponent,
  AboutUsComponent,
  OutBenefitsComponent,
];

@NgModule({
  declarations: [
    ...components,
  ],
  imports: [
    CommonModule,
    LandingPageRoutingModule
  ],
  exports:[
  ]
})
export class LandingPageModule { }
