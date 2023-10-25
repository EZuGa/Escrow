import { Component, EventEmitter, Output } from '@angular/core';
import { CurrentState } from '../authentication.component';
import { AuthenticationService } from 'src/app/shared/services/authentication/authentication.service';
import { FormBuilder, Validators } from '@angular/forms';
import { finalize } from 'rxjs';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  @Output() changeState = new EventEmitter<CurrentState>();

  isLoading = false;

  loginForm = this.fb.group({
    email: ["", [Validators.required, Validators.email]],
    password: ["", [Validators.required, Validators.minLength(8)]]
  })

  constructor(private fb: FormBuilder, private authService: AuthenticationService, private dialogRef: MatDialogRef<LoginComponent>){}


  goToRegister(){
    this.changeState.emit(CurrentState.REGISTER);
  }

  goToForgot(){
    this.changeState.emit(CurrentState.FORGOT_PASSWORD);
  }


  authenticateUser(){
    if(this.loginForm.invalid)return;

    const user = this.loginForm.getRawValue();
    this.isLoading = true;
    
    this.authService.authenticateUser(user as any)
    .pipe(finalize(()=>{
      this.isLoading = false;
    }))
    .subscribe()
  }

  get email(){
    return this.loginForm.get('email');
  }

  get password(){
    return this.loginForm.get('password');
  }
}
