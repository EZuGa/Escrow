import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { IUserInfo } from '../../interfaces/IUserInfo';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PersonalInfoService {


private userInfoSubject = new BehaviorSubject<IUserInfo>({} as any);
userInfo = this.userInfoSubject.asObservable();


  constructor(private http: HttpClient) {
    this.getPersonalData();
  }


  getPersonalData(){
    return this.http.get<IUserInfo>(`api/v1/user/profile/`)
    .subscribe(val=>{
      this.userInfoSubject.next(val);
    })
  }

  updatePersonalData(user:IUserInfo){
    return this.http.put(`api/v1/user/profile/update/`, user )
  }
}
