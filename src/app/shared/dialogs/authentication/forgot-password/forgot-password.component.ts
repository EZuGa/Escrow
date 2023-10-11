import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthenticationService } from 'src/app/shared/services/authentication/authentication.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent {

  forgotForm: FormGroup = this.fb.group({
    email: ['', [Validators.email, Validators.required]]
  });

  constructor(private fb: FormBuilder, private authService: AuthenticationService){}

  forgotCode(){
    this.authService.forgotCode(this.forgotForm.getRawValue())
    .subscribe(val=>{
      console.log(val)
    })
  }

}
