import { Component } from '@angular/core';
import { FormControl, FormGroup, NonNullableFormBuilder, Validators } from '@angular/forms';
import { finalize } from 'rxjs';
import { confirmPassword } from 'src/app/shared/custom_validators/confirmPassword';
import { AuthenticationService } from 'src/app/shared/services/authentication/authentication.service';

@Component({
  selector: 'app-new-password',
  templateUrl: './new-password.component.html',
  styleUrls: ['./new-password.component.scss']
})
export class NewPasswordComponent {

  isLoading = false;

  newPasswordForm = this.fb.group({
    password: ['', [Validators.required, Validators.minLength(8)]],
    repeat_password:[''],
    code: ['', Validators.required]
  },{validators: [confirmPassword]})

  

  constructor(private fb: NonNullableFormBuilder, private authService: AuthenticationService){}

  changePassword(){
    this.isLoading = true;
    this.authService.restorePassword(this.newPasswordForm.getRawValue())
    .pipe(finalize(()=>this.isLoading = false))
    .subscribe(val=>{
      this.authService.navigateToCabinet()
    })
  }

}
