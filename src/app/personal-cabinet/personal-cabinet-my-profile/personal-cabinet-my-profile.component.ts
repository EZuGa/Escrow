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
    email: [{value: '', disabled: true}, Validators.required],
    firstname: [{value:'', disabled:true}],
    address: [{value:'', disabled:true}],

    age: [{value:null, disabled:true}],
    city: [{value:'', disabled:true}],
    country: [{value:'', disabled:true}],
    expiration_date: [{value:null, disabled:true}],
    gender: [{value:"", disabled:true}],
    identification_number: [{value:'', disabled:true}],
    issue_date: [{value:null, disabled:true}],
    lastname: [{value:'', disabled:true}],
    nationality: [{value:'', disabled:true}],


    passport_number: [{value:'', disabled:true}],
    phone: [{value:'', disabled:true}],
    social_status: [{value:'', disabled:true}],
    who_issued_passport: [{value:'', disabled:true}],
    zip_code: [{value:'', disabled:true}], 
  });

  constructor(private personalInfoService: PersonalInfoService, private fb: FormBuilder){}


  ngOnInit(): void {
    this.personalInfoService.userInfo
    .pipe(takeWhile(val=>this.componentAlive$))
    .subscribe(val=>{
      this.personalDataForm.patchValue(val);
    })
  }


updateUser(){
  if(this.inUpdateMode){
    const brave = this.personalDataForm.getRawValue();

    const abraka = {
      ...brave,
    }

    this.personalInfoService.updatePersonalData(abraka as any)
    .subscribe()
    
  }else{
    // this.personalDataForm.get("firstname")!.enable();

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
