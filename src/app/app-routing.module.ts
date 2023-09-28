import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LandingPageComponent } from './landing-page/landing-page/landing-page.component';
import { PersonalCabinetViewComponent } from './personal-cabinet/personal-cabinet-view/personal-cabinet-view.component';

const routes: Routes = [
  {
    path: "",
    loadChildren: () =>
      import("./landing-page/landing-page.module").then(
        (m) => m.LandingPageModule,
      ),
  },
  {
    path: "personal-cabinet",
    loadChildren: () =>
      import("./personal-cabinet/personal-cabinet.module").then(
        (m) => m.PersonalCabinetModule,
      ),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
