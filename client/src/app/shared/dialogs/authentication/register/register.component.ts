import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { AuthenticationService } from 'src/app/shared/services/authentication/authentication.service';
import { CurrentState } from '../authentication.component';
import { finalize } from 'rxjs';
import { confirmPassword } from 'src/app/shared/custom_validators/confirmPassword';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {

  @Output() changeState = new EventEmitter<CurrentState>();

  isLoading = false;

  registerForm: FormGroup = this.fb.group({
    email: [null, [Validators.required, Validators.email]],
    passwords: this.fb.group({
      password: [null, Validators.minLength(8)],
      repeat_password: [null, Validators.minLength(8)],
    },{validator: confirmPassword}),
    agreeTerms: [null, Validators.requiredTrue]
  });


  constructor(private fb:FormBuilder, private authService: AuthenticationService){}


  submitRegister(){
    this.isLoading = true;

    this.authService.startRegistration({ email: this.email!.value, password: this.password!.value })
    .pipe(finalize(()=>this.isLoading = false))
    .subscribe(
      confirmCode =>{
        this.changeState.emit(CurrentState.CONFIRM_EMAIL);
      }
    )
  }

  goToLogin(){
    this.changeState.emit(CurrentState.LOGIN);
  }

  get password(){
  return this.registerForm.get('passwords')!.get("password")
  }

  get email(){
    return this.registerForm.get('email');
  }

}
