import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MobileNavigationComponent } from './mobile-components/mobile-navigation/mobile-navigation.component';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { ServicePageComponent } from './service-page/service-page.component';

const routes: Routes = [
  {path:'', component: LandingPageComponent},
  {path:'our-services', component: ServicePageComponent},
  {path:'navigation', component: MobileNavigationComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LandingPageRoutingModule { }
