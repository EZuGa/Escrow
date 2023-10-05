import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { environment } from 'src/environments/environment';
import { IAuth } from '../../interfaces/IAuth';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

   private currentUser?: {email:"", password:""};

  constructor(private http: HttpClient) { }



  smsAuthentication(email:string):Observable<any>{
    return this.http.post(
      `${environment.baseUrl}api/v1/user/jwt/sms_code/`,
      { email }
      )
  }


  startRegistration(user:any){
    this.currentUser = user;
    return this.smsAuthentication(user.email)
  }

  registerUser(code:number){
    return this.http.post<IAuth>(
      `${environment.baseUrl}api/v1/user/jwt/register/`,
      {
        ...this.currentUser,
        code
      }
    ).pipe(
      tap(response=>this.setToken(response)),
      tap(response=>this.currentUser = undefined)
      )
  }

  authenticateUser(user:{email:string, password:string}){
    return this.http.post<IAuth>(
      `${environment.baseUrl}api/v1/user/jwt/login/`,
      user
    ).pipe(tap(response=>this.setToken(response)))
  }

  private setToken(response:IAuth){
    localStorage.setItem("auth_token", response.access);
  }


}
