import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { canAccessCabinetGuard } from './shared/guards/can-access-cabinet.guard';

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
      canMatch:[canAccessCabinetGuard]
  },
  {
    path:"**",
    redirectTo:""
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
