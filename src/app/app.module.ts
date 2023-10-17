import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { SendTokenInterceptor } from './shared/interceptors/send-token.interceptor';
import { HandleUnauthorizedInterceptor } from './shared/interceptors/handle-unauthorized.interceptor';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { DisplayMessageInterceptor } from './shared/interceptors/display-message.interceptor';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MatDialogModule,
    MatSnackBarModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: SendTokenInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: HandleUnauthorizedInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: DisplayMessageInterceptor, multi: true },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
