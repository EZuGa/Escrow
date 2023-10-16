import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LandingPageRoutingModule } from './landing-page-routing.module';
import { LandingHeaderComponent } from './landing-header/landing-header.component';
import { WhyUsComponent } from './why-us/why-us.component';
import { MobileNavigationComponent } from './mobile-components/mobile-navigation/mobile-navigation.component';
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
import { MatDialogModule } from '@angular/material/dialog';
import { AuthenticationComponent } from '../shared/dialogs/authentication/authentication.component';
import { ConfirmEmailComponent } from '../shared/dialogs/authentication/confirm-email/confirm-email.component';
import { ForgotPasswordComponent } from '../shared/dialogs/authentication/forgot-password/forgot-password.component';
import { LoginComponent } from '../shared/dialogs/authentication/login/login.component';
import { NewPasswordComponent } from '../shared/dialogs/authentication/new-password/new-password.component';
import { RegisterComponent } from '../shared/dialogs/authentication/register/register.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { ServicePageComponent } from './service-page/service-page.component';
import { MatSnackBarModule } from '@angular/material/snack-bar';


@NgModule({
  declarations: [
    LandingHeaderComponent,
    WhyUsComponent,
    LandingPageComponent,
    MobileNavigationComponent,
    AboutUsComponent,
    OutBenefitsComponent,
    OurServicesComponent,
    OurServicesCellComponent,
    ContactUsComponent,
    FooterComponent,
    StepsComponent,
    LoginComponent,
    RegisterComponent,
    AuthenticationComponent,
    ConfirmEmailComponent,
    ForgotPasswordComponent,
    NewPasswordComponent,
    WelcomeComponent,
    ServicePageComponent  
  ],
  imports: [
    CommonModule,
    LandingPageRoutingModule,
    ReactiveFormsModule,
    MatDialogModule,   
    MatSnackBarModule, 
    SharedComponentsModule,
  ],
  exports:[
  ]
})
export class LandingPageModule { }
