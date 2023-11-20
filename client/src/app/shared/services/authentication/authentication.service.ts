import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of, tap } from 'rxjs';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { environment } from 'src/environments/environment';
import { IAuth } from '../../interfaces/IAuth';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { AuthenticationComponent } from '../../dialogs/authentication/authentication.component';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  private currentUser?: {email:string, password:string};

  private updatePassInfo?: {email: string, code:string, password?:string, repeat_password?: string}

  private forgotPasswordEmail?: string;

  constructor(private http: HttpClient, private router: Router, private dialog: MatDialog) { }

  
  smsAuthentication(email:string):Observable<any>{
    return this.http.post(
      `https://escrowandtrust.net/api/v1/user/jwt/sms_code/`,
      { email }
      )
  }


  startRegistration(user:any){
    this.currentUser = user;
    return this.smsAuthentication(user.email)
  }

  registerUser(code:number){ 
    const response = this.http.post<IAuth>(
      `${environment.baseUrl}api/v1/user/jwt/register/`,
      {
        ...this.currentUser,
        code
      }
    ).pipe(
      tap(response => {
        if (response.access) {
          this.currentUser = undefined;
          this.setToken(response);
          this.navigateToCabinet();
          this.dialog.closeAll();
        }
      }),
    )

    return response;
  }

  authenticateUser(user:{email:string, password:string}){
    user.email = user.email.toLowerCase();
    return this.http.post<IAuth>(
      `${environment.baseUrl}api/v1/user/jwt/login/`,
      user
    ).pipe(
      tap(response=>{
        if(response.access){
          this.setToken(response);
          this.navigateToCabinet();
        }
      })
      )
  }

  restorePassword(data: any){
    const info = {
      ...data,
      email: this.forgotPasswordEmail?.toLowerCase()
    }
    return this.http.post<{code: string}>(`${environment.baseUrl}api/v1/user/reset_password/`, info )
    .pipe(tap((val)=>{
      
      this.forgotPasswordEmail = undefined;
    }))
  }

  forgotCode(email: {email:string}){
    this.forgotPasswordEmail = email.email.toLowerCase();
    const response = this.http.post(`${environment.baseUrl}api/v1/user/reset_password_code/`, email)
    .pipe(tap(v=>this.updatePassInfo = undefined))

    return response;
  }

    navigateToCabinet(){
    this.router.navigateByUrl("/personal-cabinet");
    this.dialog.closeAll();
  }

  private setToken(response:IAuth){
    localStorage.setItem("auth_token", response.access);
  }

  openLoginPage(){
    const token = localStorage.getItem('auth_token');
    
    if(token){
      this.router.navigateByUrl("personal-cabinet");
      return;
    }

    this.dialog.open(
      AuthenticationComponent,
      {
        panelClass:'custom-dialog',
        maxWidth:'100vw',
        maxHeight:'100vh'
      }
      );
  }


}
