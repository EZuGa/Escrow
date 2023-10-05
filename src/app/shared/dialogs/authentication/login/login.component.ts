import { Component, EventEmitter, Output } from '@angular/core';
import { CurrentState } from '../authentication.component';
import { AuthenticationService } from 'src/app/shared/services/authentication/authentication.service';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  @Output() changeState = new EventEmitter<CurrentState>();

  loginForm = this.fb.group({
    email: [null, [Validators.required, Validators.email]],
    password: [null, [Validators.required, Validators.minLength(8)]]
  })

  constructor(private fb: FormBuilder, private authState: AuthenticationService){}


  goToRegister(){
    this.changeState.emit(CurrentState.REGISTER);
  }


  authenticateUser(){
    const user = this.loginForm.getRawValue();

    console.log(user)
  }

  get email(){
    return this.loginForm.get('email');
  }

  get password(){
    return this.loginForm.get('password');
  }
}
