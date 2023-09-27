import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MobileNavigationComponent } from './mobile-components/mobile-navigation/mobile-navigation.component';
import { LandingPageComponent } from './landing-page/landing-page.component';

const routes: Routes = [
  {path:'', component: LandingPageComponent},
  {path:'about-us', component: LandingPageComponent},
  {path:'navigation', component: MobileNavigationComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LandingPageRoutingModule { }
