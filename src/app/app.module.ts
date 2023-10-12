import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatDialogModule} from '@angular/material/dialog';
import { LoginComponent } from './shared/dialogs/authentication/login/login.component';
import { RegisterComponent } from './shared/dialogs/authentication/register/register.component';
import { AuthenticationComponent } from './shared/dialogs/authentication/authentication.component';
import { ConfirmEmailComponent } from './shared/dialogs/authentication/confirm-email/confirm-email.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { SendTokenInterceptor } from './shared/interceptors/send-token.interceptor';
import { HandleUnauthorizedInterceptor } from './shared/interceptors/handle-unauthorized.interceptor';
import { ForgotPasswordComponent } from './shared/dialogs/authentication/forgot-password/forgot-password.component';
import { NewPasswordComponent } from './shared/dialogs/authentication/new-password/new-password.component';
import { ButtonComponent } from './shared/components/button/button.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    AuthenticationComponent,
    ConfirmEmailComponent,
    ForgotPasswordComponent,
    NewPasswordComponent,
    ButtonComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    FormsModule,
    MatDialogModule,
    HttpClientModule,
    MatProgressSpinnerModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: SendTokenInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: HandleUnauthorizedInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
