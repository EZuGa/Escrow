import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthenticationService } from 'src/app/shared/services/authentication/authentication.service';
import { CurrentState } from '../authentication.component';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent {

  @Output() changeState = new EventEmitter();

  forgotForm: FormGroup = this.fb.group({
    email: ['', [Validators.email, Validators.required]]
  });

  constructor(private fb: FormBuilder, private authService: AuthenticationService){}

  forgotCode(){
    this.authService.forgotCode(this.forgotForm.getRawValue())
    .subscribe(val=>{
      this.changeState.emit(CurrentState.NEW_PASSWORD);
    })
  }

  goToLogin(){
    this.changeState.emit(CurrentState.LOGIN);
  }

  goToRegister(){
    this.changeState.emit(CurrentState.REGISTER);
  }

}
