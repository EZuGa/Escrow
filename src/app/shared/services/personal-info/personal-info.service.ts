import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { IUserInfo } from '../../interfaces/IUserInfo';

@Injectable({
  providedIn: 'root'
})
export class PersonalInfoService {



  constructor(private http: HttpClient) { }


  getPersonalData(){
    return this.http.get<IUserInfo>(`${environment.baseUrl}api/v1/user/profile/`)
  }

  updatePersonalData(user:IUserInfo){
    return this.http.put(`${environment.baseUrl}api/v1/user/profile/update/`,
    
      user
    
    )
  }
}
