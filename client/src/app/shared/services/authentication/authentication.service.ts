import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { environment } from 'src/environments/environment';
import { IAuth } from '../../interfaces/IAuth';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  private currentUser?: {email:string, password:string};

  private updatePassInfo?: {email: string, code:string, password?:string, repeat_password?: string}

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
          this.setToken(response);
          this.navigateToCabinet();
          this.dialog.closeAll();
        }
      }),
    )

    this.currentUser = undefined;
    return response;
  }

  authenticateUser(user:{email:string, password:string}){
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

  restorePassword(email: any){
    return this.http.post<{code: string}>(`${environment.baseUrl}api/v1/user/reset_password/`, email)
    .pipe(tap((val)=>{
      this.updatePassInfo = {
        ...email,
        code:'',
        password:'',
        repeat_password:''
      }
    }))
  }

  forgotCode(passwords: {password:string, repeat_password:string, code: string}){

    this.updatePassInfo = {
      ...this.updatePassInfo!,
      ...passwords
    }

    const response = this.http.post(`${environment.baseUrl}api/v1/user/reset_password_code/`,this.updatePassInfo)

    this.updatePassInfo = undefined;

    return response;
  }

    navigateToCabinet(){
    this.router.navigateByUrl("/personal-cabinet");
    this.dialog.closeAll();
  }

  private setToken(response:IAuth){
    localStorage.setItem("auth_token", response.access);
  }


}
