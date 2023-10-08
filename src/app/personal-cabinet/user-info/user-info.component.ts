import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { IUserInfo } from 'src/app/shared/interfaces/IUserInfo';
import { PersonalInfoService } from 'src/app/shared/services/personal-info/personal-info.service';

@Component({
  selector: 'app-user-info',
  templateUrl: './user-info.component.html',
  styleUrls: ['./user-info.component.scss']
})
export class UserInfoComponent implements OnInit{

  @Input() size: "big" | "small" = "small";

  personalData!: Observable<IUserInfo>;

  constructor(private personalInfoService: PersonalInfoService){}

  ngOnInit(): void {
    this. personalData = this.personalInfoService.userInfo;
  }

}
