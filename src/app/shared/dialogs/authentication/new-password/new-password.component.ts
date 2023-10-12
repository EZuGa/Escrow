import { Component } from '@angular/core';
import { FormControl, FormGroup, NonNullableFormBuilder, Validators } from '@angular/forms';
import { AuthenticationService } from 'src/app/shared/services/authentication/authentication.service';

@Component({
  selector: 'app-new-password',
  templateUrl: './new-password.component.html',
  styleUrls: ['./new-password.component.scss']
})
export class NewPasswordComponent {

  // newPasswordForm = new FormGroup({
  //   password: new FormControl('', Validators.required),
  //   repeat_password: new FormControl('', Validators.required)
  // });

  newPasswordForm = this.fb.group({
    password: [''],
    repeat_password:[''],
  })

  

  constructor(private fb: NonNullableFormBuilder, private authService: AuthenticationService){

    setTimeout(()=>{
      this.newPasswordForm.valueChanges.subscribe(val=>{
        console.log(val)
      })
    })

  }

  changePassword(){
    this.authService.restorePassword(this.newPasswordForm.getRawValue())
  }

}
