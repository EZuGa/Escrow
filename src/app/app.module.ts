import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LandingHeaderComponent } from './landing-page/landing-header/landing-header.component';
import { WhyUsComponent } from './landing-page/why-us/why-us.component';

@NgModule({
  declarations: [
    AppComponent,
    LandingHeaderComponent,
    WhyUsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
