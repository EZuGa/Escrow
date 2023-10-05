import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

   private currentUser = {email:"", password:""};

  constructor(private http: HttpClient) { }



  smsAuthentication(email:string):Observable<any>{
    return this.http.post(
      `${environment.baseUrl}api/v1/user/jwt/sms_code/`,
      { email }
      )
  }


  startRegistration(user:{email:string, password:string}){
    this.currentUser = user;
    return this.smsAuthentication(user.email)
  }

  registerUser(code:number){

    return this.http.post(
      `${environment.baseUrl}api/v1/user/jwt/register/`,
      {
        ...this.currentUser,
        code
      }
    )

  }


}
