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
import { OurServicesComponent } from './our-services/our-services.component';
import { OurServicesCellComponent } from './our-services/our-services-cell/our-services-cell.component';
import { ContactUsComponent } from './contact-us/contact-us.component';
import { FooterComponent } from './footer/footer.component';
import { StepsComponent } from './steps/steps.component';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedComponentsModule } from '../shared/components/shared-components.module';

const components = [
  LandingHeaderComponent,
  WhyUsComponent,
  LandingPageComponent,
  MobileNavigationComponent,
  MobileLoginComponent,
  AboutUsComponent,
  OutBenefitsComponent,
  OurServicesComponent,
  OurServicesCellComponent,
  ContactUsComponent,
  FooterComponent,
  StepsComponent,
];

@NgModule({
  declarations: [
    ...components,
  ],
  imports: [
    CommonModule,
    LandingPageRoutingModule,
    ReactiveFormsModule,
    
    SharedComponentsModule
  ],
  exports:[
  ]
})
export class LandingPageModule { }
