import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PersonalCabinetViewComponent } from './personal-cabinet-view/personal-cabinet-view.component';

const routes: Routes = [
  {path:'', component: PersonalCabinetViewComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PersonalCabinetRoutingModule { }
