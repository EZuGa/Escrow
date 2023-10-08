import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { takeWhile } from 'rxjs';
import { IUserInfo } from 'src/app/shared/interfaces/IUserInfo';
import { PersonalInfoService } from 'src/app/shared/services/personal-info/personal-info.service';

@Component({
  selector: 'app-personal-cabinet-my-profile',
  templateUrl: './personal-cabinet-my-profile.component.html',
  styleUrls: ['./personal-cabinet-my-profile.component.scss']
})
export class PersonalCabinetMyProfileComponent implements OnInit, OnDestroy {

  componentAlive$ = true;

  inUpdateMode = false;

  // personalData!:IUserInfo;
  personalDataForm: FormGroup = this.fb.group({
    firstname: [{value:'', disabled:true}],
    lastname: [{value:'', disabled:true}],
    email: [{value: '', disabled: true}, Validators.required],
    phone: [{value:'', disabled:true}],
    gender: [{value:"", disabled:true}],


    age: [{value:null, disabled:true}],
    social_status: [{value:'', disabled:true}],
    nationality: [{value:'', disabled:true}],
    country: [{value:'', disabled:true}],
    city: [{value:'', disabled:true}],
    address: [{value:'', disabled:true}],
    zip_code: [{value:'', disabled:true}], 


    passport_number: [{value:'', disabled:true}],
    issue_date: [{value:null, disabled:true}],
    expiration_date: [{value:null, disabled:true}],
    identification_number: [{value:'', disabled:true}],
    who_issued_passport: [{value:'', disabled:true}],
  });

  constructor(private personalInfoService: PersonalInfoService, private fb: FormBuilder){}


  ngOnInit(): void {
    this.personalInfoService.userInfo
    .pipe(takeWhile(val=>this.componentAlive$))
    .subscribe(val=>{
      this.personalDataForm.patchValue(val);

      this.personalDataForm.get('expiration_date')?.patchValue(this.formatDate(val.expiration_date));
      this.personalDataForm.get('issue_date')?.patchValue(this.formatDate(val.issue_date));
    })

    this.personalDataForm.valueChanges.subscribe(val=>console.log(val))
  }

  private formatDate(date:string) {
    if(!date)return;

    const d = new Date(date);
    let month = '' + (d.getMonth() + 1);
    let day = '' + d.getDate();
    const year = d.getFullYear();
    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;
    return [year, month, day].join('-');
  }


updateUser(){
  if(this.inUpdateMode){
    const brave = this.personalDataForm.getRawValue();

    console.log(brave)

    const abraka = {
      ...brave,
    }

    this.personalInfoService.updatePersonalData(abraka).subscribe()
  }

  this.formToggleDisabled();
  this.inUpdateMode = !this.inUpdateMode;
}

formToggleDisabled(){
  Object.keys(this.personalDataForm.controls).forEach(key => {
    if(key==="email"){
      return;
    }
    const controller = this.personalDataForm.controls[key];

    controller.disabled ? controller.enable() : controller.disable()
  });
}

ngOnDestroy(): void {
  this.componentAlive$ = false;
}

  
  

}
