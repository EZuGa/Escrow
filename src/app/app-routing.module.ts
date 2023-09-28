import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LandingPageComponent } from './landing-page/landing-page/landing-page.component';
import { PersonalCabinetViewComponent } from './personal-cabinet/personal-cabinet-view/personal-cabinet-view.component';

const routes: Routes = [
  { path: '', component: LandingPageComponent},
  { path: 'personal-cabinet', component: PersonalCabinetViewComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
